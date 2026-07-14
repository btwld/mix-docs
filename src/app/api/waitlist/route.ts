import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "../../../lib/resend";

const waitlistSchema = z.object({
  email: z.email("Please enter a valid email address"),
  product: z.enum(["stargate", "code-analysis"]),
});

type Product = z.infer<typeof waitlistSchema>["product"];

// Best-effort per-instance rate limit. Serverless instances don't share this
// map, so it bounds abuse per warm instance rather than globally — enough to
// stop casual mail-bombing loops without an external store.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_IPS = 10_000;
const rateHits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateHits.size > MAX_TRACKED_IPS) {
    for (const [key, entry] of rateHits) {
      if (now - entry.windowStart > RATE_WINDOW_MS) rateHits.delete(key);
    }
  }
  const entry = rateHits.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateHits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function welcomeHtml(wordmark: string, pitch: string, expectations: string[]) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <span style="font-family: ui-monospace, monospace; font-size: 20px; font-weight: 700; color: #05040A;">${wordmark}</span>
    </div>

    <h2 style="color: #05040A;">You're on the list!</h2>

    <p>${pitch}</p>

    <p><strong>What to expect:</strong></p>
    <ul>
      ${expectations.map((item) => `<li>${item}</li>`).join("\n      ")}
    </ul>

    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
      — The Concepta team · <a href="https://conceptatech.com" style="color: #666;">conceptatech.com</a>
    </p>
  </body>
</html>
`;
}

const PRODUCT_CONFIG: Record<
  Product,
  { audienceId: string; from: string; subject: string; html: string }
> = {
  stargate: {
    audienceId: process.env.RESEND_AUDIENCE_ID_STARGATE ?? "",
    from: process.env.RESEND_FROM_EMAIL ?? "Stargate <hello@conceptatech.com>",
    subject: "You're on the Stargate waitlist",
    html: welcomeHtml(
      "stargate",
      "Thanks for joining the Stargate waitlist. We're building a workflow system on reusable component contracts — schemas define the ports, workflows are portable JSON graphs, and engines validate every boundary before and after each handler runs.",
      [
        "Early access when we launch",
        "Progress updates as the studio, CLI, and engines evolve",
      ]
    ),
  },
  "code-analysis": {
    audienceId: process.env.RESEND_AUDIENCE_ID_CODE_ANALYSIS ?? "",
    from:
      process.env.RESEND_FROM_EMAIL ?? "Code Analysis <hello@conceptatech.com>",
    subject: "You're on the Code Analysis waitlist",
    html: welcomeHtml(
      "code-analysis",
      "Thanks for joining the Code Analysis waitlist. We're building an audit pipeline that turns any codebase into grades you can defend — deterministic scores, evidence-backed findings, and a report you can put in front of a client.",
      [
        "Early access when we launch",
        "Launch pricing for waitlist members",
        "Progress updates as the pipeline evolves",
      ]
    ),
  },
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests — please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { success: false, message: firstIssue?.message || "Invalid input" },
      { status: 400 }
    );
  }
  const { email, product } = parsed.data;
  const config = PRODUCT_CONFIG[product];

  if (!process.env.RESEND_API_KEY || !config.audienceId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[waitlist] RESEND_API_KEY / audience id missing for ${product} — dev no-op for:`,
        email
      );
      return NextResponse.json(
        { success: true, message: "Dev mode: signup logged, not stored." },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Waitlist temporarily unavailable." },
      { status: 503 }
    );
  }

  try {
    const resend = getResend();

    // The Resend SDK never throws for API failures — errors come back as
    // { data, error } values and must be checked explicitly.
    const { error: contactError } = await resend.contacts.create({
      email,
      audienceId: config.audienceId,
    });

    if (contactError) {
      // Already subscribed: succeed without re-sending the welcome email, so
      // repeat POSTs can't be used to spam an address we already have.
      if (contactError.statusCode === 409) {
        return NextResponse.json(
          { success: true, message: "You're already on the list — talk soon!" },
          { status: 200 }
        );
      }
      console.error("[waitlist] contact create failed:", contactError);
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 502 }
      );
    }

    // A failed welcome email shouldn't fail the signup.
    const { error: emailError } = await resend.emails.send({
      from: config.from,
      to: email,
      subject: config.subject,
      html: config.html,
    });
    if (emailError) {
      console.error("[waitlist] welcome email failed:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "You're on the list — talk soon!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[waitlist] error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

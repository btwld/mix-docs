import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "../../../lib/resend";

const waitlistSchema = z.object({
  email: z.email("Please enter a valid email address"),
  product: z.enum(["stargate", "code-analysis", "readiness"]),
});

type Product = z.infer<typeof waitlistSchema>["product"];

function welcomeHtml(
  wordmark: string,
  heading: string,
  pitch: string,
  expectations: string[]
) {
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

    <h2 style="color: #05040A;">${heading}</h2>

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
  {
    audienceId: string;
    from: string;
    subject: string;
    successMessage: string;
    html: string;
  }
> = {
  stargate: {
    audienceId: process.env.RESEND_AUDIENCE_ID_STARGATE ?? "",
    from: process.env.RESEND_FROM_EMAIL ?? "Stargate <hello@conceptatech.com>",
    subject: "You're on the Stargate waitlist",
    successMessage: "You're on the list — talk soon!",
    html: welcomeHtml(
      "stargate",
      "You're on the list!",
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
    successMessage: "You're on the list — talk soon!",
    html: welcomeHtml(
      "code-analysis",
      "You're on the list!",
      "Thanks for joining the Code Analysis waitlist. We're building an audit pipeline that turns any codebase into grades you can defend — deterministic scores, evidence-backed findings, and a report you can put in front of a client.",
      [
        "Early access when we launch",
        "Launch pricing for waitlist members",
        "Progress updates as the pipeline evolves",
      ]
    ),
  },
  readiness: {
    // Falls back to the Code Analysis audience so requests keep working
    // before a dedicated RESEND_AUDIENCE_ID_READINESS is provisioned.
    audienceId:
      process.env.RESEND_AUDIENCE_ID_READINESS ??
      process.env.RESEND_AUDIENCE_ID_CODE_ANALYSIS ??
      "",
    from: process.env.RESEND_FROM_EMAIL ?? "Concepta <hello@conceptatech.com>",
    subject: "Your Delivery Readiness Assessment request",
    successMessage:
      "Request received — we'll reach out to schedule a scoping call.",
    html: welcomeHtml(
      "readiness",
      "Request received!",
      "Thanks for requesting a Delivery Readiness Assessment. We'll reach out shortly to schedule a short scoping call. The engagement itself runs two to three weeks: we audit your codebase with Code Analysis, verify your release gates, and hand you a graded verdict with a sequenced remediation plan.",
      [
        "A short scoping call to size the engagement",
        "A fixed quote before any work starts",
        "A graded verdict and remediation plan in 2–3 weeks",
      ]
    ),
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, product } = waitlistSchema.parse(body);
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

    const resend = getResend();

    await resend.contacts.create({
      email,
      audienceId: config.audienceId,
    });

    // A failed welcome email shouldn't fail the signup.
    try {
      await resend.emails.send({
        from: config.from,
        to: email,
        subject: config.subject,
        html: config.html,
      });
    } catch (emailError) {
      console.error("[waitlist] welcome email failed:", emailError);
    }

    return NextResponse.json(
      { success: true, message: config.successMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error("[waitlist] error:", error);

    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      return NextResponse.json(
        { success: false, message: firstIssue?.message || "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

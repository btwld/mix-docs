import Link from "next/link";
import {
  Crosshair,
  ListChecks,
  Map,
  Package,
  TrendingUp,
} from "lucide-react";
import type { LandingContent } from "../types";
import { HeroWindow } from "./HeroWindow";
import { OutputsBento } from "./OutputsBento";
import { EVIDENCE_JSON } from "./snippets";

export const voyagerContent: LandingContent = {
  /* Voyager stays an isolated naming/tone experiment. The API slug is reused
     only so early-access signups continue to reach the existing audience. */
  product: "code-analysis",
  wordmarkName: "voyager",
  wordmarkShowByline: false,
  hero: {
    titleTop: "See any codebase whole.",
    titleGradient: "Know it like you wrote it.",
    lead: (
      <>
        Voyager turns an unfamiliar repository into a map you can navigate:
        how the system fits together, what deserves attention first, and a
        baseline that proves each fix made it better.
      </>
    ),
  },
  HeroWindow,
  stats: [
    { value: "Whole", label: "System context in one view" },
    { value: "Ranked", label: "Next moves with a reason" },
    { value: "0–100", label: "Baseline, not a report card" },
    { value: "Δ", label: "Progress on every rerun" },
  ],
  statement: (
    <>
      Most codebases outlive the context that built them.{" "}
      <span className="lp-gradient-text">
        Voyager rebuilds that missing context
      </span>{" "}
      — grounded in your architecture, connected to file-and-line evidence,
      and organized around what your team should do next.
    </>
  ),
  features: {
    eyebrow: "Developer equipment",
    title: "Built to help you move, not judge how you got here.",
    lead: "Use Voyager when you inherit a repository, join a project mid-flight, or need to make a risky change without six months of tribal knowledge.",
    items: [
      {
        icon: Map,
        title: "See the system, not a pile of files",
        body: "Modules, dependencies, state machines, and real request flows come together in one navigable picture.",
        wide: true,
      },
      {
        icon: ListChecks,
        title: "Start with the next right fix",
        body: "Security, release impact, churn, complexity, and fix dependencies become an ordered queue—with a reason for every position.",
        wide: true,
      },
      {
        icon: TrendingUp,
        title: "Make progress visible",
        body: "Fix, rerun, and compare against the same deterministic baseline. When the number moves, your code moved it.",
      },
      {
        icon: Crosshair,
        title: "Ask it to show its work",
        body: "Every signal carries file:line evidence, its source, and a confidence level. Coverage gaps stay visible too.",
      },
      {
        icon: Package,
        title: "Keep the context after the pass",
        body: "The maps, flows, evidence, and baseline stay with your team—ready for the next developer, decision, and change.",
      },
    ],
  },
  OutputsBento,
  marquee: {
    rowA: [
      "Inherited codebase",
      "Vendor handoff",
      "Team onboarding",
      "Release preparation",
      "Legacy modernization",
      "Architecture change",
      "Security hardening",
      "Technical due diligence",
    ],
    rowB: [
      "System map",
      "Module relationships",
      "Request flows",
      "Churn × complexity",
      "Release risks",
      "Fix order",
      "Coverage gaps",
      "Progress deltas",
      "Machine-readable output",
      "Shareable brief",
    ],
  },
  trustSplit: {
    eyebrow: "Evidence trail",
    title: "Every call comes with coordinates.",
    lead: "Voyager connects every signal to the code behind it, explains why it matters, and shows how confident you should be before acting.",
    bullets: [
      "File:line evidence and source on every signal",
      "Aligned with your intended architecture",
      "Coverage gaps and confidence disclosed",
      "Deterministic scoring — reruns are byte-equal",
    ],
    ctaLabel: "How the evidence works",
    snippet: EVIDENCE_JSON,
    snippetFile: "finding.json",
  },
  faq: [
    {
      q: "Who is Voyager for?",
      a: "Developers walking into code they did not write—or no longer remember clearly. That includes inherited products, vendor handoffs, acquisitions, legacy systems, and teams preparing a risky release. Voyager rebuilds the context the original team carried in their heads.",
    },
    {
      q: "What does a Voyager pass cover?",
      a: "The system's architecture, module relationships, request flows, security risks, maintenance hotspots, coverage gaps, and accumulated tech debt. It brings those views together so your team can understand both the whole system and the next concrete action.",
    },
    {
      q: "How does Voyager decide what comes first?",
      a: "It combines release and security impact with churn, complexity, blast radius, and fix dependencies. The result is not just a severity list: it explains why an item matters now, what evidence supports it, and what is safe to defer.",
    },
    {
      q: "What does Voyager measure?",
      a: "The current state of the codebase—not developer performance. Architecture, module quality, security, and tech debt each receive a 0–100 baseline so the team knows where to start and can measure how the system changes after the work.",
    },
    {
      q: "How do I know which findings to trust?",
      a: "Findings carry file:line evidence, a clear reason, and a confidence level. Voyager also discloses coverage gaps instead of treating silence as proof that everything is fine, so your team keeps the final engineering judgment.",
    },
    {
      q: "Does Voyager replace engineering judgment?",
      a: "No. Voyager gives your team context, evidence, and an ordered starting point. Developers still decide what fits the system, what to defer, and how each change should be implemented.",
    },
    {
      q: "What do I get at the end?",
      a: "A system map, hotspot catalog, finding catalog, flow catalog, coverage map, and code-health.json for your tooling—plus a consolidated PDF written for the team doing the fixing and polished enough to share with a client or stakeholder.",
    },
    {
      q: "Can you run it with us?",
      a: (
        <>
          Yes. The{" "}
          <Link href="/voyager/readiness">Delivery Readiness Assessment</Link>{" "}
          is a two-to-three-week engagement where we ground Voyager in your
          system, verify the release gates, and turn the evidence into an
          ordered remediation plan with your team.
        </>
      ),
    },
    {
      q: "When can I use it?",
      a: "Voyager is launching soon. Join the waitlist for early access, launch pricing, and progress updates.",
    },
  ],
  closingCta: {
    title: "Your next codebase comes with a map.",
    lead: "Join the Voyager waitlist for early access, launch pricing, and progress updates.",
    finePrint: "© 2026 · macOS · Linux · Windows",
  },
};

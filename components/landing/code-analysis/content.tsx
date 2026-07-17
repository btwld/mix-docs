import Link from "next/link";
import {
  Gauge,
  ShieldAlert,
  Anchor,
  CircleDollarSign,
  Package,
} from "lucide-react";
import type { LandingContent } from "../types";
import { HeroWindow } from "./HeroWindow";
import { OutputsBento } from "./OutputsBento";
import { CODE_HEALTH_JSON } from "./snippets";

export const codeAnalysisContent: LandingContent = {
  product: "code-analysis",
  wordmarkName: "code-analysis",
  hero: {
    titleTop: "See your code's health clearly.",
    titleGradient: "Audit it. Grade it. Prove it.",
    lead: (
      <>
        Code Analysis runs 10 static analyzers and a 7-phase AI audit pipeline
        over any repo — then hands you a four-dimension scorecard and a report
        you can put in front of a client.
      </>
    ),
  },
  HeroWindow,
  stats: [
    { value: "10", label: "Static analyzers" },
    { value: "7", label: "Pipeline phases" },
    { value: "4", label: "Score dimensions" },
    { value: "1", label: "Self-contained binary" },
  ],
  statement: (
    <>
      Expert review brings context. A repeatable baseline makes that judgment
      easier to act on.{" "}
      <span className="lp-gradient-text">
        Code Analysis adds deterministic, evidence-backed scores
      </span>
      , so the conversation skips straight to what to fix.
    </>
  ),
  features: {
    eyebrow: "Why Code Analysis",
    title: "An audit you can trust. And rerun.",
    lead: "Ten static analyzers normalized into one schema, then AI agents fanned out per module — grounded by your context, capped by your budget.",
    items: [
      {
        icon: Gauge,
        title: "Four-dimension scorecard",
        body: "Architecture, Module Quality, Security, and Tech-Debt — each scored 0–100 and banded A (“market-leading”) to F (“critical”). Same input, byte-equal scores, every run.",
        wide: true,
      },
      {
        icon: ShieldAlert,
        title: "Security that refuses to average",
        body: "Deliberately pessimistic: your worst high-risk module dominates the score. One critical hole can’t hide behind ninety clean files.",
        wide: true,
      },
      {
        icon: Anchor,
        title: "Grounded, not guessy",
        body: "Your project-context file is ground truth. Agents flag divergences instead of inventing them, and every score carries a confidence level.",
      },
      {
        icon: CircleDollarSign,
        title: "Budget-capped & resumable",
        body: "Hard spend caps, content-hash caching, and runs that resume exactly where they stopped.",
      },
      {
        icon: Package,
        title: "One binary, anywhere",
        body: "Static analysis ships self-contained for macOS, Linux, and Windows — no AI, no network required.",
      },
    ],
  },
  OutputsBento,
  marquee: {
    rowA: [
      "scc",
      "gitleaks",
      "trivy",
      "opengrep",
      "eslint",
      "knip",
      "dependency-cruiser",
      "jscpd",
      "lizard",
      "git-history",
    ],
    rowB: [
      "Static analysis",
      "Indexing",
      "Architecture",
      "Dead code",
      "Module docs",
      "Security review",
      "Tech-debt review",
      "Consolidation",
      "PDF report",
      "Hotspots",
      "Findings",
      "Flows",
      "Coverage",
    ],
  },
  trustSplit: {
    eyebrow: "Determinism",
    title: "Same repo in. Same numbers out.",
    lead: "The scoring engine is pure and reproducible — rerun an audit and the numbers don't drift. What changes between runs is your code, not the ruler.",
    bullets: [
      "Grounded by your project-context file",
      "Budget caps, resumable runs, content-hash caching",
      "Deterministic scoring — reruns are byte-equal",
    ],
    ctaLabel: "How scoring works",
    snippet: CODE_HEALTH_JSON,
    snippetFile: "code-health.json",
  },
  faq: [
    {
      q: "What does it actually run?",
      a: "Ten static-analysis tools in parallel — scc, gitleaks, trivy, opengrep, eslint, knip, dependency-cruiser, jscpd, lizard, plus a git-history pass — normalized into one schema. Then a 7-phase AI pipeline layers architecture, dead-code, documentation, and security analysis on top, fanning out one agent per module.",
    },
    {
      q: "How are the grades computed?",
      a: "Each of the four dimensions — Architecture, Module Quality, Security, Tech-Debt — is scored 0–100 and banded A to F. Scoring is deterministic: the same input produces byte-equal scores. Security is deliberately pessimistic — the worst high-risk module dominates the headline instead of being averaged away.",
    },
    {
      q: "Won't the AI hallucinate findings?",
      a: "Every AI phase is grounded by your project-context file — domain, tenancy model, intended architecture. Agents must not contradict it and flag divergences instead of guessing. On top of that, every score ships with a high/medium/low confidence level, so you know exactly how much to trust each number.",
    },
    {
      q: "What does an audit cost to run?",
      a: "You set a hard spend cap and the pipeline stops before any phase that would exceed it. Content-hash caching and resumable runs mean interruptions and reruns don't burn the same spend twice.",
    },
    {
      q: "What do I get at the end?",
      a: "A hotspot catalog, finding catalog, flow catalog, coverage map, and code-health.json for your tooling — plus a consolidated final report rendered to PDF, written to be client-shareable as-is.",
    },
    {
      q: "Can Concepta run the audit for me?",
      a: (
        <>
          Yes — that&apos;s the{" "}
          <Link href="/code-analysis/readiness">
            Delivery Readiness Assessment
          </Link>
          :
          a 2–3 week engagement where we run the audit on your codebase, verify
          your release gates, and walk you through a graded verdict plus a
          sequenced remediation plan.
        </>
      ),
    },
    {
      q: "When can I use it?",
      a: "Code Analysis is launching soon. Join the waitlist for early access, launch pricing, and progress updates.",
    },
  ],
  closingCta: {
    title: "Be first in line for the audit.",
    lead: "Code Analysis is launching soon. Join the waitlist for early access, launch pricing, and progress updates.",
    finePrint: "© 2026 · macOS · Linux · Windows",
  },
};

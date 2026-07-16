"use client";

import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { Fingerprint, Flame, Gauge, Map, Rocket, ShieldAlert } from "lucide-react";
import "../../landing.css";
import { Aurora } from "../../sections/Aurora";
import { Stats } from "../../sections/Stats";
import { Statement } from "../../sections/Statement";
import { Features } from "../../sections/Features";
import { TrustSplit } from "../../sections/TrustSplit";
import { Faq } from "../../sections/Faq";
import { LandingButton } from "../../LandingButton";
import { SectionHead } from "../../SectionHead";
import { WaitlistForm } from "../../WaitlistForm";
import { fadeUp, reveal, staggerParent, staggerChild } from "../../motion";
import type { LandingContent } from "../../types";
import { BusinessImpactBento } from "./BusinessImpactBento";
import { ReadinessHeroWindow } from "./ReadinessHeroWindow";
import { METHODOLOGY_JSON } from "./snippets";

const STATS: LandingContent["stats"] = [
  { value: "2–3", label: "Weeks to a verdict" },
  { value: "29", label: "Agent analyses in one audit" },
  { value: "101→12", label: "Findings triaged into P0 actions" },
  { value: "100%", label: "Source coverage, gaps disclosed" },
];

const FEATURES: LandingContent["features"] = {
  eyebrow: "The deliverable",
  title: "Six lenses. One verdict.",
  lead: "Everything below comes from one audit run — deterministic where tools can measure, AI-assisted where judgment is needed, and every claim tied to a file and line.",
  items: [
    {
      icon: Gauge,
      title: "The graded verdict",
      body: "Architecture, Module Quality, Security, and Tech-Debt — scored 0–100, banded A–F, with a confidence level on every number and a module-by-module view of where the risk concentrates.",
      wide: true,
    },
    {
      icon: Rocket,
      title: "Release gates, pass / fail",
      body: "Can you cut a release today? Lockfile reproducibility, analyzer, tests, formatting, dependency advisories, SDK compatibility — each gate checked with deterministic evidence, not opinion.",
      wide: true,
    },
    {
      icon: ShieldAlert,
      title: "Business impact, quantified",
      body: "Every exposure with file:line evidence and OWASP / CWE mapping — and in business terms: what's exposed, who can reach it, the regulatory dollars at stake, and what it costs to fix.",
      wide: true,
    },
    {
      icon: Fingerprint,
      title: "Privacy, mapped",
      body: "Every flow tagged with the personal data it touches — location, camera, push tokens, device IDs — surfacing undisclosed third-party leaks and consent checks that don't line up. A data map your counsel can use.",
      wide: true,
    },
    {
      icon: Flame,
      title: "Where the next incident is brewing",
      body: "Churn × complexity hotspots, systemic test gaps, duplication, and verified dead code — the tech debt that actually bites, ranked.",
      wide: true,
    },
    {
      icon: Map,
      title: "A map of your own system",
      body: "Business rules with enforcement points, state machines, module dependencies, and plain-English flows. Documentation your team keeps, whatever you do next.",
      wide: true,
    },
  ],
};

const STEPS = [
  {
    num: "01",
    title: "Ground, then run",
    body: "We write the project-context file with your team — domain, tenancy, intended architecture — so the audit is grounded in your reality. Then the pipeline runs: 10 static analyzers, the 7-phase AI audit, and the release-gate checks.",
  },
  {
    num: "02",
    title: "Verdict and walkthrough",
    body: "You get the scorecard, the release gates, and the full findings catalog — walked through live, once in engineering terms and once in business terms.",
  },
  {
    num: "03",
    title: "The sequenced plan",
    body: "Findings become an ordered remediation plan — safety first, refactors after — with effort estimates per fix. Run it with your team, or have Concepta own the remediation with human-in-the-loop review.",
  },
];

const TRUST_SPLIT: LandingContent["trustSplit"] = {
  eyebrow: "Honesty",
  title: "An audit that shows its blind spots.",
  lead: "Every score carries a confidence level, and every run discloses exactly what automated analysis did and didn't cover. You'll know how much to trust each number — because the report tells you.",
  bullets: [
    "Confidence level on every score and finding",
    "Coverage gaps disclosed — never papered over",
    "Deterministic evidence — rerun it, get the same numbers",
    "Policy-backed ceilings — an unrotated secret caps the grade, no matter what else is right",
  ],
  ctaLabel: "Questions, answered",
  snippet: METHODOLOGY_JSON,
  snippetFile: "methodology.json",
};

const FAQ: LandingContent["faq"] = [
  {
    q: "What exactly do we get?",
    a: "A graded four-dimension scorecard, a pass/fail release-gate report, the full findings catalog with file:line evidence, a documented map of your system — business rules, state machines, flows — and a sequenced remediation plan. All of it consolidated into a PDF you can share with your board, your buyer, or your client.",
  },
  {
    q: "How is this different from hiring a consultant to review our code?",
    a: "A consultant hands you opinions; you then defend them in meetings. The assessment runs on the Code Analysis pipeline: deterministic scores, evidence-backed findings, and disclosed blind spots. Rerun it after remediation and the numbers move because your code changed — not because someone changed their mind.",
  },
  {
    q: "What do you need from us?",
    a: "Read-only access to the repository and about an hour with someone who knows the system, so we can write the project-context file that grounds the audit. No production access required.",
  },
  {
    q: "Does this only cover security?",
    a: "No — security is one of six lenses. The same run grades architecture, module quality, and tech debt, checks your release gates, maps where personal data flows, and documents your system's business rules. The sample verdict above comes from a real, anonymized assessment.",
  },
  {
    q: "What happens after the assessment?",
    a: "Your team can run the plan as-is — it's written to be executable, with effort estimates per fix. Or Concepta owns the remediation: AI-assisted fixes with human-in-the-loop review, bundled into releases, tracked to done.",
  },
  {
    q: "How much does it cost?",
    a: "Scoped to the size of the codebase. Request an assessment below and we'll set up a short call — you'll have a quote before any work starts, and the audit itself runs under a hard budget cap.",
  },
];

export function ReadinessLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="lp-root" data-pagefind-ignore>
        <Aurora />

        {/* Hero — echoes the home page's "Know whether it's safe to ship." */}
        <section className="lp-shell lp-hero" id="top">
          <motion.h1
            className="lp-hero-title"
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
          >
            Know whether it&apos;s
            <br />
            <span className="lp-gradient-text">safe to ship.</span>
          </motion.h1>

          <motion.p
            className="lp-hero-sub"
            initial="hidden"
            animate="visible"
            custom={0.18}
            variants={fadeUp}
          >
            The Delivery Readiness Assessment is a two-to-three-week
            engagement: we run the Code Analysis audit over your repo, verify
            your release gates, and hand you a graded verdict — file:line
            evidence for your engineers, business impact for your decisions.
          </motion.p>

          <motion.div
            className="lp-hero-cta"
            initial="hidden"
            animate="visible"
            custom={0.28}
            variants={fadeUp}
          >
            <LandingButton href="#request" arrow="right">
              Request an assessment
            </LandingButton>
            <LandingButton href="#how" variant="secondary">
              See what you get
            </LandingButton>
          </motion.div>

          <ReadinessHeroWindow />
        </section>

        <Stats stats={STATS} />

        <Statement>
          Advice doesn&apos;t ship. Before you bet a launch, an acquisition, or
          a client on a codebase,{" "}
          <span className="lp-gradient-text">
            get a verdict with the evidence attached
          </span>{" "}
          — graded, gated, and sequenced into a plan.
        </Statement>

        <Features features={FEATURES} />

        <BusinessImpactBento />

        {/* Engagement timeline */}
        <section className="lp-shell lp-gap" id="process">
          <SectionHead
            eyebrow="The engagement"
            title="Two to three weeks, start to plan."
            lead="No embedded team, no six-month discovery. A tight engagement with a hard end date and a concrete artifact at every step."
          />
          <motion.div
            className="lp-features"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.num}
                variants={staggerChild}
                className="lp-feature"
              >
                <span className="lp-feature-icon lp-step-num">{step.num}</span>
                <h3 className="lp-feature-title">{step.title}</h3>
                <p className="lp-feature-body">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <TrustSplit trustSplit={TRUST_SPLIT} />

        <Faq faq={FAQ} />

        {/* Request CTA — a service request, not a launch waitlist */}
        <section className="lp-shell lp-gap" id="request">
          <motion.div className="lp-cta-card" {...reveal}>
            <div className="lp-cta-glow" aria-hidden="true" />
            <h2 className="lp-cta-title">Know where your release stands.</h2>
            <p className="lp-cta-lead">
              Leave your email and we&apos;ll set up a short scoping call —
              you&apos;ll have a quote before any work starts. Two to three
              weeks later: the verdict, and the plan.
            </p>
            <div className="lp-cta-reqs">
              <span className="lp-cta-reqs-label">All we need →</span>
              <span className="lp-graph-cap">read-only repo access</span>
              <span className="lp-graph-cap">one hour with your team</span>
              <span className="lp-graph-cap">no production access</span>
            </div>
            <WaitlistForm
              product="readiness"
              buttonLabel="Request an assessment"
              loadingLabel="Sending…"
            />
            <div className="lp-cta-links">
              <Link href="/code-analysis">Powered by Code Analysis</Link>
              <span aria-hidden="true">·</span>
              <Link
                href="/"
                className="lp-cta-concepta"
                aria-label="Concepta home"
              >
                <img src="/assets/logo_concepta.svg" alt="Concepta" />
              </Link>
              <span aria-hidden="true">·</span>
              <span className="lp-cta-fine">© 2026 · a Concepta engagement</span>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}

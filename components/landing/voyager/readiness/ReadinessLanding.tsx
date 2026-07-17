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
  { value: "2–3", label: "Weeks to a working plan" },
  { value: "One", label: "Decision-ready system picture" },
  { value: "101→12", label: "Signals distilled into priority actions" },
  { value: "100%", label: "Source coverage, gaps disclosed" },
];

const FEATURES: LandingContent["features"] = {
  eyebrow: "What your team gets",
  title: "Six lenses. One decision-ready picture.",
  lead: "Everything comes together in one grounded assessment, with every claim tied to the code and every recommendation connected to a clear next action.",
  items: [
    {
      icon: Gauge,
      title: "A four-part baseline",
      body: "Architecture, Module Quality, Security, and Tech-Debt—scored 0–100, with confidence on every number and a module-by-module view of where attention will have the most impact.",
      wide: true,
    },
    {
      icon: Rocket,
      title: "Release gates with clear next steps",
      body: "Release prerequisites, dependency health, tests, formatting, and compatibility—each shown with evidence and paired with the work needed to move it.",
      wide: true,
    },
    {
      icon: ShieldAlert,
      title: "Business impact, quantified",
      body: "Every exposure with file:line evidence and the business context around it: what's exposed, who can reach it, the potential liability, and what it costs to fix.",
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
      title: "Where maintenance is getting expensive",
      body: "Churn × complexity hotspots, systemic test gaps, duplication, and verified dead code—the tech debt most likely to slow the next change, ranked.",
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
    title: "Ground, then survey",
    body: "We learn the domain, intended architecture, and release goals with your team. Then we map the system, identify what needs attention, and establish the baseline for the work ahead.",
  },
  {
    num: "02",
    title: "Findings and walkthrough",
    body: "You get the baseline, the release gates, and the full evidence catalog—walked through live in engineering terms, with a stakeholder view for the decisions around it.",
  },
  {
    num: "03",
    title: "The sequenced plan",
    body: "Findings become an ordered remediation plan—safety first, refactors after—with effort estimates per fix. Run it with your team, or have us own the remediation with your engineers reviewing each release.",
  },
];

const TRUST_SPLIT: LandingContent["trustSplit"] = {
  eyebrow: "Evidence, including the gaps",
  title: "A baseline that shows its blind spots.",
  lead: "Every score carries confidence, and every run discloses exactly what automated analysis did and did not cover. Your team can see how much weight to give each signal.",
  bullets: [
    "Confidence level on every score and finding",
    "Coverage gaps disclosed — never papered over",
    "Deterministic evidence — rerun it, get the same numbers",
    "Policy-backed guardrails keep critical release risks visible",
  ],
  ctaLabel: "Questions, answered",
  snippet: METHODOLOGY_JSON,
  snippetFile: "methodology.json",
};

const FAQ: LandingContent["faq"] = [
  {
    q: "What exactly do we get?",
    a: "A four-dimension baseline, release-gate status with next steps, the full findings catalog with file:line evidence, a documented system map—business rules, state machines, and flows—and a sequenced remediation plan. It is consolidated into a PDF you can share with your team, buyer, board, or client.",
  },
  {
    q: "How is this different from hiring a consultant to review our code?",
    a: "Expert review provides context and judgment. The assessment adds deterministic scoring, evidence-backed findings, and disclosed blind spots, giving your team a repeatable baseline to rerun after the work and measure what changed.",
  },
  {
    q: "What do you need from us?",
    a: "Read-only access to the repository and about an hour with someone who knows the system, so the assessment reflects the domain, intended architecture, and release goals. No production access required.",
  },
  {
    q: "Does this only cover security?",
    a: "No—security is one of six lenses. The same run baselines architecture, module quality, and tech debt, checks your release gates, maps where personal data flows, and documents the system's business rules. The sample above comes from a real, anonymized assessment.",
  },
  {
    q: "What happens after the assessment?",
    a: "Your team can run the plan as-is—it's written to be executable, with effort estimates per fix. Or we can own the remediation with your team's review, bundle the work into releases, and track every action to done.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is scoped to the size and shape of the codebase. Request an assessment below and we'll set up a short call—you'll have a clear quote before any work starts.",
  },
];

export function ReadinessLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="lp-root" data-pagefind-ignore>
        <Aurora />

        {/* The service page keeps Voyager's developer-first promise while
            making the release decision explicit for stakeholders. */}
        <section className="lp-shell lp-hero" id="top">
          <motion.h1
            className="lp-hero-title"
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
          >
            Know what&apos;s ready.
            <br />
            <span className="lp-gradient-text">Know what comes next.</span>
          </motion.h1>

          <motion.p
            className="lp-hero-sub"
            initial="hidden"
            animate="visible"
            custom={0.18}
            variants={fadeUp}
          >
            The Delivery Readiness Assessment is a two-to-three-week
            engagement. We ground Voyager in your system, verify the release
            gates, and give your team a clear plan—file:line evidence for the
            work, plus the stakeholder context around each decision.
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
            turn the evidence into an ordered plan
          </span>{" "}
          — what is ready, what needs attention, and what your team should do
          first.
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
              weeks later: a grounded baseline and a working plan.
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
              <Link href="/voyager">Powered by Voyager</Link>
              <span aria-hidden="true">·</span>
              <span className="lp-cta-fine">© 2026 · Delivery readiness assessment</span>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}

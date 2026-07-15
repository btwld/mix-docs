"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionHead } from "../SectionHead";
import { HighlightedCode } from "../HighlightedCode";
import { EASE, staggerParent, staggerChild } from "../motion";
import { EVAL_TS } from "./snippets";

/* Two upcoming-feature spotlights: human-in-the-loop (stargate#149)
   and the @stargate/evals package (stargate#189). */

const HITL_BULLETS = [
  "The model designs the form — fields and actions generated from context",
  "Respond in the studio or over the API; the run resumes where it paused",
  "Auditable by default — every answer lands in the artifact as a human decision record",
];

/* Audiences mirror the demo workflows shipped with the feature:
   customer recovery, incident command review, presentation tutor. */
const HITL_AUDIENCES = [
  {
    kind: "APPROVAL",
    who: "Support & finance ops",
    body: "Refunds above the auto-approve limit wait for a lead's sign-off — not a model's guess.",
  },
  {
    kind: "REVIEW",
    who: "On-call & incident teams",
    body: "The agent drafts the remediation plan; the commander authorizes it before anything runs.",
  },
  {
    kind: "SELECTION",
    who: "Client-facing teams",
    body: "Tone, scope, and final wording stay a person's call — the human picks what ships.",
  },
];

function HumanInputSection() {
  return (
    <section className="lp-shell lp-gap" id="human-input">
      <div className="lp-split">
        <div>
          <SectionHead
            align="left"
            eyebrow="Coming soon · Human input"
            title="The workflow pauses. A person decides."
            lead="Agents do the fast work; judgment stays with your team. When a step needs a sign-off, an edit, or a choice between options, the agent calls request_human_input — the run pauses, the right person decides, and the workflow resumes with that decision on the record."
          />
          <ul className="lp-checklist">
            {HITL_BULLETS.map((bullet) => (
              <li key={bullet}>
                <Sparkles size={15} strokeWidth={2.2} /> {bullet}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="lp-hitl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <div className="lp-hitl-card">
            <div className="lp-hitl-head">
              <span className="lp-hitl-title">Human input requested</span>
              <span className="lp-severity-chip lp-hitl-kind">APPROVAL</span>
            </div>
            <p className="lp-hitl-prompt">
              Refund exceeds the auto-approve limit. Approve a $1,840 refund
              for order #58231?
            </p>
            <div className="lp-hitl-field">
              <span className="lp-hitl-label">Note to customer · optional</span>
              <span className="lp-hitl-input" aria-hidden="true" />
            </div>
            <div className="lp-hitl-actions">
              <span className="lp-hitl-btn">Request changes</span>
              <span className="lp-hitl-btn lp-hitl-btn-primary">
                Approve refund
              </span>
            </div>
            <div className="lp-report-foot">
              request_human_input · run paused 00:42
            </div>
          </div>

          <div className="lp-run lp-hitl-run">
            <div className="lp-run-row">
              <Check size={14} strokeWidth={2.5} /> execution:hitl:requested ·
              run paused
            </div>
            <div className="lp-run-row">
              <Check size={14} strokeWidth={2.5} /> human responded · action:
              approve
            </div>
            <div className="lp-run-row">
              <span className="lp-run-dot" /> workflow resumed
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p className="lp-hitl-aud-kicker" variants={staggerChild}>
          Built for the moments a person must own
        </motion.p>
        <div className="lp-hitl-aud">
          {HITL_AUDIENCES.map((a) => (
            <motion.div
              key={a.kind}
              className="lp-hitl-aud-card"
              variants={staggerChild}
            >
              <span className="lp-severity-chip lp-hitl-kind">{a.kind}</span>
              <p className="lp-hitl-aud-who">{a.who}</p>
              <p className="lp-hitl-aud-body">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function EvalsSection() {
  return (
    <section className="lp-shell lp-gap" id="evals">
      <SectionHead
        eyebrow="Coming soon · @stargate/evals"
        title="Score every run. Diff every change."
        lead="Run a dataset through the workflow, score each case with versioned scorers, and diff runs — improvements, regressions, unchanged — pinned to the exact spec and dataset by hash."
      />

      <motion.div
        className="lp-spot-window"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      >
        <div className="lp-window-glow" aria-hidden="true" />
        <div className="lp-window">
          <div className="lp-window-bar">
            <div className="lp-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <em className="lp-window-file">greet.eval.ts</em>
          </div>
          <div className="lp-window-body">
            <div className="lp-window-code">
              <HighlightedCode code={EVAL_TS} lang="typescript" />
            </div>
            <div className="lp-stage">
              <span className="lp-stage-label">Eval run · diffEvalRuns</span>
              <div className="lp-eval">
                <div className="lp-eval-top">
                  <span className="lp-eval-rate">91.7%</span>
                  <span className="lp-eval-cases">12 cases · 11 passed</span>
                </div>
                <div className="lp-eval-row">
                  <span className="lp-severity-chip lp-eval-pass">PASS</span>
                  <span className="lp-eval-name">outputEquals · greet</span>
                  <span className="lp-eval-count">12/12</span>
                </div>
                <div className="lp-eval-row">
                  <span className="lp-severity-chip lp-eval-warn">1 FAIL</span>
                  <span className="lp-eval-name">nodeStatus · Completed</span>
                  <span className="lp-eval-count">11/12</span>
                </div>
                <div className="lp-eval-diff">
                  <span className="is-up">+2 improvements</span>
                  <span>0 regressions</span>
                  <span>10 unchanged</span>
                </div>
                <div className="lp-report-foot">
                  .evals/runs/018f66aa….json · specHash 9c41f2
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Spotlights() {
  return (
    <>
      <HumanInputSection />
      <EvalsSection />
    </>
  );
}

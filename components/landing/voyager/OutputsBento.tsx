"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, GitBranch, Map, TrendingUp } from "lucide-react";
import { SectionHead } from "../SectionHead";
import { staggerChild, staggerParent } from "../motion";
import { SIGNAL_COLORS } from "./snippets";

function ContextVisual() {
  return (
    <div
      className="vy-value-visual vy-context-visual"
      role="img"
      aria-label="A system flow from route to auth, billing, and data modules"
    >
      <div className="vy-context-node is-root">
        <Map size={14} aria-hidden="true" /> API route
      </div>
      <span className="vy-context-line" aria-hidden="true" />
      <div className="vy-context-branches">
        <span>auth</span>
        <span>billing</span>
        <span>data</span>
      </div>
      <div className="vy-context-foot">
        <GitBranch size={13} aria-hidden="true" /> 12 flows · 34 modules
      </div>
    </div>
  );
}

function PriorityVisual() {
  const items = [
    { level: "P0", title: "Expire sessions", note: "blocks launch" },
    { level: "P1", title: "Bound retries", note: "high churn" },
    { level: "P2", title: "Remove logger", note: "safe to defer" },
  ];
  return (
    <div className="vy-value-visual vy-queue-visual">
      {items.map((item) => (
        <div className="vy-queue-row" key={item.level}>
          <span style={{ color: SIGNAL_COLORS[item.level] }}>{item.level}</span>
          <b>{item.title}</b>
          <small>{item.note}</small>
        </div>
      ))}
    </div>
  );
}

function ProgressVisual() {
  return (
    <div className="vy-value-visual vy-proof-visual">
      <div className="vy-proof-top">
        <span className="vy-proof-icon">
          <TrendingUp size={18} aria-hidden="true" />
        </span>
        <span className="vy-proof-number">+18</span>
        <span className="vy-proof-label">security since last pass</span>
      </div>
      <div
        className="vy-proof-bars"
        aria-label="Security improved from 58 to 76"
      >
        <span>
          <i style={{ width: "58%" }} />
        </span>
        <ArrowRight size={14} aria-hidden="true" />
        <span className="is-now">
          <i style={{ width: "76%" }} />
        </span>
      </div>
      <div className="vy-proof-foot">
        <Check size={12} aria-hidden="true" /> deterministic rerun
      </div>
    </div>
  );
}

const VALUES = [
  {
    num: "01",
    eyebrow: "Understand",
    title: "See how the system fits together.",
    body: "Start with modules, dependencies, and real request flows—not a directory tree you still have to decode.",
    Visual: ContextVisual,
  },
  {
    num: "02",
    eyebrow: "Prioritize",
    title: "Know the next right move.",
    body: "Signals arrive in order, with the reason each one matters now and what is safe to leave for later.",
    Visual: PriorityVisual,
  },
  {
    num: "03",
    eyebrow: "Improve",
    title: "Prove the fix made it better.",
    body: "Rerun the same baseline and show the delta. The ruler stays still; your code is what changed.",
    Visual: ProgressVisual,
  },
];

const ARTIFACTS = [
  "system map",
  "hotspot catalog",
  "finding catalog",
  "flow catalog",
  "coverage map",
  "code-health.json",
  "shareable PDF",
];

export function OutputsBento() {
  return (
    <section className="lp-shell lp-gap" id="deliverables">
      <SectionHead
        eyebrow="The downlink"
        title="Not more findings. A way forward."
        lead="Voyager turns analysis into three things a developer can use immediately: context, an ordered next move, and visible progress."
      />

      <motion.div
        className="vy-value-grid"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {VALUES.map((item) => {
          const Visual = item.Visual;
          return (
            <motion.article
              className="vy-value-card"
              key={item.num}
              variants={staggerChild}
            >
              <div className="vy-value-meta">
                <span>{item.num}</span>
                <span>{item.eyebrow}</span>
              </div>
              <Visual />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        className="vy-artifacts"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
      >
        <span className="vy-artifacts-label">Every pass also leaves behind</span>
        <div className="vy-artifact-list">
          {ARTIFACTS.map((artifact) => (
            <span key={artifact}>{artifact}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

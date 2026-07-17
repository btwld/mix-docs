"use client";

import { motion } from "framer-motion";
import { SectionHead } from "../../SectionHead";
import { staggerParent, staggerChild } from "../../motion";
import { SEVERITY_COLORS } from "../snippets";

/* All figures come from the sample assessment report (client anonymized). */

function RegulatoryMock() {
  const exposures = [
    {
      v: "FTC Act §5",
      l: "US unfair / deceptive-practices enforcement — civil penalties up to ~$51K per violation",
    },
    {
      v: "$2,500–$7,500",
      l: "per CCPA / CPRA violation — the higher tier covers sensitive data like precise location",
    },
    {
      v: "50-state",
      l: "breach-notification duties, where applicable",
    },
  ];
  return (
    <div className="lp-tile-body">
      <span className="lp-bi-title">Regulatory exposure</span>
      <div className="lp-ex-grid">
        {exposures.map((e) => (
          <div key={e.v} className="lp-ex">
            <div className="lp-ex-v">{e.v}</div>
            <div className="lp-ex-l">{e.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeverityMock() {
  const rows = [
    { name: "Critical", count: 1, color: SEVERITY_COLORS.critical },
    { name: "High", count: 6, color: SEVERITY_COLORS.high },
  ];
  return (
    <div className="lp-tile-body">
      <span className="lp-bi-title">Severity snapshot</span>
      <div className="lp-bi-hero">
        <span className="lp-bi-hero-num">7</span>
        <span className="lp-bi-hero-label">headline findings</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="lp-sev-line">
          <span className="lp-sev-swatch" style={{ background: r.color }} />
          {r.name}
          <b>{r.count}</b>
        </div>
      ))}
    </div>
  );
}

function PostureMock() {
  return (
    <div className="lp-tile-body">
      <span className="lp-bi-title">Decision posture</span>
      <div className="lp-bi-hero">
        <span className="lp-bi-hero-num is-crit">7</span>
        <span className="lp-bi-hero-label">awaiting action</span>
      </div>
      <div className="lp-bi-hero">
        <span className="lp-bi-hero-num is-warn">0</span>
        <span className="lp-bi-hero-label">risk accepted &amp; deferred</span>
      </div>
    </div>
  );
}

function EffortMock() {
  const rows = [
    { fix: "Rotate & restrict backend keys", effort: "1 day" },
    { fix: "Harden the in-app browser", effort: "1 day" },
    { fix: "Purge key from git history", effort: "1–2 days" },
  ];
  return (
    <div className="lp-tile-body">
      <span className="lp-bi-title">Remediation effort</span>
      {rows.map((r) => (
        <div key={r.fix} className="lp-effort-line">
          {r.fix}
          <span className="lp-graph-cap">{r.effort}</span>
        </div>
      ))}
    </div>
  );
}

function ReachMock() {
  const who = [
    "anyone with a copy of the app",
    "anyone watching its network traffic",
    "anyone who can edit backend records",
  ];
  return (
    <div className="lp-tile-body">
      <span className="lp-bi-title">Who can reach it</span>
      <div className="lp-dual-chips" style={{ marginTop: 0 }}>
        {who.map((w) => (
          <span key={w} className="lp-graph-cap">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

const TILES = [
  {
    cap: "Sourced to statute in the report — illustrative, not legal advice.",
    wide: true,
    Mock: RegulatoryMock,
  },
  {
    cap: "The 101-cluster catalog, distilled to what matters now.",
    wide: false,
    Mock: SeverityMock,
  },
  {
    cap: "Deferring a risk is recorded as a business decision — with a date.",
    wide: false,
    Mock: PostureMock,
  },
  {
    cap: "Every fix sized in days, not story points.",
    wide: false,
    Mock: EffortMock,
  },
  {
    cap: "Exposure written in people, not CVEs.",
    wide: false,
    Mock: ReachMock,
  },
];

export function BusinessImpactBento() {
  return (
    <section className="lp-shell lp-gap" id="impact">
      <SectionHead
        eyebrow="Business impact"
        title="The same finding, translated for every room."
        lead="Engineers get file:line evidence and a concrete fix. Stakeholders get the exposure, reach, and effort around the same signal—every figure sourced in the report. Sample data from a real, anonymized assessment."
      />

      <motion.div
        className="lp-bento"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {TILES.map((t) => {
          const Mock = t.Mock;
          return (
            <motion.div
              key={t.cap}
              variants={staggerChild}
              className={"lp-tile" + (t.wide ? " lp-tile-wide" : "")}
            >
              <Mock />
              <p className="lp-tile-cap">{t.cap}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

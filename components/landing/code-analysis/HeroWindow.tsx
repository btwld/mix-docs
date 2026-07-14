"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, FileText } from "lucide-react";
import { HighlightedCode } from "../HighlightedCode";
import { EASE } from "../motion";
import {
  AUDIT_CMD,
  CODE_HEALTH_JSON,
  OUTPUT_LS,
  BAND_COLORS,
} from "./snippets";

/* Run stage: the 7-phase pipeline mid-flight */
const RUN_PHASES = [
  { label: "Static analysis", state: "done" },
  { label: "Indexing", state: "done" },
  { label: "Architecture", state: "done" },
  { label: "Dead code", state: "done" },
  { label: "Module docs · ×12 agents", state: "done" },
  { label: "Security & tech-debt · ×12 agents", state: "running" },
  { label: "Consolidation + report", state: "pending" },
  { label: "PDF render", state: "pending" },
] as const;

function RunStage() {
  return (
    <div className="lp-run">
      {RUN_PHASES.map((p) => (
        <div
          key={p.label}
          className={"lp-run-row" + (p.state === "pending" ? " is-pending" : "")}
        >
          {p.state === "done" && <Check size={14} strokeWidth={2.4} />}
          {p.state === "running" && <span className="lp-run-dot" />}
          {p.state === "pending" && <span className="lp-run-pending-dot" />}
          <span>{p.label}</span>
          {p.state === "running" && (
            <span className="lp-run-bar">
              <span />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* Scorecard stage: four dimensions, banded A–F */
const GRADES = [
  { name: "Architecture", band: "B", value: 82, confidence: "high" },
  { name: "Module Quality", band: "C", value: 74, confidence: "high" },
  { name: "Security", band: "D", value: 58, confidence: "medium" },
  { name: "Tech-Debt", band: "C", value: 71, confidence: "high" },
];

function ScorecardStage() {
  return (
    <div className="lp-grades">
      {GRADES.map((g) => {
        const color = BAND_COLORS[g.band];
        return (
          <div key={g.name} className="lp-grade-tile">
            <div className="lp-grade-head">
              <span className="lp-grade-letter" style={{ color }}>
                {g.band}
              </span>
              <span className="lp-grade-value">{g.value}/100</span>
            </div>
            <span className="lp-grade-name">{g.name}</span>
            <span className="lp-grade-bar">
              <span style={{ width: `${g.value}%`, background: color }} />
            </span>
            <span className="lp-grade-conf">
              <span
                className="lp-conf-dot"
                style={{
                  background:
                    g.confidence === "high" ? "var(--lp-accent)" : "#FBBF24",
                }}
              />
              {g.confidence} confidence
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* Report stage: the client-shareable deliverable */
function ReportStage() {
  return (
    <div className="lp-report-mock">
      <div>
        <p className="lp-report-title">Security Audit — acme-api</p>
        <p className="lp-report-sub">code-analysis · v0.1 · 34 modules</p>
      </div>
      <div className="lp-report-row">
        <span
          className="lp-severity-chip"
          style={{ background: "rgba(251,146,60,0.15)", color: BAND_COLORS.D }}
        >
          HIGH
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="lp-report-file">src/auth/session.ts</p>
          <p className="lp-report-desc">Session tokens never expire</p>
        </div>
      </div>
      <div className="lp-report-foot">
        <FileText size={12} strokeWidth={2} />
        PDF · client-shareable as-is
      </div>
    </div>
  );
}

const TABS = [
  {
    key: "run",
    name: "Run",
    code: AUDIT_CMD,
    lang: "bash" as const,
    stageLabel: "Pipeline · 7 phases",
    Stage: RunStage,
  },
  {
    key: "scorecard",
    name: "Scorecard",
    code: CODE_HEALTH_JSON,
    lang: "json" as const,
    stageLabel: "Scorecard · 4 dimensions · A–F",
    Stage: ScorecardStage,
  },
  {
    key: "report",
    name: "Report",
    code: OUTPUT_LS,
    lang: "bash" as const,
    stageLabel: "Deliverable · PDF report",
    Stage: ReportStage,
  },
];

export function HeroWindow() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <motion.div
      className="lp-window-wrap"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
    >
      <div className="lp-window-glow" aria-hidden="true" />

      <div className="lp-window">
        <div className="lp-window-bar">
          <div className="lp-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="lp-segmented" role="tablist" aria-label="Audit view">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={i === activeTab}
                className={"lp-seg" + (i === activeTab ? " is-active" : "")}
                onClick={() => setActiveTab(i)}
              >
                {i === activeTab && (
                  <motion.span
                    layoutId="lp-seg-pill"
                    className="lp-seg-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="lp-seg-label">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lp-window-body">
          <div className="lp-window-code">
            <div className="lp-code-stack">
              <AnimatePresence initial={false}>
                <motion.div
                  key={tab.key + "-code"}
                  className="lp-code-layer"
                  initial={{ opacity: 0, filter: "blur(3px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(3px)" }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <HighlightedCode code={tab.code} lang={tab.lang} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lp-stage">
            <div className="lp-stage-label" aria-hidden="true">
              {tab.stageLabel}
            </div>
            {/* All stages mount once and cross-fade on switch for instant,
                flicker-free toggling. */}
            <div className="lp-stage-stack">
              {TABS.map((t, i) => {
                const Stage = t.Stage;
                return (
                  <div
                    key={t.key}
                    className="lp-stage-layer"
                    aria-hidden={i !== activeTab}
                    style={{
                      opacity: i === activeTab ? 1 : 0,
                      pointerEvents: i === activeTab ? "auto" : "none",
                    }}
                  >
                    <Stage />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

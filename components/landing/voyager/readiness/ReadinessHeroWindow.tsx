"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HighlightedCode } from "../../HighlightedCode";
import { EASE } from "../../motion";
import { SEVERITY_COLORS } from "../snippets";
import { FINDING_JSON, GATES_JSON, SCORECARD_JSON } from "./snippets";

/* Baseline stage: the four dimensions from a real (anonymized) run. */
const GRADES = [
  { name: "Architecture", value: 74, confidence: "medium" },
  { name: "Module Quality", value: 65, confidence: "medium" },
  { name: "Security", value: 65, confidence: "medium" },
  { name: "Tech-Debt", value: 85, confidence: "high" },
];

function BaselineStage() {
  return (
    <div className="lp-grades">
      {GRADES.map((g) => {
        const color = g.value >= 80 ? "#67E8F9" : "#A5B4FC";
        return (
          <div key={g.name} className="lp-grade-tile">
            <div className="lp-grade-head">
              <span className="lp-grade-letter" style={{ color }}>
                {g.value}
              </span>
              <span className="lp-grade-value">/100</span>
            </div>
            <span className="lp-grade-name">{g.name}</span>
            <span className="lp-grade-bar">
              <span style={{ width: `${g.value}%`, background: color }} />
            </span>
            <span className="lp-grade-conf">
              <span
                className="lp-conf-dot"
                style={{ background: g.confidence === "high" ? "#67E8F9" : "#A5B4FC" }}
              />
              {g.confidence} confidence
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* Gates stage: pass/fail release gates with a plain-language next step. */
const GATES = [
  { name: "Tests", state: "pass" },
  { name: "Code quality", state: "pass" },
  { name: "Dependencies", state: "pass" },
  { name: "Compatibility", state: "pass" },
  { name: "Dependencies locked", state: "fail" },
  { name: "Formatting", state: "fail" },
] as const;

function GatesStage() {
  return (
    <div className="lp-gates">
      {GATES.map((g) => (
        <div key={g.name} className="lp-gate-row">
          <span className="lp-gate-name">{g.name}</span>
          <span className={"lp-gate-chip is-" + g.state}>
            {g.state === "pass" ? "PASS" : "FAIL"}
          </span>
        </div>
      ))}
      <div className="lp-gates-verdict">
        <b>Release-ready today?</b> Not yet — two clear next steps, both
        fixable in under a day.
      </div>
    </div>
  );
}

/* Findings stage: one finding, toggled between its two audiences */
const DEV_ROWS = [
  { file: "lib/firebase_options.dart:50", desc: "Committed GCP apiKey" },
  { file: "lib/main.dart:29", desc: "initializeApp — no App Check" },
];

function FindingsStage() {
  const [view, setView] = useState<"dev" | "biz">("dev");
  return (
    <div className="lp-dual">
      <div className="lp-dual-head">
        <span
          className="lp-severity-chip"
          style={{
            background: "rgba(251,146,60,0.15)",
            color: SEVERITY_COLORS.high,
          }}
        >
          HIGH
        </span>
        <span className="lp-dual-title">Backend keys shipped in the app</span>
      </div>
      <div className="lp-dual-tabs" role="tablist" aria-label="Finding view">
        {(["dev", "biz"] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            className={"lp-dual-tab" + (view === v ? " is-active" : "")}
            onClick={() => setView(v)}
          >
            {v === "dev" ? "Developer view" : "Business view"}
          </button>
        ))}
      </div>
      {view === "dev" ? (
        <div className="lp-dual-dev">
          {DEV_ROWS.map((r) => (
            <div key={r.file} className="lp-report-row">
              <div style={{ minWidth: 0 }}>
                <p className="lp-report-file">{r.file}</p>
                <p className="lp-report-desc">{r.desc}</p>
              </div>
            </div>
          ))}
          <div className="lp-dual-chips">
            <span className="lp-graph-cap">rotate keys</span>
            <span className="lp-graph-cap">restrict by bundle</span>
            <span className="lp-graph-cap">enforce App Check</span>
          </div>
        </div>
      ) : (
        <div className="lp-dual-biz">
          <p>
            The keys that unlock your backend are printed inside the app —
            anyone who copies them can talk to it directly.
          </p>
          <div className="lp-dual-chips">
            <span className="lp-graph-cap">who: anyone with the app</span>
            <span className="lp-graph-cap">fix: ~1 day</span>
            <span className="lp-graph-cap">reach: public client</span>
          </div>
        </div>
      )}
    </div>
  );
}

const TABS = [
  {
    key: "baseline",
    name: "Baseline",
    code: SCORECARD_JSON,
    lang: "json" as const,
    stageLabel: "Baseline · 4 dimensions · 0–100",
    Stage: BaselineStage,
  },
  {
    key: "gates",
    name: "Gates",
    code: GATES_JSON,
    lang: "json" as const,
    stageLabel: "Release gates · clear next steps",
    Stage: GatesStage,
  },
  {
    key: "findings",
    name: "Findings",
    code: FINDING_JSON,
    lang: "json" as const,
    stageLabel: "Findings · two audiences",
    Stage: FindingsStage,
  },
];

export function ReadinessHeroWindow() {
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
          <div
            className="lp-segmented"
            role="tablist"
            aria-label="Assessment view"
          >
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

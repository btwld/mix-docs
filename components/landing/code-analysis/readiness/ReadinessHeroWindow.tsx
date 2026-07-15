"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HighlightedCode } from "../../HighlightedCode";
import { EASE } from "../../motion";
import { BAND_COLORS } from "../snippets";
import { SCORECARD_JSON, GATES_LOG, FINDING_JSON } from "./snippets";

/* Verdict stage: the four-dimension scorecard from a real (anonymized) run */
const GRADES = [
  { name: "Architecture", band: "C", value: 74 },
  { name: "Module Quality", band: "C", value: 65 },
  { name: "Security", band: "C", value: 65 },
  { name: "Tech-Debt", band: "B", value: 85 },
];

function VerdictStage() {
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
              <span className="lp-conf-dot" style={{ background: "#FBBF24" }} />
              medium confidence
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* Gates stage: pass/fail release gates with the verdict line */
const GATES = [
  { name: "Tests", state: "pass" },
  { name: "Analyzer", state: "pass" },
  { name: "Dependency CVEs", state: "pass" },
  { name: "SDK matrix", state: "pass" },
  { name: "Lockfile reproducible", state: "fail" },
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
        <b>Release-ready today?</b> Not yet — two gates failing, both fixable
        in under a day.
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
          style={{ background: "rgba(251,146,60,0.15)", color: BAND_COLORS.D }}
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
            <span className="lp-graph-cap">OWASP A02</span>
          </div>
        </div>
      )}
    </div>
  );
}

const TABS = [
  {
    key: "verdict",
    name: "Verdict",
    code: SCORECARD_JSON,
    lang: "json" as const,
    stageLabel: "Verdict · 4 dimensions · A–F",
    Stage: VerdictStage,
  },
  {
    key: "gates",
    name: "Gates",
    code: GATES_LOG,
    lang: "bash" as const,
    stageLabel: "Release gates · deterministic",
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

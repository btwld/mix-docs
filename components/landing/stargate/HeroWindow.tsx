"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { HighlightedCode } from "../HighlightedCode";
import { EASE } from "../motion";
import { AUTHOR_TS, SPEC_JSON, RUN_CMD } from "./snippets";

/* Author stage: ports projected from the component's Zod schema */
const PORTS = [
  { dir: "in", name: "data", desc: "input port" },
  { dir: "out", name: "true", desc: "output port" },
  { dir: "out", name: "false", desc: "output port" },
] as const;

const PORT_CHIP_STYLE = {
  in: { background: "rgba(34,211,238,0.12)", color: "#22d3ee" },
  out: { background: "rgba(167,139,250,0.14)", color: "var(--lp-accent)" },
} as const;

function AuthorStage() {
  return (
    <div className="lp-report-mock">
      <div>
        <p className="lp-report-title">flow.conditional</p>
        <p className="lp-report-sub">flow-control · routes on a CEL expression</p>
      </div>
      {PORTS.map((p) => (
        <div key={p.name} className="lp-report-row">
          <span className="lp-severity-chip" style={PORT_CHIP_STYLE[p.dir]}>
            {p.dir.toUpperCase()}
          </span>
          <div style={{ minWidth: 0 }}>
            <p className="lp-report-file">{p.name}</p>
            <p className="lp-report-desc">{p.desc}</p>
          </div>
        </div>
      ))}
      <div className="lp-report-foot">
        ports derive from the schema — never declared
      </div>
    </div>
  );
}

/* Spec stage: the portable graph, as the studio canvas sees it */
function SpecStage() {
  return (
    <div className="lp-graph">
      <div className="lp-graph-node">
        <span className="lp-graph-dot" />
        <span className="lp-graph-name">prompt</span>
        <span className="lp-graph-comp">data.transform</span>
      </div>
      <div className="lp-graph-edge">
        <span className="lp-graph-edge-label">output → input</span>
      </div>
      <div className="lp-graph-node">
        <span className="lp-graph-dot" />
        <span className="lp-graph-name">agent</span>
        <span className="lp-graph-comp">agent.default</span>
        <span className="lp-graph-caps">
          <span className="lp-graph-cap">model.google</span>
        </span>
      </div>
      <div className="lp-report-foot" style={{ marginTop: 14 }}>
        pure data — no handlers, no secrets
      </div>
    </div>
  );
}

/* Run stage: engine execution with boundary validation */
const RUN_STEPS = [
  { label: "Spec loaded · qa-agent-demo", state: "done" },
  { label: "Graph valid · 2 nodes · 1 connection", state: "done" },
  { label: "prompt · data.transform", state: "done" },
  { label: "input validated → agent", state: "done" },
  { label: "agent · agent.default", state: "running" },
  { label: "output validation", state: "pending" },
  { label: "status: completed", state: "pending" },
] as const;

function RunStage() {
  return (
    <div className="lp-run">
      {RUN_STEPS.map((p) => (
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

const TABS = [
  {
    key: "author",
    name: "Author",
    code: AUTHOR_TS,
    lang: "typescript" as const,
    stageLabel: "Contract · schema-derived ports",
    Stage: AuthorStage,
  },
  {
    key: "spec",
    name: "Spec",
    code: SPEC_JSON,
    lang: "json" as const,
    stageLabel: "WorkflowSpec · portable graph",
    Stage: SpecStage,
  },
  {
    key: "run",
    name: "Run",
    code: RUN_CMD,
    lang: "bash" as const,
    stageLabel: "Engine · validated boundaries",
    Stage: RunStage,
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
          <div className="lp-segmented" role="tablist" aria-label="Product view">
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

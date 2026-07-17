"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { HighlightedCode } from "../HighlightedCode";
import { EASE } from "../motion";
import {
  PRIORITIES_JSON,
  PROGRESS_JSON,
  SIGNAL_COLORS,
  SYSTEM_MAP_JSON,
} from "./snippets";

function MapStage() {
  return (
    <div
      className="vy-map"
      role="img"
      aria-label="A map of connected code modules"
    >
      <svg className="vy-map-lines" viewBox="0 0 320 190" aria-hidden="true">
        <path d="M64 95 C102 95 106 44 146 44" />
        <path d="M64 95 C106 95 108 95 146 95" />
        <path d="M64 95 C102 95 106 146 146 146" />
        <path d="M206 44 C246 44 250 95 286 95" />
        <path d="M206 95 C244 95 250 95 286 95" />
        <path d="M206 146 C246 146 250 95 286 95" />
      </svg>
      <span className="vy-map-node is-entry">router</span>
      <span className="vy-map-node is-auth">auth</span>
      <span className="vy-map-node is-billing">billing</span>
      <span className="vy-map-node is-notify">notify</span>
      <span className="vy-map-node is-data">data</span>
      <span className="vy-map-note">12 request flows mapped</span>
    </div>
  );
}

const PRIORITIES = [
  { level: "P0", title: "Expire session tokens", why: "blocks launch · 2 files" },
  { level: "P1", title: "Bound invoice retries", why: "high churn · ~1 day" },
  { level: "P2", title: "Remove legacy logger", why: "safe to defer" },
];

function PrioritiesStage() {
  return (
    <div className="vy-priorities">
      {PRIORITIES.map((item) => (
        <div className="vy-priority" key={item.level}>
          <span
            className="vy-priority-level"
            style={{ color: SIGNAL_COLORS[item.level] }}
          >
            {item.level}
          </span>
          <span className="vy-priority-copy">
            <b>{item.title}</b>
            <small>{item.why}</small>
          </span>
          <ArrowRight size={14} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

const DELTAS = [
  { label: "Architecture", value: 82, delta: "+6" },
  { label: "Security", value: 76, delta: "+18" },
  { label: "Tech debt", value: 71, delta: "+4" },
];

function ProgressStage() {
  return (
    <div className="vy-progress">
      <div className="vy-progress-head">
        <span className="vy-progress-icon">
          <TrendingUp size={16} aria-hidden="true" />
        </span>
        <span>
          <b>Fixes confirmed</b>
          <small>same ruler as the first pass</small>
        </span>
      </div>
      {DELTAS.map((item) => (
        <div className="vy-delta" key={item.label}>
          <span className="vy-delta-label">{item.label}</span>
          <span className="vy-delta-track">
            <span style={{ width: `${item.value}%` }} />
          </span>
          <span className="vy-delta-value">{item.value}</span>
          <span className="vy-delta-change">{item.delta}</span>
        </div>
      ))}
      <span className="vy-progress-proof">
        <Check size={12} aria-hidden="true" /> byte-equal scoring verified
      </span>
    </div>
  );
}

const TABS = [
  {
    key: "map",
    name: "Map",
    code: SYSTEM_MAP_JSON,
    lang: "json" as const,
    stageLabel: "System map · 34 modules",
    Stage: MapStage,
  },
  {
    key: "priorities",
    name: "Priorities",
    code: PRIORITIES_JSON,
    lang: "json" as const,
    stageLabel: "Next moves · ordered by impact",
    Stage: PrioritiesStage,
  },
  {
    key: "progress",
    name: "Progress",
    code: PROGRESS_JSON,
    lang: "json" as const,
    stageLabel: "Change since the last pass",
    Stage: ProgressStage,
  },
];

export function HeroWindow() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <motion.div
      className="lp-window-wrap vy-window-wrap"
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
          <div className="lp-segmented" role="tablist" aria-label="Voyager view">
            {TABS.map((item, index) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={index === activeTab}
                className={"lp-seg" + (index === activeTab ? " is-active" : "")}
                onClick={() => setActiveTab(index)}
              >
                {index === activeTab && (
                  <motion.span
                    layoutId="vy-seg-pill"
                    className="lp-seg-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="lp-seg-label">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lp-window-body">
          <div className="lp-window-code">
            <div className="lp-code-stack">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${tab.key}-code`}
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
            <div className="lp-stage-stack">
              {TABS.map((item, index) => {
                const Stage = item.Stage;
                return (
                  <div
                    key={item.key}
                    className="lp-stage-layer"
                    aria-hidden={index !== activeTab}
                    style={{
                      opacity: index === activeTab ? 1 : 0,
                      pointerEvents: index === activeTab ? "auto" : "none",
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

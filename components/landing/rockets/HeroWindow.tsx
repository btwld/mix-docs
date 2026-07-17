"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { HighlightedCode } from "../HighlightedCode";
import { EASE } from "../motion";
import {
  AUTH_PROVIDERS_TS,
  DEFINE_ROCKETS_TS,
  STORAGE_PROVIDERS_TS,
} from "./snippets";

const PLAN_ITEMS = [
  "Domain resources resolved",
  "Shared identity boundary attached",
  "Storage routes bound",
  "HTTP + OpenAPI materialized",
] as const;

function SpecStage() {
  return (
    <div className="lp-run">
      {PLAN_ITEMS.map((item) => (
        <div key={item} className="lp-run-row">
          <Check size={14} strokeWidth={2.4} />
          <span>{item}</span>
        </div>
      ))}
      <div className="lp-report-foot">
        one backend definition → one domain micro app
      </div>
    </div>
  );
}

const AUTH_PROVIDERS = [
  ["01", "Firebase", "Bearer ID token"],
  ["02", "API key", "X-API-Key header"],
  ["ALT", "Built-in auth", "signup · login · OTP"],
] as const;

function AuthStage() {
  return (
    <div className="lp-report-mock">
      <div>
        <p className="lp-report-title">Authentication providers</p>
        <p className="lp-report-sub">one guard · one AuthorizedUser</p>
      </div>
      {AUTH_PROVIDERS.map(([order, provider, transport]) => (
        <div key={provider} className="lp-report-row">
          <span
            className="lp-severity-chip"
            style={{
              color: "var(--lp-accent)",
              background: "var(--lp-accent-low)",
            }}
          >
            {order}
          </span>
          <div>
            <p className="lp-report-file">{provider}</p>
            <p className="lp-report-desc">{transport}</p>
          </div>
        </div>
      ))}
      <div className="lp-report-foot">unmatched → next · invalid match → stop</div>
    </div>
  );
}

const STORAGE_ROUTES = [
  ["DEFAULT", "Pets + users", "TypeORM"],
  ["OVERRIDE", "AnalyticsEvent", "Firestore"],
  ["CUSTOM", "AuditEntry", "Your adapter"],
] as const;

function StorageStage() {
  return (
    <div className="lp-report-mock">
      <div>
        <p className="lp-report-title">Storage routing</p>
        <p className="lp-report-sub">default once · override per entity</p>
      </div>
      {STORAGE_ROUTES.map(([role, entity, provider]) => (
        <div key={entity} className="lp-report-row">
          <span
            className="lp-severity-chip"
            style={{
              color: "var(--lp-accent)",
              background: "var(--lp-accent-low)",
            }}
          >
            {role}
          </span>
          <div>
            <p className="lp-report-file">{entity}</p>
            <p className="lp-report-desc">{provider}</p>
          </div>
        </div>
      ))}
      <div className="lp-report-foot">same RepositoryInterface&lt;T&gt;</div>
    </div>
  );
}

const TABS = [
  {
    key: "spec",
    name: "Spec",
    code: DEFINE_ROCKETS_TS,
    lang: "typescript" as const,
    stageLabel: "Backend definition · contract to running API",
    Stage: SpecStage,
  },
  {
    key: "auth",
    name: "Auth",
    code: AUTH_PROVIDERS_TS,
    lang: "typescript" as const,
    stageLabel: "Auth chain · ordered and transport-agnostic",
    Stage: AuthStage,
  },
  {
    key: "storage",
    name: "Storage",
    code: STORAGE_PROVIDERS_TS,
    lang: "typescript" as const,
    stageLabel: "Repository routing · default plus overrides",
    Stage: StorageStage,
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
          <div className="lp-segmented" role="tablist" aria-label="Rockets view">
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
                    layoutId="lp-seg-pill"
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

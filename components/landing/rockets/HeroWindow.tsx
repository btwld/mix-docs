"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { HighlightedCode } from "../HighlightedCode";
import { EASE } from "../motion";
import {
  AUTH_PROVIDERS_TS,
  CREATE_SERVER_TS,
  STORAGE_PROVIDERS_TS,
} from "./snippets";

const SERVER_OUTPUTS = [
  ["resources", "routes · validation · OpenAPI"],
  ["auth", "protected endpoints · AuthorizedUser"],
  ["repository", "default storage · overrides"],
  ["accessControl", "ownership · policy"],
] as const;

function ServerStage() {
  return (
    <div className="lp-report-mock">
      <div>
        <p className="lp-report-title">Complete server surface</p>
        <p className="lp-report-sub">configuration → running capability</p>
      </div>
      {SERVER_OUTPUTS.map(([option, output]) => (
        <div key={option} className="lp-report-row">
          <Check size={14} strokeWidth={2.4} />
          <div>
            <p className="lp-report-file">{option}</p>
            <p className="lp-report-desc">{output}</p>
          </div>
        </div>
      ))}
      <div className="lp-report-foot">one definition → complete server</div>
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
    key: "server",
    name: "Server",
    code: CREATE_SERVER_TS,
    lang: "typescript" as const,
    stageLabel: "createServer · definition to running API",
    Stage: ServerStage,
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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tab = TABS[activeTab];

  function selectTabFromKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = TABS.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

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
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={index === activeTab}
                aria-controls={`rockets-panel-${item.key}`}
                id={`rockets-tab-${item.key}`}
                tabIndex={index === activeTab ? 0 : -1}
                className={"lp-seg" + (index === activeTab ? " is-active" : "")}
                onClick={() => setActiveTab(index)}
                onKeyDown={(event) => selectTabFromKey(event, index)}
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
                    id={`rockets-panel-${item.key}`}
                    role="tabpanel"
                    aria-labelledby={`rockets-tab-${item.key}`}
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

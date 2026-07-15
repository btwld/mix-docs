"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE } from "../motion";
import { STUDIO_NODE_COLORS } from "./snippets";

/* CSS-rendered prototype of the Stargate studio: a claims-approval
   workflow paused on a human-input request. Decorative — no focusables. */

const PALETTE = [
  "http.action",
  "flow.conditional",
  "agent.default",
  "template.processor",
];

const NODES = [
  {
    id: "intake",
    comp: "http.action",
    cat: "info",
    status: "completed",
    indent: "0%",
  },
  {
    id: "triage",
    comp: "flow.conditional",
    cat: "flow",
    status: "completed",
    indent: "18%",
  },
  {
    id: "adjuster",
    comp: "agent.default",
    cat: "agent",
    status: "waiting",
    indent: "36%",
  },
  {
    id: "notify",
    comp: "template.processor",
    cat: "action",
    status: "pending",
    indent: "18%",
  },
] as const;

const EDGES = [
  { key: "intake-triage", className: "lp-proto-elbow", marginLeft: "0%" },
  { key: "triage-adjuster", className: "lp-proto-elbow", marginLeft: "18%" },
  {
    key: "adjuster-notify",
    className: "lp-proto-elbow lp-proto-elbow-left",
    marginLeft: "18%",
  },
];

function NodeStatus({ status }: { status: (typeof NODES)[number]["status"] }) {
  if (status === "completed") {
    return (
      <span className="lp-proto-status">
        <Check size={11} strokeWidth={2.8} /> completed
      </span>
    );
  }
  if (status === "waiting") {
    return (
      <span className="lp-proto-status">
        <span className="lp-proto-wait-dot" /> waiting on human
      </span>
    );
  }
  return (
    <span className="lp-proto-status">
      <span className="lp-proto-pending-dot" /> pending
    </span>
  );
}

export function StudioPrototype() {
  return (
    <motion.div
      className="lp-cta-proto"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
    >
      <div
        className="lp-window"
        role="img"
        aria-label="Preview of the Stargate studio: a claims-approval workflow paused on a human-input request"
      >
        <div className="lp-window-bar">
          <div className="lp-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <em className="lp-window-file">stargate studio · claims-approval</em>
        </div>

        <div className="lp-proto">
          <aside className="lp-proto-rail">
            <span className="lp-proto-rail-label">Components</span>
            {PALETTE.map((name) => (
              <span key={name} className="lp-proto-chip">
                {name}
              </span>
            ))}
          </aside>

          <div className="lp-proto-canvas">
            {NODES.map((n, i) => (
              <div key={n.id}>
                {i > 0 && (
                  <div
                    className={EDGES[i - 1].className}
                    style={{ marginLeft: EDGES[i - 1].marginLeft }}
                  />
                )}
                <div
                  className={
                    "lp-proto-node" +
                    (n.status === "waiting" ? " is-waiting" : "") +
                    (n.status === "pending" ? " is-pending" : "")
                  }
                  style={{ marginLeft: n.indent }}
                >
                  <div className="lp-proto-node-top">
                    <span
                      className="lp-proto-dot"
                      style={{ background: STUDIO_NODE_COLORS[n.cat] }}
                    />
                    <span className="lp-proto-name">{n.id}</span>
                    <span className="lp-proto-comp">{n.comp}</span>
                  </div>
                  <NodeStatus status={n.status} />
                </div>
              </div>
            ))}

            <div className="lp-proto-toast">
              <span className="lp-proto-toast-dot" />
              Human input requested
              <span className="lp-proto-toast-open">Open</span>
            </div>
          </div>

          <aside className="lp-proto-panel">
            <span className="lp-proto-panel-title">Run · claims-approval</span>
            <span className="lp-proto-event">
              <Check size={11} strokeWidth={2.8} /> node:completed · intake
            </span>
            <span className="lp-proto-event">
              <Check size={11} strokeWidth={2.8} /> node:completed · triage
            </span>
            <span className="lp-proto-event is-live">
              <span className="lp-proto-wait-dot" /> execution:hitl:requested
            </span>
            <span className="lp-proto-panel-status">status: paused</span>
          </aside>
        </div>
      </div>

      <p className="lp-proto-cap">
        The studio — author the graph, run it, and answer it when it asks.
      </p>
    </motion.div>
  );
}

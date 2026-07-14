"use client";

import { motion } from "framer-motion";
import { SectionHead } from "../SectionHead";
import { staggerParent, staggerChild } from "../motion";

function StudioMock() {
  const nodes = [
    { name: "http", comp: "http.action" },
    { name: "branch", comp: "flow.conditional" },
    { name: "agent", comp: "agent.default" },
  ];
  return (
    <div className="lp-tile-body">
      <div className="lp-graph-h">
        {nodes.map((n, i) => (
          <div key={n.name} style={{ display: "contents" }}>
            {i > 0 && <span className="lp-graph-h-edge" />}
            <div className="lp-graph-node">
              <span className="lp-graph-dot" />
              <span className="lp-graph-name">{n.name}</span>
              <span className="lp-graph-comp">{n.comp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CliMock() {
  return (
    <div className="lp-tile-body">
      <pre className="lp-mock-json">
        <span className="m">$</span> stargate run flow.json{"\n"}
        <span className="k">✅</span> structure valid{"\n"}
        <span className="k">🎉</span> completed · 1240ms
      </pre>
    </div>
  );
}

function SseMock() {
  const events = [
    { state: "completed", node: "prompt" },
    { state: "running", node: "agent" },
    { state: "waiting", node: "workflow" },
  ];
  return (
    <div className="lp-tile-body">
      {events.map((e) => (
        <div key={e.node} className="lp-mock-row">
          <span
            className="lp-severity-chip"
            style={{
              background: "rgba(255,255,255,0.05)",
              color:
                e.state === "completed"
                  ? "var(--lp-accent)"
                  : e.state === "running"
                    ? "#22d3ee"
                    : "var(--lp-text-muted)",
            }}
          >
            {e.state.toUpperCase()}
          </span>
          <span className="lp-mock-path" style={{ width: "auto" }}>
            {e.node}
          </span>
        </div>
      ))}
    </div>
  );
}

function McpMock() {
  const tools = ["qa-agent-demo", "seeded-echo"];
  return (
    <div className="lp-tile-body">
      {tools.map((t) => (
        <div key={t} className="lp-mock-row">
          <span
            className="lp-severity-chip"
            style={{
              background: "rgba(167,139,250,0.14)",
              color: "var(--lp-accent)",
            }}
          >
            TOOL
          </span>
          <span className="lp-mock-path" style={{ width: "auto" }}>
            {t}
          </span>
        </div>
      ))}
    </div>
  );
}

function SpecMock() {
  return (
    <div className="lp-tile-body">
      <pre className="lp-mock-json">
        <span className="m">{"{"}</span>
        {"\n  "}
        <span className="k">&quot;componentName&quot;</span>
        <span className="m">:</span> &quot;agent.default&quot;,{"\n  "}
        <span className="k">&quot;sourceType&quot;</span>
        <span className="m">:</span> &quot;environment&quot;{"\n"}
        <span className="m">{"}"}</span>
      </pre>
    </div>
  );
}

const TILES = [
  { label: "Studio · visual workflow editor", wide: true, Mock: StudioMock },
  { label: "CLI · stargate run", wide: false, Mock: CliMock },
  { label: "HTTP API · runs stream over SSE", wide: false, Mock: SseMock },
  { label: "MCP · workflows served as tools", wide: false, Mock: McpMock },
  { label: "WorkflowSpec · the artifact itself", wide: false, Mock: SpecMock },
];

export function OutputsBento() {
  return (
    <section className="lp-shell lp-gap" id="surfaces">
      <SectionHead
        eyebrow="Surfaces"
        title="One spec. Every surface."
        lead="Author in the visual studio, run headless from the CLI, stream executions over the API, or serve whole workflows as MCP tools — the same portable spec underneath."
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
              key={t.label}
              variants={staggerChild}
              className={"lp-tile" + (t.wide ? " lp-tile-wide" : "")}
            >
              <Mock />
              <p className="lp-tile-cap">{t.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

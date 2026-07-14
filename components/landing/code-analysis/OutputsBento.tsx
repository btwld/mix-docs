"use client";

import { motion } from "framer-motion";
import { SectionHead } from "../SectionHead";
import { staggerParent, staggerChild } from "../motion";
import { BAND_COLORS } from "./snippets";

function HotspotMock() {
  const rows = [
    { path: "src/auth/session.ts", churn: 86, complexity: 74 },
    { path: "src/billing/invoice.ts", churn: 62, complexity: 81 },
    { path: "src/api/router.ts", churn: 48, complexity: 39 },
  ];
  return (
    <div className="lp-tile-body">
      {rows.map((r) => (
        <div key={r.path} className="lp-mock-row">
          <span className="lp-mock-path">{r.path}</span>
          <span className="lp-mock-bars">
            <span className="lp-mock-bar">
              <span style={{ width: `${r.churn}%` }} />
            </span>
            <span className="lp-mock-bar">
              <span style={{ width: `${r.complexity}%`, opacity: 0.45 }} />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function FindingsMock() {
  const rows = [
    { sev: "HIGH", band: "D", file: "auth/session.ts" },
    { sev: "MED", band: "C", file: "billing/webhook.ts" },
    { sev: "LOW", band: "B", file: "lib/logger.ts" },
  ];
  return (
    <div className="lp-tile-body">
      {rows.map((r) => (
        <div key={r.file} className="lp-mock-row">
          <span
            className="lp-severity-chip"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: BAND_COLORS[r.band],
            }}
          >
            {r.sev}
          </span>
          <span className="lp-mock-path" style={{ width: "auto" }}>
            {r.file}
          </span>
        </div>
      ))}
    </div>
  );
}

function CoverageMock() {
  const bars = [78, 92, 55, 84, 40, 96, 68, 73];
  return (
    <div className="lp-tile-body">
      <div className="lp-coverage">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function CodeHealthMock() {
  return (
    <div className="lp-tile-body">
      <pre className="lp-mock-json">
        <span className="m">{"{"}</span>
        {"\n  "}
        <span className="k">&quot;security&quot;</span>
        <span className="m">:</span> {"{ "}
        <span className="k">&quot;band&quot;</span>
        <span className="m">:</span> &quot;D&quot;{" }"},{"\n  "}
        <span className="k">&quot;deterministic&quot;</span>
        <span className="m">:</span> true{"\n"}
        <span className="m">{"}"}</span>
      </pre>
    </div>
  );
}

function PdfMock() {
  return (
    <div className="lp-tile-body">
      <div className="lp-pdf-mock">
        <span
          className="lp-pdf-badge"
          style={{ background: "rgba(163,230,53,0.12)", color: BAND_COLORS.B }}
        >
          B
        </span>
        <span className="lp-pdf-line" style={{ width: "80%" }} />
        <span className="lp-pdf-line" style={{ width: "62%" }} />
        <span className="lp-pdf-line" style={{ width: "71%" }} />
      </div>
    </div>
  );
}

const TILES = [
  { label: "Hotspot catalog", wide: true, Mock: HotspotMock },
  { label: "Finding catalog", wide: false, Mock: FindingsMock },
  { label: "Coverage map", wide: false, Mock: CoverageMock },
  { label: "code-health.json", wide: false, Mock: CodeHealthMock },
  { label: "PDF report", wide: false, Mock: PdfMock },
];

export function OutputsBento() {
  return (
    <section className="lp-shell lp-gap" id="deliverables">
      <SectionHead
        eyebrow="Deliverables"
        title="Everything an audit should leave behind."
        lead="Machine-readable catalogs for your tooling, plus a report you can share as-is."
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

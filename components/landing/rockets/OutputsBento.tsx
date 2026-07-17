"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHead } from "../SectionHead";
import { staggerChild, staggerParent } from "../motion";

const SPEC_ROWS = [
  ["domain", "customers · invoices · ledger"],
  ["identity", "shared product issuer"],
  ["storage", "Postgres · Firestore override"],
  ["policy", "ownership · access control"],
] as const;

function SpecMock() {
  return (
    <div className="lp-tile-body">
      <div className="lp-report-row">
        <span className="lp-severity-chip" style={{ color: "var(--lp-accent)" }}>
          SPEC
        </span>
        <div>
          <p className="lp-report-file">billing.backend.ts</p>
          <p className="lp-report-desc">one bounded-domain definition</p>
        </div>
      </div>
      <div className="lp-run">
        {SPEC_ROWS.map(([field, value]) => (
          <div key={field} className="lp-run-row">
            <span className="lp-mock-key">{field}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const RUNTIME_OUTPUTS = [
  "Nest application module",
  "guard + /me",
  "CRUD controllers + hooks",
  "OpenAPI surface",
] as const;

function RuntimeMock() {
  return (
    <div className="lp-tile-body">
      <div className="lp-run">
        {RUNTIME_OUTPUTS.map((output) => (
          <div key={output} className="lp-run-row">
            <Check size={14} strokeWidth={2.4} />
            <span>{output}</span>
          </div>
        ))}
        <div className="lp-report-foot">materialized at boot · zero generated glue</div>
      </div>
    </div>
  );
}

function MicroAppMock() {
  return (
    <div className="lp-tile-body">
      <div className="lp-report-row">
        <span className="lp-severity-chip" style={{ color: "var(--lp-accent)" }}>
          APP
        </span>
        <div>
          <p className="lp-report-file">billing.api</p>
          <p className="lp-report-desc">owned and deployed independently</p>
        </div>
      </div>
      <pre className="lp-mock-json">
        <span className="k">GET</span> /customers{"\n"}
        <span className="k">POST</span> /invoices{"\n"}
        <span className="k">GET</span> /ledger
      </pre>
    </div>
  );
}

const IDENTITY_DOMAINS = [
  ["BILLING", "usr_42"],
  ["CRM", "usr_42"],
  ["REVIEW", "usr_42"],
] as const;

function IdentityMock() {
  return (
    <div className="lp-tile-body">
      {IDENTITY_DOMAINS.map(([domain, userId]) => (
        <div key={domain} className="lp-mock-row">
          <span
            className="lp-severity-chip"
            style={{ color: "var(--lp-accent)", background: "var(--lp-accent-low)" }}
          >
            {domain}
          </span>
          <span className="lp-mock-path" style={{ width: "auto" }}>
            AuthorizedUser.id = {userId}
          </span>
        </div>
      ))}
      <div className="lp-report-foot">one issuer · the same subject everywhere</div>
    </div>
  );
}

const STARGATE_STEPS = [
  "webhook",
  "billing API",
  "CRM API",
  "notify",
] as const;

function StargateMock() {
  return (
    <div className="lp-tile-body">
      <div className="lp-bento-flow">
        {STARGATE_STEPS.map((step, index) => (
          <div key={step} className="lp-bento-flow-step">
            <span>{step}</span>
            {index < STARGATE_STEPS.length - 1 ? (
              <span className="lp-bento-flow-arrow" aria-hidden="true">→</span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="lp-report-foot">Stargate orchestrates · micro apps execute</div>
    </div>
  );
}

const TILES = [
  {
    label: "Backend definition · one reviewable source of truth",
    wide: true,
    Mock: SpecMock,
  },
  {
    label: "Today · a real Nest runtime and documented API",
    wide: false,
    Mock: RuntimeMock,
  },
  {
    label: "Micro app · one independently owned domain",
    wide: false,
    Mock: MicroAppMock,
  },
  {
    label: "Shared identity · one user across every API",
    wide: false,
    Mock: IdentityMock,
  },
  {
    label: "Direction · Stargate provisions and orchestrates the fleet",
    wide: false,
    Mock: StargateMock,
  },
];

export function OutputsBento() {
  return (
    <section className="lp-shell lp-gap" id="surface">
      <SectionHead
        eyebrow="From definition to product"
        title="One spec. A complete domain surface."
        lead="The current runtime materializes the secure API. The larger product direction makes that same definition the unit a platform can provision, register, and compose."
      />

      <motion.div
        className="lp-bento"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {TILES.map((tile) => {
          const Mock = tile.Mock;
          return (
            <motion.div
              key={tile.label}
              variants={staggerChild}
              className={"lp-tile" + (tile.wide ? " lp-tile-wide" : "")}
            >
              <Mock />
              <p className="lp-tile-cap">{tile.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, Database, KeyRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HighlightedCode } from "../HighlightedCode";
import { SectionHead } from "../SectionHead";
import { staggerChild, staggerParent } from "../motion";
import { AUTH_PROVIDERS_TS, STORAGE_PROVIDERS_TS } from "./snippets";

interface ProviderOption {
  badge: string;
  name: string;
  detail: string;
}

const AUTH_PROVIDERS = [
  { badge: "01", name: "API key", detail: "X-API-Key · app-local adapter" },
  { badge: "02", name: "Firebase", detail: "Bearer ID token · shipped adapter" },
  { badge: "OR", name: "Built-in identity", detail: "signup · login · OTP · roles" },
] as const satisfies readonly ProviderOption[];

const STORAGE_PROVIDERS = [
  { badge: "DEFAULT", name: "TypeORM", detail: "users · pets · orders" },
  { badge: "OVERRIDE", name: "Firestore", detail: "analytics_events" },
  { badge: "CUSTOM", name: "Your adapter", detail: "audit_log" },
] as const satisfies readonly ProviderOption[];

function ProviderCard({
  icon: Icon,
  label,
  providers,
  result,
  footnote,
  code,
  file,
}: {
  icon: LucideIcon;
  label: string;
  providers: readonly ProviderOption[];
  result: string;
  footnote: string;
  code: string;
  file: string;
}) {
  return (
    <motion.article className="lp-provider-column" variants={staggerChild}>
      <div className="lp-provider-card">
        <div className="lp-provider-head">
          <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>{label}</span>
        </div>
        <div className="lp-provider-stack">
          {providers.map((provider) => (
            <div key={provider.name} className="lp-provider-row">
              <span className="lp-severity-chip">{provider.badge}</span>
              <div>
                <p className="lp-provider-name">{provider.name}</p>
                <p className="lp-provider-detail">{provider.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lp-provider-result">
          <Check size={15} strokeWidth={2.5} aria-hidden="true" />
          <span>{result}</span>
        </div>
        <div className="lp-report-foot">{footnote}</div>
      </div>

      <div className="lp-code-card lp-provider-code">
        <div className="lp-window-bar lp-window-bar-plain">
          <div className="lp-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <em className="lp-window-file">{file}</em>
        </div>
        <div className="lp-code-card-body">
          <HighlightedCode code={code} lang="typescript" />
        </div>
      </div>
    </motion.article>
  );
}

export function ProviderSpotlights() {
  return (
    <section className="lp-shell lp-gap lp-providers" id="providers">
      <SectionHead
        eyebrow="Replaceable by design"
        title="Identity and storage, without lock-in."
        lead="Choose the providers that fit today. Small contracts keep the rest of the application stable when infrastructure changes tomorrow."
      />

      <motion.div
        className="lp-provider-grid"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <ProviderCard
          icon={KeyRound}
          label="ordered auth chain"
          providers={AUTH_PROVIDERS}
          result="one AuthorizedUser contract"
          footnote="unmatched → try next · invalid match → stop"
          code={AUTH_PROVIDERS_TS}
          file="auth.config.ts"
        />
        <ProviderCard
          icon={Database}
          label="repository routing"
          providers={STORAGE_PROVIDERS}
          result="one RepositoryInterface<T>"
          footnote="default once · override per entity"
          code={STORAGE_PROVIDERS_TS}
          file="storage.config.ts"
        />
      </motion.div>
    </section>
  );
}

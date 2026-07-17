"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Check,
  Database,
  FileCode2,
  KeyRound,
  Rocket,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { HighlightedCode } from "../HighlightedCode";
import { SectionHead } from "../SectionHead";
import { EASE } from "../motion";
import { AUTH_PROVIDERS_TS, STORAGE_PROVIDERS_TS } from "./snippets";

interface ProviderOption {
  badge: string;
  name: string;
  detail: string;
}

const VISION_BULLETS = [
  "Review and version the backend as one typed definition",
  "Run the open-source runtime without a control plane",
  "Share one identity without sharing every domain database",
  "Let Stargate provision and orchestrate micro apps as the platform evolves",
] as const;

const MICRO_APPS = ["Billing", "CRM", "Review"] as const;

const AUTH_BULLETS = [
  "Pass one provider or an ordered chain of providers",
  "Each adapter owns its credential format and verification",
  "Every successful provider resolves the same AuthorizedUser contract",
] as const;

const AUTH_PROVIDERS = [
  {
    badge: "01",
    name: "API key",
    detail: "X-API-Key · app-local adapter",
  },
  {
    badge: "02",
    name: "Firebase",
    detail: "Bearer ID token · shipped adapter",
  },
  {
    badge: "OR",
    name: "Built-in identity",
    detail: "signup · login · OTP · roles",
  },
] as const satisfies readonly ProviderOption[];

const STORAGE_BULLETS = [
  "Choose one default adapter for the application",
  "Override storage for one entity inside its resource bundle",
  "Keep domain services on RepositoryInterface<T> across every backend",
] as const;

const STORAGE_PROVIDERS = [
  {
    badge: "DEFAULT",
    name: "TypeORM",
    detail: "users · pets · orders",
  },
  {
    badge: "OVERRIDE",
    name: "Firestore",
    detail: "analytics_events",
  },
  {
    badge: "CUSTOM",
    name: "Your adapter",
    detail: "audit_log",
  },
] as const satisfies readonly ProviderOption[];

function ProviderCodeCard({ code, file }: { code: string; file: string }) {
  return (
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
  );
}

function VisionNode({
  icon: Icon,
  title,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
}) {
  return (
    <div className="lp-vision-node">
      <Icon size={17} strokeWidth={2.1} />
      <div>
        <p>{title}</p>
        <span>{detail}</span>
      </div>
    </div>
  );
}

function BackendVisionCard() {
  return (
    <div className="lp-vision-card">
      <div className="lp-provider-head">
        <FileCode2 size={16} strokeWidth={2.2} />
        <span>open-source product model</span>
      </div>

      <div className="lp-vision-status">
        <div>
          <span className="lp-severity-chip">TODAY</span>
          <p>Executable TypeScript definition</p>
        </div>
        <div>
          <span className="lp-severity-chip lp-vision-direction">DIRECTION</span>
          <p>First-class backend artifact</p>
        </div>
      </div>

      <div className="lp-vision-pipeline">
        <VisionNode
          icon={FileCode2}
          title="Backend definition"
          detail="resources · identity · storage · policy"
        />
        <ArrowRight className="lp-vision-arrow" size={17} aria-hidden="true" />
        <VisionNode
          icon={Rocket}
          title="Rockets runtime"
          detail="plan · compose · validate"
        />
        <ArrowRight className="lp-vision-arrow" size={17} aria-hidden="true" />
        <VisionNode
          icon={Boxes}
          title="Domain micro app"
          detail="secure API · /me · OpenAPI"
        />
      </div>

      <div className="lp-vision-fleet">
        <div className="lp-vision-control">
          <Workflow size={16} strokeWidth={2.1} />
          <div>
            <p>Stargate</p>
            <span>provision · register · orchestrate</span>
          </div>
        </div>
        <ArrowRight className="lp-vision-arrow" size={17} aria-hidden="true" />
        <div className="lp-vision-apps" aria-label="Rockets micro apps">
          {MICRO_APPS.map((app) => (
            <span key={app}>{app}</span>
          ))}
        </div>
      </div>

      <div className="lp-vision-identity">
        <KeyRound size={15} strokeWidth={2.2} />
        <span>one issuer · one user id across every micro app</span>
      </div>
    </div>
  );
}

function ProviderCard({
  icon: Icon,
  label,
  providers,
  result,
  footnote,
}: {
  icon: LucideIcon;
  label: string;
  providers: readonly ProviderOption[];
  result: string;
  footnote: string;
}) {
  return (
    <div className="lp-provider-card">
      <div className="lp-provider-head">
        <Icon size={16} strokeWidth={2.2} />
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
        <Check size={15} strokeWidth={2.5} />
        <span>{result}</span>
      </div>
      <div className="lp-report-foot">{footnote}</div>
    </div>
  );
}

function ProviderSection({
  id,
  eyebrow,
  title,
  lead,
  bullets,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  bullets: readonly string[];
  children: ReactNode;
}) {
  return (
    <section className="lp-shell lp-gap" id={id}>
      <div className="lp-split">
        <div>
          <SectionHead
            align="left"
            eyebrow={eyebrow}
            title={title}
            lead={lead}
          />
          <ul className="lp-checklist">
            {bullets.map((bullet) => (
              <li key={bullet}>
                <Check size={15} strokeWidth={2.4} /> {bullet}
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          className="lp-provider-demo"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function ProviderSpotlights() {
  return (
    <>
      <ProviderSection
        id="backend-spec"
        eyebrow="Vision · The definition is the product"
        title="A backend you can reason about before it runs."
        lead="The Rockets definition should be the durable asset, not the NestJS wiring it produces. Describe one bounded domain, materialize it as a small secure API, and let an optional platform compose many of those APIs into a product."
        bullets={VISION_BULLETS}
      >
        <BackendVisionCard />
      </ProviderSection>

      <ProviderSection
        id="auth-providers"
        eyebrow="Provider model · Authentication"
        title="Add a credential. Keep the guard."
        lead="Firebase, API keys, a custom JWT, or Rockets' built-in identity all meet the same small adapter contract. Use one provider, or order several into a deliberate chain."
        bullets={AUTH_BULLETS}
      >
        <ProviderCard
          icon={KeyRound}
          label="ordered auth chain"
          providers={AUTH_PROVIDERS}
          result="one AuthorizedUser contract"
          footnote="unmatched → try next · invalid match → stop"
        />
        <ProviderCodeCard code={AUTH_PROVIDERS_TS} file="auth.config.ts" />
      </ProviderSection>

      <ProviderSection
        id="storage-providers"
        eyebrow="Provider model · Storage"
        title="Choose a default. Override the exception."
        lead="Keep most entities on SQL, route an event or report to Firestore, and add another adapter later. The resource owns the choice; the domain service does not change."
        bullets={STORAGE_BULLETS}
      >
        <ProviderCard
          icon={Database}
          label="repository routing"
          providers={STORAGE_PROVIDERS}
          result="one RepositoryInterface<T>"
          footnote="default once · override per entity"
        />
        <ProviderCodeCard code={STORAGE_PROVIDERS_TS} file="storage.config.ts" />
      </ProviderSection>
    </>
  );
}

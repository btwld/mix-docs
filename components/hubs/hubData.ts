export type HubSlug =
  | "generative-ui"
  | "governed-ai-workflows"
  | "legacy-modernization";

export type HubVisual = "interface" | "workflow" | "legacy";

export type HubProject = {
  name: string;
  href: string;
  mode: string;
  role: string;
};

export type HubModelStep = {
  label: string;
  title: string;
  body: string;
};

export type Hub = {
  slug: HubSlug;
  label: string;
  title: string;
  accentTitle: string;
  descriptor: string;
  thesis: string;
  introduction: string;
  accent: string;
  accentSoft: string;
  visual: HubVisual;
  owns: string[];
  doesNotOwn: string[];
  modelHeading: string;
  modelIntroduction: string;
  model: HubModelStep[];
  portfolioHeading: string;
  portfolioIntroduction: string;
  projects: HubProject[];
  report?: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
  };
};

export const HUBS: Hub[] = [
  {
    slug: "generative-ui",
    label: "Adaptive enterprise interfaces",
    title: "Generative",
    accentTitle: "UI",
    descriptor: "Let the interface adapt. Keep meaning, state, and authority stable.",
    thesis:
      "The useful enterprise interface is no longer always a fixed screen. It can compose around the task — inside contracts the product still owns.",
    introduction:
      "Generative UI is the practice of producing task-specific interface surfaces from bounded intent, approved components, typed data, and permitted actions. The surface may change. The product contract cannot.",
    accent: "#38e6bd",
    accentSoft: "rgba(56, 230, 189, 0.14)",
    visual: "interface",
    owns: [
      "Intent contracts and bounded surface generation",
      "Component catalogs, design tokens, and interaction semantics",
      "Typed UI payloads, codecs, parsing, and validation",
      "Host-owned state, actions, accessibility, and lifecycle",
      "Evaluation, observability, compatibility, and rollback",
    ],
    doesNotOwn: [
      "Arbitrary application generation from a prompt",
      "Permission to perform consequential actions",
      "A replacement for product architecture or design systems",
      "Unbounded model output rendered directly into production",
    ],
    modelHeading: "A surface needs a contract.",
    modelIntroduction:
      "Composition can vary because intent, vocabulary, state, and action remain explicit at every boundary.",
    model: [
      {
        label: "Intent",
        title: "Bound the task",
        body: "The application selects an intent with known data, components, actions, and policy constraints.",
      },
      {
        label: "Proposal",
        title: "Compose, don’t improvise",
        body: "A generator proposes a surface from the approved vocabulary instead of emitting arbitrary UI code.",
      },
      {
        label: "Host",
        title: "Validate and prepare",
        body: "The host parses the payload, resolves state, filters actions, enforces accessibility, and owns execution.",
      },
      {
        label: "Outcome",
        title: "Measure the task",
        body: "Success is the workflow outcome, not whether the model produced a plausible-looking screen.",
      },
    ],
    portfolioHeading: "The interface stack, made tangible.",
    portfolioIntroduction:
      "These projects turn the contract into components, behavior, styling, and runtime validation.",
    projects: [
      {
        name: "Mix",
        href: "/mix",
        mode: "Open source",
        role: "Typed styling, design tokens, variants, and composable presentation.",
      },
      {
        name: "Remix",
        href: "/remix",
        mode: "Open source",
        role: "Accessible headless components built on Mix.",
      },
      {
        name: "Naked UI",
        href: "/naked-ui",
        mode: "Open source",
        role: "Behavior, semantics, focus, and observable interaction state.",
      },
      {
        name: "Ack",
        href: "/ack",
        mode: "Shared foundation",
        role: "Codecs, parsing, JSON Schema, and runtime validation for typed UI contracts.",
      },
    ],
    report: {
      eyebrow: "Research feature · Enterprise AI & interaction",
      title: "Generative UI for the Enterprise",
      body: "A practical operating model for adaptive interfaces that preserve policy, state, evidence, and human authority.",
      href: "/reports/generative-ui",
    },
  },
  {
    slug: "governed-ai-workflows",
    label: "AI-assisted work with control built in",
    title: "Governed AI",
    accentTitle: "Workflows",
    descriptor: "AI may move the work. The organization still owns the authority.",
    thesis:
      "Enterprise automation becomes dependable when AI acts through approved capabilities — not broad access — and every consequential boundary can be inspected.",
    introduction:
      "Governed AI Workflows connect models to business systems through explicit contracts, decision rights, policy, evaluation, audit, and recovery. Human review is one control among many, not a substitute for system design.",
    accent: "#5574ff",
    accentSoft: "rgba(85, 116, 255, 0.16)",
    visual: "workflow",
    owns: [
      "Capability and workflow contracts",
      "Identity, delegation, permissions, and policy",
      "Typed inputs, outputs, and structured-AI boundaries",
      "Evaluation, approvals, exceptions, and escalation",
      "Audit, versioning, replay, recovery, and accountability",
    ],
    doesNotOwn: [
      "Generic automation without consequential AI behavior",
      "Human approval as the default control for every risk",
      "The visual composition of adaptive interfaces",
      "Broad AI-transformation claims without operational proof",
    ],
    modelHeading: "Authority before execution.",
    modelIntroduction:
      "The AI step is only one part of the path. Identity, policy, evidence, and recovery determine whether the result can be trusted.",
    model: [
      {
        label: "Capability",
        title: "Define what may happen",
        body: "Expose a narrow business capability with typed inputs, outputs, identity, and ownership.",
      },
      {
        label: "Policy",
        title: "Resolve authority before action",
        body: "Permissions, risk rules, budgets, and escalation paths determine what can run and under whose authority.",
      },
      {
        label: "Execution",
        title: "Validate every boundary",
        body: "Each workflow step receives checked input, produces checked output, and records the decision context.",
      },
      {
        label: "Evidence",
        title: "Make the run inspectable",
        body: "Versions, evaluations, approvals, exceptions, and recovery state remain available after the work completes.",
      },
    ],
    portfolioHeading: "Controls in working software.",
    portfolioIntroduction:
      "The implementation proof sits in narrow capabilities, typed boundaries, portable workflow contracts, and reproducible delivery.",
    projects: [
      {
        name: "Ack",
        href: "/ack",
        mode: "Shared foundation",
        role: "Codecs, parsing, schemas, and typed validation across workflow boundaries.",
      },
      {
        name: "Rockets",
        href: "/rockets",
        mode: "Open source",
        role: "Backend capabilities with identity, storage, policy, validation, and OpenAPI.",
      },
      {
        name: "Stargate",
        href: "/stargate",
        mode: "Product",
        role: "Portable workflow contracts with schema-validated execution and control.",
      },
      {
        name: "FVM",
        href: "https://fvm.app",
        mode: "Shared delivery",
        role: "Reproducible Flutter toolchains across local development and CI.",
      },
    ],
    report: {
      eyebrow: "Research feature · AI & delivery",
      title: "The Production Gap",
      body: "Why AI makes building faster and shipping harder — and the governed-delivery model that closes the gap.",
      href: "/reports/production-gap",
    },
  },
  {
    slug: "legacy-modernization",
    label: "Evidence-led system change",
    title: "Legacy",
    accentTitle: "Modernization",
    descriptor: "Change the system without losing what the business depends on.",
    thesis:
      "Modernization is not a rewrite problem. It is a knowledge, decision, and delivery problem hidden inside code, operations, and institutional memory.",
    introduction:
      "Legacy Modernization reconstructs how a critical system actually works, separates what should be preserved from what should change, and turns the evidence into a sequenced release path.",
    accent: "#ff8a5b",
    accentSoft: "rgba(255, 138, 91, 0.14)",
    visual: "legacy",
    owns: [
      "Evidence recovery across code, operations, and people",
      "Business rules, dependencies, and behavioral contracts",
      "Preserve, change, retire, and investigate decisions",
      "Sequenced remediation, migration, and cutover planning",
      "Validation, release readiness, and accountable ownership",
    ],
    doesNotOwn: [
      "Code analysis as the entire modernization story",
      "Rewrite everything or replace nothing as defaults",
      "Technical-debt scores without business context",
      "AI recommendations without evidence and ownership",
    ],
    modelHeading: "Evidence before intervention.",
    modelIntroduction:
      "Modernization starts by recovering what is true, then names what must survive before any migration path is chosen.",
    model: [
      {
        label: "Recover",
        title: "Rebuild the missing context",
        body: "Map architecture, behavior, data, operations, and the decisions the code alone cannot explain.",
      },
      {
        label: "Decide",
        title: "Name what must survive",
        body: "Classify capabilities and constraints as preserve, change, retire, or investigate — with evidence.",
      },
      {
        label: "Sequence",
        title: "Turn findings into a path",
        body: "Order remediation and migration around risk, dependency, business value, and release capacity.",
      },
      {
        label: "Prove",
        title: "Use the same ruler twice",
        body: "Validate behavior, rerun the baseline, disclose gaps, and show that the system actually improved.",
      },
    ],
    portfolioHeading: "Evidence you can act on.",
    portfolioIntroduction:
      "System context, code findings, and release readiness turn discovery into a sequenced decision path.",
    projects: [
      {
        name: "Voyager",
        href: "/voyager",
        mode: "Product",
        role: "System context, prioritized next moves, and progress against a stable baseline.",
      },
      {
        name: "Code Analysis",
        href: "/code-analysis",
        mode: "Product",
        role: "Repeatable code-health audits and evidence-backed scorecards.",
      },
      {
        name: "Delivery Readiness",
        href: "/code-analysis/readiness",
        mode: "Assessment",
        role: "A verified release picture and sequenced remediation plan in two to three weeks.",
      },
    ],
  },
];

export const HUB_BY_SLUG = Object.fromEntries(
  HUBS.map((hub) => [hub.slug, hub]),
) as Record<HubSlug, Hub>;

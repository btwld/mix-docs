import Link from "next/link";
import { Code2, Database, Layers3, ShieldCheck, Workflow } from "lucide-react";
import type { LandingContent } from "../types";
import { HeroWindow } from "./HeroWindow";
import { OutputsBento } from "./OutputsBento";
import { ProviderSpotlights } from "./ProviderSpotlights";
import { DEFINE_ROCKETS_TS } from "./snippets";

const REPOSITORY_URL = "https://github.com/btwld/rockets";
const README_URL = REPOSITORY_URL + "#readme";

export const rocketsContent: LandingContent = {
  product: "rockets",
  wordmarkName: "rockets",
  showWordmarkByline: false,
  hero: {
    titleTop: "Your backend should be a spec.",
    titleGradient: "Rockets makes it run.",
    lead: (
      <>
        Describe one bounded domain—resources, identity, storage, and access.
        Rockets turns that typed definition into a secure NestJS micro app with
        CRUD, hooks, /me, and OpenAPI. Run it alone or let Stargate orchestrate
        a fleet.
      </>
    ),
    primaryCta: {
      label: "Explore on GitHub",
      href: REPOSITORY_URL,
      arrow: "right",
      external: true,
    },
    secondaryCta: {
      label: "See how it works",
      href: "#how",
      variant: "secondary",
    },
  },
  HeroWindow,
  stats: [
    { value: "1", label: "Backend definition" },
    { value: "1", label: "Shared identity" },
    { value: "N", label: "Domain micro apps" },
    { value: "0", label: "Generated glue" },
  ],
  statement: (
    <>
      The lasting product is the backend definition—not the plumbing of one
      runtime.{" "}
      <span className="lp-gradient-text">
        Rockets makes that definition executable today and points toward a
        contract your platform can provision, inspect, and compose.
      </span>
    </>
  ),
  features: {
    eyebrow: "The product model",
    title: "Define the domain. Keep the definition.",
    lead: "The backend spec is the durable asset. The runtime, identity provider, database, and orchestration layer are replaceable implementations around it.",
    items: [
      {
        icon: Layers3,
        title: "The definition is the product",
        body: "Resources, relationships, identity, storage routing, access rules, and API settings meet in one typed, reviewable definition. defineRockets() is the intended function-first facade; the current alpha still materializes the same plan through Nest dynamic modules.",
        wide: true,
      },
      {
        icon: Workflow,
        title: "One bounded domain, one micro app",
        body: "A billing, CRM, or code-review definition becomes an independently owned API. The open-source runtime works by itself; the product direction makes Stargate the optional layer for provisioning, registering, and orchestrating many of those APIs.",
        wide: true,
      },
      {
        icon: ShieldCheck,
        title: "One identity across the product",
        body: "Every micro app trusts the same issuer and resolves the same user id. Firebase, Okta, a central Rockets auth service, and automation credentials can meet one AuthorizedUser contract without duplicating user databases.",
      },
      {
        icon: Database,
        title: "Infrastructure stays at the edge",
        body: "Authentication and persistence are adapters to the definition. Change an identity provider, choose a new default database, or route one entity to Firestore while domain services keep the same contracts.",
      },
      {
        icon: Code2,
        title: "The framework stops at the boundary",
        body: "Hooks, services, CQRS handlers, integrations, and domain events remain ordinary NestJS code. Rockets assembles the shell and publishes the contract; your team still writes the behavior that makes the product yours.",
      },
    ],
  },
  OutputsBento,
  Spotlights: ProviderSpotlights,
  marquee: {
    rowA: [
      "@bitwild/rockets",
      "@bitwild/rockets-core",
      "@bitwild/rockets-auth",
      "Firebase adapter",
      "TypeORM adapter",
      "Firestore adapter",
      "Zod-first resources",
    ],
    rowB: [
      "Backend specifications",
      "Domain micro apps",
      "Shared identity",
      "Stargate-ready",
      "Declarative resources",
      "Nested CRUD",
      "Dynamic repositories",
      "Auth chains",
      "Owner scoping",
      "CQRS",
      "Swagger",
      "Hooks",
      "Access control",
      "Runtime composition",
      "Zero codegen",
    ],
    cta: {
      label: "Read the getting-started guide",
      href: README_URL,
      variant: "ghost",
      arrow: "right",
      external: true,
    },
  },
  trustSplit: {
    eyebrow: "Open-source contract",
    title: "The spec stays yours.",
    lead: "Rockets should remain useful without a hosted control plane. The definition lives in your repository, the runtime is standard NestJS, and vendors stay behind narrow adapter contracts.",
    bullets: [
      "Run a Rockets micro app without Stargate",
      "AuthAdapterInterface keeps identity providers replaceable",
      "RepositoryInterface keeps persistence out of domain code",
      "Typed TypeScript today; a first-class backend artifact is the direction",
    ],
    cta: {
      label: "Inspect the open contracts",
      href: REPOSITORY_URL + "#the-three-contracts",
      variant: "ghost",
      arrow: "right",
      external: true,
    },
    snippet: DEFINE_ROCKETS_TS,
    snippetFile: "billing.backend.ts",
    snippetLang: "typescript",
  },
  faq: [
    {
      q: "What is Rockets?",
      a: "An open-source backend definition and runtime for NestJS. You describe one bounded domain—its resources, identity boundary, persistence, access, and API surface—and Rockets assembles the repeatable application shell around the business logic you own.",
    },
    {
      q: "What do you mean by a backend spec?",
      a: "A single, typed definition of the backend contract: resources and relationships, exposed operations, shared identity, storage routing, access rules, hooks, and API settings. It is meant to be the reviewable source of truth from which Rockets materializes a running domain API.",
    },
    {
      q: "Is the backend spec portable today?",
      a: "Provider portability is real today: identity and storage sit behind narrow interfaces, and resources are planned independently of a concrete repository. The full definition is still executable TypeScript with NestJS classes—not a language-neutral serialized artifact. Making the backend definition a first-class artifact is the product direction, not a claim about the current alpha.",
    },
    {
      q: "Does Rockets generate code?",
      a: "No. It uses Nest dynamic modules at runtime. A resource definition becomes registered modules, providers, controllers, repository tokens, and routes when the application boots; no generated source files are added to your project.",
    },
    {
      q: "Does it replace NestJS?",
      a: "No. Rockets is a composition layer on top of NestJS and the Concepta module stack. Controllers, services, hooks, CQRS handlers, and dependency injection remain ordinary Nest concepts.",
    },
    {
      q: "Why defineRockets() instead of a Nest module factory?",
      a: "A backend definition should read like a product contract, not framework bootstrapping. The page presents defineRockets() as the intended function-first public facade; it can return the same Nest dynamic module while hiding registration mechanics. The current alpha still exposes RocketsModule.forRoot() internally, while the auth, repository, resource, and planner contracts already exist.",
    },
    {
      q: "How do multiple authentication providers work?",
      a: "Pass one AuthAdapterInterface bootstrap or an ordered array. Each adapter owns its credential transport and validation. Returning matched: false tries the next provider; returning a user succeeds; recognizing but rejecting a credential stops immediately with that error.",
    },
    {
      q: "Where do users live?",
      a: "Either outside the app or inside it. Path A accepts an AuthAdapterInterface for Firebase, Auth0, Okta, custom JWTs, API keys, or another issuer. Path B adds the built-in Rockets auth system for signup, login, recovery, OTP, roles, invitations, and admin user management.",
    },
    {
      q: "Can I use SQL and Firestore in the same service?",
      a: "Yes. Choose one default RepositoryBootstrap, such as TypeORM, then set a Firestore repository override on a single entity inside defineModuleResource(). Everything else stays on the default, and services continue to depend on RepositoryInterface.",
    },
    {
      q: "How does Rockets relate to Stargate?",
      a: (
        <>
          <Link href="/stargate">Stargate</Link> orchestrates cross-system
          workflows and is the direction for provisioning and registering
          micro apps. Rockets runs the small domain APIs those workflows call,
          with one shared identity across the product and persistence owned by
          each domain.
        </>
      ),
    },
    {
      q: "Do I need Stargate to use Rockets?",
      a: "No. A Rockets app is a normal NestJS application and the open-source runtime stands on its own. Stargate adds an optional orchestration and provisioning layer when you want to compose many domain APIs into cross-system workflows.",
    },
    {
      q: "What do I still write?",
      a: "The business logic: domain schemas and entities, custom DTOs, hooks, services, integrations, access rules, and operational choices. Rockets removes repeated infrastructure work; it does not pretend a framework can invent the product.",
    },
    {
      q: "Is Rockets stable?",
      a: "Rockets is pre-1.0 and published under the alpha dist-tag. Its central contracts and configuration surface are stable, but field names can still change before 1.0; pin exact versions for production use.",
    },
  ],
  closingCta: {
    title: "Define the backend. Launch the micro app.",
    lead: "Start with one bounded-domain definition. Run it independently today, and compose it into a Stargate-powered product as the platform evolves.",
    finePrint: "BSD-3-Clause · TypeScript · NestJS · pre-1.0",
    anchor: "start",
    action: {
      kind: "links",
      links: [
        {
          label: "View the repository",
          href: REPOSITORY_URL,
          arrow: "right",
          external: true,
        },
        {
          label: "Read the guide",
          href: README_URL,
          variant: "secondary",
          external: true,
        },
      ],
    },
  },
};

import { Braces, SearchCheck, ShieldCheck, FileJson, Bot } from "lucide-react";
import type { LandingContent } from "../types";
import { HeroWindow } from "./HeroWindow";
import { OutputsBento } from "./OutputsBento";
import { WORKFLOW_SPEC_JSON } from "./snippets";

export const stargateContent: LandingContent = {
  product: "stargate",
  wordmarkName: "stargate",
  hero: {
    titleTop: "Your workflow is a contract.",
    titleGradient: "Author it. Validate it. Run it.",
    lead: (
      <>
        Stargate components pair a schema contract with a handler — ports
        derive from the schema, workflows are directed graphs of component
        references, and engines validate every node boundary of the portable
        WorkflowSpec before and after each handler runs.
      </>
    ),
  },
  HeroWindow,
  stats: [
    { value: "8", label: "Built-in components" },
    { value: "40", label: "Conformance cases" },
    { value: "3", label: "Expression languages" },
    { value: "1", label: "Portable spec" },
  ],
  statement: (
    <>
      Most workflow tools optimize for how fast you can wire nodes together.{" "}
      <span className="lp-gradient-text">
        Stargate optimizes for the correctness and portability of the artifact
        itself
      </span>
      — a validated graph that isn&apos;t welded to the runtime that drew it.
    </>
  ),
  features: {
    eyebrow: "Why Stargate",
    title: "A workflow you can trust before it runs.",
    lead: "Components define language-aware schema contracts in a registry, workflows are directed graphs of references to them, and engines execute the portable spec — validating at every step.",
    items: [
      {
        icon: Braces,
        title: "Contracts, not configs",
        body: "A component is a contract paired with a handler. The schema is the source of truth: if the output schema has keys body and status, the component has exactly those output ports — no separate port declaration, nothing to drift.",
        wide: true,
      },
      {
        icon: SearchCheck,
        title: "Validate before you run",
        body: "The graph validates statically from the definition alone — incompatible connections, missing connections, unresolved parameters, dangling edges, and cycles all surface before a single handler executes.",
        wide: true,
      },
      {
        icon: ShieldCheck,
        title: "Fail at the boundary",
        body: "Engines validate input against the contract before each handler and output after it. If your handler runs, its input has already passed the schema.",
      },
      {
        icon: FileJson,
        title: "Portable by design",
        body: "A WorkflowSpec is data, not code — no handlers, no executable strings, no secrets. The TypeScript engine ships today, an experimental Dart runtime proves the spec travels, and more engines are the point.",
      },
      {
        icon: Bot,
        title: "Agents as components",
        body: "Agents are graph nodes with capabilities inlined on them — model, tools, MCP servers, memory, and skills — each a named contract resolved through the registry.",
      },
    ],
  },
  OutputsBento,
  marquee: {
    rowA: [
      "http.action",
      "template.processor",
      "data.transform",
      "flow.conditional",
      "delay.action",
      "agent.default",
      "calculator",
      "model.echo",
      "model.google",
      "createAction",
    ],
    rowB: [
      "Schema-derived ports",
      "Static graph validation",
      "Registry-backed portability",
      "CEL conditions",
      "JMESPath transforms",
      "Capability bindings",
      "Boundary validation",
      "Dependency-skip cascade",
      "Node timeouts",
      "Env-var secrets",
      "SSE execution streams",
      "MCP tools",
      "Conformance suite",
    ],
  },
  trustSplit: {
    eyebrow: "Portability",
    title: "The artifact is data. Nothing else travels.",
    lead: "A WorkflowSpec serializes graph topology, parameter bindings, and component references — never handlers, resolved runtime values, or secrets. Engines resolve contracts through the registry.",
    bullets: [
      "Secrets stay env-var names — values never serialize",
      "No handlers, no executable strings in the artifact",
      "Validated at authoring, at load, and at every node boundary",
    ],
    ctaLabel: "How validation works",
    snippet: WORKFLOW_SPEC_JSON,
    snippetFile: "ask-the-agent.json",
  },
  faq: [
    {
      q: "What is Stargate?",
      a: "A workflow system built around reusable component contracts. A component pairs a schema contract — Zod I/O and parameter schemas held in a registry — with a language-specific handler, and a workflow is a directed graph of references to those components. It ships a visual studio editor, a NestJS HTTP API, and a CLI: stargate run, stargate studio, and stargate mcp serve.",
    },
    {
      q: "What exactly is a component contract?",
      a: "The component's I/O schemas plus its parameter specs. The schema is the source of truth: ports are projected from the schema's keys, never declared separately. Parameters resolve from static literals, environment-variable references, or JMESPath input paths — handlers only ever see the resolved value.",
    },
    {
      q: "How is this different from n8n or Langflow?",
      a: "Three design bets. Ports are named, stable, and derived from schemas instead of hand-wired. Workflows validate statically from the definition alone — incompatible connections, unresolved parameters, dangling edges, and cycles surface before anything runs. And the definition itself is a portable JSON artifact rather than an export welded to one runtime.",
    },
    {
      q: "Can I run a spec outside TypeScript?",
      a: "The TypeScript reference engine ships today, and an experimental pure-Dart runtime executes the same 40-case conformance suite — proof the spec is engine-neutral data. Multi-engine execution is the design goal, and more engines are planned.",
    },
    {
      q: "Do specs contain secrets or code?",
      a: "No. A WorkflowSpec is data: no handlers, no executable strings, no platform binaries. Secrets are referenced by environment-variable name — values never serialize. At run time the engine validates each node's input before the handler and its output after, so nothing crosses a boundary unchecked.",
    },
    {
      q: "When can I use it?",
      a: "Stargate is launching soon. Join the waitlist for early access and progress updates. Built by Concepta (conceptatech.com).",
    },
  ],
  closingCta: {
    title: "Be first through the gate.",
    lead: "Stargate is launching soon. Join the waitlist for early access and progress updates.",
    finePrint: "© 2026 · Studio · CLI · API · MCP",
  },
};

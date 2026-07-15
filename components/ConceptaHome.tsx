"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "./Button";
import { HeroBackground } from "./HeroBackground";
import { HighlightedCode } from "./HighlightedCode";
import Layout from "./Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
};

/* ── Per-project window visuals ──────────────────────────────────────
   Each block echoes the visual signature of its product page: Mix shows
   a style snippet, Remix its component catalog, Stargate a workflow
   graph, Code Analysis a scorecard. Same chrome, different content. */

const MIX_SNIPPET = `final cardStyle = BoxStyler()
    .color(Colors.blue)
    .padding(.all(16))
    .borderRadius(.circular(8))
    .onHovered(BoxStyler().scale(1.02));

Box(style: cardStyle, child: ...)`;

function MixVisual() {
  return <HighlightedCode code={MIX_SNIPPET} className="pv-code" />;
}

const REMIX_COMPONENTS = [
  "Accordion",
  "Button",
  "Card",
  "Checkbox",
  "Menu",
  "Select",
  "Slider",
  "Switch",
  "Tabs",
  "TextField",
  "Tooltip",
];

function RemixVisual() {
  return (
    <div className="pv-chips">
      {REMIX_COMPONENTS.map((name) => (
        <span key={name} className="pv-chip">
          {name}
        </span>
      ))}
      <span className="pv-chip pv-chip-more">+9 more</span>
    </div>
  );
}

function StargateVisual() {
  return (
    <div className="pv-graph">
      <div className="pv-graph-node">
        <span className="pv-graph-dot" />
        <span className="pv-graph-name">intake</span>
        <span className="pv-graph-comp">http.action</span>
      </div>
      <div className="pv-graph-edge">output → input · validated</div>
      <div className="pv-graph-node">
        <span className="pv-graph-dot" />
        <span className="pv-graph-name">risk-review</span>
        <span className="pv-graph-comp">flow.conditional</span>
      </div>
      <div className="pv-graph-edge">true → input · validated</div>
      <div className="pv-graph-node">
        <span className="pv-graph-dot" />
        <span className="pv-graph-name">approve</span>
        <span className="pv-graph-comp">agent.default</span>
      </div>
      <div className="pv-graph-run">
        <Check size={13} strokeWidth={2.4} />
        validated · human review · audit trail
      </div>
    </div>
  );
}

const GRADES = [
  { name: "Architecture", band: "B", value: 82, color: "#A3E635" },
  { name: "Module Quality", band: "C", value: 74, color: "#FBBF24" },
  { name: "Security", band: "D", value: 58, color: "#FB923C" },
  { name: "Tech-Debt", band: "C", value: 71, color: "#FBBF24" },
];

function CodeAnalysisVisual() {
  return (
    <div className="pv-grades">
      {GRADES.map((g) => (
        <div key={g.name} className="pv-grade-row">
          <span className="pv-grade-letter" style={{ color: g.color }}>
            {g.band}
          </span>
          <span className="pv-grade-name">{g.name}</span>
          <span className="pv-grade-bar">
            <span style={{ width: `${g.value}%`, background: g.color }} />
          </span>
          <span className="pv-grade-value">{g.value}</span>
        </div>
      ))}
    </div>
  );
}

type Project = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  /** Product accent used for the card hover ring and status pill. */
  accent: string;
  status: "Open source" | "Waitlist";
  /** Mono label shown in the window chrome, like a filename. */
  windowLabel: string;
  Visual: React.ComponentType;
};

const PROJECTS: Project[] = [
  {
    name: "Mix",
    tagline: "Expressive styling for Flutter.",
    description:
      "Fluent, chainable styles, reactive variants, and design tokens. Build design systems in Flutter without the boilerplate.",
    href: "/mix",
    accent: "#8B5CF6",
    status: "Open source",
    windowLabel: "card_style.dart",
    Visual: MixVisual,
  },
  {
    name: "Remix",
    tagline: "Flutter components, headless by design.",
    description:
      "20+ accessible components built on Mix — completely styleable, from primitives to a full theme, with zero override wars.",
    href: "/remix",
    accent: "#00EB03",
    status: "Open source",
    windowLabel: "components",
    Visual: RemixVisual,
  },
  {
    name: "Stargate",
    tagline: "Complex workflows for the enterprise.",
    description:
      "Turns APIs, workflows, and business rules into reusable capabilities with controls built in — permissions, approvals, human review, and audit. Agents act through approved capabilities, not broad system access.",
    href: "/stargate",
    accent: "#A78BFA",
    status: "Waitlist",
    windowLabel: "claims-approval.json",
    Visual: StargateVisual,
  },
  {
    name: "Code Analysis",
    tagline: "Deterministic, evidence-backed code audits.",
    description:
      "Ten static analyzers and a 7-phase AI pipeline over any repo — a four-dimension scorecard and a report you can put in front of a client.",
    href: "/code-analysis",
    accent: "#00D3FF",
    status: "Waitlist",
    windowLabel: "code-health.json",
    Visual: CodeAnalysisVisual,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { Visual } = project;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: 0.08 * index,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
    >
      <Link
        href={project.href}
        className="project-card group"
        style={{ "--card-accent": project.accent } as React.CSSProperties}
      >
        <div className="flex items-center justify-between">
          <span className="project-name">{project.name}</span>
          <span className="project-status">{project.status}</span>
        </div>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-description">{project.description}</p>

        <div className="project-window" aria-hidden="true">
          <div className="project-window-bar">
            <span className="project-window-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="project-window-label">{project.windowLabel}</span>
          </div>
          <div className="project-window-body">
            <Visual />
          </div>
        </div>

        <span className="project-link">
          {project.status === "Open source" ? "Explore" : "Join the waitlist"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}

export const ConceptaHome = () => {
  return (
    <>
      <HeroBackground />

      <Layout>
        <div className="relative z-10">
          {/* Hero */}
          <div className="hero-section">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            >
              <img
                src="/assets/logo_concepta.svg"
                alt="Concepta"
                className="concepta-logo"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
            >
              <h1 className="headline">
                We build what others{" "}
                <br className="hidden sm:inline" />
                build on<span className="headline-period">.</span>
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
            >
              <p className="subtitle">
                20 years of building our own delivery foundation — open-source
                tools, accelerators, and platform technology. This is where
                that work lives in the open.
              </p>
            </motion.div>

            <motion.div
              className="not-prose mt-10 flex flex-col sm:flex-row gap-4"
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
            >
              <Button
                href="#projects"
                arrow="right"
                className="concepta-btn w-full sm:w-auto"
              >
                <>Explore the projects</>
              </Button>
              <Button
                href="https://conceptatech.com"
                variant="secondary"
                target="_blank"
                className="w-full sm:w-auto"
              >
                <>Work with us</>
              </Button>
            </motion.div>

            {/* Foundation index — the hero's structural signature: the four
                projects as a directory listing, echoing the window blocks
                below. Each entry hovers in its product accent. */}
            <motion.nav
              className="hero-index not-prose"
              aria-label="Projects"
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeUp}
            >
              <span className="hero-index-cmd">
                <span className="hero-index-prompt">$</span> ls foundation/
              </span>
              <span className="hero-index-row">
                {PROJECTS.map((project) => (
                  <Link
                    key={project.name}
                    href={project.href}
                    className="hero-index-link"
                    style={
                      { "--idx-accent": project.accent } as React.CSSProperties
                    }
                  >
                    {project.href.slice(1)}/
                  </Link>
                ))}
              </span>
            </motion.nav>
          </div>

          {/* Projects */}
          <section id="projects" className="section-gap">
            <motion.div className="section-header" {...sectionReveal}>
              <span className="mono-label">Projects</span>
              <h2 className="section-title">
                Build faster without losing control.
              </h2>
              <p className="mt-4 max-w-[540px] text-base leading-relaxed text-[var(--mix-text-muted)]">
                Every project here started inside real delivery work — then got
                extracted, hardened, and shipped. Open source where the
                community builds with us, product where the problem demands
                more.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Statement */}
          <motion.section className="section-gap" {...sectionReveal}>
            <p className="statement">
              Building got faster. Shipping safely didn&apos;t. These tools
              close that gap —{" "}
              <span className="statement-accent">
                open-source code that already runs inside products at Google,
                Toyota, and Nubank
              </span>
              .
            </p>
          </motion.section>

          {/* Bottom CTA */}
          <motion.section
            className="not-prose cta-section section-gap"
            {...sectionReveal}
          >
            <h2 className="section-title">Build with us.</h2>
            <p className="mt-4 text-[var(--mix-text-muted)] max-w-[440px] text-base leading-relaxed">
              The open source lives on GitHub, and the community hangs out on
              Discord. Come say hi.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                href="https://github.com/btwld"
                target="_blank"
                arrow="right"
                className="concepta-btn w-full sm:w-auto"
              >
                <>GitHub</>
              </Button>
              <Button
                href="https://discord.com/invite/Ycn6GV3m2k"
                variant="secondary"
                target="_blank"
                className="w-full sm:w-auto"
              >
                <>Join the community</>
              </Button>
            </div>
            <p className="cta-handoff">
              Shipping something business-critical?{" "}
              <a
                href="https://conceptatech.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                We own releases end-to-end →
              </a>
            </p>
          </motion.section>
        </div>
      </Layout>

      <style jsx global>{`
        .hero-section {
          padding-top: 80px;
          padding-bottom: 40px;
        }

        .section-gap {
          margin-top: 120px;
        }

        .concepta-logo {
          height: 32px;
          width: auto;
        }

        /* Brand primary buttons (design-system dark-surface roles) —
           overrides the Button component's default violet. */
        .concepta-btn {
          background: #3a5bff !important;
          box-shadow: 0 4px 20px rgba(58, 91, 255, 0.3) !important;
        }

        .concepta-btn:hover {
          background: #5570ff !important;
          box-shadow: 0 6px 25px rgba(58, 91, 255, 0.4) !important;
        }

        /* Carbon-sharp display: solid white, heavy, tight — no gradient.
           The brand's confidence lives in the full stop, set in brand blue. */
        .headline {
          display: block;
          font-size: min(5.5rem, max(9vw, 3.25rem));
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-top: 1.75rem;
          color: #fff;
          text-align: left;
        }

        .headline-period {
          color: var(--mix-accent);
        }

        .subtitle {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--mix-text-muted);
          margin-top: 1.5rem;
          max-width: 520px;
        }

        /* Foundation index — mono directory listing under the CTAs */
        .hero-index {
          margin-top: 44px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 13px;
        }

        .hero-index-cmd {
          color: var(--mix-text-muted);
          opacity: 0.65;
        }

        .hero-index-prompt {
          color: #00ebbc;
          opacity: 0.9;
        }

        .hero-index-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 24px;
        }

        .hero-index-link {
          color: var(--mix-text-muted);
          transition: color 0.2s;
        }

        .hero-index-link:hover,
        .hero-index-link:focus-visible {
          color: var(--idx-accent);
        }

        .mono-label {
          display: inline-block;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          /* Brand aqua — the design system's accent-on-black */
          color: #00ebbc;
        }

        .section-header {
          text-align: left;
          margin-bottom: 48px;
        }

        .section-title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
          margin-top: 12px;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 28px;
          border-radius: 16px;
          background: var(--mix-surface);
          border: 1px solid var(--mix-border-card);
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }

        .project-card:hover {
          border-color: color-mix(in srgb, var(--card-accent) 45%, transparent);
          box-shadow: 0 0 28px -6px
            color-mix(in srgb, var(--card-accent) 30%, transparent);
          transform: translateY(-2px);
        }

        .project-name {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #fff;
        }

        .project-status {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 999px;
          color: var(--card-accent);
          background: color-mix(in srgb, var(--card-accent) 10%, transparent);
          border: 1px solid
            color-mix(in srgb, var(--card-accent) 25%, transparent);
        }

        .project-tagline {
          margin-top: 16px;
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
        }

        .project-description {
          margin-top: 8px;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--mix-text-muted);
        }

        /* ── Project window (shared chrome for the per-product visual) ── */
        .project-window {
          margin-top: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          background: var(--mix-bg);
          border: 1px solid var(--mix-border-card);
          overflow: hidden;
        }

        .project-window-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--mix-border-card);
        }

        .project-window-dots {
          display: inline-flex;
          gap: 5px;
        }

        .project-window-dots span {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
        }

        .project-window-label {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--mix-text-muted);
        }

        .project-window-body {
          flex-grow: 1;
          min-height: 172px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Mix: style snippet */
        .pv-code {
          font-size: 12.5px !important;
          overflow-x: auto;
        }
        .pv-code code {
          font-size: 12.5px !important;
          line-height: 1.55 !important;
        }

        /* Remix: component catalog chips */
        .pv-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-content: center;
        }

        .pv-chip {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          color: var(--mix-text-muted);
          background: var(--mix-surface-bright);
          border: 1px solid var(--mix-border-card);
        }

        .pv-chip-more {
          color: var(--card-accent);
          background: color-mix(in srgb, var(--card-accent) 8%, transparent);
          border-color: color-mix(in srgb, var(--card-accent) 25%, transparent);
        }

        /* Stargate: mini workflow graph */
        .pv-graph {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pv-graph-node {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          background: var(--mix-surface-bright);
          border: 1px solid var(--mix-border-card);
        }

        .pv-graph-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--card-accent);
          box-shadow: 0 0 8px
            color-mix(in srgb, var(--card-accent) 60%, transparent);
        }

        .pv-graph-name {
          font-size: 13px;
          font-weight: 500;
          color: #fff;
        }

        .pv-graph-comp {
          margin-left: auto;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--mix-text-muted);
        }

        .pv-graph-edge {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--mix-text-muted);
          padding-left: 22px;
          border-left: 1px dashed
            color-mix(in srgb, var(--card-accent) 40%, transparent);
          margin-left: 17px;
          padding-top: 2px;
          padding-bottom: 2px;
        }

        .pv-graph-run {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--card-accent);
        }

        /* Code Analysis: mini scorecard */
        .pv-grades {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pv-grade-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pv-grade-letter {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 15px;
          font-weight: 700;
          width: 16px;
          text-align: center;
        }

        .pv-grade-name {
          font-size: 12.5px;
          color: var(--mix-text-main);
          width: 118px;
          flex-shrink: 0;
        }

        .pv-grade-bar {
          flex-grow: 1;
          height: 5px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          overflow: hidden;
        }

        .pv-grade-bar span {
          display: block;
          height: 100%;
          border-radius: 999px;
        }

        .pv-grade-value {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--mix-text-muted);
          width: 24px;
          text-align: right;
        }

        .project-link {
          margin-top: 20px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--card-accent);
        }

        .statement {
          max-width: 720px;
          font-size: clamp(1.375rem, 3vw, 1.875rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.4;
          color: var(--mix-text-muted);
        }

        .statement-accent {
          color: #fff;
        }

        .cta-section {
          margin-bottom: 80px;
          border-top: 1px solid var(--mix-border-card);
          padding-top: 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Quiet handoff to the services side — one line, once. */
        .cta-handoff {
          margin-top: 28px;
          font-size: 0.875rem;
          color: var(--mix-text-muted);
        }

        .cta-handoff a {
          color: var(--mix-text-main);
          text-decoration: none;
          transition: color 0.2s;
        }

        .cta-handoff a:hover {
          color: var(--mix-accent);
        }
      `}</style>
    </>
  );
};

"use client";

import Link from "next/link";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "./Button";
import {
  CONCEPTA_ADDRESS_DISPLAY,
  CONCEPTA_GITHUB_URL,
  CONCEPTA_LEGAL_NAME,
  CONCEPTA_MAP_URL,
  CONCEPTA_PHONE_DISPLAY,
  CONCEPTA_PHONE_HREF,
} from "./constants";
import { HeroBackground } from "./HeroBackground";
import { HighlightedCode } from "./HighlightedCode";
import Layout from "./Layout";
import { ProductionGapCard } from "./reports/ProductionGapCard";

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

/* ── Agency proof (from the published conceptatech.com copy) ────────── */

const PROOF_TICKER = [
  "Since 2006",
  "600+ projects delivered",
  "98% delivery satisfaction",
];

const TRUSTED_BY = [
  {
    name: "Truist",
    className: "trust-logo-truist",
    src: "/assets/client-logos/truist.svg",
  },
  {
    name: "AdventHealth",
    className: "trust-logo-adventhealth",
    src: "/assets/client-logos/adventhealth.svg",
  },
  {
    name: "FEMA",
    className: "trust-logo-fema",
    src: "/assets/client-logos/fema.svg",
  },
  {
    name: "Red Lobster",
    className: "trust-logo-red-lobster",
    src: "/assets/client-logos/red-lobster.png",
  },
  {
    name: "Warner Music Group",
    className: "trust-logo-warner-music-group",
    src: "/assets/client-logos/warner-music-group.svg",
  },
  {
    name: "Google",
    className: "trust-logo-google",
    src: "/assets/client-logos/google.svg",
  },
] as const;

const TRUST_OUTCOMES = [
  "27% more loan applications at Truist",
  "Up to $3M saved in a two-day FEMA activation",
  "4.7★ across 16k reviews at AdventHealth",
];

const PROJECTS_INTRO = "Every project here started inside real delivery work — then got extracted, hardened, and shipped. Our open-source work is used by teams at Universal, Disney, BMW, Toyota, LG, Nubank, and others. Open source where the community builds with us, product where the problem demands more.";

const PILLARS = [
  {
    stat: "35+",
    title: "Small by design.",
    body: "A 35-person firm — small enough that our leadership stays in the actual work: in the decisions, through the release, not just the pitch.",
  },
  {
    stat: "+27%",
    title: "We ship what a business depends on.",
    body: "Truist: 27% more loan applications. AdventHealth: 4.7 stars across 16,000 reviews. Proven in fintech, healthcare, and government.",
  },
  {
    stat: "20yr",
    title: "We don't start from scratch.",
    body: "Two decades of building our own delivery foundation — the tools below — so every release starts from proven blocks, not a blank page.",
  },
];

/* ── Per-project window visuals ──────────────────────────────────────
   Each block echoes the visual signature of its product page: Mix shows
   a style snippet, Remix its component catalog, Naked UI its observable state,
   Ack a validation result, FVM a pinned SDK, Rockets its configuration plan,
   Stargate a governed workflow, and Code Analysis a scorecard. Same chrome,
   different content. */

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

function NakedUiVisual() {
  return (
    <div className="pv-naked">
      <span className="pv-naked-button">Save changes</span>
      <div className="pv-naked-states">
        <span className="is-active">hovered</span>
        <span>focused</span>
        <span>pressed</span>
      </div>
      <div className="pv-naked-contract">
        <span>behavior</span>
        <strong>semantics · keyboard · focus</strong>
      </div>
      <div className="pv-naked-contract is-presentation">
        <span>presentation</span>
        <strong>entirely yours</strong>
      </div>
    </div>
  );
}

const ACK_SNIPPET = `final result = userSchema.safeParse({
  'name': 'Ada',
  'email': 'not-an-email',
});`;

function AckVisual() {
  return (
    <div className="pv-ack">
      <HighlightedCode code={ACK_SNIPPET} className="pv-code" />
      <div className="pv-ack-error">
        <span className="pv-ack-path">#/email</span>
        <span>Value must be a valid email address.</span>
      </div>
    </div>
  );
}

function FvmVisual() {
  return (
    <div className="pv-fvm">
      <div className="pv-fvm-command">
        <span className="pv-fvm-prompt">$</span>
        <code>fvm use stable --pin</code>
      </div>
      <div className="pv-fvm-result">
        <span className="pv-fvm-check">
          <Check size={14} strokeWidth={2.4} />
        </span>
        <span>
          <strong>Project configured</strong>
          <small>Flutter stable is ready to use</small>
        </span>
      </div>
      <div className="pv-fvm-file">
        <code>.fvmrc</code>
        <span>commit once · keep every environment in sync</span>
      </div>
    </div>
  );
}

function RocketsVisual() {
  return (
    <div className="pv-graph">
      <div className="pv-graph-node">
        <span className="pv-graph-dot" />
        <span className="pv-graph-name">options</span>
        <span className="pv-graph-comp">auth · resources · repository</span>
      </div>
      <div className="pv-graph-edge">createServer · no generated files</div>
      <div className="pv-graph-node">
        <span className="pv-graph-dot" />
        <span className="pv-graph-name">server</span>
        <span className="pv-graph-comp">/me · /pets · /api</span>
      </div>
      <div className="pv-graph-run">
        <Check size={13} strokeWidth={2.4} />
        identity · CRUD · hooks · OpenAPI
      </div>
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
  /** Opens projects hosted outside this site in a new tab. */
  external?: boolean;
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
      "20+ accessible components built on Mix — completely styleable, from primitives to a full theme, with complete visual control.",
    href: "/remix",
    accent: "#00EB03",
    status: "Open source",
    windowLabel: "components",
    Visual: RemixVisual,
  },
  {
    name: "Naked UI",
    tagline: "Behavior-first Flutter primitives.",
    description:
      "Fourteen headless controls with semantics, keyboard and focus behavior, overlays, and observable state — without imposed styling.",
    href: "/naked-ui",
    accent: "#60A5FA",
    status: "Open source",
    windowLabel: "builder state",
    Visual: NakedUiVisual,
  },
  {
    name: "Ack",
    tagline: "Trust the boundary. Keep the types.",
    description:
      "Dart schemas for apps and structured AI — define the shape once, validate every response at runtime, and keep your types.",
    href: "/ack",
    accent: "#6E8BFF",
    status: "Open source",
    windowLabel: "user_schema.dart",
    Visual: AckVisual,
  },
  {
    name: "FVM",
    tagline: "Simple Flutter version management.",
    description:
      "Pin Flutter SDKs per project, switch versions without reinstalling, and keep local development and CI on the same toolchain.",
    href: "https://fvm.app",
    accent: "#38BDF8",
    status: "Open source",
    windowLabel: "project setup",
    external: true,
    Visual: FvmVisual,
  },
  {
    name: "Rockets",
    tagline: "Describe the backend. Ship the domain.",
    description:
      "One typed backend definition wires identity, storage, resources, access, hooks, and OpenAPI at runtime.",
    href: "/rockets",
    accent: "#FF5906",
    status: "Open source",
    windowLabel: "server.ts",
    Visual: RocketsVisual,
  },
  {
    name: "Stargate",
    tagline: "Complex workflows for the enterprise.",
    description:
      "Turns APIs, workflows, and business rules into reusable capabilities with controls built in — permissions, approvals, human review, and audit. Agents act through approved capabilities, not broad system access.",
    href: "/stargate",
    accent: "#3EB8C9",
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
      className="motion-reveal"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: 0.08 * (index % 2),
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
    >
      <Link
        href={project.href}
        target={project.external ? "_blank" : undefined}
        rel={project.external ? "noopener noreferrer" : undefined}
        className="project-card group"
        style={{ "--card-accent": project.accent } as React.CSSProperties}
      >
        <div className="project-card-copy">
          <div className="flex items-center justify-between">
            <h3 className="project-name">{project.name}</h3>
            <span className="project-status">{project.status}</span>
          </div>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-description">{project.description}</p>
          <span className="project-link">
            {project.status === "Open source" ? "Explore" : "Join the waitlist"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

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
      </Link>
    </motion.div>
  );
}

export const ConceptaHome = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion="user"
      skipAnimations={shouldReduceMotion === true}
    >
      <div className="concepta-home">
        <HeroBackground />

      <Layout>
        <div className="relative z-10">
          {/* Hero — the agency stance, with the foundation below */}
          <div className="hero-section">
            <motion.div
              className="motion-reveal"
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
              className="motion-reveal"
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
            >
              <p className="hero-stance">
                Building got faster. Shipping safely didn&apos;t.
              </p>
              <h1 className="headline">
                We ship the systems{" "}
                <br className="hidden sm:inline" />
                your business runs on
                <span className="headline-period">.</span>
              </h1>
            </motion.div>

            <motion.div
              className="motion-reveal"
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
            >
              <p className="subtitle">
                Between code that&apos;s written and a system that&apos;s safely
                live, there&apos;s a gap. We own it — the decisions, the
                release, the outcome. And we build our own tools to do it.
              </p>
            </motion.div>

            <motion.div
              className="motion-reveal not-prose mt-10 flex flex-col sm:flex-row gap-4"
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
            >
              <Button
                href="/code-analysis/readiness"
                arrow="right"
                className="concepta-btn w-full sm:w-auto"
              >
                <>Get a Delivery Readiness Assessment</>
              </Button>
              <Button
                href="#projects"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <>Explore our projects</>
              </Button>
            </motion.div>

            <motion.p
              className="motion-reveal hero-ticker"
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeUp}
            >
              {PROOF_TICKER.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className="hero-ticker-sep"> / </span>}
                  {item}
                </span>
              ))}
            </motion.p>
          </div>

          {/* Trust bar */}
          <motion.section className="motion-reveal trust-bar" {...sectionReveal}>
            <p className="trust-label">Selected Concepta clients</p>
            <div
              className="trust-logos"
              role="list"
              aria-label="Selected Concepta clients"
            >
              {TRUSTED_BY.map((client) => (
                <div
                  className={`trust-logo-card ${client.className}`}
                  role="listitem"
                  key={client.name}
                >
                  <img
                    className="trust-logo-image"
                    src={client.src}
                    alt={`${client.name} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <p className="trust-outcomes">
              {TRUST_OUTCOMES.map((line, i) => (
                <span key={line}>
                  {i > 0 && <span className="hero-ticker-sep"> / </span>}
                  {line}
                </span>
              ))}
            </p>
          </motion.section>

          {/* What Concepta does */}
          <section className="section-gap">
            <motion.div className="motion-reveal section-header" {...sectionReveal}>
              <span className="mono-label">What Concepta does</span>
              <h2 className="section-title">
                We don&apos;t advise from the sideline. We own the outcome.
              </h2>
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[var(--mix-text-muted)]">
                One owner, from the first readiness call to the live release.
                We make the hard technical decisions, stabilize or build, and
                stand behind what ships.{" "}
                <span className="text-white">
                  Advice doesn&apos;t ship. We do.
                </span>
              </p>
            </motion.div>

            <motion.div
              className="motion-reveal grid grid-cols-1 md:grid-cols-3 gap-4"
              {...sectionReveal}
            >
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="pillar">
                  <span className="pillar-stat">{pillar.stat}</span>
                  <p className="pillar-title">{pillar.title}</p>
                  <p className="pillar-body">{pillar.body}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Research — evidence behind the agency stance */}
          <section id="research" className="section-gap">
            <motion.div className="motion-reveal section-header" {...sectionReveal}>
              <span className="mono-label">Concepta research</span>
              <h2 className="section-title">
                The evidence behind governed delivery.
              </h2>
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[var(--mix-text-muted)]">
                Building is accelerating. The controls around review, release,
                and production are not. Our latest report maps the gap — and
                the operating model that closes it.
              </p>
            </motion.div>

            <motion.div className="motion-reveal" {...sectionReveal}>
              <ProductionGapCard href="/reports" external={false} compact />
            </motion.div>
          </section>

          {/* Projects — the delivery foundation */}
          <section id="projects" className="section-gap">
            <motion.div className="motion-reveal section-header" {...sectionReveal}>
              <span className="mono-label">The delivery foundation</span>
              <h2 className="section-title">
                Build faster without losing control.
              </h2>
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[var(--mix-text-muted)]">
                {PROJECTS_INTRO}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <motion.section
            className="motion-reveal not-prose cta-section section-gap"
            {...sectionReveal}
          >
            <h2 className="section-title">Know whether it&apos;s safe to ship.</h2>
            <p className="mt-4 text-[var(--mix-text-muted)] max-w-[480px] text-base leading-relaxed">
              Start with a Delivery Readiness Assessment — in two to three
              weeks you&apos;ll know exactly where your release stands, and
              what to do next.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                href="/code-analysis/readiness"
                arrow="right"
                className="concepta-btn w-full sm:w-auto"
              >
                <>Get a Delivery Readiness Assessment</>
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
              Prefer the code? The open source lives on{" "}
              <a
                href={CONCEPTA_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            </p>

            <address className="contact-card" aria-label="Concepta contact information">
              <span className="contact-identity">
                <strong>{CONCEPTA_LEGAL_NAME}</strong>
                <span>Orlando, Florida</span>
              </span>
              <span className="contact-links">
                <a className="contact-link" href={CONCEPTA_PHONE_HREF}>
                  {CONCEPTA_PHONE_DISPLAY}
                </a>
                <a
                  className="contact-link contact-address"
                  href={CONCEPTA_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${CONCEPTA_ADDRESS_DISPLAY} in Google Maps`}
                >
                  {CONCEPTA_ADDRESS_DISPLAY}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </span>
            </address>
          </motion.section>
        </div>
      </Layout>

      <style jsx global>{`
        html[data-product="concepta"],
        html[data-product="concepta"] body {
          overflow-x: clip;
        }

        .concepta-home {
          position: relative;
          isolation: isolate;
        }

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
          background: #4963ff !important;
          box-shadow: 0 6px 25px rgba(58, 91, 255, 0.4) !important;
        }

        /* Stance line — the worldview the page argues from */
        .hero-stance {
          margin-top: 2rem;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: #00ebbc;
        }

        /* Carbon-sharp display: solid white, heavy, tight — no gradient.
           The brand's confidence lives in the full stop, set in brand blue. */
        .headline {
          display: block;
          font-size: min(5rem, max(8vw, 3rem));
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-top: 1rem;
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
          max-width: 560px;
        }

        /* Proof ticker — numbers, mono, quiet */
        .hero-ticker {
          margin-top: 40px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 13px;
          color: var(--mix-text-muted);
        }

        .hero-ticker-sep {
          color: #00ebbc;
          opacity: 0.7;
        }

        /* Trust bar */
        .trust-bar {
          margin-top: 96px;
          padding: 28px 0;
          border-top: 1px solid var(--mix-border-card);
          border-bottom: 1px solid var(--mix-border-card);
        }

        .trust-label {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--mix-text-muted);
          opacity: 0.7;
        }

        .trust-logos {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
          margin-top: 18px;
        }

        .trust-logo-card {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: transparent;
        }

        .trust-logo-image {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 132px;
          max-height: 38px;
          object-fit: contain;
          filter: grayscale(1) brightness(0) invert(1);
          opacity: 0.76;
        }

        .trust-logo-red-lobster .trust-logo-image {
          max-height: 42px;
        }

        .trust-logo-warner-music-group .trust-logo-image {
          max-width: 112px;
          max-height: 44px;
        }

        .trust-logo-google .trust-logo-image {
          max-width: 100px;
          max-height: 34px;
        }

        .trust-outcomes {
          margin-top: 18px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12.5px;
          color: var(--mix-text-muted);
        }

        @media (max-width: 1023px) {
          .trust-logos {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 639px) {
          .trust-logos {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .trust-logo-card {
            height: 68px;
            padding: 14px;
          }
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

        /* Pillars */
        .pillar {
          padding: 24px;
          border-radius: 16px;
          background: var(--mix-surface);
          border: 1px solid var(--mix-border-card);
        }

        .pillar-stat {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--mix-accent);
          letter-spacing: -0.02em;
        }

        .pillar-title {
          margin-top: 12px;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .pillar-body {
          margin-top: 6px;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--mix-text-muted);
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

        .project-card-copy {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
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
          flex-grow: 1;
        }

        .project-link {
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--card-accent);
        }

        /* ── Project window (shared chrome for the per-product visual) ── */
        .project-window {
          margin-top: 20px;
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

        /* Mix / Ack: code snippets */
        .pv-code {
          font-size: 12.5px !important;
          overflow-x: auto;
        }
        .pv-code code {
          font-size: 12.5px !important;
          line-height: 1.55 !important;
        }

        /* Ack: validation result row */
        .pv-ack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pv-ack-error {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 107, 107, 0.25);
          background: rgba(255, 107, 107, 0.07);
          font-size: 12.5px;
          color: var(--mix-text-muted);
        }

        .pv-ack-path {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11.5px;
          color: #ff6b6b;
          flex-shrink: 0;
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

        /* Naked UI: behavior/presentation split */
        .pv-naked {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .pv-naked-button {
          grid-column: 1 / -1;
          justify-self: start;
          border-radius: 9px;
          padding: 9px 14px;
          background: var(--card-accent);
          color: #07111f;
          font-size: 12px;
          font-weight: 650;
          box-shadow: 0 8px 22px
            color-mix(in srgb, var(--card-accent) 24%, transparent);
        }

        .pv-naked-states {
          grid-column: 1 / -1;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .pv-naked-states span {
          border: 1px solid var(--mix-border-card);
          border-radius: 999px;
          padding: 3px 8px;
          color: var(--mix-text-muted);
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 10px;
        }

        .pv-naked-states .is-active {
          border-color: color-mix(in srgb, var(--card-accent) 30%, transparent);
          background: color-mix(in srgb, var(--card-accent) 9%, transparent);
          color: var(--card-accent);
        }

        .pv-naked-contract {
          min-width: 0;
          border: 1px solid color-mix(in srgb, var(--card-accent) 22%, transparent);
          border-radius: 9px;
          padding: 9px 10px;
          background: color-mix(in srgb, var(--card-accent) 6%, transparent);
        }

        .pv-naked-contract span,
        .pv-naked-contract strong {
          display: block;
        }

        .pv-naked-contract span {
          color: var(--card-accent);
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .pv-naked-contract strong {
          margin-top: 5px;
          color: #fff;
          font-size: 10px;
          font-weight: 500;
          line-height: 1.4;
        }

        .pv-naked-contract.is-presentation {
          border-color: var(--mix-border-card);
          background: var(--mix-surface-bright);
        }

        .pv-naked-contract.is-presentation span {
          color: var(--mix-text-muted);
        }

        /* FVM: project-scoped SDK setup */
        .pv-fvm {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pv-fvm-command,
        .pv-fvm-result,
        .pv-fvm-file {
          border-radius: 9px;
          border: 1px solid var(--mix-border-card);
          background: var(--mix-surface-bright);
        }

        .pv-fvm-command {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          font-size: 12px;
        }

        .pv-fvm-command code,
        .pv-fvm-file code {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
        }

        .pv-fvm-prompt {
          color: var(--card-accent);
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-weight: 700;
        }

        .pv-fvm-result {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
        }

        .pv-fvm-check {
          display: grid;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 999px;
          color: #07111f;
          background: var(--card-accent);
        }

        .pv-fvm-result strong,
        .pv-fvm-result small {
          display: block;
        }

        .pv-fvm-result strong {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
        }

        .pv-fvm-result small {
          margin-top: 2px;
          color: var(--mix-text-muted);
          font-size: 10.5px;
        }

        .pv-fvm-file {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 9px 12px;
          color: var(--mix-text-muted);
          font-size: 10px;
        }

        .pv-fvm-file code {
          flex-shrink: 0;
          color: var(--card-accent);
          font-size: 10.5px;
        }

        .pv-fvm-file span {
          text-align: right;
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

        .cta-section {
          margin-bottom: 80px;
          border-top: 1px solid var(--mix-border-card);
          padding-top: 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Quiet handoff — one line, once. */
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

        .contact-card {
          width: 100%;
          max-width: 760px;
          margin-top: 32px;
          padding: 20px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          border: 1px solid var(--mix-border-card);
          border-radius: 14px;
          background: color-mix(in srgb, var(--mix-surface) 82%, transparent);
          font-style: normal;
          text-align: left;
        }

        .contact-identity,
        .contact-links {
          display: flex;
          flex-direction: column;
        }

        .contact-identity {
          flex-shrink: 0;
          gap: 3px;
        }

        .contact-identity strong {
          color: var(--mix-text-main);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .contact-identity span {
          color: var(--mix-text-muted);
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .contact-links {
          align-items: flex-end;
          gap: 5px;
          min-width: 0;
        }

        .contact-link {
          color: var(--mix-text-muted);
          font-size: 0.8125rem;
          line-height: 1.5;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #fff;
        }

        .contact-link:focus-visible {
          border-radius: 4px;
          outline: 2px solid #00ebbc;
          outline-offset: 3px;
        }

        .contact-address {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          text-align: right;
        }

        .contact-address svg {
          flex-shrink: 0;
        }

        @media (max-width: 639px) {
          .contact-card {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .contact-links {
            align-items: flex-start;
          }

          .contact-address {
            justify-content: flex-start;
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .project-card {
            transition: none;
          }

          .project-card:hover {
            transform: none;
          }

          .project-card .project-link svg {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      </div>
    </MotionConfig>
  );
};

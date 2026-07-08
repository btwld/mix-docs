"use client";

import { motion, MotionConfig } from "framer-motion";
import { HighlightedCode } from "./HighlightedCode";
import { FlutterMultiView } from "./FlutterMultiView";
import { RemixButton } from "./remix/RemixButton";

/* ── Links ──────────────────────────────────────────────────────────── */
const LINKS = {
  getStarted: "/documentation/remix",
  components: "/documentation/remix/components/button",
  styling: "/documentation/mix/guides/styling",
  mixDocs: "/documentation/mix/overview/introduction",
  github: "https://github.com/btwld/remix",
  discord: "https://discord.com/invite/Ycn6GV3m2k",
};

/* ── Animation presets (shared with the Mix home) ───────────────────── */
const EASE = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: EASE },
};

/* ── Section header ─────────────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  children,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="rmx-section-header">
      <span className="rmx-mono-label">{label}</span>
      <h2 className="rmx-section-title">{title}</h2>
      {children}
    </div>
  );
}

/* ── Live preview frame ─────────────────────────────────────────────── */
function LivePreview({
  previewId,
  height = 300,
  eager = false,
  caption,
}: {
  previewId: string;
  height?: number;
  eager?: boolean;
  caption?: string;
}) {
  return (
    <div className="rmx-preview">
      <div className="rmx-preview-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        {caption && <em>{caption}</em>}
      </div>
      <FlutterMultiView
        previewId={previewId}
        height={height}
        bordered={false}
        lazyLoad={!eager}
        transparent
      />
    </div>
  );
}

const COMPONENTS = [
  "Button", "Card", "Select", "Slider", "Switch", "Tabs", "TextField",
  "Tooltip", "Accordion", "Avatar", "Badge", "Checkbox", "Radio",
  "Progress", "Menu", "Callout", "Divider", "IconButton", "Spinner",
];

const FAQ = [
  {
    q: "Is Remix free?",
    a: "Yes. Remix is open source and free — no tiers, no license fees, no lock-in.",
  },
  {
    q: "How is it different from Material or Cupertino?",
    a: "Material and Cupertino give you a look you then have to fight. Remix gives you behavior with no opinionated look — you style every pixel with Mix. Full control, no override wars.",
  },
  {
    q: "Do I need to know Mix first?",
    a: "It helps, but no. Remix ships with sensible styles you can use immediately, then customize with Mix's fluent API as you grow.",
  },
  {
    q: "Is it accessible and keyboard-navigable?",
    a: "Yes — built into every component. You don't wire it up yourself.",
  },
  {
    q: "Is it production-ready?",
    a: "Remix is in Beta and evolving fast. The component set is real and usable today; references, guides, and tutorials land continuously.",
  },
  {
    q: "Can I use it in a commercial app?",
    a: "Yes. It's open source — build whatever you want.",
  },
];

const STYLE_SNIPPET = `final button = RemixButtonStyle()
  .paddingX(16)
  .paddingY(10)
  .color(Colors.blue)
  .borderRadiusAll(const Radius.circular(8))
  .onHovered(
    RemixButtonStyle().color(Colors.blue.shade700),
  )
  .animate(AnimationConfig.spring(300.ms));`;

export const RemixHome = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="rmx-root">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="rmx-shell rmx-hero">
          <div className="rmx-hero-copy">
            <motion.img
              src="/assets/logo_remix_sidebar.png"
              alt="Remix"
              className="rmx-logo"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            />
            <motion.h1
              className="rmx-headline"
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
            >
              Build Flutter UI
              <br className="hidden sm:inline" /> you&apos;re proud to ship.
            </motion.h1>
            <motion.p
              className="rmx-subtitle"
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
            >
              An open source component library for Flutter — accessible, headless
              components paired with a fluent styling engine. Made for teams that
              care about the details.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
            >
              <p className="rmx-support">
                <span className="rmx-dot" /> Currently in Beta · Built on Flutter
                and Mix
              </p>
              <div className="rmx-cta-row">
                <RemixButton href={LINKS.getStarted} arrow="right">
                  Get started
                </RemixButton>
                <RemixButton href={LINKS.components} variant="secondary">
                  Browse components
                </RemixButton>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="rmx-hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <LivePreview previewId="components/button.0" height={300} eager />
          </motion.div>
        </section>

        {/* ── Positioning ───────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div {...reveal}>
            <SectionHeader
              label="Positioning"
              title="Start anywhere. Style anything. Ship faster."
            >
              <p className="rmx-lead">
                Remix hands you accessible, headless components and gets out of the
                way. Interaction logic is handled — hover, focus, press, keyboard
                navigation — so you spend your time on the design, not the plumbing.
              </p>
            </SectionHeader>
            <div className="rmx-contrast">
              <p>
                <strong>
                  You stop rebuilding the same button, the same checkbox, the same
                  focus ring over and over.
                </strong>{" "}
                Remix gives you a solid baseline so you can spend time on your
                product, not on reimplementing UI decisions Flutter should have
                handled.
              </p>
              <RemixButton href={LINKS.getStarted} variant="ghost" arrow="right">
                See how it works
              </RemixButton>
            </div>
          </motion.div>
        </section>

        {/* ── Component library ─────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div {...reveal}>
            <SectionHeader
              label="Component library"
              title="20+ components. Polished by default. Every interaction state, handled."
            >
              <p className="rmx-lead">
                Accessible, themeable Flutter components with hover, focus, press,
                keyboard navigation, and animation built in — not bolted on.
              </p>
            </SectionHeader>
          </motion.div>

          <motion.div className="rmx-live-grid" {...reveal}>
            <LivePreview previewId="components/card.0" height={300} caption="Card" />
            <LivePreview previewId="components/switch.0" height={300} caption="Switch" />
            <LivePreview previewId="components/slider.0" height={300} caption="Slider" />
          </motion.div>

          <motion.div className="rmx-pill-grid" {...reveal}>
            {COMPONENTS.map((name) => (
              <span key={name} className="rmx-pill">
                {name}
              </span>
            ))}
            <span className="rmx-pill rmx-pill-muted">and more…</span>
          </motion.div>

          <motion.div className="rmx-center" {...reveal}>
            <RemixButton href={LINKS.components} variant="ghost" arrow="right">
              Browse components
            </RemixButton>
          </motion.div>
        </section>

        {/* ── Styling ───────────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <div className="rmx-split">
            <motion.div {...reveal}>
              <SectionHeader
                label="Styling"
                title="Fully customizable styles, ready for use."
              >
                <p className="rmx-lead">
                  Make it yours without starting from scratch. Define a look once
                  with Mix&apos;s fluent API, then reuse and adapt it across your
                  whole app — no deep widget trees, no copy-pasted variants that
                  drift out of sync.
                </p>
              </SectionHeader>
              <RemixButton href={LINKS.styling} variant="ghost" arrow="right">
                Explore styling
              </RemixButton>
            </motion.div>

            <motion.div
              className="rmx-code"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <div className="rmx-preview-chrome" aria-hidden="true">
                <span />
                <span />
                <span />
                <em>remix_button_style.dart</em>
              </div>
              <div className="rmx-code-body">
                <HighlightedCode code={STYLE_SNIPPET} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── See it live ───────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div {...reveal}>
            <SectionHeader
              label="See it live"
              title="Not a screenshot. A running component."
            >
              <p className="rmx-lead">
                Every example in the docs is a real Flutter app compiled to
                WebAssembly — interactive, right in the page. Hover it, focus it,
                press it, and read the exact code that produced it.
              </p>
            </SectionHeader>
          </motion.div>
          <motion.div {...reveal}>
            <LivePreview previewId="components/tabs.0" height={340} caption="Live · Tabs" />
          </motion.div>
        </section>

        {/* ── Built on Mix ──────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div className="rmx-band" {...reveal}>
            <span className="rmx-mono-label">Built on Mix</span>
            <h2 className="rmx-band-title">The styling engine comes included.</h2>
            <p className="rmx-lead rmx-lead-center">
              Remix pairs headless components (inspired by Naked UI) with Mix&apos;s
              composable styling system. You get the behavior for free and keep full
              control over the look — no Material to override, no framework to fight.
            </p>
            <RemixButton href={LINKS.mixDocs} variant="ghost" arrow="right">
              Read the Mix docs
            </RemixButton>
          </motion.div>
        </section>

        {/* ── Three reasons ─────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div className="rmx-reasons" {...reveal}>
            {[
              {
                t: "Design for speed",
                d: "Behavior, accessibility, and animation ship inside every component. Compose, don't reimplement.",
              },
              {
                t: "Built by people who use it",
                d: "Remix is open source and shaped in the open, alongside the Mix community.",
              },
              {
                t: "Ready for what's next",
                d: "Beta and moving fast. References, guides, and richer tooling are landing continuously.",
              },
            ].map((r) => (
              <div key={r.t} className="rmx-reason">
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div {...reveal}>
            <SectionHeader label="FAQ" title="Questions, answered." />
          </motion.div>
          <motion.div className="rmx-faq" {...reveal}>
            {FAQ.map((item) => (
              <details key={item.q} className="rmx-faq-item">
                <summary>
                  {item.q}
                  <span className="rmx-faq-icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </motion.div>
        </section>

        {/* ── Footer CTA ────────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap rmx-footer">
          <motion.div {...reveal}>
            <h2 className="rmx-footer-title">Discover the full design system.</h2>
            <p className="rmx-lead rmx-lead-center">
              Open source, free, and built on Mix. Explore the components, join the
              community, and build Flutter UI that&apos;s finally, entirely yours.
            </p>
            <div className="rmx-cta-row rmx-cta-center">
              <RemixButton href={LINKS.getStarted} arrow="right">
                Get started
              </RemixButton>
              <RemixButton href={LINKS.github} variant="secondary" target="_blank">
                Star on GitHub
              </RemixButton>
              <RemixButton href={LINKS.discord} variant="secondary" target="_blank">
                Join the Discord
              </RemixButton>
            </div>
            <p className="rmx-fineprint">No lock-in · Open source · Built on Mix</p>
          </motion.div>
        </section>
      </div>

      <style jsx global>{`
        .rmx-root {
          position: relative;
          z-index: 10;
          padding-bottom: 100px;
        }
        .rmx-shell {
          width: 100%;
          max-width: 68rem;
          margin: 0 auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
        }
        .rmx-gap {
          margin-top: 128px;
        }

        /* Hero */
        .rmx-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          padding-top: 72px;
        }
        @media (min-width: 900px) {
          .rmx-hero {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 56px;
            padding-top: 96px;
          }
        }
        .rmx-logo {
          height: 44px;
          width: auto;
          filter: drop-shadow(0 0 24px var(--mix-accent-glow));
        }
        .rmx-hero-copy {
          text-align: left;
        }
        .rmx-hero-copy .rmx-headline {
          font-size: min(4.25rem, max(7vw, 2.75rem));
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
          text-align: left;
          text-wrap: balance;
          margin-top: 1.75rem;
          background-image: linear-gradient(to bottom right, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rmx-subtitle {
          font-size: 1.125rem;
          line-height: 1.65;
          color: var(--mix-text-muted);
          margin-top: 1.5rem;
          max-width: 34rem;
        }
        .rmx-support {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 1.75rem;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--mix-text-muted);
        }
        .rmx-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--mix-accent);
          box-shadow: 0 0 10px var(--mix-accent);
        }
        .rmx-cta-row {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .rmx-cta-center {
          justify-content: center;
        }

        /* Preview frames */
        .rmx-preview,
        .rmx-code {
          border: 1px solid var(--mix-border-card);
          border-radius: 16px;
          background: var(--mix-surface);
          overflow: hidden;
          box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.7);
        }
        .rmx-hero-visual .rmx-preview {
          box-shadow: 0 30px 80px -30px var(--mix-accent-glow),
            0 24px 60px -30px rgba(0, 0, 0, 0.8);
        }
        .rmx-preview-chrome {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--mix-border-card);
          background: var(--mix-surface-bright);
        }
        .rmx-preview-chrome span {
          width: 11px;
          height: 11px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
        }
        .rmx-preview-chrome em {
          margin-left: 8px;
          font-style: normal;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--mix-text-muted);
        }

        /* Section headers */
        .rmx-section-header {
          max-width: 44rem;
          margin-bottom: 40px;
        }
        .rmx-mono-label {
          display: inline-block;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--mix-accent);
        }
        .rmx-section-title {
          font-size: clamp(1.6rem, 4vw, 2.35rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.15;
          text-wrap: balance;
          margin-top: 14px;
        }
        .rmx-lead {
          margin-top: 18px;
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--mix-text-muted);
          max-width: 40rem;
        }
        .rmx-lead-center {
          margin-left: auto;
          margin-right: auto;
        }

        /* Positioning contrast block */
        .rmx-contrast {
          margin-top: 8px;
          padding: 28px 32px;
          border-radius: 16px;
          border: 1px solid var(--mix-border-card);
          background: linear-gradient(
            180deg,
            var(--mix-accent-low),
            transparent 120%
          );
        }
        .rmx-contrast p {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--mix-text-muted);
        }
        .rmx-contrast strong {
          color: #fff;
          font-weight: 600;
        }
        .rmx-contrast a {
          margin-top: 18px;
        }

        /* Live grid */
        .rmx-live-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          margin-top: 8px;
        }
        @media (min-width: 760px) {
          .rmx-live-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Component pills */
        .rmx-pill-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 32px;
        }
        .rmx-pill {
          font-size: 13px;
          font-weight: 500;
          color: #e6e6ea;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid var(--mix-border-card);
          background: var(--mix-surface);
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .rmx-pill:hover {
          border-color: var(--mix-accent);
          color: #fff;
        }
        .rmx-pill-muted {
          color: var(--mix-text-muted);
        }
        .rmx-center {
          margin-top: 32px;
        }

        /* Styling split */
        .rmx-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .rmx-split {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 56px;
          }
        }
        .rmx-code-body {
          padding: 20px 22px;
          overflow-x: auto;
        }

        /* Built-on-Mix band */
        .rmx-band {
          text-align: center;
          padding: 56px 32px;
          border-radius: 20px;
          border: 1px solid var(--mix-border-card);
          background: radial-gradient(
              circle at 50% 0%,
              var(--mix-accent-low),
              transparent 60%
            ),
            var(--mix-surface);
        }
        .rmx-band-title {
          font-size: clamp(1.6rem, 4vw, 2.35rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
          margin-top: 14px;
        }
        .rmx-band .rmx-lead {
          margin-bottom: 24px;
        }

        /* Three reasons */
        .rmx-reasons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 760px) {
          .rmx-reasons {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .rmx-reason {
          padding: 28px;
          border-radius: 16px;
          border: 1px solid var(--mix-border-card);
          background: var(--mix-surface);
        }
        .rmx-reason h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
        }
        .rmx-reason p {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--mix-text-muted);
        }

        /* FAQ */
        .rmx-faq {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .rmx-faq-item {
          border: 1px solid var(--mix-border-card);
          border-radius: 12px;
          background: var(--mix-surface);
          overflow: hidden;
        }
        .rmx-faq-item summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 22px;
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
        }
        .rmx-faq-item summary::-webkit-details-marker {
          display: none;
        }
        .rmx-faq-item summary:focus-visible {
          outline: 2px solid var(--mix-accent);
          outline-offset: -2px;
          border-radius: 12px;
        }
        .rmx-faq-icon {
          position: relative;
          flex: 0 0 auto;
          width: 14px;
          height: 14px;
        }
        .rmx-faq-icon::before,
        .rmx-faq-icon::after {
          content: "";
          position: absolute;
          background: var(--mix-accent);
          border-radius: 2px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .rmx-faq-icon::before {
          top: 6px;
          left: 0;
          width: 14px;
          height: 2px;
        }
        .rmx-faq-icon::after {
          top: 0;
          left: 6px;
          width: 2px;
          height: 14px;
        }
        .rmx-faq-item[open] .rmx-faq-icon::after {
          transform: scaleY(0);
          opacity: 0;
        }
        .rmx-faq-item p {
          padding: 0 22px 20px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--mix-text-muted);
        }

        /* Footer CTA */
        .rmx-footer {
          text-align: center;
          border-top: 1px solid var(--mix-border-card);
          padding-top: 72px;
        }
        .rmx-footer-title {
          font-size: clamp(1.75rem, 5vw, 2.75rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          background-image: linear-gradient(to bottom right, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rmx-fineprint {
          margin-top: 22px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--mix-text-muted);
        }
      `}</style>
    </MotionConfig>
  );
};

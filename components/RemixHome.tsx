"use client";

import { useState } from "react";
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

/* ── Animation presets ──────────────────────────────────────────────── */
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
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: EASE },
};

/* ── Centered section header ────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  lead,
}: {
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <motion.div className="rmx-section-header" {...reveal}>
      <span className="rmx-mono-label">{label}</span>
      <h2 className="rmx-section-title">{title}</h2>
      {lead && <p className="rmx-lead">{lead}</p>}
    </motion.div>
  );
}

/* ── Live preview card ──────────────────────────────────────────────── */
function LivePreview({
  previewId,
  height = 260,
  eager = false,
  caption,
}: {
  previewId: string;
  height?: number;
  eager?: boolean;
  caption?: string;
}) {
  return (
    <div className="rmx-card rmx-preview">
      <div className="rmx-preview-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <FlutterMultiView
        previewId={previewId}
        height={height}
        bordered={false}
        lazyLoad={!eager}
        transparent
      />
      {caption && <p className="rmx-preview-caption">{caption}</p>}
    </div>
  );
}

const GALLERY = [
  { id: "components/button.0", label: "Button" },
  { id: "components/card.0", label: "Card" },
  { id: "components/switch.0", label: "Switch" },
  { id: "components/slider.0", label: "Slider" },
  { id: "components/select.0", label: "Select" },
  { id: "components/tabs.0", label: "Tabs" },
];

const COMPONENTS = [
  "Accordion", "Avatar", "Badge", "Callout", "Checkbox", "Divider",
  "IconButton", "Menu", "Progress", "Radio", "Spinner", "TextField", "Tooltip",
];

/* ── Theme-variation showcase (pure-CSS mockups) ────────────────────── */
const THEMES = [
  {
    key: "default",
    name: "Default",
    blurb: "Clean, balanced, ready to ship.",
    code: `final style = RemixButtonStyle()
  .color(accent)
  .paddingX(22)
  .paddingY(11)
  .borderRadiusAll(const Radius.circular(10))
  .onHovered(
    RemixButtonStyle().color(accent.shade400),
  );`,
  },
  {
    key: "glass",
    name: "Glass",
    blurb: "Translucent surfaces and blur.",
    code: `final style = RemixButtonStyle()
  .color(Colors.white.withOpacity(.12))
  .paddingX(22)
  .paddingY(11)
  .borderRadiusAll(const Radius.circular(12))
  .borderAll(color: Colors.white38)
  .backdropBlur(8);`,
  },
  {
    key: "brutalist",
    name: "Brutalist",
    blurb: "Hard edges, high contrast.",
    code: `final style = RemixButtonStyle()
  .color(accent)
  .paddingX(22)
  .paddingY(11)
  .borderRadiusAll(Radius.zero)
  .borderAll(color: Colors.white, width: 2)
  .shadowOnly(color: Colors.white, offset: const Offset(5, 5));`,
  },
  {
    key: "neon",
    name: "Neon",
    blurb: "Glow accents on deep black.",
    code: `final style = RemixButtonStyle()
  .color(Colors.transparent)
  .paddingX(22)
  .paddingY(11)
  .borderRadiusAll(const Radius.circular(10))
  .borderAll(color: accent)
  .shadowOnly(color: accent, blurRadius: 18);`,
  },
];

const FAQ = [
  {
    q: "Is it production-ready?",
    a: "The component set is real, running, and usable in production apps today — every component on this page is live proof. Remix is in Beta because the API is still evolving and new components, references, and guides land continuously, not because the components are unstable. You can ship with it now.",
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
    q: "Is Remix free?",
    a: "Yes. Remix is open source and free — no tiers, no license fees, no lock-in.",
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
  const [activeTheme, setActiveTheme] = useState(0);
  const theme = THEMES[activeTheme];

  return (
    <MotionConfig reducedMotion="user">
      <div className="rmx-root">
        {/* ── Hero (centered) ───────────────────────────────────── */}
        <section className="rmx-shell rmx-hero">
          <motion.img
            className="rmx-logo"
            src="/assets/logo_remix_sidebar.png"
            alt="Remix"
            initial={{ opacity: 0, filter: "blur(10px)", y: 14, scale: 0.94 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          />

          <motion.h1
            className="rmx-headline"
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
          >
            Stop fighting Material to
            <br className="hidden sm:inline" /> style your Flutter app.
          </motion.h1>

          <motion.p
            className="rmx-subtitle"
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeUp}
          >
            Remix handles the boring parts — focus, keyboard, accessibility — and
            leaves the look entirely up to you. Style it however you want with Mix.
            No fighting the framework.
          </motion.p>

          <motion.div
            className="rmx-cta-row"
            initial="hidden"
            animate="visible"
            custom={0.24}
            variants={fadeUp}
          >
            <RemixButton href={LINKS.getStarted} arrow="right">
              Start in 2 minutes
            </RemixButton>
            <RemixButton href={LINKS.components} variant="secondary">
              Browse components
            </RemixButton>
          </motion.div>

          <motion.p
            className="rmx-cta-trigger"
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
          >
            Free · open source · works with any Flutter app
          </motion.p>

          {/* Hero showcase — one component, styled four ways with Mix */}
          <motion.div
            className="rmx-hero-visual"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <div className="rmx-hero-glow" aria-hidden="true" />

            <div className="rmx-card rmx-hero-showcase">
              <div className="rmx-hero-code">
                <div className="rmx-preview-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <em>remix_button_style.dart</em>
                </div>
                <motion.div
                  key={theme.key}
                  className="rmx-code-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <HighlightedCode code={theme.code} />
                </motion.div>
              </div>

              <div className={`rmx-hero-stage rmx-theme-${theme.key}`}>
                <motion.button
                  key={theme.key}
                  type="button"
                  tabIndex={-1}
                  className="rmx-mock-btn"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  Get started
                </motion.button>
              </div>
            </div>

            <div className="rmx-theme-tabs" role="tablist" aria-label="Theme">
              {THEMES.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={i === activeTheme}
                  className={
                    "rmx-theme-tab" + (i === activeTheme ? " is-active" : "")
                  }
                  onClick={() => setActiveTheme(i)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Positioning ───────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <SectionHeader
            label="Why Remix"
            title="Start anywhere. Style anything. Ship faster."
            lead="Remix hands you accessible, headless components and gets out of the way. Interaction logic is handled — hover, focus, press, keyboard navigation — so you spend your time on the design, not the plumbing."
          />
          <motion.div className="rmx-contrast" {...reveal}>
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
          </motion.div>
        </section>

        {/* ── Component gallery ─────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <SectionHeader
            label="Components"
            title="20+ components. Polished by default."
            lead="Accessible, themeable Flutter components with hover, focus, press, keyboard navigation, and animation built in — not bolted on. Every one is a real, running app, right here on the page."
          />
          <motion.div className="rmx-gallery" {...reveal}>
            {GALLERY.map((c) => (
              <LivePreview
                key={c.id}
                previewId={c.id}
                height={240}
                caption={c.label}
              />
            ))}
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
              Browse all components
            </RemixButton>
          </motion.div>
        </section>

        {/* ── Styling (code) ────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <div className="rmx-split">
            <div>
              <SectionHeader
                label="Styling"
                title="Fully customizable styles, ready for use."
                lead="Make it yours without starting from scratch. Define a look once with Mix's fluent API, then reuse and adapt it across your whole app — no deep widget trees, no copy-pasted variants that drift out of sync."
              />
              <motion.div className="rmx-center-left" {...reveal}>
                <RemixButton href={LINKS.styling} variant="ghost" arrow="right">
                  Explore styling
                </RemixButton>
              </motion.div>
            </div>

            <motion.div
              className="rmx-card rmx-code"
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

        {/* ── Built on Mix ──────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <motion.div className="rmx-band" {...reveal}>
            <span className="rmx-mono-label">Built on Mix</span>
            <h2 className="rmx-band-title">The styling engine comes included.</h2>
            <p className="rmx-lead">
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
              <div key={r.t} className="rmx-card rmx-reason">
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="rmx-shell rmx-gap">
          <SectionHeader label="FAQ" title="Questions, answered." />
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
            <p className="rmx-lead">
              Open source, free, and built on Mix. Explore the components, join the
              community, and build Flutter UI that&apos;s finally, entirely yours.
            </p>
            <div className="rmx-cta-row rmx-cta-center">
              <RemixButton href={LINKS.getStarted} arrow="right">
                Start in 2 minutes
              </RemixButton>
            </div>
            <div className="rmx-cta-row rmx-cta-center rmx-cta-secondary">
              <RemixButton href={LINKS.github} variant="ghost" target="_blank">
                Star on GitHub
              </RemixButton>
              <RemixButton href={LINKS.discord} variant="ghost" target="_blank">
                Join the Discord
              </RemixButton>
            </div>
            <p className="rmx-fineprint">Open source · Built on Mix</p>
          </motion.div>
        </section>
      </div>

      <style jsx global>{`
        .rmx-root {
          position: relative;
          z-index: 10;
          padding-bottom: 120px;
        }
        .rmx-shell {
          width: 100%;
          max-width: 72rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .rmx-gap {
          margin-top: 140px;
        }

        /* Shared card surface (heroui-style: soft radius, hairline border) */
        .rmx-card {
          border: 1px solid var(--mix-border-card);
          border-radius: 18px;
          background: var(--mix-surface);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.03) inset,
            0 20px 50px -30px rgba(0, 0, 0, 0.75);
        }

        /* ── Hero ─────────────────────────────────────────────── */
        .rmx-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 88px;
        }
        .rmx-logo {
          height: 44px;
          width: auto;
          margin-bottom: 26px;
        }
        .rmx-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 15px;
          border-radius: 999px;
          border: 1px solid var(--mix-border-card);
          background: var(--mix-surface);
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: var(--mix-text-muted);
        }
        .rmx-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--mix-accent);
          box-shadow: 0 0 10px var(--mix-accent);
        }
        .rmx-headline {
          font-size: min(5rem, max(8vw, 2.85rem));
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1.03;
          text-wrap: balance;
          margin-top: 1.75rem;
          background-image: linear-gradient(to bottom, #fff 40%, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rmx-subtitle {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--mix-text-muted);
          margin-top: 1.5rem;
          max-width: 36rem;
          text-wrap: pretty;
        }
        .rmx-cta-row {
          margin-top: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }
        .rmx-cta-trigger {
          margin-top: 16px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--mix-text-muted);
        }
        .rmx-cta-secondary {
          margin-top: 12px;
        }
        .rmx-hero-visual {
          position: relative;
          width: 100%;
          max-width: 46rem;
          margin-top: 72px;
        }
        .rmx-hero-glow {
          position: absolute;
          inset: -12% -8% 0;
          background: radial-gradient(
            circle at 50% 0%,
            var(--mix-accent-glow),
            transparent 62%
          );
          filter: blur(20px);
          z-index: -1;
        }

        /* ── Hero themed showcase ─────────────────────────────── */
        .rmx-theme-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .rmx-theme-tab {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--mix-text-muted);
          padding: 7px 15px;
          border-radius: 999px;
          border: 1px solid var(--mix-border-card);
          background: var(--mix-surface);
          cursor: pointer;
          transition: color 0.15s ease, border-color 0.15s ease,
            background-color 0.15s ease;
        }
        .rmx-theme-tab:hover {
          color: #fff;
          border-color: var(--mix-accent);
        }
        .rmx-theme-tab.is-active {
          color: #05040a;
          background: var(--mix-accent);
          border-color: var(--mix-accent);
        }
        .rmx-theme-tab:focus-visible {
          outline: 2px solid var(--mix-accent);
          outline-offset: 2px;
        }
        .rmx-hero-showcase {
          display: grid;
          grid-template-columns: 1fr;
          overflow: hidden;
          text-align: left;
        }
        @media (min-width: 720px) {
          .rmx-hero-showcase {
            grid-template-columns: 1.05fr 0.95fr;
          }
        }
        .rmx-hero-code {
          overflow: hidden;
          border-bottom: 1px solid var(--mix-border-card);
        }
        @media (min-width: 720px) {
          .rmx-hero-code {
            border-bottom: none;
            border-right: 1px solid var(--mix-border-card);
          }
        }
        .rmx-hero-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 190px;
          padding: 32px;
        }

        /* ── Preview cards ────────────────────────────────────── */
        .rmx-preview {
          overflow: hidden;
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
        .rmx-preview-caption {
          padding: 12px 18px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--mix-text-muted);
          border-top: 1px solid var(--mix-border-card);
        }

        /* ── Section headers (centered) ───────────────────────── */
        .rmx-section-header {
          max-width: 44rem;
          margin: 0 auto 52px;
          text-align: center;
        }
        .rmx-mono-label {
          display: inline-block;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--mix-accent);
        }
        .rmx-section-title {
          font-size: clamp(1.75rem, 4.2vw, 2.6rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.12;
          text-wrap: balance;
          margin-top: 14px;
        }
        .rmx-lead {
          margin-top: 18px;
          font-size: 1.075rem;
          line-height: 1.7;
          color: var(--mix-text-muted);
          text-wrap: pretty;
        }
        .rmx-section-header .rmx-lead {
          max-width: 40rem;
          margin-left: auto;
          margin-right: auto;
        }

        /* ── Positioning contrast ─────────────────────────────── */
        .rmx-contrast {
          max-width: 52rem;
          margin: 0 auto;
          text-align: center;
          padding: 40px 40px 44px;
          border-radius: 20px;
          border: 1px solid var(--mix-border-card);
          background: radial-gradient(
              circle at 50% 0%,
              var(--mix-accent-low),
              transparent 70%
            ),
            var(--mix-surface);
        }
        .rmx-contrast p {
          font-size: 1.2rem;
          line-height: 1.65;
          color: var(--mix-text-muted);
          text-wrap: pretty;
        }
        .rmx-contrast strong {
          color: #fff;
          font-weight: 600;
        }
        .rmx-contrast a {
          margin-top: 24px;
        }

        /* ── Component gallery ────────────────────────────────── */
        .rmx-gallery {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 680px) {
          .rmx-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1000px) {
          .rmx-gallery {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .rmx-pill-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }
        .rmx-pill {
          font-size: 13px;
          font-weight: 500;
          color: #e6e6ea;
          padding: 8px 15px;
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
          margin-top: 40px;
          text-align: center;
        }
        .rmx-center-left {
          margin-top: 8px;
        }

        /* ── Theme showcase ───────────────────────────────────── */
        .rmx-theme-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 620px) {
          .rmx-theme-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1000px) {
          .rmx-theme-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .rmx-theme-tile {
          overflow: hidden;
        }
        .rmx-theme-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 150px;
          border-bottom: 1px solid var(--mix-border-card);
        }
        .rmx-theme-meta {
          padding: 18px 20px 20px;
        }
        .rmx-theme-meta h3 {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
        }
        .rmx-theme-meta p {
          margin-top: 5px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--mix-text-muted);
        }
        .rmx-mock-btn {
          font-size: 14px;
          font-weight: 600;
          cursor: default;
        }
        /* Default */
        .rmx-theme-default {
          background: radial-gradient(
            circle at 50% 30%,
            rgba(255, 255, 255, 0.03),
            transparent 70%
          );
        }
        .rmx-theme-default .rmx-mock-btn {
          background: var(--mix-accent);
          color: #05040a;
          padding: 11px 22px;
          border-radius: 10px;
          box-shadow: 0 6px 20px -6px var(--mix-accent-glow);
        }
        /* Glass */
        .rmx-theme-glass {
          background: linear-gradient(
            135deg,
            rgba(0, 235, 3, 0.14),
            rgba(139, 92, 246, 0.14)
          );
        }
        .rmx-theme-glass .rmx-mock-btn {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          padding: 11px 22px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(8px);
        }
        /* Brutalist */
        .rmx-theme-brutalist {
          background: #0a0a0a;
        }
        .rmx-theme-brutalist .rmx-mock-btn {
          background: var(--mix-accent);
          color: #000;
          padding: 11px 22px;
          border-radius: 0;
          border: 2px solid #fff;
          box-shadow: 5px 5px 0 #fff;
        }
        /* Neon */
        .rmx-theme-neon {
          background: #04040a;
        }
        .rmx-theme-neon .rmx-mock-btn {
          background: transparent;
          color: var(--mix-accent);
          padding: 11px 22px;
          border-radius: 10px;
          border: 1px solid var(--mix-accent);
          box-shadow: 0 0 18px var(--mix-accent-glow),
            inset 0 0 12px var(--mix-accent-low);
          text-shadow: 0 0 8px var(--mix-accent-glow);
        }

        /* ── Styling split ────────────────────────────────────── */
        .rmx-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 940px) {
          .rmx-split {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 56px;
          }
          .rmx-split .rmx-section-header {
            text-align: left;
            margin: 0 0 32px;
          }
          .rmx-split .rmx-section-header .rmx-lead {
            margin-left: 0;
            margin-right: 0;
          }
        }
        .rmx-code {
          overflow: hidden;
        }
        .rmx-code-body {
          padding: 20px 22px;
          overflow-x: auto;
        }

        /* ── Built-on-Mix band ────────────────────────────────── */
        .rmx-band {
          max-width: 60rem;
          margin: 0 auto;
          text-align: center;
          padding: 64px 32px;
          border-radius: 24px;
          border: 1px solid var(--mix-border-card);
          background: radial-gradient(
              circle at 50% 0%,
              var(--mix-accent-low),
              transparent 60%
            ),
            var(--mix-surface);
        }
        .rmx-band-title {
          font-size: clamp(1.75rem, 4.2vw, 2.6rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
          text-wrap: balance;
          margin-top: 14px;
        }
        .rmx-band .rmx-lead {
          max-width: 42rem;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 26px;
        }

        /* ── Three reasons ────────────────────────────────────── */
        .rmx-reasons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 760px) {
          .rmx-reasons {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .rmx-reason {
          padding: 30px;
        }
        .rmx-reason h3 {
          font-size: 1.15rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
        }
        .rmx-reason p {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--mix-text-muted);
        }

        /* ── FAQ ──────────────────────────────────────────────── */
        .rmx-faq {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 46rem;
          margin: 0 auto;
        }
        .rmx-faq-item {
          border: 1px solid var(--mix-border-card);
          border-radius: 14px;
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
          padding: 19px 24px;
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
          border-radius: 14px;
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
          padding: 0 24px 20px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--mix-text-muted);
        }

        /* ── Footer CTA ───────────────────────────────────────── */
        .rmx-footer {
          text-align: center;
          border-top: 1px solid var(--mix-border-card);
          padding-top: 80px;
        }
        .rmx-footer-title {
          font-size: clamp(1.85rem, 5vw, 3rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          text-wrap: balance;
          background-image: linear-gradient(to bottom, #fff 40%, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rmx-footer .rmx-lead {
          max-width: 40rem;
          margin-left: auto;
          margin-right: auto;
        }
        .rmx-fineprint {
          margin-top: 24px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--mix-text-muted);
        }
      `}</style>
    </MotionConfig>
  );
};

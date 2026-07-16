"use client";

import { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import {
  Blocks,
  Wand2,
  Accessibility,
  Zap,
  Repeat2,
  Github,
  Sparkles,
} from "lucide-react";
import { HighlightedCode } from "./HighlightedCode";
import { FlutterMultiView } from "./FlutterMultiView";
import { RemixButton } from "./remix/RemixButton";

/* ── Links (IA preserved from the existing page) ────────────────────── */
const LINKS = {
  getStarted: "/documentation/remix",
  components: "/documentation/remix/components/button",
  styling: "/documentation/mix/guides/styling",
  mixDocs: "/documentation/mix/overview/introduction",
  github: "https://github.com/btwld/remix",
  discord: "https://discord.com/invite/Ycn6GV3m2k",
  pubDev: "https://pub.dev/packages/remix",
};

/* ── Motion presets ─────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: EASE },
};

/* Stagger: parent orchestrates, children cascade in ~60ms apart */
const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ── One RemixButton, three real Mix styles (hero showcase) ─────────────
   Each `code` snippet is the exact style built by its Flutter preview in
   packages/mix_docs_preview/lib/homepage/hero_*.dart (rendered live via
   FlutterMultiView). Keep the two in sync. */
const THEMES = [
  {
    key: "default",
    name: "Classic",
    previewId: "homepage/hero-classic",
    code: `final style = RemixButtonStyler()
    .color(const Color(0xFF00EB03))
    .labelColor(const Color(0xFF05040A))
    .paddingX(22)
    .paddingY(11)
    .borderRadius(.circular(10))
    .onHovered(.color(const Color(0xFF33FF36)));`,
  },
  {
    key: "gradient",
    name: "Gradient",
    previewId: "homepage/hero-gradient",
    code: `final style = RemixButtonStyler()
    .linearGradient(
      begin: .topLeft,
      end: .bottomRight,
      colors: const [Color(0xFF00EB03), Color(0xFF8B5CF6)],
    )
    .labelColor(const Color(0xFF05040A))
    .paddingX(22)
    .paddingY(11)
    .borderRadius(.circular(12));`,
  },
  {
    key: "neon",
    name: "Neon",
    previewId: "homepage/hero-neon",
    code: `final style = RemixButtonStyler()
    .color(const Color(0xFF0A0014))
    .labelColor(const Color(0xFF00F0FF))
    .paddingX(24)
    .paddingY(11)
    .borderRadius(.circular(2))
    .border(.all(.color(const Color(0xFF00F0FF)).width(1)))
    .shadowOnly(color: const Color(0xFFFF00E5), blurRadius: 22);`,
  },
];

/* ── Stats band ─────────────────────────────────────────────────────── */
const STATS = [
  { value: "20+", label: "Live components" },
  { value: "100%", label: "Headless & yours" },
  { value: "0", label: "Style opinions" },
  { value: "BSD-3", label: "Free forever" },
];

/* ── Feature grid (value props) ─────────────────────────────────────── */
const FEATURES = [
  {
    icon: Blocks,
    title: "Headless by design",
    body: "Behavior, focus, and state are handled. Remix has zero opinion on how it looks — that part is entirely yours.",
    wide: true,
  },
  {
    icon: Wand2,
    title: "Styled with Mix",
    body: "Compose pixel-perfect styles with a fluent, type-safe API — variants, states, and tokens all in one place.",
    wide: true,
  },
  {
    icon: Accessibility,
    title: "Accessible out of the box",
    body: "Keyboard navigation and screen-reader support baked into every widget.",
  },
  {
    icon: Repeat2,
    title: "Define once, reuse everywhere",
    body: "Share one style across your whole app. No drifting variants.",
  },
  {
    icon: Zap,
    title: "Real, running Flutter",
    body: "Everything on this page is a live app — never a screenshot.",
  },
];

/* ── Live component bento (real running Flutter apps) ───────────────── */
const BENTO = [
  { id: "components/button.0", label: "Button", wide: true, height: 300 },
  { id: "components/textfield.0", label: "TextField", wide: false, height: 300 },
  { id: "components/switch.0", label: "Switch", wide: false, height: 232 },
  { id: "components/slider.0", label: "Slider", wide: false, height: 232 },
  { id: "components/avatar.0", label: "Avatar", wide: false, height: 232 },
];

const COMPONENTS = [
  "Accordion", "Avatar", "Badge", "Button", "Callout", "Card", "Checkbox",
  "Dialog", "Divider", "IconButton", "Menu", "Popover", "Progress", "Radio",
  "Select", "Slider", "Spinner", "Switch", "Tabs", "TextField", "Toggle",
  "Toggle Group", "Tooltip",
];

const FAQ = [
  {
    q: "Is it production-ready?",
    a: "The component set is real, running, and usable in production apps today. Every component on this page is live proof. Remix is in Beta because the API is still evolving and new components and guides land continuously, not because the components are unstable.",
  },
  {
    q: "How is it different from Material or Cupertino?",
    a: "Material and Cupertino ship with a design language built in. Remix ships behavior with no opinionated look, so you style every pixel with Mix. Full control from the first line.",
  },
  {
    q: "Do I need to know Mix first?",
    a: "It helps, but no. Remix ships with sensible styles you can use immediately, then customize with Mix's fluent API as you grow.",
  },
  {
    q: "Is it accessible and keyboard-navigable?",
    a: "Yes. It is built into every component. You don't wire it up yourself.",
  },
  {
    q: "Is Remix free?",
    a: "Yes. Remix is open source and free. No tiers, no license fees, and it is BSD 3-Clause licensed.",
  },
  {
    q: "Can I use it in a commercial app?",
    a: "Yes. It is open source under BSD 3-Clause, so build whatever you want.",
  },
];

/* ── Section head ───────────────────────────────────────────────────── */
function SectionHead({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      className={"rx-head" + (align === "left" ? " rx-head-left" : "")}
      {...reveal}
    >
      {eyebrow && <span className="rx-eyebrow">{eyebrow}</span>}
      <h2 className="rx-title">{title}</h2>
      {lead && <p className="rx-lead">{lead}</p>}
    </motion.div>
  );
}

export const RemixHome = () => {
  const [activeTheme, setActiveTheme] = useState(0);
  const theme = THEMES[activeTheme];

  return (
    <MotionConfig reducedMotion="user">
      <div className="rx-root">
        {/* ══ Ambient backdrop (aurora + grid, fixed behind content) ══ */}
        <div className="rx-aurora" aria-hidden="true">
          <div className="rx-aurora-a" />
          <div className="rx-aurora-b" />
          <div className="rx-grid" />
        </div>

        {/* ══ Hero — centered, grand ═══════════════════════════════ */}
        <section className="rx-shell rx-hero">
          <motion.img
            className="rx-logo"
            src="/assets/logo_remix_sidebar.png"
            alt="Remix"
            initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          />

          <motion.h1
            className="rx-hero-title"
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
          >
            The behavior is built in.
            <br />
            <span className="rx-gradient-text">Style Flutter your way.</span>
          </motion.h1>

          <motion.p
            className="rx-hero-sub"
            initial="hidden"
            animate="visible"
            custom={0.18}
            variants={fadeUp}
          >
            Headless, accessible Flutter components with the behavior already
            handled. Style every pixel with Mix — the look is entirely yours.
          </motion.p>

          <motion.div
            className="rx-hero-cta"
            initial="hidden"
            animate="visible"
            custom={0.28}
            variants={fadeUp}
          >
            <RemixButton href={LINKS.getStarted} arrow="right">
              Start in 2 minutes
            </RemixButton>
            <RemixButton href={LINKS.pubDev} variant="secondary" target="_blank">
              <img
                src="https://cdn.simpleicons.org/dart/ffffff"
                alt=""
                aria-hidden="true"
                style={{ height: 16, width: 16 }}
              />
              Add dependency
            </RemixButton>
          </motion.div>

          {/* Interactive product window: one component, four Mix styles */}
          <motion.div
            className="rx-window-wrap"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
          >
            <div className="rx-window-glow" aria-hidden="true" />

            <div className="rx-window">
              <div className="rx-window-bar">
                <div className="rx-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="rx-segmented" role="tablist" aria-label="Style">
                  {THEMES.map((t, i) => (
                    <button
                      key={t.key}
                      type="button"
                      role="tab"
                      aria-selected={i === activeTheme}
                      className={"rx-seg" + (i === activeTheme ? " is-active" : "")}
                      onClick={() => setActiveTheme(i)}
                    >
                      {i === activeTheme && (
                        <motion.span
                          layoutId="rx-seg-pill"
                          className="rx-seg-pill"
                          aria-hidden="true"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="rx-seg-label">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rx-window-body">
                <div className="rx-window-code">
                  <div className="rx-code-stack">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={theme.key + "-code"}
                        className="rx-code-layer"
                        initial={{ opacity: 0, filter: "blur(3px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(3px)" }}
                        transition={{ duration: 0.28, ease: EASE }}
                      >
                        <HighlightedCode code={theme.code} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className={`rx-stage rx-theme-${theme.key}`}>
                  <div className="rx-stage-label" aria-hidden="true">
                    Live render · Flutter
                  </div>
                  {/* Real compiled Flutter previews (one RemixButton per
                      style) sharing a single engine. All mount once and
                      cross-fade on switch for instant, flicker-free toggling. */}
                  <div className="rx-flutter-stack">
                    {THEMES.map((t, i) => (
                      <div
                        key={t.key}
                        className="rx-flutter-layer"
                        aria-hidden={i !== activeTheme}
                        style={{
                          opacity: i === activeTheme ? 1 : 0,
                          pointerEvents: i === activeTheme ? "auto" : "none",
                        }}
                      >
                        <FlutterMultiView
                          previewId={t.previewId}
                          height={140}
                          bordered={false}
                          transparent
                          lazyLoad={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ Stats band ═══════════════════════════════════════════ */}
        <section className="rx-shell rx-gap-sm">
          <motion.div
            className="rx-stats"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {STATS.map((s) => (
              <motion.div key={s.label} className="rx-stat" variants={staggerChild}>
                <span className="rx-stat-value">{s.value}</span>
                <span className="rx-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══ Editorial statement ══════════════════════════════════ */}
        <section className="rx-shell rx-gap">
          <motion.p className="rx-statement" {...reveal}>
            Material and Cupertino come with a look of their own.{" "}
            <span className="rx-gradient-text">
              Remix hands you behavior and gets out of the way
            </span>
            , so styling becomes the part you actually enjoy.
          </motion.p>
        </section>

        {/* ══ Feature grid ═════════════════════════════════════════ */}
        <section className="rx-shell rx-gap">
          <SectionHead
            eyebrow="Why Remix"
            title="Everything you need. Nothing in your way."
            lead="A foundation that handles the hard parts — behavior, focus, accessibility — and then disappears so your design can take over."
          />

          <motion.div
            className="rx-features"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={staggerChild}
                  className={"rx-feature" + (f.wide ? " rx-feature-wide" : "")}
                >
                  <span className="rx-feature-icon">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <h3 className="rx-feature-title">{f.title}</h3>
                  <p className="rx-feature-body">{f.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ══ Live components bento ════════════════════════════════ */}
        <section className="rx-shell rx-gap">
          <SectionHead
            eyebrow="Components"
            title="Every component, running live on this page."
            lead="Real, running Flutter apps. Hover them, focus them, click them. Nothing here is a screenshot."
          />

          <motion.div
            className="rx-bento"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {BENTO.map((c) => (
              <motion.div
                key={c.id}
                variants={staggerChild}
                className={"rx-tile" + (c.wide ? " rx-tile-wide" : "")}
              >
                {/* Flutter multi-views all share one fixed-size rasterizer
                    surface (~360x220 CSS). A host larger than that clips, so
                    each live view is capped to a centered box that fits and the
                    tile keeps its own height around it (same approach as the
                    mix landing page). */}
                <div className="rx-tile-stage" style={{ height: c.height }}>
                  <div className="rx-tile-view">
                    <FlutterMultiView
                      previewId={c.id}
                      height={Math.min(c.height, 200)}
                      bordered={false}
                      lazyLoad
                      transparent
                    />
                  </div>
                </div>
                <p className="rx-tile-cap">{c.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══ Component marquee ════════════════════════════════════ */}
        <section className="rx-gap-sm rx-marquee-section">
          <div className="rx-marquee" aria-hidden="true">
            <div className="rx-marquee-track">
              {[...COMPONENTS, ...COMPONENTS].map((name, i) => (
                <span key={name + i} className="rx-chip">
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="rx-marquee rx-marquee-rev" aria-hidden="true">
            <div className="rx-marquee-track">
              {[...COMPONENTS, ...COMPONENTS].reverse().map((name, i) => (
                <span key={name + i} className="rx-chip">
                  {name}
                </span>
              ))}
            </div>
          </div>
          <motion.div className="rx-shell rx-center" {...reveal}>
            <RemixButton href={LINKS.components} variant="ghost" arrow="right">
              Browse the full component library
            </RemixButton>
          </motion.div>
        </section>

        {/* ══ Styling split ════════════════════════════════════════ */}
        <section className="rx-shell rx-gap">
          <div className="rx-split">
            <div className="rx-split-copy">
              <SectionHead
                align="left"
                eyebrow="Styling"
                title="Define a look once. Reuse it everywhere."
                lead="Compose a style with Mix's fluent API, then share it across your whole app. No deep widget trees, no copy-pasted variants drifting out of sync."
              />
              <ul className="rx-checklist">
                <li>
                  <Sparkles size={15} strokeWidth={2.2} /> Type-safe, fluent, and
                  composable
                </li>
                <li>
                  <Sparkles size={15} strokeWidth={2.2} /> Variants, states, and
                  tokens in one place
                </li>
                <li>
                  <Sparkles size={15} strokeWidth={2.2} /> Works on any Remix
                  component
                </li>
              </ul>
              <motion.div className="rx-left-cta" {...reveal}>
                <RemixButton href={LINKS.styling} variant="ghost" arrow="right">
                  Explore styling
                </RemixButton>
              </motion.div>
            </div>

            <motion.div
              className="rx-code-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <div className="rx-window-bar rx-window-bar-plain">
                <div className="rx-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <em className="rx-window-file">app_button.dart</em>
              </div>
              <div className="rx-code-card-body">
                <HighlightedCode code={THEMES[0].code} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ FAQ ══════════════════════════════════════════════════ */}
        <section className="rx-shell rx-gap">
          <SectionHead eyebrow="FAQ" title="Questions, answered." />
          <motion.div className="rx-faq" {...reveal}>
            {FAQ.map((item) => (
              <details key={item.q} className="rx-faq-item">
                <summary>
                  {item.q}
                  <span className="rx-faq-icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </motion.div>
        </section>

        {/* ══ Closing CTA ══════════════════════════════════════════ */}
        <section className="rx-shell rx-gap">
          <motion.div className="rx-cta-card" {...reveal}>
            <div className="rx-cta-glow" aria-hidden="true" />
            <h2 className="rx-cta-title">
              Build Flutter UI that&apos;s finally yours.
            </h2>
            <p className="rx-cta-lead">
              Open source, free, and in active Beta. Explore the components, read
              the docs, and shape it with the community.
            </p>
            <div className="rx-cta-row">
              <RemixButton href={LINKS.getStarted} arrow="right">
                Start in 2 minutes
              </RemixButton>
              <RemixButton href={LINKS.components} variant="secondary">
                Browse components
              </RemixButton>
            </div>
            <div className="rx-cta-links">
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                <Github size={15} strokeWidth={2} /> GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a href={LINKS.discord} target="_blank" rel="noreferrer">
                Discord
              </a>
              <span aria-hidden="true">·</span>
              <span className="rx-cta-fine">BSD 3-Clause · Built on Mix</span>
            </div>
          </motion.div>
        </section>
      </div>

      <style jsx global>{`
        /* ═══ Foundations ═══════════════════════════════════════ */
        .rx-root {
          position: relative;
          z-index: 10;
          padding-bottom: 140px;
          overflow-x: clip;
          interpolate-size: allow-keywords;
        }
        .rx-shell {
          width: 100%;
          max-width: 76rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .rx-gap {
          margin-top: clamp(112px, 14vw, 200px);
        }
        .rx-gap-sm {
          margin-top: clamp(72px, 9vw, 128px);
        }
        .rx-gradient-text {
          background: linear-gradient(
            100deg,
            var(--mix-accent) 0%,
            #7dffa0 55%,
            #ffffff 120%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ═══ Ambient backdrop ══════════════════════════════════ */
        .rx-aurora {
          position: absolute;
          inset: 0;
          top: -80px;
          height: 1100px;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, #000 55%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent);
        }
        .rx-aurora-a,
        .rx-aurora-b {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.5;
        }
        .rx-aurora-a {
          top: -260px;
          left: 50%;
          width: 760px;
          height: 620px;
          transform: translateX(-50%);
          background: radial-gradient(
            circle,
            var(--mix-accent-glow),
            transparent 68%
          );
          opacity: 0.7;
        }
        .rx-aurora-b {
          top: 40px;
          right: -120px;
          width: 460px;
          height: 460px;
          background: radial-gradient(
            circle,
            rgba(0, 235, 3, 0.12),
            transparent 70%
          );
        }
        .rx-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at 50% 22%, #000, transparent 62%);
          -webkit-mask-image: radial-gradient(
            circle at 50% 22%,
            #000,
            transparent 62%
          );
        }

        /* ═══ Hero ══════════════════════════════════════════════ */
        .rx-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: clamp(40px, 8vw, 96px);
        }
        .rx-logo {
          height: 44px;
          width: auto;
          margin-bottom: 6px;
        }
        .rx-hero-title {
          margin-top: 28px;
          font-size: clamp(2.7rem, 6.6vw, 4.8rem);
          font-weight: 640;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #fff;
          text-wrap: balance;
        }
        .rx-hero-sub {
          margin-top: 1.5rem;
          max-width: 40rem;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: var(--mix-text-muted);
          text-wrap: pretty;
        }
        .rx-hero-cta {
          margin-top: 2.2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        /* ═══ Product window ════════════════════════════════════ */
        .rx-window-wrap {
          position: relative;
          width: 100%;
          max-width: 62rem;
          margin: clamp(56px, 8vw, 88px) auto 0;
        }
        .rx-window-glow {
          position: absolute;
          inset: -14% 4% -30%;
          background: radial-gradient(
            ellipse at 50% 0%,
            var(--mix-accent-glow),
            transparent 66%
          );
          filter: blur(30px);
          z-index: -1;
        }
        .rx-window {
          position: relative;
          text-align: left;
          border: 1px solid var(--mix-border-card);
          border-radius: 20px;
          background: linear-gradient(
            180deg,
            rgba(22, 20, 33, 0.9),
            rgba(13, 11, 20, 0.9)
          );
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset,
            0 40px 90px -50px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }
        .rx-window-bar {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--mix-border-card);
          background: rgba(255, 255, 255, 0.02);
        }
        /* Product window: dots overlaid at left, segmented truly centered */
        .rx-window > .rx-window-bar {
          justify-content: center;
        }
        .rx-window > .rx-window-bar .rx-dots {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
        }
        .rx-window > .rx-window-bar .rx-segmented {
          margin: 0;
        }
        .rx-dots {
          display: flex;
          gap: 7px;
          flex: 0 0 auto;
        }
        .rx-dots span {
          width: 11px;
          height: 11px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.13);
        }
        .rx-segmented {
          display: flex;
          gap: 3px;
          padding: 3px;
          margin: 0 auto;
          border-radius: 999px;
          border: 1px solid var(--mix-border-card);
          background: rgba(0, 0, 0, 0.3);
        }
        .rx-seg {
          position: relative;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          font-weight: 500;
          color: var(--mix-text-muted);
          padding: 5px 13px;
          border-radius: 999px;
          cursor: pointer;
          background: transparent;
          transition: color 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rx-seg:not(.is-active):hover {
            color: #fff;
          }
        }
        .rx-seg.is-active {
          color: #05040a;
        }
        .rx-seg-pill {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 999px;
          background: var(--mix-accent);
        }
        .rx-seg-label {
          position: relative;
          z-index: 1;
        }
        .rx-seg:focus-visible {
          outline: 2px solid var(--mix-accent);
          outline-offset: 2px;
        }
        .rx-window-file {
          flex: 0 0 auto;
          font-style: normal;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--mix-text-muted);
        }
        .rx-window-body {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 780px) {
          .rx-window-body {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        .rx-window-code {
          padding: 20px 22px;
          min-width: 0;
        }
        .rx-code-stack {
          display: grid;
          min-height: 208px;
        }
        .rx-code-stack > * {
          grid-area: 1 / 1;
        }
        .rx-code-layer {
          overflow-x: auto;
        }
        .rx-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 208px;
          padding: 28px;
          border-top: 1px solid var(--mix-border-card);
        }
        @media (min-width: 780px) {
          .rx-stage {
            border-top: none;
            border-left: 1px solid var(--mix-border-card);
          }
        }
        .rx-stage-label {
          position: absolute;
          top: 12px;
          left: 14px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
        }

        /* ═══ Live Flutter render (stacked, cross-faded) ════════ */
        .rx-flutter-stack {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          min-height: 140px;
        }
        .rx-flutter-layer {
          grid-area: 1 / 1;
          width: 100%;
          transition: opacity 0.32s ease;
        }
        /* Per-theme ambient stage backdrop (matches each style's mood) */
        .rx-theme-default {
          background: radial-gradient(
            circle at 50% 40%,
            rgba(0, 235, 3, 0.06),
            transparent 70%
          );
        }
        .rx-theme-gradient {
          background: radial-gradient(
            circle at 50% 40%,
            rgba(139, 92, 246, 0.1),
            transparent 70%
          );
        }
        .rx-theme-neon {
          background: #06000f;
        }

        /* ═══ Stats band ════════════════════════════════════════ */
        .rx-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          border: 1px solid var(--mix-border-card);
          border-radius: 20px;
          overflow: hidden;
          background: var(--mix-border-card);
        }
        @media (min-width: 720px) {
          .rx-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .rx-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 32px 20px;
          background: rgba(13, 11, 20, 0.6);
          text-align: center;
        }
        .rx-stat-value {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 640;
          letter-spacing: -0.03em;
          background: linear-gradient(180deg, #fff, #b7b7c2);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .rx-stat-label {
          font-size: 13px;
          color: var(--mix-text-muted);
        }

        /* ═══ Editorial statement ═══════════════════════════════ */
        /* line-height forced past Nextra's fixed 1.35rem <p> rule */
        .rx-statement {
          max-width: 54rem;
          margin: 0 auto;
          text-align: center;
          font-size: clamp(1.6rem, 3.6vw, 2.6rem);
          font-weight: 500;
          line-height: 1.32 !important;
          letter-spacing: -0.02em;
          color: #fff;
          text-wrap: balance;
        }

        /* ═══ Section heads ═════════════════════════════════════ */
        .rx-head {
          max-width: 46rem;
          margin: 0 auto 56px;
          text-align: center;
        }
        .rx-head-left {
          margin: 0 0 32px;
          text-align: left;
        }
        .rx-eyebrow {
          display: inline-block;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--mix-accent);
          margin-bottom: 16px;
        }
        .rx-title {
          font-size: clamp(1.8rem, 4vw, 2.7rem);
          font-weight: 620;
          color: #fff;
          letter-spacing: -0.035em;
          line-height: 1.08;
          text-wrap: balance;
        }
        .rx-lead {
          margin-top: 18px;
          font-size: 1.08rem;
          line-height: 1.65;
          color: var(--mix-text-muted);
          text-wrap: pretty;
        }
        .rx-head:not(.rx-head-left) .rx-lead {
          max-width: 40rem;
          margin-left: auto;
          margin-right: auto;
        }

        /* ═══ Feature grid ══════════════════════════════════════ */
        .rx-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .rx-features {
            grid-template-columns: repeat(6, 1fr);
          }
          .rx-feature {
            grid-column: span 2;
          }
          .rx-feature-wide {
            grid-column: span 3;
          }
        }
        .rx-feature {
          position: relative;
          padding: 26px;
          border: 1px solid var(--mix-border-card);
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.025),
            rgba(255, 255, 255, 0.005)
          );
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rx-feature:hover {
            border-color: rgba(0, 235, 3, 0.35);
            transform: translateY(-2px);
          }
        }
        .rx-feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 11px;
          margin-bottom: 18px;
          color: var(--mix-accent);
          background: var(--mix-accent-low);
          border: 1px solid rgba(0, 235, 3, 0.2);
        }
        .rx-feature-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .rx-feature-body {
          margin-top: 8px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--mix-text-muted);
        }

        /* ═══ Component bento ═══════════════════════════════════ */
        .rx-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 720px) {
          .rx-bento {
            grid-template-columns: repeat(3, 1fr);
          }
          .rx-tile-wide {
            grid-column: span 2;
          }
        }
        .rx-tile {
          overflow: hidden;
          border: 1px solid var(--mix-border-card);
          border-radius: 18px;
          background: var(--mix-surface);
          box-shadow: 0 24px 60px -40px rgba(0, 0, 0, 0.8);
          transition: border-color 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rx-tile:hover {
            border-color: rgba(0, 235, 3, 0.3);
          }
        }
        .rx-tile-stage {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rx-tile-view {
          width: 100%;
          max-width: 360px;
        }
        .rx-tile-cap {
          padding: 12px 18px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--mix-text-muted);
          border-top: 1px solid var(--mix-border-card);
        }

        /* ═══ Marquee ═══════════════════════════════════════════ */
        .rx-marquee-section {
          overflow: hidden;
        }
        .rx-marquee {
          display: flex;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 12%,
            #000 88%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 12%,
            #000 88%,
            transparent
          );
        }
        .rx-marquee + .rx-marquee {
          margin-top: 14px;
        }
        .rx-marquee-track {
          display: flex;
          gap: 12px;
          padding-right: 12px;
          flex: 0 0 auto;
          animation: rx-scroll 42s linear infinite;
        }
        .rx-marquee-rev .rx-marquee-track {
          animation-direction: reverse;
        }
        @keyframes rx-scroll {
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rx-marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .rx-chip {
          flex: 0 0 auto;
          font-size: 14px;
          font-weight: 500;
          color: #e6e6ea;
          padding: 9px 18px;
          border-radius: 999px;
          border: 1px solid var(--mix-border-card);
          background: var(--mix-surface);
        }
        .rx-center {
          margin-top: 44px;
          text-align: center;
        }

        /* ═══ Styling split ═════════════════════════════════════ */
        .rx-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 940px) {
          .rx-split {
            grid-template-columns: 0.92fr 1.08fr;
            gap: 60px;
          }
        }
        .rx-checklist {
          list-style: none;
          margin: 4px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .rx-checklist li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.98rem;
          color: #d4d4dc;
        }
        .rx-checklist svg {
          color: var(--mix-accent);
          flex: 0 0 auto;
        }
        .rx-left-cta {
          margin-top: 28px;
        }
        .rx-code-card {
          border: 1px solid var(--mix-border-card);
          border-radius: 18px;
          background: linear-gradient(
            180deg,
            rgba(22, 20, 33, 0.7),
            rgba(13, 11, 20, 0.85)
          );
          box-shadow: 0 40px 90px -55px rgba(0, 0, 0, 0.9);
          overflow: hidden;
        }
        .rx-window-bar-plain {
          justify-content: flex-start;
        }
        .rx-window-bar-plain .rx-window-file {
          margin-left: 8px;
        }
        .rx-code-card-body {
          padding: 20px 22px;
          overflow-x: auto;
        }

        /* ═══ FAQ ═══════════════════════════════════════════════ */
        .rx-faq {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 48rem;
          margin: 0 auto;
        }
        .rx-faq-item {
          border: 1px solid var(--mix-border-card);
          border-radius: 16px;
          background: rgba(13, 11, 20, 0.5);
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .rx-faq-item[open] {
          border-color: rgba(0, 235, 3, 0.25);
        }
        .rx-faq-item summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          font-size: 1.02rem;
          font-weight: 500;
          color: #fff;
        }
        .rx-faq-item summary::-webkit-details-marker {
          display: none;
        }
        .rx-faq-item summary:focus-visible {
          outline: 2px solid var(--mix-accent);
          outline-offset: -2px;
          border-radius: 16px;
        }
        .rx-faq-icon {
          position: relative;
          flex: 0 0 auto;
          width: 14px;
          height: 14px;
        }
        .rx-faq-icon::before,
        .rx-faq-icon::after {
          content: "";
          position: absolute;
          background: var(--mix-accent);
          border-radius: 2px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .rx-faq-icon::before {
          top: 6px;
          left: 0;
          width: 14px;
          height: 2px;
        }
        .rx-faq-icon::after {
          top: 0;
          left: 6px;
          width: 2px;
          height: 14px;
        }
        .rx-faq-item[open] .rx-faq-icon::after {
          transform: scaleY(0);
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .rx-faq-icon::before,
          .rx-faq-icon::after {
            transition: opacity 0.2s ease;
          }
        }
        .rx-faq-item p {
          padding: 0 24px 22px;
          font-size: 0.96rem;
          line-height: 1.7;
          color: var(--mix-text-muted);
        }
        .rx-faq-item::details-content {
          height: 0;
          overflow: hidden;
          content-visibility: hidden;
          transition: height 0.3s ease, content-visibility 0.3s allow-discrete;
        }
        .rx-faq-item[open]::details-content {
          height: auto;
          content-visibility: visible;
        }
        @media (prefers-reduced-motion: reduce) {
          .rx-faq-item::details-content {
            transition: none;
          }
        }

        /* ═══ Closing CTA ═══════════════════════════════════════ */
        .rx-cta-card {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: clamp(48px, 8vw, 88px) 28px;
          border: 1px solid rgba(0, 235, 3, 0.22);
          border-radius: 28px;
          background: linear-gradient(
            180deg,
            rgba(0, 235, 3, 0.06),
            rgba(13, 11, 20, 0.4)
          );
        }
        .rx-cta-glow {
          position: absolute;
          inset: -60% 20% auto;
          height: 380px;
          background: radial-gradient(
            ellipse at 50% 0%,
            var(--mix-accent-glow),
            transparent 68%
          );
          filter: blur(20px);
          z-index: 0;
        }
        .rx-cta-card > *:not(.rx-cta-glow) {
          position: relative;
          z-index: 1;
        }
        .rx-cta-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 640;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: #fff;
          text-wrap: balance;
        }
        .rx-cta-lead {
          max-width: 40rem;
          margin: 18px auto 0;
          font-size: 1.08rem;
          line-height: 1.65;
          color: var(--mix-text-muted);
          text-wrap: pretty;
        }
        .rx-cta-row {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }
        .rx-cta-links {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 13px;
          color: var(--mix-text-muted);
        }
        .rx-cta-links a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #d4d4dc;
          transition: color 0.15s ease;
        }
        .rx-cta-links a:hover {
          color: var(--mix-accent);
        }
        .rx-cta-fine {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          letter-spacing: 0.03em;
        }

        /* ═══ Mobile ════════════════════════════════════════════ */
        @media (max-width: 719px) {
          .rx-statement {
            font-size: 1.55rem;
          }
          .rx-window-file {
            display: none;
          }
          .rx-segmented {
            margin: 0;
          }
        }
      `}</style>
    </MotionConfig>
  );
};

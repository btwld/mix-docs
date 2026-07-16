"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  Accessibility,
  Check,
  CheckCircle2,
  Copy,
  Focus,
  Keyboard,
  Layers3,
  ListChecks,
  MousePointerClick,
  PanelsTopLeft,
  ScanSearch,
  Sparkles,
  TextCursorInput,
} from "lucide-react";
import { HighlightedCode } from "../../HighlightedCode";
import { LandingButton } from "../LandingButton";
import { EASE, fadeUp, reveal, staggerChild, staggerParent } from "../motion";
import { SectionHead } from "../SectionHead";
import { Wordmark } from "../Wordmark";
import { Aurora } from "../sections/Aurora";
import { Faq } from "../sections/Faq";
import { Features } from "../sections/Features";
import { Statement } from "../sections/Statement";
import { Stats } from "../sections/Stats";
import type { LandingContent } from "../types";
import "../landing.css";
import "./naked-ui.css";

const DOCS_URL = "https://docs.page/btwld/naked_ui";
const GITHUB_URL = "https://github.com/btwld/naked_ui";
const PUB_DEV_URL = "https://pub.dev/packages/naked_ui";

const BUTTON_CODE = `NakedButton(
  onPressed: onSave,
  builder: (context, state, child) {
    final color = state.when(
      pressed: const Color(0xFF1D4ED8),
      hovered: const Color(0xFF2563EB),
      orElse: const Color(0xFF3B82F6),
    );

    return AnimatedContainer(
      duration: const Duration(milliseconds: 160),
      padding: const EdgeInsets.symmetric(
        horizontal: 20,
        vertical: 12,
      ),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Text('Save changes'),
    );
  },
)`;

const CHECKBOX_CODE = `NakedCheckbox(
  value: accepted,
  onChanged: (value) {
    setState(() => accepted = value ?? false);
  },
  builder: (context, state, child) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 160),
      decoration: BoxDecoration(
        color: state.isChecked == true
            ? const Color(0xFF3B82F6)
            : Colors.transparent,
        border: Border.all(
          color: state.isFocused
              ? const Color(0xFF93C5FD)
              : const Color(0xFF64748B),
        ),
      ),
      child: state.isChecked == true
          ? const Icon(Icons.check)
          : null,
    );
  },
)`;

const SLIDER_CODE = `NakedSlider(
  value: volume,
  min: 0,
  max: 100,
  onChanged: (value) {
    setState(() => volume = value);
  },
  builder: (context, state, child) {
    return CustomPaint(
      painter: VolumeTrackPainter(
        value: state.value,
        isHovered: state.isHovered,
        isDragged: state.isDragged,
        isFocused: state.isFocused,
      ),
    );
  },
)`;

type DemoState = "idle" | "hovered" | "pressed" | "focused" | "dragged";

function useDemoState(activeState: DemoState = "pressed") {
  const [state, setState] = useState<DemoState>("idle");
  const pointerIsDown = useRef(false);

  return {
    state,
    setState,
    interactionProps: {
      onPointerEnter: () => setState("hovered"),
      onPointerLeave: () => {
        pointerIsDown.current = false;
        setState("idle");
      },
      onPointerDown: () => {
        pointerIsDown.current = true;
        setState(activeState);
      },
      onPointerUp: () => {
        pointerIsDown.current = false;
        setState("hovered");
      },
      onPointerCancel: () => {
        pointerIsDown.current = false;
        setState("idle");
      },
      onFocus: () => {
        if (!pointerIsDown.current) setState("focused");
      },
      onBlur: () => {
        pointerIsDown.current = false;
        setState("idle");
      },
    },
  };
}

function StateReadout({ state }: { state: DemoState }) {
  return (
    <span className="nui-state-readout" aria-live="polite">
      <span aria-hidden="true" />
      state.{state}
    </span>
  );
}

function ButtonDemo() {
  const { state, setState, interactionProps } = useDemoState();

  return (
    <div className="nui-demo nui-button-demo">
      <StateReadout state={state} />
      <button
        type="button"
        className="nui-demo-button"
        {...interactionProps}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") setState("pressed");
        }}
        onKeyUp={() => setState("focused")}
      >
        Save changes
      </button>
      <p>Pointer, keyboard, and focus all feed the same typed snapshot.</p>
    </div>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const { state, interactionProps } = useDemoState();

  return (
    <div className="nui-demo nui-checkbox-demo">
      <StateReadout state={state} />
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        className="nui-demo-checkbox-row"
        onClick={() => setChecked((value) => !value)}
        {...interactionProps}
      >
        <span className="nui-demo-checkbox" aria-hidden="true">
          {checked && <Check size={17} strokeWidth={2.8} />}
        </span>
        <span>
          <strong>Ship release notes</strong>
          <small>{checked ? "Included in this release" : "Not included"}</small>
        </span>
      </button>
      <p>The primitive owns toggle behavior and semantics; you own the pixels.</p>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(64);
  const { state, interactionProps } = useDemoState("dragged");

  return (
    <div className="nui-demo nui-slider-demo">
      <StateReadout state={state} />
      <div className="nui-slider-heading">
        <span>Volume</span>
        <strong>{value}%</strong>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        aria-label="Volume"
        style={{ "--nui-slider-value": `${value}%` } as CSSProperties}
        onChange={(event) => setValue(Number(event.target.value))}
        {...interactionProps}
      />
      <p>Drag it or use the arrow keys—the visual track stays completely yours.</p>
    </div>
  );
}

const DEMOS = [
  { key: "button", label: "Button", code: BUTTON_CODE, Demo: ButtonDemo },
  {
    key: "checkbox",
    label: "Checkbox",
    code: CHECKBOX_CODE,
    Demo: CheckboxDemo,
  },
  { key: "slider", label: "Slider", code: SLIDER_CODE, Demo: SliderDemo },
] as const;

function HeroWindow() {
  const [activeDemo, setActiveDemo] = useState(0);
  const demo = DEMOS[activeDemo];
  const Demo = demo.Demo;

  function handleTabKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % DEMOS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + DEMOS.length) % DEMOS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = DEMOS.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveDemo(nextIndex);
    document.getElementById(`nui-tab-${DEMOS[nextIndex].key}`)?.focus();
  }

  return (
    <motion.div
      className="lp-window-wrap nui-window-wrap"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
    >
      <div className="lp-window-glow" aria-hidden="true" />
      <div className="lp-window nui-window">
        <div className="lp-window-bar">
          <div className="lp-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div
            className="lp-segmented"
            role="tablist"
            aria-label="Component demo"
            aria-orientation="horizontal"
          >
            {DEMOS.map((item, index) => (
              <button
                key={item.key}
                id={`nui-tab-${item.key}`}
                type="button"
                role="tab"
                aria-selected={activeDemo === index}
                aria-controls="nui-demo-panel"
                tabIndex={activeDemo === index ? 0 : -1}
                className={"lp-seg" + (activeDemo === index ? " is-active" : "")}
                onClick={() => setActiveDemo(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {activeDemo === index && (
                  <motion.span
                    layoutId="nui-demo-pill"
                    className="lp-seg-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="lp-seg-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          id="nui-demo-panel"
          className="lp-window-body nui-window-body"
          role="tabpanel"
          aria-labelledby={`nui-tab-${demo.key}`}
        >
          <div className="lp-window-code nui-window-code">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={demo.key}
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(3px)" }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                <HighlightedCode code={demo.code} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lp-stage nui-stage">
            <span className="lp-stage-label" aria-hidden="true">
              Your presentation · Naked UI behavior
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={demo.key}
                className="nui-demo-slot"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                <Demo />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const FEATURES: LandingContent["features"] = {
  eyebrow: "Behavior without a brand",
  title: "The hard interaction work, already handled.",
  lead: "Naked UI gives each control the behavior users expect, then exposes the state your own widgets need to render it well.",
  items: [
    {
      icon: Accessibility,
      title: "Semantics are part of the primitive",
      body: "Screen-reader roles and control state live beside the behavior instead of being rebuilt in every visual component.",
      wide: true,
    },
    {
      icon: ScanSearch,
      title: "State you can actually observe",
      body: "Builders receive typed snapshots for hover, focus, press, drag, selection, and disabled states—ready for your styles and animations.",
      wide: true,
    },
    {
      icon: Keyboard,
      title: "Keyboard conventions",
      body: "Activation, arrow-key navigation, roving focus, and traversal behavior follow the control you chose.",
    },
    {
      icon: Focus,
      title: "Focus and overlays",
      body: "Dialogs, menus, selects, tooltips, and popovers handle anchoring, dismissal, and focus lifecycle.",
    },
    {
      icon: Sparkles,
      title: "Zero visual lock-in",
      body: "Return ordinary Flutter widgets from the builder. Use your tokens, painters, animations, or styling system.",
    },
  ],
};

const COMPONENT_GROUPS = [
  {
    icon: MousePointerClick,
    label: "Actions",
    description: "Trigger an action or represent an on/off state.",
    components: [
      ["Button", "button"],
      ["Toggle", "toggle"],
      ["Switch", "switch"],
    ],
  },
  {
    icon: ListChecks,
    label: "Selection",
    description: "Single, multiple, and continuous-value selection.",
    components: [
      ["Checkbox", "checkbox"],
      ["Radio", "radio"],
      ["Select", "select"],
      ["Slider", "slider"],
    ],
  },
  {
    icon: TextCursorInput,
    label: "Input",
    description: "Native text editing behavior with a custom visual shell.",
    components: [["TextField", "textfield"]],
  },
  {
    icon: PanelsTopLeft,
    label: "Disclosure",
    description: "Organize and reveal content with managed selection and focus.",
    components: [
      ["Tabs", "tabs"],
      ["Accordion", "accordion"],
    ],
  },
  {
    icon: Layers3,
    label: "Overlays",
    description: "Anchored and modal surfaces with lifecycle behavior built in.",
    components: [
      ["Menu", "menu"],
      ["Dialog", "dialog"],
      ["Tooltip", "tooltip"],
      ["Popover", "popover"],
    ],
  },
] as const;

function ComponentCatalog() {
  return (
    <section className="lp-shell lp-gap" id="components">
      <SectionHead
        eyebrow="14 primitives"
        title="Choose the behavior. Keep the design language."
        lead="Every primitive uses the same builder-first idea, from a button to a focus-trapped dialog. Open any component to see its complete API and accessibility guidance."
      />
      <motion.div
        className="nui-catalog"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {COMPONENT_GROUPS.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.article
              key={group.label}
              variants={staggerChild}
              className={`nui-catalog-card nui-catalog-card-${index + 1}`}
            >
              <span className="lp-feature-icon">
                <Icon size={20} strokeWidth={1.9} />
              </span>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
              <div className="nui-component-links">
                {group.components.map(([name, slug]) => (
                  <a
                    key={slug}
                    href={`${DOCS_URL}/widget/${slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Naked{name}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

const BUILDER_CODE = `class DesignSystemButton extends StatelessWidget {
  const DesignSystemButton({
    super.key,
    required this.label,
    required this.onPressed,
  });

  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return NakedButton(
      onPressed: onPressed,
      builder: (context, state, child) {
        return AppButtonSurface(
          label: label,
          hovered: state.isHovered,
          pressed: state.isPressed,
          focused: state.isFocused,
        );
      },
    );
  }
}`;

function BuilderPattern() {
  return (
    <section className="lp-shell lp-gap" id="builder-pattern">
      <div className="lp-split">
        <div>
          <SectionHead
            align="left"
            eyebrow="One repeatable pattern"
            title="Wrap your visuals. Read the state. Ship the control."
            lead="Your design-system widget remains an ordinary Flutter widget. Naked UI sits at the interaction boundary and keeps behavior, semantics, and state in one predictable place."
          />
          <motion.ul className="lp-checklist" {...reveal}>
            <li>
              <CheckCircle2 size={16} /> Start with your own visual component
            </li>
            <li>
              <CheckCircle2 size={16} /> Wrap it in the matching Naked primitive
            </li>
            <li>
              <CheckCircle2 size={16} /> Render interaction state in the builder
            </li>
            <li>
              <CheckCircle2 size={16} /> Keep labels, contrast, and content in your design system
            </li>
          </motion.ul>
          <motion.div className="lp-left-cta" {...reveal}>
            <LandingButton href={DOCS_URL} target="_blank" rel="noreferrer" variant="ghost" arrow="right">
              Learn the builder pattern
            </LandingButton>
          </motion.div>
        </div>

        <motion.div className="lp-code-card" {...reveal}>
          <div className="lp-window-bar lp-window-bar-plain">
            <div className="lp-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <em className="lp-window-file">design_system_button.dart</em>
          </div>
          <div className="lp-code-card-body nui-pattern-code">
            <HighlightedCode code={BUILDER_CODE} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const FAQ: LandingContent["faq"] = [
  {
    q: "Does Naked UI include any visual styling?",
    a: "No. The primitives own interaction behavior, state, semantics, focus, and overlay mechanics. Their builders return the Flutter widgets that define your colors, spacing, typography, shape, motion, and layout.",
  },
  {
    q: "Do I need Mix or another styling package?",
    a: "No. Naked UI depends on Flutter and works with ordinary widgets, Theme extensions, custom painters, Mix, or any other styling approach you already use.",
  },
  {
    q: "What accessibility work is handled for me?",
    a: "Each primitive supplies control-appropriate semantics and interaction behavior such as keyboard activation, roving focus, focus trapping, or screen-reader state. You still own accessible labels, readable contrast, touch-target sizing, and the meaning of your custom content.",
  },
  {
    q: "How do I choose between Toggle, Switch, Checkbox, and Radio?",
    a: "Use Switch for an immediate on/off setting, Checkbox for independent choices, Radio for one choice in a group, and Toggle for a pressable selected state or toggle group. The component docs include selection and semantics guidance for each.",
  },
  {
    q: "Is the API stable?",
    a: "Naked UI is currently published as a beta. Pin the version you adopt, review the changelog when upgrading, and cover your design-system wrappers with widget tests while the API continues to mature.",
  },
  {
    q: "Can I use it in a commercial app?",
    a: "Yes. Naked UI is open source under the BSD 3-Clause license.",
  },
];

function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText("flutter pub add naked_ui");
      setCopied(true);
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => {
        setCopied(false);
        resetTimer.current = null;
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="nui-install">
      <span aria-hidden="true">$</span>
      <code>flutter pub add naked_ui</code>
      <button
        type="button"
        onClick={copyCommand}
        aria-label={copied ? "Install command copied" : "Copy install command"}
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

function ClosingCta() {
  return (
    <section className="lp-shell lp-gap" id="get-started">
      <motion.div className="lp-cta-card" {...reveal}>
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-title">Bring the design. Keep the behavior.</h2>
        <p className="lp-cta-lead">
          Add Naked UI, wrap one control you already own, and stop rebuilding the interaction layer every time the visuals change.
        </p>
        <InstallCommand />
        <div className="lp-cta-row">
          <LandingButton href={DOCS_URL} target="_blank" rel="noreferrer" arrow="right">
            Read the docs
          </LandingButton>
          <LandingButton href={GITHUB_URL} target="_blank" rel="noreferrer" variant="secondary">
            View on GitHub
          </LandingButton>
        </div>
        <div className="lp-cta-links">
          <a href={PUB_DEV_URL} target="_blank" rel="noreferrer">
            pub.dev ↗
          </a>
          <span aria-hidden="true">·</span>
          <span className="lp-cta-fine">BSD-3-Clause · Flutter 3.41+</span>
        </div>
      </motion.div>
    </section>
  );
}

export function NakedUiHome() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="lp-root nui-root">
        <Aurora />

        <section className="lp-shell lp-hero nui-hero" id="top">
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Wordmark name="naked_ui" showByline={false} />
          </motion.div>

          <motion.h1
            className="lp-hero-title"
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
          >
            Bring the look.
            <br />
            <span className="lp-gradient-text">The behavior is handled.</span>
          </motion.h1>

          <motion.p
            className="lp-hero-sub"
            initial="hidden"
            animate="visible"
            custom={0.18}
            variants={fadeUp}
          >
            Headless Flutter primitives with semantics, keyboard support, focus,
            overlays, and observable interaction state—without a single opinion
            about how your interface should look.
          </motion.p>

          <motion.div
            className="lp-hero-cta"
            initial="hidden"
            animate="visible"
            custom={0.28}
            variants={fadeUp}
          >
            <LandingButton href={DOCS_URL} target="_blank" rel="noreferrer" arrow="right">
              Read the docs
            </LandingButton>
            <LandingButton href={PUB_DEV_URL} target="_blank" rel="noreferrer" variant="secondary">
              Add to Flutter
            </LandingButton>
          </motion.div>

          <HeroWindow />
        </section>

        <Stats
          stats={[
            { value: "14", label: "Headless primitives" },
            { value: "0", label: "Preset styles" },
            { value: "1", label: "Builder-first pattern" },
            { value: "BSD-3", label: "Open-source license" },
          ]}
        />

        <Statement>
          A component library should make behavior boring without making your
          product generic. <span className="lp-gradient-text">Naked UI separates the two.</span>
        </Statement>

        <Features features={FEATURES} />
        <ComponentCatalog />
        <BuilderPattern />
        <Faq faq={FAQ} />
        <ClosingCta />
      </main>
    </MotionConfig>
  );
}

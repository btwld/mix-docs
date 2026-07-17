import Link from "next/link";

import { HighlightedCode } from "./HighlightedCode";

const STYLE_SOURCE = `@MixWidget()
final appCardStyle = BoxStyler()
    .color(const Color(0xFF6750A4))
    .paddingAll(16)
    .borderRounded(12);`;

const GENERATED_WIDGET = `class AppCard extends StatelessWidget {
  const AppCard({super.key, this.child});

  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return appCardStyle.call(
      key: this.key,
      child: this.child,
    );
  }
}`;

const WIDGET_USAGE = `const AppCard(
  child: Text('A real Flutter widget'),
);`;

export function MixWidgetShowcase() {
  return (
    <section className="not-prose section-gap" aria-labelledby="mix-widget-title">
      <div className="section-header">
        <span className="mono-label">Code generation</span>
        <h2 id="mix-widget-title" className="section-title">
          Turn a Styler into a widget API.
        </h2>
        <p className="mt-4 max-w-[580px] text-base leading-relaxed text-[var(--mix-text-muted)]">
          Annotate the style you already use. Mix generates a typed{" "}
          <code>StatelessWidget</code> that is ready for layouts, const constructors,
          and your design system&apos;s public API.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[var(--mix-surface-bright)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col gap-4 border-b border-[var(--mix-border-card)] bg-[var(--mix-surface)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </span>
            <span className="font-mono text-[11px] text-[var(--mix-text-muted)]">
              app_card.dart
            </span>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-[var(--mix-accent)]/25 bg-[var(--mix-accent)]/[0.06] px-3 py-1.5 font-mono text-[11px]">
            <code className="!border-0 !bg-transparent !p-0 text-[var(--mix-text-muted)]">
              @MixWidget()
            </code>
            <span aria-hidden className="text-[var(--mix-accent)]">
              →
            </span>
            <code className="!border-0 !bg-transparent !p-0 font-semibold text-[var(--mix-accent)]">
              AppCard
            </code>
          </div>
        </div>

        <div className="grid divide-y divide-[var(--mix-border-card)] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <CodeStage
            step="01"
            eyebrow="You write"
            title="One Styler and an annotation."
            code={STYLE_SOURCE}
          />
          <CodeStage
            step="02"
            eyebrow="Mix writes"
            title="A real StatelessWidget."
            code={GENERATED_WIDGET}
          />
        </div>

        <div className="grid items-center gap-5 border-t border-[var(--mix-border-card)] bg-[var(--mix-surface)] px-6 py-6 sm:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mix-accent)]">
              03 / Use it
            </span>
            <h3 className="mt-2 text-base font-semibold tracking-[-0.01em] text-white">
              Compose it anywhere.
            </h3>
          </div>
          <div className="min-w-0 overflow-hidden rounded-xl border border-[var(--mix-border-card)] bg-[var(--mix-bg)] px-4 py-4">
            <HighlightedCode
              code={WIDGET_USAGE}
              className="overflow-x-auto font-mono text-[13px] leading-[1.65]"
            />
          </div>
        </div>
      </div>

      <Link
        href="/documentation/mix/ecosystem/mix-generator#mixwidget"
        className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--mix-text-muted)] transition-colors hover:text-[var(--mix-accent)]"
      >
        See the annotation and generated Dart
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </section>
  );
}

function CodeStage({
  step,
  eyebrow,
  title,
  code,
}: {
  step: string;
  eyebrow: string;
  title: string;
  code: string;
}) {
  return (
    <article className="flex min-w-0 flex-col p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-full border border-[var(--mix-accent)]/30 bg-[var(--mix-accent)]/[0.07] font-mono text-[10px] text-[var(--mix-accent)]">
          {step}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mix-text-muted)]">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white">{title}</h3>
      <div className="mt-5 min-w-0 flex-1 overflow-hidden rounded-xl border border-[var(--mix-border-card)] bg-[var(--mix-bg)] px-4 py-5">
        <HighlightedCode
          code={code}
          className="overflow-x-auto font-mono text-[13px] leading-[1.65]"
        />
      </div>
    </article>
  );
}

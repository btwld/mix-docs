import Link from "next/link";

import { HighlightedCode } from "./HighlightedCode";

const STYLE_SOURCE = `@MixWidget(
  widgetParameters: .only({'child'}),
)
final appCardStyle = BoxStyler()
    .color(const Color(0xFF6750A4))
    .paddingAll(16)
    .borderRounded(12);`;

const WIDGET_USAGE = `const AppCard(
  child: Text(
    'A real Flutter widget',
  ),
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

      <div className="overflow-hidden rounded-3xl bg-[var(--mix-surface)] p-2 ring-1 ring-white/[0.08]">
        <div className="grid overflow-hidden rounded-2xl bg-[var(--mix-surface-bright)] ring-1 ring-inset ring-white/[0.08] lg:grid-cols-[minmax(0,1.1fr)_180px_minmax(0,0.9fr)]">
          <CodePanel eyebrow="01 / Define" title="You own the style." code={STYLE_SOURCE} />

          <div className="relative flex items-center justify-center border-y border-[var(--mix-border-card)] px-6 py-8 lg:border-x lg:border-y-0">
            <div className="absolute inset-x-6 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[var(--mix-accent)]/50 to-transparent lg:block" />
            <div className="relative flex min-w-32 flex-col items-center rounded-xl border border-[var(--mix-accent)]/35 bg-[var(--mix-bg)] px-4 py-4 text-center shadow-[0_0_28px_var(--mix-accent-glow)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mix-text-muted)]">
                generates
              </span>
              <code className="mt-2 !border-0 !bg-transparent !p-0 text-sm font-semibold text-[var(--mix-accent)]">
                AppCard
              </code>
              <span className="mt-1 text-[11px] text-[var(--mix-text-muted)]">
                extends StatelessWidget
              </span>
            </div>
          </div>

          <CodePanel eyebrow="02 / Compose" title="Your layout uses a widget." code={WIDGET_USAGE} />
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

function CodePanel({
  eyebrow,
  title,
  code,
}: {
  eyebrow: string;
  title: string;
  code: string;
}) {
  return (
    <article className="min-w-0 p-6 sm:p-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mix-accent)]">
        {eyebrow}
      </span>
      <h3 className="mt-2 text-base font-semibold tracking-[-0.01em] text-white">
        {title}
      </h3>
      <div className="mt-5 min-w-0 overflow-hidden rounded-xl border border-[var(--mix-border-card)] bg-[var(--mix-bg)] px-4 py-4">
        <HighlightedCode
          code={code}
          className="overflow-x-auto font-mono text-[13px] leading-[1.7]"
        />
      </div>
    </article>
  );
}

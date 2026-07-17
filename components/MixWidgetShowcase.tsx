import Link from "next/link";

import { HighlightedCode } from "./HighlightedCode";

const STYLE_SOURCE = `@MixWidget()
final appCardStyle = BoxStyler()
    .color(Colors.deepPurple)
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

      <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[var(--mix-bg)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col gap-3 border-b border-[var(--mix-border-card)] bg-[var(--mix-surface)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </span>
            <span className="font-mono text-[11px] text-white/75">
              AppCard code generation
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <code className="!border-0 !bg-transparent !p-0 text-[var(--mix-text-muted)]">
              @MixWidget()
            </code>
            <span aria-hidden className="text-white/25">
              →
            </span>
            <code className="!border-0 !bg-transparent !p-0 text-white/70">
              AppCard
            </code>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[auto_1fr]">
          <article className="min-w-0 border-b border-[var(--mix-border-card)] lg:col-start-1 lg:row-start-1">
            <EditorFileHeader filename="app_card.dart" label="You write" />
            <div className="px-6 py-7 sm:px-7 sm:py-8">
              <HighlightedCode
                code={STYLE_SOURCE}
                className="overflow-x-auto font-mono text-[13px] leading-[1.65]"
              />
            </div>
          </article>

          <article className="flex min-w-0 flex-col border-b border-[var(--mix-border-card)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-b-0 lg:border-l">
            <EditorFileHeader filename="app_card.g.dart" label="Generated" />
            <div className="flex-1 px-6 py-7 sm:px-7 sm:py-8">
              <HighlightedCode
                code={GENERATED_WIDGET}
                className="overflow-x-auto font-mono text-[13px] leading-[1.65]"
              />
            </div>
          </article>

          <div className="grid gap-4 bg-[var(--mix-surface)] px-6 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-center sm:px-7 lg:col-start-1 lg:row-start-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mix-accent)]">
                03 / Use it
              </span>
              <h3 className="mt-1.5 text-sm font-semibold tracking-[-0.01em] text-white">
                Compose it anywhere.
              </h3>
            </div>
            <HighlightedCode
              code={WIDGET_USAGE}
              className="min-w-0 overflow-x-auto font-mono text-[12px] leading-[1.65]"
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

function EditorFileHeader({
  filename,
  label,
}: {
  filename: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--mix-border-card)] px-5 py-3.5">
      <span className="font-mono text-[11px] text-white/70">{filename}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--mix-text-muted)]">
        {label}
      </span>
    </div>
  );
}

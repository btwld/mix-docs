import type { Metadata } from "next";
import { ArrowUpRight, Link2 } from "lucide-react";

const links = [
  {
    title: "Remix Studio",
    description: "Open the interactive Remix Studio demo.",
    href: "https://remix-studio-btwld-demo.web.app",
  },
];

export const metadata: Metadata = {
  title: "FlutterCon Links | Concepta",
  description: "Demos and resources shared at FlutterCon.",
};

export default function FlutterConPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-2xl">
        <div className="mb-5 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--mix-accent)]">
          <Link2 aria-hidden="true" className="h-4 w-4" />
          FlutterCon
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
          Links and demos
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--mix-text-muted)] sm:text-lg">
          Resources shared at FlutterCon. More links will be added here as they
          become available.
        </p>
      </header>

      <section aria-labelledby="resources-heading" className="mt-12 sm:mt-16">
        <h2 id="resources-heading" className="sr-only">
          FlutterCon resources
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-52 flex-col justify-between rounded-2xl border border-[var(--mix-border-card)] bg-[var(--mix-surface)] p-6 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-[var(--mix-surface-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mix-accent)]"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mix-accent)]">
                    Interactive demo
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-white">
                    {link.title}
                  </h3>
                  <p className="mt-3 leading-6 text-[var(--mix-text-muted)]">
                    {link.description}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition group-hover:border-[var(--mix-accent)] group-hover:bg-[var(--mix-accent-low)] group-hover:text-[var(--mix-accent)]">
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>
              <span className="mt-8 truncate font-mono text-xs text-white/45">
                remix-studio-btwld-demo.web.app
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

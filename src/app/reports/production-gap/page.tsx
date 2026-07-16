import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTION_GAP_URL } from "../../../../components/reports/report-data";

const description =
  "Why AI makes building faster and shipping harder — and what technology leaders can do about it.";

export const metadata: Metadata = {
  title: "The Production Gap | Concepta Reports",
  description,
  openGraph: {
    title: "The Production Gap",
    description,
    images: ["/og_concepta.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Production Gap",
    description,
    images: ["/og_concepta.png"],
  },
};

export default function ProductionGapReportPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1800px] px-2 pb-8 sm:px-4 md:px-6">
      <header className="flex flex-col gap-3 border-b border-white/10 px-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-0">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#00ebbc]">
            Concepta research
          </p>
          <h1 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">
            The Production Gap
          </h1>
        </div>
        <a
          href={PRODUCTION_GAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ebbc]"
        >
          Open the original report
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </header>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white shadow-[0_24px_80px_-46px_rgba(58,91,255,0.8)]">
        <iframe
          src={PRODUCTION_GAP_URL}
          title="The Production Gap interactive report"
          className="block h-[calc(100svh-11rem)] min-h-[720px] w-full bg-white"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </div>

      <p className="px-2 pt-3 text-xs leading-relaxed text-white/45 sm:px-0">
        The complete published report is displayed above from its canonical
        source, so this page stays aligned with the version used in external
        references.
      </p>
    </main>
  );
}

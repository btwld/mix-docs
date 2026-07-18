import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ReportReaderProps = {
  title: string;
  topic: string;
  reportPath: string;
  frameTitle: string;
};

export function ReportReader({
  title,
  topic,
  reportPath,
  frameTitle,
}: ReportReaderProps) {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1920px] px-2 pb-6 sm:px-4 lg:px-6">
      <header className="flex flex-col gap-5 border-b border-white/10 px-2 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-0">
        <div>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ebbc]"
          >
            <ArrowLeft aria-hidden="true" size={13} />
            All reports
          </Link>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#00ebbc]">
            {topic}
          </p>
          <h1 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
            {title}
          </h1>
        </div>

        <a
          href={reportPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ebbc]"
        >
          Open full screen
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </header>

      <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_28px_90px_-54px_rgba(58,91,255,0.82)]">
        <iframe
          src={reportPath}
          title={frameTitle}
          className="block h-[calc(100svh-12rem)] min-h-[620px] w-full bg-white sm:min-h-[720px]"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <p className="px-2 pt-3 text-xs leading-relaxed text-white/40 sm:px-0">
        This complete, versioned report is stored with the site. Open it full
        screen for the most immersive reading experience.
      </p>
    </main>
  );
}

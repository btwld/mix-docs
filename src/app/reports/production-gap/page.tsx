import type { Metadata } from "next";
import { ReportReader } from "../../../../components/reports/ReportReader";

const REPORT_HTML_PATH = "/reports/production-gap/report.html";

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
    <ReportReader
      title="The Production Gap"
      topic="AI & delivery"
      reportPath={REPORT_HTML_PATH}
      frameTitle="The Production Gap interactive report"
    />
  );
}

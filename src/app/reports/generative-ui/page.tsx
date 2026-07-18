import type { Metadata } from "next";
import { ReportReader } from "../../../../components/reports/ReportReader";

const REPORT_HTML_PATH = "/reports/generative-ui/report.html";

const description =
  "How adaptive enterprise interfaces can preserve policy, state, evidence, and human authority.";

export const metadata: Metadata = {
  title: "Generative UI for the Enterprise | Concepta Reports",
  description,
  openGraph: {
    title: "Generative UI for the Enterprise",
    description,
    images: ["/og_concepta.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative UI for the Enterprise",
    description,
    images: ["/og_concepta.png"],
  },
};

export default function GenerativeUiReportPage() {
  return (
    <ReportReader
      title="Generative UI for the Enterprise"
      topic="Enterprise AI & interaction"
      reportPath={REPORT_HTML_PATH}
      frameTitle="Generative UI for the Enterprise interactive report"
    />
  );
}

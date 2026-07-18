import type { Metadata } from "next";
import { ReportsHome } from "../../../components/reports/ReportsHome";

const description =
  "Concepta field guides for technology leaders adopting AI without losing control of delivery, interface, or consequential decisions.";

export const metadata: Metadata = {
  title: "Reports | Concepta",
  description,
  applicationName: "Concepta",
  openGraph: {
    title: "Concepta Reports",
    description,
    images: ["/og_concepta.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Concepta Reports",
    description,
    images: ["/og_concepta.png"],
  },
};

export default function ReportsPage() {
  return <ReportsHome />;
}

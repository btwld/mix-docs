import type { Metadata } from "next";
import { ReportsHome } from "../../../components/reports/ReportsHome";

const description =
  "Concepta research on governed delivery, production risk, and the work between faster building and reliable release.";

export const metadata: Metadata = {
  title: "Reports | Concepta",
  description,
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

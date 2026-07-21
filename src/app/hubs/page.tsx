import type { Metadata } from "next";
import { HubsHome } from "../../../components/hubs/HubsHome";

const description =
  "Concepta focus hubs for Generative UI, Governed AI Workflows, and Legacy Modernization — connected by one standard for reliable delivery.";

export const metadata: Metadata = {
  title: "Focus Hubs | Concepta",
  description,
  openGraph: {
    title: "Concepta Focus Hubs",
    description,
    images: ["/og_concepta.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Concepta Focus Hubs",
    description,
    images: ["/og_concepta.png"],
  },
};

export default function HubsPage() {
  return <HubsHome />;
}

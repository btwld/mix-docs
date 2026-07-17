import { ReadinessLanding } from "../../../../components/landing/voyager/readiness/ReadinessLanding";

const description =
  "A two-to-three-week engagement that grounds Voyager in your codebase, verifies your release gates, and turns evidence-backed findings into a clear, sequenced remediation plan.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Delivery Readiness Assessment — Know what's ready and what comes next.",
  description,
  applicationName: "Voyager",
  openGraph: {
    title: "Delivery Readiness Assessment — Know what's ready",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delivery Readiness Assessment — Know what's ready",
    description,
  },
};

export default function Page() {
  return <ReadinessLanding />;
}

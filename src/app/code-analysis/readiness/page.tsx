import { ReadinessLanding } from "../../../../components/landing/code-analysis/readiness/ReadinessLanding";

const description =
  "A two-to-three-week engagement: Concepta audits your codebase with Code Analysis, verifies your release gates, and hands you a graded verdict, evidence-backed findings, and a sequenced remediation plan.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Delivery Readiness Assessment — Know whether it's safe to ship.",
  description,
  applicationName: "Code Analysis",
  openGraph: {
    title: "Delivery Readiness Assessment by Concepta",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delivery Readiness Assessment by Concepta",
    description,
  },
};

export default function Page() {
  return <ReadinessLanding />;
}

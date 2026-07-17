import { CodeAnalysisLanding } from "../../../components/landing/code-analysis/CodeAnalysisLanding";

const description =
  "Code Analysis runs 10 static analyzers and a 7-phase AI audit pipeline over any repo — then hands you a four-dimension scorecard and a report you can put in front of a client.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Code Analysis — Audit any codebase. Get grades you can defend.",
  description,
  applicationName: "Code Analysis",
  openGraph: {
    title: "Code Analysis",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Analysis",
    description,
  },
};

export default function Page() {
  return <CodeAnalysisLanding />;
}

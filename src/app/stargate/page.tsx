import { StargateLanding } from "../../../components/landing/stargate/StargateLanding";

const description =
  "Stargate is a workflow system built on reusable component contracts: schemas define the ports, workflows are portable JSON graphs, and engines validate every boundary before and after each handler runs.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Stargate — Workflows as portable contracts.",
  description,
  applicationName: "Stargate",
  openGraph: {
    title: "Stargate by Concepta",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stargate by Concepta",
    description,
  },
};

export default function Page() {
  return <StargateLanding />;
}

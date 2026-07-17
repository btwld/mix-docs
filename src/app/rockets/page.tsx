import { RocketsLanding } from "../../../components/landing/rockets/RocketsLanding";

const description =
  "Rockets turns a typed backend definition into a secure, documented server with shared identity, swappable storage, generated CRUD, hooks, owner scoping, and OpenAPI.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Rockets — Your backend should be a spec.",
  description,
  applicationName: "Rockets",
  openGraph: {
    title: "Rockets",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rockets",
    description,
  },
};

export default function Page() {
  return <RocketsLanding />;
}

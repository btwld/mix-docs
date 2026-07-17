import { VoyagerLanding } from "../../../components/landing/voyager/VoyagerLanding";

const description =
  "Voyager turns an unfamiliar repository into a map you can navigate: how the system fits together, what deserves attention first, and a baseline that proves each fix made it better.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Voyager — See any codebase whole. Know it like you wrote it.",
  description,
  applicationName: "Voyager",
  openGraph: {
    title: "Voyager — See any codebase whole",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyager — See any codebase whole",
    description,
  },
};

export default function Page() {
  return <VoyagerLanding />;
}

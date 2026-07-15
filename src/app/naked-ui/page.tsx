import { NakedUiHome } from "../../../components/landing/naked-ui/NakedUiHome";

const description =
  "Headless Flutter primitives with semantics, keyboard support, focus management, overlays, and observable interaction state—with no imposed styling.";

export const viewport = {
  themeColor: "#05040A",
};

export const metadata = {
  title: "Naked UI — Headless Flutter components",
  description,
  applicationName: "Naked UI",
  icons: {
    icon: [{ url: "/assets/logo_naked_ui_sidebar.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Naked UI — Bring the look. The behavior is handled.",
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Naked UI — Headless Flutter components",
    description,
  },
};

export default function Page() {
  return <NakedUiHome />;
}

import { landingOgImage, OG_SIZE } from "../../../components/landing/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Stargate — Workflows as portable contracts.";

export default function Image() {
  return landingOgImage({
    wordmark: "stargate",
    title: "Your workflow is a contract.",
    tagline: "Author it. Validate it. Run it.",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.35)",
  });
}

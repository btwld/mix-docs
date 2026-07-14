import { landingOgImage, OG_SIZE } from "../../../components/landing/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Code Analysis — Audit any codebase. Get grades you can defend.";

export default function Image() {
  return landingOgImage({
    wordmark: "code-analysis",
    title: "Stop guessing your code's health.",
    tagline: "Audit it. Grade it. Prove it.",
    accent: "#00D3FF",
    glow: "rgba(0,211,255,0.35)",
  });
}

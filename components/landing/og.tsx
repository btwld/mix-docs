import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/* Shared OG card for the product landing pages. Satori (not the DOM) renders
   this JSX: every multi-child div needs an explicit display:flex, and only the
   bundled default font is available, so no mono wordmark here. */
export function landingOgImage({
  wordmark,
  title,
  tagline,
  accent,
  glow,
}: {
  wordmark: string;
  title: string;
  tagline: string;
  accent: string;
  glow: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          backgroundColor: "#05040A",
          backgroundImage: `radial-gradient(circle at 50% -10%, ${glow}, rgba(5,4,10,0) 60%)`,
          padding: "0 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 34,
            fontWeight: 700,
            color: accent,
            letterSpacing: -1,
          }}
        >
          {wordmark}
          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#A1A1AA",
              padding: "6px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            by Concepta
          </span>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: -3,
            textAlign: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: accent,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          {tagline}
        </div>
        <div style={{ fontSize: 24, color: "#A1A1AA", marginTop: 24 }}>
          conceptatech.com
        </div>
      </div>
    ),
    OG_SIZE
  );
}

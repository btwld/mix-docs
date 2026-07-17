"use client";

export const HeroBackground = () => {
  return (
    <div
      className="concepta-hero-background pointer-events-none absolute z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/concepta-hero-poster.jpg')",
        }}
      />

      <video
        className="concepta-hero-video absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assets/concepta-hero-poster.jpg"
        tabIndex={-1}
      >
        <source src="/assets/concepta-hero.mp4" type="video/mp4" />
      </video>

      <div
        className="concepta-hero-filter absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(42, 89, 255, 0.09), rgba(7, 27, 94, 0.14))",
        }}
      />

      {/* Keep the copy legible while preserving the movement and aqua detail. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(90deg, rgba(5, 4, 10, 0.9) 0%, rgba(5, 4, 10, 0.64) 48%, rgba(5, 4, 10, 0.25) 100%)",
            "radial-gradient(circle at 72% 24%, rgba(58, 91, 255, 0.24) 0%, rgba(58, 91, 255, 0.08) 38%, transparent 66%)",
            "linear-gradient(180deg, rgba(5, 4, 10, 0.06) 0%, rgba(7, 11, 28, 0.2) 56%, #070b1c 100%)",
          ].join(", "),
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "40px 40px",
        }}
      />

      <style jsx>{`
        .concepta-hero-background {
          left: 50%;
          top: -96px;
          width: 100vw;
          height: max(980px, 115svh);
          max-height: 1100px;
          transform: translateX(-50%);
          background: #05040a;
          -webkit-mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 62%,
            rgba(0, 0, 0, 0.82) 72%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 62%,
            rgba(0, 0, 0, 0.82) 72%,
            transparent 100%
          );
        }

        .concepta-hero-video {
          opacity: 0.78;
        }

        @media (prefers-reduced-motion: reduce) {
          .concepta-hero-video {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

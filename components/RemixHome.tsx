"use client";

import { motion } from "framer-motion";

export const RemixHome = () => {
  return (
    <>
      {/* Background — green radial glow + grid */}
      <div className="pointer-events-none fixed inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(0, 235, 3, 0.18) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: [
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="remix-landing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="remix-landing-inner"
        >
          <img
            src="/assets/logo_remix_sidebar.png"
            alt="Remix"
            className="remix-logo"
          />
          <p className="remix-tagline">Coming soon</p>
        </motion.div>
      </div>

      <style jsx global>{`
        .remix-landing {
          position: relative;
          z-index: 10;
          display: flex;
          min-height: calc(100vh - 160px);
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .remix-landing-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .remix-logo {
          height: 96px;
          width: auto;
          filter: drop-shadow(0 0 24px rgba(0, 235, 3, 0.25));
        }
        .remix-tagline {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--mix-accent);
        }
      `}</style>
    </>
  );
};

"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "../HeroBackground";
import Layout from "../Layout";
import { ProductionGapCard } from "./ProductionGapCard";

const reveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
};

export function ReportsHome() {
  return (
    <>
      <HeroBackground />
      <Layout>
        <main className="reports-main relative z-10">
          <motion.header className="reports-header" {...reveal}>
            <span className="reports-kicker">Concepta research</span>
            <h1>Evidence for the work between build and release.</h1>
            <p>
              Field research for technology leaders responsible for systems
              that have to ship, hold up under pressure, and keep working after
              launch.
            </p>
          </motion.header>

          <motion.section
            aria-labelledby="featured-report"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.25, 0.4, 0.25, 1] as const,
            }}
          >
            <h2 id="featured-report" className="sr-only">
              Featured report
            </h2>
            <ProductionGapCard />
          </motion.section>

          <motion.aside
            className="reports-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>Why this research exists</span>
            <p>
              AI can compress a task without compressing the system around it.
              We publish the evidence behind that distinction — and the
              practical controls that keep faster work from becoming a larger
              queue.
            </p>
          </motion.aside>
        </main>
      </Layout>

      <style jsx global>{`
        .reports-main {
          padding: 76px 0 96px;
        }

        .reports-header {
          max-width: 760px;
          margin-bottom: 58px;
        }

        .reports-kicker,
        .reports-note > span {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          color: #00ebbc;
        }

        .reports-header h1 {
          margin-top: 16px;
          color: #fff;
          font-size: clamp(2.65rem, 7vw, 5.5rem);
          font-weight: 700;
          letter-spacing: -0.055em;
          line-height: 0.98;
          text-wrap: balance;
        }

        .reports-header p {
          max-width: 620px;
          margin-top: 24px;
          color: var(--mix-text-muted);
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .reports-note {
          display: grid;
          grid-template-columns: minmax(160px, 0.55fr) minmax(0, 1.45fr);
          gap: 40px;
          margin-top: 46px;
          padding-top: 30px;
          border-top: 1px solid var(--mix-border-card);
        }

        .reports-note p {
          max-width: 610px;
          margin: 0;
          color: var(--mix-text-muted);
          font-size: 0.9375rem;
          line-height: 1.7;
        }

        @media (max-width: 640px) {
          .reports-main {
            padding: 46px 0 72px;
          }

          .reports-header {
            margin-bottom: 40px;
          }

          .reports-note {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </>
  );
}

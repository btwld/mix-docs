"use client";

import { motion } from "framer-motion";
import { staggerParent, staggerChild } from "../motion";
import type { LandingContent } from "../types";

export function Stats({ stats }: { stats: LandingContent["stats"] }) {
  return (
    <section className="lp-shell lp-gap-sm">
      <motion.div
        className="lp-stats"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {stats.map((s) => (
          <motion.div key={s.label} className="lp-stat" variants={staggerChild}>
            <span className="lp-stat-value">{s.value}</span>
            <span className="lp-stat-label">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

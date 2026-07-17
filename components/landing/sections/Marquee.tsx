"use client";

import { motion } from "framer-motion";
import { LandingCtaButton } from "../LandingButton";
import { reveal } from "../motion";
import type { LandingContent } from "../types";

export function Marquee({ marquee }: { marquee: LandingContent["marquee"] }) {
  return (
    <section className="lp-gap-sm lp-marquee-section">
      <div className="lp-marquee" aria-hidden="true">
        <div className="lp-marquee-track">
          {[...marquee.rowA, ...marquee.rowA].map((name, i) => (
            <span key={name + i} className="lp-chip">
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="lp-marquee lp-marquee-rev" aria-hidden="true">
        <div className="lp-marquee-track">
          {[...marquee.rowB, ...marquee.rowB].map((name, i) => (
            <span key={name + i} className="lp-chip">
              {name}
            </span>
          ))}
        </div>
      </div>
      <motion.div className="lp-shell lp-center" {...reveal}>
        <LandingCtaButton cta={marquee.cta} />
      </motion.div>
    </section>
  );
}

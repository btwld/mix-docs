"use client";

import { motion } from "framer-motion";
import { LandingCtaButton } from "../LandingButton";
import { reveal } from "../motion";
import type { LandingContent, LandingCta } from "../types";

const DEFAULT_MARQUEE_CTA: LandingCta = {
  label: "Get early access",
  href: "#waitlist",
  variant: "ghost",
  arrow: "right",
};

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
        <LandingCtaButton cta={marquee.cta ?? DEFAULT_MARQUEE_CTA} />
      </motion.div>
    </section>
  );
}

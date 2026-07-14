"use client";

import { motion } from "framer-motion";
import { reveal } from "../motion";
import { WaitlistForm } from "../WaitlistForm";
import type { LandingContent } from "../types";

export function ClosingCta({
  closingCta,
  product,
}: {
  closingCta: LandingContent["closingCta"];
  product: LandingContent["product"];
}) {
  return (
    <section className="lp-shell lp-gap" id="waitlist">
      <motion.div className="lp-cta-card" {...reveal}>
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-title">{closingCta.title}</h2>
        <p className="lp-cta-lead">{closingCta.lead}</p>
        <WaitlistForm product={product} />
        <div className="lp-cta-links">
          <a href="https://conceptatech.com" target="_blank" rel="noreferrer">
            Concepta ↗
          </a>
          <span aria-hidden="true">·</span>
          <span className="lp-cta-fine">{closingCta.finePrint}</span>
        </div>
      </motion.div>
    </section>
  );
}

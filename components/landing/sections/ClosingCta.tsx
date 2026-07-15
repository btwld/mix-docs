"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { reveal } from "../motion";
import { WaitlistForm } from "../WaitlistForm";
import type { LandingContent } from "../types";

export function ClosingCta({
  closingCta,
  product,
  Visual,
}: {
  closingCta: LandingContent["closingCta"];
  product: LandingContent["product"];
  Visual?: ComponentType;
}) {
  return (
    <section className="lp-shell lp-gap" id="waitlist">
      <motion.div className="lp-cta-card" {...reveal}>
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-title">{closingCta.title}</h2>
        <p className="lp-cta-lead">{closingCta.lead}</p>
        <WaitlistForm product={product} />
        {Visual ? <Visual /> : null}
        <div className="lp-cta-links">
          <Link href="/" className="lp-cta-concepta" aria-label="Concepta home">
            <img src="/assets/logo_concepta.svg" alt="Concepta" />
          </Link>
          <span aria-hidden="true">·</span>
          <span className="lp-cta-fine">{closingCta.finePrint}</span>
        </div>
      </motion.div>
    </section>
  );
}

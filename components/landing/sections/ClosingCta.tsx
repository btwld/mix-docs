"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LandingCtaButton } from "../LandingButton";
import { reveal } from "../motion";
import { WaitlistForm } from "../WaitlistForm";
import type { LandingContent, ProductSlug } from "../types";

export function ClosingCta({
  closingCta,
  product,
  Visual,
}: {
  closingCta: LandingContent["closingCta"];
  product?: ProductSlug;
  Visual?: ComponentType;
}) {
  const action = closingCta.action;
  const waitlistProduct = action?.kind === "waitlist" ? action.product : product;

  return (
    <section className="lp-shell lp-gap" id={closingCta.anchor ?? "waitlist"}>
      <motion.div className="lp-cta-card" {...reveal}>
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-title">{closingCta.title}</h2>
        <p className="lp-cta-lead">{closingCta.lead}</p>
        {action?.kind === "links" ? (
          <div className="lp-cta-row">
            {action.links.map((cta) => (
              <LandingCtaButton key={`${cta.label}-${cta.href}`} cta={cta} />
            ))}
          </div>
        ) : waitlistProduct ? (
          <WaitlistForm product={waitlistProduct} />
        ) : null}
        {Visual ? <Visual /> : null}
        <div className="lp-cta-links">
          {closingCta.showConceptaBrand !== false ? (
            <>
              <Link
                href="/"
                className="lp-cta-concepta"
                aria-label="Concepta home"
              >
                <img src="/assets/logo_concepta.svg" alt="Concepta" />
              </Link>
              <span aria-hidden="true">·</span>
            </>
          ) : null}
          <span className="lp-cta-fine">{closingCta.finePrint}</span>
        </div>
      </motion.div>
    </section>
  );
}

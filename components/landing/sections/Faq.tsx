"use client";

import { motion } from "framer-motion";
import { SectionHead } from "../SectionHead";
import { reveal } from "../motion";
import type { LandingContent } from "../types";

export function Faq({ faq }: { faq: LandingContent["faq"] }) {
  return (
    <section className="lp-shell lp-gap" id="faq">
      <SectionHead eyebrow="FAQ" title="Questions, answered." />
      <motion.div className="lp-faq" {...reveal}>
        {faq.map((item) => (
          <details key={item.q} className="lp-faq-item">
            <summary>
              {item.q}
              <span className="lp-faq-icon" aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </motion.div>
    </section>
  );
}

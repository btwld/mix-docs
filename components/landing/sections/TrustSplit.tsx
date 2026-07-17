"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHead } from "../SectionHead";
import { HighlightedCode } from "../HighlightedCode";
import { LandingCtaButton } from "../LandingButton";
import { EASE, reveal } from "../motion";
import type { LandingContent } from "../types";

export function TrustSplit({
  trustSplit,
}: {
  trustSplit: LandingContent["trustSplit"];
}) {
  return (
    <section className="lp-shell lp-gap" id="trust">
      <div className="lp-split">
        <div>
          <SectionHead
            align="left"
            eyebrow={trustSplit.eyebrow}
            title={trustSplit.title}
            lead={trustSplit.lead}
          />
          <ul className="lp-checklist">
            {trustSplit.bullets.map((bullet) => (
              <li key={bullet}>
                <Sparkles size={15} strokeWidth={2.2} /> {bullet}
              </li>
            ))}
          </ul>
          <motion.div className="lp-left-cta" {...reveal}>
            <LandingCtaButton cta={trustSplit.cta} />
          </motion.div>
        </div>

        <motion.div
          className="lp-code-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <div className="lp-window-bar lp-window-bar-plain">
            <div className="lp-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <em className="lp-window-file">{trustSplit.snippetFile}</em>
          </div>
          <div className="lp-code-card-body">
            <HighlightedCode
              code={trustSplit.snippet}
              lang={trustSplit.snippetLang ?? "json"}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

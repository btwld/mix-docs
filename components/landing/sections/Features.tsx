"use client";

import { motion } from "framer-motion";
import { SectionHead } from "../SectionHead";
import { staggerParent, staggerChild } from "../motion";
import type { LandingContent } from "../types";

export function Features({ features }: { features: LandingContent["features"] }) {
  return (
    <section className="lp-shell lp-gap" id="how">
      <SectionHead
        eyebrow={features.eyebrow}
        title={features.title}
        lead={features.lead}
      />

      <motion.div
        className="lp-features"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.items.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              variants={staggerChild}
              className={"lp-feature" + (f.wide ? " lp-feature-wide" : "")}
            >
              <span className="lp-feature-icon">
                <Icon size={20} strokeWidth={1.9} />
              </span>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-body">{f.body}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

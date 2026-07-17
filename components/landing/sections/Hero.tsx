"use client";

import { motion } from "framer-motion";
import { LandingButton } from "../LandingButton";
import { Wordmark } from "../Wordmark";
import { EASE, fadeUp } from "../motion";
import type { LandingContent } from "../types";

export function Hero({ content }: { content: LandingContent }) {
  const { HeroWindow } = content;
  return (
    <section className="lp-shell lp-hero" id="top">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.92, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Wordmark
          name={content.wordmarkName}
          showByline={content.wordmarkShowByline}
        />
      </motion.div>

      <motion.h1
        className="lp-hero-title"
        initial="hidden"
        animate="visible"
        custom={0.08}
        variants={fadeUp}
      >
        {content.hero.titleTop}
        <br />
        <span className="lp-gradient-text">{content.hero.titleGradient}</span>
      </motion.h1>

      <motion.p
        className="lp-hero-sub"
        initial="hidden"
        animate="visible"
        custom={0.18}
        variants={fadeUp}
      >
        {content.hero.lead}
      </motion.p>

      <motion.div
        className="lp-hero-cta"
        initial="hidden"
        animate="visible"
        custom={0.28}
        variants={fadeUp}
      >
        <LandingButton href="#waitlist" arrow="right">
          Join the waitlist
        </LandingButton>
        <LandingButton href="#how" variant="secondary">
          See how it works
        </LandingButton>
      </motion.div>

      <HeroWindow />
    </section>
  );
}

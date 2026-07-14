"use client";

import { MotionConfig } from "framer-motion";
import "./landing.css";
import { Aurora } from "./sections/Aurora";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { Statement } from "./sections/Statement";
import { Features } from "./sections/Features";
import { Marquee } from "./sections/Marquee";
import { TrustSplit } from "./sections/TrustSplit";
import { Faq } from "./sections/Faq";
import { ClosingCta } from "./sections/ClosingCta";
import type { LandingContent } from "./types";

export function LandingRoot({ content }: { content: LandingContent }) {
  const { OutputsBento } = content;
  return (
    <MotionConfig reducedMotion="user">
      <main className="lp-root" data-pagefind-ignore>
        <Aurora />
        <Hero content={content} />
        <Stats stats={content.stats} />
        <Statement>{content.statement}</Statement>
        <Features features={content.features} />
        <OutputsBento />
        <Marquee marquee={content.marquee} />
        <TrustSplit trustSplit={content.trustSplit} />
        <Faq faq={content.faq} />
        <ClosingCta closingCta={content.closingCta} product={content.product} />
      </main>
    </MotionConfig>
  );
}

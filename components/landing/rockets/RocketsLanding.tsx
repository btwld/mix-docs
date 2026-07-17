"use client";

import { MotionConfig } from "framer-motion";
import "../landing.css";
import { Aurora } from "../sections/Aurora";
import { ClosingCta } from "../sections/ClosingCta";
import { Faq } from "../sections/Faq";
import { Hero } from "../sections/Hero";
import { rocketsContent } from "./content";
import { OwnershipBoundary } from "./OwnershipBoundary";
import { ProviderSpotlights } from "./ProviderSpotlights";
import { ServerSurface } from "./ServerSurface";

export function RocketsLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="lp-root lp-rockets-root" data-pagefind-ignore>
        <Aurora />
        <Hero content={rocketsContent} />
        <ServerSurface />
        <ProviderSpotlights />
        <OwnershipBoundary />
        <Faq faq={rocketsContent.faq} />
        <ClosingCta closingCta={rocketsContent.closingCta} />
      </main>
    </MotionConfig>
  );
}

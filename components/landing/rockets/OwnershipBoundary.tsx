"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionHead } from "../SectionHead";
import { staggerChild, staggerParent } from "../motion";

const FOUNDATION = [
  "resource registration and API routes",
  "identity, storage, and access seams",
  "validation, hooks, and OpenAPI",
] as const;

const PRODUCT = [
  "domain schemas and business rules",
  "services, integrations, and events",
  "the operational choices that make it yours",
] as const;

function BoundaryCard({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <motion.article
      className={"lp-boundary-card" + (accent ? " is-accent" : "")}
      variants={staggerChild}
    >
      <div className="lp-boundary-card-head">
        {accent ? (
          <Sparkles size={17} strokeWidth={2.1} aria-hidden="true" />
        ) : (
          <Check size={17} strokeWidth={2.3} aria-hidden="true" />
        )}
        <h3>{title}</h3>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.article>
  );
}

export function OwnershipBoundary() {
  return (
    <section className="lp-shell lp-gap lp-ownership" id="ownership">
      <SectionHead
        eyebrow="A deliberate boundary"
        title="The foundation is repeatable. The product is not."
        lead="Rockets removes recurring infrastructure work while leaving domain behavior explicit, testable, and owned by your team."
      />

      <motion.div
        className="lp-ownership-grid"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <BoundaryCard title="Rockets builds the foundation" items={FOUNDATION} accent />
        <BoundaryCard title="Your team builds the product" items={PRODUCT} />
      </motion.div>
    </section>
  );
}

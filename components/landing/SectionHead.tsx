"use client";

import { motion } from "framer-motion";
import { reveal } from "./motion";

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      className={"lp-head" + (align === "left" ? " lp-head-left" : "")}
      {...reveal}
    >
      {eyebrow && <span className="lp-eyebrow">{eyebrow}</span>}
      <h2 className="lp-title">{title}</h2>
      {lead && <p className="lp-lead">{lead}</p>}
    </motion.div>
  );
}

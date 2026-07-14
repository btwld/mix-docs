"use client";

import { motion } from "framer-motion";
import { reveal } from "../motion";
import type { ReactNode } from "react";

export function Statement({ children }: { children: ReactNode }) {
  return (
    <section className="lp-shell lp-gap">
      <motion.p className="lp-statement" {...reveal}>
        {children}
      </motion.p>
    </section>
  );
}

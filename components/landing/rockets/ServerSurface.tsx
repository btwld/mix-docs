"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Database,
  FileJson2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHead } from "../SectionHead";
import { staggerChild, staggerParent } from "../motion";

const CAPABILITIES = [
  {
    key: "resources",
    title: "Resource APIs",
    detail: "routes · validation · relationships · hooks",
    icon: Boxes,
  },
  {
    key: "auth",
    title: "Identity",
    detail: "protected endpoints · one AuthorizedUser",
    icon: KeyRound,
  },
  {
    key: "repository",
    title: "Persistence",
    detail: "one default · per-resource overrides",
    icon: Database,
  },
  {
    key: "accessControl",
    title: "Policy",
    detail: "ownership · roles · operation rules",
    icon: ShieldCheck,
  },
  {
    key: "openapi",
    title: "OpenAPI",
    detail: "a documented surface from the same definition",
    icon: FileJson2,
  },
] as const satisfies readonly {
  key: string;
  title: string;
  detail: string;
  icon: LucideIcon;
}[];

export function ServerSurface() {
  return (
    <section className="lp-shell lp-gap lp-rockets-surface" id="server-surface">
      <SectionHead
        eyebrow="Configuration becomes capability"
        title="One call. A complete server."
        lead="createServer reads one typed domain definition and assembles the secure, documented foundation around the code only your team can write."
      />

      <motion.div
        className="lp-server-capabilities"
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {CAPABILITIES.map(({ key, title, detail, icon: Icon }) => (
          <motion.article
            className="lp-server-capability"
            key={key}
            variants={staggerChild}
          >
            <div className="lp-server-capability-head">
              <Icon size={17} strokeWidth={2.1} aria-hidden="true" />
              <code>{key}</code>
            </div>
            <h3>{title}</h3>
            <p>{detail}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

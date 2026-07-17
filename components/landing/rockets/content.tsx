import type { LandingContent, LandingHeroContent } from "../types";
import { HeroWindow } from "./HeroWindow";

const REPOSITORY_URL = "https://github.com/btwld/rockets";
const README_URL = REPOSITORY_URL + "#readme";

type RocketsContent = LandingHeroContent &
  Pick<LandingContent, "faq" | "closingCta">;

export const rocketsContent: RocketsContent = {
  wordmarkName: "rockets",
  wordmarkShowByline: false,
  hero: {
    titleTop: "Your backend should be a spec.",
    titleGradient: "Rockets makes it run.",
    lead:
      "Describe your domain—resources, identity, storage, and access. Rockets turns that definition into a secure, documented server with the repeatable foundation already wired.",
    primaryCta: {
      label: "Explore on GitHub",
      href: REPOSITORY_URL,
      arrow: "right",
      external: true,
    },
    secondaryCta: {
      label: "See createServer",
      href: "#server-surface",
      variant: "secondary",
    },
  },
  HeroWindow,
  faq: [
    {
      q: "What is Rockets?",
      a: "Rockets is an open-source backend definition and runtime. Describe the resources, identity, persistence, and access rules for one domain, then launch a server with the repeatable application foundation already assembled.",
    },
    {
      q: "What does createServer() create?",
      a: "It turns one typed configuration into registered resources, protected endpoints, persistence, policy, hooks, and OpenAPI. createServer is the launch-facing API; pre-1.0 packages may still expose lower-level registration surfaces while that facade lands.",
    },
    {
      q: "Does Rockets generate source code?",
      a: "No. Rockets materializes the server at runtime, so generated glue files do not become another codebase for your team to maintain.",
    },
    {
      q: "Can identity and storage providers be replaced?",
      a: "Yes. Authentication and persistence sit behind small contracts. Choose the shipped providers, order multiple identity strategies, or bring an adapter that meets the same application-facing interface.",
    },
    {
      q: "What application code do I still write?",
      a: "The parts that make the product yours: domain schemas, business rules, services, integrations, events, and operational decisions. Rockets owns the repeatable foundation around that behavior.",
    },
    {
      q: "Is Rockets stable?",
      a: "Rockets is pre-1.0 and published under the alpha dist-tag. Pin exact versions for production use and expect the public surface to keep tightening on the path to 1.0.",
    },
  ],
  closingCta: {
    title: "Define the backend. Launch the server.",
    lead: "Start with one typed domain definition and turn it into a secure, documented server your team can extend.",
    finePrint: "BSD-3-Clause · TypeScript · pre-1.0",
    anchor: "start",
    action: {
      kind: "links",
      links: [
        {
          label: "View the repository",
          href: REPOSITORY_URL,
          arrow: "right",
          external: true,
        },
        {
          label: "Read the guide",
          href: README_URL,
          variant: "secondary",
          external: true,
        },
      ],
    },
  },
};

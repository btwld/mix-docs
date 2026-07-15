import type { ComponentType, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/* "readiness" is a service lead pipe, not a landing product — it shares the
   waitlist/Resend mechanism but has no LandingContent page of its own. */
export type ProductSlug = "stargate" | "code-analysis" | "readiness";

export interface LandingContent {
  product: ProductSlug;
  wordmarkName: string;
  hero: {
    titleTop: ReactNode;
    titleGradient: ReactNode;
    lead: ReactNode;
  };
  /** Per-product hero visual rendered below the CTA row. */
  HeroWindow: ComponentType;
  stats: { value: string; label: string }[];
  /** Full statement paragraph, including the gradient span. */
  statement: ReactNode;
  features: {
    eyebrow: string;
    title: ReactNode;
    lead?: ReactNode;
    items: { icon: LucideIcon; title: string; body: string; wide?: boolean }[];
  };
  /** Per-product outputs/surfaces bento section. */
  OutputsBento: ComponentType;
  marquee: { rowA: string[]; rowB: string[] };
  trustSplit: {
    eyebrow: string;
    title: ReactNode;
    lead?: ReactNode;
    bullets: string[];
    ctaLabel: string;
    snippet: string;
    snippetFile: string;
  };
  faq: { q: string; a: ReactNode }[];
  closingCta: { title: string; lead: string; finePrint: string };
}

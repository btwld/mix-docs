import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HubDetail } from "../../../../components/hubs/HubDetail";
import { HUB_BY_SLUG, HUBS, type HubSlug } from "../../../../components/hubs/hubData";

type HubPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HUBS.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = HUB_BY_SLUG[slug as HubSlug];

  if (!hub) return {};

  const title = `${hub.title} ${hub.accentTitle} | Concepta`;

  return {
    title,
    description: hub.descriptor,
    openGraph: {
      title,
      description: hub.descriptor,
      images: ["/og_concepta.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: hub.descriptor,
      images: ["/og_concepta.png"],
    },
  };
}

export default async function HubPage({ params }: HubPageProps) {
  const { slug } = await params;
  const hub = HUB_BY_SLUG[slug as HubSlug];

  if (!hub) notFound();

  return <HubDetail hub={hub} />;
}

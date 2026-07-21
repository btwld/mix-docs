import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HUBS } from "./hubData";

export function HubsPreview() {
  return (
    <section id="hubs" className="section-gap concepta-hubs-preview">
      <div className="section-header">
        <span className="mono-label">Concepta focus hubs</span>
        <h2 className="section-title">Three problems worth organizing around.</h2>
        <p className="mt-4 max-w-[600px] text-base leading-relaxed text-[var(--mix-text-muted)]">
          Research, products, and open source grouped by the enterprise problem
          they solve — connected by one standard for reliable delivery.
        </p>
      </div>
      <div className="concepta-hubs-preview__list">
        {HUBS.map((hub) => (
          <Link
            href={`/hubs/${hub.slug}`}
            key={hub.slug}
            style={{
              "--hub-accent": hub.accent,
              "--hub-accent-soft": hub.accentSoft,
            } as React.CSSProperties}
          >
            <span>{hub.label}</span>
            <h3>{hub.title} {hub.accentTitle}</h3>
            <p>{hub.descriptor}</p>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        ))}
      </div>
      <Link className="concepta-hubs-preview__all" href="/hubs">
        See how the hubs fit together <ArrowRight aria-hidden="true" size={17} />
      </Link>
    </section>
  );
}

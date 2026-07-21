import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "../HeroBackground";
import { HubSignal } from "./HubSignal";
import { HUBS } from "./hubData";

export function HubsHome() {
  return (
    <div className="hubs-experience">
      <HeroBackground />
      <main className="hubs-shell">
        <header className="hubs-hero">
          <div>
            <span className="hub-kicker">Concepta focus hubs</span>
            <h1>
              Three focused problems.
              <em>One standard for what ships.</em>
            </h1>
          </div>
          <div className="hubs-hero__aside">
            <p>
              The hubs organize Concepta&apos;s research, products, open source,
              and delivery practice around the problems technology leaders
              actually own.
            </p>
            <div className="hubs-standard">
              <span>Shared standard</span>
              <strong>Reliable delivery</strong>
              <small>Evidence · authority · release ownership</small>
            </div>
          </div>
        </header>

        <section className="hubs-directory" aria-label="Concepta focus hubs">
          {HUBS.map((hub) => (
            <article
              key={hub.slug}
              className={`hub-directory-entry hub-directory-entry--${hub.visual}`}
              style={{
                "--hub-accent": hub.accent,
                "--hub-accent-soft": hub.accentSoft,
              } as React.CSSProperties}
            >
              <div className="hub-directory-entry__copy">
                <span className="hub-directory-entry__label">{hub.label}</span>
                <h2>
                  {hub.title} <em>{hub.accentTitle}</em>
                </h2>
                <p>{hub.descriptor}</p>
                <Link href={`/hubs/${hub.slug}`}>
                  Explore the hub <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
              <HubSignal visual={hub.visual} compact />
            </article>
          ))}
        </section>

        <aside className="hubs-foundation">
          <span>How the portfolio fits</span>
          <p>
            Hubs define the market problem. Products and open-source projects
            prove the implementation. Reports make the argument. Reliable
            delivery connects all three.
          </p>
          <Link href="/#projects">See the delivery foundation</Link>
        </aside>
      </main>
    </div>
  );
}

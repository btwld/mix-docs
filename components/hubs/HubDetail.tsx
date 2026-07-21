import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroBackground } from "../HeroBackground";
import { HubSignal } from "./HubSignal";
import type { Hub } from "./hubData";

export function HubDetail({ hub }: { hub: Hub }) {
  return (
    <div
      className="hubs-experience hub-detail"
      data-hub-visual={hub.visual}
      style={{
        "--hub-accent": hub.accent,
        "--hub-accent-soft": hub.accentSoft,
      } as React.CSSProperties}
    >
      <HeroBackground />
      <main className="hubs-shell">
        <nav className="hub-breadcrumb" aria-label="Breadcrumb">
          <Link href="/hubs">
            <ArrowLeft aria-hidden="true" size={14} /> Focus hubs
          </Link>
          <span>{hub.label}</span>
        </nav>

        <header className="hub-detail-hero">
          <div className="hub-detail-hero__copy">
            <span className="hub-kicker">{hub.label}</span>
            <h1>
              {hub.title}
              <em>{hub.accentTitle}</em>
            </h1>
            <p className="hub-detail-hero__descriptor">{hub.descriptor}</p>
          </div>
          <HubSignal visual={hub.visual} />
          <p className="hub-detail-hero__thesis">{hub.thesis}</p>
          <p className="hub-detail-hero__introduction">{hub.introduction}</p>
        </header>

        <nav className="hub-section-nav" aria-label={`${hub.title} hub sections`}>
          <span>Inside this hub</span>
          <Link href="#scope">Boundary</Link>
          {hub.visual === "interface" && <Link href="#contract">UI contract</Link>}
          <Link href="#model">Operating model</Link>
          <Link href="#portfolio">Projects</Link>
          {hub.report && <Link href="#research">Research</Link>}
        </nav>

        <section id="scope" className="hub-scope" aria-labelledby="hub-scope-title">
          <header className="hub-section-head">
            <span>Scope</span>
            <h2 id="hub-scope-title">A useful boundary.</h2>
          </header>
          <div className="hub-scope-grid">
            <div>
              <h3>This hub owns</h3>
              <ul>
                {hub.owns.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3>This hub does not own</h3>
              <ul>
                {hub.doesNotOwn.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {hub.visual === "interface" && (
          <section id="contract" className="hub-genui-interlude" aria-labelledby="hub-genui-interlude-title">
            <div className="hub-genui-interlude__copy">
              <span>Inside the contract</span>
              <h2 id="hub-genui-interlude-title">The interface changes. Authority cannot.</h2>
              <p>
                Generative UI works when composition is flexible but the product
                remains explicit about vocabulary, state, and permitted action.
              </p>
              <dl>
                <div><dt>Vocabulary</dt><dd>Approved components and semantics</dd></div>
                <div><dt>State</dt><dd>Resolved and retained by the host</dd></div>
                <div><dt>Action</dt><dd>Allowed only through known capabilities</dd></div>
              </dl>
            </div>
            <blockquote className="hub-genui-interlude__statement">
              <span>Variable</span>
              <strong>Surface</strong>
              <i>inside a</i>
              <span>Stable</span>
              <strong>Contract</strong>
            </blockquote>
          </section>
        )}

        <section id="model" className="hub-model" aria-labelledby="hub-model-title">
          <header className="hub-section-head hub-section-head--split">
            <div>
              <span>Operating model</span>
              <h2 id="hub-model-title">{hub.modelHeading}</h2>
            </div>
            <p>{hub.modelIntroduction}</p>
          </header>
          <ol className="hub-model-grid">
            {hub.model.map((step) => (
              <li key={step.label}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="portfolio" className="hub-portfolio" aria-labelledby="hub-portfolio-title">
          <header className="hub-section-head hub-section-head--split">
            <div>
              <span>Portfolio evidence</span>
              <h2 id="hub-portfolio-title">{hub.portfolioHeading}</h2>
            </div>
            <p>{hub.portfolioIntroduction}</p>
          </header>
          <div className="hub-project-grid">
            {hub.projects.map((project) => {
              const external = project.href.startsWith("http");
              return (
                <Link
                  key={project.name}
                  href={project.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="hub-project"
                >
                  <span>{project.mode}</span>
                  <h3>{project.name}</h3>
                  <p>{project.role}</p>
                  <ArrowUpRight aria-hidden="true" size={18} />
                </Link>
              );
            })}
          </div>
        </section>

        {hub.report && (
          <section id="research" className="hub-report" aria-labelledby="hub-report-title">
            <div>
              <span>{hub.report.eyebrow}</span>
              <h2 id="hub-report-title">{hub.report.title}</h2>
            </div>
            <div>
              <p>{hub.report.body}</p>
              <Link href={hub.report.href}>
                Read the interactive report <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </section>
        )}

        <section className="hub-closing">
          <span>Reliable delivery</span>
          <h2>The work is only useful when it holds up in production.</h2>
          <p>
            Start with the workflow, system, or release that carries real
            consequence. We&apos;ll identify the evidence, decisions, and controls
            it needs before the implementation expands.
          </p>
          <Link href="/code-analysis/readiness">
            Get a Delivery Readiness Assessment <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </section>
      </main>
    </div>
  );
}

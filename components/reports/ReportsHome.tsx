"use client";

import { HeroBackground } from "../HeroBackground";
import { ReportCard } from "./ReportCard";

export function ReportsHome() {
  return (
    <>
      <HeroBackground />
      <main className="reports-main relative z-10">
        <header className="reports-header">
          <span className="reports-kicker">Concepta reports</span>
          <h1>Research for work that has to hold up.</h1>
          <p>
            Field guides for technology leaders adopting AI without losing
            control of delivery, interface, or consequential decisions.
          </p>
        </header>

        <section className="reports-library" aria-labelledby="reports-library-title">
          <div className="reports-library__head">
            <h2 id="reports-library-title">The reports</h2>
            <p>Read online · Interactive · Evidence-backed</p>
          </div>

          <div className="reports-library__list">
            <ReportCard
              href="/reports/production-gap"
              title="The production"
              titleAccent="gap"
              topic="AI & delivery"
              description="Why AI makes building faster and shipping harder — and what technology leaders can do about it."
              thesis="Build speed is not release speed."
              readingTime="18 minute read"
              references="12 primary sources"
              image="/reports/production-gap/assets/production-gap-editorial-hero-retina-v2.webp"
              imageAlt="A stream of blue work units narrows through a production review gate."
              imagePosition="64% center"
              variant="production"
            />

            <ReportCard
              href="/reports/generative-ui"
              title="Generative UI"
              titleAccent="for the enterprise"
              topic="Enterprise AI & interaction"
              description="A practical operating model for adaptive interfaces that preserve policy, state, evidence, and human authority."
              thesis="The interface can change. Authority cannot."
              readingTime="14 minute read"
              references="12 primary references"
              image="/reports/generative-ui/assets/genui-enterprise/genui-contract-hero-teal.webp"
              imageAlt="A stable white frame contains composed blue interface modules and a teal approval control."
              imagePosition="64% center"
              reverse
              variant="genui"
            />
          </div>
        </section>

        <aside className="reports-principle">
          <span>One operating principle</span>
          <p>
            AI may change the pace and shape of the work. The system still has
            to preserve accountability from request to outcome.
          </p>
        </aside>
      </main>

      <style jsx global>{`
        html[data-product="concepta"] .concepta-hero-background {
          left: 0;
          width: 100%;
          transform: none;
        }

        .reports-main {
          width: min(100% - 32px, 1320px);
          margin-inline: auto;
          padding: 88px 0 112px;
        }

        .reports-header {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
          align-items: end;
          gap: 64px;
          margin-bottom: 80px;
        }

        .reports-kicker,
        .reports-library__head p,
        .reports-principle > span,
        .report-entry__topic,
        .report-entry__footer > span {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
        }

        .reports-kicker,
        .reports-principle > span {
          color: #00d9ad;
        }

        .reports-header h1 {
          grid-column: 1;
          margin-top: 16px;
          color: #fff;
          font-family: Iowan Old Style, Baskerville, Georgia, serif;
          font-size: clamp(3.15rem, 7.3vw, 6.8rem);
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 0.9;
          text-wrap: balance;
        }

        .reports-header p {
          grid-column: 2;
          grid-row: 1 / span 2;
          max-width: 450px;
          margin-bottom: 7px;
          color: var(--mix-text-muted);
          font-size: 1.05rem;
          line-height: 1.72;
        }

        .reports-library__head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        }

        .reports-library__head h2 {
          margin: 0;
          color: #fff;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .reports-library__head p {
          margin: 0;
          color: rgba(255, 255, 255, 0.38);
          font-size: 9px;
        }

        .reports-library__list {
          display: grid;
          gap: 28px;
          padding-top: 28px;
        }

        .report-entry {
          --report-accent: #00d9ad;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 12px;
          background: #070a1b;
          transition: border-color 180ms ease, transform 180ms ease;
        }

        .report-entry--production {
          --report-accent: #00e0b5;
        }

        .report-entry--genui {
          --report-accent: #51e5bd;
        }

        .report-entry:hover {
          border-color: color-mix(in srgb, var(--report-accent) 42%, transparent);
          transform: translateY(-2px);
        }

        .report-entry__link {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          min-height: 470px;
          color: inherit;
        }

        .report-entry--reverse .report-entry__copy {
          order: 2;
        }

        .report-entry--reverse .report-entry__visual {
          order: 1;
        }

        .report-entry__copy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(38px, 5vw, 68px);
          background: #070a1b;
        }

        .report-entry__topic {
          color: var(--report-accent);
          font-size: 10px;
        }

        .report-entry__copy h2 {
          max-width: 520px;
          margin: 22px 0 0;
          color: #fff;
          font-family: Iowan Old Style, Baskerville, Georgia, serif;
          font-size: clamp(3rem, 5.7vw, 5.4rem);
          font-weight: 500;
          letter-spacing: -0.057em;
          line-height: 0.88;
          text-wrap: balance;
        }

        .report-entry__copy h2 em {
          display: block;
          color: var(--report-accent);
          font-weight: 500;
        }

        .report-entry__description {
          max-width: 470px;
          margin: 28px 0 0;
          color: rgba(255, 255, 255, 0.66);
          font-size: 0.98rem;
          line-height: 1.67;
        }

        .report-entry__thesis {
          margin: 22px 0 0;
          color: #fff;
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.5;
        }

        .report-entry__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .report-entry__footer > span {
          color: rgba(255, 255, 255, 0.42);
          font-size: 9px;
        }

        .report-entry__footer i {
          color: var(--report-accent);
          font-style: normal;
        }

        .report-entry__footer strong {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .report-entry__footer svg {
          transition: transform 180ms ease;
        }

        .report-entry:hover .report-entry__footer svg {
          transform: translate(2px, -2px);
        }

        .report-entry__visual {
          position: relative;
          min-height: 470px;
          overflow: hidden;
          background: #020619;
        }

        .report-entry__visual::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, #070a1b 0%, transparent 18%),
            linear-gradient(0deg, rgba(7, 10, 27, 0.42), transparent 40%);
          pointer-events: none;
        }

        .report-entry--reverse .report-entry__visual::after {
          background:
            linear-gradient(270deg, #070a1b 0%, transparent 18%),
            linear-gradient(0deg, rgba(7, 10, 27, 0.42), transparent 40%);
        }

        .report-entry__visual img {
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .report-entry:hover .report-entry__visual img {
          transform: scale(1.018);
        }

        .report-entry__boundary {
          position: absolute;
          z-index: 2;
          top: 12%;
          bottom: 12%;
          left: 48%;
          width: 42px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          background: rgba(5, 8, 23, 0.08);
          backdrop-filter: blur(1px);
        }

        .report-entry__boundary span {
          position: absolute;
          top: 50%;
          left: -7px;
          width: 54px;
          height: 40px;
          transform: translateY(-50%);
          border-block: 2px solid var(--report-accent);
          background: color-mix(in srgb, var(--report-accent) 10%, transparent);
          box-shadow: 0 0 26px color-mix(in srgb, var(--report-accent) 22%, transparent);
        }

        .reports-principle {
          display: grid;
          grid-template-columns: minmax(180px, 0.55fr) minmax(0, 1.45fr);
          gap: 48px;
          margin-top: 52px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .reports-principle p {
          max-width: 720px;
          margin: 0;
          color: rgba(255, 255, 255, 0.68);
          font-family: Iowan Old Style, Baskerville, Georgia, serif;
          font-size: clamp(1.3rem, 2.2vw, 2rem);
          line-height: 1.32;
          letter-spacing: -0.025em;
        }

        .report-entry__link:focus-visible {
          outline: 2px solid var(--report-accent);
          outline-offset: -4px;
        }

        @media (max-width: 900px) {
          .reports-header {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .reports-header p {
            grid-column: 1;
            grid-row: auto;
            margin: 0;
          }

          .report-entry__link {
            grid-template-columns: 1fr;
          }

          .report-entry__copy,
          .report-entry--reverse .report-entry__copy {
            order: 1;
          }

          .report-entry__visual,
          .report-entry--reverse .report-entry__visual {
            order: 2;
            min-height: 400px;
          }

          .report-entry__visual::after,
          .report-entry--reverse .report-entry__visual::after {
            background: linear-gradient(0deg, #070a1b 0%, transparent 28%);
          }
        }

        @media (max-width: 640px) {
          .reports-main {
            width: min(100% - 20px, 1320px);
            padding: 54px 0 80px;
          }

          .reports-header {
            margin-bottom: 54px;
          }

          .reports-header h1 {
            font-size: clamp(3.1rem, 16vw, 4.7rem);
          }

          .reports-library__head {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .reports-library__list {
            gap: 20px;
            padding-top: 20px;
          }

          .report-entry__copy {
            padding: 32px 24px 30px;
          }

          .report-entry__copy h2 {
            font-size: clamp(3rem, 15vw, 4.35rem);
            line-height: 0.93;
          }

          .report-entry__description {
            margin-top: 24px;
          }

          .report-entry__footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
            margin-top: 32px;
          }

          .report-entry__visual,
          .report-entry--reverse .report-entry__visual {
            min-height: 300px;
          }

          .report-entry__boundary {
            width: 34px;
          }

          .report-entry__boundary span {
            width: 46px;
          }

          .reports-principle {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .report-entry,
          .report-entry__visual img,
          .report-entry__footer svg {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

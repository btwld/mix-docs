import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const INCOMING_BLOCKS = [
  [7, 18, 22, 0],
  [21, 56, 13, -8],
  [34, 29, 17, 7],
  [47, 69, 11, -5],
  [57, 39, 19, 10],
  [71, 12, 12, -9],
  [77, 58, 15, 6],
] as const;

const OUTGOING_BLOCKS = [
  [17, 34, 13, -7],
  [46, 58, 10, 6],
  [68, 25, 8, -5],
] as const;

function ProductionGapDiagram() {
  return (
    <div className="pg-diagram" aria-hidden="true">
      <div className="pg-diagram-label pg-diagram-label-in">
        Creation expands
      </div>
      <div className="pg-diagram-label pg-diagram-label-out">
        Production stays narrow
      </div>

      <div className="pg-stream pg-stream-in">
        {INCOMING_BLOCKS.map(([left, top, size, rotate], index) => (
          <span
            key={index}
            className="pg-block pg-block-in"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        ))}
        <span className="pg-flow-line pg-flow-line-one" />
        <span className="pg-flow-line pg-flow-line-two" />
        <span className="pg-flow-line pg-flow-line-three" />
      </div>

      <div className="pg-gate">
        <span className="pg-gate-label">Review</span>
        <span className="pg-gate-aperture" />
      </div>

      <div className="pg-stream pg-stream-out">
        {OUTGOING_BLOCKS.map(([left, top, size, rotate], index) => (
          <span
            key={index}
            className="pg-block pg-block-out"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        ))}
        <span className="pg-output-line" />
      </div>
    </div>
  );
}

type ProductionGapCardProps = {
  href?: string;
  external?: boolean;
  compact?: boolean;
};

export function ProductionGapCard({
  href = "/reports/production-gap",
  external = false,
  compact = false,
}: ProductionGapCardProps) {
  const content = (
    <>
      <div className="pg-card-copy">
        <span className="pg-kicker">Research feature · AI &amp; delivery</span>
        <h2 className="pg-title">
          The production <em>gap</em>
        </h2>
        <p className="pg-deck">
          Why AI makes building faster and shipping harder — and what
          technology leaders can do about it.
        </p>
        <div className="pg-meta">
          <span>18 minute read</span>
          <span>12 primary sources</span>
        </div>
        <span className="pg-link">
          {external ? "Read the report" : "Explore the report"}
          <ArrowUpRight aria-hidden="true" size={17} />
        </span>
      </div>

      <ProductionGapDiagram />
    </>
  );

  const className = `pg-card${compact ? " pg-card-compact" : ""}`;

  return (
    <>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label="Read The Production Gap report (opens in a new tab)"
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={className}>
          {content}
        </Link>
      )}

      <style jsx global>{`
        .pg-card {
          --pg-blue: #3a5bff;
          --pg-aqua: #00ebbc;
          --pg-coral: #ff765e;
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(340px, 1.12fr);
          min-height: 430px;
          overflow: hidden;
          border: 1px solid var(--mix-border-card);
          border-radius: 18px;
          background: #070a1b;
          color: #fff;
          transition:
            border-color 220ms ease,
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .pg-card:hover {
          border-color: rgba(58, 91, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 24px 70px -42px rgba(58, 91, 255, 0.85);
        }

        .pg-card:focus-visible {
          outline: 2px solid var(--pg-aqua);
          outline-offset: 4px;
        }

        .pg-card-copy {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(32px, 5vw, 58px);
          background:
            linear-gradient(90deg, rgba(7, 10, 27, 1) 0%, rgba(7, 10, 27, 0.96) 78%, rgba(7, 10, 27, 0.6) 100%);
        }

        .pg-kicker,
        .pg-meta {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          text-transform: uppercase;
          letter-spacing: 0.09em;
        }

        .pg-kicker {
          font-size: 11px;
          color: var(--pg-aqua);
        }

        .pg-title {
          margin-top: 18px;
          max-width: 430px;
          font-family: Iowan Old Style, Baskerville, Georgia, serif;
          font-size: clamp(2.85rem, 6vw, 5.35rem);
          font-weight: 600;
          letter-spacing: -0.055em;
          line-height: 0.88;
          text-wrap: balance;
        }

        .pg-title em {
          display: block;
          color: var(--pg-aqua);
          font-weight: 500;
        }

        .pg-deck {
          max-width: 420px;
          margin-top: 24px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 1rem;
          line-height: 1.65;
        }

        .pg-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          margin-top: 28px;
          color: rgba(255, 255, 255, 0.44);
          font-size: 10px;
        }

        .pg-meta span + span::before {
          content: "·";
          margin-right: 20px;
          color: var(--pg-blue);
        }

        .pg-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          margin-top: 32px;
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
        }

        .pg-link :global(svg) {
          transition: transform 180ms ease;
        }

        .pg-card:hover .pg-link :global(svg) {
          transform: translate(2px, -2px);
        }

        .pg-diagram {
          position: relative;
          min-height: 430px;
          overflow: hidden;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            radial-gradient(circle at 32% 50%, rgba(58, 91, 255, 0.22), transparent 42%),
            #050713;
          background-size: 32px 32px, 32px 32px, 100% 100%, 100% 100%;
        }

        .pg-diagram::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(7, 10, 27, 0.68), transparent 22%);
          pointer-events: none;
        }

        .pg-diagram-label {
          position: absolute;
          z-index: 3;
          top: 28px;
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.42);
        }

        .pg-diagram-label-in {
          left: 26px;
        }

        .pg-diagram-label-out {
          right: 26px;
          text-align: right;
        }

        .pg-stream {
          position: absolute;
          top: 74px;
          bottom: 54px;
        }

        .pg-stream-in {
          left: 3%;
          width: 54%;
        }

        .pg-stream-out {
          right: 2%;
          width: 30%;
        }

        .pg-block {
          position: absolute;
          display: block;
          border: 1px solid rgba(255, 255, 255, 0.32);
          box-shadow: 0 0 24px rgba(58, 91, 255, 0.22);
        }

        .pg-block::after {
          content: "";
          position: absolute;
          inset: 26%;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.75) 1px, transparent 1.5px);
          background-size: 6px 6px;
        }

        .pg-block-in {
          background: linear-gradient(145deg, #274cff, #1733b7);
        }

        .pg-block-out {
          background: linear-gradient(145deg, #ff8a73, #b94a3e);
          box-shadow: 0 0 24px rgba(255, 118, 94, 0.18);
        }

        .pg-flow-line {
          position: absolute;
          z-index: 0;
          right: -8%;
          height: 1px;
          transform-origin: right center;
          background: linear-gradient(90deg, rgba(58, 91, 255, 0), rgba(58, 91, 255, 0.75));
        }

        .pg-flow-line-one {
          top: 24%;
          left: 5%;
          transform: rotate(16deg);
        }

        .pg-flow-line-two {
          top: 50%;
          left: 0;
        }

        .pg-flow-line-three {
          top: 76%;
          left: 8%;
          transform: rotate(-15deg);
        }

        .pg-gate {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 61%;
          width: 84px;
          height: 78%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.055);
          box-shadow: inset 0 0 40px rgba(0, 235, 188, 0.05);
        }

        .pg-gate-label {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--pg-aqua);
        }

        .pg-gate-aperture {
          position: absolute;
          left: -8px;
          right: -8px;
          top: 50%;
          height: 50px;
          transform: translateY(-50%);
          border-top: 3px solid var(--pg-aqua);
          border-bottom: 3px solid var(--pg-aqua);
          background: rgba(0, 235, 188, 0.08);
          box-shadow: 0 0 28px rgba(0, 235, 188, 0.15);
        }

        .pg-output-line {
          position: absolute;
          top: 50%;
          left: -16%;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(0, 235, 188, 0.7), rgba(255, 118, 94, 0.55));
        }

        .pg-card-compact {
          min-height: 380px;
          grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
        }

        .pg-card-compact .pg-diagram {
          min-height: 380px;
        }

        .pg-card-compact .pg-title {
          font-size: clamp(2.65rem, 5vw, 4.5rem);
        }

        @media (max-width: 760px) {
          .pg-card,
          .pg-card-compact {
            grid-template-columns: 1fr;
          }

          .pg-card-copy {
            min-height: 400px;
            padding: 34px 28px;
          }

          .pg-title,
          .pg-card-compact .pg-title {
            font-size: clamp(3rem, 15vw, 4.6rem);
          }

          .pg-diagram,
          .pg-card-compact .pg-diagram {
            min-height: 310px;
          }

          .pg-meta span + span::before {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pg-card,
          .pg-link :global(svg) {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

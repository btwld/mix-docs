import type { HubVisual } from "./hubData";

const SIGNALS = {
  interface: {
    eyebrow: "Composition contract",
    statement: "A flexible surface inside fixed product rules.",
    rows: [
      ["Can change", "Layout · sequence · emphasis"],
      ["Cannot change", "State · permission · action"],
      ["Product owns", "Vocabulary · validation · execution"],
    ],
    footnote: "The host validates every proposal before anything renders or runs.",
  },
  workflow: {
    eyebrow: "Execution contract",
    statement: "The model proposes. Policy decides. Systems execute.",
    rows: [
      ["Before", "Identity · scope · authority"],
      ["During", "Validation · policy · limits"],
      ["After", "Evidence · recovery · ownership"],
    ],
    footnote: "Human review is one control. The workflow must remain accountable without it.",
  },
  legacy: {
    eyebrow: "Modernization contract",
    statement: "Recover evidence before choosing a target state.",
    rows: [
      ["Observe", "Architecture · behavior · operations"],
      ["Decide", "Preserve · change · retire"],
      ["Prove", "Baseline · release · outcome"],
    ],
    footnote: "The system’s current behavior is the starting evidence—not the migration plan.",
  },
} as const;

export function HubSignal({ visual, compact = false }: { visual: HubVisual; compact?: boolean }) {
  const signal = SIGNALS[visual];

  return (
    <aside className={`hub-signal hub-signal--${visual} ${compact ? "is-compact" : ""}`}>
      <header>
        <span>{signal.eyebrow}</span>
        <p>{signal.statement}</p>
      </header>
      <dl>
        {signal.rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <small>{signal.footnote}</small>
    </aside>
  );
}

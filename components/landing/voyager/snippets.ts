/* Code snippets shared between the Voyager hero and evidence sections. */

export const SYSTEM_MAP_JSON = `{
  "entry": "src/api/router.ts",
  "touches": ["auth", "billing", "notifications"],
  "flows": 12,
  "groundedBy": ".voyager/context.md"
}`;

export const PRIORITIES_JSON = `{
  "next": [
    { "priority": "P0", "why": "blocks launch", "at": "auth/session.ts:84" },
    { "priority": "P1", "why": "high churn",    "at": "billing/retry.ts:41" },
    { "priority": "P2", "why": "safe to defer", "at": "lib/logger.ts:12" }
  ]
}`;

export const PROGRESS_JSON = `{
  "since": "previous pass",
  "architecture": { "before": 76, "now": 82, "delta": "+6" },
  "security":     { "before": 58, "now": 76, "delta": "+18" },
  "techDebt":     { "before": 67, "now": 71, "delta": "+4" },
  "sameRuler": true
}`;

export const EVIDENCE_JSON = `{
  "signal": "session tokens never expire",
  "evidence": ["src/auth/session.ts:84"],
  "basis": "verified in code",
  "confidence": "high",
  "next": "set maxAge and rotate on refresh"
}`;

export const SIGNAL_COLORS: Record<string, string> = {
  P0: "#FB7185",
  P1: "#FBBF24",
  P2: "#67E8F9",
};

export const SEVERITY_COLORS = {
  critical: "#F87171",
  high: "#FB923C",
};

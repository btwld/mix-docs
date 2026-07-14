/* Code snippets shared between the hero window and the trust split. */

export const CODE_HEALTH_JSON = `{
  "scores": {
    "architecture":  { "value": 82, "band": "B", "confidence": "high"   },
    "moduleQuality": { "value": 74, "band": "C", "confidence": "high"   },
    "security":      { "value": 58, "band": "D", "confidence": "medium" },
    "techDebt":      { "value": 71, "band": "C", "confidence": "high"   }
  },
  "deterministic": true
}`;

export const AUDIT_CMD = `$ code-analysis audit ./acme-api \\
    --provider anthropic \\
    --max-budget 40 \\
    --max-parallel 5

# grounded by .code-analysis/context.md
# resumable · content-hash cached`;

export const OUTPUT_LS = `$ ls .code-analysis/output/
  hotspot-catalog.json    finding-catalog.json
  flow-catalog.json       coverage-map.json
  code-health.json        audit-report.pdf`;

/* Grade-band colors (A–F), used only inside stage/tile mocks. */
export const BAND_COLORS: Record<string, string> = {
  A: "#34D399",
  B: "#A3E635",
  C: "#FBBF24",
  D: "#FB923C",
  F: "#F87171",
};

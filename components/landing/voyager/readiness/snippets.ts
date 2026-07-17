/* Outcome-focused examples from a real assessment run (client anonymized). */

export const SCORECARD_JSON = `{
  "baseline": {
    "architecture":  { "value": 74 },
    "moduleQuality": { "value": 65 },
    "security":      { "value": 65 },
    "techDebt":      { "value": 85 }
  },
  "confidence": "medium",
  "next": { "signalsReviewed": 101, "priorityActions": 12 }
}`;

export const GATES_JSON = `{
  "release": "needs attention",
  "ready": ["tests", "dependencies", "compatibility"],
  "next": ["lock dependencies", "apply formatting"],
  "estimatedEffort": "under one day"
}`;

export const FINDING_JSON = `{
  "id": "C-1",
  "severity": "high",
  "title": "Backend keys shipped inside the app",
  "evidence": [
    "lib/firebase_options.dart:50",
    "lib/firebase_options.dart:59",
    "lib/main.dart:29"
  ],
  "next": "rotate and restrict the keys",
  "estimatedEffort": "1 day"
}`;

export const METHODOLOGY_JSON = `{
  "evidence": {
    "sourceCoverage": "100%",
    "fileAndLine": true,
    "gaps": "disclosed"
  },
  "decisions": {
    "signalsReviewed": 101,
    "priorityActions": 12,
    "effortIncluded": true
  },
  "repeatableBaseline": true
}`;

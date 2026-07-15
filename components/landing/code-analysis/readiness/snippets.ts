/* Code snippets for the readiness hero window and trust split.
   Numbers come from a real assessment run (client anonymized). */

export const SCORECARD_JSON = `{
  "scores": {
    "architecture":  { "value": 74, "band": "C" },
    "moduleQuality": { "value": 65, "band": "C" },
    "security":      { "value": 65, "band": "C" },
    "techDebt":      { "value": 85, "band": "B" }
  },
  "confidence": "medium",
  "risk": "critical",
  "findings": { "total": 101, "p0Actions": 12 }
}`;

export const GATES_LOG = `$ pub get --enforce-lockfile
  → would change 14 resolutions   ✗
$ analyze --no-pub                ✓
$ test --reporter json            ✓  all passing
$ format --set-exit-if-changed .
  → 7 files would be reformatted  ✗
$ trivy fs pubspec.lock           ✓  0 CVEs`;

export const FINDING_JSON = `{
  "id": "C-1",
  "severity": "high",
  "title": "Backend keys shipped inside the app",
  "evidence": [
    "lib/firebase_options.dart:50",
    "lib/firebase_options.dart:59",
    "lib/main.dart:29"
  ],
  "standards": ["CWE-798", "OWASP A02:2021"],
  "remediation": "1 day"
}`;

export const METHODOLOGY_JSON = `{
  "sourceCoverage": "100%",
  "sast": {
    "covered": ["javascript", "typescript", "python"],
    "notCovered": ["dart", "kotlin", "swift"],
    "note": "absence of findings ≠ absence of issues"
  },
  "policy": { "hardCeilings": ["unrotated secret"] },
  "scores": { "confidence": "medium" },
  "deterministic": true
}`;

# Concepta Home Preservation Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the complete approved Concepta homepage marketing substance while retaining only surgical copy, accessibility, trust, and SEO improvements that preserve its meaning.

**Architecture:** Keep the existing `ConceptaHome` composition and all technical improvements. Change only its marketing constants and rendered copy, align the two root metadata descriptions, and revise the source-contract tests and review documentation so they preserve approved proof instead of banning it.

**Tech Stack:** Next.js App Router, Nextra MDX, React, TypeScript/JSX, Framer Motion, Node's built-in test runner, CSS-in-JSX

## Global Constraints

- `origin/main` is the baseline for marketing meaning and product detail.
- Keep all six Concepta client logos and keep them separate from open-source adoption proof.
- Keep Universal, Disney, BMW, Toyota, LG, and Nubank in the open-source adoption sentence.
- Missing public provenance is not proof that a company-approved claim is false.
- Preserve all current accessibility, motion, contact, canonical, structured-data, and contrast improvements.
- Do not add dependencies, routes, assets, or unrelated product-page changes.
- Apply only the exact copy approved in `docs/superpowers/specs/2026-07-18-concepta-home-proof-restoration-design.md`.

---

### Task 1: Restore the homepage substance under a preservation contract

**Files:**
- Modify: `components/ConceptaHome.tsx`
- Modify: `src/app/layout.jsx`
- Modify: `src/content/index.mdx`
- Modify: `site-tests/concepta-home-content.test.mjs`

**Interfaces:**
- Consumes: approved copy from the preservation-first design
- Produces: unchanged `ConceptaHome` public API plus a source contract that protects the restored proof, positioning, product detail, and existing technical improvements

- [ ] **Step 1: Rewrite the proof test to require approved evidence**

Require the exact ticker values, all six clients, `TRUST_OUTCOMES`, and these outcomes:

```js
for (const proof of [
  '27% more loan applications at Truist',
  'Up to $3M saved in a two-day FEMA activation',
  '4.7★ across 16k reviews at AdventHealth',
]) {
  assert.ok(home.includes(proof), `missing approved proof: ${proof}`)
}
```

Delete the test named `keeps unsupported outcome metrics off the homepage` and its negative assertions.

- [ ] **Step 2: Require the restored meaning-bearing copy**

Require these source fragments:

```js
for (const copy of [
  'Between code that&apos;s written and a system that&apos;s safely',
  'And we build our own tools to do it.',
  'Get a Delivery Readiness Assessment',
  'Small by design.',
  'We ship what a business depends on.',
  'We don\'t start from scratch.',
  'The evidence behind governed delivery.',
  'switch versions without reinstalling',
  'Agents act through approved capabilities, not broad system access.',
  'over any repo',
  'Know whether it&apos;s safe to ship.',
]) {
  assert.ok(home.includes(copy), `missing preserved copy: ${copy}`)
}
```

Require the combined adoption paragraph, and require the original metadata
description in both `src/app/layout.jsx` and `src/content/index.mdx`.

- [ ] **Step 3: Run the focused test and witness failure**

Run: `node --test site-tests/concepta-home-content.test.mjs`

Expected: FAIL because the homepage still contains the rewrite and omits the outcome row.

- [ ] **Step 4: Restore proof and evidence cards**

Set the ticker to:

```ts
const PROOF_TICKER = [
  "Since 2006",
  "600+ projects delivered",
  "98% delivery satisfaction",
];
```

Restore `TRUST_OUTCOMES`, its rendered row and CSS, and the original numeric `PILLARS`. Use the evidence-corrected FEMA outcome from the design spec.

- [ ] **Step 5: Restore section and CTA copy**

Restore these exact section strings and both button labels:

```text
Between code that's written and a system that's safely live, there's a gap. We own it — the decisions, the release, the outcome. And we build our own tools to do it.
We don't advise from the sideline. We own the outcome.
One owner, from the first readiness call to the live release. We make the hard technical decisions, stabilize or build, and stand behind what ships. Advice doesn't ship. We do.
The evidence behind governed delivery.
Building is accelerating. The controls around review, release, and production are not. Our latest report maps the gap — and the operating model that closes it.
Know whether it's safe to ship.
Start with a Delivery Readiness Assessment — in two to three weeks you'll know exactly where your release stands, and what to do next.
Get a Delivery Readiness Assessment
```

- [ ] **Step 6: Restore product meaning**

Use the approved combined projects introduction:

```text
Every project here started inside real delivery work — then got extracted, hardened, and shipped. Our open-source work is used by teams at Universal, Disney, BMW, Toyota, LG, Nubank, and others. Open source where the community builds with us, product where the problem demands more.
```

Restore these exact descriptions:

```text
Mix: Fluent, chainable styles, reactive variants, and design tokens. Build design systems in Flutter without the boilerplate.
Remix: 20+ accessible components built on Mix — completely styleable, from primitives to a full theme, with complete visual control.
Naked UI: Fourteen headless controls with semantics, keyboard and focus behavior, overlays, and observable state — without imposed styling.
Ack: Dart schemas for apps and structured AI — define the shape once, validate every response at runtime, and keep your types.
FVM: Pin Flutter SDKs per project, switch versions without reinstalling, and keep local development and CI on the same toolchain.
Rockets: One typed backend definition wires identity, storage, resources, access, hooks, and OpenAPI at runtime.
Stargate: Turns APIs, workflows, and business rules into reusable capabilities with controls built in — permissions, approvals, human review, and audit. Agents act through approved capabilities, not broad system access.
Code Analysis: Ten static analyzers and a 7-phase AI pipeline over any repo — a four-dimension scorecard and a report you can put in front of a client.
```

- [ ] **Step 7: Restore the root description**

Set `src/app/layout.jsx` and `src/content/index.mdx` to:

```text
Concepta ships the systems your business runs on — and builds the open-source delivery foundation behind them: Mix, Remix, Naked UI, Ack, FVM, Rockets, Stargate, and Code Analysis.
```

Keep `concepta.dev`, the root-only canonical, and Organization JSON-LD unchanged.

- [ ] **Step 8: Run the focused contract**

Run: `node --test site-tests/concepta-home-content.test.mjs`

Expected: all homepage content, contact, metadata, structured-data, and accessibility source tests pass.

### Task 2: Correct the review record and verify the completed page

**Files:**
- Modify: `docs/superpowers/specs/2026-07-18-concepta-home-surgical-review-design.md`
- Modify: `docs/superpowers/plans/2026-07-18-concepta-home-surgical-review.md`
- Review: all files changed on the branch

**Interfaces:**
- Consumes: completed preservation implementation
- Produces: an accurate decision record and verified branch

- [ ] **Step 1: Correct the unsupported attribution**

Replace the AMN Passport assertion with: `No durable historical source for the AdventHealth 4.7★ / 16k figure was captured during this review; that absence does not disprove the company-approved claim.` Mark the old exclusion steps as superseded by the preservation-first design.

- [ ] **Step 2: Run static and test verification**

Run: `git diff --check`

Expected: no output.

Run: `pnpm test:site`

Expected: all site tests pass.

Run: `pnpm exec tsc --noEmit --incremental false`

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 3: Run the production build**

Run: `pnpm build`

Expected: the Next.js build and Pagefind postbuild complete successfully.

- [ ] **Step 4: Verify desktop and mobile rendering**

At 1440 × 900 and 390 × 844, confirm the outcome row, six client logos, numeric cards, combined open-source adoption paragraph, CTAs, contact details, and full project catalog render without clipping or horizontal overflow. Confirm CTA destinations and a clean browser console.

- [ ] **Step 5: Review, commit, and push the scoped diff**

Run: `git diff origin/main...HEAD` plus the uncommitted diff. Confirm the final branch retains the technical improvements, restores the approved marketing meaning, and contains no unrelated changes. Commit the preservation pass and push the current branch.

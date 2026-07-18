# Concepta Home Proof Restoration

**Date:** 2026-07-18

**Status:** Implemented and verified

**Page:** `/`

## 1. Decision

Use a balanced restoration. Keep the Delivery Readiness positioning and the technical improvements from the surgical review, while restoring credible client proof, user-confirmed open-source adoption, and useful product detail that was removed only because public evidence was incomplete.

The homepage remains a delivery-company page whose primary conversion is the Delivery Readiness Assessment. Open-source work remains the second act and demonstrates that Concepta turns recurring delivery problems into reusable foundations.

This document supersedes the client and open-source exclusions in `2026-07-18-concepta-home-surgical-review-design.md`. Its accessibility, contact, SEO, metadata, and motion decisions remain in force.

## 2. Proof Categories

Client relationships and open-source adoption are different claims and must not be combined.

### Selected Concepta clients

Restore the six-client logo band:

- Truist
- AdventHealth
- FEMA
- Red Lobster
- Warner Music Group
- Google

Label the band **Selected Concepta clients**. Use the existing logo assets and restore the responsive six-column desktop, three-column tablet, and two-column mobile grid.

Do not restore the previous outcome row or numeric delivery cards. The following claims remain excluded unless separate internal evidence is approved:

- `27% more loan applications at Truist`
- `$3M+ saved for FEMA`
- `4.7★ across 16k reviews at AdventHealth`
- `35+` as a current company-size claim

### Open-source adoption

Place adoption proof in the Projects section, not in the client band. Use this copy:

> These tools began in real delivery work, then were extracted and hardened. Our open-source work is used by teams at Universal, Disney, BMW, Toyota, LG, Nubank, and others.

Use text rather than a second logo wall. Do not label these companies as clients, partners, or endorsers, and do not claim that the code runs inside a named product.

Google remains in the client band rather than being repeated in the adoption sentence.

## 3. Content to Preserve

Keep the current versions of:

- Hero stance and headline
- Hero lead about owning decisions, release, and outcome
- **Assess delivery readiness** primary action and its destination
- `Since 2006 / 600+ projects / 98% happy clients` proof line
- Senior-led, Release-owned, and Field-tested delivery cards
- Research section and report destination
- Delivery Readiness closing section
- Verified legal name, phone, address, and links
- Root canonical, `concepta.dev` metadata base, and Organization JSON-LD
- Reduced-motion behavior, video control, heading semantics, and contrast fixes

The page must not restore the earlier generic or repetitive delivery copy merely to make the page longer.

## 4. Product Detail to Restore

Retain all eight project names, order, statuses, links, taglines, and visual windows. Use descriptions that restore concrete, currently supported capabilities:

- **Mix:** Fluent, chainable styles, reactive variants, and design tokens for Flutter design systems—without boilerplate.
- **Remix:** 20+ accessible, fully styleable Flutter components built on Mix, from primitives through a complete theme.
- **Naked UI:** Fourteen headless controls with semantics, keyboard and focus behavior, overlays, and observable state—without imposed styling.
- **Ack:** Define Dart schemas once, validate data and AI responses at runtime, and keep static types.
- **FVM:** Pin Flutter SDKs per project, switch versions deliberately, and keep local development and CI on the same version.
- **Rockets:** One typed definition wires identity, storage, resources, access policies, hooks, and OpenAPI at runtime.
- **Stargate:** Turn APIs, workflows, agents, and rules into governed capabilities with schema contracts, validation, human review, and audit trails.
- **Code Analysis:** Ten static analyzers and a 7-phase AI audit pipeline produce a four-dimension scorecard and client-ready report.

The descriptions above were cross-checked against the current product pages and have priority over older homepage copy. If implementation uncovers a direct contradiction, stop and resolve it explicitly rather than silently restoring the older phrase.

## 5. CRO and Visual Hierarchy

The hierarchy remains:

1. Delivery ownership and assessment action
2. Selected client proof
3. How Concepta owns delivery
4. Research evidence
5. Open-source adoption and project evidence
6. Closing assessment action and contact

Client logos answer whether Concepta can be trusted with consequential delivery. Open-source adoption answers whether its foundations are proven beyond its own engagements. Keeping the categories apart prevents an adopter from being presented as a commercial client.

The former 650-word target is no longer a hard acceptance criterion. Prefer concise, specific copy and avoid repetition, but do not remove meaningful proof or product capability solely to hit an arbitrary count.

## 6. Implementation Boundary

Expected implementation changes are limited to:

- Homepage proof arrays, project descriptions, and Projects introduction
- Client-grid styling restored for six logos
- Homepage source-contract tests
- Existing surgical-review documentation where it conflicts with this correction

No new dependencies, adopter-logo assets, routes, forms, or unrelated product-page changes are included.

## 7. Verification

- Source tests require the six clients exactly once.
- Source tests require Universal, Disney, BMW, Toyota, LG, and Nubank in the open-source adoption sentence.
- Source tests continue to exclude the unsupported outcome and company-size claims.
- Client and adopter labels cannot be conflated.
- All project descriptions match this specification and their current product pages.
- Desktop and mobile checks confirm the six/three/two client grid, readable adoption copy, working CTAs, and no horizontal overflow.
- Reduced motion still pauses and hides the hero video immediately.
- The full site tests, TypeScript check, preview-manifest check, production build, and `git diff --check` pass.

# Rockets Standalone Landing Page Polish

**Date:** 2026-07-17
**Status:** Approved direction, implementation pending
**Page:** `/rockets`

## 1. Product Decision

The Rockets landing page must present Rockets as a complete standalone product. The broader Concepta and Stargate strategy informs the page's focus—show one concrete capability before explaining a platform—but neither Stargate nor NestJS appears in the page copy.

The page's single job is to convince a backend or platform engineer that one typed `createServer(...)` definition can establish the repeatable foundation of a production backend while leaving domain behavior under the team's control.

### Core promise

> Describe the backend once. Rockets makes it run.

### Launch API

The primary public API shown throughout the page is:

```ts
export const billing = createServer({
  auth: sharedIdentity,
  repository: postgres,
  resources: [customers, invoices, ledger],
  accessControl: billingPolicy,
});
```

`createServer(...)` is the launch-facing facade for the same options object currently assembled through the alpha module-registration API. The facade changes the entry-point name, not the configuration contract. The landing page does not introduce a second aspirational name such as `defineRockets(...)`.

### Explicit exclusions

- Do not mention Stargate.
- Do not mention NestJS.
- Do not present Rockets as dependent on a hosted control plane.
- Do not describe a language-neutral or serialized backend artifact as a current capability.
- Do not imply that Rockets writes the product's domain logic.
- Do not show `defineRockets(...)`.

## 2. Audience and Success Criteria

### Primary audience

Backend and platform engineers evaluating whether Rockets can remove repeated server infrastructure without hiding or owning their domain logic.

### User story

As an engineer evaluating Rockets, I want to see one realistic server definition and the concrete runtime surface it creates so that I can understand the product before reading its documentation.

### Acceptance criteria

- The hero communicates the product promise and shows `createServer(...)` before any conceptual product explanation.
- The default hero visual maps configuration fields to concrete server outcomes.
- The rendered Rockets page contains neither `NestJS` nor `Stargate`, including metadata and FAQ copy.
- The rendered page contains `createServer(` and does not contain `defineRockets(`.
- The page has no more than six major narrative sections after the shared navigation.
- Mobile document height at 390 × 844 is at least 25% shorter than the current 14,192 px baseline.
- Desktop document height at 1440 × 900 is at least 20% shorter than the current 9,782 px baseline.
- The page has no horizontal overflow at 390 px width.
- Tabs, links, and FAQ controls remain keyboard accessible with visible focus states.
- Motion respects `prefers-reduced-motion` through the existing `MotionConfig` behavior.
- Existing site tests, TypeScript checks, and the production build pass.

## 3. Recommended Narrative

The page uses a proof-first narrative. It shows the server definition, demonstrates the resulting surface, explains provider boundaries, and then states what remains the team's responsibility.

### Section 1 — Hero: the thesis and proof

**Headline:** Keep the existing thesis, “Your backend should be a spec. Rockets makes it run.”

**Lead:** Replace framework and ecosystem language with a direct product explanation:

> Describe your domain—resources, identity, storage, access, and APIs. Rockets turns that definition into a secure, documented server with the repeatable foundation already wired.

**Primary CTA:** Explore on GitHub.
**Secondary CTA:** See `createServer`.

The hero window defaults to a complete `createServer(...)` example. It retains the useful authentication and storage tabs, but the first tab is named **Server**, not **Spec**, and it is visually dominant.

### Section 2 — One call, a complete server

Show the direct mapping between the definition and the resulting surface:

- `resources` → routes, validation, relationships, and OpenAPI
- `auth` → one authenticated-user contract and protected endpoints
- `repository` → default persistence with per-resource overrides
- `accessControl` → ownership and policy enforcement
- hooks and providers → extension points for domain behavior

This replaces the current stats strip, statement, feature grid, and output bento, which repeat the same idea at different levels of abstraction.

### Section 3 — Providers stay replaceable

Use one compact split section with two provider cards:

- **Identity:** Firebase, API keys, built-in identity, or a custom adapter resolve the same user contract.
- **Storage:** choose a default repository and override the exception without changing domain services.

The section demonstrates both configuration fragments without becoming a package inventory.

### Section 4 — Rockets builds the foundation; you build the product

Draw a clear product boundary.

**Rockets owns:** registration, authentication plumbing, persistence routing, resource controllers, validation, access-policy wiring, hooks, and API documentation.

**Your team owns:** domain rules, schemas, services, integrations, workflows, events, and operational choices.

This replaces the current repeated “definition is the product” and “framework stops at the boundary” explanations with one concrete comparison.

### Section 5 — Focused FAQ

Keep six questions at most:

1. What is Rockets?
2. What does `createServer(...)` create?
3. Does Rockets generate source code?
4. Can identity and storage providers be replaced?
5. What application code do I still write?
6. Is Rockets stable?

Answers must use product language, avoid implementation-framework naming, and distinguish launch direction from currently published alpha behavior where necessary.

### Section 6 — Closing action

**Title:** Define the backend. Launch the server.
**Lead:** Start with one domain definition, inspect the generated surface, and keep extending it with ordinary application code.
**Actions:** View the repository and read the guide.

Remove the ecosystem marquee. It adds length and package vocabulary without helping the visitor understand the central product action.

## 4. Visual Design

### Design direction

Preserve the current dark Rockets identity and refine it around a single signature interaction. The page should feel like a launch console whose input is a server definition and whose output is a live, inspectable backend surface.

### Token system

- **Night:** `#05040A` — page background
- **Panel:** `#0D0B14` — code and content surfaces
- **Lift:** `#161421` — elevated and selected surfaces
- **Launch:** `#FF5906` — primary action and active state
- **Flame:** `#FFAD7A` — secondary gradient and warm output highlight
- **Signal:** `#FFFFFF` — primary text; use opacity for muted copy

### Typography

- **Display and reading:** Inter, using tight tracking and strong weight contrast for the hero and section titles.
- **Utility and code:** JetBrains Mono for the wordmark, labels, configuration keys, file names, and runtime outputs.
- Use the mono face only where the content is genuinely technical. Do not turn ordinary prose into terminal decoration.

### Layout

Desktop:

```text
┌──────────────────────────────────────────────────────────┐
│                  HERO THESIS + ACTIONS                   │
│  ┌──────────────────────┬─────────────────────────────┐  │
│  │ createServer(config) │ configuration → outcomes    │  │
│  └──────────────────────┴─────────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│            ONE CALL, A COMPLETE SERVER                   │
│   resources     auth      storage      policy      API   │
├───────────────────────────┬──────────────────────────────┤
│ IDENTITY PROVIDERS        │ STORAGE PROVIDERS            │
├───────────────────────────┴──────────────────────────────┤
│ ROCKETS BUILDS                          YOUR TEAM BUILDS  │
├──────────────────────────────────────────────────────────┤
│ FAQ                                                      │
├──────────────────────────────────────────────────────────┤
│ CLOSING ACTION                                           │
└──────────────────────────────────────────────────────────┘
```

Mobile:

```text
HERO
createServer code
outcome sequence
configuration outcomes
identity providers
storage providers
Rockets / your team boundary
FAQ
closing action
```

Mobile sections stack in narrative order. Code may scroll inside its own panel only when it cannot wrap safely; the document itself must never overflow horizontally.

### Signature interaction

The memorable element is the **launch sequence** inside the hero window. Configuration keys on the left map to a restrained output checklist on the right. When the Server, Auth, or Storage tab changes, one coordinated transition updates both sides. The active `createServer` call and its resulting surface are the visual thesis of the page.

Spend motion here and keep downstream animation quiet. Section reveals may remain subtle, but cards should not animate independently without communicating state.

### Uniqueness review

The current page relies on common landing-page devices: a numerical stats strip, a large philosophical statement, a generic feature grid, a bento grid, and a scrolling package marquee. Those devices are polished but not specific to Rockets.

The revised design removes those generic structures. Its primary visual relationship—configuration keys becoming server capabilities—can only belong to this product. Orange remains a launch signal rather than decorative glow, and structural labels describe real configuration or runtime concepts.

## 5. Component Architecture

Rockets should no longer be forced through every section of the generic `LandingRoot` template. Preserve shared primitives but give the product a concise composition.

### Recommended composition

`RocketsLanding.tsx` becomes the page-level composition and renders:

1. shared `Aurora`
2. shared `Hero` with the Rockets `HeroWindow`
3. new `ServerSurface`
4. revised `ProviderSpotlights`
5. new `OwnershipBoundary`
6. shared `Faq`
7. shared `ClosingCta`

Keep `MotionConfig reducedMotion="user"` and the existing `.lp-root` shell. Do not make unrelated product fields optional merely to accommodate Rockets; a product-specific composition is clearer and avoids regressions to Stargate and Code Analysis pages.

### File responsibilities

- `RocketsLanding.tsx` — section order and page shell only
- `content.tsx` — user-facing copy, links, FAQ, and CTA data
- `snippets.ts` — `createServer`, authentication, and storage examples
- `HeroWindow.tsx` — tabs plus configuration-to-output launch sequence
- `ServerSurface.tsx` — compact configuration-to-capability mapping
- `ProviderSpotlights.tsx` — combined identity and storage provider section
- `OwnershipBoundary.tsx` — Rockets-versus-team responsibility comparison
- `landing.css` — shared primitives plus narrowly scoped Rockets selectors
- `rockets-integration.test.mjs` — positive and negative content contracts

`OutputsBento.tsx` is removed once `ServerSurface.tsx` covers its unique information. Avoid leaving dead Rockets-specific selectors in `landing.css` after the component removal.

## 6. Content and API Integrity

The page may preview the `createServer(...)` launch facade, but it must not claim capabilities absent from the current planner and package contracts.

Every output shown in the launch sequence must map to repository-backed behavior:

- authentication adapter chain and authenticated-user contract
- repository abstraction and per-entity override
- declarative resources and generated CRUD surface
- access-control integration
- hooks and custom providers
- OpenAPI registration

Copy must not claim that Rockets generates business logic, provisions infrastructure, or serializes a language-neutral specification.

## 7. Responsive, Accessibility, and Failure States

- Preserve semantic tabs with `role="tablist"`, `role="tab"`, and `aria-selected`.
- Add arrow-key tab navigation if it is absent during implementation.
- Decorative output panels remain hidden from assistive technology only when equivalent explanatory text is present.
- Interactive code tabs must retain visible focus and at least a 44 px touch target on mobile.
- Honor reduced motion by replacing cross-fades and transforms with immediate state changes.
- External links retain `rel="noopener noreferrer"`.
- The page has no form or remote data dependency; its primary failure risk is inaccurate or contradictory API copy. Tests enforce required and forbidden terminology.

## 8. Verification Plan

### Automated

- Extend `site-tests/rockets-integration.test.mjs` to require `createServer` and forbid `defineRockets`, `NestJS`, and `Stargate` in Rockets page files and metadata.
- Verify the expected standalone sections and GitHub calls to action.
- Run `pnpm test:site`.
- Run the repository TypeScript check or production build used by this app.

### Browser

- Verify `/rockets` at 1440 × 900 and 390 × 844.
- Exercise Server, Auth, and Storage tabs with pointer and keyboard input.
- Confirm no horizontal overflow and measure document-height reduction against the recorded baselines.
- Inspect the browser console for application-owned errors.
- Confirm reduced-motion behavior.
- Capture hero and full-page screenshots for the final design critique.

## 9. Non-Goals

- Implementing `createServer(...)` in the Rockets package repository
- Rewriting the shared navigation or footer
- Redesigning other Concepta product landing pages
- Adding pricing, hosted services, a waitlist, or an account flow
- Adding Stargate or broader ecosystem positioning
- Changing the Rockets brand palette

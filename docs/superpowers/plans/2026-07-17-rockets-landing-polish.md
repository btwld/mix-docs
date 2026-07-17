# Plan: Rockets Standalone Landing Page Polish

> Replace the overlong ecosystem narrative with a proof-first standalone Rockets page centered on the `createServer(...)` launch API.

## Objective

- Primary outcome: `/rockets` explains and demonstrates Rockets as a standalone backend product through one realistic `createServer(...)` definition.
- Constraints: no `NestJS`, `Stargate`, or `defineRockets(...)` in Rockets page content or metadata; do not change behavior on other product pages.
- Out of scope: implementing `createServer(...)` in the Rockets package repository, redesigning shared navigation/footer, or adding hosted-service flows.

## Context

- `components/landing/LandingRoot.tsx` currently renders every generic landing section in a fixed order, which forces Rockets through stats, statement, features, bento, spotlights, marquee, trust, FAQ, and closing CTA.
- `components/landing/rockets/content.tsx` repeats the product thesis across all of those sections and includes the framework and ecosystem terms now excluded from the page.
- `components/landing/rockets/snippets.ts` currently presents the invented `defineRockets(...)` facade; the approved launch-facing name is `createServer(...)` with the same options object as the existing alpha root registration.
- `components/landing/rockets/HeroWindow.tsx` already provides accessible Server/Auth/Storage-style tab mechanics and a useful two-column code/output window.
- `components/landing/sections/Hero.tsx`, `Faq.tsx`, `ClosingCta.tsx`, and `Aurora.tsx` are reusable primitives; only `Hero` is unnecessarily typed to the full `LandingContent` object.
- `site-tests/rockets-integration.test.mjs` is the existing content and shell contract for the route.
- Browser baseline: 9,782 px document height at 1440 × 900 and 14,192 px at 390 × 844, with no horizontal overflow.

## Approach

Give `RocketsLanding.tsx` a product-specific section composition while retaining the shared visual primitives and `.lp-root` shell. Narrow the `Hero` prop contract to only the fields it actually reads. Replace the generic grids and marquee with three Rockets-specific sections: server surface, compact provider model, and ownership boundary.

- Alternative considered: make every `LandingContent` section optional in `LandingRoot` — rejected because it weakens the shared contract and spreads conditional rendering through unrelated product pages.
- Alternative considered: keep the current bento and only rewrite copy — rejected because the bento, stats, and marquee are the main sources of repetition and page length.

## Compatibility

- Breaking change: no public package or application API change. The only shared type refinement is narrowing `Hero` to the subset it already consumes.
- Migration: hard cut for `/rockets`; other product compositions remain on `LandingRoot` unchanged.
- Data migration: none.
- Rollback: revert the implementation commit; the existing Rockets page remains available in git history.

## Work Breakdown

1. Establish failing content contracts — `site-tests/rockets-integration.test.mjs`
   - Require `createServer(` and the new standalone section names.
   - Forbid `defineRockets(`, `NestJS`, and `Stargate` across Rockets content, snippets, custom components, and route metadata.
   - Replace assertions tied to `OutputsBento` and the old vision/provider copy.
   - Verification: `node --test site-tests/rockets-integration.test.mjs` fails for the expected missing/new content assertions.

2. Replace the hero facade and launch sequence — `components/landing/rockets/snippets.ts`, `components/landing/rockets/HeroWindow.tsx`
   - Rename the first tab to Server and make `createServer(...)` its default code example.
   - Keep the authentication and storage examples grounded in current repository contracts.
   - Map root configuration keys to concrete outcomes in the right-hand panel.
   - Preserve semantic tabs, visible focus, reduced motion, and mobile-safe code presentation.
   - Verification: the focused integration test passes its API-name and hero assertions.

3. Build the concise product composition — `components/landing/rockets/RocketsLanding.tsx`, `components/landing/rockets/content.tsx`, `components/landing/rockets/ServerSurface.tsx`, `components/landing/rockets/ProviderSpotlights.tsx`, `components/landing/rockets/OwnershipBoundary.tsx`, `components/landing/sections/Hero.tsx`, `components/landing/types.ts`
   - Define a Rockets content object containing only hero, FAQ, closing CTA, and copy used by the product-specific sections.
   - Compose Aurora, Hero, ServerSurface, ProviderSpotlights, OwnershipBoundary, Faq, and ClosingCta under the existing MotionConfig and `.lp-root` shell.
   - Narrow the shared Hero prop type to its actual content subset without changing runtime behavior for other pages.
   - Merge identity and storage demonstrations into one compact provider section.
   - Add a concrete Rockets-versus-team responsibility comparison.
   - Remove `components/landing/rockets/OutputsBento.tsx` after its unique information is represented in ServerSurface.
   - Verification: the focused integration test passes; `git diff` shows no behavioral edits to other product content.

4. Tighten Rockets-specific styling — `components/landing/landing.css`
   - Reuse the existing Night/Panel/Lift/Launch/Flame palette and Inter/JetBrains Mono roles.
   - Add narrowly scoped layout styles for server surface and ownership boundary.
   - Simplify obsolete Rockets vision/bento selectors and remove dead selectors associated only with deleted components.
   - Ensure 44 px mobile tab targets, visible focus, reduced-motion behavior, and no document-level horizontal overflow.
   - Verification: `git diff --check`; browser inspection at 1440 × 900 and 390 × 844.

5. Align metadata, FAQ, and final content contracts — `src/app/rockets/page.tsx`, `components/landing/rockets/content.tsx`, `site-tests/rockets-integration.test.mjs`
   - Remove implementation-framework naming from route metadata and all user-visible copy.
   - Limit FAQ to six approved questions and distinguish launch facade from alpha behavior without introducing a competing facade name.
   - Keep repository and guide CTAs external and standalone.
   - Verification: `rg -n "NestJS|Stargate|defineRockets" components/landing/rockets src/app/rockets` returns no matches; focused test passes.

6. Verify, review, and publish
   - Run `pnpm test:site`.
   - Run `pnpm build`.
   - Browser-test `/rockets` at desktop and mobile, exercise Server/Auth/Storage by pointer and keyboard, inspect console errors, confirm no horizontal overflow, and record document height.
   - Review `git diff origin/main...HEAD` for unrelated files or regressions.
   - Commit the implementation, push the current branch, open a PR against `main`, wait for required checks, and merge only when the PR diff and checks are clean.

## Test Strategy

- Integration contract: `site-tests/rockets-integration.test.mjs` validates the route, shell, API naming, standalone positioning, section composition, and forbidden terminology.
- Full site regression: `pnpm test:site` confirms shared product pages remain wired.
- Production compile: `pnpm build` catches TypeScript, Next.js, and static-rendering regressions.
- Browser: desktop/mobile responsive layout, tab interaction, focus behavior, overflow, console, reduced motion, and page-height targets.

## Risks and Stop Conditions

- Risk: the launch page can drift from the package API — mitigation: use only fields present in the current root options contract and avoid claiming that the facade is already published.
- Risk: shared CSS cleanup can affect other product pages — mitigation: remove only selectors proven Rockets-specific and inspect shared-page test/build results.
- Risk: Chrome extensions can create hydration noise — mitigation: distinguish extension-owned errors from application-owned errors and corroborate with a production build.
- Stop before merge if required checks fail, the PR includes unrelated files, other product-page behavior changes, mobile overflow appears, or the launch facade conflicts with current product direction.

## Rollout

- Feature flag: none; `/rockets` is already an isolated route on the feature branch.
- Deployment: normal merge to `main` after PR checks.
- Rollback: revert the implementation commit or PR merge.

# Concepta Home Surgical Review Implementation Plan

**Status:** Implemented; proof decisions partially superseded

> **Historical plan:** The proof-restoration design at
> `docs/superpowers/specs/2026-07-18-concepta-home-proof-restoration-design.md`
> supersedes the client exclusions, open-source adoption exclusions, shortened
> product descriptions, four-logo grid, and 650-word target in this plan. Do
> not reuse those instructions for future homepage work.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Concepta home page shorter, evidence-backed, contactable, correctly canonicalized, and respectful of reduced-motion preferences without redesigning it.

**Architecture:** Keep `ConceptaHome.tsx` as the existing page composition and project-visual owner, but replace its marketing constants and section copy surgically. Add a small server component for root-only Organization JSON-LD, attach it from the root MDX entry, and express the root-only canonical in that entry's frontmatter. Source-contract tests lead each behavior change.

**Tech Stack:** Next.js App Router, Nextra MDX, React, TypeScript/JSX, Framer Motion, Node's built-in test runner, CSS-in-JSX

## Global Constraints

- Preserve the existing hero, research card, eight-project catalog, project windows, dark Concepta identity, and CTA destinations.
- Publish only the facts and clients approved in `docs/superpowers/specs/2026-07-18-concepta-home-surgical-review-design.md`.
- Root canonical is `/`; documentation and standalone product routes must not inherit `/` as their canonical.
- Verified contact is `Concepta Technologies, LLC`, `+1 (407) 720-4711`, at `111 N Orange Ave, Suite 800, Orlando, FL 32801`. The March 24, 2026 Florida filing supersedes the former address still present in Google-derived listings.
- Do not add dependencies, an unverified email address, or legacy URL redirects in this pass.
- Production code follows a witnessed red-green test cycle.

---

### Task 1: Establish the Concepta content, contact, SEO, and motion contracts

**Files:**
- Create: `site-tests/concepta-home-content.test.mjs`

**Interfaces:**
- Consumes: source files for the Concepta page, root route, root layout, root MDX entry, and structured-data component
- Produces: a focused source contract used by Tasks 2–5

- [ ] **Step 1: Write failing tests for supported and excluded proof**

Add assertions that require `Since 2006`, `600+ projects`, and `98% happy clients`, while excluding the Truist/Google client objects, `27% more loan applications`, `4.7★`, `16k reviews`, `35+`, and the Google/Toyota/Nubank product-use sentence.

- [ ] **Step 2: Write failing tests for semantic contact and JSON-LD**

Require an `address` element, `tel:+14077204711`, the complete street address, a Google Maps search URL, an `Organization` JSON-LD server component, `PostalAddress`, the normalized telephone, and shared contact constants.

- [ ] **Step 3: Write failing tests for metadata and reduced motion**

Require `metadataBase: new URL('https://concepta.dev')`, root-frontmatter `alternates.canonical: /`, `MotionConfig reducedMotion="user"` with `skipAnimations`, a `prefers-reduced-motion` CSS override for project-card movement, a hero-video pause control, semantic project `h3` elements, and AA contrast for the audited color pairs.

- [ ] **Step 4: Run the focused test and witness the expected failures**

Run: `node --test site-tests/concepta-home-content.test.mjs`

Expected: content, contact, structured-data, metadata, and reduced-motion tests fail because the revised behavior is not implemented.

### Task 2: Replace unsupported proof and tighten page copy

**Files:**
- Modify: `components/ConceptaHome.tsx`
- Modify: `src/content/index.mdx`
- Test: `site-tests/concepta-home-content.test.mjs`

**Interfaces:**
- Consumes: the approved exact copy and evidence boundary in the design spec
- Produces: `ConceptaHome`, with the same public component signature and destinations

- [ ] **Step 1: Replace proof constants**

Set the proof ticker to `['Since 2006', '600+ projects', '98% happy clients']`. Keep only AdventHealth, FEMA, Red Lobster, and Warner Music Group in `TRUSTED_BY`. Delete `TRUST_OUTCOMES` and replace numeric `PILLARS` content with the approved Senior-led, Release-owned, and Field-tested labels.

- [ ] **Step 2: Replace section and project copy exactly**

Apply the hero, delivery-model, research, project-introduction, eight project descriptions, and closing CTA strings from section 3 of the design spec. Change both primary buttons to `Assess delivery readiness`.

- [ ] **Step 3: Remove obsolete rendering and CSS**

Delete the trust-outcome row and styles, the unused Google logo sizing rule, and the numeric-pillar class name. Change the client grid from six to four columns at desktop and two at narrower widths.

- [ ] **Step 4: Tighten root metadata copy**

Set both `src/content/index.mdx` and `src/app/layout.jsx` to `Concepta takes software from working code through production and builds open-source tools for reliable delivery.`

- [ ] **Step 5: Run the focused proof/copy contract**

Run: `node --test --test-name-pattern='proof|copy' site-tests/concepta-home-content.test.mjs`

Expected: proof and copy tests pass; contact, SEO, and motion tests remain red until their tasks are complete.

### Task 3: Add verified, actionable company contact

**Files:**
- Modify: `components/ConceptaHome.tsx`
- Modify: `components/constants.ts`
- Test: `site-tests/concepta-home-content.test.mjs`

**Interfaces:**
- Consumes: the approved legal name, telephone, street address, and Google Maps query
- Produces: shared verified contact constants and a semantic `address` block within the closing section

- [ ] **Step 1: Add shared contact constants**

Export `CONCEPTA_SITE_URL`, display phone, `tel:` URL, display address, Google Maps URL, and structured address fields from `components/constants.ts`.

- [ ] **Step 2: Add semantic contact markup**

After the existing GitHub handoff, render `Concepta Technologies, LLC`, an anchor with `href="tel:+14077204711"`, and an external Google Maps anchor containing `111 N Orange Ave, Suite 800, Orlando, FL 32801`. Give the map link a descriptive accessible label and `rel="noopener noreferrer"`.

- [ ] **Step 3: Add compact responsive styles**

Add a bordered `contact-card` with normal address font style, restrained mono label, wrapping contact links, visible hover/focus color, and a mobile rule that stacks the contact items.

- [ ] **Step 4: Run the focused contact contract**

Run: `node --test --test-name-pattern='contact' site-tests/concepta-home-content.test.mjs`

Expected: the visible-contact test passes; the JSON-LD test remains red.

### Task 4: Correct the primary domain, canonical, and Organization data

**Files:**
- Create: `components/ConceptaStructuredData.tsx`
- Modify: `components/constants.ts`
- Modify: `src/content/index.mdx`
- Modify: `src/app/layout.jsx`
- Test: `site-tests/concepta-home-content.test.mjs`

**Interfaces:**
- Produces: `ConceptaStructuredData(): JSX.Element`
- Consumes: `ConceptaStructuredData` from root `src/content/index.mdx`

- [ ] **Step 1: Implement the server-rendered Organization schema**

Create a dependency-free server component whose object contains `@context: 'https://schema.org'`, `@type: 'Organization'`, `@id: 'https://concepta.dev/#organization'`, `name: 'Concepta'`, `legalName: 'Concepta Technologies, LLC'`, the Concepta site URL, the square white-surface-safe `/apple-icon.png` logo, `telephone: '+1-407-720-4711'`, a complete `PostalAddress`, and the Concepta GitHub and LinkedIn URLs. Consume the shared constants and serialize with `JSON.stringify(...).replace(/</g, '\\u003c')`.

- [ ] **Step 2: Render schema only on the root content entry**

Import and render `<ConceptaStructuredData />` in `src/content/index.mdx` immediately before `<ConceptaHome />`. Do not add it to the shared layout.

- [ ] **Step 3: Correct the metadata base**

Change the single `metadataBase` URL in `src/app/layout.jsx` to `https://concepta.dev`.

- [ ] **Step 4: Add a root-only canonical**

Add `alternates:` with nested `canonical: /` to `src/content/index.mdx` frontmatter. Do not place a canonical in the shared layout or catch-all route.

- [ ] **Step 5: Run the focused SEO contract**

Run: `node --test --test-name-pattern='metadata|structured' site-tests/concepta-home-content.test.mjs`

Expected: domain, root-only canonical, and structured-data tests pass.

### Task 5: Repair page-local accessibility issues

**Files:**
- Modify: `components/ConceptaHome.tsx`
- Modify: `components/HeroBackground.tsx`
- Modify: `site-tests/concepta-home-video.test.mjs`
- Test: `site-tests/concepta-home-content.test.mjs`

**Interfaces:**
- Consumes: Framer Motion's `MotionConfig` and `useReducedMotion` APIs plus the existing hero video
- Produces: immediate reduced-motion rendering, pausable decorative media, semantic project headings, and AA color pairs

- [ ] **Step 1: Wrap the experience in MotionConfig**

Import `MotionConfig` and `useReducedMotion`, calculate `shouldReduceMotion`, and wrap the `concepta-home` root with `<MotionConfig reducedMotion="user" skipAnimations={shouldReduceMotion === true}>`.

- [ ] **Step 2: Complete reveals and disable CSS spatial motion for reduced-motion users**

Give every reveal wrapper a shared class. Under `@media (prefers-reduced-motion: reduce)`, force those wrappers to `opacity: 1` with no transform, remove project-card transition and hover translation, and remove the nested arrow transition/translation.

- [ ] **Step 3: Add a video motion control**

Give the video a ref and state synchronized on mount and by `onPlay`/`onPause`. Render a 44 px play/pause button outside the `aria-hidden` background and below the fixed navigation footprint, with the stable accessible name `Background motion` and `aria-pressed` matching playback. Pause automatically when reduced motion is requested and keep the current CSS rule that hides the video.

- [ ] **Step 4: Repair semantics and contrast**

Render project names as `h3`, change Ack's accent to `#6E8BFF`, and change the primary hover blue to `#4963FF`.

- [ ] **Step 5: Run the focused accessibility contracts**

Run: `node --test --test-name-pattern='motion|accessibility|contrast' site-tests/concepta-home-content.test.mjs site-tests/concepta-home-video.test.mjs`

Expected: all motion, video-control, heading, and contrast assertions pass.

### Task 6: Full verification and visual critique

**Files:**
- Review: every changed file

**Interfaces:**
- Consumes: the completed implementation and acceptance criteria
- Produces: evidence that the surgical pass is complete

- [ ] **Step 1: Run static and site checks**

Run: `git diff --check`

Expected: no output.

Run: `pnpm test:site`

Expected: all site tests pass with no warnings or failures.

- [ ] **Step 2: Run the production build**

Run: `pnpm build`

Expected: Next.js build and Pagefind postbuild complete successfully.

- [ ] **Step 3: Verify desktop rendering**

At 1440 × 900, inspect hierarchy, all sections, client logos, contact links, canonical metadata, JSON-LD, application console, and primary/secondary CTA destinations. Confirm rendered main copy is at most 650 words.

- [ ] **Step 4: Verify mobile rendering**

At 390 × 844, inspect the hero CTA label, two-column client grid, delivery cards, project cards, contact wrapping, keyboard focus, reduced motion, and document width. Confirm `scrollWidth <= clientWidth`.

- [ ] **Step 5: Review the final diff against the approved evidence boundary**

Run: `git diff --stat && git diff -- components/ConceptaHome.tsx components/HeroBackground.tsx components/ConceptaStructuredData.tsx components/constants.ts src/content/index.mdx src/app/layout.jsx site-tests/concepta-home-content.test.mjs site-tests/concepta-home-video.test.mjs`

Expected: only the approved page, metadata, schema, tests, spec, and plan are changed; no unsupported claims or unrelated product behavior are introduced.

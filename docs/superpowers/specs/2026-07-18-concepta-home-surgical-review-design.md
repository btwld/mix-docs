# Concepta Home Surgical Review

**Date:** 2026-07-18
**Status:** Implemented and verified
**Page:** `/`

## 1. Product Decision

The Concepta home page remains a delivery-company page, not a general agency brochure or a catalog-first open-source page. Its single job is to give a technical or business decision-maker enough clarity and confidence to start a Delivery Readiness Assessment.

The existing visual direction is strong and stays intact: a direct hero thesis, dark production-oriented identity, one credibility band, the research report, and product-specific project windows. This pass removes unsupported proof and repetition, adds an operational contact path, and repairs the metadata and motion gaps without expanding into a redesign.

### Core promise

> We ship the systems your business runs on.

### Explicit exclusions

- Do not invent or infer case-study outcomes from client logos.
- Do not publish the Truist `27%` outcome without internal evidence.
- Do not attribute `4.7★ across 16k reviews` to AdventHealth; the public source for that statistic concerns AMN Passport.
- Do not claim that Concepta open-source code runs inside products at Google, Toyota, or Nubank without direct evidence.
- Do not display Truist or Google as Concepta clients without an internal source that can be reviewed.
- Do not add an email address that has not been verified as an inbound contact channel.
- Do not publish the former `201 S Orange Ave` location as current; Google-derived listings lag the March 2026 Florida filing.
- Do not repair the separate legacy case-study URL migration in this page pass.
- Do not restructure unrelated docs or product pages.

## 2. Evidence Boundary

The implementation may publish only facts supported by current public records, Concepta's own published history, or current repository behavior.

- Company history: `Since 2006`, `600+ projects`, and `98% happy clients` are retained from Concepta's published company history.
- Selected clients: AdventHealth, FEMA, Red Lobster, and Warner Music Group have public Concepta case-study or company-page support.
- Legal entity: `Concepta Technologies, LLC`, supported by the current site copyright and active Florida corporate record.
- Address: `111 N Orange Ave, Suite 800, Orlando, FL 32801`, supported by the LLC's March 24, 2026 Florida annual report. Google-derived listings still show the former `201 S Orange Ave` location, so the newer official filing takes precedence.
- Phone: `+1 (407) 720-4711`, supported by current business listings and matching legacy Concepta properties.
- Website: `https://concepta.dev` is the live primary site; `conceptatech.com` redirects there.
- GitHub: `https://github.com/conceptadev` is already the repository's Concepta organization URL.
- LinkedIn: `https://www.linkedin.com/company/concepta-tech` is the current company profile.

No Notion connector or local Notion export is available in this workspace. Claims requiring internal substantiation remain excluded rather than treated as true.

## 3. Narrative and Exact Copy

### Hero

- Keep the stance: **Building got faster. Shipping safely didn't.**
- Keep the headline: **We ship the systems your business runs on.**
- Replace the lead with: **Code is only the start. We own the decisions, release, and outcome required to put critical systems safely into production.**
- Shorten the primary action to **Assess delivery readiness**.
- Keep **Explore our projects** as the secondary action.
- Use one durable proof line: **Since 2006 / 600+ projects / 98% happy clients**.

### Credibility band

- Label the band **Selected clients**.
- Show only AdventHealth, FEMA, Red Lobster, and Warner Music Group.
- Remove the outcome sentence entirely. The hero proof line already carries the supported quantitative evidence.

### Delivery model

- Label: **What Concepta does**
- Title: **We own the path to production.**
- Lead: **One senior team from readiness through release. We make the hard technical decisions, stabilize or build, and stand behind what ships.**
- Cards:
  - **Senior-led / The people you meet stay in the work.** Concepta leadership stays involved through the decisions, release, and outcome.
  - **Release-owned / One team owns the hard parts.** We assess, stabilize, build, and release without passing critical decisions between vendors.
  - **Field-tested / Our tools start in delivery work.** We turn recurring delivery problems into reusable foundations for the next release.

### Research

- Title: **The evidence behind safer delivery.**
- Lead: **AI accelerates building faster than most teams can strengthen review, release, and production controls. Our latest report maps the gap and how to close it.**
- Keep the existing report card and destination.

### Projects

- Keep the label and title.
- Replace the lead with: **These tools began in real delivery work. We extracted and hardened the patterns teams need repeatedly—from Flutter UI and validation to backend foundations and code analysis.**
- Keep all eight projects and their current visual windows.
- Tighten descriptions without changing each product's capability boundary:
  - Mix: **Chainable styles, variants, and tokens for Flutter design systems—without boilerplate.**
  - Remix: **20+ accessible, fully styleable Flutter components built on Mix.**
  - Naked UI: **Fourteen headless controls with semantics, keyboard support, focus, overlays, and observable state.**
  - Ack: **Define Dart schemas once, validate data and AI responses at runtime, and keep static types.**
  - FVM: **Pin Flutter SDKs per project and keep local development and CI on the same version.**
  - Rockets: **One typed definition wires identity, storage, resources, access policies, hooks, and OpenAPI at runtime.**
  - Stargate: **Turn APIs, workflows, and rules into governed capabilities with permissions, approvals, human review, and audit trails.**
  - Code Analysis: **Run deterministic analyzers and an AI review pipeline across a repository to produce an evidence-backed scorecard.**

### Closing action and contact

- Title: **Know whether your release is ready.**
- Lead: **In two to three weeks, a Delivery Readiness Assessment shows where delivery is exposed and what to fix first.**
- Primary action: **Assess delivery readiness**.
- Keep community and GitHub actions.
- Add a semantic `address` block for **Concepta Technologies, LLC** with:
  - telephone link: `tel:+14077204711`
  - visible phone: `+1 (407) 720-4711`
  - Google Maps link for `111 N Orange Ave, Suite 800, Orlando, FL 32801`

## 4. Visual Design

### Subject, audience, and signature

The subject is production delivery ownership; the audience is a decision-maker responsible for a consequential software release. The existing project-window system remains the visual signature because it makes Concepta's delivery foundation tangible rather than presenting a generic services grid.

The intentional design risk is subtraction: remove two high-status logos, every unsupported outcome, and the large numeric card labels. The quieter proof system should feel more credible precisely because it is specific and restrained.

### Token system

Preserve the existing Concepta roles:

- **Carbon:** `#111111` — page and browser theme
- **Signal blue:** `#3A5BFF` — primary action and headline stop
- **Delivery aqua:** `#00EBBC` — stance, labels, and separators
- **White:** `#FFFFFF` — thesis and section headings
- **Surface and muted roles:** existing `--mix-surface`, `--mix-border-card`, and `--mix-text-muted` variables

Preserve Inter for display/reading and JetBrains Mono for proof, labels, and operational data. Do not introduce another typeface or decorative motif.

### Layout

```text
HERO THESIS + ACTIONS + ONE PROOF LINE
SELECTED CLIENTS
DELIVERY MODEL: THREE QUALITATIVE CARDS
RESEARCH REPORT
EIGHT PROJECT WINDOWS
CLOSING ACTION
VERIFIED COMPANY CONTACT
```

On mobile, retain the same narrative order, two-column client-logo grid, single-column delivery cards, and single-column project cards. The address and phone stack without horizontal overflow.

## 5. SEO and Structured Data

- Change the global `metadataBase` from `https://fluttermix.com` to `https://concepta.dev` so relative Concepta social assets resolve to the live primary domain.
- Add an `/` canonical only in `src/content/index.mdx` frontmatter. Documentation pages must continue to use their own metadata and must not inherit `/` as canonical.
- Tighten both the root frontmatter and shared Concepta description to: **Concepta takes software from working code through production and builds open-source tools for reliable delivery.**
- Render one server-side `Organization` JSON-LD object on the root page with `name`, `legalName`, `url`, `logo`, `telephone`, `PostalAddress`, GitHub, and LinkedIn.
- Use the square 256 × 256 `apple-icon.png` as the structured-data logo so the mark remains legible on white search surfaces.
- Escape `<` in serialized JSON-LD before placing it in `dangerouslySetInnerHTML`.
- Keep the verified site, phone, address, map, and social URLs in `components/constants.ts` so visible contact and structured data cannot drift.

## 6. Accessibility and Motion

- Wrap the Concepta experience in `MotionConfig reducedMotion="user"` and set `skipAnimations` from `useReducedMotion()`.
- Under `prefers-reduced-motion: reduce`, force every shared reveal wrapper to its final visible state and remove project-card hover movement and nonessential transitions. This protects content even when server-rendered reveal styles initially use zero opacity.
- Add a 44 px play/pause control for the decorative hero video outside its `aria-hidden` background and below the fixed navigation footprint. The control uses the stable accessible name `Background motion`, synchronizes `aria-pressed` with the mounted media element and subsequent playback events, and pauses automatically under reduced motion.
- Keep all existing links keyboard reachable with visible focus.
- Keep the client list semantics and descriptive logo alternatives.
- Use semantic `address`, `tel:`, and labeled external-map links for company contact details.
- Render every project name as an `h3` beneath the Projects `h2`.
- Change Ack's small-text card accent from `#315CFF` to `#6E8BFF` and the primary-button hover background from `#5570FF` to `#4963FF`; each reaches at least 4.5:1 against its actual background/text color.

## 7. Acceptance Criteria

- The root page contains none of the excluded proof claims or unsupported client entries.
- The supported proof line and four selected clients render once.
- Main-page copy is materially shorter than the 766-word audited baseline, with a target of no more than 650 rendered words.
- The verified phone and full address are visible, actionable, and represented in Organization JSON-LD.
- Root metadata resolves against `https://concepta.dev` and emits canonical `/`; docs routes do not receive the root canonical.
- Reduced-motion preferences immediately complete Framer reveals, stop CSS hover movement, hide and pause the background video, and leave all content visible.
- Normal-motion users can pause and resume the decorative video with a keyboard-accessible control whose pressed state matches playback.
- Project names participate in heading navigation, and the audited small-text/button color pairs meet WCAG AA contrast.
- The page has no horizontal overflow at 390 px.
- Focused content tests, the full site test suite, `git diff --check`, and the production build pass.
- Desktop and mobile browser checks show the intended hierarchy, working links, no application console errors, and no material visual regression.

# Remix Home Page — Design

Date: 2026-04-17

## Context

Mix has a dedicated marketing home at `/` rendered by `components/HomeContent.tsx` (imported from `src/content/index.mdx`). Remix currently has only a placeholder docs landing at `/documentation/remix/index.mdx` that says "coming soon".

This design introduces a parallel Remix home at `/remix` so each product has its own entry-point page, matched by the existing product-aware theme and switcher.

## Goals

- Give Remix its own marketing home at `/remix`.
- Flip the site theme to the Remix green accent the moment the user lands on `/remix`.
- Make the product switcher in the floating navbar jump to `/remix` when "Remix" is selected.
- Keep the Remix home honest: Remix is early, so scope is deliberately lean.

## Non-Goals

- Redesigning the Mix home.
- Building a shared "HomeShell" abstraction between Mix and Remix homes.
- Making the navbar "Home" button product-aware — it stays hardcoded to `/`.
- Adding a hero-sized Remix logo asset. The hero uses a text wordmark for now.

## Route & Files

- **New:** `src/content/remix.mdx` — Nextra file-route that imports and renders `<RemixHome />`. Mirrors the shape of `src/content/index.mdx`.
- **New:** `components/RemixHome.tsx` — page body component.
- **Modified:** `src/app/layout.jsx` — inline `data-product` bootstrap script extended to recognize `/remix` and `/remix/*`.
- **Modified:** `components/FloatingNavbar.tsx` — `getActiveProduct` extended to recognize `/remix*`; `PRODUCTS` array's Remix `href` changed from `/documentation/remix` to `/remix`.

No `globals.css` changes — the existing `html.dark[data-product="remix"]` override already handles the green accent.

## Product-Aware Theme Wiring

Two places key off pathname to set `data-product` on `<html>`:

1. **Inline bootstrap script** in `src/app/layout.jsx` (runs before hydration):
   - Current: `p.startsWith('/documentation/remix') ? 'remix' : 'mix'`
   - New: matches `/documentation/remix*` OR `/remix` OR `/remix/*` → `'remix'`, else `'mix'`.

2. **`getActiveProduct`** in `components/FloatingNavbar.tsx` (runtime, post-hydration):
   - Same match logic as the bootstrap script. Keep it a pure function so both call sites read the same rules.

Extract the rule into a single helper both use — either a shared util or inlined identically in both. Given there are only two call sites and the rule is one line, inline it identically. If a third caller appears, extract.

## `<RemixHome />` Structure

Reuses existing primitives: `HeroBackground`, `Layout`, `Button`. No new shared components.

Three sections, top-to-bottom:

### 1. Hero

- Wordmark: text "Remix" rendered with the same gradient treatment as Mix's `.headline` class (white → zinc). Sized large. No image asset.
- Headline: short product tagline (copy TBD during implementation — 2–3 options proposed in the plan).
- Subtitle: one sentence framing Remix as "the component library built on top of Mix".
- Two buttons:
  - Primary: "Browse docs" → `/documentation/remix`
  - Secondary: "Join the community" → `https://discord.com/invite/Ycn6GV3m2k` (target=_blank)

### 2. Coming-soon note

A single bordered card (matching the existing `.rounded-2xl ring-1 ring-white/[0.08] bg-[var(--mix-surface)]` treatment from the Mix home's before/after section) containing:

- Short headline: "Remix is early."
- One paragraph: widget references, guides, and tutorials are on the way; in the meantime, see the Mix docs for the underlying framework.
- Inline link to `/documentation/mix/overview/introduction`.

No feature showcase, no before/after comparison, no `flutter pub add` terminal — those return when Remix has real surface area.

### 3. CTA

Mirrors the shape of Mix's bottom CTA (`.cta-section` in `HomeContent.tsx`):

- Section title: short ("Follow along.")
- Subtitle: one sentence.
- Two buttons side-by-side:
  - "View on GitHub" → `https://github.com/btwld/mix` (target=_blank)
  - "Join Discord" → Discord URL (target=_blank)

### Styling

Reuse the class patterns from `HomeContent.tsx` (`.hero-section`, `.section-gap`, `.headline`, `.subtitle`, `.section-title`, `.cta-section`) via the same `<style jsx global>` block copied into `RemixHome.tsx`. Because `data-product="remix"` is set on `<html>`, all references to `var(--mix-accent)` automatically resolve to the green override.

Do not share the `<style jsx global>` block between the two files — the classes collide and global styled-jsx means last-renderer-wins. Keeping them in their respective components and scoped to each route works because only one home renders at a time.

## Animations

Reuse the same `framer-motion` `fadeUp` and `sectionReveal` patterns from `HomeContent.tsx`. Hero stages animate in with stepped delays (0, 0.1, 0.2, 0.3); downstream sections use `whileInView` reveal.

## Testing / Verification

Manual dev-server verification before merge:

1. Navigate to `/remix` — page renders, accent is green, product switcher shows Remix as active.
2. Navigate to `/` — accent flips back to purple, switcher shows Mix as active.
3. Click the Remix logo in the product switcher from `/` — lands on `/remix`.
4. Click "Home" in the navbar from `/remix` — lands on `/` (Mix), accent flips to purple.
5. Navigate to `/documentation/remix` — accent stays green (existing behavior preserved).
6. Hard-reload `/remix` — theme is green on first paint (bootstrap script catches it before hydration).

No unit tests; this is presentational code with behavior driven by existing, already-verified primitives.

## Risks / Open Questions

- **Hero copy** is not finalized. The implementation plan will propose 2–3 headline/subtitle options for sign-off before code lands.
- **Hero wordmark treatment** — text gradient styled identically to Mix's headline may feel too similar. If it does, the fallback is a smaller, monospace-styled "REMIX" label above a conventional headline. Decide during implementation after seeing it rendered.

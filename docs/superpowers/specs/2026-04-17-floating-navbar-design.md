# Floating Centered Navbar — Design

## Goal

Replace the current full-width Nextra navbar (which contains the Mix logo on the left, Docs/Version links, search, and GitHub/Twitter icons on the right) with a floating, centered pill-shaped navigation bar. The Mix logo is removed entirely. The bar stays sticky while scrolling.

## Behavior

**Desktop (≥ 768px)**

- A pill-shaped, horizontally centered floating bar is fixed near the top of the viewport (`top: 16px`).
- The pill contains, in this order: **Docs** link, **Version** menu, **Search**.
- GitHub and Twitter icon links are rendered as a separate floating element pinned to the top-right of the viewport (also `top: 16px`).
- Both elements use `position: fixed`, so they remain visible while scrolling.

**Mobile (< 768px)**

- The right-side icon group is hidden.
- The pill's Docs link and Version menu collapse into a single hamburger button.
- The pill in compact form contains: **Search icon** + **Hamburger**.
- Tapping the hamburger opens a custom top-sheet drawer with: Docs, Version (Mix v1, Mix v2), GitHub, Twitter.
- Nextra's sidebar toggle behavior is unchanged.

## Implementation

### New component: `components/FloatingNavbar.tsx`

Renders the navbar as a fragment with three pieces:

1. **In-flow header spacer** — an empty `<header>` with a fixed height (~64px). This reserves vertical space at the top of the page so content below isn't hidden under the fixed pill. Without this, Nextra's `<Layout>` would render content starting at `y: 0`.
2. **Centered pill** — `position: fixed; top: 16px; left: 50%; transform: translateX(-50%);` containing Docs link, Version dropdown, Search.
3. **Right icons** — `position: fixed; top: 16px; right: 24px;` containing GitHub and Twitter buttons.

The component is self-contained — no props.

### Pill visual style

- Background: `var(--mix-surface)`, slightly translucent
- Backdrop: `backdrop-filter: blur(12px)`
- Border: `1px solid var(--mix-border-card)`
- Radius: `9999px` (full pill)
- Padding: `6px 10px`
- Soft drop shadow for floating depth
- Items separated by a thin vertical divider (`1px` × `60%` height)
- Active link uses `var(--mix-accent)` (driven by `data-product` so Remix pages tint green automatically)

### Right icons style

- Same translucent surface + blur + border treatment as the pill
- Each icon is a circular button (~32px), GitHub and Twitter SVGs reused from Nextra's defaults or a local icon set
- Group sits as a smaller pill on the right edge

### Search

- Use Nextra's standalone `<Search>` component imported from `nextra/components` (confirmed exported in `node_modules/nextra/dist/client/components/search.js`). This preserves Pagefind wiring with no extra setup.

### Version menu

- Defined in `src/content/_meta.js` under `version` (`type: 'menu'`). Items: Mix v2 (`/`) and Mix v1 (external URL).
- Re-implemented inline in the component as a small dropdown:
  - Trigger: a button labeled "Version" with a chevron
  - Popover: a small panel with the two items as anchor links
  - Closes on outside click and on item selection
- Hardcoding the two items inside the component is acceptable here — the list is short, stable, and keeping it local avoids hooking into Nextra's `pageMap` for a one-off use.

### Active link state

- Use `usePathname()` from `next/navigation`. The Docs link is "active" when the pathname starts with `/documentation`. Active styling: text color `var(--mix-accent)`, no underline.

### Mobile drawer

- A simple custom component (no library): a fixed top-sheet that slides down when open.
- Backdrop with `bg-black/50` to dismiss on click outside.
- Contents: Docs link, Version section (Mix v2, Mix v1), GitHub link, Twitter link.
- Open state managed with `useState` inside `FloatingNavbar`.
- Closes on route change.

### Sticky behavior

- Both the pill and the right icons are `position: fixed`, so they stay at the same viewport position during scroll. No scroll listeners or `position: sticky` parents are needed.

### Files touched

| File | Change |
|------|--------|
| `components/FloatingNavbar.tsx` | New file |
| `src/app/layout.jsx` | Swap the `<Navbar logo=… chatLink=… projectLink=… />` JSX for `<FloatingNavbar />`; remove unused `Navbar` import |
| `globals.css` | Add any small overrides if Nextra's leftover navbar CSS leaks; verified none expected |

## Trade-offs

- **Pro:** Clean separation from Nextra's opinionated `<Navbar>` layout. Full control over pill aesthetic and right-side icon placement.
- **Pro:** No fragile CSS overrides targeting Nextra's internal class names (which can change between minor versions).
- **Con:** The version menu and mobile hamburger drawer are now owned in our codebase. Both are small (~50 LOC combined) and the version list is stable.
- **Con:** Active-route highlighting must be reimplemented (one `usePathname()` check). Trivial.

## Out of scope

- No changes to Nextra's sidebar, footer, or TOC behavior.
- No changes to existing Mix/Remix product switching logic.
- No theme switcher in the new navbar (the layout is `forcedTheme: "dark"` already).

## Acceptance

- Mix logo no longer visible at the top of any page.
- A centered, rounded pill containing Docs, Version, and Search is visible at the top of every page.
- A small group of GitHub and Twitter icons sits in the top-right.
- Both stay visible while scrolling.
- On screens narrower than 768px, the pill collapses to a search icon + hamburger; the hamburger opens a drawer with all nav items.
- Active link (Docs when on a documentation page) is visually distinguished with the accent color.

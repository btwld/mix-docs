# Mobile Docs Drawer: Expand Sections In Docs Mode

## Summary

On mobile, when the user is viewing a documentation page, the hamburger drawer should list every documentation page for the active product — grouped by top-level section — instead of showing only a single "Docs" link. Elsewhere (home, landing pages), the drawer keeps the existing single "Docs" link.

## Motivation

The mobile hamburger drawer in `components/FloatingNavbar.tsx` currently collapses the entire documentation area behind one "Docs" link, forcing users on mobile to load the docs landing page before they can see the sidebar and jump to a specific page. When the user is already "in docs mode" — i.e., on a `/documentation/*` route — we have enough context to surface every page directly in the drawer, matching the information density of the desktop sidebar without requiring a second tap.

## Scope

**In scope**
- Edits to `components/FloatingNavbar.tsx` only.

**Out of scope**
- The Nextra sidebar rendering or the CSS filtering in `globals.css`.
- The desktop floating navbar.
- Showing the inactive product's pages in the drawer.
- Accordion / collapse behavior — all pages are rendered flat under their section subheader.

## Design

### Trigger

"Docs mode" is `pathname?.startsWith('/documentation') === true`, already computed as `isDocsActive` in `FloatingNavbar`.

### Data

`DOCS_SECTIONS` is a `Record<'mix' | 'remix', DocsEntry[]>` where `DocsEntry` is a tagged-union: either a flat `{ label, href }` link or a `{ label, pages: { label, href }[] }` section. Labels and ordering mirror each `_meta.js` file exactly.

- **Mix** — all folder-based; five sections (Overview, Guides, Widgets, Tutorials, Ecosystem) each with their full page list (29 pages total).
- **Remix** — `index: 'Getting Started'` and `fortal: 'Fortal'` are rendered as flat top-level links (matching their shape in `_meta.js`); `components: 'Components'` is a section with 19 component pages.

Hrefs point at each concrete MDX leaf (e.g. `/documentation/mix/overview/introduction`); Nextra does not auto-resolve folder paths.

### Component plumbing

`MobileDrawer`'s props expand from `{ onClose, docsHref }` to `{ onClose, docsHref, activeProduct, isDocsActive }`. `FloatingNavbar` already owns both values and passes them through.

### Render branches

Inside `MobileDrawer`, replace the current single `<Link href={docsHref}>Docs</Link>` with:

- If `isDocsActive`: iterate `DOCS_SECTIONS[activeProduct]`. For each entry:
  - If `'pages' in entry`: render the entry's `label` as a subheader (`px-3 pt-3 text-xs uppercase tracking-wider text-white/40`, matching `Version` / `Links`), followed by each page as a drawer-item `<Link>` (`px-3 py-2 text-white/90 hover:bg-white/5 rounded`).
  - Else: render the entry as a drawer-item `<Link>` with the same style as a page link.
- Else: render the current single `<Link href={docsHref}>Docs</Link>` unchanged.

### Overflow handling

With up to ~35 drawer items on narrow viewports, the drawer can exceed the screen. Add `max-h-screen overflow-y-auto` to the drawer's inner container so the drawer scrolls internally when its content exceeds viewport height.

### Other

Import `Fragment` from `react` to serve as a keyed wrapper when emitting a subheader + its pages inside `.map`. No changes to the close-on-navigation `useEffect` (already triggers on `pathname` change, which covers the new links). No new CSS; only existing utility classes.

## Alternatives Considered

- **Show only top-level section names as links.** Previously implemented; rejected per user request — the user wanted every page surfaced in the drawer, not just five section names.
- **Always show the expanded list.** Rejected — adds density on the home/landing flow where the "Docs" CTA is intentionally prominent and short.
- **Show both products' pages.** Rejected — the product switcher directly above already lets the user change products.
- **Accordion with collapsible sections.** Rejected — scope creep and more state to maintain. Flat scrolling is simpler and acceptable on mobile.
- **Three Remix subheaders (Getting Started, Fortal, Components).** Rejected — creates redundant subheader-plus-single-link groupings for the one-off entries.

## Acceptance Criteria

1. On any `/documentation/mix/*` route on a narrow viewport, opening the hamburger drawer shows five subheaders (Overview, Guides, Widgets, Tutorials, Ecosystem) in that order, each followed by the pages from their respective `_meta.js` in declared order (29 page links total).
2. On any `/documentation/remix/*` route (or `/documentation/remix`) on a narrow viewport, the drawer shows: flat `Getting Started` link → flat `Fortal` link → `Components` subheader → 19 component links in the order declared in `remix/components/_meta.js`.
3. On `/`, `/remix`, or any non-documentation route on a narrow viewport, the drawer shows the existing single "Docs" link pointing to the active product's docs URL — no section list.
4. Tapping any link navigates to that page and closes the drawer (existing `useEffect` on `pathname` already handles the close).
5. When drawer content exceeds the viewport, the drawer scrolls internally (`max-h-screen overflow-y-auto`).
6. Desktop layout (≥ `md` breakpoint) is unchanged.
7. The Nextra sidebar, `globals.css` product-filtering rules, and any other file besides `components/FloatingNavbar.tsx` are unchanged.

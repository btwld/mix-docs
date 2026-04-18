# Mobile Docs Drawer: Expand Sections In Docs Mode

## Summary

On mobile, when the user is viewing a documentation page, the hamburger drawer should list the active product's top-level documentation sections inline instead of showing only a single "Docs" link. Elsewhere (home, landing pages), the drawer keeps the existing single "Docs" link.

## Motivation

The mobile hamburger drawer in `components/FloatingNavbar.tsx` currently collapses the entire documentation area behind one "Docs" link, forcing users on mobile to load the docs landing page before they can see the sidebar and jump to a specific section. When the user is already "in docs mode" — i.e., on a `/documentation/*` route — we have enough context to surface the top-level sections directly in the drawer, saving a tap and matching the information density of the desktop sidebar.

## Scope

**In scope**
- Edits to `components/FloatingNavbar.tsx` only.

**Out of scope**
- The Nextra sidebar rendering or the CSS filtering in `globals.css`.
- The desktop floating navbar.
- Showing the inactive product's sections in the drawer.
- Nested section navigation (children of sections) — sections link to their landing pages and Nextra handles further drill-down.

## Design

### Trigger

"Docs mode" is `pathname?.startsWith('/documentation') === true`, which is already computed as `isDocsActive` in the `FloatingNavbar` component.

### Data

Add a top-level constant alongside `PRODUCTS`, `VERSION_ITEMS`, and the existing `MIX_DOCS_URL` / `REMIX_DOCS_URL` constants:

```ts
const DOCS_SECTIONS: Record<'mix' | 'remix', { label: string; href: string }[]> = {
    mix: [
        { label: 'Overview', href: '/documentation/mix/overview/introduction' },
        { label: 'Guides', href: '/documentation/mix/guides/styling' },
        { label: 'Widgets', href: '/documentation/mix/widgets/stylewidgets' },
        { label: 'Tutorials', href: '/documentation/mix/tutorials/creating-a-widget' },
        { label: 'Ecosystem', href: '/documentation/mix/ecosystem/mix-tailwinds' },
    ],
    remix: [
        { label: 'Getting Started', href: '/documentation/remix' },
        { label: 'Fortal', href: '/documentation/remix/fortal' },
        { label: 'Components', href: '/documentation/remix/components/accordion' },
    ],
}
```

Labels and order mirror the `_meta.js` files at `src/content/documentation/mix/_meta.js` and `src/content/documentation/remix/_meta.js`. Nextra does not auto-resolve folder paths to their first child (verified via dev server), so each href points at the first leaf page of its section (following the `_meta.js` ordering), matching the existing `MIX_DOCS_URL = '/documentation/mix/overview/introduction'` pattern. Remix `Getting Started` uses `/documentation/remix` because `_meta.js` declares `index: 'Getting Started'`, which Nextra serves at the section root.

### Component plumbing

`MobileDrawer`'s props expand from `{ onClose, docsHref }` to `{ onClose, docsHref, activeProduct, isDocsActive }`. `FloatingNavbar` already owns both values (`activeProduct`, `isDocsActive`) and passes them through when rendering the drawer.

### Render branches

Inside `MobileDrawer`, replace the current single `<Link href={docsHref}>Docs</Link>` (and its preceding `mt-2` margin) with:

- If `isDocsActive`:
  - Render a `Docs` subheader using the existing label style: `className="px-3 pt-3 text-xs uppercase tracking-wider text-white/40"` (matches `Version` and `Links`).
  - Render one `<Link>` per entry in `DOCS_SECTIONS[activeProduct]`, using the existing drawer-item style `className="px-3 py-2 text-white/90 hover:bg-white/5 rounded"`.
- Else:
  - Render the current single `<Link href={docsHref} className="px-3 py-2 text-white/90 hover:bg-white/5 rounded mt-2">Docs</Link>` unchanged.

No styling beyond existing utility classes. No new imports. No changes to the close-on-navigation `useEffect` (already triggers on `pathname` change, which covers the new links).

## Alternatives Considered

- **Always show the expanded list.** Rejected — adds density on the home/landing flow where the "Docs" CTA is intentionally prominent and short.
- **Show both products' sections.** Rejected — the product switcher directly above already lets the user change products; duplicating remix entries under the mix product (and vice versa) would compete with that switcher.
- **Accordion with nested children.** Rejected — scope creep. Nextra's own sidebar handles the drill-down once the user taps into a section.

## Acceptance Criteria

1. Navigating to any `/documentation/mix/*` route on a narrow viewport and opening the hamburger drawer shows a "Docs" subheader followed by `Overview`, `Guides`, `Widgets`, `Tutorials`, `Ecosystem` — in that order — each linking to the first leaf page of its section (`/documentation/mix/overview/introduction`, `/documentation/mix/guides/styling`, `/documentation/mix/widgets/stylewidgets`, `/documentation/mix/tutorials/creating-a-widget`, `/documentation/mix/ecosystem/mix-tailwinds`).
2. Navigating to any `/documentation/remix/*` route (or `/documentation/remix`) on a narrow viewport shows a "Docs" subheader followed by `Getting Started`, `Fortal`, `Components`, linking to `/documentation/remix`, `/documentation/remix/fortal`, `/documentation/remix/components/accordion` respectively.
3. Navigating to `/`, `/remix`, or any non-documentation route on a narrow viewport shows the existing single "Docs" link pointing to the active product's docs URL — no section list.
4. Tapping any section link navigates to that page and closes the drawer (existing `useEffect` on `pathname` already handles the close).
5. Desktop layout (≥ `md` breakpoint) is unchanged.
6. The Nextra sidebar, `globals.css` product-filtering rules, and any other file besides `components/FloatingNavbar.tsx` are unchanged.

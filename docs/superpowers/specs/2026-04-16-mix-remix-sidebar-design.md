# Mix / Remix Sidebar Design

**Date:** 2026-04-16
**Status:** Draft — awaiting user review

## Goal

Let visitors switch between two distinct product docs — **Mix** and **Remix** — from a single "Docs" top-nav entry. When a user selects "Mix", the sidebar shows Mix-only pages; when they select "Remix", the sidebar shows Remix-only pages.

## Non-goals

- Authoring actual Remix documentation content. Remix ships with a placeholder landing page only; real content is added in a later PR.
- Adding a third product, version switcher changes, or navbar redesign.
- Changing preview registry / Flutter bundle structure.

## Decisions (from brainstorming)

| # | Question | Choice |
|---|----------|--------|
| 1 | Product relationship | Two distinct products with fully separate docs trees |
| 2 | Switcher location | At the top of the sidebar (not top nav) |
| 3 | Switcher visual style | Stacked links/tabs with an active indicator |
| 4 | Content structure | Move all existing docs into `documentation/mix/`; scaffold `documentation/remix/` |
| 5 | Initial Remix content | Minimal placeholder — a single `index.mdx` landing page |

## Architecture

### Content structure

```
src/content/documentation/
├── _meta.js                 # lists: mix, remix
├── mix/
│   ├── _meta.js             # overview, guides, widgets, tutorials, ecosystem
│   ├── overview/            # (moved) introduction, getting-started, comparison, migration, utility-first
│   ├── guides/              # (moved)
│   ├── widgets/             # (moved)
│   ├── tutorials/           # (moved, includes images/)
│   └── ecosystem/           # (moved)
└── remix/
    ├── _meta.js             # index
    └── index.mdx            # "Remix docs coming soon" placeholder
```

Existing files in `src/content/documentation/overview/`, `guides/`, `widgets/`, `tutorials/`, `ecosystem/` move verbatim into `src/content/documentation/mix/<section>/` with no content changes.

### URL scheme

| Old URL | New URL |
|---------|---------|
| `/documentation` | `/documentation/mix/overview/introduction` |
| `/documentation/overview/...` | `/documentation/mix/overview/...` |
| `/documentation/guides/...` | `/documentation/mix/guides/...` |
| `/documentation/widgets/...` | `/documentation/mix/widgets/...` |
| `/documentation/tutorials/...` | `/documentation/mix/tutorials/...` |
| `/documentation/ecosystem/...` | `/documentation/mix/ecosystem/...` |
| (new) | `/documentation/remix` |

Permanent (301) redirects are added in `next.config.mjs` so external links keep working.

### Default landing pages

- **Mix** → `/documentation/mix/overview/introduction`
- **Remix** → `/documentation/remix`

## Components

### `MixRemixSwitcher` (client component)

**Location:** `components/MixRemixSwitcher.tsx` (matches the convention of existing sibling components such as `VersionSelector.tsx`)

**Responsibilities:**
1. Detect the active product from `usePathname()`:
   - path starts with `/documentation/remix` → Remix active
   - any other path under `/documentation/` → Mix active
2. Render two stacked tab-style links ("Mix" and "Remix") with an active indicator (e.g., left-border accent or background pill, matching the existing Tailwind/Nextra aesthetic).
3. On click, navigate to the chosen product's default landing page via `next/link`.

**Rendering location:** at the top of the sidebar. The precise injection mechanism (Nextra theme slot vs. client-side React portal targeting the sidebar DOM vs. layout-level wrapper) is selected during plan writing; the component API is stable regardless.

### Sidebar filtering

The sidebar must show only the active product's tree. Preferred approach:

- **Route-scoped `pageMap`.** Use a nested layout (e.g., `src/app/documentation/[product]/layout.jsx`) or read the request pathname via `headers()` in the root layout, then call `getPageMap('/documentation/mix')` or `getPageMap('/documentation/remix')` and pass the filtered map to `<Layout>`. Nextra renders only that subtree in the sidebar.

If the preferred approach is incompatible with the current Nextra 4 layout structure, fall back to:

- **Client-side CSS filtering.** A small client component sets `data-product="mix" | "remix"` on `<html>` based on `usePathname()`. CSS hides the inactive product's sidebar group. Acceptable, but can cause a brief flash of the wrong sidebar on first paint.

The implementation plan picks one concretely after a short spike.

## Data flow

- **Source of truth for active product:** the URL path prefix.
- `MixRemixSwitcher` reads `usePathname()` → derives active product → renders correct active state.
- Clicking a tab changes the URL → Next.js re-renders layout with the new pageMap → sidebar updates → switcher re-derives active state. No shared React state, no context, no localStorage.

## Redirects

Added to `next.config.mjs` `redirects()`:

```js
{ source: '/documentation', destination: '/documentation/mix/overview/introduction', permanent: true },
{ source: '/documentation/overview/:path*',  destination: '/documentation/mix/overview/:path*',  permanent: true },
{ source: '/documentation/guides/:path*',    destination: '/documentation/mix/guides/:path*',    permanent: true },
{ source: '/documentation/widgets/:path*',   destination: '/documentation/mix/widgets/:path*',   permanent: true },
{ source: '/documentation/tutorials/:path*', destination: '/documentation/mix/tutorials/:path*', permanent: true },
{ source: '/documentation/ecosystem/:path*', destination: '/documentation/mix/ecosystem/:path*', permanent: true },
```

Internal MDX links that reference old paths are rewritten in the same PR so they don't depend on the redirect chain.

## Edge cases

- **Flutter preview IDs** (`widgets/box.0`, etc.) live inside `packages/mix_docs_preview/` and are not URL paths, so no changes needed there.
- **Pagefind / sitemap** are rebuilt from the final page tree at `pnpm build`; no manual changes required, but verify output covers the new `/documentation/mix/*` URLs.
- **`/documentation` root** — redirect to the Mix landing page (no neutral landing page between the two products; keeps behavior close to today's default).
- **Hydration flicker** — server-side filtering (preferred approach) avoids any flash; fallback CSS approach has a brief flash, acceptable if needed.

## Testing / verification

Manual:
1. `pnpm dev` → visit `/documentation/mix/overview/introduction` → sidebar shows Mix groups + switcher with Mix active.
2. Click Remix → lands on `/documentation/remix` → sidebar shows only Remix placeholder, switcher with Remix active.
3. Click Mix → returns to Mix landing page.
4. Visit `/documentation/guides/animations` directly → redirects to `/documentation/mix/guides/animations`.
5. Visit `/documentation` → redirects to `/documentation/mix/overview/introduction`.

Build:
6. `pnpm build` succeeds, pagefind output includes all Mix pages.
7. `pnpm check:previews` still passes.

## Out of scope for this PR

- Real Remix documentation content (overview, guides, widgets, tutorials, ecosystem).
- Preserving deep-link query strings, anchors, or hash fragments beyond what `:path*` already captures.
- Tweaks to the top navbar, logo, or version menu.
- Adding a third product or making the switcher dynamically data-driven.

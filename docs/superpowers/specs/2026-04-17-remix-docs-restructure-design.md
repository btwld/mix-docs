# Remix Docs Restructure — Design

Date: 2026-04-17

## Context

Mix documentation at `src/content/documentation/mix/` is organized into five sections (`overview`, `guides`, `widgets`, `tutorials`, `ecosystem`) with a distinctive voice: 2nd-person, problem-first, conversational, minimal frontmatter, H2-driven structure. The Mix overview section splits its introductory content across four focused pages.

Remix documentation at `src/content/documentation/remix/` currently has:
- A single `index.mdx` (~285 lines) that mixes introduction, getting-started, styling tour, Fortal overview, and a component index into one page.
- A `components/` folder with 19 API-reference pages.
- A root `_meta.js` with only `index` and `components` entries.

This spec restructures Remix to mirror Mix's folder layout, splits the monolithic `index.mdx` into four focused overview pages rewritten in Mix's voice, and scaffolds empty `guides/` and `tutorials/` sections so the structure is in place without committing to full content yet.

## Goals

- Align Remix's top-level shape with Mix (`overview` / `guides` / `components` / `tutorials`).
- Split the existing `index.mdx` into four overview pages, each with a single responsibility.
- Rewrite overview pages in Mix's 2nd-person, problem-first voice.
- Scaffold `guides/` and `tutorials/` with titled placeholders so they appear in the sidebar without false promises.

## Non-Goals

- Touching any file under `components/` (19 pages stay as-is).
- Adding an `ecosystem/` section (Remix has no sibling packages yet).
- Writing full `guides/` or `tutorials/` content — placeholders only.
- Editing `RemixHome.tsx`, `globals.css`, or any other TS/TSX/CSS.
- Creating a `comparison.mdx` or `migration.mdx` page — no clear Remix parallel yet.

## File Changes

### Deleted
- `src/content/documentation/remix/index.mdx` — monolithic root landing. Content redistributed; folder-index resolves to `overview/introduction`.

### Created — `overview/`

| File | Title | Content source (from old index.mdx) |
|---|---|---|
| `overview/_meta.js` | — | New, see below |
| `overview/introduction.mdx` | Introduction | Lead paragraph + "Why Remix?" (Problem/Solution) + "Who is Remix for?" + Next Steps |
| `overview/getting-started.mdx` | Getting Started | Install (`flutter pub add remix`) + "Your First Component" + brief reuse example. Wrapped in Nextra `<Steps>` like Mix's equivalent. |
| `overview/styling-components.mdx` | Styling Components | "Adding Interaction States", "Adding Animation", "Style Composition and Reuse" (parallel to Mix's `utility-first.mdx`) |
| `overview/fortal.mdx` | Fortal Design System | "The Fortal Styles" (Quick Start, Customizing, Design Tokens) — Remix-only content, no Mix parallel |

```js
// overview/_meta.js
export default {
    introduction: "Introduction",
    "getting-started": "Getting Started",
    "styling-components": "Styling Components",
    fortal: "Fortal Design System",
}
```

### Created — `guides/` (placeholder scaffolds only)

Each placeholder: frontmatter (`title`), H1 matching title, one short paragraph ending with "This guide is coming soon."

```js
// guides/_meta.js
export default {
    styling: "Styling Components",
    variants: "Variants",
    states: "Interaction States",
    animations: "Animations",
    composition: "Composition",
}
```

### Created — `tutorials/` (placeholder scaffolds only)

Same placeholder treatment as guides.

```js
// tutorials/_meta.js
export default {
    "theming-with-fortal": "Theming with Fortal",
    "building-a-form": "Building a Form",
    "building-a-custom-button": "Building a Custom Button",
    "customizing-fortal": "Customizing Fortal",
}
```

### Modified
- `src/content/documentation/remix/_meta.js` — expanded to four sections:
  ```js
  export default {
      overview: "Overview",
      guides: "Guides",
      components: "Components",
      tutorials: "Tutorials",
  }
  ```

### Unchanged
- `src/content/documentation/remix/components/` — all 19 .mdx files and `_meta.js`.

## Voice & Formatting Rules

Extracted from the Mix analysis; applied to all rewritten overview pages.

- **Person:** 2nd person ("you can…", "you define…"). Casual but precise. Contractions OK.
- **Problem framing:** Introduce the pain point before the solution when it fits naturally.
- **Headings:** Single H1 matching frontmatter `title`. H2s for main sections. H3s rare.
- **Frontmatter:** `title` required; `description` optional. No `og_image` (Mix uses these for SEO; Remix doesn't have the assets yet).
- **Links:** Absolute paths from site root: `/documentation/remix/...`, `/documentation/mix/...`.
- **Callouts:** Use `<Callout type="info">` for prerequisites, `<Callout type="warning">` for unstable/beta APIs. Bold prefix when used (e.g. `**Prerequisites:**`).
- **Code blocks:** Standalone ` ```dart ` / ` ```bash ` / ` ```yaml ` fences. No CodeGroup/tabs.
- **Imports at top of MDX:** Only add imports actually used (`import { Steps, Callout } from "nextra/components"`).
- **"Next Steps" section:** End pages with a short bulleted list of links to the next relevant page.

## Assumptions

- Nextra resolves `/documentation/remix` to the first sidebar entry (`overview/introduction`) when there's no root `index.mdx`. This matches how Mix works today (Mix has no `mix/index.mdx`).
- The recent marketing landing `RemixHome` component renders at `/remix` (separate route), not `/documentation/remix`, so deleting the docs `index.mdx` does not affect the marketing page.

## Verification

After changes:
- `ls src/content/documentation/remix/` shows: `_meta.js`, `components/`, `guides/`, `overview/`, `tutorials/` (no `index.mdx`).
- `next dev` loads `/documentation/remix` without 404 and lands on the new Introduction page.
- Sidebar shows all four sections in the stated order; each scaffold page in `guides/` and `tutorials/` renders without MDX errors.
- All internal links in the rewritten overview pages resolve.

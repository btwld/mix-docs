# Mix / Remix Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the docs into `documentation/mix/` and `documentation/remix/` and add a sidebar-top switcher that toggles between the two products' sidebars.

**Architecture:** Content is physically split by product under `src/content/documentation/`. A client React component (`MixRemixSwitcher`) is injected at the top of the Nextra sidebar via a `useEffect` portal. The same component sets `data-product="mix"|"remix"` on `<html>`; a global CSS rule uses that attribute to hide the inactive product's top-level sidebar group. All old `/documentation/<section>/...` URLs redirect permanently to `/documentation/mix/<section>/...`.

**Tech Stack:** Next.js 15 App Router, Nextra 4 (`nextra-theme-docs`), React 19, Tailwind CSS 4, TypeScript. The repo has no test suite — verification is manual via `pnpm dev` + `pnpm build`.

---

## Pre-flight

- [ ] **Step 0.1: Verify clean working tree and correct branch**

Run: `git status && git rev-parse --abbrev-ref HEAD`
Expected: working tree clean (aside from this plan file if just committed), branch `tilucasoli/mix-remix-sidebar`.

- [ ] **Step 0.2: Install dependencies if needed**

Run: `pnpm install`
Expected: finishes without errors; `node_modules/` populated.

---

## Task 1: Move existing docs into `documentation/mix/`

**Files:**
- Rename: `src/content/documentation/{overview,guides,widgets,tutorials,ecosystem}/` → `src/content/documentation/mix/{overview,guides,widgets,tutorials,ecosystem}/`
- Create: `src/content/documentation/mix/_meta.js`
- Modify: `src/content/documentation/_meta.js`

- [ ] **Step 1.1: Create the `mix/` directory and move all five section folders**

Run:
```bash
cd /Users/martinmichelini/conductor/workspaces/mix-docs/tianjin
mkdir -p src/content/documentation/mix
git mv src/content/documentation/overview   src/content/documentation/mix/overview
git mv src/content/documentation/guides     src/content/documentation/mix/guides
git mv src/content/documentation/widgets    src/content/documentation/mix/widgets
git mv src/content/documentation/tutorials  src/content/documentation/mix/tutorials
git mv src/content/documentation/ecosystem  src/content/documentation/mix/ecosystem
```

- [ ] **Step 1.2: Verify the move**

Run: `ls src/content/documentation/mix`
Expected: `_meta.js` NOT yet present; the five directories `overview guides widgets tutorials ecosystem` listed.

- [ ] **Step 1.3: Create `src/content/documentation/mix/_meta.js`**

Create file with contents:
```js
export default {
    overview: "Overview",
    guides: "Guides",
    widgets: "Widgets",
    tutorials: "Tutorials",
    ecosystem: "Ecosystem",
};
```

(This matches the current `src/content/documentation/_meta.js` contents.)

- [ ] **Step 1.4: Rewrite `src/content/documentation/_meta.js` to list `mix` and `remix`**

Replace its contents with:
```js
export default {
    mix: "Mix",
    remix: "Remix",
};
```

Both products are registered as visible top-level sidebar groups. Sidebar filtering is done entirely via the CSS in Task 6, driven by the `data-product` attribute on `<html>`. Keeping both visible to Nextra avoids any guesswork about how `display: "hidden"` interacts with active subtree rendering.

- [ ] **Step 1.5: Commit**

```bash
git add src/content/documentation
git commit -m "docs: move existing docs under documentation/mix/"
```

---

## Task 2: Scaffold the Remix placeholder

**Files:**
- Create: `src/content/documentation/remix/_meta.js`
- Create: `src/content/documentation/remix/index.mdx`

- [ ] **Step 2.1: Create `src/content/documentation/remix/_meta.js`**

```js
export default {
    index: "Introduction",
};
```

- [ ] **Step 2.2: Create `src/content/documentation/remix/index.mdx`**

```mdx
# Remix

Remix documentation is coming soon.

Remix is the component library built on top of [Mix](/documentation/mix/overview/introduction). Full guides, widget references, and tutorials will land here shortly.
```

- [ ] **Step 2.3: Commit**

```bash
git add src/content/documentation/remix
git commit -m "docs(remix): scaffold placeholder landing page"
```

---

## Task 3: Rewrite internal MDX links to the new `mix/` paths

**Files:**
- Modify: `src/content/documentation/mix/overview/introduction.mdx`
- Modify: `src/content/documentation/mix/overview/getting-started.mdx`
- Modify: `src/content/documentation/mix/overview/migration.mdx`
- Modify: `src/content/documentation/mix/guides/common-patterns.mdx`
- Modify: `src/content/documentation/mix/guides/styling.mdx`
- Modify: `src/content/documentation/mix/widgets/stylewidgets.mdx`
- Modify: `src/content/documentation/mix/ecosystem/mix-tailwinds.mdx`

All existing in-repo MDX files link using the old scheme `/documentation/<section>/...`. Rewrite each to `/documentation/mix/<section>/...` so navigation doesn't rely on the redirect chain.

- [ ] **Step 3.1: Find every in-repo occurrence and confirm the full list**

Run: `grep -rn "](/documentation/" src/content/documentation/mix`
Expected: every match has a section immediately after `/documentation/` that is one of `overview|guides|widgets|tutorials|ecosystem`. No match should point at `/documentation/mix/...` yet.

- [ ] **Step 3.2: Perform the rewrite**

For each file listed under "Files" above, replace every occurrence of the exact prefix `](/documentation/` with `](/documentation/mix/`. Use your editor's find/replace on each file individually to avoid touching files outside `mix/`.

One-liner alternative (re-verify output before committing):
```bash
cd /Users/martinmichelini/conductor/workspaces/mix-docs/tianjin
find src/content/documentation/mix -name '*.mdx' -type f -exec \
  sed -i '' 's|](/documentation/|](/documentation/mix/|g' {} +
```

- [ ] **Step 3.3: Verify no old-scheme links remain inside `mix/`**

Run: `grep -rn "](/documentation/" src/content/documentation/mix | grep -v "](/documentation/mix/"`
Expected: no output (every match now has the `mix/` prefix).

- [ ] **Step 3.4: Verify links still target real files**

Spot-check three rewritten links:
```bash
ls src/content/documentation/mix/guides/animations.mdx
ls src/content/documentation/mix/guides/dynamic-styling.mdx
ls src/content/documentation/mix/widgets/stylewidgets.mdx
```
Expected: all three exist.

- [ ] **Step 3.5: Commit**

```bash
git add src/content/documentation/mix
git commit -m "docs: rewrite internal links to /documentation/mix/*"
```

---

## Task 4: Add permanent redirects for old URLs

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 4.1: Replace `next.config.mjs` with the extended redirect list**

Replace the file's contents with:
```js
import nextra from 'nextra'

const withNextra = nextra({
    mdxOptions: {
        rehypePrettyCodeOptions: {
            theme: {
                dark: 'tokyo-night',
                light: 'github-light',
            },
        },
    },
})

export default withNextra({
    async redirects() {
        return [
            { source: '/docs', destination: '/documentation', permanent: true },
            { source: '/docs/:path*', destination: '/documentation/:path*', permanent: true },
            { source: '/documentation', destination: '/documentation/mix/overview/introduction', permanent: true },
            { source: '/documentation/overview/:path*',   destination: '/documentation/mix/overview/:path*',   permanent: true },
            { source: '/documentation/guides/:path*',     destination: '/documentation/mix/guides/:path*',     permanent: true },
            { source: '/documentation/widgets/:path*',    destination: '/documentation/mix/widgets/:path*',    permanent: true },
            { source: '/documentation/tutorials/:path*',  destination: '/documentation/mix/tutorials/:path*',  permanent: true },
            { source: '/documentation/ecosystem/:path*',  destination: '/documentation/mix/ecosystem/:path*',  permanent: true },
        ]
    },
})
```

- [ ] **Step 4.2: Commit**

```bash
git add next.config.mjs
git commit -m "chore(redirects): forward legacy /documentation URLs to /documentation/mix"
```

---

## Task 5: Create the `MixRemixSwitcher` client component

**Files:**
- Create: `components/MixRemixSwitcher.tsx`

The switcher renders two stacked tab-style links. It is a client component (needs `usePathname`). It does NOT handle injection into the sidebar yet — that's Task 6.

- [ ] **Step 5.1: Create `components/MixRemixSwitcher.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Product = 'mix' | 'remix'

type ProductEntry = {
    id: Product
    label: string
    href: string
}

const PRODUCTS: ProductEntry[] = [
    { id: 'mix', label: 'Mix', href: '/documentation/mix/overview/introduction' },
    { id: 'remix', label: 'Remix', href: '/documentation/remix' },
]

export function getActiveProduct(pathname: string | null): Product {
    return pathname?.startsWith('/documentation/remix') ? 'remix' : 'mix'
}

export default function MixRemixSwitcher() {
    const pathname = usePathname()
    const active = getActiveProduct(pathname)

    return (
        <nav
            aria-label="Product"
            className="mix-remix-switcher flex flex-col gap-1 px-3 py-3 border-b border-[var(--mix-border,rgba(255,255,255,0.08))]"
        >
            {PRODUCTS.map(({ id, label, href }) => {
                const isActive = id === active
                return (
                    <Link
                        key={id}
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        data-active={isActive ? 'true' : 'false'}
                        className={[
                            'relative flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                            'border-l-2',
                            isActive
                                ? 'border-white text-white bg-white/5'
                                : 'border-transparent text-[var(--mix-text-muted,#9ca3af)] hover:text-white hover:bg-white/5',
                        ].join(' ')}
                    >
                        {label}
                    </Link>
                )
            })}
        </nav>
    )
}
```

- [ ] **Step 5.2: Sanity check TypeScript**

Run: `pnpm tsc --noEmit`
Expected: no errors introduced by the new file. (If the project's `tsconfig.json` doesn't include the `components/` directory in `include`, this is still fine — the import in Task 6 will surface any real issue.)

- [ ] **Step 5.3: Commit**

```bash
git add components/MixRemixSwitcher.tsx
git commit -m "feat: add MixRemixSwitcher tab component"
```

---

## Task 6: Mount the switcher into the sidebar and filter sidebar items

**Files:**
- Create: `components/MixRemixSwitcherMount.tsx`
- Modify: `src/app/layout.jsx`
- Modify: `globals.css`

We cannot render the switcher via a prop slot that Nextra 4 exposes directly — the `<Layout>` component from `nextra-theme-docs` does not have a first-class "sidebar-top" slot. Instead we mount a client component that, on the client side:
1. Locates the Nextra sidebar container (`.nextra-sidebar` in Nextra 4; the implementation verifies this selector during Step 6.3 and adjusts if Nextra's markup differs).
2. Prepends the switcher via a React portal.
3. Sets `data-product="mix" | "remix"` on `<html>` so CSS can hide the inactive product's sidebar group.

- [ ] **Step 6.1: Create `components/MixRemixSwitcherMount.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import MixRemixSwitcher, { getActiveProduct } from './MixRemixSwitcher'

const SIDEBAR_SELECTOR = '.nextra-sidebar'

export default function MixRemixSwitcherMount() {
    const pathname = usePathname()
    const [host, setHost] = useState<HTMLElement | null>(null)

    useEffect(() => {
        document.documentElement.setAttribute('data-product', getActiveProduct(pathname))
    }, [pathname])

    useEffect(() => {
        const findAndAttach = () => {
            const sidebar = document.querySelector<HTMLElement>(SIDEBAR_SELECTOR)
            if (!sidebar) return false

            let slot = sidebar.querySelector<HTMLElement>(':scope > [data-mix-remix-switcher]')
            if (!slot) {
                slot = document.createElement('div')
                slot.setAttribute('data-mix-remix-switcher', '')
                sidebar.prepend(slot)
            }
            setHost(slot)
            return true
        }

        if (findAndAttach()) return

        const observer = new MutationObserver(() => {
            if (findAndAttach()) observer.disconnect()
        })
        observer.observe(document.body, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])

    if (!host) return null
    return createPortal(<MixRemixSwitcher />, host)
}
```

- [ ] **Step 6.2: Add the mount component to the root layout**

Modify `src/app/layout.jsx`. In the imports section, add:
```jsx
import MixRemixSwitcherMount from '../../components/MixRemixSwitcherMount'
```

Inside `<Layout ...>`, immediately before `{children}`, add:
```jsx
<MixRemixSwitcherMount />
```

Full `<body>` block after the change should look like:
```jsx
<body>
    <Layout
        navbar={navbar}
        pageMap={await getPageMap()}
        docsRepositoryBase="https://github.com/btwld/mix/tree/main/website"
        footer={footer}
        darkMode={false}
        copyPageButton={false}
        navigation={{ prev: true, next: true }}
        toc={{ float: true, backToTop: "Scroll to top" }}
        nextThemes={{
            forcedTheme: "dark",
            defaultTheme: "dark",
            storageKey: "theme"
        }}
        sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true,
            toggleButton: false,
            defaultOpen: true,
        }}
    >
        <MixRemixSwitcherMount />
        {children}
    </Layout>
</body>
```

- [ ] **Step 6.3: Verify the sidebar selector is correct**

Run: `pnpm dev`
In a browser, open http://localhost:3000/documentation/mix/overview/introduction, open DevTools, and inspect the sidebar. Confirm the sidebar root element has the class `nextra-sidebar` (Nextra 4's default). If the class differs (e.g. `nextra-sidebar-container`), update `SIDEBAR_SELECTOR` in `components/MixRemixSwitcherMount.tsx` to match.

Expected: sidebar is found; the two tabs render at the top of the sidebar. Clicking "Remix" navigates to `/documentation/remix`; the Remix tab is now active.

Stop the dev server before moving on.

- [ ] **Step 6.4: Add CSS to hide the inactive product's sidebar group**

Append the following rules to the end of `globals.css`:

```css
/* Mix/Remix sidebar switcher: hide the inactive product's top-level group. */
html[data-product="mix"] .nextra-sidebar li:has(> a[href^="/documentation/remix"]),
html[data-product="mix"] .nextra-sidebar li:has(> button[data-slug="remix"]) {
    display: none !important;
}

html[data-product="remix"] .nextra-sidebar li:has(> a[href^="/documentation/mix"]),
html[data-product="remix"] .nextra-sidebar li:has(> button[data-slug="mix"]) {
    display: none !important;
}
```

Both selector variants are present because Nextra renders top-level folder groups as `<li><button>…</button><ul>…</ul></li>` and top-level pages as `<li><a>…</a></li>`. The `:has()` selector (supported in all modern browsers we target) matches either shape.

- [ ] **Step 6.5: Verify filtering in the browser**

Run: `pnpm dev` again. On `/documentation/mix/overview/introduction` the sidebar must show ONLY the Mix groups (overview, guides, widgets, tutorials, ecosystem). Navigate to `/documentation/remix`; the sidebar must show ONLY the Remix placeholder entry.

If a group doesn't hide, inspect the DOM and adjust the CSS selectors in `globals.css` to match the actual Nextra markup for the top-level `li` wrapper — the underlying contract (top-level folder `<li>` wrapping either an `<a>` or a `<button>` whose target starts with the product path / slug) is stable.

- [ ] **Step 6.6: Commit**

```bash
git add components/MixRemixSwitcherMount.tsx src/app/layout.jsx globals.css
git commit -m "feat: mount mix/remix switcher in sidebar and hide inactive product"
```

---

## Task 7: Final verification

- [ ] **Step 7.1: Run the production build**

Run: `pnpm build`
Expected: build finishes successfully. No Next.js or Nextra errors about missing pages. Pagefind postbuild succeeds.

- [ ] **Step 7.2: Manual URL smoke test against the production build**

Run: `pnpm start`
In a browser, verify each:

| URL visited | Expected result |
|---|---|
| `/documentation` | 301 → `/documentation/mix/overview/introduction` |
| `/documentation/overview/introduction` | 301 → `/documentation/mix/overview/introduction` |
| `/documentation/guides/animations` | 301 → `/documentation/mix/guides/animations` |
| `/documentation/widgets/box` | 301 → `/documentation/mix/widgets/box` |
| `/documentation/tutorials/theming` | 301 → `/documentation/mix/tutorials/theming` |
| `/documentation/ecosystem/mix-tailwinds` | 301 → `/documentation/mix/ecosystem/mix-tailwinds` |
| `/documentation/mix/overview/introduction` | loads; sidebar shows Mix groups only; switcher shows "Mix" active |
| `/documentation/remix` | loads the placeholder; sidebar shows only Remix entry; switcher shows "Remix" active |
| clicking "Remix" in switcher from any Mix page | lands on `/documentation/remix` |
| clicking "Mix" in switcher from Remix page | lands on `/documentation/mix/overview/introduction` |

- [ ] **Step 7.3: Run the previews manifest check**

Run: `pnpm check:previews`
Expected: passes (the preview manifest is independent of URL structure but confirms nothing in the docs move broke it).

- [ ] **Step 7.4: Review and finalize**

Review the full diff:
```bash
git log --oneline origin/main..HEAD
git diff origin/main..HEAD --stat
```
Confirm only the files listed across Tasks 1–6 are changed, and no stray files.

---

## Rollback

If the switcher or CSS filtering misbehaves in production, the safest rollback is to `git revert` the Task 6 commit — that leaves the content move and redirects in place (old URLs keep working) but removes the switcher and the sidebar-hiding CSS. Mix docs continue to render; Remix becomes a second top-level sidebar group until the switcher is re-landed.

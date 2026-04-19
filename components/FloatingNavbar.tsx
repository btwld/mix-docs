'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'nextra/components'
import {
    ChevronDown,
    Github,
    Menu,
    Search as SearchIcon,
    Twitter,
    X,
} from 'lucide-react'
import clsx from 'clsx'

function getActiveProduct(pathname: string | null): 'mix' | 'remix' {
    if (!pathname) return 'mix'
    if (pathname.startsWith('/documentation/remix')) return 'remix'
    if (pathname === '/remix' || pathname.startsWith('/remix/')) return 'remix'
    return 'mix'
}

const PILL =
    'rounded-full bg-[color:var(--mix-surface)]/70 backdrop-blur-md border border-[color:var(--mix-border-card)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]'

const MENU_PANEL =
    'rounded-xl bg-[color:var(--mix-surface-bright)]/95 backdrop-blur-md border border-[color:var(--mix-border-card)] shadow-[0_12px_32px_rgba(0,0,0,0.45)]'

const VERSION_ITEMS = [
    { label: 'Mix v2', href: '/' },
    { label: 'Mix v1', href: 'https://mix-docs-gosljkd74-fluttertools.vercel.app/' },
]

const GITHUB_URL = 'https://github.com/btwld/mix'
const TWITTER_URL = 'https://twitter.com/leoafarias'
const MIX_DOCS_URL = '/documentation/mix/overview/introduction'
const REMIX_DOCS_URL = '/documentation/remix'

function getDocsHref(product: 'mix' | 'remix') {
    return product === 'remix' ? REMIX_DOCS_URL : MIX_DOCS_URL
}

const PRODUCTS = [
    {
        id: 'mix' as const,
        label: 'Mix',
        href: '/',
        logo: '/assets/logo_mix_sidebar.png',
    },
    {
        id: 'remix' as const,
        label: 'Remix',
        href: '/remix',
        logo: '/assets/logo_remix_sidebar.png',
    },
]

type DocsEntry =
    | { label: string; href: string }
    | { label: string; pages: { label: string; href: string }[] }

const DOCS_SECTIONS: Record<'mix' | 'remix', DocsEntry[]> = {
    mix: [
        {
            label: 'Overview',
            pages: [
                { label: 'Introduction', href: '/documentation/mix/overview/introduction' },
                { label: 'Getting started', href: '/documentation/mix/overview/getting-started' },
                { label: 'Utility-First', href: '/documentation/mix/overview/utility-first' },
                { label: 'Comparative Overview', href: '/documentation/mix/overview/comparison' },
                { label: 'Migration', href: '/documentation/mix/overview/migration' },
            ],
        },
        {
            label: 'Guides',
            pages: [
                { label: 'Styling', href: '/documentation/mix/guides/styling' },
                { label: 'Design Tokens', href: '/documentation/mix/guides/design-token' },
                { label: 'Dynamic Styling', href: '/documentation/mix/guides/dynamic-styling' },
                { label: 'Widget Modifiers', href: '/documentation/mix/guides/widget-modifiers' },
                { label: 'Animations', href: '/documentation/mix/guides/animations' },
                { label: 'Directives', href: '/documentation/mix/guides/directives' },
                { label: 'Common Patterns', href: '/documentation/mix/guides/common-patterns' },
            ],
        },
        {
            label: 'Widgets',
            pages: [
                { label: 'StyleWidgets', href: '/documentation/mix/widgets/stylewidgets' },
                { label: 'Box', href: '/documentation/mix/widgets/box' },
                { label: 'FlexBox', href: '/documentation/mix/widgets/flexbox' },
                { label: 'Text', href: '/documentation/mix/widgets/text' },
                { label: 'Icon', href: '/documentation/mix/widgets/icon' },
                { label: 'Image', href: '/documentation/mix/widgets/image' },
                { label: 'Pressable', href: '/documentation/mix/widgets/pressable' },
                { label: 'Stack', href: '/documentation/mix/widgets/stack' },
            ],
        },
        {
            label: 'Tutorials',
            pages: [
                { label: 'Creating a Widget', href: '/documentation/mix/tutorials/creating-a-widget' },
                { label: 'Advanced Widget State Control', href: '/documentation/mix/tutorials/controlling-widget-state' },
                { label: 'Theming', href: '/documentation/mix/tutorials/theming' },
                { label: 'Creating Context Variants', href: '/documentation/mix/tutorials/creating-context-variants' },
                { label: 'Creating Custom Tokens', href: '/documentation/mix/tutorials/creating-custom-tokens' },
            ],
        },
        {
            label: 'Ecosystem',
            pages: [
                { label: 'mix_tailwinds', href: '/documentation/mix/ecosystem/mix-tailwinds' },
                { label: 'mix_schema', href: '/documentation/mix/ecosystem/mix-schema' },
                { label: 'mix_lint', href: '/documentation/mix/ecosystem/mix-lint' },
                { label: 'mix_generator', href: '/documentation/mix/ecosystem/mix-generator' },
            ],
        },
    ],
    remix: [
        { label: 'Getting Started', href: '/documentation/remix' },
        { label: 'Fortal', href: '/documentation/remix/fortal' },
        {
            label: 'Components',
            pages: [
                { label: 'Accordion', href: '/documentation/remix/components/accordion' },
                { label: 'Avatar', href: '/documentation/remix/components/avatar' },
                { label: 'Badge', href: '/documentation/remix/components/badge' },
                { label: 'Button', href: '/documentation/remix/components/button' },
                { label: 'Callout', href: '/documentation/remix/components/callout' },
                { label: 'Card', href: '/documentation/remix/components/card' },
                { label: 'Checkbox', href: '/documentation/remix/components/checkbox' },
                { label: 'Divider', href: '/documentation/remix/components/divider' },
                { label: 'IconButton', href: '/documentation/remix/components/icon_button' },
                { label: 'Menu', href: '/documentation/remix/components/menu' },
                { label: 'Progress', href: '/documentation/remix/components/progress' },
                { label: 'Radio', href: '/documentation/remix/components/radio' },
                { label: 'Select', href: '/documentation/remix/components/select' },
                { label: 'Slider', href: '/documentation/remix/components/slider' },
                { label: 'Spinner', href: '/documentation/remix/components/spinner' },
                { label: 'Switch', href: '/documentation/remix/components/switch' },
                { label: 'Tabs', href: '/documentation/remix/components/tabs' },
                { label: 'TextField', href: '/documentation/remix/components/textfield' },
                { label: 'Tooltip', href: '/documentation/remix/components/tooltip' },
            ],
        },
    ],
}

function VersionMenu() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        function onClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [open])

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/80 hover:text-white"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                Version
                <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
                <div
                    className={clsx(
                        'absolute top-full mt-3 right-0 min-w-[10rem] p-1',
                        MENU_PANEL,
                    )}
                    role="menu"
                >
                    {VERSION_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-1.5 text-sm rounded-md text-white/80 hover:text-white hover:bg-white/5"
                            onClick={() => setOpen(false)}
                            role="menuitem"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

function ProductMenu() {
    const pathname = usePathname()
    const active = getActiveProduct(pathname)
    const activeProduct = PRODUCTS.find((p) => p.id === active) ?? PRODUCTS[0]

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        function onClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [open])

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Switch product (current: ${activeProduct.label})`}
            >
                <img
                    src={activeProduct.logo}
                    alt={activeProduct.label}
                    className="h-5 w-auto"
                />
                <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
                <div
                    className={clsx(
                        'absolute top-full mt-3 left-1/2 -translate-x-1/2 p-1 flex flex-col gap-1',
                        MENU_PANEL,
                    )}
                    role="menu"
                >
                    {PRODUCTS.map((product) => {
                        const isActive = product.id === active
                        return (
                            <Link
                                key={product.id}
                                href={product.href}
                                onClick={() => setOpen(false)}
                                role="menuitem"
                                aria-label={product.label}
                                aria-current={isActive ? 'page' : undefined}
                                className={clsx(
                                    'flex items-center justify-center px-3 py-2 rounded-md transition-colors',
                                    isActive ? 'bg-white/5' : 'hover:bg-white/5',
                                )}
                            >
                                <img
                                    src={product.logo}
                                    alt={product.label}
                                    style={{ height: 20, width: 'auto' }}
                                    className={clsx(
                                        'max-w-none transition-[filter,opacity]',
                                        isActive
                                            ? 'filter-none'
                                            : '[filter:brightness(0)_invert(1)] opacity-60 hover:opacity-100 hover:filter-none',
                                    )}
                                />
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

function MobileDrawer({
    onClose,
    docsHref,
    activeProduct,
    isDocsActive,
}: {
    onClose: () => void
    docsHref: string
    activeProduct: 'mix' | 'remix'
    isDocsActive: boolean
}) {
    return (
        <div className="fixed inset-0 z-[60] md:hidden">
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="absolute top-0 inset-x-0 max-h-screen overflow-y-auto bg-[var(--mix-surface)] border-b border-[color:var(--mix-border-card)] p-4">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="p-2 text-white/80 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="flex flex-col gap-1">
                    <div className="px-3 pb-1 text-xs uppercase tracking-wider text-white/40">
                        Product
                    </div>
                    {PRODUCTS.map((product) => (
                        <Link
                            key={product.id}
                            href={product.href}
                            className="flex items-center gap-2.5 px-3 py-2 text-white/90 hover:bg-white/5 rounded"
                        >
                            <img
                                src={product.logo}
                                alt=""
                                aria-hidden="true"
                                className="h-5 w-auto"
                            />
                            {product.label}
                        </Link>
                    ))}
                    {isDocsActive ? (
                        <>
                            {DOCS_SECTIONS[activeProduct].map((entry) =>
                                'pages' in entry ? (
                                    <Fragment key={entry.label}>
                                        <div className="px-3 pt-3 text-xs uppercase tracking-wider text-white/40">
                                            {entry.label}
                                        </div>
                                        {entry.pages.map((page) => (
                                            <Link
                                                key={page.href}
                                                href={page.href}
                                                className="px-3 py-2 text-white/90 hover:bg-white/5 rounded"
                                            >
                                                {page.label}
                                            </Link>
                                        ))}
                                    </Fragment>
                                ) : (
                                    <Link
                                        key={entry.href}
                                        href={entry.href}
                                        className="px-3 py-2 text-white/90 hover:bg-white/5 rounded"
                                    >
                                        {entry.label}
                                    </Link>
                                ),
                            )}
                        </>
                    ) : (
                        <Link
                            href={docsHref}
                            className="px-3 py-2 text-white/90 hover:bg-white/5 rounded mt-2"
                        >
                            Docs
                        </Link>
                    )}
                    <div className="px-3 pt-3 text-xs uppercase tracking-wider text-white/40">
                        Version
                    </div>
                    {VERSION_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="px-3 py-2 text-white/90 hover:bg-white/5 rounded"
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="px-3 pt-3 text-xs uppercase tracking-wider text-white/40">
                        Links
                    </div>
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-white/90 hover:bg-white/5 rounded"
                    >
                        <Github className="h-4 w-4" /> GitHub
                    </a>
                    <a
                        href={TWITTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-white/90 hover:bg-white/5 rounded"
                    >
                        <Twitter className="h-4 w-4" /> Twitter
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default function FloatingNavbar() {
    const pathname = usePathname()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const isDocsActive = pathname?.startsWith('/documentation') ?? false
    const activeProduct = getActiveProduct(pathname)
    const homeHref = activeProduct === 'remix' ? '/remix' : '/'
    const isHomeActive = pathname === homeHref
    const docsHref = getDocsHref(activeProduct)

    useEffect(() => {
        setDrawerOpen(false)
        setSearchOpen(false)
    }, [pathname])

    useEffect(() => {
        document.documentElement.setAttribute('data-product', activeProduct)
    }, [activeProduct])

    return (
        <>
            {/* In-flow spacer so page content starts below the fixed pill */}
            <div className="h-20" aria-hidden="true" />

            {/* Desktop centered pill */}
            <div
                className={clsx(
                    'fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 pl-2 pr-2 py-1',
                    PILL,
                )}
            >
                <ProductMenu />
                <span className="h-4 w-px bg-white/10" />
                <Link
                    href={homeHref}
                    className={clsx(
                        'px-3 py-1.5 text-sm transition-colors',
                        isHomeActive
                            ? 'text-[color:var(--mix-accent)]'
                            : 'text-white/80 hover:text-white',
                    )}
                >
                    Home
                </Link>
                <span className="h-4 w-px bg-white/10" />
                <Link
                    href={docsHref}
                    className={clsx(
                        'px-3 py-1.5 text-sm transition-colors',
                        isDocsActive
                            ? 'text-[color:var(--mix-accent)]'
                            : 'text-white/80 hover:text-white',
                    )}
                >
                    Docs
                </Link>
                <span className="h-4 w-px bg-white/10" />
                <div className="relative floating-search [&_input]:!bg-transparent [&_input]:!border-0 [&_input]:!shadow-none [&_input]:!text-sm [&_input]:!w-44 [&_input]:!h-8 [&_input]:!pl-7 [&_input:focus]:!ring-0 [&_input:focus]:!outline-none [&_input:focus]:!border-0 [&_input:focus]:!shadow-none">
                    <SearchIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
                    />
                    <Search placeholder="Search" />
                </div>
            </div>

            {/* Desktop right icons */}
            <div
                className={clsx(
                    'fixed top-4 right-6 z-50 hidden md:flex items-center gap-1 pl-1 pr-1.5 py-1',
                    PILL,
                )}
            >
                <VersionMenu />
                <span className="h-4 w-px bg-white/10" />
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 text-white/70 hover:text-white"
                >
                    <Github className="h-4 w-4" />
                </a>
                <a
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="p-2 text-white/70 hover:text-white"
                >
                    <Twitter className="h-4 w-4" />
                </a>
            </div>

            {/* Mobile compact pill */}
            <div
                className={clsx(
                    'fixed top-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-1 px-1.5 py-1',
                    PILL,
                )}
            >
                {searchOpen ? (
                    <>
                        <div className="relative floating-search [&_input]:!bg-transparent [&_input]:!border-0 [&_input]:!shadow-none [&_input]:!text-sm [&_input]:!w-48 [&_input]:!h-8 [&_input]:!pl-7 [&_input:focus]:!ring-0 [&_input:focus]:!outline-none [&_input:focus]:!border-0 [&_input:focus]:!shadow-none">
                            <SearchIcon
                                aria-hidden="true"
                                className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
                            />
                            <Search placeholder="Search" />
                        </div>
                        <button
                            onClick={() => setSearchOpen(false)}
                            aria-label="Close search"
                            className="p-2 text-white/70 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                            className="p-2 text-white/70 hover:text-white"
                        >
                            <SearchIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setDrawerOpen(true)}
                            aria-label="Open menu"
                            className="p-2 text-white/70 hover:text-white"
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                    </>
                )}
            </div>

            {drawerOpen && (
                <MobileDrawer
                    onClose={() => setDrawerOpen(false)}
                    docsHref={docsHref}
                    activeProduct={activeProduct}
                    isDocsActive={isDocsActive}
                />
            )}
        </>
    )
}

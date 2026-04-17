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

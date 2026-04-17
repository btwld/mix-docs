'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Product = 'mix' | 'remix'

type ProductEntry = {
    id: Product
    label: string
    href: string
    logo: string
}

const PRODUCTS: ProductEntry[] = [
    {
        id: 'mix',
        label: 'Mix',
        href: '/documentation/mix/overview/introduction',
        logo: '/assets/logo_mix_sidebar.png',
    },
    {
        id: 'remix',
        label: 'Remix',
        href: '/documentation/remix',
        logo: '/assets/logo_remix_sidebar.png',
    },
]

export function getActiveProduct(pathname: string | null): Product {
    return pathname?.startsWith('/documentation/remix') ? 'remix' : 'mix'
}

export default function MixRemixSwitcher() {
    const pathname = usePathname()
    const active = getActiveProduct(pathname)

    useEffect(() => {
        document.documentElement.setAttribute('data-product', active)
    }, [active])

    return (
        <nav
            aria-label="Product"
            data-mix-remix-switcher=""
            className="mix-remix-switcher flex flex-col gap-0.5 px-2 pt-2 pb-3"
        >
            {PRODUCTS.map(({ id, label, href, logo }) => {
                const isActive = id === active
                return (
                    <Link
                        key={id}
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        data-active={isActive ? 'true' : 'false'}
                        className={[
                            'flex items-center px-2.5 py-2 rounded-md group transition-colors duration-150',
                            isActive
                                ? 'bg-white/5 hover:bg-white/10'
                                : 'hover:bg-white/5',
                        ].join(' ')}
                    >
                        <img
                            src={logo}
                            alt={label}
                            className={[
                                'h-6 w-auto transition-[filter,opacity] duration-150',
                                isActive
                                    ? 'filter-none'
                                    : '[filter:brightness(0)_invert(1)] opacity-60 group-hover:opacity-100 group-hover:filter-none',
                            ].join(' ')}
                        />
                    </Link>
                )
            })}
        </nav>
    )
}

'use client'

import { usePathname } from 'next/navigation'
import { Banner } from 'nextra/components'

function isRemixPath(pathname: string | null): boolean {
    if (!pathname) return false
    if (pathname.startsWith('/documentation/remix')) return true
    if (pathname === '/remix' || pathname.startsWith('/remix/')) return true
    return false
}

export default function RemixBanner() {
    const pathname = usePathname()
    if (!isRemixPath(pathname)) return null

    return (
        <Banner storageKey="remix-dev-preview">
            This package is currently in development —{' '}
            <a
                href="https://github.com/btwld/remix"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:no-underline"
            >
                see GitHub for details
            </a>
            .
        </Banner>
    )
}

'use client'

import { usePathname } from 'next/navigation'
import { Info } from 'lucide-react'

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
        <div
            role="status"
            className="fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-xl bg-[color:var(--mix-surface-bright)]/95 backdrop-blur-md border border-[color:var(--mix-border-card)] shadow-[0_12px_32px_rgba(0,0,0,0.45)] p-4 text-sm text-white/90"
        >
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--mix-accent)]" aria-hidden="true" />
            <div className="flex-1 leading-snug">
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
            </div>
        </div>
    )
}

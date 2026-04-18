'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Info, X } from 'lucide-react'

const STORAGE_KEY = 'remix-dev-preview-dismissed'

function isRemixPath(pathname: string | null): boolean {
    if (!pathname) return false
    if (pathname.startsWith('/documentation/remix')) return true
    if (pathname === '/remix' || pathname.startsWith('/remix/')) return true
    return false
}

export default function RemixBanner() {
    const pathname = usePathname()
    const [dismissed, setDismissed] = useState(true)

    useEffect(() => {
        setDismissed(
            typeof window !== 'undefined' &&
                window.localStorage.getItem(STORAGE_KEY) === '1',
        )
    }, [])

    if (!isRemixPath(pathname) || dismissed) return null

    const handleDismiss = () => {
        setDismissed(true)
        try {
            window.localStorage.setItem(STORAGE_KEY, '1')
        } catch {}
    }

    return (
        <div
            role="status"
            className="fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-xl bg-[color:var(--mix-surface-bright)]/95 backdrop-blur-md border border-[color:var(--mix-border-card)] shadow-[0_12px_32px_rgba(0,0,0,0.45)] p-4 pr-3 text-sm text-white/90"
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
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
        </div>
    )
}

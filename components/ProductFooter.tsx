'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function isAckPath(pathname: string | null) {
    return pathname === '/ack'
        || pathname?.startsWith('/ack/')
        || pathname?.startsWith('/documentation/ack')
}

export default function ProductFooter() {
    const pathname = usePathname()

    if (isAckPath(pathname)) {
        return (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-sm text-[var(--mix-text-muted)]">
                <span>Built for trustworthy Dart boundaries.</span>
                <div className="flex items-center gap-5">
                    <a href="https://github.com/btwld/ack" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href="https://pub.dev/packages/ack" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">pub.dev</a>
                    <Link href="/ack/llms.txt" className="hover:text-white transition-colors">llms.txt</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-sm text-[var(--mix-text-muted)]">
            <span>&copy; 2026 Concepta Tech.</span>
            <div className="flex items-center gap-5">
                <a href="https://github.com/btwld/mix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="https://pub.dev/packages/mix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">pub.dev</a>
                <a href="https://discord.com/invite/Ycn6GV3m2k" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
                <a href="https://twitter.com/leoafarias" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            </div>
        </div>
    )
}

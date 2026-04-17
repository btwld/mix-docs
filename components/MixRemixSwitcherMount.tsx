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

import { Inter, JetBrains_Mono } from 'next/font/google'
import { Footer, Layout } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import '../../globals.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import FloatingNavbar from '../../components/FloatingNavbar'
import ProductFooter from '../../components/ProductFooter'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})

const description = "An expressive way to build design systems in Flutter."

export const viewport = {
    themeColor: '#111111',
}

export const metadata = {
    metadataBase: new URL('https://fluttermix.com'),
    title: 'Mix',
    description,
    applicationName: 'Mix',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
    },
    openGraph: {
        title: 'Mix',
        description,
        images: ['https://fluttermix.com/og_banner.png'],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://fluttermix.com/og_banner.png'],
        domain: 'fluttermix.com',
        url: 'https://fluttermix.com',
    },
    other: {
        'msapplication-TileColor': '#111111',
        'apple-mobile-web-app-title': 'Mix',
    },
}

const navbar = <FloatingNavbar />

const footer = (
    <Footer>
        <ProductFooter />
    </Footer>
)

export default async function RootLayout({ children }) {
    return (
        <html
            lang="en"
            dir="ltr"
            suppressHydrationWarning
            className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <Head />
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(()=>{try{var p=location.pathname;var d='mix';if(p.startsWith('/documentation/remix')||p==='/remix'||p.startsWith('/remix/'))d='remix';else if(p.startsWith('/documentation/ack')||p==='/ack'||p.startsWith('/ack/'))d='ack';else if(p==='/stargate'||p.startsWith('/stargate/'))d='stargate';else if(p==='/code-analysis'||p.startsWith('/code-analysis/'))d='code-analysis';document.documentElement.setAttribute('data-product',d)}catch(e){}})();`,
                    }}
                />
                <Layout
                    navbar={navbar}
                    pageMap={await getPageMap()}
                    docsRepositoryBase="https://github.com/btwld/mix-docs/tree/main"
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
                    {children}
                </Layout>
            </body>
        </html>
    )
}

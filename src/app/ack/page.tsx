import { AckHome } from '../../../components/landing/ack/AckHome'

const description =
  'Build trustworthy Dart, Flutter, and structured AI boundaries with runtime validation, codecs, provider adapters, JSON Schema, and optional generated types.'

export const viewport = {
  themeColor: '#060914',
}

export const metadata = {
  title: 'Ack — Schema validation for Dart',
  description,
  applicationName: 'Ack',
  openGraph: {
    title: 'Ack — Trust the boundary',
    description,
    type: 'website',
    images: [
      {
        url: '/assets/ack-social.png',
        width: 1200,
        height: 630,
        alt: 'Ack schema validation for Dart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ack — Trust the boundary',
    description,
    images: ['/assets/ack-social.png'],
  },
}

export default function Page() {
  return <AckHome />
}

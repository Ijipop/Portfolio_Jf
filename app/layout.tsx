import type { Metadata } from 'next'
import WebVitalsReporter from './components/WebVitalsReporter'
import ContactFab from './components/shared/ContactFab'
import ThemeWrapper from './components/ThemeWrapper'
import FullPageTopologyWrapper from './components/FullPageTopologyWrapper'
import { inter } from './fonts'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jean-François Lefebvre',
    template: '%s | Jean-François Lefebvre',
  },
  description:
    'Développement web et logiciels sur mesure pour particuliers et PME — de l’idée à la mise en production.',
  icons: {
    /** ICO + PNG = compatibilité maximale ; SVG = net sur navigateurs récents */
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: '/',
    siteName: 'Jean-François Lefebvre',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <ThemeWrapper>
          <WebVitalsReporter />
          <FullPageTopologyWrapper>
            {children}
          </FullPageTopologyWrapper>
          <ContactFab />
        </ThemeWrapper>
      </body>
    </html>
  )
}

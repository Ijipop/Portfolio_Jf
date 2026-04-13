import type { Metadata } from 'next'
import WebVitalsReporter from './components/WebVitalsReporter'
import ContactFab from './components/shared/ContactFab'
import ThemeWrapper from './components/ThemeWrapper'
import FullPageTopologyWrapper from './components/FullPageTopologyWrapper'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PortFolio',
  description: 'PortFolio de Jean-François Lefebvre',
  icons: {
    /** ICO + PNG = compatibilité maximale ; SVG = net sur navigateurs récents */
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    url: '/',
    siteName: 'PortFolio Jean-François Lefebvre',
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
    <html lang="fr">
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

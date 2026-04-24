import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import WebVitalsReporter from './components/WebVitalsReporter'
import ContactFab from './components/shared/ContactFab'
import SeoJsonLd from './components/SeoJsonLd'
import ThemeWrapper from './components/ThemeWrapper'
import FullPageTopologyWrapper from './components/FullPageTopologyWrapper'
import './globals.css'
import { getBeigePresentationBgUrlFromDb } from '@/lib/site-appearance'
import { inter } from './fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jean-François Lefebvre',
    template: '%s | Jean-François Lefebvre',
  },
  description:
    'Ijipop — création et refonte de sites web pour PME et indépendants, mises à jour et petits outils sur mesure. Basé à Montréal.',
  icons: {
    /** ICO + PNG 48 (Google) + SVG ; apple pour iOS / certains aperçus */
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: '/',
    siteName: 'Jean-François Lefebvre — Ijipop',
    description:
      'Sites web vitrine et refonte, maintenance et petits outils pour PME et travailleurs autonomes au Québec.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialBeigePresentationBgUrl = await getBeigePresentationBgUrlFromDb()

  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <SeoJsonLd />
        <ThemeWrapper initialBeigePresentationBgUrl={initialBeigePresentationBgUrl}>
          <WebVitalsReporter />
          <FullPageTopologyWrapper>
            {children}
          </FullPageTopologyWrapper>
          <ContactFab />
        </ThemeWrapper>
        <Analytics />
      </body>
    </html>
  )
}

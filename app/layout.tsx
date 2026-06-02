import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import WebVitalsReporter from './components/WebVitalsReporter'
import ContactFab from './components/shared/ContactFab'
import SeoJsonLd from './components/SeoJsonLd'
import ThemeWrapper from './components/ThemeWrapper'
import FullPageTopologyWrapper from './components/FullPageTopologyWrapper'
import './globals.css'
import { getCachedBeigePresentationBgUrl } from '@/lib/cached-site-appearance'
import { inter } from './fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jean-François Lefebvre',
    template: '%s | Jean-François Lefebvre',
  },
  description:
    'Ijipop — sites web clairs et crédibles pour PME du Québec, orientés demandes clients. Outils simples et IA utile au besoin. Basé à Montréal.',
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
      'Sites web clairs et crédibles pour PME du Québec — prêts à recevoir des demandes. Outils simples et IA utile au besoin.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Jean-François Lefebvre — Ijipop, sites web et logiciels au Québec',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jean-François Lefebvre — Ijipop',
    description:
      'Sites web clairs et crédibles pour PME du Québec — prêts à recevoir des demandes. Outils simples et IA utile au besoin.',
    images: ['/og-default.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialBeigePresentationBgUrl = await getCachedBeigePresentationBgUrl()

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18192980748"
          strategy="lazyOnload"
        />
        <Script id="google-ads-aw" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18192980748');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import ThemeWrapper from './components/ThemeWrapper'
import FullPageTopologyWrapper from './components/FullPageTopologyWrapper'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ijipop.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PortFolio',
  description: 'PortFolio de Jean-François Lefebvre',
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
          <FullPageTopologyWrapper>
            {children}
          </FullPageTopologyWrapper>
        </ThemeWrapper>
      </body>
    </html>
  )
}

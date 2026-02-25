import type { Metadata } from 'next'
import ThemeWrapper from './components/ThemeWrapper'
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
          <div style={{ 
            minHeight: '100vh', // Minimum height pour desktop
            display: 'flex', 
            flexDirection: 'column',
            width: '100%',
            overflowX: 'hidden'
          } as React.CSSProperties}>
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}

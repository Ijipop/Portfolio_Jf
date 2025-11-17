import type { Metadata } from 'next'
import Footer from './components/Footer'
import ThemeWrapper from './components/ThemeWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'PortFolio',
  description: 'PortFolio de Jean-François Lefebvre',
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
            minHeight: '100dvh', // Dynamic viewport height pour mobile (fallback: 100vh)
            height: '100dvh', // Dynamic viewport height pour mobile (fallback: 100vh)
            display: 'flex', 
            flexDirection: 'column',
            width: '100%',
            overflowX: 'hidden'
          } as React.CSSProperties & { minHeight: string; height: string }}>
            {children}
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}

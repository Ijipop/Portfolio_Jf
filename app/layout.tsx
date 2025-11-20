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
            minHeight: '100vh', // Minimum height pour desktop
            display: 'flex', 
            flexDirection: 'column',
            width: '100%',
            overflowX: 'hidden'
          } as React.CSSProperties}>
            {children}
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}

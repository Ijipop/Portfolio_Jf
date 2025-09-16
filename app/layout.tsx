import type { Metadata } from 'next'
import ThemeWrapper from './components/ThemeWrapper'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'PortFolio',
  description: 'PortFolio de Jean-François Lefebvre',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeWrapper>
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            {children}
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}

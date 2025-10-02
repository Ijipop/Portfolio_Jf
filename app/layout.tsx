import type { Metadata } from 'next'
import Footer from './components/Footer'
import ThemeWrapper from './components/ThemeWrapper'

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

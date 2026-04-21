'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { AdvancedThemeProvider } from '../contexts/AdvancedThemeContext'
import { BeigePresentationBgProvider } from '../contexts/BeigePresentationBgContext'
import { GraphicsModeProvider } from '../contexts/GraphicsModeContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { PresentationModeProvider } from '../contexts/PresentationModeContext'

export default function ThemeWrapper({
  children,
  initialBeigePresentationBgUrl = null,
}: {
  children: React.ReactNode
  initialBeigePresentationBgUrl?: string | null
}) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <LanguageProvider>
        <GraphicsModeProvider>
          <PresentationModeProvider>
            <BeigePresentationBgProvider initialBeigePresentationBgUrl={initialBeigePresentationBgUrl}>
              <AdvancedThemeProvider>{children}</AdvancedThemeProvider>
            </BeigePresentationBgProvider>
          </PresentationModeProvider>
        </GraphicsModeProvider>
      </LanguageProvider>
    </AppRouterCacheProvider>
  )
}

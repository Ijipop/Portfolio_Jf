'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { AdvancedThemeProvider } from '../contexts/AdvancedThemeContext'
import { GraphicsModeProvider } from '../contexts/GraphicsModeContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { PresentationModeProvider } from '../contexts/PresentationModeContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <LanguageProvider>
        <GraphicsModeProvider>
          <PresentationModeProvider>
            <AdvancedThemeProvider>{children}</AdvancedThemeProvider>
          </PresentationModeProvider>
        </GraphicsModeProvider>
      </LanguageProvider>
    </AppRouterCacheProvider>
  )
}

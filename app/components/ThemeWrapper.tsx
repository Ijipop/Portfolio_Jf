'use client'

import { AdvancedThemeProvider } from '../contexts/AdvancedThemeContext'
import { GraphicsModeProvider } from '../contexts/GraphicsModeContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { PresentationModeProvider } from '../contexts/PresentationModeContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <GraphicsModeProvider>
        <PresentationModeProvider>
          <AdvancedThemeProvider>{children}</AdvancedThemeProvider>
        </PresentationModeProvider>
      </GraphicsModeProvider>
    </LanguageProvider>
  )
}

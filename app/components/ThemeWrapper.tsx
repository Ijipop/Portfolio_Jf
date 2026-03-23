'use client'

import { AdvancedThemeProvider } from '../contexts/AdvancedThemeContext'
import { GraphicsModeProvider } from '../contexts/GraphicsModeContext'
import { LanguageProvider } from '../contexts/LanguageContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <GraphicsModeProvider>
        <AdvancedThemeProvider>
          {children}
        </AdvancedThemeProvider>
      </GraphicsModeProvider>
    </LanguageProvider>
  )
}

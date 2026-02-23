'use client'

import { AdvancedThemeProvider } from '../contexts/AdvancedThemeContext'
import { LanguageProvider } from '../contexts/LanguageContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdvancedThemeProvider>
        {children}
      </AdvancedThemeProvider>
    </LanguageProvider>
  )
}

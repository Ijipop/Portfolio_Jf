'use client'

import { AdvancedThemeProvider } from '../contexts/AdvancedThemeContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AdvancedThemeProvider>
      {children}
    </AdvancedThemeProvider>
  )
}

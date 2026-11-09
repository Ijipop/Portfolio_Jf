'use client'

import type { ReactNode } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { AdvancedThemeIslandProvider } from '@/contexts/AdvancedThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

/**
 * Îlot providers pour SupportContactForm sur la landing Pop Atelier.
 * Dépendances vérifiées : useLanguage, useThemeColors → useAdvancedTheme, Emotion cache.
 * useSiteDarkChrome lit le store beigeDark (pas de provider requis).
 */
export default function SupportFormMuiIsland({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui-support-island' }}>
      <LanguageProvider>
        <AdvancedThemeIslandProvider>{children}</AdvancedThemeIslandProvider>
      </LanguageProvider>
    </AppRouterCacheProvider>
  )
}

'use client'

import type { ReactNode } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { AdvancedThemeIslandProvider } from '@/contexts/AdvancedThemeContext'

/**
 * Îlot MUI/thème pour SupportContactForm sur la landing Pop Atelier.
 * La locale vient uniquement de PublicChromeI18n (LanguageProvider parent) :
 * flag off → fixedLocale=fr ; flag on → portfolio-locale.
 * Pas de LanguageProvider imbriqué (une seule source de vérité).
 */
export default function SupportFormMuiIsland({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui-support-island' }}>
      <AdvancedThemeIslandProvider>{children}</AdvancedThemeIslandProvider>
    </AppRouterCacheProvider>
  )
}

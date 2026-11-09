'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { AdvancedThemeProvider } from '@/contexts/AdvancedThemeContext'
import { BeigePresentationBgProvider } from '@/contexts/BeigePresentationBgContext'
import { GraphicsModeProvider } from '@/contexts/GraphicsModeContext'
import { PresentationModeProvider } from '@/contexts/PresentationModeContext'

/**
 * Shell admin : mêmes contrats de hooks que la vitrine (AdvancedTheme, BeigeBg, etc.)
 * sans chrome marketing (Topology/Vanta, ContactFab, i18n vitrine).
 */
export default function AdminProviders({
  children,
  initialBeigePresentationBgUrl = null,
}: {
  children: React.ReactNode
  initialBeigePresentationBgUrl?: string | null
}) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui-admin' }}>
      <GraphicsModeProvider>
        <PresentationModeProvider>
          <BeigePresentationBgProvider initialBeigePresentationBgUrl={initialBeigePresentationBgUrl}>
            <AdvancedThemeProvider>{children}</AdvancedThemeProvider>
          </BeigePresentationBgProvider>
        </PresentationModeProvider>
      </GraphicsModeProvider>
    </AppRouterCacheProvider>
  )
}

'use client'

import { useMemo } from 'react'
import { SITE_DARK } from '@/design-system/siteDark'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { getTextColorForBackground } from '@/utils/colorUtils'

/**
 * Couleur de texte contrastée selon le thème actif.
 * Refonte V2 sombre → SITE_DARK.text ; mode Site clair → dérivé de la palette beige.
 */
export function useTextColor(): string {
  const siteDarkChrome = useSiteDarkChrome()
  const { customTheme } = useAdvancedTheme()

  return useMemo(() => {
    if (siteDarkChrome) return SITE_DARK.text
    return getTextColorForBackground(
      `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 50%, ${customTheme.bg} 100%)`,
    )
  }, [siteDarkChrome, customTheme.bg, customTheme.bg2])
}

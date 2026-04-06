'use client'

import { useMemo } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { getTextColorForBackground } from '../utils/colorUtils'

/**
 * Couleur de texte contrastée selon le thème actif (même source que le contexte).
 * Dérivée de `customTheme` pour rester alignée SSR/client et éviter les lectures
 * de `--theme-bg` sur globals.css avant syncPortfolioThemeToDocument.
 */
export function useTextColor(): string {
  const { customTheme } = useAdvancedTheme()
  return useMemo(
    () =>
      getTextColorForBackground(
        `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 50%, ${customTheme.bg} 100%)`,
      ),
    [customTheme.bg, customTheme.bg2],
  )
}

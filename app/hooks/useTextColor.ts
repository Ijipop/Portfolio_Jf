'use client'

import { useEffect, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { getTextColorForBackground } from '../utils/colorUtils'

/**
 * Hook pour obtenir la couleur de texte optimale selon le thème actif
 * 
 * Retourne '#ffffff' pour les thèmes sombres et '#1e293b' pour les thèmes clairs
 * 
 * @returns {string} Couleur de texte optimale
 */
export function useTextColor(): string {
  const { customTheme, themeName } = useAdvancedTheme()
  const [textColor, setTextColor] = useState<string>('#ffffff')

  useEffect(() => {
    const updateTextColor = () => {
      if (typeof window === 'undefined') return

      // Lire les CSS variables définies par ThemeSelector
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
      const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()

      if (bg && bg2) {
        // Créer un gradient avec les couleurs du thème
        const background = `linear-gradient(135deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`
        setTextColor(getTextColorForBackground(background))
      } else if (customTheme?.bg && customTheme?.bg2) {
        // Fallback sur customTheme
        const background = `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 50%, ${customTheme.bg} 100%)`
        setTextColor(getTextColorForBackground(background))
      } else {
        // Fallback : déterminer selon le nom du thème
        // Seul "default" est clair, tous les autres sont sombres
        setTextColor(themeName === 'default' ? '#1e293b' : '#ffffff')
      }
    }

    updateTextColor()

    // Observer les changements de CSS variables
    const observer = new MutationObserver(updateTextColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      observer.disconnect()
    }
  }, [customTheme, themeName])

  return textColor
}


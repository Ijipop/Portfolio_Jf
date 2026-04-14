'use client'

import { useTheme } from '@mui/material/styles'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { useEffect, useState } from 'react'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
}

/**
 * Hook unifié pour obtenir les couleurs du thème actif
 * 
 * Priorité de lecture :
 * 1. CSS Variables (définies par ThemeSelector) - pour réactivité immédiate
 * 2. customTheme (depuis AdvancedThemeContext) - pour cohérence React
 * 3. Material-UI theme - fallback
 * 
 * @returns {ThemeColors} Les couleurs primaire, secondaire et accent du thème actif
 */
export function useThemeColors(): ThemeColors {
  const muiTheme = useTheme()
  const { customTheme } = useAdvancedTheme()
  
  const [colors, setColors] = useState<ThemeColors>({
    primary: customTheme?.primary || muiTheme.palette.primary.main || '#3b82f6',
    secondary: customTheme?.secondary || muiTheme.palette.secondary.main || '#059669',
    accent: customTheme?.accent || '#ff6b35',
  })

  useEffect(() => {
    const updateColors = () => {
      if (typeof window === 'undefined') return

      const root = document.documentElement
      const cssPrimary = getComputedStyle(root).getPropertyValue('--primary-color')?.trim()
      const cssSecondary = getComputedStyle(root).getPropertyValue('--secondary-color')?.trim()
      const cssAccent = getComputedStyle(root).getPropertyValue('--accent-color')?.trim()

      setColors({
        primary: cssPrimary || customTheme?.primary || muiTheme.palette.primary.main || '#3b82f6',
        secondary: cssSecondary || customTheme?.secondary || muiTheme.palette.secondary.main || '#059669',
        accent: cssAccent || customTheme?.accent || '#ff6b35',
      })
    }

    // Mise à jour initiale
    updateColors()

    // Observer les changements de CSS variables (plus efficace que setInterval)
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    // Observer aussi les changements d'attributs sur le body (ThemeSelector peut modifier le body)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    })

    // Écouter les changements de localStorage (pour synchronisation entre onglets)
    const handleStorageChange = () => updateColors()
    window.addEventListener('storage', handleStorageChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [customTheme, muiTheme])

  return colors
}


'use client'

import Box from '@mui/material/Box'
import { ReactNode, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import ProfessionalBackground from '../ProfessionalBackground'
import { GRADIENTS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'

interface PageWrapperProps {
  children: ReactNode
  /**
   * Variant du background à utiliser
   * - 'default': utilise GRADIENTS.backgrounds.light/dark selon le thème
   * - 'alternate': utilise GRADIENTS.backgrounds.lightAlternate
   * - 'projects': utilise GRADIENTS.backgrounds.lightProjects
   */
  backgroundVariant?: 'default' | 'alternate' | 'projects'
  /**
   * Afficher le système de particules
   */
  showParticles?: boolean
  /**
   * Nombre de particules (défaut: 120)
   */
  particleCount?: number
  /**
   * Vitesse des particules (défaut: 0.4)
   */
  particleSpeed?: number
  /**
   * Couleurs des particules
   */
  particleColors?: string[]
  /**
   * Afficher l'overlay radial (::before)
   */
  showRadialOverlay?: boolean
  /**
   * Variant de l'overlay radial
   */
  overlayVariant?: 'dark' | 'light'
  /**
   * Gestion du overflow
   */
  overflow?: 'hidden' | 'auto' | 'visible'
  overflowX?: 'hidden' | 'auto' | 'visible'
  overflowY?: 'hidden' | 'auto' | 'visible'
}

export default function PageWrapper({
  children,
  backgroundVariant = 'default',
  showParticles = true,
  particleCount = 120,
  particleSpeed = 0.4,
  particleColors = ['#ff6b35', '#ff1744', '#3b82f6', '#059669'],
  showRadialOverlay = true,
  overlayVariant = 'dark',
  overflow,
  overflowX,
  overflowY,
}: PageWrapperProps) {
  const theme = useTheme()
  const { customTheme } = useAdvancedTheme()
  
  // Fonction pour obtenir le background initial (plus de dépendance au dark mode)
  const getInitialBackground = () => {
    switch (backgroundVariant) {
      case 'alternate':
        return GRADIENTS.backgrounds.lightAlternate
      case 'projects':
        return GRADIENTS.backgrounds.lightProjects
      default:
        return GRADIENTS.backgrounds.light
    }
  }
  
  const [background, setBackground] = useState<string>(getInitialBackground())
  
  // Mettre à jour le background quand le thème change
  useEffect(() => {
    const updateBackground = () => {
      if (typeof window === 'undefined') return
      
      // Lire les CSS variables définies par ThemeSelector
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
      const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
      
      if (bg && bg2) {
        setBackground(`linear-gradient(135deg, ${bg} 0%, ${bg2} 25%, ${bg} 50%, ${bg2} 75%, ${bg} 100%)`)
        return
      }
      
      // Fallback sur customTheme
      if (customTheme?.bg && customTheme?.bg2) {
        setBackground(`linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`)
        return
      }
      
      // Fallback sur les gradients statiques
      setBackground(getInitialBackground())
    }
    
    updateBackground()
    
    // Observer les changements de CSS variables
    const observer = new MutationObserver(updateBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    // Vérifier périodiquement
    const interval = setInterval(updateBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [customTheme, backgroundVariant])

  const getOverlay = () => {
    if (!showRadialOverlay) return 'none'
    
    // Utiliser overlayVariant pour déterminer l'overlay (plus de dépendance au dark mode)
    return overlayVariant === 'dark' 
      ? GRADIENTS.overlays.darkRadial 
      : GRADIENTS.overlays.lightRadial
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: background || GRADIENTS.backgrounds.light,
        position: 'relative',
        overflow: overflow || 'hidden',
        overflowX: overflowX,
        overflowY: overflowY,
        transition: 'background 0.5s ease',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getOverlay(),
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {showParticles && (
        <ProfessionalBackground />
      )}
      {children}
    </Box>
  )
}


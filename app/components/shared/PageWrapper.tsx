'use client'

import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import ParticleSystem from '../ParticleSystem'
import { GRADIENTS } from '../../design-system/constants'

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
  const getBackground = (theme: any) => {
    if (theme.palette.mode === 'dark') {
      return GRADIENTS.backgrounds.dark
    }
    
    switch (backgroundVariant) {
      case 'alternate':
        return GRADIENTS.backgrounds.lightAlternate
      case 'projects':
        return GRADIENTS.backgrounds.lightProjects
      default:
        return GRADIENTS.backgrounds.light
    }
  }

  const getOverlay = (theme: any) => {
    if (!showRadialOverlay) return 'none'
    
    if (theme.palette.mode === 'dark') {
      return GRADIENTS.overlays.darkRadial
    }
    
    return overlayVariant === 'dark' 
      ? GRADIENTS.overlays.darkRadial 
      : GRADIENTS.overlays.lightRadial
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => getBackground(theme),
        position: 'relative',
        overflow: overflow || 'hidden',
        overflowX: overflowX,
        overflowY: overflowY,
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => getOverlay(theme),
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {showParticles && (
        <ParticleSystem
          particleCount={particleCount}
          speed={particleSpeed}
          colors={particleColors}
          mouseInteraction={true}
        />
      )}
      {children}
    </Box>
  )
}


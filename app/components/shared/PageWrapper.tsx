'use client'

import Box from '@mui/material/Box'
import React from 'react'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { GRADIENTS } from '@/design-system/constants'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { shouldShowTopology } from '@/utils/topologyRoutes'

interface PageWrapperProps {
  children: ReactNode
  /**
   * Variant du background à utiliser
   * - 'default': utilise les variables du thème / gradient
   * - 'alternate': utilise GRADIENTS.backgrounds.lightAlternate
   */
  backgroundVariant?: 'default' | 'alternate'
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
  showRadialOverlay = true,
  overlayVariant = 'dark',
  overflow,
  overflowX,
  overflowY,
}: PageWrapperProps) {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { customTheme } = useAdvancedTheme()

  const getInitialBackground = () => {
    switch (backgroundVariant) {
      case 'alternate':
        return GRADIENTS.backgrounds.lightAlternate
      default:
        return GRADIENTS.backgrounds.light
    }
  }

  const [background, setBackground] = useState<string>(getInitialBackground())

  useEffect(() => {
    const updateBackground = () => {
      if (typeof window === 'undefined') return

      const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
      const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()

      if (bg && bg2) {
        setBackground(`linear-gradient(135deg, ${bg} 0%, ${bg2} 25%, ${bg} 50%, ${bg2} 75%, ${bg} 100%)`)
        return
      }

      if (customTheme?.bg && customTheme?.bg2) {
        setBackground(`linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`)
        return
      }

      setBackground(getInitialBackground())
    }

    updateBackground()

    const observer = new MutationObserver(updateBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      observer.disconnect()
    }
  }, [customTheme, backgroundVariant])

  const getOverlay = () => {
    if (!showRadialOverlay) return 'none'

    return overlayVariant === 'dark' ? GRADIENTS.overlays.darkRadial : GRADIENTS.overlays.lightRadial
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: isTopologyRoute ? 'transparent' : (background || GRADIENTS.backgrounds.light),
        position: 'relative',
        overflow: isTopologyRoute ? (overflow ?? 'visible') : (overflow || 'hidden'),
        overflowX: overflowX,
        overflowY: overflowY,
        transition: 'background 0.5s ease',
        '&::before': isTopologyRoute
          ? { content: 'none', display: 'none' }
          : {
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
      {children}
    </Box>
  )
}

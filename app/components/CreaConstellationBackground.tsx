'use client'

/**
 * Fond mode Créa — constellations vivantes (Three.js vanilla, pas R3F).
 * Repli : mesh CSS si WebGL indisponible ou prefers-reduced-motion.
 */

import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import CreaConstellationScene from './CreaConstellationScene'
import CreaMeshMotionBackground from './CreaMeshMotionBackground'

function hasWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function CreaConstellationBackground() {
  const { customTheme } = useAdvancedTheme()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const [webglOk, setWebglOk] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglOk(hasWebGL())
  }, [])

  if (prefersReducedMotion || webglOk === false) {
    return <CreaMeshMotionBackground />
  }

  if (webglOk === null) {
    return (
      <Box
        aria-hidden
        data-testid="crea-constellation-fallback"
        sx={{ position: 'absolute', inset: 0, bgcolor: customTheme.bg }}
      />
    )
  }

  return (
    <Box
      aria-hidden
      data-testid="crea-constellation-background"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <CreaConstellationScene
        bg={customTheme.bg}
        primary={customTheme.primary}
        secondary={customTheme.secondary}
      />
    </Box>
  )
}

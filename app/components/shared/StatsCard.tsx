'use client'

import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import { DESIGN_TOKENS, ANIMATIONS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'

interface StatsCardProps {
  children: ReactNode
}

export default function StatsCard({ children }: StatsCardProps) {
  const theme = useTheme()
  const { primary, secondary } = useThemeColors()
  
  // Convertir les couleurs hex en rgba pour les gradients
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  return (
    <Paper
      sx={{
        background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 25%, ${primary} 50%, ${secondary} 75%, ${primary} 100%)`,
        backgroundSize: '200% 200%',
        animation: 'gradientShift 6s ease-in-out infinite',
        color: 'white',
        padding: theme.spacing(2),
        borderRadius: DESIGN_TOKENS.borderRadius.medium,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: DESIGN_TOKENS.transitions.slow,
        boxShadow: `0 8px 32px ${hexToRgba(primary, 0.2)}, 0 0 0 1px ${hexToRgba(primary, 0.15)}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${hexToRgba(primary, 0.1)} 0%, ${hexToRgba(secondary, 0.1)} 100%)`,
          opacity: 0,
          transition: DESIGN_TOKENS.transitions.normal,
          zIndex: DESIGN_TOKENS.zIndex.base,
        },
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: `0 12px 40px ${hexToRgba(primary, 0.3)}, 0 0 0 2px ${hexToRgba(primary, 0.3)}, 0 0 20px ${hexToRgba(secondary, 0.2)}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
          '&::before': {
            opacity: 1,
          }
        },
        ...ANIMATIONS.gradientShift
      }}
    >
      {children}
    </Paper>
  )
}


'use client'

import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { ANIMATIONS } from '../../design-system/constants'

/**
 * Typography pour les valeurs numériques dans les StatsCards
 * Avec effet shimmer et glow
 */
export const StatsValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(0.5),
  background: 'linear-gradient(45deg, #ffffff 0%, #e0f2fe 25%, #b3e5fc 50%, #81d4fa 75%, #ffffff 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: 'textShimmer 3s ease-in-out infinite',
  textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)',
  fontSize: '2.2rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
    animation: 'textGlow 2s ease-in-out infinite',
    zIndex: -1,
  },
  ...ANIMATIONS.textShimmer,
  ...ANIMATIONS.textGlow,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.2rem',
  },
}))

/**
 * Typography pour les labels dans les StatsCards
 * Avec effet underline glow
 */
export const StatsLabelTypography = styled(Typography)(({ theme }) => ({
  opacity: 0.95,
  fontWeight: 600,
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 10px rgba(59, 130, 246, 0.2)',
  fontSize: '0.9rem',
  background: 'linear-gradient(45deg, #ffffff, #f8fafc)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    animation: 'underlineGlow 2s ease-in-out infinite',
  },
  ...ANIMATIONS.underlineGlow,
}))


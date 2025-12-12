'use client'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'
import { DESIGN_TOKENS, ANIMATIONS } from '../../design-system/constants'

const StatsCardStyled = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #059669 25%, #10b981 50%, #3b82f6 75%, #059669 100%)',
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
  boxShadow: theme.palette.mode === 'dark'
    ? '0 6px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(59, 130, 246, 0.2)'
    : '0 8px 32px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
    opacity: 0,
    transition: DESIGN_TOKENS.transitions.normal,
    zIndex: DESIGN_TOKENS.zIndex.base,
  },
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 40px rgba(0,0,0,0.6), 0 0 0 2px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.3)'
      : '0 12px 40px rgba(59, 130, 246, 0.3), 0 0 0 2px rgba(59, 130, 246, 0.3), 0 0 20px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    '&::before': {
      opacity: 1,
    }
  },
  ...ANIMATIONS.gradientShift
}))

interface StatsCardProps {
  children: ReactNode
}

export default function StatsCard({ children }: StatsCardProps) {
  return (
    <StatsCardStyled>
      {children}
    </StatsCardStyled>
  )
}


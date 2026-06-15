'use client'

import { Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { useCardSurfaceOptions } from '@/hooks/useCardSurfaceOptions'

// Glassmorphism Card — surfaces via getCardSurfaceSx dans le composant
const GlassCard = styled(Card)(() => ({
  borderRadius: 24,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
}))

// Neumorphism Button
const NeumorphicButton = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)'
    : 'linear-gradient(145deg, #f0f0f0, #ffffff)',
  borderRadius: 16,
  padding: theme.spacing(2, 4),
  boxShadow: theme.palette.mode === 'dark'
    ? '20px 20px 40px rgba(0, 0, 0, 0.3), -20px -20px 40px rgba(74, 85, 104, 0.1)'
    : '20px 20px 40px rgba(0, 0, 0, 0.1), -20px -20px 40px rgba(255, 255, 255, 0.8)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(74, 85, 104, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '25px 25px 50px rgba(0, 0, 0, 0.4), -25px -25px 50px rgba(74, 85, 104, 0.2)'
      : '25px 25px 50px rgba(0, 0, 0, 0.15), -25px -25px 50px rgba(255, 255, 255, 0.9)',
  },
  '&:active': {
    transform: 'translateY(0px)',
    boxShadow: theme.palette.mode === 'dark'
      ? 'inset 20px 20px 40px rgba(0, 0, 0, 0.3), inset -20px -20px 40px rgba(74, 85, 104, 0.1)'
      : 'inset 20px 20px 40px rgba(0, 0, 0, 0.1), inset -20px -20px 40px rgba(255, 255, 255, 0.8)',
  }
}))

// Glassmorphism Container
const GlassContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(10, 10, 10, 0.8)'
    : 'var(--card-background, linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%))',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid var(--card-primary, rgba(255, 255, 255, 0.2))',
  borderRadius: 32,
  padding: theme.spacing(4),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--card-primary, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.00) 40%, rgba(0, 0, 0, 0.05) 100%)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0.00) 100%)',
    zIndex: 0,
  },
}))

interface GlassCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function GlassCardComponent({ children, onClick, className }: GlassCardProps) {
  const cardSurface = useCardSurfaceOptions()
  const surfaceSx = getCardSurfaceSx({
    ...cardSurface,
    variant: 'flat',
    level: 'soft',
    interactive: true,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassCard onClick={onClick} className={className} sx={surfaceSx}>
        <CardContent sx={{ position: 'relative', zIndex: 2 }}>
          {children}
        </CardContent>
      </GlassCard>
    </motion.div>
  )
}

export { GlassContainer, NeumorphicButton }


'use client'

import { Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'

// Glassmorphism Card avec effets de verre
const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(26, 26, 26, 0.25)'
    : 'var(--card-background, rgba(255, 255, 255, 0.25))',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.18)'
    : '1px solid var(--card-primary, rgba(255, 255, 255, 0.3))',
  borderRadius: 24,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--card-primary, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
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
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 23, 68, 0.1) 100%)'
      : 'linear-gradient(135deg, var(--card-primary, rgba(59, 130, 246, 0.1)) 0%, var(--card-secondary, rgba(5, 150, 105, 0.1)) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--card-hover-primary, rgba(59, 130, 246, 0.3)), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    '&::before': {
      opacity: 1,
    }
  }
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
    : 'var(--card-background, rgba(248, 250, 252, 0.8))',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
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
    left: '-100%',
    width: '200%',
    height: '100%',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(110deg, transparent 20%, transparent 40%, rgba(255, 107, 53, 0.15) 50%, rgba(255, 23, 68, 0.15) 55%, transparent 60%, transparent 80%)'
      : 'linear-gradient(110deg, transparent 20%, transparent 40%, var(--card-primary, rgba(59, 130, 246, 0.12)) 50%, var(--card-secondary, rgba(5, 150, 105, 0.12)) 55%, transparent 60%, transparent 80%)',
    animation: 'shimmer 3s ease-in-out infinite',
    zIndex: 0,
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(100%)' }
  }
}))

interface GlassCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function GlassCardComponent({ children, onClick, className }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassCard onClick={onClick} className={className}>
        <CardContent sx={{ position: 'relative', zIndex: 2 }}>
          {children}
        </CardContent>
      </GlassCard>
    </motion.div>
  )
}

export { GlassContainer, NeumorphicButton }


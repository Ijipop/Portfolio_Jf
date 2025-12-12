'use client'

import { Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'
import { DESIGN_TOKENS, GRADIENTS } from '../../design-system/constants'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'

const BaseCardStyled = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? GRADIENTS.cards.dark
    : GRADIENTS.cards.light,
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.2)' 
    : '1px solid rgba(148, 163, 184, 0.1)',
  borderRadius: DESIGN_TOKENS.borderRadius.large,
  boxShadow: theme.palette.mode === 'dark'
    ? DESIGN_TOKENS.shadows.card.dark
    : DESIGN_TOKENS.shadows.card.light,
  transition: DESIGN_TOKENS.transitions.slow,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  zIndex: DESIGN_TOKENS.zIndex.base,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(74, 85, 104, 0.1) 0%, rgba(45, 55, 72, 0.1) 50%, rgba(74, 85, 104, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 50%, rgba(59, 130, 246, 0.02) 100%)',
    opacity: 0,
    transition: DESIGN_TOKENS.transitions.normal,
    zIndex: DESIGN_TOKENS.zIndex.base,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #4a5568, #2d3748, #4a5568, #2d3748)'
      : 'linear-gradient(45deg, #3b82f6, #60a5fa, #93c5fd, #60a5fa)',
    borderRadius: DESIGN_TOKENS.borderRadius.large + 2,
    zIndex: -1,
    opacity: 0,
    transition: DESIGN_TOKENS.transitions.normal,
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: theme.palette.mode === 'dark'
      ? DESIGN_TOKENS.shadows.cardHover.dark
      : DESIGN_TOKENS.shadows.cardHover.light,
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    }
  }
}))

interface BaseCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'default' | '3d' | 'glass' | 'feature'
  height?: string | number
  reflectionColor?: string
}

export default function BaseCard({ 
  children, 
  onClick, 
  className, 
  variant = 'default',
  height,
  reflectionColor 
}: BaseCardProps) {
  const { customTheme } = useAdvancedTheme()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const primary = customTheme?.primary || '#3b82f6'
  const secondary = customTheme?.secondary || '#059669'
  const accent = customTheme?.accent || '#8b5cf6'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || variant !== '3d') return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / rect.height) * -10
    const rotateY = (mouseX / rect.width) * 10
    
    setRotation({ x: rotateX, y: rotateY })
  }
  
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  const getVariantStyles = () => {
    switch (variant) {
      case '3d':
        return {
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }
      case 'glass':
        return {
          background: 'rgba(26, 26, 26, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }
      case 'feature':
        return {
          height: '100%',
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={variant === '3d' ? {} : { y: -8 }}
      style={{ perspective: variant === '3d' ? '1000px' : 'none' }}
    >
      <BaseCardStyled 
        ref={cardRef}
        onClick={onClick} 
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          height: height || (variant === 'feature' ? '100%' : 'auto'),
          minHeight: variant === 'feature' ? '300px' : 'auto',
          ...getVariantStyles(),
          ...(reflectionColor && {
            '&:hover::after': {
              background: `linear-gradient(135deg, ${reflectionColor}15 0%, transparent 50%, ${reflectionColor}10 100%)`,
              opacity: 1,
            }
          })
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: DESIGN_TOKENS.zIndex.elevated, height: '100%' }}>
          {children}
        </CardContent>
      </BaseCardStyled>
    </motion.div>
  )
}


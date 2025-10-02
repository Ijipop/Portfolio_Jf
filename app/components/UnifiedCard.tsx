'use client'

import { Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

// Floating 3D Element - Plus subtil
const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
  backgroundSize: '200% 200%',
  animation: 'float 8s ease-in-out infinite, gradientShift 3s ease-in-out infinite',
  borderRadius: '50%',
  filter: 'blur(0.5px)',
  opacity: 0.6,
  zIndex: 1,
  pointerEvents: 'none',
  '@keyframes float': {
    '0%, 100%': { 
      transform: 'translateY(0px) scale(1)',
      opacity: 0.4
    },
    '50%': { 
      transform: 'translateY(-10px) scale(1.1)',
      opacity: 0.8
    }
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
}))

// Carte unifiée avec effets 3D et floating elements
const UnifiedCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientShift 3s ease-in-out infinite',
  borderRadius: 24,
  padding: theme.spacing(4),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 107, 53, 0.2)'
    : '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--card-primary, transparent)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transformStyle: 'preserve-3d',
  minHeight: '240px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 25%, rgba(240, 147, 251, 0.2) 50%, rgba(245, 87, 108, 0.2) 75%, rgba(102, 126, 234, 0.2) 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 3s ease-in-out infinite',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(102, 126, 234, 0.4), 0 0 40px rgba(245, 87, 108, 0.3)'
      : '0 30px 80px rgba(0, 0, 0, 0.2), 0 0 0 2px var(--card-hover-primary), 0 0 40px var(--card-hover-secondary), 0 0 60px var(--card-hover-glow)',
    '&::before': {
      opacity: 1,
    }
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  },
  // Désactiver les effets de hover sur la page default
  '.default-theme &': {
    '&:hover': {
      transform: 'none !important',
      boxShadow: 'inherit !important',
      background: 'inherit !important'
    }
  },
  // Désactiver aussi avec la variable CSS
  '[style*="--disable-hover"] &': {
    '&:hover': {
      transform: 'none !important',
      boxShadow: 'inherit !important',
      background: 'inherit !important'
    }
  }
}))

interface UnifiedCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  floatingElements?: number
  sx?: any
  variant?: 'default' | 'glass' | 'flip' | 'feature'
}

export default function UnifiedCardComponent({ 
  children, 
  onClick, 
  className, 
  floatingElements = 3,
  sx,
  variant = 'default'
}: UnifiedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // Styles spécifiques selon le variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          background: 'rgba(26, 26, 26, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }
      case 'flip':
        return {
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          height: '400px',
          perspective: '1000px',
        }
      case 'feature':
        return {
          minHeight: '300px',
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <UnifiedCard
        ref={cardRef}
        onClick={onClick}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg) translateZ(20px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...getVariantStyles(),
          ...sx
        }}
      >
        {/* Floating Elements - Positionnés de manière élégante */}
        {floatingElements > 0 && (
          <>
            <FloatingElement
              sx={{
                width: 8,
                height: 8,
                top: 20,
                right: 20,
                animationDelay: '0s',
                zIndex: 1,
              }}
            />
            {floatingElements > 1 && (
              <FloatingElement
                sx={{
                  width: 6,
                  height: 6,
                  bottom: 20,
                  left: 20,
                  animationDelay: '1s',
                  zIndex: 1,
                }}
              />
            )}
            {floatingElements > 2 && (
              <FloatingElement
                sx={{
                  width: 4,
                  height: 4,
                  top: '50%',
                  right: 10,
                  animationDelay: '2s',
                  zIndex: 1,
                }}
              />
            )}
          </>
        )}
        
        <CardContent sx={{ position: 'relative', zIndex: 2 }}>
          {children}
        </CardContent>
      </UnifiedCard>
    </motion.div>
  )
}

export { FloatingElement }


'use client'

import { Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

// 3D Card avec perspective et transformations
const ThreeDCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
  borderRadius: 24,
  padding: theme.spacing(4),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 107, 53, 0.2)'
    : '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transformStyle: 'preserve-3d',
  minHeight: '240px', // Hauteur ultra compacte
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 23, 68, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.3)'
      : '0 30px 80px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)',
    '&::before': {
      opacity: 1,
    }
  }
}))

// Floating 3D Element - Plus subtil
const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.mode === 'dark'
    ? 'rgba(255, 107, 53, 0.3)'
    : 'rgba(59, 130, 246, 0.3)',
  borderRadius: '50%',
  filter: 'blur(0.5px)',
  animation: 'float 8s ease-in-out infinite',
  opacity: 0.6,
  '@keyframes float': {
    '0%, 100%': { 
      transform: 'translateY(0px) scale(1)',
      opacity: 0.4
    },
    '50%': { 
      transform: 'translateY(-10px) scale(1.1)',
      opacity: 0.8
    }
  }
}))

// 3D Button avec effet de profondeur
const ThreeDButton = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #2a2a2a, #1a1a1a)'
    : 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  borderRadius: 16,
  padding: theme.spacing(2, 4),
  boxShadow: theme.palette.mode === 'dark'
    ? 'inset -5px -5px 10px rgba(0, 0, 0, 0.3), inset 5px 5px 10px rgba(74, 85, 104, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2)'
    : 'inset -5px -5px 10px rgba(0, 0, 0, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.8), 0 10px 20px rgba(0, 0, 0, 0.1)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(74, 85, 104, 0.3)'
    : '1px solid rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? 'inset -3px -3px 8px rgba(0, 0, 0, 0.3), inset 3px 3px 8px rgba(74, 85, 104, 0.1), 0 15px 30px rgba(0, 0, 0, 0.3)'
      : 'inset -3px -3px 8px rgba(0, 0, 0, 0.1), inset 3px 3px 8px rgba(255, 255, 255, 0.8), 0 15px 30px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0px)',
    boxShadow: theme.palette.mode === 'dark'
      ? 'inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -5px -5px 10px rgba(74, 85, 104, 0.1)'
      : 'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px rgba(255, 255, 255, 0.8)',
  }
}))

interface ThreeDCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  floatingElements?: number
}

export default function ThreeDCardComponent({ 
  children, 
  onClick, 
  className, 
  floatingElements = 3 
}: ThreeDCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <ThreeDCard
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
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
      </ThreeDCard>
    </motion.div>
  )
}

export { FloatingElement, ThreeDButton }


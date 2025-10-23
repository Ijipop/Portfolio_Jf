'use client'

import { Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

// Type pour les props custom du styled component
type SimpleCardStyleProps = {
  customTheme?: any
}

const SimpleCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'customTheme',
})<SimpleCardStyleProps>(({ theme, customTheme }) => ({
  background: 'linear-gradient(145deg, #f0f4ff 0%, #e6f2ff 50%, #dbeafe 100%)',
  border: '1px solid rgba(74, 85, 104, 0.15)',
  borderRadius: 24,
  boxShadow: '0 8px 32px rgba(74, 85, 104, 0.1), 0 0 0 1px rgba(74, 85, 104, 0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  zIndex: 1,
  height: '400px',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${customTheme?.primary || '#3b82f6'}20 0%, ${customTheme?.secondary || '#059669'}20 25%, ${customTheme?.accent || '#8b5cf6'}20 50%, ${customTheme?.primary || '#3b82f6'}20 75%, ${customTheme?.primary || '#3b82f6'}20 100%)`,
    backgroundSize: '200% 200%',
    opacity: 0,
    transition: 'all 0.4s ease',
    zIndex: 1,
    animation: 'gradientShift 3s ease-in-out infinite',
  },
  '&:hover': {
    transform: 'translateY(-16px) scale(1.02) rotateX(5deg) rotateY(5deg) rotateZ(2deg)',
    background: `linear-gradient(145deg, #f0f4ff 0%, #e6f2ff 50%, #dbeafe 100%), linear-gradient(135deg, ${customTheme?.primary || '#3b82f6'}30 0%, ${customTheme?.secondary || '#059669'}30 25%, ${customTheme?.accent || '#8b5cf6'}30 50%, ${customTheme?.primary || '#3b82f6'}30 75%, ${customTheme?.primary || '#3b82f6'}30 100%)`,
    boxShadow: `0 25px 50px ${customTheme?.primary || '#3b82f6'}20, 0 0 0 2px ${customTheme?.primary || '#3b82f6'}60, 0 0 30px ${customTheme?.primary || '#3b82f6'}40, 0 0 60px ${customTheme?.secondary || '#059669'}20, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
    '&::before': {
      opacity: 1,
      background: `linear-gradient(135deg, ${customTheme?.primary || '#3b82f6'}40 0%, ${customTheme?.secondary || '#059669'}40 25%, ${customTheme?.accent || '#8b5cf6'}40 50%, ${customTheme?.primary || '#3b82f6'}40 75%, ${customTheme?.primary || '#3b82f6'}40 100%)`,
    }
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
}))

interface SimpleCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  reflectionColor?: string
}

export default function SimpleCardComponent({ children, onClick, className, reflectionColor }: SimpleCardProps) {
  const { customTheme } = useAdvancedTheme()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      style={{ perspective: '1000px' }}
    >
      <SimpleCard 
        ref={cardRef}
        onClick={onClick} 
        className={className} 
        customTheme={customTheme}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          '&::after': reflectionColor ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${reflectionColor}15 0%, transparent 50%, ${reflectionColor}10 100%)`,
            borderRadius: '24px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 1,
            pointerEvents: 'none',
          } : {},
          '&:hover': {
            '&::after': reflectionColor ? {
              opacity: 1,
            } : {}
          }
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
          {children}
        </CardContent>
      </SimpleCard>
    </motion.div>
  )
}

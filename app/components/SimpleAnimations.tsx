'use client'

import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Effet de typing simple
export function TypingEffect({ 
  text, 
  speed = 100,
  className 
}: {
  text: string
  speed?: number
  className?: string
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <Box className={className}>
      <Typography component="span">
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          sx={{ color: 'primary.main' }}
        >
          |
        </motion.span>
      </Typography>
    </Box>
  )
}

// Effet de glitch PIXEL STYLE ULTRA FUCKÉ
export function GlitchEffect({ 
  children,
  className 
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={className}
      animate={isGlitching ? {
        // Mouvement chaotique pixel
        x: [0, -8, 12, -6, 4, -10, 8, 0],
        y: [0, 4, -6, 2, -8, 6, -4, 0],
        // Rotation pixel
        rotate: [0, -2, 3, -1, 2, -3, 1, 0],
        // Scale pixel
        scale: [1, 1.02, 0.98, 1.01, 0.99, 1.03, 0.97, 1],
        // Skew pixel
        skewX: [0, -3, 4, -2, 3, -4, 2, 0],
        skewY: [0, 2, -3, 1, -2, 3, -1, 0]
      } : {}}
      transition={{ 
        duration: 0.2,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1]
      }}
      style={{
        // Effet pixel art
        imageRendering: 'pixelated',
        imageRendering: '-moz-crisp-edges',
        imageRendering: 'crisp-edges',
        // Filtre pixel
        filter: isGlitching ? 'contrast(1.5) brightness(1.2) saturate(1.3)' : 'none',
        // Transform origin pour rotation
        transformOrigin: 'center center'
      }}
    >
      {children}
    </motion.div>
  )
}

// Animation de fade in simple
export function FadeIn({ 
  children,
  delay = 0,
  className 
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Animation de scale simple
export function ScaleIn({ 
  children,
  delay = 0,
  className 
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

// Animation de slide simple
export function SlideIn({ 
  children,
  direction = 'left',
  delay = 0,
  className 
}: {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  className?: string
}) {
  const variants = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: -50 },
    down: { x: 0, y: 50 }
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...variants[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Animation de hover simple
export function HoverScale({ 
  children,
  scale = 1.05,
  className 
}: {
  children: React.ReactNode
  scale?: number
  className?: string
}) {
  return (
    <motion.div
      className={`hover-scale-wrapper ${className || ''}`}
      whileHover={{ scale }}
      transition={{ duration: 0.3 }}
      style={{ 
        // Empêcher les conflits CSS
        transform: 'none !important',
        boxShadow: 'none !important'
      }}
    >
      {children}
    </motion.div>
  )
}

// Animation de rotation simple
export function RotateOnHover({ 
  children,
  rotation = 5,
  className 
}: {
  children: React.ReactNode
  rotation?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ rotate: rotation }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

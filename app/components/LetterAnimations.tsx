'use client'

import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Effet ORIGINAL sur les lettres individuelles
export function LetterAnimations({ 
  children,
  className 
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [key, setKey] = useState(0) // Force le re-render
  const theme = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Force le re-render quand le thème change
  useEffect(() => {
    setKey(prev => prev + 1)
    // Reset des animations quand le thème change
    setIsAnimating(false)
  }, [theme.palette.mode])

  // Diviser le texte en lettres individuelles
  const text = children?.toString() || ''
  const letters = text.split('')

  return (
    <div className={className} style={{ display: 'inline-block' }}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${key}-${index}`}
          style={{ 
            display: 'inline-block',
            position: 'relative',
            // Force la netteté
            imageRendering: 'crisp-edges',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
          animate={isAnimating ? {
            // Chaque lettre a un délai différent
            y: [0, -10, 5, -3, 0],
            rotate: [0, -5, 3, -2, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            // Couleurs seulement en dark mode
            ...(theme.palette.mode === 'dark' ? {
              color: [
                'inherit',
                '#ff6b35',
                '#3b82f6', 
                '#06ffa5',
                'inherit'
              ]
            } : {})
          } : {}}
          transition={{
            duration: 2,
            delay: index * 0.1, // Délai progressif
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            rotate: 5,
            // Couleur orange seulement en dark mode
            ...(theme.palette.mode === 'dark' ? {
              color: '#ff6b35'
            } : {}),
            transition: { duration: 0.3 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}

// Effet de vague sur les lettres
export function WaveLetters({ 
  children,
  className 
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isWaving, setIsWaving] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true)
      setTimeout(() => setIsWaving(false), 1500)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const text = children?.toString() || ''
  const letters = text.split('')

  return (
    <div className={className} style={{ display: 'inline-block' }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ 
            display: 'inline-block',
            position: 'relative'
          }}
          animate={isWaving ? {
            y: [0, -15, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.3, 1],
            color: [
              'inherit',
              '#06ffa5',
              'inherit'
            ]
          } : {}}
          transition={{
            duration: 1.5,
            delay: index * 0.05, // Vague progressive
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.4,
            rotate: 8,
            color: '#06ffa5',
            y: -5,
            transition: { duration: 0.2 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}

// Effet de rotation 3D sur les lettres
export function Rotate3DLetters({ 
  children,
  className 
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isRotating, setIsRotating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true)
      setTimeout(() => setIsRotating(false), 1000)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const text = children?.toString() || ''
  const letters = text.split('')

  return (
    <div className={className} style={{ display: 'inline-block' }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ 
            display: 'inline-block',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
          animate={isRotating ? {
            rotateX: [0, 360],
            rotateY: [0, 180, 360],
            rotateZ: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
            color: [
              'inherit',
              '#8b5cf6',
              '#3b82f6',
              '#06ffa5',
              'inherit'
            ]
          } : {}}
          transition={{
            duration: 1,
            delay: index * 0.08,
            ease: "easeInOut"
          }}
          whileHover={{
            rotateX: 360,
            rotateY: 360,
            scale: 1.3,
            color: '#8b5cf6',
            transition: { duration: 0.5 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}

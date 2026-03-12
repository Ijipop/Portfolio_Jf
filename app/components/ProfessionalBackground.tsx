'use client'

import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useThemeColors } from '../hooks/useThemeColors'

interface ProfessionalBackgroundProps {
  className?: string
}

export default function ProfessionalBackground({ className }: ProfessionalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { primary, secondary, accent } = useThemeColors()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width || window.innerWidth
      canvas.height = rect.height || window.innerHeight
      setDimensions({ 
        width: rect.width || window.innerWidth, 
        height: rect.height || window.innerHeight 
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration des orbes flottants
    const orbCount = 3
    const orbs: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
      opacity: number
    }> = []

    // Initialiser les orbes
    const colors = [primary, secondary, accent]
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 200 + Math.random() * 150, // Plus grands
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[i % colors.length],
        opacity: 0.28 + Math.random() * 0.16
      })
    }

    let time = 0

    const animate = () => {
      time += 0.01
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mettre à jour et dessiner les orbes
      orbs.forEach((orb, i) => {
        // Mouvement fluide
        orb.x += orb.vx
        orb.y += orb.vy

        // Wrapping
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        // Pulsation plus prononcée
        const pulse = Math.sin(time * 0.5 + i) * 0.15 + 1
        const currentRadius = orb.radius * pulse

        // Créer un gradient radial pour chaque orbe avec plus d'opacité
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentRadius
        )
        const centerOpacity = Math.min(orb.opacity * 1.2, 0.5) // Centre plus lumineux
        const midOpacity = orb.opacity * 0.7
        const opacityHex = Math.floor(centerOpacity * 255).toString(16).padStart(2, '0')
        const midOpacityHex = Math.floor(midOpacity * 255).toString(16).padStart(2, '0')
        gradient.addColorStop(0, `${orb.color}${opacityHex}`)
        gradient.addColorStop(0.3, `${orb.color}${midOpacityHex}`)
        gradient.addColorStop(0.7, `${orb.color}${Math.floor(orb.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${orb.color}00`)

        // Dessiner l'orbe
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Dessiner un mesh gradient subtil entre les orbes
      const meshPoints = 4
      const meshGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      // Ajouter des stops de couleur basés sur les positions des orbes (plus visibles)
      orbs.forEach((orb, i) => {
        const stop = i / (orbs.length - 1 || 1)
        meshGradient.addColorStop(stop, `${orb.color}15`) // Plus opaque
      })

      // Overlay mesh très subtil
      ctx.fillStyle = meshGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [dimensions, primary, secondary, accent])

  // Détecter mobile et désactiver
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return null
  }

  return (
    <Box
      className={className}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.88
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </Box>
  )
}


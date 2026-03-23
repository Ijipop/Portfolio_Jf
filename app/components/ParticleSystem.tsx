'use client'

import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface ParticleSystemProps {
  particleCount?: number
  speed?: number
  colors?: string[]
  size?: { min: number; max: number }
  opacity?: { min: number; max: number }
  mouseInteraction?: boolean
  className?: string
}

export default function ParticleSystem({
  particleCount = 100,
  speed = 0.2,
  colors = ['#ff6b35', '#ff1744', '#3b82f6', '#059669'],
  size = { min: 1.5, max: 2.5 },
  opacity = { min: 0.15, max: 0.35 },
  mouseInteraction = true,
  className
}: ParticleSystemProps) {
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Détecter si on est sur mobile et désactiver l'animation
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

  // Initialiser les particules
  const initParticles = () => {
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * (size.max - size.min) + size.min,
        opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    particlesRef.current = particles
  }

  // Mettre à jour les particules
  const updateParticles = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((particle) => {
      // Mettre à jour la position
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrapping fluide sur les bords (comme dans l'eau) - plus fluide que les rebonds
      if (particle.x < 0) {
        particle.x = canvas.width
      } else if (particle.x > canvas.width) {
        particle.x = 0
      }
      
      if (particle.y < 0) {
        particle.y = canvas.height
      } else if (particle.y > canvas.height) {
        particle.y = 0
      }

      // Interaction très douce avec la souris (optionnelle et discrète)
      if (mouseInteraction) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100 && distance > 0) {
          // Force très douce pour éviter les perturbations
          const force = (100 - distance) / 100 * 0.01
          const angle = Math.atan2(dy, dx)
          // Répulsion douce
          particle.vx -= Math.cos(angle) * force
          particle.vy -= Math.sin(angle) * force
        }
      }
      
      // Limiter la vitesse pour éviter les mouvements erratiques
      const maxSpeed = speed * 1.2
      const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
      if (currentSpeed > maxSpeed) {
        particle.vx = (particle.vx / currentSpeed) * maxSpeed
        particle.vy = (particle.vy / currentSpeed) * maxSpeed
      }

      // Dessiner la particule (opacité constante, toujours visible)
      ctx.save()
      // Lueur douce autour de la particule
      ctx.shadowBlur = 8
      ctx.shadowColor = particle.color
      ctx.globalAlpha = particle.opacity * 0.5
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2)
      ctx.fill()
      
      // Particule principale
      ctx.shadowBlur = 0
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Dessiner les connexions entre particules (discrètes)
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 80) {
          const alpha = (80 - distance) / 80 * 0.1
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
          ctx.restore()
        }
      })
    })

    animationRef.current = requestAnimationFrame(updateParticles)
  }

  // Gérer le redimensionnement et l'initialisation
  useEffect(() => {
    if (isMobile) return

    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      setDimensions({ width: rect.width, height: rect.height })
    }

    // Initialisation immédiate
    const initCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width || window.innerWidth
      canvas.height = rect.height || window.innerHeight
      
      setDimensions({ 
        width: rect.width || window.innerWidth, 
        height: rect.height || window.innerHeight 
      })
    }

    // Initialisation avec délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(initCanvas, 100)
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  // Initialiser les particules quand les dimensions changent
  useEffect(() => {
    if (isMobile) return

    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles()
    }
  }, [dimensions, particleCount, speed, colors, size, opacity])

  // Démarrer l'animation
  useEffect(() => {
    if (isMobile) return

    if (particlesRef.current.length > 0) {
      updateParticles()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particlesRef.current.length])

  // Observer pour détecter la visibilité du composant
  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && dimensions.width > 0 && dimensions.height > 0) {
          // Re-initialiser les particules si nécessaire
          if (particlesRef.current.length === 0) {
            initParticles()
          }
        }
      })
    })

    observer.observe(canvas)
    
    return () => observer.disconnect()
  }, [dimensions, isMobile])

  // Gérer l'interaction avec la souris
  useEffect(() => {
    if (isMobile || !mouseInteraction) return

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseInteraction])

  // Désactiver le rendu sur mobile pour préserver les performances.
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
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        onLoad={() => {
          // Forcer le redimensionnement au chargement
          setTimeout(() => {
            const canvas = canvasRef.current
            if (canvas) {
              const rect = canvas.getBoundingClientRect()
              canvas.width = rect.width
              canvas.height = rect.height
              setDimensions({ width: rect.width, height: rect.height })
            }
          }, 50)
        }}
      />
    </Box>
  )
}

// Composant de particules avec effets spéciaux
export function SpecialParticleSystem({ className }: { className?: string }) {
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
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 23, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
            '50%': { opacity: 0.6, transform: 'scale(1.1)' }
          }
        }
      }}
    />
  )
}


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
  life: number
  maxLife: number
}

interface ParticleSystemProps {
  particleCount?: number
  speed?: number
  colors?: string[]
  size?: { min: number; max: number }
  opacity?: { min: number; max: number }
  life?: { min: number; max: number }
  mouseInteraction?: boolean
  className?: string
}

export default function ParticleSystem({
  particleCount = 100,
  speed = 0.5,
  colors = ['#ff6b35', '#ff1744', '#3b82f6', '#059669'],
  size = { min: 1, max: 3 },
  opacity = { min: 0.1, max: 0.8 },
  life = { min: 100, max: 300 },
  mouseInteraction = true,
  className
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialiser les particules
  const initParticles = () => {
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        size: Math.random() * (size.max - size.min) + size.min,
        opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * (life.max - life.min) + life.min,
        maxLife: Math.random() * (life.max - life.min) + life.min
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

    particlesRef.current.forEach((particle, index) => {
      // Mettre à jour la position
      particle.x += particle.vx
      particle.y += particle.vy

      // Rebond sur les bords
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // Garder dans les limites
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))

      // Interaction avec la souris
      if (mouseInteraction) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.1
          particle.vy += (dy / distance) * force * 0.1
        }
      }

      // Réduire la vie
      particle.life--
      if (particle.life <= 0) {
        // Recréer la particule
        particle.x = Math.random() * canvas.width
        particle.y = Math.random() * canvas.height
        particle.vx = (Math.random() - 0.5) * speed * 2
        particle.vy = (Math.random() - 0.5) * speed * 2
        particle.life = particle.maxLife
        particle.opacity = Math.random() * (opacity.max - opacity.min) + opacity.min
      }

      // Dessiner la particule
      const alpha = (particle.life / particle.maxLife) * particle.opacity
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      // Effet de lueur
      ctx.shadowBlur = 10
      ctx.shadowColor = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Dessiner les connexions entre particules
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const alpha = (100 - distance) / 100 * 0.2
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
  }, [])

  // Initialiser les particules quand les dimensions changent
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles()
    }
  }, [dimensions, particleCount, speed, colors, size, opacity, life])

  // Démarrer l'animation
  useEffect(() => {
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
  }, [dimensions])

  // Gérer l'interaction avec la souris
  useEffect(() => {
    if (!mouseInteraction) return

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

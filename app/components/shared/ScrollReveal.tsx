'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  /** Remplit la hauteur de la cellule grille (cartes alignées). */
  fillHeight?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  fillHeight = false,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [effectiveDistance, setEffectiveDistance] = useState(distance)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mmReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mmReduced.matches)
    const onReduced = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mmReduced.addEventListener('change', onReduced)

    const updateDistance = () => {
      setEffectiveDistance(window.innerWidth < 768 ? Math.min(distance, 30) : distance)
    }
    updateDistance()
    window.addEventListener('resize', updateDistance)

    return () => {
      mmReduced.removeEventListener('change', onReduced)
      window.removeEventListener('resize', updateDistance)
    }
  }, [distance])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /** Déclencher plus tard : zone d’intersection réduite en bas + part visible plus élevée. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
          setIsVisible(true)
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -22% 0px',
        threshold: [0, 0.1, 0.15, 0.22, 0.3, 0.4],
      }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  const d = reducedMotion ? 0 : effectiveDistance

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: d, opacity: 0 }
      case 'down':
        return { y: -d, opacity: 0 }
      case 'left':
        return { x: d, opacity: 0 }
      case 'right':
        return { x: -d, opacity: 0 }
      default:
        return { y: d, opacity: 0 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{
        minWidth: 0,
        width: '100%',
        ...(fillHeight
          ? { height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }
          : {}),
      }}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: reducedMotion ? 0 : 0.72,
        delay: reducedMotion ? 0 : isVisible ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}



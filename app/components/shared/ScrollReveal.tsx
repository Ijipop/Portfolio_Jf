'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { observeScrollReveal } from '@/utils/scrollRevealObserver'

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
  distance = 40,
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
      setEffectiveDistance(window.innerWidth < 768 ? Math.min(distance, 24) : distance)
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

    return observeScrollReveal(el, (entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
        setIsVisible(true)
      }
    })
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
        contentVisibility: isVisible ? 'visible' : 'auto',
        containIntrinsicSize: fillHeight ? 'auto 320px' : 'auto 200px',
        ...(fillHeight
          ? { height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }
          : {}),
      }}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: reducedMotion ? 0 : 0.58,
        delay: reducedMotion ? 0 : isVisible ? Math.min(delay, 0.16) : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}



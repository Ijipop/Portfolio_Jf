'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './RestaurantDemo.module.css'

const ease = [0.25, 0.46, 0.45, 0.94] as const

type Slide = { x?: number; y?: number }

export default function RestaurantDemoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.32,
    margin: '0px 0px -22% 0px',
  })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const hiddenFor = (slide: Slide) =>
    reducedMotion ? { opacity: 0 } : { ...slide, opacity: 0 }

  const visible = reducedMotion
    ? { opacity: 1 }
    : { x: 0, y: 0, opacity: 1 }

  const blocks: { className: string; hidden: ReturnType<typeof hiddenFor>; delay: number }[] = [
    { className: styles.g1, hidden: hiddenFor({ x: -52 }), delay: 0 },
    { className: styles.g2, hidden: hiddenFor({ y: 44 }), delay: 0.1 },
    { className: styles.g3, hidden: hiddenFor({ x: 52 }), delay: 0.18 },
  ]

  return (
    <div ref={containerRef} className={styles.gallery} aria-label="Galerie">
      {blocks.map((b, i) => (
        <motion.div
          key={i}
          className={b.className}
          role="presentation"
          initial={b.hidden}
          animate={isInView ? visible : b.hidden}
          transition={{
            duration: reducedMotion ? 0.25 : 0.58,
            delay: reducedMotion ? (isInView ? 0.05 * i : 0) : isInView ? b.delay : 0,
            ease,
          }}
        />
      ))}
    </div>
  )
}

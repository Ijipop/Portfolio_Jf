'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type PreviewRevealProps = {
  children: ReactNode
  delay?: number
  y?: number
}

export default function PreviewReveal({ children, delay = 0, y = 36 }: PreviewRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y, clipPath: 'inset(8% 0 0 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', minWidth: 0 }}
    >
      {children}
    </motion.div>
  )
}

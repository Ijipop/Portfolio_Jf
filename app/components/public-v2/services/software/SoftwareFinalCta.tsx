'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { Button, Container } from '@/components/public-v2/primitives'
import { useSoftwareProgress } from './useSoftwareProgress'
import styles from './SoftwarePage.module.css'

type SoftwareFinalCtaProps = {
  title: string
  lead: string
  button: string
  href: string
}

const DURATION = 1.5

export default function SoftwareFinalCta({
  title,
  lead,
  button,
  href,
}: SoftwareFinalCtaProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useSoftwareProgress({
    mode: 'inView',
    duration: DURATION,
    targetRef: rootRef,
  })

  const panelOp = useTransform(progress, [0, 0.25, 0.5], [0, 0.8, 1])
  const panelY = useTransform(progress, [0, 0.45], [16, 0])
  const textOp = useTransform(progress, [0.15, 0.4, 0.65], [0, 0.85, 1])
  const btnOp = useTransform(progress, [0.4, 0.65, 0.9], [0, 0.85, 1])
  const btnY = useTransform(progress, [0.4, 0.8], [10, 0])

  return (
    <Container variant="wide">
      <motion.section
        ref={rootRef}
        className={styles.final}
        aria-labelledby="software-final-title"
        data-testid="pv2-software-final"
        style={{ opacity: panelOp, y: panelY }}
      >
        <motion.h2
          id="software-final-title"
          className={styles.finalTitle}
          style={{ opacity: textOp }}
        >
          {title}
        </motion.h2>
        <motion.p className={styles.finalLead} style={{ opacity: textOp }}>
          {lead}
        </motion.p>
        <motion.span style={{ opacity: btnOp, y: btnY }}>
          <Button href={href} variant="primary">
            {button}
            <span className={styles.finalArrow} aria-hidden>
              ↗
            </span>
          </Button>
        </motion.span>
      </motion.section>
    </Container>
  )
}

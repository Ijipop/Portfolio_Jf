'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { Button, Container } from '@/components/public-v2/primitives'
import BlueprintBars from './BlueprintBars'
import { useBuildProgress, useBuildVarStyle } from './useBuildProgress'
import styles from './WebPage.module.css'
import buildSlot from './buildSlot.module.css'

type WebFinalCtaBuildProps = {
  title: string
  lead: string
  button: string
  href: string
}

export default function WebFinalCtaBuild({ title, lead, button, href }: WebFinalCtaBuildProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useBuildProgress({
    mode: 'inView',
    duration: 2.8,
    targetRef: rootRef,
  })

  const panelB = useTransform(progress, [0, 0.2, 0.45, 0.75, 1], [0, 0.3, 0.5, 0.88, 1])
  const textB = useTransform(progress, [0.1, 0.28, 0.48, 0.72, 0.92, 1], [0, 0.28, 0.5, 0.82, 0.98, 1])
  const btnB = useTransform(progress, [0.4, 0.58, 0.8, 1], [0, 0.4, 0.85, 1])

  const panelStyle = useBuildVarStyle(panelB)
  const textStyle = useBuildVarStyle(textB)
  const btnStyle = useBuildVarStyle(btnB)

  return (
    <Container variant="wide">
      <motion.section
        ref={rootRef}
        className={styles.final}
        aria-labelledby="web-final-title"
        data-slot="panel"
        data-build-root
        data-testid="pv2-web-final"
        style={panelStyle}
      >
        <BlueprintBars kind="ticks" />
        <motion.div className={buildSlot.slot} data-slot="title" style={textStyle}>
          <BlueprintBars kind="title" />
          <h2 id="web-final-title" className={styles.finalTitle} data-copy>
            {title}
          </h2>
        </motion.div>
        <motion.div className={buildSlot.slot} data-slot="text" style={textStyle}>
          <BlueprintBars kind="text" />
          <p className={styles.finalLead} data-copy>
            {lead}
          </p>
        </motion.div>
        <motion.span className={buildSlot.btnWrap} style={btnStyle}>
          <BlueprintBars kind="ticks" />
          <Button href={href} variant="primary" data-slot="btn" data-btn="primary">
            <span data-copy>
              {button}
              <span className={styles.finalArrow} aria-hidden>
                ↗
              </span>
            </span>
          </Button>
        </motion.span>
      </motion.section>
    </Container>
  )
}

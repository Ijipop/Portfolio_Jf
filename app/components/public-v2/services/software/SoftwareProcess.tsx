'use client'

import { useRef } from 'react'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import { useSoftwareProgress } from './useSoftwareProgress'
import styles from './SoftwareProcess.module.css'

export type SoftwareProcessStep = {
  id: string
  num: string
  title: string
  lead: string
}

type SoftwareProcessProps = {
  title: string
  eyebrow: string
  steps: readonly SoftwareProcessStep[]
}

const DURATION = 1.8

export default function SoftwareProcess({ title, eyebrow, steps }: SoftwareProcessProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useSoftwareProgress({
    mode: 'inView',
    duration: DURATION,
    targetRef: rootRef,
  })

  const headOp = useTransform(progress, [0, 0.18, 0.35], [0, 0.85, 1])
  const headY = useTransform(progress, [0, 0.3], [12, 0])
  const lineDraw = useTransform(progress, [0.1, 0.45, 0.85], [0.08, 0.55, 1])
  const lineVar = useMotionTemplate`${lineDraw}`
  const step0 = useTransform(progress, [0.12, 0.35, 0.5], [0, 0.85, 1])
  const step0Y = useTransform(progress, [0.12, 0.45], [16, 0])
  const step1 = useTransform(progress, [0.3, 0.5, 0.65], [0, 0.85, 1])
  const step1Y = useTransform(progress, [0.3, 0.6], [16, 0])
  const step2 = useTransform(progress, [0.48, 0.68, 0.85], [0, 0.85, 1])
  const step2Y = useTransform(progress, [0.48, 0.8], [16, 0])

  const stepStyles = [
    { op: step0, y: step0Y },
    { op: step1, y: step1Y },
    { op: step2, y: step2Y },
  ]

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="software-process-title"
      data-testid="pv2-software-process"
    >
      <motion.p className={styles.eyebrow} style={{ opacity: headOp, y: headY }}>
        {eyebrow}
      </motion.p>
      <motion.h2
        id="software-process-title"
        className={styles.title}
        style={{ opacity: headOp, y: headY }}
      >
        {title}
      </motion.h2>

      <div className={styles.trackWrap}>
        <motion.div
          className={styles.line}
          aria-hidden
          style={{ ['--line-draw' as string]: lineVar }}
        />
        <ol className={styles.track}>
          {steps.map((step, i) => (
            <motion.li
              key={step.id}
              className={styles.step}
              style={{ opacity: stepStyles[i]?.op, y: stepStyles[i]?.y }}
            >
              <span className={styles.num} aria-hidden>
                {step.num}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepLead}>{step.lead}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import BlueprintBars from './BlueprintBars'
import { useBuildProgress, useBuildVarStyle } from './useBuildProgress'
import styles from './WebProcessTrack.module.css'
import buildSlot from './buildSlot.module.css'

export type WebProcessStep = {
  id: string
  num: string
  title: string
  lead: string
}

type WebProcessTrackProps = {
  title: string
  eyebrow: string
  steps: readonly WebProcessStep[]
}

export default function WebProcessTrack({ title, eyebrow, steps }: WebProcessTrackProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useBuildProgress({
    mode: 'inView',
    duration: 3.7,
    targetRef: rootRef,
  })

  const headB = useTransform(progress, [0, 0.12, 0.28, 0.5, 0.75, 1], [0, 0.28, 0.48, 0.72, 0.95, 1])
  const step0 = useTransform(progress, [0.1, 0.26, 0.4, 0.56, 0.76, 1], [0, 0.3, 0.48, 0.72, 0.94, 1])
  const step1 = useTransform(progress, [0.26, 0.4, 0.54, 0.7, 0.86, 1], [0, 0.3, 0.48, 0.72, 0.94, 1])
  const step2 = useTransform(progress, [0.4, 0.54, 0.66, 0.8, 0.94, 1], [0, 0.3, 0.48, 0.72, 0.95, 1])
  const lineB = useTransform(progress, [0.08, 0.25, 0.45, 0.7, 0.9, 1], [0.05, 0.35, 0.6, 0.88, 1, 1])

  const headStyle = useBuildVarStyle(headB)
  const stepStyles = [useBuildVarStyle(step0), useBuildVarStyle(step1), useBuildVarStyle(step2)]
  const lineStyle = useBuildVarStyle(lineB)

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="web-process-title"
      data-testid="pv2-web-process"
      data-build-root
    >
      <motion.div className={buildSlot.slot} data-slot="text" style={headStyle}>
        <BlueprintBars kind="text" />
        <p className={styles.eyebrow} data-copy>
          {eyebrow}
        </p>
      </motion.div>
      <motion.div className={buildSlot.slot} data-slot="title" style={headStyle}>
        <BlueprintBars kind="title" />
        <h2 id="web-process-title" className={styles.title} data-copy>
          {title}
        </h2>
      </motion.div>

      <div className={styles.trackWrap}>
        <motion.div className={styles.line} data-slot="line" aria-hidden style={lineStyle} />
        <ol className={styles.track}>
          {steps.map((step, i) => (
            <motion.li
              key={step.id}
              className={styles.step}
              data-slot="card"
              style={{
                ...stepStyles[i],
                ['--card-bg' as string]:
                  'color-mix(in srgb, var(--color-surface) 88%, var(--color-bg))',
              }}
            >
              <BlueprintBars kind="card" />
              <span className={styles.num} aria-hidden data-copy>
                {step.num}
              </span>
              <h3 className={styles.stepTitle} data-copy>
                {step.title}
              </h3>
              <p className={styles.stepLead} data-copy>
                {step.lead}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

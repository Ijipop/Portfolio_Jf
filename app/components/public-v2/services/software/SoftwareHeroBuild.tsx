'use client'

import { motion, useTransform } from 'framer-motion'
import { Button } from '@/components/public-v2/primitives'
import SoftwareHeroApp from './SoftwareHeroApp'
import { useSoftwareProgress } from './useSoftwareProgress'
import styles from './SoftwareHeroBuild.module.css'

export type SoftwareHeroBuildProps = {
  eyebrow: string
  title: string
  lead: string
  ctaProjects: string
  ctaContact: string
  projectsHref: string
  contactHref: string
  ariaLabel: string
  statusLabel: string
}

/** ~8.5s — besoin → construction → travail (doc→import→traitement→orga→résultat) → fini */
const DURATION = 8.5

/**
 * Hero logiciels : copy + app qui se construit et travaille.
 * Une seule MotionValue partagée.
 */
export default function SoftwareHeroBuild({
  eyebrow,
  title,
  lead,
  ctaProjects,
  ctaContact,
  projectsHref,
  contactHref,
  ariaLabel,
  statusLabel,
}: SoftwareHeroBuildProps) {
  const progress = useSoftwareProgress({
    mode: 'mount',
    duration: DURATION,
    debugParam: 'heroProgress',
  })

  const eyebrowOp = useTransform(progress, [0.02, 0.1, 0.18], [0, 0.85, 1])
  const eyebrowY = useTransform(progress, [0.02, 0.16], [10, 0])
  const titleOp = useTransform(progress, [0.06, 0.16, 0.26], [0, 0.8, 1])
  const titleY = useTransform(progress, [0.06, 0.22], [14, 0])
  const leadOp = useTransform(progress, [0.14, 0.26, 0.36], [0, 0.75, 1])
  const leadY = useTransform(progress, [0.14, 0.32], [12, 0])
  const btn1Op = useTransform(progress, [0.28, 0.4, 0.5], [0, 0.8, 1])
  const btn1Y = useTransform(progress, [0.28, 0.46], [10, 0])
  const btn2Op = useTransform(progress, [0.34, 0.46, 0.56], [0, 0.8, 1])
  const btn2Y = useTransform(progress, [0.34, 0.52], [10, 0])

  return (
    <header
      className={styles.hero}
      aria-labelledby="software-hero-title"
      aria-describedby="software-hero-build-desc"
      data-testid="pv2-software-hero"
    >
      <span id="software-hero-build-desc" className={styles.srOnly}>
        {ariaLabel}
      </span>

      <div className={styles.heroGrid}>
        <div className={styles.content}>
          <motion.p
            className={styles.eyebrow}
            style={{ opacity: eyebrowOp, y: eyebrowY }}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            id="software-hero-title"
            className={styles.title}
            style={{ opacity: titleOp, y: titleY }}
          >
            {title}
          </motion.h1>
          <motion.p className={styles.lead} style={{ opacity: leadOp, y: leadY }}>
            {lead}
          </motion.p>
          <div className={styles.actions}>
            <motion.span style={{ opacity: btn1Op, y: btn1Y }}>
              <Button href={projectsHref} variant="primary">
                {ctaProjects}
                <span className={styles.ctaArrow} aria-hidden>
                  ↗
                </span>
              </Button>
            </motion.span>
            <motion.span style={{ opacity: btn2Op, y: btn2Y }}>
              <Button href={contactHref} variant="ghost">
                {ctaContact}
              </Button>
            </motion.span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <SoftwareHeroApp progress={progress} statusLabel={statusLabel} />
        </div>
      </div>
    </header>
  )
}

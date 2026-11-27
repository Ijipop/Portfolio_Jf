'use client'

import { motion, useTransform } from 'framer-motion'
import { Button } from '@/components/public-v2/primitives'
import BlueprintBars from './BlueprintBars'
import WebHeroBrowserBuild from './WebHeroBrowserBuild'
import { useBuildProgress, useBuildVarStyle } from './useBuildProgress'
import styles from './WebHeroBuild.module.css'

export type WebHeroBuildProps = {
  eyebrow: string
  title: string
  lead: string
  ctaProjects: string
  ctaContact: string
  projectsHref: string
  contactHref: string
  /** Description unique de la construction (header) — le navigateur est décoratif. */
  ariaLabel: string
  browserLabels: {
    tracing: string
    structuring: string
    revealing: string
  }
  browserLive: string
}

/** ~7.2s — TRACE → CONSTRUIRE → RÉVÉLER → TERMINER (navigateur + copy) */
const DURATION = 7.2

/**
 * Hero blueprint → site terminé.
 * Une progress partagée : copy réelle + navigateur démo.
 */
export default function WebHeroBuild({
  eyebrow,
  title,
  lead,
  ctaProjects,
  ctaContact,
  projectsHref,
  contactHref,
  ariaLabel,
  browserLabels,
  browserLive,
}: WebHeroBuildProps) {
  const progress = useBuildProgress({
    mode: 'mount',
    duration: DURATION,
    debugParam: 'heroProgress',
  })

  const guidesB = useTransform(
    progress,
    [0, 0.06, 0.14, 0.28, 0.55, 0.75, 1],
    [0, 0.22, 0.4, 0.55, 0.72, 0.95, 1],
  )
  const eyebrowB = useTransform(
    progress,
    [0.04, 0.12, 0.22, 0.38, 0.55, 0.78, 1],
    [0, 0.18, 0.35, 0.48, 0.7, 0.96, 1],
  )
  const titleB = useTransform(
    progress,
    [0.08, 0.16, 0.26, 0.4, 0.52, 0.68, 0.88, 1],
    [0, 0.16, 0.34, 0.46, 0.55, 0.78, 0.97, 1],
  )
  const leadB = useTransform(
    progress,
    [0.16, 0.26, 0.36, 0.48, 0.62, 0.82, 1],
    [0, 0.18, 0.36, 0.48, 0.72, 0.94, 1],
  )
  const btnPrimaryB = useTransform(
    progress,
    [0.28, 0.38, 0.48, 0.6, 0.78, 0.92, 1],
    [0, 0.22, 0.4, 0.52, 0.8, 0.97, 1],
  )
  const btnGhostB = useTransform(
    progress,
    [0.34, 0.44, 0.54, 0.68, 0.85, 1],
    [0, 0.22, 0.42, 0.58, 0.9, 1],
  )

  const guidesStyle = useBuildVarStyle(guidesB)
  const eyebrowStyle = useBuildVarStyle(eyebrowB)
  const titleStyle = useBuildVarStyle(titleB)
  const leadStyle = useBuildVarStyle(leadB)
  const btnPrimaryStyle = useBuildVarStyle(btnPrimaryB)
  const btnGhostStyle = useBuildVarStyle(btnGhostB)

  return (
    <header
      className={styles.hero}
      aria-labelledby="web-hero-title"
      aria-describedby="web-hero-build-desc"
      data-testid="pv2-web-hero"
      data-build-root
    >
      <span id="web-hero-build-desc" className={styles.srOnly}>
        {ariaLabel}
      </span>

      <div className={styles.heroGrid}>
        <motion.div className={styles.content} style={guidesStyle}>
          <div className={styles.guides} data-guides data-blueprint aria-hidden>
            <span className={styles.guideV} />
            <span className={`${styles.guideV} ${styles.guideV2}`} />
            <span className={styles.guideH} />
          </div>

          <motion.div
            className={`${styles.slot} ${styles.eyebrow}`}
            data-slot="text"
            style={eyebrowStyle}
          >
            <BlueprintBars kind="text" />
            <BlueprintBars kind="ticks" mark="META" />
            <span data-copy>{eyebrow}</span>
          </motion.div>

          <motion.div
            className={`${styles.slot} ${styles.titleSlot}`}
            data-slot="title"
            style={titleStyle}
          >
            <BlueprintBars kind="title" mark="TYPE" />
            <BlueprintBars kind="ticks" />
            <h1 id="web-hero-title" className={styles.title} data-copy>
              {title}
            </h1>
          </motion.div>

          <motion.div
            className={`${styles.slot} ${styles.leadSlot}`}
            data-slot="text"
            style={leadStyle}
          >
            <BlueprintBars kind="text" />
            <p className={styles.lead} data-copy>
              {lead}
            </p>
          </motion.div>

          <div className={styles.actions}>
            <motion.span className={styles.btnWrap} style={btnPrimaryStyle}>
              <BlueprintBars kind="ticks" />
              <Button
                href={projectsHref}
                variant="primary"
                className={styles.buildBtn}
                data-slot="btn"
                data-btn="primary"
              >
                <span data-copy>
                  {ctaProjects}
                  <span className={styles.ctaArrow} aria-hidden>
                    ↗
                  </span>
                </span>
              </Button>
            </motion.span>

            <motion.span className={styles.btnWrap} style={btnGhostStyle}>
              <BlueprintBars kind="ticks" />
              <Button
                href={contactHref}
                variant="ghost"
                className={styles.buildBtn}
                data-slot="btn"
                data-btn="ghost"
              >
                <span data-copy>{ctaContact}</span>
              </Button>
            </motion.span>
          </div>
        </motion.div>

        <div className={styles.heroVisual}>
          <WebHeroBrowserBuild
            progress={progress}
            statusLabel={browserLive}
            labels={browserLabels}
          />
        </div>
      </div>
    </header>
  )
}

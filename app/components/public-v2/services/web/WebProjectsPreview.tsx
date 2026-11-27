'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useTransform } from 'framer-motion'
import { Button } from '@/components/public-v2/primitives'
import ProjectCard from '@/components/public-v2/projects/ProjectCard'
import {
  sortCatalogProjects,
  type CatalogProject,
} from '@/lib/public-v2/projectsContent'
import BlueprintBars from './BlueprintBars'
import { useBuildProgress, useBuildVarStyle } from './useBuildProgress'
import styles from './WebProjectsPreview.module.css'
import buildSlot from './buildSlot.module.css'

type WebProjectsPreviewProps = {
  eyebrow: string
  title: string
  lead: string
  cta: string
  href: string
  empty: string
  error: string
  limit?: number
}

export default function WebProjectsPreview({
  eyebrow,
  title,
  lead,
  cta,
  href,
  empty,
  error,
  limit = 3,
}: WebProjectsPreviewProps) {
  const router = useRouter()
  const rootRef = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState<CatalogProject[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const progress = useBuildProgress({
    mode: 'inView',
    duration: 3.6,
    targetRef: rootRef,
  })

  const headB = useTransform(progress, [0, 0.12, 0.28, 0.5, 0.75, 1], [0, 0.28, 0.48, 0.72, 0.95, 1])
  const card0 = useTransform(progress, [0.14, 0.3, 0.44, 0.6, 0.8, 1], [0, 0.3, 0.48, 0.72, 0.94, 1])
  const card1 = useTransform(progress, [0.3, 0.44, 0.56, 0.72, 0.88, 1], [0, 0.3, 0.48, 0.72, 0.94, 1])
  const card2 = useTransform(progress, [0.44, 0.56, 0.68, 0.82, 0.95, 1], [0, 0.3, 0.48, 0.72, 0.95, 1])
  const ctaB = useTransform(progress, [0.58, 0.72, 0.9, 1], [0, 0.4, 0.85, 1])

  const headStyle = useBuildVarStyle(headB)
  const cardStyles = [useBuildVarStyle(card0), useBuildVarStyle(card1), useBuildVarStyle(card2)]
  const ctaStyle = useBuildVarStyle(ctaB)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' })
        const data = await response.json()
        if (cancelled) return
        if (!data?.success || !Array.isArray(data.data)) {
          setLoadError(error)
          return
        }
        setProjects(data.data as CatalogProject[])
      } catch {
        if (!cancelled) setLoadError(error)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [error])

  const webProjects = useMemo(() => {
    const web = projects.filter((p) => (p.projectType ?? 'web') === 'web')
    const professional = web.filter((p) => p.webAudience !== 'personal')
    return sortCatalogProjects(professional).slice(0, limit)
  }, [projects, limit])

  const handleNavigate = useCallback(
    (url: string) => {
      if (url.startsWith('/')) {
        void router.push(url)
        return
      }
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [router],
  )

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="web-projects-title"
      data-testid="pv2-web-projects"
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
        <h2 id="web-projects-title" className={styles.title} data-copy>
          {title}
        </h2>
      </motion.div>
      <motion.div className={buildSlot.slot} data-slot="text" style={headStyle}>
        <BlueprintBars kind="text" />
        <p className={styles.lead} data-copy>
          {lead}
        </p>
      </motion.div>

      {loading ? (
        <div className={styles.slots} aria-busy="true">
          {Array.from({ length: limit }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.slot}
              data-slot="card"
              style={cardStyles[i]}
            >
              <BlueprintBars kind="card" />
            </motion.div>
          ))}
        </div>
      ) : null}

      {loadError ? (
        <p className={styles.msg} role="alert">
          {loadError}
        </p>
      ) : null}

      {!loading && !loadError && webProjects.length === 0 ? (
        <p className={styles.msg}>{empty}</p>
      ) : null}

      {!loading && webProjects.length > 0 ? (
        <ul className={styles.grid}>
          {webProjects.map((project, i) => (
            <motion.li
              key={project.id}
              data-slot="card"
              style={{
                ...cardStyles[i],
                ['--card-bg' as string]: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <BlueprintBars kind="card" />
              <div className={styles.cardReveal} data-card-reveal>
                <ProjectCard project={project} variant="web" onNavigate={handleNavigate} />
              </div>
            </motion.li>
          ))}
        </ul>
      ) : null}

      <motion.div className={`${styles.cta} ${buildSlot.btnWrap}`} style={ctaStyle}>
        <BlueprintBars kind="ticks" />
        <Button href={href} variant="primary" data-slot="btn" data-btn="primary">
          <span data-copy>
            {cta}
            <span className={styles.arrow} aria-hidden>
              ↗
            </span>
          </span>
        </Button>
      </motion.div>
    </section>
  )
}

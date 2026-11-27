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
import { useSoftwareProgress } from './useSoftwareProgress'
import styles from './SoftwareProjects.module.css'

type SoftwareProjectsProps = {
  eyebrow: string
  title: string
  lead: string
  cta: string
  href: string
  empty: string
  error: string
  limit?: number
}

const DURATION = 1.8

export default function SoftwareProjects({
  eyebrow,
  title,
  lead,
  cta,
  href,
  empty,
  error,
  limit = 3,
}: SoftwareProjectsProps) {
  const router = useRouter()
  const rootRef = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState<CatalogProject[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const progress = useSoftwareProgress({
    mode: 'inView',
    duration: DURATION,
    targetRef: rootRef,
  })

  const headOp = useTransform(progress, [0, 0.18, 0.35], [0, 0.85, 1])
  const headY = useTransform(progress, [0, 0.3], [12, 0])
  const card0 = useTransform(progress, [0.15, 0.38, 0.52], [0, 0.85, 1])
  const card0Y = useTransform(progress, [0.15, 0.48], [16, 0])
  const card1 = useTransform(progress, [0.3, 0.5, 0.65], [0, 0.85, 1])
  const card1Y = useTransform(progress, [0.3, 0.6], [16, 0])
  const card2 = useTransform(progress, [0.45, 0.65, 0.8], [0, 0.85, 1])
  const card2Y = useTransform(progress, [0.45, 0.75], [16, 0])
  const ctaOp = useTransform(progress, [0.6, 0.78, 0.95], [0, 0.85, 1])
  const ctaY = useTransform(progress, [0.6, 0.88], [10, 0])

  const cards = [
    { op: card0, y: card0Y },
    { op: card1, y: card1Y },
    { op: card2, y: card2Y },
  ]

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

  const softProjects = useMemo(() => {
    const soft = projects.filter((p) => p.projectType === 'logiciel')
    return sortCatalogProjects(soft).slice(0, limit)
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
      aria-labelledby="software-projects-title"
      data-testid="pv2-software-projects"
    >
      <motion.p className={styles.eyebrow} style={{ opacity: headOp, y: headY }}>
        {eyebrow}
      </motion.p>
      <motion.h2
        id="software-projects-title"
        className={styles.title}
        style={{ opacity: headOp, y: headY }}
      >
        {title}
      </motion.h2>
      <motion.p className={styles.lead} style={{ opacity: headOp, y: headY }}>
        {lead}
      </motion.p>

      {loading ? (
        <div className={styles.slots} aria-busy="true">
          {Array.from({ length: limit }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.slot}
              style={{ opacity: cards[i]?.op, y: cards[i]?.y }}
            />
          ))}
        </div>
      ) : null}

      {loadError ? (
        <p className={styles.msg} role="alert">
          {loadError}
        </p>
      ) : null}

      {!loading && !loadError && softProjects.length === 0 ? (
        <p className={styles.msg}>{empty}</p>
      ) : null}

      {!loading && softProjects.length > 0 ? (
        <ul className={styles.grid}>
          {softProjects.map((project, i) => (
            <motion.li
              key={project.id}
              className={styles.card}
              style={{ opacity: cards[i]?.op, y: cards[i]?.y }}
            >
              <ProjectCard
                project={project}
                variant="logiciel"
                onNavigate={handleNavigate}
              />
            </motion.li>
          ))}
        </ul>
      ) : null}

      <motion.div className={styles.cta} style={{ opacity: ctaOp, y: ctaY }}>
        <Button href={href} variant="primary">
          {cta}
          <span className={styles.arrow} aria-hidden>
            ↗
          </span>
        </Button>
      </motion.div>
    </section>
  )
}

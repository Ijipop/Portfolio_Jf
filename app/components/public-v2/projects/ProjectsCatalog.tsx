'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, Container, Heading } from '@/components/public-v2/primitives'
import { navigateProjectUrl, resolveProductLandingHref } from '@/lib/navigateProjectUrl'
import {
  PROJECTS_COPY,
  sortCatalogProjects,
  type CatalogProject,
  type ProjectTypeFilter,
  type TimelendrLatestLinks,
  type WebAudienceTab,
} from '@/lib/public-v2/projectsContent'
import ProjectCard from './ProjectCard'
import styles from './ProjectsCatalog.module.css'

export type ProjectsCatalogProps = {
  /** Si fourni, saute le fetch API (tests / preview sandbox uniquement). */
  initialProjects?: CatalogProject[]
  initialTimelendr?: TimelendrLatestLinks
  /** Force l’état erreur (tests). */
  forceError?: string | null
  /** Skip auto-fetch even without initialProjects (tests loading). */
  skipFetch?: boolean
}

function typeFromParam(value: string | null): ProjectTypeFilter | null {
  if (value === 'logiciel' || value === 'web') return value
  return null
}

export default function ProjectsCatalog({
  initialProjects,
  initialTimelendr,
  forceError = null,
  skipFetch = false,
}: ProjectsCatalogProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState<CatalogProject[]>(initialProjects ?? [])
  const [loading, setLoading] = useState(!initialProjects && !forceError && !skipFetch)
  const [error, setError] = useState<string | null>(forceError)
  const [selectedType, setSelectedType] = useState<ProjectTypeFilter>('web')
  const [audience, setAudience] = useState<WebAudienceTab>('professional')
  const [timelendr, setTimelendr] = useState<TimelendrLatestLinks>(
    initialTimelendr ?? { windowsUrl: null, macosUrl: null },
  )

  /** Sync filtres ↔ URL (App Router + Précédent/Suivant). */
  useEffect(() => {
    const fromUrl = typeFromParam(searchParams.get('type'))
    if (fromUrl) setSelectedType(fromUrl)
  }, [searchParams])

  useEffect(() => {
    const onPop = () => {
      const fromUrl = typeFromParam(new URLSearchParams(window.location.search).get('type'))
      if (fromUrl) setSelectedType(fromUrl)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (initialProjects || forceError || skipFetch) return

    let cancelled = false
    ;(async () => {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' })
        const data = await response.json()
        if (cancelled) return
        if (data.success) {
          setProjects(data.data as CatalogProject[])
        } else {
          setError(PROJECTS_COPY.errorLoad)
        }
      } catch {
        if (!cancelled) setError(PROJECTS_COPY.errorNetwork)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    ;(async () => {
      try {
        const response = await fetch('/api/timelendr/releases?mode=latest')
        const data = await response.json()
        if (cancelled || !data?.success || !data.data) return
        setTimelendr(data.data as TimelendrLatestLinks)
      } catch {
        /* silencieux — bande Timelendr optionnelle */
      }
    })()

    return () => {
      cancelled = true
    }
  }, [initialProjects, forceError, skipFetch])

  const handleTypeChange = (next: ProjectTypeFilter) => {
    if (next === selectedType) return
    setSelectedType(next)
    // push (pas replace) pour que Précédent/Suivant restaure ?type=
    router.push(`${pathname}?type=${next}`, { scroll: false })
  }

  const handleNavigate = useCallback(
    (url: string) => {
      const landing = resolveProductLandingHref(url)
      if (landing) {
        void router.push(landing)
        return
      }
      navigateProjectUrl(url, router)
    },
    [router],
  )

  const ordered = useMemo(() => {
    const byType = projects.filter((p) => (p.projectType ?? 'web') === selectedType)
    return sortCatalogProjects(byType)
  }, [projects, selectedType])

  const visible = useMemo(() => {
    if (selectedType !== 'web') return ordered
    if (audience === 'personal') return ordered.filter((p) => p.webAudience === 'personal')
    return ordered.filter((p) => p.webAudience !== 'personal')
  }, [ordered, selectedType, audience])

  if (loading) {
    return (
      <section className={styles.section} data-testid="pv2-projects-catalog" aria-busy="true">
        <Container>
          <p className={styles.stateBox}>{PROJECTS_COPY.loading}</p>
        </Container>
      </section>
    )
  }

  const resultsLabel =
    !error && visible.length > 0
      ? visible.length === 1
        ? PROJECTS_COPY.resultsCountOne
        : PROJECTS_COPY.resultsCountMany.replace('{count}', String(visible.length))
      : null

  return (
    <section className={styles.section} data-testid="pv2-projects-catalog" aria-labelledby="pv2-projects-title">
      <Container>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{PROJECTS_COPY.eyebrow}</p>
          <Heading as="h1" id="pv2-projects-title" variant="section" className={styles.title}>
            {PROJECTS_COPY.title}
          </Heading>
          <p className={styles.lead}>{PROJECTS_COPY.lead}</p>
        </header>

        {error ? (
          <p className={`${styles.stateBox} ${styles.stateBoxError}`} role="alert">
            {error}
          </p>
        ) : null}

        <div className={styles.filterBar}>
          <div className={styles.filterBarRow}>
            <div className={styles.segmentGroup} role="group" aria-label={PROJECTS_COPY.title}>
              <button
                type="button"
                className={styles.segmentBtn}
                aria-pressed={selectedType === 'web'}
                onClick={() => handleTypeChange('web')}
              >
                {PROJECTS_COPY.typeWeb}
              </button>
              <button
                type="button"
                className={styles.segmentBtn}
                aria-pressed={selectedType === 'logiciel'}
                onClick={() => handleTypeChange('logiciel')}
              >
                {PROJECTS_COPY.typeSoftware}
              </button>
            </div>

            {selectedType === 'web' ? (
              <div
                className={styles.segmentGroup}
                role="group"
                aria-label={PROJECTS_COPY.audienceProfessional}
              >
                <button
                  type="button"
                  className={styles.segmentBtn}
                  aria-pressed={audience === 'professional'}
                  onClick={() => setAudience('professional')}
                >
                  {PROJECTS_COPY.audienceProfessional}
                </button>
                <button
                  type="button"
                  className={styles.segmentBtn}
                  aria-pressed={audience === 'personal'}
                  onClick={() => setAudience('personal')}
                >
                  {PROJECTS_COPY.audiencePersonal}
                </button>
              </div>
            ) : null}
          </div>

          {selectedType === 'web' || resultsLabel ? (
            <div className={styles.filterMeta}>
              {selectedType === 'web' ? (
                <p className={styles.audienceLead}>
                  {audience === 'personal'
                    ? PROJECTS_COPY.audiencePersonalLead
                    : PROJECTS_COPY.audienceProfessionalLead}
                </p>
              ) : null}
              {resultsLabel ? <p className={styles.resultsCount}>{resultsLabel}</p> : null}
            </div>
          ) : null}
        </div>

        {!error && visible.length === 0 ? (
          <div className={styles.stateBox}>
            <p>
              {selectedType === 'logiciel'
                ? PROJECTS_COPY.emptySoftware
                : selectedType === 'web'
                  ? PROJECTS_COPY.audienceEmpty
                  : PROJECTS_COPY.emptyWeb}
            </p>
            <p>{PROJECTS_COPY.comingSoon}</p>
          </div>
        ) : null}

        {visible.length > 0 ? (
          <ul className={styles.grid}>
            {visible.map((project) => (
              <li key={project.id} className={styles.gridItem}>
                <ProjectCard
                  project={project}
                  variant={selectedType}
                  onNavigate={handleNavigate}
                  timelendrWindowsUrl={timelendr.windowsUrl}
                  timelendrMacosUrl={timelendr.macosUrl}
                />
              </li>
            ))}
          </ul>
        ) : null}

        {selectedType === 'web' ? (
          <div className={styles.footCta}>
            <h2 className={styles.footCtaTitle}>{PROJECTS_COPY.demosCtaTitle}</h2>
            <p className={styles.footCtaBody}>{PROJECTS_COPY.demosCtaBody}</p>
            <Button href={PROJECTS_COPY.demosHref} variant="ghost" size="sm">
              {PROJECTS_COPY.demosCtaLabel}
            </Button>
          </div>
        ) : (
          <div className={styles.footCta}>
            <h2 className={styles.footCtaTitle}>{PROJECTS_COPY.softwareCtaTitle}</h2>
            <p className={styles.footCtaBody}>{PROJECTS_COPY.softwareCtaBody}</p>
            <Button href={PROJECTS_COPY.softwareCtaHref} variant="primary" size="sm">
              {PROJECTS_COPY.softwareCtaLabel}
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}

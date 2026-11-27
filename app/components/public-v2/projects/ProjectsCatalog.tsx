'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, Container, Heading } from '@/components/public-v2/primitives'
import { navigateProjectUrl, resolveProductLandingHref } from '@/lib/navigateProjectUrl'
import {
  getProjectsCopy,
  sortCatalogProjects,
  type CatalogProject,
  type ProjectTypeFilter,
  type TimelendrLatestLinks,
  type WebAudienceTab,
} from '@/lib/public-v2/projectsContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import IjipopWorkLoader from '@/components/public-v2/chrome/IjipopWorkLoader'
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
  const locale = usePublicV2Locale()
  const copy = getProjectsCopy(locale)
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
          setError(copy.errorLoad)
        }
      } catch {
        if (!cancelled) setError(copy.errorNetwork)
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
  }, [initialProjects, forceError, skipFetch, copy.errorLoad, copy.errorNetwork])

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
          <IjipopWorkLoader label={copy.loading} testId="pv2-busy-projects" />
        </Container>
      </section>
    )
  }

  const resultsLabel =
    !error && visible.length > 0
      ? visible.length === 1
        ? copy.resultsCountOne
        : copy.resultsCountMany.replace('{count}', String(visible.length))
      : null

  return (
    <section className={styles.section} data-testid="pv2-projects-catalog" aria-labelledby="pv2-projects-title">
      <Container>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <Heading as="h1" id="pv2-projects-title" variant="section" className={styles.title}>
            {copy.title}
          </Heading>
          <p className={styles.lead}>{copy.lead}</p>
        </header>

        {error ? (
          <p className={`${styles.stateBox} ${styles.stateBoxError}`} role="alert">
            {error}
          </p>
        ) : null}

        <div className={styles.filterBar}>
          <div className={styles.filterBarRow}>
            <div className={styles.segmentGroup} role="group" aria-label={copy.title}>
              <button
                type="button"
                className={styles.segmentBtn}
                aria-pressed={selectedType === 'web'}
                onClick={() => handleTypeChange('web')}
              >
                {copy.typeWeb}
              </button>
              <button
                type="button"
                className={styles.segmentBtn}
                aria-pressed={selectedType === 'logiciel'}
                onClick={() => handleTypeChange('logiciel')}
              >
                {copy.typeSoftware}
              </button>
            </div>

            {selectedType === 'web' ? (
              <div
                className={styles.segmentGroup}
                role="group"
                aria-label={copy.audienceProfessional}
              >
                <button
                  type="button"
                  className={styles.segmentBtn}
                  aria-pressed={audience === 'professional'}
                  onClick={() => setAudience('professional')}
                >
                  {copy.audienceProfessional}
                </button>
                <button
                  type="button"
                  className={styles.segmentBtn}
                  aria-pressed={audience === 'personal'}
                  onClick={() => setAudience('personal')}
                >
                  {copy.audiencePersonal}
                </button>
              </div>
            ) : null}
          </div>

          {selectedType === 'web' || resultsLabel ? (
            <div className={styles.filterMeta}>
              {selectedType === 'web' ? (
                <p className={styles.audienceLead}>
                  {audience === 'personal'
                    ? copy.audiencePersonalLead
                    : copy.audienceProfessionalLead}
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
                ? copy.emptySoftware
                : selectedType === 'web'
                  ? copy.audienceEmpty
                  : copy.emptyWeb}
            </p>
            <p>{copy.comingSoon}</p>
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
            <h2 className={styles.footCtaTitle}>{copy.demosCtaTitle}</h2>
            <p className={styles.footCtaBody}>{copy.demosCtaBody}</p>
            <Button href={copy.demosHref} variant="ghost" size="sm">
              {copy.demosCtaLabel}
            </Button>
          </div>
        ) : (
          <div className={styles.footCta}>
            <h2 className={styles.footCtaTitle}>{copy.softwareCtaTitle}</h2>
            <p className={styles.footCtaBody}>{copy.softwareCtaBody}</p>
            <Button href={copy.softwareCtaHref} variant="primary" size="sm">
              {copy.softwareCtaLabel}
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/public-v2/primitives'
import { SPACE_TAKER_LANDING_HREF } from '@/components/product-landings/productDownloads'
import { getImageUrl } from '@/lib/getImageUrl'
import {
  PROJECTS_COPY,
  PROJECT_DESCRIPTION_EXPAND_CHARS,
  isPlannedStatus,
  normalizeStatusLabel,
  sameDestination,
  type CatalogProject,
} from '@/lib/public-v2/projectsContent'
import styles from './ProjectCard.module.css'

export type ProjectCardProps = {
  project: CatalogProject
  variant: 'web' | 'logiciel'
  onNavigate: (url: string) => void
  timelendrWindowsUrl?: string | null
  timelendrMacosUrl?: string | null
}

function matchesNameOrUrl(project: CatalogProject, needles: string[]): boolean {
  const hay = `${project.name} ${project.url ?? ''} ${project.siteUrl ?? ''}`.toLowerCase()
  return needles.some((n) => hay.includes(n))
}

function isTimelendr(project: CatalogProject) {
  return matchesNameOrUrl(project, ['timelendr', 'timelendar', '/logiciel/timelendr'])
}

function isSpaceTaker(project: CatalogProject) {
  return matchesNameOrUrl(project, ['space taker', 'spacetaker', 'space-taker', '/spacetaker'])
}

function isBrowserApp(project: CatalogProject) {
  return matchesNameOrUrl(project, ['traducteur', 'overstamp', 'fanmark'])
}

export default function ProjectCard({
  project,
  variant,
  onNavigate,
  timelendrWindowsUrl,
  timelendrMacosUrl,
}: ProjectCardProps) {
  const isWeb = variant === 'web'
  const timelendr = isTimelendr(project)
  const spaceTaker = isSpaceTaker(project)
  const browserApp = isBrowserApp(project)
  const planned = isPlannedStatus(project.status)
  const [expanded, setExpanded] = useState(false)

  const techs = project.technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, isWeb ? 2 : 3)

  const imageSrc = project.imageUrl ? getImageUrl(project.imageUrl) : ''
  const statusLabel = normalizeStatusLabel(project.status)
  const description = project.description?.trim() ?? ''
  const canExpand = description.length > PROJECT_DESCRIPTION_EXPAND_CHARS

  const webHref = (project.siteUrl || project.url || '').trim() || null
  const primaryHref = (() => {
    if (isWeb) return webHref
    if (spaceTaker) return SPACE_TAKER_LANDING_HREF
    if (browserApp) return (project.siteUrl || project.url || '').trim() || null
    if (project.url?.trim()) return project.url.trim()
    if (project.siteUrl?.trim()) return project.siteUrl.trim()
    if (!timelendr && project.downloadUrl?.trim()) return project.downloadUrl.trim()
    if (timelendr && timelendrWindowsUrl) return timelendrWindowsUrl
    if (timelendr && timelendrMacosUrl) return timelendrMacosUrl
    return null
  })()

  /** « Télécharger » seulement si le CTA primaire n’est pas une vitrine (url/siteUrl). */
  const primaryIsDownload =
    !isWeb &&
    !browserApp &&
    !spaceTaker &&
    Boolean(primaryHref) &&
    !project.url?.trim() &&
    !project.siteUrl?.trim() &&
    (sameDestination(primaryHref, project.downloadUrl) ||
      sameDestination(primaryHref, timelendrWindowsUrl) ||
      sameDestination(primaryHref, timelendrMacosUrl) ||
      sameDestination(primaryHref, project.windowsUrl) ||
      sameDestination(primaryHref, project.macosUrl))

  const primaryLabel = isWeb
    ? PROJECTS_COPY.viewSite
    : browserApp
      ? PROJECTS_COPY.openApp
      : primaryIsDownload
        ? PROJECTS_COPY.downloadProject
        : PROJECTS_COPY.viewProject

  const rawWindowsHref = timelendr
    ? timelendrWindowsUrl
    : spaceTaker
      ? SPACE_TAKER_LANDING_HREF
      : project.windowsUrl?.trim() || null
  const rawMacosHref = timelendr
    ? timelendrMacosUrl
    : spaceTaker
      ? SPACE_TAKER_LANDING_HREF
      : project.macosUrl?.trim() || null

  /** Pas de faux téléchargement si planifié sans binaire disponible. */
  const allowPlatformDownloads =
    !isWeb && (!planned || Boolean(rawWindowsHref || rawMacosHref || project.downloadUrl?.trim()))

  const windowsHref =
    allowPlatformDownloads && rawWindowsHref && !sameDestination(rawWindowsHref, primaryHref)
      ? rawWindowsHref
      : null
  const macosHref =
    allowPlatformDownloads &&
    rawMacosHref &&
    !sameDestination(rawMacosHref, primaryHref) &&
    !sameDestination(rawMacosHref, windowsHref)
      ? rawMacosHref
      : null

  const role = isWeb
    ? PROJECTS_COPY.metaRoleWeb
    : browserApp
      ? PROJECTS_COPY.metaRoleBrowserApp
      : PROJECTS_COPY.metaRoleSoftware

  const interactive = Boolean(primaryHref)

  const activate = () => {
    if (primaryHref) onNavigate(primaryHref)
  }

  const placeholderMark = isWeb ? 'W' : browserApp ? 'A' : 'L'

  return (
    <article
      className={[styles.card, interactive ? styles.cardInteractive : ''].filter(Boolean).join(' ')}
      data-testid={`pv2-project-${project.id}`}
      data-project-type={variant}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'link' : undefined}
      onClick={interactive ? activate : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                activate()
              }
            }
          : undefined
      }
    >
      <div className={styles.media} aria-hidden={imageSrc ? undefined : true}>
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={[styles.mediaImg, !isWeb ? styles.mediaImgContain : ''].filter(Boolean).join(' ')}
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.mediaPlaceholder}>
            <span className={styles.mediaPlaceholderMark}>{placeholderMark}</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.badge}>{role}</span>
          {statusLabel ? <span className={styles.status}>{statusLabel}</span> : null}
        </div>
        <h3 className={styles.title}>{project.name}</h3>
        {description ? (
          <p
            className={[styles.description, !expanded && canExpand ? styles.descriptionClamped : '']
              .filter(Boolean)
              .join(' ')}
          >
            {description}
          </p>
        ) : null}
        <div className={styles.expandSlot}>
          {canExpand ? (
            <button
              type="button"
              className={styles.expandBtn}
              aria-expanded={expanded}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setExpanded((v) => !v)
              }}
            >
              {expanded ? PROJECTS_COPY.readLess : PROJECTS_COPY.readMore}
            </button>
          ) : null}
        </div>
        <ul className={styles.techs} aria-label="Technologies">
          {techs.map((tech) => (
            <li key={tech} className={styles.tech}>
              {tech}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          {primaryHref ? (
            <Button
              href={primaryHref}
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onNavigate(primaryHref)
              }}
            >
              {primaryLabel}
            </Button>
          ) : null}
          {windowsHref ? (
            <Button
              href={windowsHref}
              variant="ghost"
              size="sm"
              aria-label={timelendr ? PROJECTS_COPY.downloadTimelendrPc : PROJECTS_COPY.downloadWindows}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onNavigate(windowsHref)
              }}
            >
              Windows
            </Button>
          ) : null}
          {macosHref ? (
            <Button
              href={macosHref}
              variant="ghost"
              size="sm"
              aria-label={timelendr ? PROJECTS_COPY.downloadTimelendrMacos : PROJECTS_COPY.downloadMacos}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onNavigate(macosHref)
              }}
            >
              macOS
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  )
}

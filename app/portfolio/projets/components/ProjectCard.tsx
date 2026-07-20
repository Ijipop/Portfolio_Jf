'use client'

import DownloadIcon from '@mui/icons-material/Download'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { alpha, styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import ScrollReveal from '@/components/shared/ScrollReveal'
import SkillTag from '@/components/shared/SkillTag'
import CTAButton from '@/components/shared/CTAButton'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCardSurfaceOptions } from '@/hooks/useCardSurfaceOptions'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import type { Project } from '../projectTypes'
import {
  getProjectCardActionsSx,
  getProjectCardContentSx,
  getProjectCardDownloadGridSx,
  getProjectCardGhostBtnSx,
  getProjectCardRootSx,
  getProjectCardThumbnailSx,
  getProjectCardTitleRowSx,
} from '../utils/projectCardEditorialSx'
import {
  getShowcaseCardMediaSx,
  getSoftwareCardActionsSx,
  getSoftwareCardBodySx,
  getSoftwareCardIconTileSx,
  getSoftwareCardRootSx,
} from '../utils/projectCardSoftwareSx'

const MAX_VISIBLE_TECHS = 3

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: DESIGN_TOKENS.borderRadius.medium,
  fontWeight: 600,
  fontSize: '0.6875rem',
  height: 22,
  flexShrink: 0,
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  '& .MuiChip-label': {
    padding: theme.spacing(0, 0.75),
  },
  '& .MuiChip-icon': {
    fontSize: '0.875rem',
    marginLeft: theme.spacing(0.5),
  },
}))

const TechStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.35),
}))

type SecondaryAction = {
  href: string
  label: string
  ariaLabel: string
  withDownloadIcon?: boolean
}

/** Icônes vitrine : priorité sur l’ancien upload screenshot admin. */
function resolveBrandIcon(project: Project): string | undefined {
  const n = project.name.toLowerCase()
  const u = `${project.url ?? ''} ${project.siteUrl ?? ''}`.toLowerCase()
  if (
    n.includes('timelendr') ||
    n.includes('timelendar') ||
    u.includes('/logiciel/timelendr') ||
    u.includes('/logiciel/timelendar')
  ) {
    return '/imgs/images/timelendrpro.svg'
  }
  if (
    n.includes('overstamp') ||
    n.includes('overtstamp') ||
    n.includes('fanmark') ||
    n.includes('fan mark') ||
    u.includes('overstamp.studio')
  ) {
    return '/imgs/images/Overstamp_icon.svg'
  }
  if (n.includes('space taker') || n.includes('spacetaker') || n.includes('space-taker')) {
    return '/imgs/images/SpaceTaker_icon.png'
  }
  return undefined
}

function resolveProjectCardImage(project: Project): string | undefined {
  const brandIcon = resolveBrandIcon(project)
  if (brandIcon) return brandIcon

  const uploaded = project.imageUrl?.trim()
  if (uploaded) return uploaded

  const n = project.name.toLowerCase()
  if (n.includes('thermo') && n.includes('trappeur')) return '/imgs/images/Thermo.png'
  return undefined
}

function isBrowserSoftwareApp(project: Project): boolean {
  const n = project.name.toLowerCase()
  const u = `${project.url ?? ''} ${project.siteUrl ?? ''}`.toLowerCase()
  return (
    n.includes('overstamp') ||
    n.includes('overtstamp') ||
    n.includes('fanmark') ||
    n.includes('fan mark') ||
    u.includes('overstamp.studio')
  )
}

function getLaunchableSiteHref(project: Project): string | null {
  const site = project.siteUrl?.trim()
  if (site) return site
  const u = project.url?.trim()
  if (u && !u.toLowerCase().includes('github.com')) return u
  return null
}

/** Projet « vitrine portfolio » : URL GitHub du repo du site — on ne renvoie pas vers GitHub, mais vers ce site. */
function isPortfolioOwnSiteProject(project: Project): boolean {
  const u = (project.url ?? '').toLowerCase()
  if (!u.includes('github.com')) return false
  return u.includes('portfolio') || u.includes('port-folio') || u.includes('portefolio')
}

function getWebViewSiteButtonHref(project: Project): string | null {
  if (isPortfolioOwnSiteProject(project)) return '/portfolio'
  const site = project.siteUrl?.trim()
  if (site) return site
  const u = project.url?.trim()
  if (u && !u.toLowerCase().includes('github')) return u
  return null
}

function getProjectMonogram(name: string): string {
  const words = name
    .replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  const initials = words.slice(0, 2).map((word) => word[0]).join('')
  return (initials || name.slice(0, 2) || 'IJ').toUpperCase()
}

export type ProjectCardProps = {
  project: Project
  index: number
  handleProjectClick: (url: string) => void
  getStatusIcon: (status: string) => React.ReactElement
  getStatusColor: (status: string) => 'error' | 'success' | 'warning' | 'info' | 'default' | 'primary' | 'secondary'
  resolveImageUrl: (imageUrl: string) => string
  timelendrWindowsUrl?: string | null
  timelendrMacosUrl?: string | null
  viewProjectLabel?: string
  viewSiteLabel?: string
  downloadProjectLabel?: string
  downloadTimelendrPcLabel?: string
  downloadTimelendrMacosLabel?: string
  openAppLabel?: string
  cardVariant?: 'web' | 'logiciel'
}

export default function ProjectCard({
  project,
  index,
  handleProjectClick,
  getStatusIcon,
  getStatusColor,
  resolveImageUrl,
  timelendrWindowsUrl,
  timelendrMacosUrl,
  viewProjectLabel = 'Voir le projet',
  viewSiteLabel = 'Voir le site',
  downloadProjectLabel = 'Télécharger le projet',
  downloadTimelendrPcLabel = 'Télécharger Timelendr PC',
  downloadTimelendrMacosLabel = 'Télécharger Timelendr macOS',
  openAppLabel = 'Ouvrir',
  cardVariant = 'logiciel',
}: ProjectCardProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { isSiteDark, isSiteLight } = useCardSurfaceOptions()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { customTheme } = useAdvancedTheme()
  const { beigePresentationBgUrl } = useBeigePresentationBg()
  const { mode: presentationMode } = usePresentationMode()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const reflectionColors = [
    primary,
    secondary,
    accent,
    primary,
    secondary,
    accent,
    primary,
    secondary,
    accent,
    primary,
  ]
  const reflectionColor = reflectionColors[index % reflectionColors.length]

  const descriptionColor =
    isSiteDark || theme.palette.mode === 'dark'
      ? SITE_DARK.text
      : isSiteLight || presentationMode === 'beige'
        ? SITE_LIGHT.textSecondary
        : SITE_DARK.text

  const metaTextColor =
    isSiteDark || theme.palette.mode === 'dark'
      ? SITE_DARK.textSecondary
      : isSiteLight || presentationMode === 'beige'
        ? SITE_LIGHT.textMuted
        : SITE_DARK.textSecondary

  const ghostBtnTextColor = isSiteDark || theme.palette.mode === 'dark' ? SITE_DARK.text : SITE_LIGHT.textSecondary

  const lowerName = project.name.toLowerCase()
  const lowerUrl = (project.url ?? '').toLowerCase()
  const isTimelendrProject =
    lowerName.includes('timelendr') ||
    lowerName.includes('timelendar') ||
    lowerUrl.includes('/logiciel/timelendr') ||
    lowerUrl.includes('/logiciel/timelendar')
  const isOwnPortfolioSite = isPortfolioOwnSiteProject(project)
  const isBrowserApp = isBrowserSoftwareApp(project)
  const isWebCard = cardVariant === 'web'
  const isSoftwareCard = cardVariant === 'logiciel'
  const isShowcaseCard = isWebCard || isSoftwareCard
  const launchableSiteHref = getLaunchableSiteHref(project)
  const webViewSiteHref = isWebCard ? getWebViewSiteButtonHref(project) : null
  const projectWindowsUrl = project.windowsUrl?.trim() || null
  const projectMacosUrl = project.macosUrl?.trim() || null

  const hasProjectAction = isWebCard
    ? Boolean(webViewSiteHref)
    : Boolean(
        (isBrowserApp && launchableSiteHref) ||
          (!isBrowserApp &&
            (project.url?.trim() ||
              project.siteUrl?.trim() ||
              (!isTimelendrProject && project.downloadUrl?.trim()) ||
              (!isTimelendrProject && (projectWindowsUrl || projectMacosUrl)) ||
              (isTimelendrProject && (timelendrWindowsUrl || timelendrMacosUrl)))),
      )

  const brandIcon = resolveBrandIcon(project)
  const cardImageRaw = resolveProjectCardImage(project)
  const cardImageHref = cardImageRaw ? resolveImageUrl(cardImageRaw) : ''
  /** Tile carré réservé aux cartes logiciel — les sites web gardent tous le même cadre 16:10. */
  const usesAppIconPresentation = isSoftwareCard
  /** Icône marque dans un cadre site : contain + padding (pas cover). */
  const mediaUsesContain = usesAppIconPresentation || Boolean(brandIcon && isWebCard)
  const projectTechs = project.technologies.split(',').map((tech) => tech.trim()).filter(Boolean)
  const visibleTechs = projectTechs.slice(0, MAX_VISIBLE_TECHS)
  const overflowTechCount = Math.max(0, projectTechs.length - MAX_VISIBLE_TECHS)
  const projectRoleLabel = isWebCard
    ? t('projects.metaRoleWeb')
    : isBrowserApp
      ? t('projects.metaRoleBrowserApp')
      : t('projects.metaRoleSoftware')
  const yearSegment = project.createdAt
    ? `${t('projects.metaYear')} ${new Date(project.createdAt).getFullYear()}`
    : null
  const stackFallback = projectTechs[0] ?? t('projects.metaStack')
  const projectMetaRoles = [projectRoleLabel]
  const projectMetaLineItems: string[] =
    projectTechs.length > 0
      ? [...projectMetaRoles, yearSegment].filter((item): item is string => Boolean(item))
      : [...projectMetaRoles, yearSegment, stackFallback].filter((item): item is string => Boolean(item))

  const cardRootSx = isShowcaseCard
    ? getSoftwareCardRootSx({
        isSiteDark,
        isSiteLight,
        presentationMode,
        primary,
        hasProjectAction: Boolean(hasProjectAction),
        theme,
      })
    : getProjectCardRootSx({
        isTopologyRoute,
        isSiteDark,
        isSiteLight,
        presentationMode,
        primary,
        secondary,
        hasProjectAction: Boolean(hasProjectAction),
        customTheme,
        beigePresentationBgUrl,
        theme,
      })

  const thumbnailSx = usesAppIconPresentation
    ? getSoftwareCardIconTileSx({ primary, theme, isSiteDark })
    : isShowcaseCard
      ? getShowcaseCardMediaSx({ primary, theme, isSiteDark })
      : getProjectCardThumbnailSx({ primary, theme, isSiteDark })
  const ghostBtnSx = getProjectCardGhostBtnSx({ primary, isSiteDark, mutedTextColor: ghostBtnTextColor })

  const handleCardClick = () => {
    if (isWebCard && webViewSiteHref) handleProjectClick(webViewSiteHref)
    else if (isOwnPortfolioSite) handleProjectClick('/portfolio')
    else if (isBrowserApp && launchableSiteHref) handleProjectClick(launchableSiteHref)
    else if (!isBrowserApp && project.url?.trim()) handleProjectClick(project.url)
    else if (!isBrowserApp && project.siteUrl?.trim()) handleProjectClick(project.siteUrl)
    else if (!isTimelendrProject && !isBrowserApp && project.downloadUrl?.trim()) {
      handleProjectClick(project.downloadUrl)
    } else if (!isTimelendrProject && !isBrowserApp && projectWindowsUrl) {
      handleProjectClick(projectWindowsUrl)
    } else if (!isTimelendrProject && !isBrowserApp && projectMacosUrl) {
      handleProjectClick(projectMacosUrl)
    } else if (isTimelendrProject && timelendrWindowsUrl) handleProjectClick(timelendrWindowsUrl)
    else if (isTimelendrProject && timelendrMacosUrl) handleProjectClick(timelendrMacosUrl)
  }

  const platformWindowsHref = isTimelendrProject ? timelendrWindowsUrl : projectWindowsUrl
  const platformMacosHref = isTimelendrProject ? timelendrMacosUrl : projectMacosUrl
  const downloadWindowsAria = isTimelendrProject ? downloadTimelendrPcLabel : t('projects.downloadWindows')
  const downloadMacosAria = isTimelendrProject ? downloadTimelendrMacosLabel : t('projects.downloadMacos')

  let primaryHref: string | null = null
  let primaryLabel = viewProjectLabel
  if (isWebCard) {
    primaryHref = webViewSiteHref
    primaryLabel = viewSiteLabel
  } else if (isOwnPortfolioSite) {
    primaryHref = '/portfolio'
    primaryLabel = viewSiteLabel
  } else if (isBrowserApp) {
    if (launchableSiteHref) {
      primaryHref = launchableSiteHref
      primaryLabel = openAppLabel
    }
  } else if (isTimelendrProject && project.url?.trim()) {
    primaryHref = project.url.trim()
    primaryLabel = viewProjectLabel
  } else if (project.url?.trim()) {
    primaryHref = project.url.trim()
    primaryLabel = viewProjectLabel
  } else if (project.siteUrl?.trim()) {
    primaryHref = project.siteUrl.trim()
    primaryLabel = viewSiteLabel
  } else if (!isTimelendrProject && project.downloadUrl?.trim()) {
    primaryHref = project.downloadUrl!.trim()
    primaryLabel = downloadProjectLabel
  }
  /** Windows / macOS : toujours en rangée secondaire (même modèle Timelendr), jamais en CTA orange. */

  const secondaryActions: SecondaryAction[] = []
  if (isSoftwareCard && !isBrowserApp) {
    if (project.siteUrl?.trim() && primaryHref !== project.siteUrl.trim()) {
      secondaryActions.push({
        href: project.siteUrl.trim(),
        label: viewSiteLabel,
        ariaLabel: viewSiteLabel,
      })
    }
    if (platformWindowsHref) {
      secondaryActions.push({
        href: platformWindowsHref,
        label: 'Windows',
        ariaLabel: downloadWindowsAria,
        withDownloadIcon: true,
      })
    }
    if (platformMacosHref) {
      secondaryActions.push({
        href: platformMacosHref,
        label: 'macOS',
        ariaLabel: downloadMacosAria,
        withDownloadIcon: true,
      })
    }
    if (!isTimelendrProject && project.downloadUrl?.trim() && primaryHref !== project.downloadUrl.trim()) {
      secondaryActions.push({
        href: project.downloadUrl.trim(),
        label: downloadProjectLabel,
        ariaLabel: downloadProjectLabel,
        withDownloadIcon: true,
      })
    }
  }

  return (
    <ScrollReveal
      key={project.id}
      direction="up"
      distance={isMobile ? 24 : 36}
      delay={isMobile ? 0.08 * (index % 4) : 0.05 * (index % 4)}
      fillHeight={isShowcaseCard}
    >
      <Box
        sx={
          isShowcaseCard
            ? {
                width: '100%',
                height: '100%',
                minHeight: 0,
                display: 'grid',
                gridRow: 'span 6',
                gridTemplateRows: 'subgrid',
              }
            : {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }
        }
      >
        <Box
          component="article"
          className={isShowcaseCard ? 'showcase-card' : 'project-card-row'}
          onClick={hasProjectAction ? handleCardClick : undefined}
          onKeyDown={
            hasProjectAction
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick()
                  }
                }
              : undefined
          }
          role={hasProjectAction ? 'button' : undefined}
          tabIndex={hasProjectAction ? 0 : undefined}
          sx={cardRootSx}
        >
          <Box
            className={
              usesAppIconPresentation
                ? 'software-card-icon'
                : isShowcaseCard
                  ? 'showcase-card-media'
                  : 'project-card-thumbnail'
            }
            sx={thumbnailSx}
          >
            {cardImageHref ? (
              isShowcaseCard ? (
                <Box
                  component="img"
                  src={cardImageHref}
                  alt={project.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: mediaUsesContain ? 'contain' : 'cover',
                    objectPosition: mediaUsesContain ? 'center' : 'center top',
                    p: mediaUsesContain ? { xs: '18%', md: '20%' } : 0,
                    display: 'block',
                  }}
                />
              ) : (
                <Image
                  src={cardImageHref}
                  alt={project.name}
                  width={56}
                  height={56}
                  unoptimized={
                    cardImageHref.startsWith('data:') ||
                    cardImageHref.toLowerCase().includes('.svg')
                  }
                  sizes="56px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              )
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: BRAND_GLITCH_GRADIENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontWeight: 900,
                    letterSpacing: '-0.06em',
                    fontSize: isShowcaseCard ? '1.75rem' : '0.875rem',
                  }}
                >
                  {getProjectMonogram(project.name)}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={isShowcaseCard ? getSoftwareCardBodySx() : getProjectCardContentSx()}>
            <Box
              sx={
                isShowcaseCard
                  ? {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 0.75,
                      minWidth: 0,
                      textAlign: 'center',
                    }
                  : getProjectCardTitleRowSx()
              }
            >
              <Typography
                variant={isShowcaseCard ? 'h6' : 'subtitle2'}
                component="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  color: textColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: isShowcaseCard ? 'normal' : 'nowrap',
                  display: isShowcaseCard ? '-webkit-box' : undefined,
                  WebkitLineClamp: isShowcaseCard ? 2 : undefined,
                  WebkitBoxOrient: isShowcaseCard ? 'vertical' : undefined,
                  flex: isShowcaseCard ? undefined : '1 1 auto',
                  minWidth: 0,
                  fontSize: isShowcaseCard ? { xs: '1.2rem', md: '1.35rem' } : undefined,
                }}
              >
                {project.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  minHeight: 22,
                }}
              >
                <StatusChip
                  icon={getStatusIcon(project.status)}
                  label={project.status}
                  color={getStatusColor(project.status)}
                  size="small"
                />
              </Box>
            </Box>

            <Box
              sx={{
                minWidth: 0,
                textAlign: isShowcaseCard ? 'center' : 'left',
              }}
            >
              {isOwnPortfolioSite ? (
                <Typography
                  variant="caption"
                  component="p"
                  sx={{
                    display: 'block',
                    mb: 0.35,
                    lineHeight: 1.4,
                    fontWeight: 600,
                    fontStyle: 'italic',
                    fontSize: '0.6875rem',
                    color: descriptionColor,
                    opacity: 0.92,
                  }}
                >
                  {t('projects.portfolioSelfNotice')}
                </Typography>
              ) : null}
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.5,
                  mb: isShowcaseCard ? 0 : 0.4,
                  fontSize: isShowcaseCard ? '0.9rem' : '0.8125rem',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: isShowcaseCard ? 3 : 2,
                  WebkitBoxOrient: 'vertical',
                  color: descriptionColor,
                  opacity: 0.92,
                }}
              >
                {project.description}
              </Typography>
            </Box>

            <TechStack
              sx={{
                visibility: 'visible !important',
                opacity: '1 !important',
                zIndex: DESIGN_TOKENS.zIndex.elevated,
                position: 'relative',
                justifyContent: 'center',
                alignContent: 'start',
                mb: isShowcaseCard ? 0 : 0.4,
                minWidth: 0,
              }}
            >
              {visibleTechs.map((tech, techIndex) => (
                <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
                  {tech}
                </SkillTag>
              ))}
              {overflowTechCount > 0 ? (
                <Chip
                  label={`+${overflowTechCount}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    bgcolor: alpha(primary, 0.12),
                    color: textColor,
                    border: `1px solid ${alpha(primary, 0.2)}`,
                  }}
                />
              ) : null}
            </TechStack>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: isShowcaseCard ? 'center' : 'flex-start',
                alignContent: 'start',
                gap: 0.5,
                mb: isShowcaseCard ? 0 : 0.65,
                minWidth: 0,
                fontSize: '0.6875rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: metaTextColor,
              }}
            >
              {projectMetaLineItems.map((item, metaIndex) => (
                <React.Fragment key={`${project.id}-meta-${metaIndex}-${item}`}>
                  {metaIndex > 0 && (
                    <Box component="span" sx={{ width: 3, height: 3, borderRadius: '50%', background: primary, opacity: 0.8 }} />
                  )}
                  <Box component="span">{item}</Box>
                </React.Fragment>
              ))}
            </Box>

            <Box
              sx={isShowcaseCard ? getSoftwareCardActionsSx() : getProjectCardActionsSx()}
              onClick={(e) => e.stopPropagation()}
            >
              {primaryHref ? (
                <Box sx={{ width: '100%' }}>
                  <CTAButton
                    variant="primary"
                    size={isShowcaseCard ? 'medium' : 'small'}
                    fullWidth={isShowcaseCard}
                    onClick={() => handleProjectClick(primaryHref)}
                  >
                    {primaryLabel}
                  </CTAButton>
                </Box>
              ) : null}
              {secondaryActions.length > 0 ? (
                <Box sx={getProjectCardDownloadGridSx(secondaryActions.length)}>
                  {secondaryActions.map((action) => (
                    <Button
                      key={action.href}
                      variant="text"
                      size="small"
                      aria-label={action.ariaLabel}
                      sx={ghostBtnSx}
                      startIcon={action.withDownloadIcon ? <DownloadIcon sx={{ fontSize: 14 }} /> : undefined}
                      onClick={() => handleProjectClick(action.href)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </Box>
              ) : isShowcaseCard && primaryHref ? (
                /** Réserve la rangée secondaire pour aligner « Ouvrir » avec « Voir le projet ». */
                <Box aria-hidden sx={{ minHeight: 32, width: '100%' }} />
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}

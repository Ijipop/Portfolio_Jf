'use client'

import DownloadIcon from '@mui/icons-material/Download'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import LaunchIcon from '@mui/icons-material/Launch'
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
  getProjectCardLinkIconSx,
  getProjectCardRootSx,
  getProjectCardThumbnailSx,
  getProjectCardTitleRowSx,
} from '../utils/projectCardEditorialSx'

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

function resolveProjectCardImage(project: Project): string | undefined {
  const uploaded = project.imageUrl?.trim()
  if (uploaded) return uploaded

  const n = project.name.toLowerCase()
  const u = (project.url ?? '').toLowerCase()
  if (n.includes('thermo') && n.includes('trappeur')) return 'imgs/images/Thermo.png'
  if (
    n.includes('timelendr') ||
    n.includes('timelendar') ||
    u.includes('/logiciel/timelendr') ||
    u.includes('/logiciel/timelendar')
  ) {
    return 'imgs/images/timelendr.png'
  }
  return undefined
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
  const hasProjectAction =
    project.url?.trim() ||
    project.siteUrl?.trim() ||
    (!isTimelendrProject && project.downloadUrl?.trim()) ||
    (isTimelendrProject && (timelendrWindowsUrl || timelendrMacosUrl))

  const cardImageRaw = resolveProjectCardImage(project)
  const cardImageHref = cardImageRaw ? resolveImageUrl(cardImageRaw) : ''
  const projectTechs = project.technologies.split(',').map((tech) => tech.trim()).filter(Boolean)
  const visibleTechs = projectTechs.slice(0, MAX_VISIBLE_TECHS)
  const overflowTechCount = Math.max(0, projectTechs.length - MAX_VISIBLE_TECHS)
  const projectRoleLabel = cardVariant === 'web' ? t('projects.metaRoleWeb') : t('projects.metaRoleSoftware')
  const yearSegment = project.createdAt
    ? `${t('projects.metaYear')} ${new Date(project.createdAt).getFullYear()}`
    : null
  const stackFallback = projectTechs[0] ?? t('projects.metaStack')
  const projectMetaRoles = cardVariant === 'web' ? [] : [projectRoleLabel]
  const projectMetaLineItems: string[] =
    projectTechs.length > 0
      ? [...projectMetaRoles, yearSegment].filter((item): item is string => Boolean(item))
      : [...projectMetaRoles, yearSegment, stackFallback].filter((item): item is string => Boolean(item))

  const cardRootSx = getProjectCardRootSx({
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

  const thumbnailSx = getProjectCardThumbnailSx({ primary, theme, isSiteDark })
  const ghostBtnSx = getProjectCardGhostBtnSx({ primary, isSiteDark, mutedTextColor: ghostBtnTextColor })

  const handleCardClick = () => {
    if (isOwnPortfolioSite) handleProjectClick('/portfolio')
    else if (project.url?.trim()) handleProjectClick(project.url)
    else if (project.siteUrl?.trim()) handleProjectClick(project.siteUrl)
    else if (!isTimelendrProject && project.downloadUrl?.trim()) handleProjectClick(project.downloadUrl)
    else if (isTimelendrProject && timelendrWindowsUrl) handleProjectClick(timelendrWindowsUrl)
    else if (isTimelendrProject && timelendrMacosUrl) handleProjectClick(timelendrMacosUrl)
  }

  let primaryHref: string | null = null
  let primaryLabel = viewProjectLabel
  if (isOwnPortfolioSite) {
    primaryHref = '/portfolio'
    primaryLabel = viewSiteLabel
  } else if (project.url?.trim()) {
    primaryHref = project.url.trim()
    primaryLabel = viewProjectLabel
  } else if (project.siteUrl?.trim()) {
    primaryHref = project.siteUrl.trim()
    primaryLabel = viewSiteLabel
  } else if (!isTimelendrProject && project.downloadUrl?.trim()) {
    primaryHref = project.downloadUrl!.trim()
    primaryLabel = downloadProjectLabel
  } else if (isTimelendrProject && timelendrWindowsUrl) {
    primaryHref = timelendrWindowsUrl
    primaryLabel = downloadTimelendrPcLabel
  } else if (isTimelendrProject && timelendrMacosUrl) {
    primaryHref = timelendrMacosUrl
    primaryLabel = downloadTimelendrMacosLabel
  }

  const webViewSiteHref = cardVariant === 'web' ? getWebViewSiteButtonHref(project) : null

  const secondaryActions: SecondaryAction[] = []
  if (cardVariant !== 'web') {
    if (project.siteUrl?.trim() && primaryHref !== project.siteUrl.trim()) {
      secondaryActions.push({
        href: project.siteUrl.trim(),
        label: viewSiteLabel,
        ariaLabel: viewSiteLabel,
      })
    }
    if (isTimelendrProject && timelendrWindowsUrl && primaryHref !== timelendrWindowsUrl) {
      secondaryActions.push({
        href: timelendrWindowsUrl,
        label: 'Windows',
        ariaLabel: downloadTimelendrPcLabel,
        withDownloadIcon: true,
      })
    }
    if (isTimelendrProject && timelendrMacosUrl && primaryHref !== timelendrMacosUrl) {
      secondaryActions.push({
        href: timelendrMacosUrl,
        label: 'macOS',
        ariaLabel: downloadTimelendrMacosLabel,
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
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="article"
          className="project-card-row"
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
          <Box className="project-card-thumbnail" sx={thumbnailSx}>
            {cardImageHref ? (
              <Image
                src={cardImageHref}
                alt={project.name}
                width={56}
                height={56}
                unoptimized={cardImageHref.startsWith('data:')}
                sizes="56px"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
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
                    fontSize: '0.875rem',
                  }}
                >
                  {getProjectMonogram(project.name)}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={getProjectCardContentSx()}>
            <Box sx={getProjectCardTitleRowSx()}>
              <Typography
                variant="subtitle2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.25,
                  letterSpacing: '-0.03em',
                  color: textColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: '1 1 auto',
                  minWidth: 0,
                }}
              >
                {project.name}
              </Typography>
              <StatusChip
                icon={getStatusIcon(project.status)}
                label={project.status}
                color={getStatusColor(project.status)}
                size="small"
              />
              {project.url ? (
                <Box sx={getProjectCardLinkIconSx(isSiteDark)} aria-hidden>
                  {project.url.includes('github') && isOwnPortfolioSite && (
                    <LanguageOutlinedIcon sx={{ fontSize: 15 }} />
                  )}
                  {project.url.includes('github') && !isOwnPortfolioSite && <GitHubIcon sx={{ fontSize: 15 }} />}
                  {!project.url.includes('github') && <LaunchIcon sx={{ fontSize: 15 }} />}
                </Box>
              ) : null}
            </Box>

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
                textAlign: 'left',
                lineHeight: 1.45,
                mb: 0.4,
                fontSize: '0.8125rem',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                color: descriptionColor,
                opacity: 0.92,
              }}
            >
              {project.description}
            </Typography>

            {cardVariant !== 'web' ? (
              <TechStack
                sx={{
                  visibility: 'visible !important',
                  opacity: '1 !important',
                  zIndex: DESIGN_TOKENS.zIndex.elevated,
                  position: 'relative',
                  justifyContent: 'flex-start',
                  mb: 0.4,
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
            ) : null}

            {projectMetaLineItems.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 0.5,
                  mb: 0.65,
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
            ) : null}

            <Box sx={getProjectCardActionsSx()} onClick={(e) => e.stopPropagation()}>
              {cardVariant === 'web' ? (
                webViewSiteHref ? (
                  <Box sx={{ alignSelf: 'flex-start' }}>
                    <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(webViewSiteHref)}>
                      {viewSiteLabel}
                    </CTAButton>
                  </Box>
                ) : null
              ) : (
                <>
                  {primaryHref ? (
                    <Box sx={{ alignSelf: 'flex-start' }}>
                      <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(primaryHref)}>
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
                  ) : null}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}

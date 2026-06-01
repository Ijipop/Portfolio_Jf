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
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import type { Project } from '../projectTypes'
import {
  getProjectCardBodySx,
  getProjectCardLinkIconOverlaySx,
  getProjectCardMediaSx,
  getProjectCardRootSx,
  getProjectCardStatusOverlaySx,
  projectCardImageFillAnchorSx,
} from '../utils/projectCardEditorialSx'

const StatusChip = styled(Chip)(({ theme, color }: { theme: any; color?: any }) => ({
  borderRadius: DESIGN_TOKENS.borderRadius.medium,
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 1.5),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  },
}))

const TechStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.75),
}))

const ProjectImageContainer = styled(Box)(() => ({
  position: 'relative',
  overflow: 'hidden',
  flexShrink: 0,
  '& img': {
    borderRadius: 0,
    boxShadow: 'none',
  },
}))

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
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { themeName, customTheme } = useAdvancedTheme()
  const { beigePresentationBgUrl } = useBeigePresentationBg()
  const { mode: presentationMode } = usePresentationMode()
  const isNonDefaultPalette = themeName !== 'default'
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
  const projectRoleLabel = cardVariant === 'web' ? t('projects.metaRoleWeb') : t('projects.metaRoleSoftware')
  const yearSegment = project.createdAt
    ? `${t('projects.metaYear')} ${new Date(project.createdAt).getFullYear()}`
    : null
  const stackFallback = projectTechs[0] ?? t('projects.metaStack')
  /** Pas de pastille « Site web » sous les techno ; année (et rôle logiciel) seulement. */
  const projectMetaRoles = cardVariant === 'web' ? [] : [projectRoleLabel]
  const projectMetaLineItems: string[] =
    projectTechs.length > 0
      ? [...projectMetaRoles, yearSegment].filter((item): item is string => Boolean(item))
      : [...projectMetaRoles, yearSegment, stackFallback].filter((item): item is string => Boolean(item))

  const cardRootSx = getProjectCardRootSx({
    isTopologyRoute,
    presentationMode,
    primary,
    hasProjectAction: Boolean(hasProjectAction),
    customTheme,
    beigePresentationBgUrl,
    theme,
  })

  const cardMediaSx = getProjectCardMediaSx({ isTopologyRoute, theme })

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

  const timelendrDownloadsBesideProject =
    isTimelendrProject && Boolean(project.url?.trim()) && Boolean(timelendrWindowsUrl || timelendrMacosUrl)

  const secondaryBtnSx = {
    alignSelf: 'flex-start' as const,
    py: 0.5,
    px: 1.25,
    fontSize: '0.75rem',
    textTransform: 'none' as const,
  }

  const webViewSiteHref = cardVariant === 'web' ? getWebViewSiteButtonHref(project) : null

  return (
    <ScrollReveal
      key={project.id}
      direction="up"
      distance={isMobile ? 30 : 50}
      delay={isMobile ? 0.08 * (index % 4) : 0.05 * (index % 4)}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: { xs: 280, sm: 300 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="article"
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
          <ProjectImageContainer className="project-card-image" sx={cardMediaSx}>
            {cardImageHref ? (
              <Box sx={projectCardImageFillAnchorSx}>
                <Image
                  src={cardImageHref}
                  alt={project.name}
                  fill
                  unoptimized={cardImageHref.startsWith('data:')}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: BRAND_GLITCH_GRADIENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 900,
                    letterSpacing: '-0.08em',
                    textShadow: '0 16px 50px rgba(0,0,0,0.35)',
                  }}
                >
                  {getProjectMonogram(project.name)}
                </Typography>
              </Box>
            )}

            <Box sx={getProjectCardStatusOverlaySx()}>
              <StatusChip
                icon={getStatusIcon(project.status)}
                label={project.status}
                color={getStatusColor(project.status)}
                size="small"
              />
            </Box>

            {project.url && (
              <Box sx={getProjectCardLinkIconOverlaySx()} aria-hidden>
                {project.url.includes('github') && isOwnPortfolioSite && (
                  <LanguageOutlinedIcon sx={{ fontSize: 18 }} />
                )}
                {project.url.includes('github') && !isOwnPortfolioSite && <GitHubIcon sx={{ fontSize: 18 }} />}
                {!project.url.includes('github') && <LaunchIcon sx={{ fontSize: 18 }} />}
              </Box>
            )}
          </ProjectImageContainer>

          <Box sx={getProjectCardBodySx()}>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{
                fontWeight: 900,
                lineHeight: 1.2,
                letterSpacing: '-0.035em',
                color: textColor,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
              }}
            >
              {project.name}
            </Typography>

              <Box sx={{ mb: 0.5 }}>
                {isOwnPortfolioSite && (
                  <Typography
                    variant="caption"
                    component="p"
                    sx={{
                      display: 'block',
                      mb: 0.85,
                      lineHeight: 1.45,
                      fontWeight: 600,
                      fontStyle: 'italic',
                      opacity: 0.88,
                      ...(isNonDefaultPalette ? { color: `${primary}ee` } : { color: 'rgba(255,255,255,0.88)' }),
                    }}
                  >
                    {t('projects.portfolioSelfNotice')}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'left',
                    lineHeight: 1.35,
                    mb: { xs: 0.5, md: 0.65 },
                    fontSize: { xs: '0.8125rem', sm: '0.75rem', md: '0.78rem' },
                    overflow: 'visible',
                    display: 'block',
                    ...(isNonDefaultPalette ? { color: `${primary}ee` } : { color: 'rgba(255,255,255,0.92)' }),
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
                  justifyContent: 'flex-start',
                  mb: { xs: 0.5, md: 0.65 },
                }}
              >
                {projectTechs.map((tech, techIndex) => (
                  <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
                    {tech}
                  </SkillTag>
                ))}
              </TechStack>

              {projectMetaLineItems.length > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 0.65,
                  mb: 0.9,
                  color: textColor,
                  opacity: 0.78,
                  fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.8125rem' },
                  fontWeight: 900,
                  letterSpacing: '0.11em',
                  textTransform: 'uppercase',
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

              <Box
                sx={{
                  pt: 0.25,
                  mt: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 0.5,
                  flexShrink: 0,
                  width: '100%',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {cardVariant === 'web' ? (
                  webViewSiteHref ? (
                    <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(webViewSiteHref)}>
                      {viewSiteLabel}
                    </CTAButton>
                  ) : null
                ) : timelendrDownloadsBesideProject ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      width: '100%',
                      gap: 1,
                      rowGap: 0.75,
                    }}
                  >
                    {primaryHref && (
                      <Box sx={{ flexShrink: 0 }}>
                        <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(primaryHref)}>
                          {primaryLabel}
                        </CTAButton>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                        gap: 0.5,
                        flex: '1 1 0',
                        minWidth: { xs: '100%', sm: 0 },
                        maxWidth: { xs: '100%', sm: 400 },
                        marginLeft: { xs: 0, sm: 'auto' },
                      }}
                    >
                      {timelendrWindowsUrl && primaryHref !== timelendrWindowsUrl && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            ...secondaryBtnSx,
                            alignSelf: 'stretch',
                            flex: '1 1 0',
                            minWidth: 0,
                            justifyContent: 'center',
                            px: { xs: 1, sm: 1.35 },
                            py: 1,
                            minHeight: 44,
                            fontSize: '0.75rem',
                          }}
                          startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                          onClick={() => handleProjectClick(timelendrWindowsUrl)}
                        >
                          {downloadTimelendrPcLabel}
                        </Button>
                      )}
                      {timelendrMacosUrl && primaryHref !== timelendrMacosUrl && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            ...secondaryBtnSx,
                            alignSelf: 'stretch',
                            flex: '1 1 0',
                            minWidth: 0,
                            justifyContent: 'center',
                            px: { xs: 1, sm: 1.35 },
                            py: 1,
                            minHeight: 44,
                            fontSize: '0.75rem',
                          }}
                          startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                          onClick={() => handleProjectClick(timelendrMacosUrl)}
                        >
                          {downloadTimelendrMacosLabel}
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <>
                    {primaryHref && (
                      <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(primaryHref)}>
                        {primaryLabel}
                      </CTAButton>
                    )}
                    {project.siteUrl?.trim() && primaryHref !== project.siteUrl.trim() && (
                      <Button variant="outlined" color="primary" size="small" sx={secondaryBtnSx} onClick={() => handleProjectClick(project.siteUrl!)}>
                        {viewSiteLabel}
                      </Button>
                    )}
                    {isTimelendrProject && timelendrWindowsUrl && primaryHref !== timelendrWindowsUrl && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                        onClick={() => handleProjectClick(timelendrWindowsUrl)}
                      >
                        {downloadTimelendrPcLabel}
                      </Button>
                    )}
                    {isTimelendrProject && timelendrMacosUrl && primaryHref !== timelendrMacosUrl && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                        onClick={() => handleProjectClick(timelendrMacosUrl)}
                      >
                        {downloadTimelendrMacosLabel}
                      </Button>
                    )}
                    {!isTimelendrProject && project.downloadUrl?.trim() && primaryHref !== project.downloadUrl.trim() && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                        onClick={() => handleProjectClick(project.downloadUrl!)}
                      >
                        {downloadProjectLabel}
                      </Button>
                    )}
                  </>
                )}
              </Box>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}

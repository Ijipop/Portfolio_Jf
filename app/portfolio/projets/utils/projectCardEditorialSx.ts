'use client'

import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'

type BeigeThemeColors = {
  bg: string
  bg2: string
  primary: string
  accent: string
  secondary: string
}

export type ProjectCardRootSxOptions = {
  isTopologyRoute: boolean
  isSiteDark: boolean
  isSiteLight: boolean
  presentationMode: string
  primary: string
  secondary: string
  hasProjectAction: boolean
  customTheme: BeigeThemeColors
  beigePresentationBgUrl: string | null | undefined
  theme: Theme
}

function getHoverAccentStyles(): Record<string, unknown> {
  return {
    '@media (prefers-reduced-motion: no-preference)': {
      '&:hover': {
        transform: 'translateY(-2px)',
        '&::before': {
          opacity: 1,
        },
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      '&:hover::before': {
        opacity: 1,
      },
    },
  }
}

export function getProjectCardRootSx({
  isTopologyRoute,
  isSiteDark,
  isSiteLight,
  presentationMode,
  primary,
  secondary,
  hasProjectAction,
  customTheme,
  beigePresentationBgUrl,
  theme,
}: ProjectCardRootSxOptions): Record<string, unknown> {
  const radius = DESIGN_TOKENS.borderRadius.medium
  const base: Record<string, unknown> = {
    width: '100%',
    height: '100%',
    minHeight: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: { xs: 1.25, md: 1.5 },
    p: { xs: 1.25, sm: 1.35, md: 1.5 },
    position: 'relative',
    borderRadius: `${radius}px`,
    overflow: 'hidden',
    cursor: hasProjectAction ? 'pointer' : 'default',
    transition: DESIGN_TOKENS.transitions.normal,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      borderRadius: '3px 0 0 3px',
      background: `linear-gradient(180deg, ${primary}, ${secondary})`,
      opacity: 0,
      transition: DESIGN_TOKENS.transitions.normal,
      pointerEvents: 'none',
    },
    ...getHoverAccentStyles(),
  }

  if (isSiteDark) {
    return {
      ...base,
      background: `${SITE_DARK.bgElevated} !important`,
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      border: `1px solid ${SITE_DARK.border}`,
      boxShadow: '0 4px 20px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)',
      '@media (prefers-reduced-motion: no-preference)': {
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: SITE_DARK.borderHover,
          boxShadow: `0 8px 28px rgba(0,0,0,0.38), 0 0 0 1px ${SITE_DARK.borderHover}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          '&::before': { opacity: 1 },
        },
      },
    }
  }

  if (isSiteLight || presentationMode === 'beige') {
    return {
      ...base,
      background: `${SITE_LIGHT.bgElevated} !important`,
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      border: `1px solid ${SITE_LIGHT.border}`,
      boxShadow: '0 4px 18px rgba(92, 77, 60, 0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
    }
  }

  if (isTopologyRoute) {
    return {
      ...base,
      background:
        theme.palette.mode === 'dark'
          ? `${SITE_DARK.bgElevated} !important`
          : `${SITE_LIGHT.bgElevated} !important`,
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      border: `1px solid ${theme.palette.mode === 'dark' ? SITE_DARK.border : SITE_LIGHT.border}`,
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 4px 18px rgba(92, 77, 60, 0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
    }
  }

  return {
    ...base,
    background:
      theme.palette.mode === 'dark'
        ? `${SITE_DARK.bgElevated} !important`
        : `${SITE_LIGHT.bgElevated} !important`,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? SITE_DARK.border : SITE_LIGHT.border
    }`,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 4px 20px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)'
        : '0 4px 18px rgba(92, 77, 60, 0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
  }
}

export type ProjectCardThumbnailSxOptions = {
  primary: string
  theme: Theme
  isSiteDark: boolean
}

export function getProjectCardThumbnailSx({
  primary,
  theme,
  isSiteDark,
}: ProjectCardThumbnailSxOptions): Record<string, unknown> {
  return {
    position: 'relative',
    flexShrink: 0,
    width: { xs: 52, md: 56 },
    height: { xs: 52, md: 56 },
    borderRadius: '12px',
    overflow: 'hidden',
    border: `1px solid ${alpha(primary, 0.2)}`,
    bgcolor: isSiteDark
      ? SITE_DARK.surfaceHover
      : theme.palette.mode === 'dark'
        ? 'rgba(15, 23, 42, 0.5)'
        : 'rgba(241, 245, 249, 0.9)',
    '@media (prefers-reduced-motion: no-preference)': {
      '.project-card-row:hover & img': {
        transform: 'scale(1.05)',
      },
    },
    '& img': {
      transition: DESIGN_TOKENS.transitions.slow,
    },
  }
}

export function getProjectCardContentSx(): Record<string, unknown> {
  return {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  }
}

export function getProjectCardTitleRowSx(): Record<string, unknown> {
  return {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 0.5,
    mb: 0.35,
    minWidth: 0,
  }
}

export function getProjectCardLinkIconSx(isSiteDark: boolean): Record<string, unknown> {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: '50%',
    bgcolor: isSiteDark ? alpha('#ffffff', 0.1) : 'rgba(255,255,255,0.94)',
    color: isSiteDark ? SITE_DARK.text : '#0f172a',
    border: isSiteDark ? `1px solid ${SITE_DARK.border}` : 'none',
    boxShadow: isSiteDark ? 'none' : '0 2px 8px rgba(15,23,42,0.12)',
    marginLeft: 'auto',
  }
}

export function getProjectCardActionsSx(): Record<string, unknown> {
  return {
    pt: 0.15,
    mt: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 0.5,
    flexShrink: 0,
    width: '100%',
  }
}

export function getProjectCardDownloadGridSx(count: number): Record<string, unknown> {
  return {
    display: 'grid',
    gridTemplateColumns: count > 1 ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)',
    gap: 0.5,
    width: '100%',
  }
}

export type ProjectCardGhostBtnOptions = {
  primary: string
  isSiteDark: boolean
  mutedTextColor: string
}

export function getProjectCardGhostBtnSx({
  primary,
  isSiteDark,
  mutedTextColor,
}: ProjectCardGhostBtnOptions): Record<string, unknown> {
  return {
    minHeight: 32,
    py: 0.35,
    px: 0.75,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: 1.2,
    textTransform: 'none',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    bgcolor: isSiteDark ? alpha('#ffffff', 0.08) : alpha(primary, 0.1),
    color: mutedTextColor,
    border: `1px solid ${isSiteDark ? alpha('#ffffff', 0.16) : alpha(primary, 0.28)}`,
    '&:hover': {
      bgcolor: isSiteDark ? alpha('#ffffff', 0.12) : alpha(primary, 0.16),
      borderColor: isSiteDark ? SITE_DARK.borderHover : alpha(primary, 0.4),
      color: isSiteDark ? SITE_DARK.text : mutedTextColor,
    },
    '& .MuiButton-startIcon': {
      marginRight: 0.5,
      marginLeft: 0,
    },
  }
}

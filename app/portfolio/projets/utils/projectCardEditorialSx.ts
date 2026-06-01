'use client'

import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { getCardSurfaceSx, getProjectImageLetterboxGlassSx } from '@/components/shared/cardSurface'
import { getBeigePresentationTopologyBackground } from '@/utils/syncPortfolioThemeToDocument'
type BeigeThemeColors = {
  bg: string
  bg2: string
  primary: string
  accent: string
  secondary: string
}

export type ProjectCardRootSxOptions = {
  isTopologyRoute: boolean
  presentationMode: string
  primary: string
  hasProjectAction: boolean
  customTheme: BeigeThemeColors
  beigePresentationBgUrl: string | null | undefined
  theme: Theme
}

export function getProjectCardRootSx({
  isTopologyRoute,
  presentationMode,
  primary,
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
    flexDirection: 'column',
    borderRadius: `${radius}px`,
    overflow: 'hidden',
    cursor: hasProjectAction ? 'pointer' : 'default',
    transition: DESIGN_TOKENS.transitions.normal,
    '@media (prefers-reduced-motion: reduce)': {
      '&:hover .project-card-image img': {
        transform: 'none',
      },
    },
    '&:hover .project-card-image img': {
      transform: 'scale(1.03)',
    },
    '& .project-card-image img': {
      transition: DESIGN_TOKENS.transitions.slow,
    },
  }

  if (presentationMode === 'beige') {
    return {
      ...base,
      background: `${getBeigePresentationTopologyBackground(customTheme, beigePresentationBgUrl)} !important`,
      backgroundAttachment: { xs: 'scroll', md: 'fixed' },
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      border: `1px solid ${primary}28`,
      boxShadow: '0 8px 24px rgba(92, 77, 60, 0.1), 0 0 0 1px rgba(139, 126, 114, 0.08)',
    }
  }

  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flat',
    level: 'soft',
    interactive: true,
  })

  if (isTopologyRoute && Object.keys(surfaceSx).length > 0) {
    return { ...base, ...surfaceSx }
  }

  return {
    ...base,
    background: 'transparent !important',
    backdropFilter: 'blur(12px) saturate(1.04)',
    WebkitBackdropFilter: 'blur(12px) saturate(1.04)',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : `${primary}28`
    }`,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 32px rgba(0,0,0,0.35)'
        : '0 8px 28px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.05)',
  }
}

export type ProjectCardMediaSxOptions = {
  isTopologyRoute: boolean
  theme: Theme
}

export function getProjectCardMediaSx({ isTopologyRoute, theme }: ProjectCardMediaSxOptions): Record<string, unknown> {
  const letterbox = getProjectImageLetterboxGlassSx(theme.palette.mode, {
    nestedTint: !isTopologyRoute,
  })

  return {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    flexShrink: 0,
    ...letterbox,
    ...(theme.palette.mode === 'dark' && isTopologyRoute
      ? { bgcolor: alpha('#0f172a', 0.4) }
      : !isTopologyRoute
        ? { bgcolor: alpha('#f1f5f9', 0.85) }
        : {}),
  }
}

export const projectCardImageFillAnchorSx = {
  position: 'absolute',
  inset: 0,
} as const

export function getProjectCardStatusOverlaySx(): Record<string, unknown> {
  return {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    maxWidth: 'calc(100% - 56px)',
    '& .MuiChip-root': {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: '0 2px 10px rgba(15,23,42,0.18)',
    },
  }
}

export function getProjectCardLinkIconOverlaySx(): Record<string, unknown> {
  return {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    bgcolor: alpha('#ffffff', 0.94),
    color: '#0f172a',
    boxShadow: '0 2px 10px rgba(15,23,42,0.14)',
    pointerEvents: 'none',
  }
}

export function getProjectCardBodySx(): Record<string, unknown> {
  return {
    px: { xs: 1.25, sm: 1.5, md: 1.75 },
    pt: { xs: 1.15, sm: 1.25, md: 1.35 },
    pb: { xs: 1.25, sm: 1.35, md: 1.5 },
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  }
}

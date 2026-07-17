'use client'

import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'

export type SoftwareCardRootSxOptions = {
  isSiteDark: boolean
  isSiteLight: boolean
  presentationMode: string
  primary: string
  hasProjectAction: boolean
  theme: Theme
}

export function getSoftwareCardRootSx({
  isSiteDark,
  isSiteLight,
  presentationMode,
  primary,
  hasProjectAction,
  theme,
}: SoftwareCardRootSxOptions): Record<string, unknown> {
  const dark = isSiteDark || theme.palette.mode === 'dark'
  const light = isSiteLight || presentationMode === 'beige'

  return {
    width: '100%',
    height: '100%',
    minHeight: { xs: 300, md: 340 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: { xs: 1.75, md: 2 },
    p: { xs: 2.25, sm: 2.5, md: 2.75 },
    position: 'relative',
    borderRadius: { xs: '22px', md: '26px' },
    overflow: 'hidden',
    cursor: hasProjectAction ? 'pointer' : 'default',
    transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
    background: dark
      ? `linear-gradient(165deg, ${SITE_DARK.bgElevated} 0%, rgba(15,15,20,0.96) 55%, ${alpha(primary, 0.08)} 100%)`
      : light
        ? `linear-gradient(165deg, ${SITE_LIGHT.bgElevated} 0%, ${SITE_LIGHT.surface} 60%, ${alpha(primary, 0.08)} 100%)`
        : `linear-gradient(165deg, ${SITE_DARK.bgElevated} 0%, rgba(15,15,20,0.96) 100%)`,
    border: `1px solid ${dark ? SITE_DARK.border : light ? SITE_LIGHT.border : SITE_DARK.border}`,
    boxShadow: dark
      ? '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 12px 36px rgba(92, 77, 60, 0.12), inset 0 1px 0 rgba(255,255,255,0.65)',
    '&:focus-visible': {
      outline: `2px solid ${primary}`,
      outlineOffset: 3,
    },
    '@media (prefers-reduced-motion: no-preference)': {
      '&:hover': {
        transform: hasProjectAction ? 'translateY(-4px)' : 'none',
        borderColor: dark ? SITE_DARK.borderHover : light ? SITE_LIGHT.borderHover : SITE_DARK.borderHover,
        boxShadow: dark
          ? `0 18px 48px rgba(0,0,0,0.42), 0 0 0 1px ${alpha(primary, 0.22)}, 0 0 40px ${alpha(primary, 0.12)}`
          : `0 18px 44px rgba(92, 77, 60, 0.16), 0 0 0 1px ${alpha(primary, 0.2)}`,
        '& .software-card-icon, & .showcase-card-media': {
          transform: 'scale(1.02)',
          borderColor: alpha(primary, 0.45),
        },
      },
    },
  }
}

export function getSoftwareCardIconTileSx({
  primary,
  isSiteDark,
  theme,
}: {
  primary: string
  isSiteDark: boolean
  theme: Theme
}): Record<string, unknown> {
  const dark = isSiteDark || theme.palette.mode === 'dark'
  return {
    position: 'relative',
    alignSelf: 'center',
    width: { xs: 96, sm: 112, md: 128 },
    height: { xs: 96, sm: 112, md: 128 },
    borderRadius: { xs: '22px', md: '26px' },
    overflow: 'hidden',
    flexShrink: 0,
    border: `1px solid ${alpha(primary, 0.28)}`,
    bgcolor: dark ? alpha('#000', 0.35) : alpha('#fff', 0.72),
    boxShadow: dark
      ? `0 10px 28px rgba(0,0,0,0.35), 0 0 24px ${alpha(primary, 0.12)}`
      : `0 10px 24px rgba(92, 77, 60, 0.12)`,
    transition: 'transform 0.28s ease, border-color 0.28s ease',
    '& img': {
      transition: DESIGN_TOKENS.transitions.slow,
    },
  }
}

/** Aperçu screenshot pour cartes Sites web (même famille visuelle que logiciel). */
export function getShowcaseCardMediaSx({
  primary,
  isSiteDark,
  theme,
}: {
  primary: string
  isSiteDark: boolean
  theme: Theme
}): Record<string, unknown> {
  const dark = isSiteDark || theme.palette.mode === 'dark'
  return {
    position: 'relative',
    alignSelf: 'stretch',
    width: '100%',
    aspectRatio: '16 / 10',
    borderRadius: { xs: '18px', md: '20px' },
    overflow: 'hidden',
    flexShrink: 0,
    border: `1px solid ${alpha(primary, 0.24)}`,
    bgcolor: dark ? alpha('#000', 0.4) : alpha('#fff', 0.65),
    boxShadow: dark
      ? `0 10px 28px rgba(0,0,0,0.32), 0 0 20px ${alpha(primary, 0.1)}`
      : `0 10px 24px rgba(92, 77, 60, 0.1)`,
    transition: 'transform 0.28s ease, border-color 0.28s ease',
    '& img': {
      transition: DESIGN_TOKENS.transitions.slow,
    },
  }
}

export function getSoftwareCardBodySx(): Record<string, unknown> {
  return {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'center',
    gap: 0.75,
  }
}

export function getSoftwareCardActionsSx(): Record<string, unknown> {
  return {
    mt: 'auto',
    pt: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 0.75,
    width: '100%',
  }
}

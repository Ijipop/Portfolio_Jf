import { alpha } from '@mui/material/styles'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'

/** Surfaces glass sombres V2 — réutilisables dans Footer, HeaderSection, etc. */
export const siteDarkGlassSurface = {
  background: `${SITE_DARK.surface} !important`,
  backdropFilter: 'blur(14px) saturate(1.05)',
  WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
  borderColor: `${SITE_DARK.border} !important`,
  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04) !important`,
} as const

export const siteDarkGlassSurfaceTop = {
  ...siteDarkGlassSurface,
  borderTop: `1px solid ${SITE_DARK.border}`,
  boxShadow: `0 -8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04) !important`,
} as const

/** Surfaces glass mode Site clair. */
export const siteLightGlassSurface = {
  background: `${SITE_LIGHT.surface} !important`,
  backdropFilter: 'blur(14px) saturate(1.05)',
  WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
  borderColor: `${SITE_LIGHT.border} !important`,
  boxShadow: `0 8px 28px rgba(92, 77, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.65) !important`,
} as const

export const siteLightGlassSurfaceTop = {
  ...siteLightGlassSurface,
  borderTop: `1px solid ${SITE_LIGHT.border}`,
  boxShadow: `0 -8px 28px rgba(92, 77, 60, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.65) !important`,
} as const

/** Fond de bandeau section en refonte V2 sombre. */
export function siteDarkSectionBandBackground(primary: string, secondary: string): string {
  return `linear-gradient(145deg, rgba(8, 8, 12, 0.94) 0%, ${alpha(primary, 0.14)} 42%, ${alpha(secondary, 0.1)} 100%)`
}

/** Fond de bandeau section en mode Site clair. */
export function siteLightSectionBandBackground(primary: string, secondary: string): string {
  return `linear-gradient(145deg, rgba(255, 254, 251, 0.96) 0%, ${alpha(primary, 0.08)} 42%, ${alpha(secondary, 0.06)} 100%)`
}

export const siteDarkSectionBandBorder = SITE_DARK.border
export const siteLightSectionBandBorder = SITE_LIGHT.border

export const siteDarkSectionBandShadow =
  '0 22px 52px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(234, 88, 12, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.06)'

export const siteLightSectionBandShadow =
  '0 22px 48px rgba(92, 77, 60, 0.12), 0 0 0 1px rgba(234, 88, 12, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.72)'

export const siteDarkSectionBandHoverShadow =
  '0 28px 58px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(234, 88, 12, 0.18)'

export const siteLightSectionBandHoverShadow =
  '0 28px 54px rgba(92, 77, 60, 0.16), 0 0 0 1px rgba(234, 88, 12, 0.14)'

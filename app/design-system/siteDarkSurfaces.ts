import { alpha } from '@mui/material/styles'
import { SITE_DARK } from '@/design-system/siteDark'

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

/** Fond de bandeau section (démos, preuve client, etc.) en refonte V2 sombre. */
export function siteDarkSectionBandBackground(primary: string, secondary: string): string {
  return `linear-gradient(145deg, rgba(8, 8, 12, 0.94) 0%, ${alpha(primary, 0.14)} 42%, ${alpha(secondary, 0.1)} 100%)`
}

export const siteDarkSectionBandBorder = SITE_DARK.border

export const siteDarkSectionBandShadow =
  '0 22px 52px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(234, 88, 12, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.06)'

export const siteDarkSectionBandHoverShadow =
  '0 28px 58px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(234, 88, 12, 0.18)'

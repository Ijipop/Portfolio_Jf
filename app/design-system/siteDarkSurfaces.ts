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

/**
 * Styles du cadre polaroid autour des vignettes projet (réutilisable : cartes `/projets`, section perso À propos, etc.).
 */
import type { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { DESIGN_TOKENS } from '@/design-system/constants'

export type PolaroidFramePalette = {
  presentationMode: 'beige' | 'dev'
  primary: string
  secondary: string
  accent: string
  isNonDefaultPalette: boolean
}

export const POLAROID_OUTER_RADIUS = DESIGN_TOKENS.borderRadius.medium
export const POLAROID_INNER_RADIUS = Math.max(8, DESIGN_TOKENS.borderRadius.medium - 4)

/** Cadre externe polaroid : mode Site quasi blanc, mode Création = teintes primary / secondary / accent. */
export function polaroidOuterFrameSx(theme: Theme, p: PolaroidFramePalette): Record<string, unknown> {
  const isDark = theme.palette.mode === 'dark'

  if (p.presentationMode === 'dev') {
    return {
      borderRadius: `${POLAROID_OUTER_RADIUS}px`,
      /** Coupe halos/glow du cadre : frange orangée tout en bas (rendu sous-pixels entre coins arrondis). */
      overflow: 'hidden',
      px: { xs: 1.25, sm: 1.5 },
      py: { xs: 1.25, sm: 1.5 },
      background: isDark
        ? `linear-gradient(158deg, ${alpha(p.primary, 0.34)} 0%, ${alpha(p.secondary, 0.22)} 26%, ${alpha(p.accent, 0.18)} 44%, rgba(14,14,22,0.96) 74%)`
        : `linear-gradient(148deg, #ffffff 0%, ${alpha(p.primary, 0.15)} 40%, ${alpha(p.secondary, 0.13)} 68%, ${alpha(p.accent, 0.11)} 100%)`,
      /** Bord/halo trop forts empilent un filet très clair sur le rayon bas du cadre photo (composite GPU vs trou intérieur). */
      border: isDark
        ? `1px solid ${alpha(p.accent, 0.34)}`
        : `1px solid ${alpha(p.accent, 0.28)}`,
      boxShadow: isDark
        ? `0 10px 30px rgba(0,0,0,0.48), 0 0 22px ${alpha(p.accent, 0.14)}`
        : `0 4px 14px rgba(15,23,42,0.06), 0 0 20px ${alpha(p.accent, 0.09)}`,
    }
  }

  return {
    borderRadius: `${POLAROID_OUTER_RADIUS}px`,
    overflow: 'hidden',
    px: { xs: 1.25, sm: 1.5 },
    py: { xs: 1.25, sm: 1.5 },
    background: isDark
      ? alpha('#151920', 0.94)
      : p.isNonDefaultPalette
        ? '#fffaf7'
        : '#fffcfb',
    border: isDark
      ? `1px solid ${alpha(p.primary, 0.42)}`
      : `1px solid ${alpha(p.primary, 0.26)}`,
    boxShadow: isDark
      ? `0 10px 28px rgba(0,0,0,0.45), 0 0 20px ${alpha(p.primary, 0.14)}`
      : `0 4px 14px rgba(15,23,42,0.07), 0 0 24px ${alpha(p.primary, 0.11)}`,
    ...(p.isNonDefaultPalette && !isDark
      ? {
          boxShadow: `0 4px 14px rgba(92,77,60,0.06), 0 0 22px ${alpha(p.primary, 0.12)}`,
        }
      : {}),
  }
}

/**
 * Fenêtre sous le média (`contain`). Conteneur `polaroidImageFillAnchorSx` ci-dessous : parent `relative` avec `aspectRatio` ;
 * il enveloppe obligatoirement `next/image` en `fill` pour éviter un filet clair sous-pixels sous le média.
 */
export const polaroidImageFillAnchorSx: Record<string, unknown> = {
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  borderRadius: 'inherit',
  lineHeight: 0,
  fontSize: 0,
  '& > span': {
    display: 'block',
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    lineHeight: 0,
  },
  '& img': {
    display: 'block',
    maxHeight: '100%',
    objectPosition: 'center',
  },
}

export function polaroidInnerPhotoHoleSx(theme: Theme, p: PolaroidFramePalette): Record<string, unknown> {
  const isDark = theme.palette.mode === 'dark'

  return {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: `${POLAROID_INNER_RADIUS}px`,
    /** Évite la « ligne » sous / autour du span Next/Image quand aucun anchor absolu n’est utilisé. */
    lineHeight: 0,
    fontSize: 0,
    background: isDark
      ? `linear-gradient(165deg, ${alpha('#252b3d', 0.98)} 0%, ${alpha(p.primary, 0.16)} 45%, ${alpha('#0f141f', 1)} 100%)`
      : `linear-gradient(180deg, #fbf8f3 0%, ${alpha(p.primary, 0.09)} 55%, ${alpha(p.secondary, p.isNonDefaultPalette ? 0.12 : 0.07)} 100%)`,
    /** Pas d’highlight blanc inset ni de bord clair : frange visible en mode cré / sombre. */
    boxShadow:
      theme.palette.mode === 'dark' ? 'none' : `inset 0 1px 2px ${alpha(p.primary, 0.06)}`,
    /** En dark, une bordure primary apparaît souvent comme un filet orangé continu au pied du média avec `contain`. */
    border: theme.palette.mode === 'dark' ? 'none' : `1px solid ${alpha(p.primary, 0.12)}`,
  }
}

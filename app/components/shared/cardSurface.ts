'use client'

import type { PaletteMode } from '@mui/material'

export type CardSurfaceVariant = 'glass' | 'elevated' | 'flat' | 'flipFace'
export type CardSurfaceLevel = 'soft' | 'balanced'

interface CardSurfaceOptions {
  isTopologyRoute: boolean
  variant?: CardSurfaceVariant
  level?: CardSurfaceLevel
  interactive?: boolean
}

const BACKGROUND_BY_LEVEL: Record<CardSurfaceLevel, Record<CardSurfaceVariant, string>> = {
  balanced: {
    glass:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(241, 245, 249, 0.14) 50%, rgba(255, 255, 255, 0.16) 100%)',
    elevated:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.22) 0%, rgba(241, 245, 249, 0.17) 50%, rgba(255, 255, 255, 0.2) 100%)',
    flat:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.14) 0%, rgba(241, 245, 249, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%)',
    flipFace:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.24) 0%, rgba(241, 245, 249, 0.2) 50%, rgba(255, 255, 255, 0.22) 100%)',
  },
  soft: {
    glass:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.13) 0%, rgba(241, 245, 249, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%)',
    elevated:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(241, 245, 249, 0.12) 50%, rgba(255, 255, 255, 0.14) 100%)',
    flat:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(241, 245, 249, 0.08) 50%, rgba(255, 255, 255, 0.09) 100%)',
    flipFace:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(241, 245, 249, 0.14) 50%, rgba(255, 255, 255, 0.16) 100%)',
  },
}

const SHADOW_BY_LEVEL: Record<CardSurfaceLevel, Record<CardSurfaceVariant, string>> = {
  balanced: {
    glass: '0 8px 24px rgba(2, 6, 23, 0.2)',
    elevated: '0 10px 30px rgba(2, 6, 23, 0.24)',
    flat: '0 6px 18px rgba(2, 6, 23, 0.16)',
    flipFace: '0 10px 28px rgba(2, 6, 23, 0.24)',
  },
  soft: {
    glass: '0 6px 18px rgba(2, 6, 23, 0.14)',
    elevated: '0 8px 22px rgba(2, 6, 23, 0.18)',
    flat: '0 4px 14px rgba(2, 6, 23, 0.12)',
    flipFace: '0 8px 22px rgba(2, 6, 23, 0.18)',
  },
}

export function getCardSurfaceSx({
  isTopologyRoute,
  variant = 'elevated',
  level = 'balanced',
  interactive = true,
}: CardSurfaceOptions): Record<string, unknown> {
  if (!isTopologyRoute) return {}

  const background = BACKGROUND_BY_LEVEL[level][variant]
  const baseShadow = SHADOW_BY_LEVEL[level][variant]

  return {
    background: `${background} !important`,
    backdropFilter: 'blur(14px) saturate(1.05)',
    WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
    border: '1px solid rgba(148, 163, 184, 0.22) !important',
    boxShadow: `${baseShadow}, inset 0 1px 0 rgba(255, 255, 255, 0.2) !important`,
    ...(interactive && {
      '&:hover': {
        transform: 'none !important',
        boxShadow:
          '0 10px 28px rgba(2, 6, 23, 0.26), 0 0 0 1px rgba(56, 189, 248, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.24) !important',
      },
    }),
  }
}

/**
 * Bandes autour d’une image en object-fit contain.
 * - Par défaut : transparent (pour laisser voir le fond de page à travers une carte « vitrée »).
 * - nestedTint : léger dégradé + flou quand le parent est opaque (ex. dialogue admin).
 */
export function getProjectImageLetterboxGlassSx(
  mode: PaletteMode,
  options?: { nestedTint?: boolean }
) {
  if (options?.nestedTint) {
    if (mode === 'dark') {
      return {
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(148,163,184,0.12) 100%)',
        backdropFilter: 'blur(12px) saturate(1.08)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.08)',
      } as const
    }
    return {
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.3) 50%, rgba(241,245,249,0.42) 100%)',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
    } as const
  }
  return {
    background: 'transparent',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
  } as const
}


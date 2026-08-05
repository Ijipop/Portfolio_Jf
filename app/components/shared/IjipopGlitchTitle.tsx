'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { dimHex, hexToRgb } from '@/utils/colorUtils'

/** Dégradé « marque » : mode Site (beige) — ambre → orange (#ea580c) → rouge brique. */
export const BRAND_GLITCH_GRADIENT =
  'linear-gradient(165deg, #ffedd5 0%, #fdba74 14%, #f48c06 38%, #e85d04 62%, #b91c1c 86%, #7f1d1d 100%)'

/** Extrêmes pour border-beam / lueur de contour — même famille que BRAND_GLITCH_GRADIENT (mode beige uniquement). */
export const BRAND_BORDER_BEAM_COLOR_FROM = '#fdba74'
export const BRAND_BORDER_BEAM_COLOR_TO = '#e85d04'
const BRAND_GLITCH_LAYER = '#9a3412'
const GLITCH_BEFORE_OPACITY = 0.42
const GLITCH_AFTER_OPACITY = 0.38

function mixWithWhite(hex: string, ratio: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  const t = Math.max(0, Math.min(1, ratio))
  const r = Math.round(rgb.r + (255 - rgb.r) * t)
  const g = Math.round(rgb.g + (255 - rgb.g) * t)
  const b = Math.round(rgb.b + (255 - rgb.b) * t)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/** Dégradé ijipop aligné sur la palette active (sous-pages). */
export function buildPaletteGlitchGradient(primary: string, secondary: string, accent: string): string {
  return `linear-gradient(165deg, ${mixWithWhite(primary, 0.88)} 0%, ${mixWithWhite(primary, 0.45)} 14%, ${primary} 38%, ${secondary} 62%, ${dimHex(secondary, 0.28)} 86%, ${dimHex(accent, 0.42)} 100%)`
}

export type IjipopGlitchTitleProps = {
  /** Texte brut (traduction). En `page`, affichage en capitales pour coller aux titres de section. */
  text: string
  /** `hero` = accueil (ijipop en minuscules). `page` = titres Projets / À propos / Contact. `gateway` = phrase welcome, casse préservée. */
  variant?: 'hero' | 'page' | 'gateway'
  /** Override optionnel (ex. hero split 2 colonnes). */
  sx?: SxProps<Theme>
}

export default function IjipopGlitchTitle({ text, variant = 'page', sx }: IjipopGlitchTitleProps) {
  const { locale } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const { beigeDark } = useBeigeDark()
  const { primary, secondary, accent } = useThemeColors()

  const { fillGradient, glitchRgb } = useMemo(() => {
    /** Gateway + mode Site (beige) : dégradé marque orange ijipop. */
    if (variant === 'gateway' || presentationMode === 'beige') {
      return { fillGradient: BRAND_GLITCH_GRADIENT, glitchRgb: BRAND_GLITCH_LAYER }
    }
    return {
      fillGradient: buildPaletteGlitchGradient(primary, secondary, accent),
      glitchRgb: dimHex(primary, 0.5),
    }
  }, [variant, presentationMode, beigeDark, primary, secondary, accent])

  const display =
    variant === 'hero'
      ? text.toLowerCase()
      : variant === 'gateway'
        ? text
        : text.toLocaleUpperCase(locale === 'en' ? 'en-US' : 'fr-FR')
  const dataText = variant === 'hero' ? text : display

  const fontSize =
    variant === 'hero'
      ? {
          xs: 'clamp(4.35rem, 18vw, 5.25rem)',
          sm: 'clamp(6.7rem, 15vw, 9.2rem)',
          md: 'clamp(9.25rem, 13vw, 12.25rem)',
          lg: 'clamp(10.5rem, 13vw, 14.25rem)',
          xl: 'clamp(12rem, 12vw, 15.75rem)',
        }
      : variant === 'gateway'
        ? {
            /** Aligné sur HomeGatewayClient (halo + titre partagent le même scale). */
            xs: 'clamp(3.1rem, 14vw, 4.1rem)',
            sm: 'clamp(4.2rem, 10vw, 5.4rem)',
            md: 'clamp(4.6rem, 6vw, 5.8rem)',
            lg: 'clamp(5rem, 4.5vw, 6.1rem)',
            xl: 'clamp(5.2rem, 3.8vw, 6.25rem)',
          }
        : { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }

  const letterSpacing =
    variant === 'hero'
      ? { xs: '0.03em', sm: '0.05em' }
      : variant === 'gateway'
        ? { xs: '0.015em', sm: '0.02em' }
        : { xs: '0.05em', sm: '0.1em' }

  /** Gateway : le parent (eyebrow + suffix) gère l’espacement. */
  const mb = variant === 'hero' ? { xs: 0.9, sm: 1.2 } : 0

  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-block',
        fontSize,
        maxWidth: variant === 'gateway' || variant === 'hero' ? '100%' : undefined,
        textAlign: variant === 'gateway' || variant === 'hero' ? 'center' : undefined,
        mx: variant === 'hero' ? 'auto' : undefined,
        ...(variant === 'hero' && {
          '@media (max-width: 599.95px) and (max-height: 760px)': {
            fontSize: 'clamp(4rem, 16vw, 4.8rem)',
          },
          '@media (max-height: 680px)': {
            fontSize: 'clamp(4.5rem, 14vw, 6.5rem)',
          },
          '@media (max-height: 500px)': {
            fontSize: 'clamp(3.25rem, 12vw, 4rem)',
          },
          /** Laptops ~15" : l’ancien scale (~9–11rem) faisait chevaucher texte et CTAs. */
          '@media (min-width: 900px) and (max-height: 920px)': {
            fontSize: 'clamp(5.2rem, 7.5vw, 6.75rem)',
          },
          '@media (min-width: 900px) and (max-height: 800px)': {
            fontSize: 'clamp(4.4rem, 6.5vw, 5.6rem)',
          },
          '@media (min-width: 900px) and (max-height: 700px)': {
            fontSize: 'clamp(3.6rem, 5.5vw, 4.6rem)',
          },
        }),
        ...(variant === 'gateway' && {
          '@media (max-height: 720px)': {
            fontSize: 'clamp(3rem, 9vw, 5.2rem)',
          },
          '@media (max-height: 640px)': {
            fontSize: 'clamp(2.6rem, 8vw, 4.2rem)',
          },
          '@media (max-height: 500px)': {
            fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
          },
        }),
        fontWeight: 900,
        letterSpacing,
        textTransform: 'none',
        lineHeight: 1.2,
        overflow: 'visible',
        mb,
        color: 'transparent',
        ...((sx ?? {}) as object),
      }}
    >
      <Box
        component="span"
        data-text={dataText}
        sx={{
          position: 'relative',
          display: 'inline-block',
          overflow: 'visible',
          /** Espace pour les points des i/j (tittles) — évite le clip avec background-clip:text. */
          py: '0.12em',
          color: 'transparent',
          backgroundColor: 'transparent',
          backgroundImage: fillGradient,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitBoxDecorationBreak: 'clone',
          boxDecorationBreak: 'clone',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          animation: 'ijipopGlitchBase 3.6s infinite steps(1, end)',
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            '&::before, &::after': {
              animation: 'none',
              opacity: 0,
            },
          },
          '@keyframes ijipopGlitchBase': {
            '0%, 74%, 100%': { transform: 'translate(0, 0) skewX(0deg)', opacity: 1 },
            '75%': { transform: 'translate(0, 0) skewX(-6deg)', opacity: 0.92 },
            '76%': { transform: 'translate(0, 0) skewX(6deg)', opacity: 1 },
            '77%': { transform: 'translate(0, 0) skewX(-4deg)', opacity: 0.95 },
            '78%': { transform: 'translate(0, 0) skewX(0deg)', opacity: 1 },
          },
          '&::before, &::after': {
            content: 'attr(data-text)',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.92,
          },
          '&::before': {
            color: glitchRgb,
            transform: 'translate(-1px, 0)',
            clipPath: 'polygon(0 0%, 100% 0%, 100% 24%, 0 24%)',
            animation: 'ijipopGlitchTop 3.1s infinite steps(2, end)',
            opacity: GLITCH_BEFORE_OPACITY,
          },
          '&::after': {
            color: glitchRgb,
            transform: 'translate(1px, 0)',
            clipPath: 'polygon(0 76%, 100% 76%, 100% 100%, 0 100%)',
            animation: 'ijipopGlitchBottom 2.8s infinite steps(2, end)',
            opacity: GLITCH_AFTER_OPACITY,
          },
          '@keyframes ijipopGlitchTop': {
            '0%, 60%, 100%': {
              transform: 'translate(0, 0)',
              clipPath: 'polygon(0 0%, 100% 0%, 100% 24%, 0 24%)',
            },
            '61%': { transform: 'translate(-5px, -2px)', clipPath: 'polygon(0 6%, 100% 6%, 100% 32%, 0 32%)' },
            '62%': { transform: 'translate(6px, 1px)', clipPath: 'polygon(0 0%, 100% 0%, 100% 18%, 0 18%)' },
            '63%': { transform: 'translate(-4px, 0)', clipPath: 'polygon(0 10%, 100% 10%, 100% 36%, 0 36%)' },
            '64%': { transform: 'translate(3px, -1px)', clipPath: 'polygon(0 2%, 100% 2%, 100% 26%, 0 26%)' },
          },
          '@keyframes ijipopGlitchBottom': {
            '0%, 56%, 100%': {
              transform: 'translate(0, 0)',
              clipPath: 'polygon(0 76%, 100% 76%, 100% 100%, 0 100%)',
            },
            '57%': { transform: 'translate(6px, 2px)', clipPath: 'polygon(0 82%, 100% 82%, 100% 100%, 0 100%)' },
            '58%': { transform: 'translate(-6px, -1px)', clipPath: 'polygon(0 72%, 100% 72%, 100% 98%, 0 98%)' },
            '59%': { transform: 'translate(4px, 0)', clipPath: 'polygon(0 78%, 100% 78%, 100% 100%, 0 100%)' },
            '60%': { transform: 'translate(-3px, 1px)', clipPath: 'polygon(0 74%, 100% 74%, 100% 99%, 0 99%)' },
          },
        }}
      >
        {display}
      </Box>
    </Typography>
  )
}

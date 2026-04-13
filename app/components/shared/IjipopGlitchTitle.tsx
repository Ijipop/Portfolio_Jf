'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLanguage } from '@/contexts/LanguageContext'

/** Dégradé commun accueil + sous-pages : ambre → orange → rouge brique. */
const BRAND_GLITCH_GRADIENT =
  'linear-gradient(165deg, #ffedd5 0%, #fdba74 14%, #fb923c 38%, #ea580c 62%, #b91c1c 86%, #7f1d1d 100%)'
const GLITCH_LAYER = '#9a3412'
const GLITCH_BEFORE_OPACITY = 0.42
const GLITCH_AFTER_OPACITY = 0.38
/** Halo discret sur le gros titre accueil uniquement. */
const HERO_AMBER_GLOW = '0 0 22px rgba(234, 88, 12, 0.42)'

export type IjipopGlitchTitleProps = {
  /** Texte brut (traduction). En `page`, affichage en capitales pour coller aux titres de section. */
  text: string
  /** `hero` = accueil (ijipop en minuscules). `page` = titres Projets / À propos / Contact. */
  variant?: 'hero' | 'page'
}

export default function IjipopGlitchTitle({ text, variant = 'page' }: IjipopGlitchTitleProps) {
  const { locale } = useLanguage()

  const display =
    variant === 'hero'
      ? text.toLowerCase()
      : text.toLocaleUpperCase(locale === 'en' ? 'en-US' : 'fr-FR')
  const dataText = variant === 'hero' ? text : display

  const fontSize =
    variant === 'hero'
      ? { xs: '3.5rem', sm: '5rem', md: '6.6rem' }
      : { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }

  const letterSpacing = variant === 'hero' ? { xs: '0.03em', sm: '0.05em' } : { xs: '0.05em', sm: '0.1em' }

  const mb = variant === 'hero' ? { xs: 0.9, sm: 1.2 } : 0

  const fillGradient = BRAND_GLITCH_GRADIENT
  const glitchRgb = GLITCH_LAYER
  const textShadow = variant === 'hero' ? HERO_AMBER_GLOW : 'none'

  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-block',
        fontSize,
        fontWeight: 900,
        letterSpacing,
        textTransform: 'none',
        lineHeight: 1.05,
        mb,
        color: 'transparent',
      }}
    >
      <Box
        component="span"
        data-text={dataText}
        sx={{
          position: 'relative',
          display: 'inline-block',
          color: 'transparent',
          backgroundColor: 'transparent',
          backgroundImage: fillGradient,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow,
          animation: 'ijipopGlitchBase 3.6s infinite steps(1, end)',
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

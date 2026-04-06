'use client'

import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlassContainer } from '@/components/GlassCard'
import ScramblingText from '@/components/ScramblingText'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'

const ASCII_FIGURE = [' o ', '/|\\', '/ \\'].join('\n')

/** Réduit veuves / orphelines sur mobile (mode beige, texte normal). */
const mobileProseWrapSx = {
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
  orphans: 2,
  widows: 2,
} as const

/** Pivot pour les regards gauche / droite (haut du personnage). */
const LOOK_TRANSFORM_ORIGIN = '50% 28%'
/** Pivot pour le coup de pied (pieds au sol). */
const KICK_TRANSFORM_ORIGIN = '50% 100%'
const LOOK_TILT_DEG = 11
const LOOK_BEAT = 0.26
const AFTER_ARRIVE_PAUSE = 0.22
const BEFORE_KICK_PAUSE = 0.2

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HomeHeroIntroCard() {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary, secondary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const scrambleEnabled = presentationMode === 'dev'

  const [scramblePhase, setScramblePhase] = useState<'chaos' | 'settled'>('chaos')
  const asciiRef = useRef<HTMLElement>(null)
  const cardWrapRef = useRef<HTMLDivElement>(null)
  const ranKickRef = useRef(false)

  useEffect(() => {
    if (!scrambleEnabled) {
      setScramblePhase('chaos')
      ranKickRef.current = false
    }
  }, [scrambleEnabled])

  const runKickSequence = useCallback(() => {
    const ascii = asciiRef.current
    const card = cardWrapRef.current
    if (!ascii || !card) return false

    if (prefersReducedMotion()) {
      gsap.set(ascii, { clearProps: 'all' })
      gsap.set(card, { clearProps: 'all' })
      setScramblePhase('settled')
      gsap.set(ascii, { opacity: 0, pointerEvents: 'none' })
      return true
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        setScramblePhase('settled')
        gsap.to(ascii, {
          opacity: 0,
          x: -16,
          duration: 0.45,
          ease: 'power2.in',
          delay: 0.15,
          onComplete: () => {
            gsap.set(ascii, { pointerEvents: 'none' })
          },
        })
      },
    })

    gsap.set(ascii, {
      x: -44,
      opacity: 1,
      rotation: 0,
      transformOrigin: LOOK_TRANSFORM_ORIGIN,
      pointerEvents: 'none',
    })
    gsap.set(card, { x: 0 })

    tl.to(ascii, { x: 0, duration: 0.85 })
    // Regards gauche / droite (plusieurs fois) avant le coup
    tl.to(ascii, { rotation: -LOOK_TILT_DEG, duration: LOOK_BEAT, ease: 'sine.inOut' }, `+=${AFTER_ARRIVE_PAUSE}`)
    tl.to(ascii, { rotation: LOOK_TILT_DEG, duration: LOOK_BEAT * 1.05, ease: 'sine.inOut' })
    tl.to(ascii, { rotation: -LOOK_TILT_DEG * 0.9, duration: LOOK_BEAT * 0.95, ease: 'sine.inOut' })
    tl.to(ascii, { rotation: LOOK_TILT_DEG * 0.9, duration: LOOK_BEAT * 0.95, ease: 'sine.inOut' })
    tl.to(ascii, { rotation: -LOOK_TILT_DEG * 0.75, duration: LOOK_BEAT * 0.85, ease: 'sine.inOut' })
    tl.to(ascii, { rotation: LOOK_TILT_DEG * 0.75, duration: LOOK_BEAT * 0.85, ease: 'sine.inOut' })
    tl.to(ascii, { rotation: 0, duration: LOOK_BEAT * 0.9, ease: 'sine.inOut' })
    tl.add(() => {
      gsap.set(ascii, { transformOrigin: KICK_TRANSFORM_ORIGIN })
    }, `+=${BEFORE_KICK_PAUSE}`)
    tl.to(ascii, { rotation: -14, x: 14, duration: 0.1, ease: 'power4.in' })
    tl.to(card, { x: 14, duration: 0.06, ease: 'power1.inOut' }, '<')
    tl.to(ascii, { rotation: 0, x: 0, duration: 0.2, ease: 'power2.out' })
    tl.to(card, { x: -6, duration: 0.05, ease: 'power1.inOut' }, '<0.02')
    tl.to(card, { x: 4, duration: 0.05 })
    tl.to(card, { x: 0, duration: 0.12, ease: 'power2.out' })
    return true
  }, [])

  useLayoutEffect(() => {
    if (!scrambleEnabled || ranKickRef.current) return

    let cancelled = false
    let raf = 0
    let killAscii: HTMLElement | null = null
    let killCard: HTMLElement | null = null

    const tryRun = () => {
      if (cancelled || ranKickRef.current) return
      if (!runKickSequence()) {
        raf = requestAnimationFrame(tryRun)
        return
      }
      killAscii = asciiRef.current
      killCard = cardWrapRef.current
      ranKickRef.current = true
    }

    raf = requestAnimationFrame(tryRun)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      if (killAscii) gsap.killTweensOf(killAscii)
      if (killCard) gsap.killTweensOf(killCard)
    }
  }, [scrambleEnabled, runKickSequence])

  const titleLetterSx =
    scrambleEnabled
      ? {
          textShadow: `0 2px 4px rgba(0,0,0,0.1), 0 0 20px ${primary}40`,
          background: `linear-gradient(135deg, ${primary}, ${secondary}, ${primary})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s ease-in-out infinite',
        }
      : undefined

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 1, sm: 1.5, md: 2 },
        position: 'relative',
        mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
      }}
    >
      {scrambleEnabled && (
        <Box
          ref={asciiRef}
          component="pre"
          aria-hidden
          sx={{
            m: 0,
            p: 0,
            flexShrink: 0,
            fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.78rem' },
            lineHeight: 1.2,
            color: textColor,
            opacity: 0.9,
            alignSelf: { xs: 'center', sm: 'flex-end' },
            userSelect: 'none',
            pb: { sm: 1 },
          }}
        >
          {ASCII_FIGURE}
        </Box>
      )}

      <Box ref={cardWrapRef} sx={{ flex: { sm: '0 1 auto' }, width: { xs: '100%', sm: 'auto' }, maxWidth: '100%' }}>
        <GlassContainer
          sx={{
            ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
            p: { xs: 2.5, sm: 3, md: 3.5 },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <ScramblingText
              text="Jean-François Lefebvre"
              enabled={scrambleEnabled}
              phase={scramblePhase}
              variant="h1"
              sx={{
                mb: 1,
                ...DESIGN_TOKENS.typography.h1,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                ...(scrambleEnabled
                  ? {}
                  : {
                      textShadow: `0 2px 4px rgba(0,0,0,0.1), 0 0 20px ${primary}40`,
                      background: `linear-gradient(135deg, ${primary}, ${secondary}, ${primary})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 4s ease-in-out infinite',
                    }),
              }}
              letterSx={titleLetterSx}
            />
            <ScramblingText
              text={t('home.role')}
              enabled={scrambleEnabled}
              phase={scramblePhase}
              variant="h4"
              sx={{
                mb: 1,
                ...DESIGN_TOKENS.typography.h4,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                fontWeight: 400,
                opacity: 0.9,
                color: textColor,
                ...(!scrambleEnabled ? mobileProseWrapSx : {}),
              }}
            />
            <ScramblingText
              text={t('home.intro')}
              enabled={scrambleEnabled}
              phase={scramblePhase}
              variant="body1"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mb: 2,
                ...DESIGN_TOKENS.typography.body1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: textColor,
                opacity: 0.9,
                whiteSpace: 'pre-line',
                hyphens: 'auto',
                ...(!scrambleEnabled ? mobileProseWrapSx : {}),
              }}
            />
          </Box>
        </GlassContainer>
      </Box>
    </Box>
  )
}
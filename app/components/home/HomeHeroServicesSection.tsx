'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { usePathname, useSearchParams } from 'next/navigation'
import { GlassContainer } from '@/components/GlassCard'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import SectionDisplayTitle from '@/components/shared/SectionDisplayTitle'
import HomeHeroDevCodeIntro from '@/components/home/HomeHeroDevCodeIntro'
import { TextAnimate } from '@/components/ui/text-animate'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const mobileProseWrapSx = {
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
  orphans: 2,
  widows: 2,
} as const

export default function HomeHeroServicesSection() {
  const theme = useTheme()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const isDevPresentation = presentationMode === 'dev'
  /** Mode Site / beige : hero texte avec Magic UI TextAnimate (pas la cascade GSAP Créa). */
  const isBeigeSiteHero = presentationMode === 'beige'
  /** `/?spotlight=1` : mode Créa mais carte = contenu « Site » seulement, pour tester le spotlight (sans séquence ASCII). */
  const spotlightPreview = searchParams.get('spotlight') === '1'
  const isDark = theme.palette.mode === 'dark'
  const glassRef = useRef<HTMLDivElement>(null)
  const spotOverlayRef = useRef<HTMLDivElement>(null)
  const [spotlightEnabled, setSpotlightEnabled] = useState(false)
  const reducedMotionPref = useReducedMotion()
  /** `null` avant hydratation — on n’applique l’état « figé » que si l’OS demande explicitement moins de mouvement. */
  const reduceMotion = reducedMotionPref === true
  const mainSectionP1 = t('home.mainSectionP1')
  const mainSectionP2 = t('home.mainSectionP2')
  const introText = mainSectionP2 ? `${mainSectionP1}\n\n${mainSectionP2}` : mainSectionP1

  /** Cascade hero : timings volontairement lents (lisibilité + sensation « premium »). */
  const heroCascadeEase = 'power2.out' as const
  const heroCascadeGap = 0.5
  const heroCascade = {
    kicker: { y: 12, duration: 1.15 },
    title: { y: 22, duration: 1.35 },
    lead: { y: 14, duration: 1.15 },
    subline: { y: 12, duration: 1.05 },
    sublead: { y: 10, duration: 0.95 },
  } as const

  useGSAP(
    () => {
      const root = glassRef.current
      if (!root || isBeigeSiteHero) return

      const $ = (sel: string) => root.querySelector<HTMLElement>(sel)

      const cascadeKeys = ['kicker', 'title', 'lead', 'subline', 'sublead'] as const
      const cascadeNodes = cascadeKeys.map((k) => $(`[data-home-hero="${k}"]`)).filter(Boolean) as HTMLElement[]

      if (reduceMotion) {
        gsap.set(cascadeNodes, { opacity: 1, y: 0, clearProps: 'transform' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: heroCascadeEase } })
      const kicker = $('[data-home-hero="kicker"]')
      const title = $('[data-home-hero="title"]')
      const lead = $('[data-home-hero="lead"]')
      const subline = $('[data-home-hero="subline"]')
      const sublead = $('[data-home-hero="sublead"]')

      if (kicker) tl.from(kicker, { y: heroCascade.kicker.y, opacity: 0, duration: heroCascade.kicker.duration })
      if (title) tl.from(title, { y: heroCascade.title.y, opacity: 0, duration: heroCascade.title.duration }, `+=${heroCascadeGap}`)
      if (lead) tl.from(lead, { y: heroCascade.lead.y, opacity: 0, duration: heroCascade.lead.duration }, `+=${heroCascadeGap}`)
      if (subline) tl.from(subline, { y: heroCascade.subline.y, opacity: 0, duration: heroCascade.subline.duration }, `+=${heroCascadeGap}`)
      if (sublead) tl.from(sublead, { y: heroCascade.sublead.y, opacity: 0, duration: heroCascade.sublead.duration }, `+=${heroCascadeGap}`)
    },
    { scope: glassRef, dependencies: [reduceMotion, isBeigeSiteHero] }
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (reduceMotion) return
    const fine = window.matchMedia('(pointer: fine)').matches
    setSpotlightEnabled(fine)
  }, [reduceMotion])

  const showDevAsciiIntro = isDevPresentation && !spotlightPreview

  const handleSpotPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!spotlightEnabled) return
      const root = glassRef.current
      const spot = spotOverlayRef.current
      if (!root || !spot) return
      const r = root.getBoundingClientRect()
      const x = ((e.clientX - r.left) / Math.max(1, r.width)) * 100
      const y = ((e.clientY - r.top) / Math.max(1, r.height)) * 100
      root.style.setProperty('--spot-x', `${x}%`)
      root.style.setProperty('--spot-y', `${y}%`)
      spot.style.opacity = '1'
    },
    [spotlightEnabled]
  )

  const handleSpotPointerLeave = useCallback(() => {
    const spot = spotOverlayRef.current
    if (spot) spot.style.opacity = '0'
  }, [])

  const heroTitleBlockGsap = (
    <Box sx={{ mb: { xs: 2.25, sm: 2.75 } }}>
      <Typography
        data-home-hero="kicker"
        component="p"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1.25, sm: 1.5 },
          py: 0.6,
          mt: { xs: 0.2, sm: 0.35 },
          mb: { xs: 2.2, sm: 2.45 },
          borderRadius: 999,
          fontSize: { xs: '0.78rem', sm: '0.82rem' },
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: primary,
          backgroundColor: alpha(primary, isDark ? 0.18 : 0.1),
          border: `1px solid ${alpha(primary, isDark ? 0.34 : 0.18)}`,
          boxShadow: isDark ? '0 10px 24px rgba(0,0,0,0.22)' : '0 8px 20px rgba(15, 23, 42, 0.08)',
        }}
      >
        {t('home.mainSectionEyebrow')}
      </Typography>
      <Box data-home-hero="title">
        <SectionDisplayTitle
          component="h2"
          id="home-main-section-heading"
          sx={{
            mb: 0,
            maxWidth: { xs: 'min(100%, 780px)', sm: 820 },
            fontWeight: 800,
            fontSize: { xs: 'clamp(1.7rem, 5.8vw, 2.2rem)', sm: '2.45rem', md: '2.95rem' },
            lineHeight: { xs: 1.12, sm: 1.14 },
            letterSpacing: '-0.035em',
            textShadow: isDark ? '0 10px 26px rgba(0,0,0,0.34)' : '0 10px 30px rgba(15, 23, 42, 0.08)',
          }}
        >
          {t('home.mainSectionTitle')}
        </SectionDisplayTitle>
      </Box>
      <Box data-home-hero="lead">
        <Typography
          component="p"
          variant="body1"
          sx={{
            mt: { xs: 1.35, sm: 1.5 },
            mb: 0,
            mx: 'auto',
            maxWidth: { xs: 'min(100%, 640px)', sm: 680 },
            px: { xs: 0.5, sm: 0 },
            textAlign: 'center',
            color: textColor,
            opacity: 0.9,
            fontSize: { xs: '1.02rem', sm: '1.08rem' },
            fontWeight: 600,
            lineHeight: 1.55,
            letterSpacing: '0.01em',
            ...mobileProseWrapSx,
          }}
        >
          {t('home.mainSectionLeadMobile')}
        </Typography>
      </Box>
    </Box>
  )

  const heroTitleBlockBeige = (
    <Box sx={{ mb: { xs: 2.25, sm: 2.75 }, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1.25, sm: 1.5 },
          py: 0.6,
          mt: { xs: 0.2, sm: 0.35 },
          mb: { xs: 2.2, sm: 2.45 },
          borderRadius: 999,
          backgroundColor: alpha(primary, isDark ? 0.18 : 0.1),
          border: `1px solid ${alpha(primary, isDark ? 0.34 : 0.18)}`,
          boxShadow: isDark ? '0 10px 24px rgba(0,0,0,0.22)' : '0 8px 20px rgba(15, 23, 42, 0.08)',
        }}
      >
        <TextAnimate
          as="span"
          animation="blurInUp"
          by="character"
          once
          delay={0}
          duration={0.55}
          className="text-center text-[0.78rem] font-extrabold uppercase tracking-[0.08em] sm:text-[0.82rem]"
          style={{ color: primary }}
        >
          {t('home.mainSectionEyebrow')}
        </TextAnimate>
      </Box>
      <Box
        component="h2"
        id="home-main-section-heading"
        sx={{
          mb: 0,
          maxWidth: { xs: 'min(100%, 780px)', sm: 820 },
          mx: 'auto',
          color: textColor,
          fontWeight: 800,
          fontSize: { xs: 'clamp(1.7rem, 5.8vw, 2.2rem)', sm: '2.45rem', md: '2.95rem' },
          lineHeight: { xs: 1.12, sm: 1.14 },
          letterSpacing: '-0.035em',
          textShadow: isDark ? '0 10px 26px rgba(0,0,0,0.34)' : '0 10px 30px rgba(15, 23, 42, 0.08)',
          textAlign: 'center',
        }}
      >
        <TextAnimate
          as="span"
          animation="blurInUp"
          by="word"
          once
          delay={0.08}
          duration={0.65}
          className="inline text-center"
        >
          {t('home.mainSectionTitle')}
        </TextAnimate>
      </Box>
      <Box
        sx={{
          mt: { xs: 1.35, sm: 1.5 },
          mx: 'auto',
          maxWidth: { xs: 'min(100%, 640px)', sm: 680 },
          px: { xs: 0.5, sm: 0 },
          color: textColor,
          opacity: 0.9,
          '& p': {
            fontSize: { xs: '1.02rem', sm: '1.08rem' },
            fontWeight: 600,
            lineHeight: 1.55,
            letterSpacing: '0.01em',
            ...mobileProseWrapSx,
          },
        }}
      >
        <TextAnimate
          as="p"
          animation="blurInUp"
          by="word"
          once
          delay={0.16}
          duration={0.6}
          className="text-center"
        >
          {t('home.mainSectionLeadMobile')}
        </TextAnimate>
      </Box>
    </Box>
  )

  const heroTitleBlock =
    isBeigeSiteHero && !reduceMotion ? heroTitleBlockBeige : heroTitleBlockGsap

  return (
    <Box
      component="section"
      aria-labelledby="home-main-section-heading"
      sx={{
        /** Sous la carte → grille : 60px desktop, légèrement moins sur mobile. */
        mb: { xs: 'clamp(40px, 8vw, 60px)', sm: '60px' },
        maxWidth: { xs: '100%', sm: 860, md: 980, lg: 1080 },
        mx: 'auto',
        width: '100%',
        px: { xs: 0.5, sm: 0 },
      }}
    >
      <GlassContainer
        ref={glassRef}
        onPointerMove={handleSpotPointerMove}
        onPointerLeave={handleSpotPointerLeave}
        sx={{
          ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
          position: 'relative',
          overflow: showDevAsciiIntro ? 'visible' : 'hidden',
          '--spot-x': '50%',
          '--spot-y': '42%',
          p: { xs: 3, sm: 4, md: 4.5 },
          width: '100%',
          /** Sur mobile, 32px sur une carte quasi pleine largeur paraît trop « pilule » ; on aligne sur le rayon des cartes grille. */
          borderRadius: {
            xs: DESIGN_TOKENS.borderRadius.medium,
            sm: DESIGN_TOKENS.borderRadius.xlarge,
          },
          border: `1px solid ${alpha(primary, isDark ? 0.22 : 0.14)}`,
          boxShadow: isDark
            ? '0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            : `${DESIGN_TOKENS.shadows.card.light}, 0 1px 0 rgba(255,255,255,0.85) inset`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(165px, 36%)',
            height: 3,
            borderRadius: '0 0 8px 8px',
            background: `linear-gradient(90deg, transparent, ${alpha(primary, 0.65)}, transparent)`,
            opacity: 0.9,
          },
        }}
      >
        {spotlightEnabled ? (
          <Box
            ref={spotOverlayRef}
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              opacity: 0,
              transition: 'opacity 0.35s ease',
              background: `radial-gradient(
                min(480px, 85vw) circle at var(--spot-x, 50%) var(--spot-y, 42%),
                ${alpha(primary, isDark ? 0.26 : 0.16)} 0%,
                transparent 50%
              )`,
              mixBlendMode: isDark ? 'screen' : 'multiply',
            }}
          />
        ) : null}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {showDevAsciiIntro ? (
            <HomeHeroDevCodeIntro
              name="Jean-François Lefebvre"
              role={t('home.role')}
              intro={introText}
              isTopologyRoute={isTopologyRoute}
              embedded
              walkSurfaceRef={glassRef}
              sectionTitle={heroTitleBlock}
            />
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                pt: { xs: 0.5, sm: 0.75 },
                px: { xs: 0.5, sm: 1 },
              }}
            >
              {heroTitleBlock}

              <Box data-home-hero="subline">
                {isBeigeSiteHero && !reduceMotion ? (
                  <Box
                    sx={{
                      maxWidth: '100%',
                      mx: 'auto',
                      mb: { xs: 1.75, sm: 2 },
                      color: textColor,
                      opacity: 0.92,
                      overflowX: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      scrollbarGutter: 'stable',
                      whiteSpace: 'nowrap',
                      '& p': {
                        lineHeight: 1.75,
                        fontSize: { xs: '1rem', sm: '1.0625rem' },
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                      },
                    }}
                  >
                    <TextAnimate
                      as="p"
                      animation="blurInUp"
                      by="word"
                      once
                      delay={0.22}
                      duration={0.55}
                      className="text-center"
                    >
                      {mainSectionP1}
                    </TextAnimate>
                  </Box>
                ) : (
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{
                      color: textColor,
                      opacity: 0.92,
                      textAlign: 'center',
                      lineHeight: 1.75,
                      fontSize: { xs: '1rem', sm: '1.0625rem' },
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      maxWidth: '100%',
                      mx: 'auto',
                      mb: { xs: 1.75, sm: 2 },
                      whiteSpace: 'nowrap',
                      overflowX: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      scrollbarGutter: 'stable',
                    }}
                  >
                    {mainSectionP1}
                  </Typography>
                )}
              </Box>

              {mainSectionP2 ? (
                <Box data-home-hero="sublead">
                  {isBeigeSiteHero && !reduceMotion ? (
                    <Box
                      sx={{
                        maxWidth: 540,
                        mx: 'auto',
                        mb: 0,
                        color: textColor,
                        opacity: 0.78,
                        '& p': {
                          lineHeight: 1.75,
                          fontSize: { xs: '0.98rem', sm: '1.03rem' },
                          fontWeight: 400,
                          ...mobileProseWrapSx,
                        },
                      }}
                    >
                      <TextAnimate
                        as="p"
                        animation="blurInUp"
                        by="word"
                        once
                        delay={0.28}
                        duration={0.55}
                        className="text-center"
                      >
                        {mainSectionP2}
                      </TextAnimate>
                    </Box>
                  ) : (
                    <Typography
                      component="p"
                      variant="body1"
                      sx={{
                        color: textColor,
                        opacity: 0.78,
                        textAlign: 'center',
                        lineHeight: 1.75,
                        fontSize: { xs: '0.98rem', sm: '1.03rem' },
                        fontWeight: 400,
                        maxWidth: 540,
                        mx: 'auto',
                        mb: 0,
                        ...mobileProseWrapSx,
                      }}
                    >
                      {mainSectionP2}
                    </Typography>
                  )}
                </Box>
              ) : null}
            </Box>
          )}
        </Box>
      </GlassContainer>
    </Box>
  )
}

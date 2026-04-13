'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlassContainer } from '@/components/GlassCard'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import {
  figureWithSword,
  greetFigure,
  sitFigure,
  swordGlyph,
  walkingFigure,
} from '@/components/home/asciiHero/figures'
import type { DevHeroPhase } from '@/components/home/asciiHero/phases'
import { prefersReducedMotion } from '@/components/home/asciiHero/phases'
import { ASCII_BUILD_CODE, ASCII_SWORD_CODE } from '@/components/home/asciiHero/snippets'
import {
  CHAR_MS,
  CHAR_MS_CLEAR,
  FALL_DURATION_S,
  FALL_FROM_Y,
  IDLE_MS,
  IDLE_POSE_MS,
  PICKUP_MOVE_DURATION_S,
  PICKUP_PAUSE_S,
  PING_DURATION_S,
  SCROLL_DELTA_THRESHOLD,
  SWORD_DROP_DURATION_S,
  SWORD_LAND_Y,
  SWORD_START_Y,
  TILT_MAX_DEG,
  WALK_SHORT_DURATION_S,
  WALK_SHORT_RATIO,
} from '@/components/home/asciiHero/timings'
import { useCodeTypewriter } from '@/components/home/asciiHero/useCodeTypewriter'

export { ASCII_BUILD_CODE } from '@/components/home/asciiHero/snippets'

type InteractionLock = 'none' | 'scroll' | 'idle'

export type HomeHeroDevCodeIntroProps = {
  name: string
  role: string
  isTopologyRoute: boolean
}

export default function HomeHeroDevCodeIntro({ name, role, isTopologyRoute }: HomeHeroDevCodeIntroProps) {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()

  const [phase, setPhase] = useState<DevHeroPhase>('typingBuild')
  const [codeSource, setCodeSource] = useState(ASCII_BUILD_CODE)
  const [legFrame, setLegFrame] = useState<0 | 1>(0)
  const [asciiReplace, setAsciiReplace] = useState<string | null>(null)
  const [holdingSword, setHoldingSword] = useState(false)
  const [swordSceneVisible, setSwordSceneVisible] = useState(false)

  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const typewriterMode =
    phase === 'typingBuild' ? 'forward' : phase === 'clearCode' ? 'backward' : phase === 'typingSword' ? 'forward' : 'off'

  const { typedLen, resetLength, setLength } = useCodeTypewriter({
    source: codeSource,
    charMs: phase === 'clearCode' ? CHAR_MS_CLEAR : CHAR_MS,
    mode: typewriterMode,
    onForwardComplete: () => {
      const p = phaseRef.current
      if (p === 'typingBuild') setPhase('falling')
      if (p === 'typingSword') setPhase('swordScene')
    },
    onBackwardComplete: () => {
      setCodeSource(ASCII_SWORD_CODE)
      resetLength()
      setPhase('typingSword')
    },
  })

  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fallLayerRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const swordRef = useRef<HTMLDivElement>(null)
  const walkTlRef = useRef<gsap.core.Timeline | null>(null)
  const rotateToRef = useRef<((value: number) => void) | null>(null)
  const lockRef = useRef<InteractionLock>('none')
  const hasScrollGreetedRef = useRef(false)
  const idleTimerRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const greetTlRef = useRef<gsap.core.Timeline | null>(null)
  const cinematicLockRef = useRef(false)

  const reduced = prefersReducedMotion()

  const asciiColor =
    theme.palette.mode === 'dark' ? primary : accent || primary
  const asciiSx = {
    fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
    fontSize: { xs: '0.68rem', sm: '0.78rem', md: '0.88rem' },
    lineHeight: 1.2,
    color: asciiColor,
    textShadow: `0 0 12px ${asciiColor}55, 0 1px 2px rgba(0,0,0,0.35)`,
    opacity: 0.95,
    userSelect: 'none',
    pointerEvents: 'none',
    whiteSpace: 'pre',
    maxWidth: 'min(100%, 18ch)',
  } as const

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  const isInteractive = phase === 'interactiveWalk' && !reduced

  const scheduleIdle = useCallback(() => {
    if (reduced) return
    if (!isInteractive) return
    clearIdleTimer()
    idleTimerRef.current = window.setTimeout(() => {
      if (lockRef.current !== 'none') return
      const tl = walkTlRef.current
      const tilt = tiltRef.current
      if (!tl || !tilt) return

      lockRef.current = 'idle'
      tl.pause()
      const kind = Math.floor(Math.random() * 3)

      const finishIdle = () => {
        gsap.set(tilt, { scaleY: 1, y: 0 })
        setAsciiReplace(null)
        lockRef.current = 'none'
        walkTlRef.current?.resume()
        scheduleIdle()
      }

      if (kind === 0) {
        setAsciiReplace(sitFigure)
        window.setTimeout(finishIdle, IDLE_POSE_MS)
      } else if (kind === 1) {
        gsap.to(tilt, {
          scaleY: 1.12,
          duration: 0.38,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
          onComplete: finishIdle,
        })
      } else {
        gsap.to(tilt, {
          y: -12,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
          onComplete: finishIdle,
        })
      }
    }, IDLE_MS)
  }, [reduced, isInteractive, clearIdleTimer])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (!prefersReducedMotion()) return
    setCodeSource(ASCII_SWORD_CODE)
    setLength(ASCII_SWORD_CODE.length)
    setHoldingSword(true)
    setPhase('interactiveWalk')
    cinematicLockRef.current = false
  }, [setLength])

  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'falling') return
    const fallEl = fallLayerRef.current
    if (!fallEl) return

    cinematicLockRef.current = true
    gsap.killTweensOf(fallEl)
    gsap.set(fallEl, { y: FALL_FROM_Y })
    const tw = gsap.to(fallEl, {
      y: 0,
      duration: FALL_DURATION_S,
      ease: 'power2.out',
      onComplete: () => setPhase('walkShort'),
    })
    return () => {
      tw.kill()
    }
  }, [phase, reduced])

  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'walkShort') return
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    walkTlRef.current?.kill()
    const maxX = Math.max(0, wrap.offsetWidth - track.offsetWidth)
    const targetX = maxX * WALK_SHORT_RATIO
    gsap.set(track, { x: 0 })

    let leg = 0
    const legTimer = window.setInterval(() => {
      leg ^= 1
      setLegFrame(leg as 0 | 1)
    }, 260)

    const tw = gsap.to(track, {
      x: targetX,
      duration: WALK_SHORT_DURATION_S,
      ease: 'sine.inOut',
      onComplete: () => {
        clearInterval(legTimer)
        setPhase('clearCode')
      },
    })

    return () => {
      clearInterval(legTimer)
      tw.kill()
    }
  }, [phase, reduced])

  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'swordScene') return
    const wrap = wrapRef.current
    const track = trackRef.current
    const sword = swordRef.current
    if (!wrap || !track || !sword) return

    cinematicLockRef.current = true
    setSwordSceneVisible(true)
    gsap.killTweensOf(sword)
    gsap.set(sword, { y: SWORD_START_Y, opacity: 1 })

    const finishScene = () => {
      setHoldingSword(true)
      setSwordSceneVisible(false)
      gsap.set(sword, { opacity: 0, y: SWORD_START_Y })
      cinematicLockRef.current = false
      setPhase('interactiveWalk')
    }

    const tl = gsap.timeline()

    tl.to(sword, {
      y: SWORD_LAND_Y,
      duration: SWORD_DROP_DURATION_S,
      ease: 'bounce.out',
    })

    tl.to(track, {
      x: () => {
        const tr = track.getBoundingClientRect()
        const sr = sword.getBoundingClientRect()
        const handX = tr.left + tr.width * 0.66
        const curX = Number(gsap.getProperty(track, 'x')) || 0
        return curX + (sr.left - handX)
      },
      duration: PICKUP_MOVE_DURATION_S,
      ease: 'power2.inOut',
    })

    tl.call(finishScene, undefined, `+=${PICKUP_PAUSE_S}`)

    return () => {
      tl.kill()
    }
  }, [phase, reduced])

  const buildInteractiveWalk = useCallback(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    walkTlRef.current?.kill()
    const maxX = Math.max(0, wrap.offsetWidth - track.offsetWidth)
    const cx = Number(gsap.getProperty(track, 'x')) || 0
    const clamped = Math.max(0, Math.min(maxX, cx))
    gsap.set(track, { x: clamped })

    const durOut = PING_DURATION_S * (maxX < 1 ? 1 : 1 - clamped / maxX)
    const durBack = PING_DURATION_S * (maxX < 1 ? 1 : clamped / maxX)

    const tl = gsap.timeline({ repeat: -1 })
    tl.to(track, {
      x: maxX,
      duration: Math.max(0.45, durOut),
      ease: 'sine.inOut',
      onComplete: () => setLegFrame(1),
    })
    tl.to(track, {
      x: 0,
      duration: Math.max(0.45, durBack),
      ease: 'sine.inOut',
      onComplete: () => setLegFrame(0),
    })
    walkTlRef.current = tl
  }, [])

  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'interactiveWalk') return
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    buildInteractiveWalk()
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            buildInteractiveWalk()
          })
        : null
    ro?.observe(wrap)

    return () => {
      ro?.disconnect()
      walkTlRef.current?.kill()
      walkTlRef.current = null
    }
  }, [phase, reduced, buildInteractiveWalk])

  useLayoutEffect(() => {
    if (!isInteractive) {
      rotateToRef.current = null
      return
    }
    const el = tiltRef.current
    if (!el) return
    rotateToRef.current = gsap.quickTo(el, 'rotation', { duration: 0.22, ease: 'power2.out' })
    return () => {
      rotateToRef.current = null
    }
  }, [isInteractive])

  useEffect(() => {
    if (!isInteractive) {
      clearIdleTimer()
      return
    }
    lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0
    scheduleIdle()
    return () => clearIdleTimer()
  }, [isInteractive, scheduleIdle, clearIdleTimer])

  useEffect(() => {
    if (!isInteractive) return

    const onScroll = () => {
      scheduleIdle()

      const y = window.scrollY
      const dy = y - lastScrollYRef.current
      lastScrollYRef.current = y

      if (hasScrollGreetedRef.current) return
      if (dy < SCROLL_DELTA_THRESHOLD) return
      if (lockRef.current !== 'none') return

      const tlWalk = walkTlRef.current
      const tilt = tiltRef.current
      if (!tlWalk || !tilt) return

      hasScrollGreetedRef.current = true
      lockRef.current = 'scroll'
      greetTlRef.current?.kill()
      tlWalk.pause()
      setAsciiReplace(greetFigure)

      greetTlRef.current = gsap.timeline({
        onComplete: () => {
          setAsciiReplace(null)
          gsap.set(tilt, { rotation: 0 })
          lockRef.current = 'none'
          walkTlRef.current?.resume()
          scheduleIdle()
        },
      })
      greetTlRef.current.to(tilt, { rotation: -7, duration: 0.12 })
      greetTlRef.current.to(tilt, { rotation: 7, duration: 0.16 })
      greetTlRef.current.to(tilt, { rotation: 0, duration: 0.14 })
      greetTlRef.current.to({}, { duration: 0.55 })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isInteractive, scheduleIdle])

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced) return
    scheduleIdle()
    if (lockRef.current !== 'none' || cinematicLockRef.current) return
    const wrap = wrapRef.current
    const rot = rotateToRef.current
    if (!wrap || !rot) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const half = Math.max(rect.width / 2, 1)
    const nx = (e.clientX - cx) / half
    const deg = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, nx * TILT_MAX_DEG))
    rot(deg)
  }

  const onPointerLeave = () => {
    if (reduced) return
    rotateToRef.current?.(0)
  }

  const showWalker = phase !== 'typingBuild' || reduced
  const displayAscii =
    asciiReplace ?? (holdingSword ? figureWithSword : walkingFigure(legFrame))

  const titleLetterSx = {
    textShadow: `0 2px 4px rgba(0,0,0,0.1), 0 0 20px ${primary}40`,
    background: `linear-gradient(135deg, ${primary}, ${secondary}, ${primary})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 4s ease-in-out infinite',
  } as const

  return (
    <Box
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={() => {
        if (!reduced && isInteractive) scheduleIdle()
      }}
      sx={{
        position: 'relative',
        overflow: 'visible',
        flex: { sm: '0 1 auto' },
        width: { xs: '100%', sm: 'auto' },
        maxWidth: '100%',
      }}
    >
      {showWalker && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            right: 0,
            mb: 0,
            pointerEvents: 'none',
            minHeight: { xs: '6.25rem', sm: '6.75rem', md: '7rem' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {(phase === 'swordScene' || swordSceneVisible) && (
            <Box
              sx={{
                position: 'absolute',
                left: { xs: '58%', sm: '56%' },
                top: 0,
                transform: 'translateX(-50%)',
              }}
            >
              <Box
                ref={swordRef}
                sx={{
                  willChange: 'transform, opacity',
                }}
              >
                <Box component="pre" aria-hidden sx={{ ...asciiSx, m: 0, p: 0, opacity: 0.95 }}>
                  {swordGlyph}
                </Box>
              </Box>
            </Box>
          )}
          <Box ref={trackRef} sx={{ display: 'inline-block', willChange: 'transform' }}>
            <Box ref={fallLayerRef} sx={{ display: 'inline-block', willChange: 'transform' }}>
              <Box
                ref={tiltRef}
                sx={{
                  display: 'inline-block',
                  transformOrigin: '50% 100%',
                  willChange: 'transform',
                }}
              >
                <Box component="pre" aria-hidden sx={{ ...asciiSx, m: 0, p: 0 }}>
                  {displayAscii}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <GlassContainer
        sx={{
          ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
          p: { xs: 2.5, sm: 3, md: 3.5 },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              mb: 1,
              ...DESIGN_TOKENS.typography.h1,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              ...titleLetterSx,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              ...DESIGN_TOKENS.typography.h4,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              fontWeight: 400,
              opacity: 0.9,
              color: textColor,
            }}
          >
            {role}
          </Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              mt: 1,
              p: { xs: 1.25, sm: 1.5 },
              textAlign: 'left',
              maxWidth: 600,
              mx: 'auto',
              mb: 2,
              fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
              fontSize: { xs: '0.7rem', sm: '0.78rem', md: '0.82rem' },
              lineHeight: 1.45,
              color: textColor,
              opacity: 0.95,
              overflowX: 'auto',
              borderRadius: 1,
              bgcolor: (mui) =>
                mui.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box component="code" sx={{ whiteSpace: 'pre', display: 'block' }}>
              {codeSource.slice(0, typedLen)}
            </Box>
          </Box>
        </Box>
      </GlassContainer>
    </Box>
  )
}

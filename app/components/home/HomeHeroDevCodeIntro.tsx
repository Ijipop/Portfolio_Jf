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

/** Snippet affiché en mode Créa : code qui « construit » le bonhomme ASCII. */
export const ASCII_BUILD_CODE = [
  '// figure ASCII',
  'const figure = [',
  "  ' o ',",
  "  '/|\\',",
  "  '/ \\',",
  "].join('\\n')",
].join('\n')

const CHAR_MS = 34
const PING_DURATION_S = 3.2

const LINE_HEAD = ' o '
const LINE_BODY = '/|\\'
const LINE_LEGS = ['/ \\', '\\ /'] as const

function walkingFigure(legFrame: 0 | 1) {
  return [LINE_HEAD, LINE_BODY, LINE_LEGS[legFrame]].join('\n')
}

const GREET_FIGURE = [' \\o/ ', '  |  ', ' / \\ '].join('\n')
const SIT_FIGURE = [' o ', '/|\\', ' ¯¯¯ '].join('\n')

const IDLE_MS = 15_000
const IDLE_POSE_MS = 1600
const TILT_MAX_DEG = 7
const SCROLL_DELTA_THRESHOLD = 16

type DevIntroPhase = 'typing' | 'walking'
type InteractionLock = 'none' | 'scroll' | 'idle'

export type HomeHeroDevCodeIntroProps = {
  name: string
  role: string
  isTopologyRoute: boolean
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HomeHeroDevCodeIntro({ name, role, isTopologyRoute }: HomeHeroDevCodeIntroProps) {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const codeLen = ASCII_BUILD_CODE.length

  const [phase, setPhase] = useState<DevIntroPhase>('typing')
  const [typedLen, setTypedLen] = useState(0)
  const [legFrame, setLegFrame] = useState<0 | 1>(0)
  const [asciiReplace, setAsciiReplace] = useState<string | null>(null)

  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const walkTlRef = useRef<gsap.core.Timeline | null>(null)
  const rotateToRef = useRef<((value: number) => void) | null>(null)
  const lockRef = useRef<InteractionLock>('none')
  const hasScrollGreetedRef = useRef(false)
  const idleTimerRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const greetTlRef = useRef<gsap.core.Timeline | null>(null)


  const asciiColor =
    theme.palette.mode === 'dark' ? primary : accent || primary
  const asciiSx = {
    fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
    fontSize: { xs: '0.55rem', sm: '0.62rem', md: '0.7rem' },
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

  const scheduleIdle = useCallback(() => {
    if (prefersReducedMotion()) return
    if (phase !== 'walking') return
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
        setAsciiReplace(SIT_FIGURE)
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
  }, [phase, clearIdleTimer])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion()) {
      setTypedLen(codeLen)
      setPhase('walking')
    }
  }, [codeLen])

  useEffect(() => {
    if (phase !== 'typing') return
    if (typedLen >= codeLen) {
      setPhase('walking')
      return
    }
    const id = window.setTimeout(() => {
      setTypedLen((n) => Math.min(n + 1, codeLen))
    }, CHAR_MS)
    return () => clearTimeout(id)
  }, [phase, typedLen, codeLen])

  useLayoutEffect(() => {
    if (phase !== 'walking') return
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    if (prefersReducedMotion()) {
      const maxX = Math.max(0, wrap.offsetWidth - track.offsetWidth)
      gsap.set(track, { x: maxX * 0.5, opacity: 1 })
      if (tiltRef.current) gsap.set(tiltRef.current, { rotation: 0, y: 0, scaleY: 1 })
      return
    }

    const buildWalk = () => {
      walkTlRef.current?.kill()
      const maxX = Math.max(0, wrap.offsetWidth - track.offsetWidth)
      gsap.set(track, { x: 0 })
      const tl = gsap.timeline({ repeat: -1 })
      tl.to(track, {
        x: maxX,
        duration: PING_DURATION_S,
        ease: 'sine.inOut',
        onComplete: () => setLegFrame(1),
      })
      tl.to(track, {
        x: 0,
        duration: PING_DURATION_S,
        ease: 'sine.inOut',
        onComplete: () => setLegFrame(0),
      })
      walkTlRef.current = tl
    }

    buildWalk()
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            buildWalk()
          })
        : null
    ro?.observe(wrap)

    return () => {
      ro?.disconnect()
      walkTlRef.current?.kill()
      walkTlRef.current = null
    }
  }, [phase])

  useLayoutEffect(() => {
    if (phase !== 'walking' || prefersReducedMotion()) {
      rotateToRef.current = null
      return
    }
    const el = tiltRef.current
    if (!el) return
    rotateToRef.current = gsap.quickTo(el, 'rotation', { duration: 0.22, ease: 'power2.out' })
    return () => {
      rotateToRef.current = null
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'walking' || prefersReducedMotion()) {
      clearIdleTimer()
      return
    }
    lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0
    scheduleIdle()
    return () => clearIdleTimer()
  }, [phase, scheduleIdle, clearIdleTimer])

  useEffect(() => {
    if (phase !== 'walking' || prefersReducedMotion()) return

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
      setAsciiReplace(GREET_FIGURE)

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
  }, [phase, scheduleIdle])

  const onPointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion()) return
    scheduleIdle()
    if (lockRef.current !== 'none') return
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
    if (prefersReducedMotion()) return
    rotateToRef.current?.(0)
  }

  const showWalker = phase === 'walking'
  const displayAscii = asciiReplace ?? walkingFigure(legFrame)

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
        if (!prefersReducedMotion()) scheduleIdle()
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
            mb: 0.25,
            pointerEvents: 'none',
          }}
        >
          <Box ref={trackRef} sx={{ display: 'inline-block', willChange: 'transform' }}>
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
              {ASCII_BUILD_CODE.slice(0, typedLen)}
            </Box>
          </Box>
        </Box>
      </GlassContainer>
    </Box>
  )
}

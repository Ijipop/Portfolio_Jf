'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlassContainer } from '@/components/GlassCard'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import {
  explodedHeroFigure,
  figureWithSword,
  greetFigure,
  MONSTER_FIGURES,
  sitFigure,
  swordGlyph,
  walkingFigure,
} from '@/components/home/asciiHero/figures'
import type { DevHeroPhase } from '@/components/home/asciiHero/phases'
import { prefersReducedMotion } from '@/components/home/asciiHero/phases'
import {
  ASCII_BUILD_CODE,
  ASCII_EXPLODE_CODE,
  ASCII_SPAWN_MONSTERS,
  ASCII_SWORD_CODE,
} from '@/components/home/asciiHero/snippets'
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
  SPAWN_SEQUENCE_DELAY_MS,
  COMBAT_HERO_STANDOFF_PX,
  COMBAT_RETURN_CENTER_S,
  COMBAT_PAUSE_AFTER_CENTER_MS,
  COMBAT_SLIME_SHRINK_S,
  COMBAT_KILL_GAP_MS,
  HERO_EXPLODE_END_DELAY_MS,
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
  /** Texte corps comme en mode Site (home.intro). */
  intro: string
  isTopologyRoute: boolean
}

function centerTrackOnCard(
  wrap: HTMLElement,
  card: HTMLElement,
  track: HTMLElement
): void {
  const cr = card.getBoundingClientRect()
  const tr = track.getBoundingClientRect()
  const cardMid = cr.left + cr.width / 2
  const trackMid = tr.left + tr.width / 2
  const adjust = cardMid - trackMid
  const curX = Number(gsap.getProperty(track, 'x')) || 0
  gsap.set(track, { x: curX + adjust })
}

/**
 * Place le héros à gauche du slime (côte à côte), sans superposition :
 * centre du héros = centre du slime − (demi-largeurs + écart).
 */
function approachXForMonster(arena: HTMLElement, track: HTMLElement, monster: HTMLElement): number {
  const trackR = track.getBoundingClientRect()
  const monR = monster.getBoundingClientRect()
  const heroCx = trackR.left + trackR.width / 2
  const monCx = monR.left + monR.width / 2
  const tw = trackR.width
  const mw = monR.width
  const targetHeroCx = monCx - (tw / 2 + mw / 2 + COMBAT_HERO_STANDOFF_PX)
  const delta = targetHeroCx - heroCx
  const curX = Number(gsap.getProperty(track, 'x')) || 0
  const nextX = curX + delta
  const maxX = Math.max(0, arena.offsetWidth - track.offsetWidth)
  return Math.max(0, Math.min(maxX, nextX))
}

/** Remet le héros au centre horizontal de l’arène (avant explosion). */
function targetXCenterHeroInArena(arena: HTMLElement, track: HTMLElement): number {
  const arenaR = arena.getBoundingClientRect()
  const trackR = track.getBoundingClientRect()
  const arenaMid = arenaR.left + arenaR.width / 2
  const heroCx = trackR.left + trackR.width / 2
  const delta = arenaMid - heroCx
  const curX = Number(gsap.getProperty(track, 'x')) || 0
  const nextX = curX + delta
  const maxX = Math.max(0, arena.offsetWidth - track.offsetWidth)
  return Math.max(0, Math.min(maxX, nextX))
}

function tweenXTo(
  el: HTMLElement,
  x: number,
  duration: number,
  ease: string
): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(el, {
      x,
      duration,
      ease,
      overwrite: 'auto',
      onComplete: () => resolve(),
    })
  })
}

const mobileProseWrapSx = {
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
  orphans: 2,
  widows: 2,
} as const

export default function HomeHeroDevCodeIntro({
  name,
  role,
  intro,
  isTopologyRoute,
}: HomeHeroDevCodeIntroProps) {
  const { primary, secondary } = useThemeColors()
  const textColor = useTextColor()

  const [phase, setPhase] = useState<DevHeroPhase>('typingBuild')
  const [codeSource, setCodeSource] = useState(ASCII_BUILD_CODE)
  const [legFrame, setLegFrame] = useState<0 | 1>(0)
  const [asciiReplace, setAsciiReplace] = useState<string | null>(null)
  const [holdingSword, setHoldingSword] = useState(false)
  const [swordSceneVisible, setSwordSceneVisible] = useState(false)
  /** Indices → MONSTER_FIGURES : 0 = centre, 1 = droite (pas de slime gauche). */
  const [monstersAlive, setMonstersAlive] = useState<number[]>([0, 1])
  const [cardWidth, setCardWidth] = useState<number | null>(null)
  /** Fin de séquence : bandeau ASCII masqué, bloc carte = intro (mode Site). */
  const [introRevealed, setIntroRevealed] = useState(false)

  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const combatDoneRef = useRef(false)
  const holdingSwordRef = useRef(false)
  holdingSwordRef.current = holdingSword

  const forwardPhases: DevHeroPhase[] = [
    'typingBuild',
    'typingSword',
    'typingSpawn',
    'typingExplode',
  ]
  const typewriterMode =
    phase === 'clearCode'
      ? 'backward'
      : forwardPhases.includes(phase)
        ? 'forward'
        : 'off'

  const { typedLen, resetLength, setLength } = useCodeTypewriter({
    source: codeSource,
    charMs: phase === 'clearCode' ? CHAR_MS_CLEAR : CHAR_MS,
    mode: typewriterMode,
    onForwardComplete: () => {
      const p = phaseRef.current
      if (p === 'typingBuild') setPhase('falling')
      if (p === 'typingSword') setPhase('swordScene')
      if (p === 'typingSpawn') setPhase('combat')
      if (p === 'typingExplode') setPhase('heroExplode')
    },
    onBackwardComplete: () => {
      setCodeSource(ASCII_SWORD_CODE)
      resetLength()
      setPhase('typingSword')
    },
  })

  const resetLengthRef = useRef(resetLength)
  resetLengthRef.current = resetLength

  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  /** Arène : même largeur que les positions % des slimes. */
  const combatArenaRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fallLayerRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const swordRef = useRef<HTMLDivElement>(null)
  const monsterRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const walkTlRef = useRef<gsap.core.Timeline | null>(null)
  const rotateToRef = useRef<((value: number) => void) | null>(null)
  const lockRef = useRef<InteractionLock>('none')
  const hasScrollGreetedRef = useRef(false)
  const idleTimerRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const greetTlRef = useRef<gsap.core.Timeline | null>(null)
  const cinematicLockRef = useRef(false)
  const spawnTimerRef = useRef<number | null>(null)
  const spawnCombatEnteredRef = useRef(false)
  const monsterIdleTlsRef = useRef<gsap.core.Tween[]>([])
  /** Incrémenté au cleanup : invalide la séquence async combat en cours (évite blocage / double run). */
  const combatAbortRef = useRef(0)
  const heroExplodeRanRef = useRef(false)

  const reduced = prefersReducedMotion()

  /** ASCII toujours blanc (lisible sur fond sombre du hero). */
  const asciiColor = '#ffffff'
  const asciiSx = {
    fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
    fontSize: { xs: '0.68rem', sm: '0.78rem', md: '0.88rem' },
    lineHeight: 1.2,
    color: asciiColor,
    textShadow:
      '0 0 10px rgba(255,255,255,0.35), 0 0 18px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.55)',
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

  const clearSpawnTimer = useCallback(() => {
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current)
      spawnTimerRef.current = null
    }
  }, [])

  const isInteractive = phase === 'interactiveWalk' && !reduced
  /** Tilt seulement en promenade, pas pendant combat ciné. */
  const canTiltHero = phase === 'interactiveWalk' && !reduced
  const isCombat = phase === 'combat' && !reduced
  const codeTypingLocked =
    phase === 'typingSpawn' || phase === 'typingExplode' || phase === 'heroExplode'

  const scheduleIdle = useCallback(() => {
    if (reduced) return
    if (!isInteractive) return
    clearIdleTimer()
    idleTimerRef.current = window.setTimeout(() => {
      if (lockRef.current !== 'none') return
      const tl = walkTlRef.current
      const tilt = tiltRef.current
      if (!tilt) return

      lockRef.current = 'idle'
      if (tl) tl.pause()
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
    setHoldingSword(true)
    setIntroRevealed(true)
    combatDoneRef.current = true
    setPhase('interactiveWalk')
    cinematicLockRef.current = false
  }, [])

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
    if (holdingSwordRef.current) return
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

  const applySwordIdleLayout = useCallback(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    const track = trackRef.current
    if (!wrap || !card || !track) return
    walkTlRef.current?.kill()
    walkTlRef.current = null
    setLegFrame(0)
    centerTrackOnCard(wrap, card, track)
  }, [])

  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'interactiveWalk') return
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    if (holdingSword) {
      applySwordIdleLayout()
      const ro =
        typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(() => {
              applySwordIdleLayout()
            })
          : null
      ro?.observe(wrap)
      if (cardRef.current) ro?.observe(cardRef.current)

      return () => {
        ro?.disconnect()
      }
    }

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
  }, [phase, reduced, holdingSword, buildInteractiveWalk, applySwordIdleLayout])

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => {
      setCardWidth(card.offsetWidth)
    })
    ro.observe(card)
    setCardWidth(card.offsetWidth)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) return
    if (phase !== 'interactiveWalk') return
    if (!holdingSword) return
    if (combatDoneRef.current) return

    clearSpawnTimer()
    spawnTimerRef.current = window.setTimeout(() => {
      if (phaseRef.current !== 'interactiveWalk') return
      cinematicLockRef.current = true
      setCodeSource(ASCII_SPAWN_MONSTERS)
      resetLength()
      setPhase('typingSpawn')
    }, SPAWN_SEQUENCE_DELAY_MS)

    return () => clearSpawnTimer()
  }, [phase, holdingSword, reduced, resetLength, clearSpawnTimer])

  useEffect(() => {
    if (phase === 'combat') {
      cinematicLockRef.current = false
      setMonstersAlive([0, 1])
    }
  }, [phase])

  /** Secours : passage typingSpawn → combat quand le snippet spawn est entièrement affiché. */
  useEffect(() => {
    if (phase !== 'typingSpawn') {
      spawnCombatEnteredRef.current = false
      return
    }
    if (codeSource !== ASCII_SPAWN_MONSTERS) return
    if (typedLen < codeSource.length) return
    if (spawnCombatEnteredRef.current) return
    spawnCombatEnteredRef.current = true
    setPhase('combat')
  }, [phase, typedLen, codeSource])

  /** Sauts idle des slimes (combat). */
  useLayoutEffect(() => {
    monsterIdleTlsRef.current.forEach((t) => t.kill())
    monsterIdleTlsRef.current = []
    if (phase !== 'combat' || reduced) return
    const tweens: gsap.core.Tween[] = []
    for (const id of monstersAlive) {
      const el = monsterRefs.current[id]
      if (!el) continue
      gsap.set(el, { transformOrigin: '50% 100%' })
      tweens.push(
        gsap.to(el, {
          y: -5,
          duration: 0.55 + id * 0.08,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      )
    }
    monsterIdleTlsRef.current = tweens
    return () => {
      tweens.forEach((t) => t.kill())
      monsterIdleTlsRef.current = []
    }
  }, [phase, reduced, monstersAlive])

  /**
   * Combat : séquence async (await) pour que chaque marche lise la vraie position du héros
   * après le slime précédent — ordre strict : marche → coup → disparition → pause → suivant.
   */
  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'combat') return

    const runId = ++combatAbortRef.current
    let cancelled = false
    const isStale = () => cancelled || combatAbortRef.current !== runId

    /** Centre (0) puis droite (1). */
    const strikeOrder = [0, 1] as const
    const approachDuration = (stepIndex: number) => (stepIndex === 0 ? 0.3 : 0.52)
    const pauseBeforeNextWalkMs = COMBAT_KILL_GAP_MS

    const killStrike = (id: number, strikeIndex: number): Promise<void> => {
      return new Promise((resolve) => {
        const tilt = tiltRef.current
        const node = monsterRefs.current[id]
        if (!tilt && !node) {
          resolve()
          return
        }
        let finished = false
        const done = () => {
          if (finished) return
          finished = true
          resolve()
        }
        const safety = window.setTimeout(done, 1200)
        const tl = gsap.timeline({
          onComplete: () => {
            clearTimeout(safety)
            done()
          },
        })
        const hasTilt = Boolean(tilt)
        const hasNode = Boolean(node)

        if (hasNode) {
          tl.call(() => gsap.killTweensOf(node!), [], 0)
        }
        if (hasTilt) {
          tl.to(
            tilt!,
            {
              rotation: strikeIndex % 2 === 0 ? 13 : -11,
              duration: 0.055,
              ease: 'power2.out',
            },
            0
          )
          tl.to(tilt!, { rotation: 0, duration: 0.07, ease: 'sine.out' }, 0.045)
        }
        if (hasNode) {
          tl.fromTo(
            node!,
            { x: 0, scale: 1, opacity: 1, rotation: 0 },
            { x: 4, duration: 0.035, ease: 'power2.out' },
            0
          )
          tl.to(node!, { x: 0, duration: 0.032, ease: 'sine.in' }, 0.028)
          tl.to(
            node!,
            {
              scale: 0,
              opacity: 0,
              rotation: 14,
              duration: COMBAT_SLIME_SHRINK_S,
              ease: 'power2.in',
            },
            0.05
          )
        }
      })
    }

    const run = async () => {
      await new Promise<void>((r) => {
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      })
      if (isStale()) return

      for (let index = 0; index < strikeOrder.length; index++) {
        if (isStale()) return
        const id = strikeOrder[index]
        const tr = trackRef.current
        const ar = combatArenaRef.current
        const n = monsterRefs.current[id]
        if (tr && ar && n) {
          const targetX = approachXForMonster(ar, tr, n)
          await tweenXTo(tr, targetX, approachDuration(index), 'power2.inOut')
        }
        if (isStale()) return

        await killStrike(id, index)
        if (isStale()) return

        setMonstersAlive((prev) => prev.filter((m) => m !== id))

        if (index < strikeOrder.length - 1) {
          await new Promise<void>((r) => setTimeout(r, pauseBeforeNextWalkMs))
        }
        if (isStale()) return
      }

      if (isStale()) return

      const trEnd = trackRef.current
      const arEnd = combatArenaRef.current
      if (trEnd && arEnd) {
        const centerX = targetXCenterHeroInArena(arEnd, trEnd)
        await tweenXTo(trEnd, centerX, COMBAT_RETURN_CENTER_S, 'power2.inOut')
      }
      if (isStale()) return

      await new Promise<void>((r) => setTimeout(r, COMBAT_PAUSE_AFTER_CENTER_MS))
      if (isStale()) return

      cinematicLockRef.current = true
      setMonstersAlive([])
      setCodeSource(ASCII_EXPLODE_CODE)
      resetLengthRef.current()
      setPhase('typingExplode')
    }

    void run()

    return () => {
      cancelled = true
      combatAbortRef.current += 1
      const tr = trackRef.current
      const tilt = tiltRef.current
      if (tr) gsap.killTweensOf(tr)
      if (tilt) gsap.killTweensOf(tilt)
      for (const id of strikeOrder) {
        const el = monsterRefs.current[id]
        if (el) gsap.killTweensOf(el)
      }
    }
  }, [phase, reduced])

  /** Explosion visuelle du héros puis intro prose (mode Site), bandeau ASCII masqué. */
  useLayoutEffect(() => {
    if (reduced) return
    if (phase !== 'heroExplode') {
      return
    }
    if (heroExplodeRanRef.current) return
    heroExplodeRanRef.current = true

    cinematicLockRef.current = true
    const tilt = tiltRef.current
    setAsciiReplace(explodedHeroFigure)

    let cancelled = false
    const finish = () => {
      if (cancelled) return
      if (tilt) gsap.set(tilt, { scale: 1, rotation: 0, opacity: 1 })
      setAsciiReplace(null)
      setIntroRevealed(true)
      combatDoneRef.current = true
      cinematicLockRef.current = false
      setPhase('interactiveWalk')
    }

    if (!tilt) {
      const t = window.setTimeout(() => finish(), HERO_EXPLODE_END_DELAY_MS)
      return () => {
        clearTimeout(t)
        heroExplodeRanRef.current = false
      }
    }

    gsap.killTweensOf(tilt)
    gsap.set(tilt, { transformOrigin: '50% 80%' })
    let finishTimer: number | null = null
    const tw = gsap.to(tilt, {
      scale: 1.45,
      rotation: 22,
      opacity: 0.15,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: () => {
        if (cancelled) return
        gsap.set(tilt, { scale: 0.2, opacity: 0 })
        finishTimer = window.setTimeout(() => finish(), HERO_EXPLODE_END_DELAY_MS)
      },
    })

    return () => {
      cancelled = true
      if (finishTimer !== null) clearTimeout(finishTimer)
      tw.kill()
      heroExplodeRanRef.current = false
    }
  }, [phase, reduced])

  useLayoutEffect(() => {
    if (!canTiltHero) {
      rotateToRef.current = null
      return
    }
    const el = tiltRef.current
    if (!el) return
    rotateToRef.current = gsap.quickTo(el, 'rotation', { duration: 0.22, ease: 'power2.out' })
    return () => {
      rotateToRef.current = null
    }
  }, [canTiltHero])

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
      if (!tilt) return

      hasScrollGreetedRef.current = true
      lockRef.current = 'scroll'
      greetTlRef.current?.kill()
      if (tlWalk) tlWalk.pause()
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
    if (codeTypingLocked) return
    if (!canTiltHero) return
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

  const showWalker = (reduced || phase !== 'typingBuild') && !introRevealed
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

  const clipW = cardWidth ?? '100%'

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
          <Box
            ref={combatArenaRef}
            sx={{
              position: 'relative',
              width: typeof clipW === 'number' ? clipW : '100%',
              maxWidth: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              minHeight: { xs: '5.5rem', sm: '6rem' },
            }}
          >
            {(phase === 'swordScene' || swordSceneVisible) && (
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: '58%', sm: '56%' },
                  top: 0,
                  transform: 'translateX(-50%)',
                  zIndex: 2,
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
            <Box
              ref={trackRef}
              sx={{
                display: 'inline-block',
                willChange: 'transform',
                position: 'relative',
                zIndex: 1,
                pointerEvents: 'auto',
              }}
            >
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
            {isCombat &&
              monstersAlive.map((mid) => (
                <Box
                  key={mid}
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 4,
                    ...(mid === 0
                      ? {
                          left: '56%',
                          transform: 'translateX(-50%)',
                        }
                      : { right: '12%' }),
                  }}
                >
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      monsterRefs.current[mid] = el
                    }}
                    sx={{
                      display: 'inline-block',
                      transformOrigin: '50% 100%',
                      willChange: 'transform',
                    }}
                  >
                    <Box component="pre" sx={{ ...asciiSx, m: 0, p: 0 }}>
                      {MONSTER_FIGURES[mid]}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      )}

      <GlassContainer
        ref={cardRef}
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
          {introRevealed ? (
            <Typography
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
                textAlign: 'center',
                ...mobileProseWrapSx,
              }}
            >
              {intro}
            </Typography>
          ) : (
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
          )}
        </Box>
      </GlassContainer>
    </Box>
  )
}

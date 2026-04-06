'use client'

import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

/** Glyphes pour l’effet « chaos » (français + ponctuation courante). */
const SCRAMBLE_CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ0123456789.,;:!?'-"

/** Délai minimum entre deux changements pour un même glyphe (ms). */
const MIN_FLIP_MS = 160
/** Délai maximum entre deux changements pour un même glyphe (ms). */
const MAX_FLIP_MS = 520

function randomGlyph(): string {
  return SCRAMBLE_CHARSET[Math.floor(Math.random() * SCRAMBLE_CHARSET.length)]!
}

function nextFlipDelay(): number {
  return MIN_FLIP_MS + Math.random() * (MAX_FLIP_MS - MIN_FLIP_MS)
}

type Slot =
  | { kind: 'glyph'; target: string; scrambleIndex: number }
  | { kind: 'newline' }
  | { kind: 'space' }

function textToSlots(text: string): Slot[] {
  const codePoints = Array.from(text)
  const slots: Slot[] = []
  let scrambleIndex = 0
  for (const ch of codePoints) {
    if (ch === '\n') slots.push({ kind: 'newline' })
    else if (ch === ' ') slots.push({ kind: 'space' })
    else slots.push({ kind: 'glyph', target: ch, scrambleIndex: scrambleIndex++ })
  }
  return slots
}

function makeRandomDisplay(length: number): string[] {
  return Array.from({ length }, () => randomGlyph())
}

function sxToArray(sx: TypographyProps['sx']): NonNullable<TypographyProps['sx']>[] {
  if (sx == null) return []
  return Array.isArray(sx) ? sx : [sx]
}

type GlyphSlot = Extract<Slot, { kind: 'glyph' }>

/** Au-delà, pas de nowrap sur le mot (évite débordement sur très petits écrans). */
const MAX_GLYPHS_PER_WORD_NOWRAP = 26

/**
 * Évite qu’un glyphe en inline-block soit seul en fin de ligne (ex. « s » d’un pluriel).
 * Chaque mot (suite de glyphes entre espaces / sauts de ligne) reste sur une ligne.
 */
function renderSlotsGroupedByWord(
  slots: Slot[],
  renderGlyph: (slot: GlyphSlot, indexInText: number) => ReactNode,
): ReactNode[] {
  const out: ReactNode[] = []
  let i = 0
  let wordSeq = 0
  while (i < slots.length) {
    const s = slots[i]
    if (!s) break
    if (s.kind === 'newline') {
      out.push(<br key={`nl-${i}`} />)
      i += 1
      continue
    }
    if (s.kind === 'space') {
      out.push(
        <Box component="span" key={`sp-${i}`}>
          {' '}
        </Box>,
      )
      i += 1
      continue
    }
    const start = i
    const run: GlyphSlot[] = []
    while (i < slots.length && slots[i]!.kind === 'glyph') {
      run.push(slots[i] as GlyphSlot)
      i += 1
    }
    const inner = run.map((glyph, j) => renderGlyph(glyph, start + j))
    const nowrap = run.length > 0 && run.length <= MAX_GLYPHS_PER_WORD_NOWRAP
    out.push(
      <Box
        component="span"
        key={`wd-${start}-${wordSeq++}`}
        sx={nowrap ? { whiteSpace: 'nowrap' } : undefined}
      >
        {inner}
      </Box>,
    )
  }
  return out
}

export type ScramblingTextProps = Omit<TypographyProps, 'children'> & {
  text: string
  enabled: boolean
  /** Styles appliqués à chaque glyphe animé (ex. gradient sur le titre). */
  letterSx?: SxProps<Theme>
  /** `settled` : texte cible statique par glyphe (prévu pour GSAP). */
  phase?: 'chaos' | 'settled'
}

export default function ScramblingText({
  text,
  enabled,
  letterSx,
  phase = 'chaos',
  'aria-label': ariaLabel,
  ...typographyProps
}: ScramblingTextProps) {
  const slots = useMemo(() => textToSlots(text), [text])
  const glyphCount = useMemo(
    () => slots.filter((s): s is Extract<Slot, { kind: 'glyph' }> => s.kind === 'glyph').length,
    [slots],
  )

  const [displayGlyphs, setDisplayGlyphs] = useState<string[]>(() =>
    makeRandomDisplay(glyphCount),
  )

  const glyphCountRef = useRef(glyphCount)
  glyphCountRef.current = glyphCount

  const syncDisplayLength = useCallback(() => {
    setDisplayGlyphs((prev) => {
      const n = glyphCountRef.current
      if (prev.length === n) return prev
      if (n === 0) return []
      if (prev.length < n) {
        return [...prev, ...makeRandomDisplay(n - prev.length)]
      }
      return prev.slice(0, n)
    })
  }, [])

  useEffect(() => {
    syncDisplayLength()
  }, [text, syncDisplayLength])

  const label = ariaLabel ?? text

  useEffect(() => {
    if (!enabled || phase !== 'chaos') return

    const deadlines: number[] = []

    const ensureDeadlines = (n: number, now: number) => {
      if (deadlines.length === n) return
      deadlines.length = 0
      for (let i = 0; i < n; i++) {
        deadlines.push(now + Math.random() * MAX_FLIP_MS)
      }
    }

    let raf = 0

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const n = glyphCountRef.current
      if (n === 0) return

      ensureDeadlines(n, now)

      let anyDue = false
      for (let i = 0; i < n; i++) {
        if (now >= deadlines[i]!) {
          anyDue = true
          break
        }
      }
      if (!anyDue) return

      setDisplayGlyphs((prev) => {
        if (prev.length !== n) return prev
        let changed = false
        const next = [...prev]
        for (let i = 0; i < n; i++) {
          if (now >= deadlines[i]!) {
            next[i] = randomGlyph()
            deadlines[i] = now + nextFlipDelay()
            changed = true
          }
        }
        return changed ? next : prev
      })
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [enabled, phase, text])

  if (!enabled) {
    return (
      <Typography {...typographyProps} aria-label={label}>
        {text}
      </Typography>
    )
  }

  if (phase === 'settled') {
    const settledNodes = renderSlotsGroupedByWord(slots, (slot, indexInText) => (
      <Box
        component="span"
        key={`g-${indexInText}-${slot.scrambleIndex}`}
        aria-hidden
        data-scramble-index={slot.scrambleIndex}
        sx={{
          display: 'inline-block',
          minWidth: '0.35em',
          textAlign: 'center',
          ...letterSx,
        }}
      >
        {slot.target}
      </Box>
    ))
    return (
      <Typography {...typographyProps} aria-label={label}>
        {settledNodes}
      </Typography>
    )
  }

  const { id: _omitId, ...typographyForGhost } = typographyProps
  const baseSx = sxToArray(typographyProps.sx)
  const ghostOverlaySx = {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden' as const,
    margin: 0,
  }

  const scrambleSpans = renderSlotsGroupedByWord(slots, (slot, indexInText) => {
    const ch = displayGlyphs[slot.scrambleIndex] ?? slot.target
    return (
      <Box
        component="span"
        key={`g-${indexInText}-${slot.scrambleIndex}`}
        aria-hidden
        data-scramble-index={slot.scrambleIndex}
        sx={{
          display: 'inline-block',
          minWidth: '0.35em',
          textAlign: 'center',
          ...letterSx,
        }}
      >
        {ch}
      </Box>
    )
  })

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Typography
        {...typographyForGhost}
        aria-hidden
        sx={[...baseSx, { visibility: 'hidden', pointerEvents: 'none', userSelect: 'none' }] as SxProps<Theme>}
      >
        {text}
      </Typography>
      <Typography
        {...typographyProps}
        aria-label={label}
        sx={[...baseSx, ghostOverlaySx] as SxProps<Theme>}
      >
        {scrambleSpans}
      </Typography>
    </Box>
  )
}

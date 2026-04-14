'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { SxProps, Theme } from '@mui/material/styles'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

export type FrameSequencePlayerProps = {
  /** URL absolue du manifest JSON : liste de noms de fichiers dans l’ord. */
  manifestHref: string
  /** Préfixe URL du dossier (sans slash final) pour résoudre chaque frame. */
  baseHref: string
  /** Images par seconde en lecture boucle. */
  fps?: number
  alt: string
  sx?: SxProps<Theme>
  /** Appelé une fois le manifest parsé (nombre de frames valides). */
  onFrameCount?: (count: number) => void
  /** Affiché si le manifest est OK mais 0 frame (ex. assets manquants sur un environnement). */
  emptyFallback?: ReactNode
}

function joinFrameUrl(baseHref: string, filename: string): string {
  const base = baseHref.replace(/\/$/, '')
  const safe = filename
    .split('/')
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join('/')
  return `${base}/${safe}`
}

export default function FrameSequencePlayer({
  manifestHref,
  baseHref,
  fps = 14,
  alt,
  sx,
  onFrameCount,
  emptyFallback,
}: FrameSequencePlayerProps) {
  const [frames, setFrames] = useState<string[]>([])
  const [manifestLoading, setManifestLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  const notifyCount = useCallback(
    (count: number) => {
      onFrameCount?.(count)
    },
    [onFrameCount]
  )

  useEffect(() => {
    let cancelled = false
    setManifestLoading(true)
    fetch(manifestHref)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((data: unknown) => {
        if (cancelled) return
        if (Array.isArray(data) && data.every((x) => typeof x === 'string')) {
          const list = data.filter((x) => x.trim().length > 0)
          setFrames(list)
          notifyCount(list.length)
        } else {
          setFrames([])
          notifyCount(0)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFrames([])
          notifyCount(0)
        }
      })
      .finally(() => {
        if (!cancelled) setManifestLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [manifestHref, notifyCount])

  /**
   * RAF + cadence stable : au plus **une** frame affichée par tick d’animation pour éviter les rafales
   * (onglet en arrière-plan, jank mobile) qui donnent un effet saccadé.
   */
  const lastTickRef = useRef(0)
  const carryRef = useRef(0)

  useEffect(() => {
    if (frames.length === 0) return
    if (reducedMotion) return

    const frameMs = Math.max(1000 / 60, 1000 / fps)
    let rafId = 0
    lastTickRef.current = performance.now()
    carryRef.current = 0

    const loop = (now: number) => {
      const dt = now - lastTickRef.current
      lastTickRef.current = now
      carryRef.current += dt
      if (carryRef.current >= frameMs) {
        carryRef.current -= frameMs
        setIndex((i) => {
          const len = frames.length
          if (len === 0) return 0
          return (i + 1) % len
        })
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [frames, fps, reducedMotion])

  useEffect(() => {
    setIndex(0)
  }, [frames])

  if (manifestLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 80, minHeight: 80, ...sx }}>
        <CircularProgress size={28} />
      </Box>
    )
  }

  if (frames.length === 0) {
    return emptyFallback ? <>{emptyFallback}</> : null
  }

  const frameIndex = reducedMotion ? 0 : index
  const src = joinFrameUrl(baseHref, frames[frameIndex])

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        minHeight: 1,
        objectFit: 'contain',
        userSelect: 'none',
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        ...sx,
      }}
    />
  )
}

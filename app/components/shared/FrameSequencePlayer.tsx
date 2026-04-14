'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { SxProps, Theme } from '@mui/material/styles'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

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
  /**
   * Précharge et décode toutes les frames avant de lancer la boucle (recommandé).
   * Sans ça, le premier tour peut être très saccadé (décodage à la volée).
   */
  preloadFrames?: boolean
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

/** Décode chaque image une fois pour peupler le cache du navigateur avant la lecture. */
function preloadOne(url: string, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve()
  return new Promise((resolve) => {
    const img = new Image()
    const finish = () => {
      img.decode().then(() => resolve()).catch(() => resolve())
    }
    img.onerror = () => resolve()
    img.src = url
    if (img.complete) finish()
    else img.onload = finish
  })
}

function preloadFrameUrls(urls: string[], signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve()
  return Promise.all(urls.map((url) => preloadOne(url, signal))).then(() => undefined)
}

export default function FrameSequencePlayer({
  manifestHref,
  baseHref,
  fps = 14,
  alt,
  sx,
  onFrameCount,
  emptyFallback,
  preloadFrames = true,
}: FrameSequencePlayerProps) {
  const [frames, setFrames] = useState<string[]>([])
  const [manifestLoading, setManifestLoading] = useState(true)
  const [preloadDone, setPreloadDone] = useState(false)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  const imgRef = useRef<HTMLImageElement | null>(null)
  const indexRef = useRef(0)
  const urlsRef = useRef<string[]>([])
  const preloadAbortRef = useRef<AbortController | null>(null)

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

  useEffect(() => {
    urlsRef.current = frames.map((f) => joinFrameUrl(baseHref, f))
  }, [frames, baseHref])

  useEffect(() => {
    if (frames.length === 0) {
      setPreloadDone(false)
      return
    }
    if (!preloadFrames) {
      setPreloadDone(true)
      return
    }
    preloadAbortRef.current?.abort()
    const ac = new AbortController()
    preloadAbortRef.current = ac
    setPreloadDone(false)
    preloadFrameUrls(urlsRef.current, ac.signal)
      .then(() => {
        if (!ac.signal.aborted) setPreloadDone(true)
      })
      .catch(() => {
        if (!ac.signal.aborted) setPreloadDone(true)
      })
    return () => ac.abort()
  }, [frames, preloadFrames])

  /**
   * RAF + cadence stable : une frame affichée par tick max ; pas de setState ici
   * (évite ~18 re-renders React/s par lecteur → gros gain sur mobile).
   */
  const lastTickRef = useRef(0)
  const carryRef = useRef(0)

  useEffect(() => {
    if (frames.length === 0 || !preloadDone) return
    if (reducedMotion) return

    const frameMs = Math.max(1000 / 60, 1000 / fps)
    let rafId = 0
    lastTickRef.current = performance.now()
    carryRef.current = 0
    const urls = urlsRef.current
    const len = urls.length

    const loop = (now: number) => {
      const dt = now - lastTickRef.current
      lastTickRef.current = now
      carryRef.current += dt
      if (carryRef.current >= frameMs) {
        carryRef.current -= frameMs
        indexRef.current = (indexRef.current + 1) % len
        const el = imgRef.current
        const nextSrc = urls[indexRef.current]
        if (el && nextSrc) el.src = nextSrc
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [frames, fps, reducedMotion, preloadDone])

  useLayoutEffect(() => {
    indexRef.current = 0
    const el = imgRef.current
    const urls = urlsRef.current
    if (el && urls.length > 0) {
      const first = urls[0]
      if (first && el.src !== first) el.src = first
    }
  }, [frames, preloadDone])

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

  if (preloadFrames && !preloadDone) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 80, minHeight: 80, ...sx }}>
        <CircularProgress size={28} />
      </Box>
    )
  }

  const initialSrc = urlsRef.current[0] ?? ''

  return (
    <Box
      component="img"
      ref={imgRef}
      src={initialSrc}
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

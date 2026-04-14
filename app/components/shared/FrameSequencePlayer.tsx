'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { SxProps, Theme } from '@mui/material/styles'
import { useCallback, useEffect, useState } from 'react'

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

  useEffect(() => {
    if (frames.length === 0) return
    if (reducedMotion) return

    const ms = Math.max(16, 1000 / fps)
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % frames.length)
    }, ms)
    return () => window.clearInterval(id)
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
    return null
  }

  const frameIndex = reducedMotion ? 0 : index
  const src = joinFrameUrl(baseHref, frames[frameIndex])

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'contain',
        userSelect: 'none',
        pointerEvents: 'none',
        ...sx,
      }}
    />
  )
}

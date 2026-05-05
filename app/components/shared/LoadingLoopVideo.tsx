'use client'

import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { useEffect, useRef } from 'react'

export type LoadingLoopVideoProps = {
  /** VP9 + alpha (Chrome, Firefox, Edge récents) */
  webmSrc: string
  /** H.264 (Safari / iOS, navigateurs sans WebM) — transparence aplatie sur fond noir lors de l’encodage */
  mp4Src: string
  sx?: SxProps<Theme>
  /** Erreur réseau / codec / autoplay bloqué après tentative de lecture */
  onMediaError?: () => void
}

/**
 * Vidéo décorative en boucle, sans audio.
 * Deux sources : WebM en priorité, MP4 en repli (notamment Safari).
 * `muted` + `playsInline` requis pour l’autoplay mobile.
 */
/** Réduit le tamponnage et l’UI « grisée » avant la première image ; l’autoplay relance la lecture. */
const WEBKIT_VIDEO_HIDE_CONTROLS_SX = {
  // Safari / Chrome mobile : masquer le gros bouton lecture et la barre tant qu’on n’expose pas `controls`
  '&::-webkit-media-controls': { display: 'none !important' },
  '&::-webkit-media-controls-enclosure': { display: 'none !important' },
  '&::-webkit-media-controls-start-playback-button': { display: 'none !important' },
  '&::-webkit-media-controls-overlay-play-button': { display: 'none !important' },
  '&::-webkit-media-controls-panel': { display: 'none !important' },
} as const

export default function LoadingLoopVideo({ webmSrc, mp4Src, sx, onMediaError }: LoadingLoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const onFailRef = useRef(onMediaError)
  onFailRef.current = onMediaError

  const key = `${webmSrc}|${mp4Src}`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const p = el.play()
    if (p !== undefined) {
      p.catch(() => onFailRef.current?.())
    }
  }, [key])

  return (
    <Box
      component="video"
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden
      onError={() => onMediaError?.()}
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        verticalAlign: 'middle',
        pointerEvents: 'none',
        userSelect: 'none',
        objectFit: 'contain',
        objectPosition: 'center',
        bgcolor: 'transparent',
        ...WEBKIT_VIDEO_HIDE_CONTROLS_SX,
        ...sx,
      }}
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </Box>
  )
}

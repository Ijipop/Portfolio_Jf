'use client'

import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useRef, useState, type Ref } from 'react'

export type AutoplayLoopVideoProps = {
  src: string
  ariaLabel: string
  ioThreshold?: number
  title?: string
}

/**
 * Lecture en boucle (muted + playsInline), autoplay au scroll si les animations sont autorisées.
 * Contrôles natifs seulement au survol — pas de lecteur visible au chargement / reload.
 */
export default function AutoplayLoopVideo({
  src,
  ariaLabel,
  ioThreshold = 0.25,
  title,
}: AutoplayLoopVideoProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const video = videoRef.current
    const root = containerRef.current
    if (!video || !root) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: ioThreshold }
    )
    obs.observe(root)
    return () => obs.disconnect()
  }, [reducedMotion, ioThreshold])

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        component="video"
        ref={videoRef as Ref<HTMLVideoElement>}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        controls={hover}
        autoPlay={!reducedMotion}
        aria-label={ariaLabel}
        title={title}
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </Box>
  )
}

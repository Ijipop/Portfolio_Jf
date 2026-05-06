'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCallback, useLayoutEffect, useState } from 'react'
import FrameSequencePlayer from '@/components/shared/FrameSequencePlayer'
import LoadingLoopVideo from '@/components/shared/LoadingLoopVideo'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { isIOSTouchDevice } from '@/utils/isIOSClient'
import { PROJECTS_LOADING_FRAMES, PROJECTS_LOADING_VIDEO } from './projectsLoadingAssets'

type ProjectsLoadingFrameSectionProps = {
  /** Texte sous le spinner uniquement si repli (reduced motion / pas de frames). Laisser vide pour n’afficher que l’animation. */
  message?: string
}

function ProjectsLoadingPngFallback({ message }: { message: string }) {
  /** iOS : ne pas précharger ~230 PNG en parallèle (OOM WebKit) ; lecture à la volée. */
  const eagerPreloadFrames = !isIOSTouchDevice()
  const [gearsCount, setGearsCount] = useState<number | null>(null)
  const [textCount, setTextCount] = useState<number | null>(null)

  const manifestsReady = gearsCount !== null && textCount !== null
  const bothEmpty = manifestsReady && gearsCount === 0 && textCount === 0

  if (bothEmpty) {
    return <LoadingSpinner message={message} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 0.25, sm: 0.5 },
        minHeight: { xs: 'min(52vh, 420px)', sm: '50vh' },
        px: { xs: 1.5, sm: 2 },
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <FrameSequencePlayer
          manifestHref={PROJECTS_LOADING_FRAMES.gears.manifestHref}
          baseHref={PROJECTS_LOADING_FRAMES.gears.baseHref}
          fps={18}
          alt=""
          preloadFrames={eagerPreloadFrames}
          onFrameCount={setGearsCount}
          emptyFallback={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: 160, sm: 220 },
                width: '100%',
              }}
            >
              <CircularProgress size={40} />
            </Box>
          }
          sx={{
            maxHeight: { xs: 'min(42vw, 200px)', sm: 200, md: 240 },
            width: 'auto',
            maxWidth: 'min(96vw, 520px)',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <FrameSequencePlayer
          manifestHref={PROJECTS_LOADING_FRAMES.loadingText.manifestHref}
          baseHref={PROJECTS_LOADING_FRAMES.loadingText.baseHref}
          fps={18}
          alt=""
          preloadFrames={eagerPreloadFrames}
          onFrameCount={setTextCount}
          sx={{
            maxHeight: { xs: 'min(22vw, 96px)', sm: 120, md: 140 },
            width: 'auto',
            maxWidth: 'min(96vw, 420px)',
            mt: { xs: -0.25, sm: -0.5 },
          }}
        />
      </Box>
    </Box>
  )
}

/** Aligné sur le breakpoint `sm` MUI (~600px) : sous cette largeur, pas de `<video>` de chargement (chrome natif grisé + bouton lecture). */
const MOBILE_LOADING_MAX_CSS = '(max-width: 599.95px)'

export default function ProjectsLoadingFrameSection({ message = '' }: ProjectsLoadingFrameSectionProps) {
  const [usePngFallback, setUsePngFallback] = useState(false)
  /** iOS / petit écran : éviter les vidéos inline (aperçu gris, gros bouton lecture avant autoplay). */
  const [preferFrameSequence, setPreferFrameSequence] = useState(false)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const onVideoFail = useCallback(() => setUsePngFallback(true), [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (isIOSTouchDevice()) {
      setPreferFrameSequence(true)
      return
    }
    try {
      if (window.matchMedia(MOBILE_LOADING_MAX_CSS).matches) {
        setPreferFrameSequence(true)
      }
    } catch {
      /* matchMedia indisponible (très rare) */
    }
  }, [])

  if (reducedMotion) {
    return <LoadingSpinner message={message} />
  }

  if (usePngFallback || preferFrameSequence) {
    return <ProjectsLoadingPngFallback message={message} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 0.25, sm: 0.5 },
        minHeight: { xs: 'min(52vh, 420px)', sm: '50vh' },
        px: { xs: 1.5, sm: 2 },
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <LoadingLoopVideo
          webmSrc={PROJECTS_LOADING_VIDEO.gears.webm}
          mp4Src={PROJECTS_LOADING_VIDEO.gears.mp4}
          onMediaError={onVideoFail}
          sx={{
            maxHeight: { xs: 'min(42vw, 200px)', sm: 200, md: 240 },
            width: 'auto',
            maxWidth: 'min(96vw, 520px)',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <LoadingLoopVideo
          webmSrc={PROJECTS_LOADING_VIDEO.loadingText.webm}
          mp4Src={PROJECTS_LOADING_VIDEO.loadingText.mp4}
          onMediaError={onVideoFail}
          sx={{
            maxHeight: { xs: 'min(22vw, 96px)', sm: 120, md: 140 },
            width: 'auto',
            maxWidth: 'min(96vw, 420px)',
            mt: { xs: -0.25, sm: -0.5 },
          }}
        />
      </Box>
    </Box>
  )
}

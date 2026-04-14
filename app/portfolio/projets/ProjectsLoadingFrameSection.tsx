'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCallback, useState } from 'react'
import FrameSequencePlayer from '@/components/shared/FrameSequencePlayer'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { PROJECTS_LOADING_FRAMES } from './projectsLoadingAssets'

type ProjectsLoadingFrameSectionProps = {
  /** Texte sous le spinner uniquement si repli (reduced motion / pas de frames). Laisser vide pour n’afficher que l’animation. */
  message?: string
}

export default function ProjectsLoadingFrameSection({ message = '' }: ProjectsLoadingFrameSectionProps) {
  const [gearsCount, setGearsCount] = useState<number | null>(null)
  const [textCount, setTextCount] = useState<number | null>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  const onGears = useCallback((n: number) => setGearsCount(n), [])
  const onText = useCallback((n: number) => setTextCount(n), [])

  const manifestsReady = gearsCount !== null && textCount !== null
  const bothEmpty = manifestsReady && gearsCount === 0 && textCount === 0

  if (reducedMotion || bothEmpty) {
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
          onFrameCount={onGears}
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
          onFrameCount={onText}
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

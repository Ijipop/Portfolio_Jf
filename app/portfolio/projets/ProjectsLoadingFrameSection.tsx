'use client'

import Box from '@mui/material/Box'
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
        gap: { xs: 2, sm: 3 },
        minHeight: '50vh',
        px: 1,
        width: '100%',
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
          fps={14}
          alt=""
          onFrameCount={onGears}
          sx={{ maxHeight: { xs: 160, sm: 220 }, width: 'auto', maxWidth: '100%' }}
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
          fps={14}
          alt=""
          onFrameCount={onText}
          sx={{ maxHeight: { xs: 100, sm: 140 }, width: 'auto', maxWidth: '100%' }}
        />
      </Box>
    </Box>
  )
}

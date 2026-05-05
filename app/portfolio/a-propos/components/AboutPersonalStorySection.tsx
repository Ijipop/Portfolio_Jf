'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'

type TFn = (key: string) => string

type AboutPersonalStorySectionProps = {
  t: TFn
  textColor: string
}

export default function AboutPersonalStorySection({ t, textColor }: AboutPersonalStorySectionProps) {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)

  const portraitSizes = '(max-width: 600px) min(100vw, 300px), 340px'
  const portraitRadiusPx = `${DESIGN_TOKENS.borderRadius.small}px`

  return (
    <Box
      sx={{
        ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
        borderRadius: DESIGN_TOKENS.borderRadius.large,
        padding: { xs: 3, sm: 4 },
        textAlign: 'center',
        mb: 8,
        position: 'relative',
        overflow: 'hidden',
        ...(!isTopologyRoute && {
          background: 'var(--card-background, linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%))',
          border: '1px solid var(--card-primary, rgba(0,0,0,0.08))',
          boxShadow: '0 8px 32px var(--card-primary, rgba(0,0,0,0.1))',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, var(--card-primary, rgba(30, 58, 138, 0.1)) 0%, var(--card-secondary, rgba(5, 150, 105, 0.1)) 50%, var(--card-primary, rgba(30, 58, 138, 0.05)) 100%)`,
            opacity: 'var(--card-overlay-opacity, 0.3)',
            pointerEvents: 'none',
          },
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: { xs: 2.5, sm: 3 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/**
         * Pas de boîte `aspect-ratio` + `fill` : uniquement la photo, dimensions intrinsèques (ratio 3/4 indicatif pour Next),
         * `maxWidth` pour le responsive et coins arrondis sur le média — plus de « cadre » visible sous l’image.
         */}
        <Image
          src="/img/moi8bit.png"
          alt={t('about.photoPortraitAlt')}
          width={480}
          height={640}
          sizes={portraitSizes}
          priority={false}
          unoptimized
          style={{
            maxWidth: 'min(100%, 340px)',
            width: '100%',
            height: 'auto',
            borderRadius: portraitRadiusPx,
            imageRendering: 'pixelated',
            display: 'block',
          }}
        />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 720, mx: 'auto' }}>
        <Typography
          variant="body1"
          sx={{
            ...DESIGN_TOKENS.typography.body1,
            color: textColor,
            opacity: 0.95,
            lineHeight: 1.65,
            mb: 2.5,
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {t('about.personalStoryP1')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...DESIGN_TOKENS.typography.body1,
            color: textColor,
            opacity: 0.95,
            lineHeight: 1.65,
            mb: 2.5,
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {t('about.personalStoryP2')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...DESIGN_TOKENS.typography.body1,
            color: textColor,
            opacity: 0.95,
            lineHeight: 1.65,
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {t('about.personalStoryP3')}
        </Typography>
      </Box>
    </Box>
  )
}

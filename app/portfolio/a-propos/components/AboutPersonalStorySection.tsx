'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { BODY_PROSE_DENSE_SX, DESIGN_TOKENS } from '@/design-system/constants'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'

type TFn = (key: string) => string

type AboutPersonalStorySectionProps = {
  t: TFn
  textColor: string
}

export default function AboutPersonalStorySection({ t, textColor }: AboutPersonalStorySectionProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)

  const portraitSizes = '(max-width: 600px) min(100vw, 260px), (max-width: 1199px) 220px, 200px'
  const portraitRadiusPx = `${DESIGN_TOKENS.borderRadius.small}px`

  return (
    <Box
      sx={{
        ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
        borderRadius: DESIGN_TOKENS.borderRadius.large,
        padding: { xs: 3, sm: 4, md: 3.25, lg: 2.75, xl: 2.5 },
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
        [theme.breakpoints.down('sm')]: {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          p: 0,
          borderRadius: 0,
          '&::before': { display: 'none', content: 'none' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: { xs: 2.5, sm: 2.75, md: 2.25, lg: 2 },
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: { xs: 'min(100%, 300px)', sm: 260, md: 220, lg: 200, xl: 180 },
          mx: 'auto',
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
            maxWidth: '100%',
            width: '100%',
            height: 'auto',
            borderRadius: portraitRadiusPx,
            imageRendering: 'pixelated',
            display: 'block',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: { xs: 680, sm: 640, md: 560, lg: 500, xl: 460 },
          mx: 'auto',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            ...DESIGN_TOKENS.typography.body1,
            ...BODY_PROSE_DENSE_SX,
            color: textColor,
            opacity: 0.95,
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
            ...BODY_PROSE_DENSE_SX,
            color: textColor,
            opacity: 0.95,
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
            ...BODY_PROSE_DENSE_SX,
            color: textColor,
            opacity: 0.95,
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

'use client'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import type { SvgIconComponent } from '@mui/icons-material'
import { useLanguage } from '@/contexts/LanguageContext'
import PreviewReveal from './PreviewReveal'
import PreviewSection from './PreviewSection'
import { PREVIEW } from './previewTokens'

const PROJECTS_PATH = '/portfolio/projets?type=web'

const PILLARS: { icon: SvgIconComponent; titleKey: string; bodyKey: string }[] = [
  {
    icon: LocationOnOutlinedIcon,
    titleKey: 'homeV2.credibilityLocalTitle',
    bodyKey: 'homeV2.credibilityLocalBody',
  },
  {
    icon: RouteOutlinedIcon,
    titleKey: 'homeV2.credibilityProcessTitle',
    bodyKey: 'homeV2.credibilityProcessBody',
  },
  {
    icon: VerifiedOutlinedIcon,
    titleKey: 'homeV2.credibilityPromiseTitle',
    bodyKey: 'homeV2.credibilityPromiseBody',
  },
]

export default function PreviewCredibility() {
  const { t } = useLanguage()

  return (
    <PreviewSection kicker={t('homeV2.credibilityKicker')} title={t('homeV2.credibilityTitle')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 3, md: 4 },
          mb: 4,
        }}
      >
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <PreviewReveal key={pillar.titleKey} delay={index * 0.08}>
              <Box
                sx={{
                  py: { xs: 1, md: 1.5 },
                  borderTop: `1px solid ${PREVIEW.border}`,
                  pt: 2.5,
                }}
              >
                <Icon sx={{ color: PREVIEW.orange, fontSize: 28, mb: 1.75 }} />
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: PREVIEW.fontDisplay,
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    letterSpacing: '-0.02em',
                    color: PREVIEW.text,
                    mb: 1,
                  }}
                >
                  {t(pillar.titleKey)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: PREVIEW.fontBody,
                    fontSize: '0.95rem',
                    color: PREVIEW.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  {t(pillar.bodyKey)}
                </Typography>
              </Box>
            </PreviewReveal>
          )
        })}
      </Box>

      <PreviewReveal>
        <Typography
          sx={{
            fontFamily: PREVIEW.fontBody,
            fontSize: '0.95rem',
            color: PREVIEW.textMuted,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          {t('homeV2.credibilityProof')}{' '}
          <Typography
            component={Link}
            href={PROJECTS_PATH}
            sx={{
              color: PREVIEW.orangeLight,
              fontWeight: 600,
              fontSize: 'inherit',
              fontFamily: PREVIEW.fontBody,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {t('homeV2.credibilityProofLink')}
          </Typography>
        </Typography>
      </PreviewReveal>
    </PreviewSection>
  )
}

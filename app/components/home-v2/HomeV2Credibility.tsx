'use client'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import type { SvgIconComponent } from '@mui/icons-material'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Section from './HomeV2Section'
import { HOME_V2, homeV2CardSx } from './homeV2Tokens'

const PROJECTS_PATH = '/portfolio/projets'

type Pillar = {
  icon: SvgIconComponent
  titleKey: string
  bodyKey: string
}

const PILLARS: Pillar[] = [
  { icon: LocationOnOutlinedIcon, titleKey: 'homeV2.credibilityLocalTitle', bodyKey: 'homeV2.credibilityLocalBody' },
  { icon: RouteOutlinedIcon, titleKey: 'homeV2.credibilityProcessTitle', bodyKey: 'homeV2.credibilityProcessBody' },
  { icon: VerifiedOutlinedIcon, titleKey: 'homeV2.credibilityPromiseTitle', bodyKey: 'homeV2.credibilityPromiseBody' },
]

export default function HomeV2Credibility() {
  const { t } = useLanguage()

  return (
    <HomeV2Section
      kicker={t('homeV2.credibilityKicker')}
      title={t('homeV2.credibilityTitle')}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          mb: 3,
        }}
      >
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <ScrollReveal key={pillar.titleKey} delay={index * 0.1} distance={24}>
              <Box sx={{ ...homeV2CardSx, p: { xs: 2.5, md: 3 }, height: '100%' }}>
                <Icon sx={{ color: HOME_V2.brandOrange, fontSize: 28, mb: 1.5 }} />
                <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.0625rem', color: HOME_V2.text, mb: 1 }}>
                  {t(pillar.titleKey)}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: HOME_V2.textSecondary, lineHeight: 1.55 }}>
                  {t(pillar.bodyKey)}
                </Typography>
              </Box>
            </ScrollReveal>
          )
        })}
      </Box>

      <ScrollReveal distance={20}>
        <Typography sx={{ fontSize: '0.9rem', color: HOME_V2.textMuted, textAlign: 'center', lineHeight: 1.55 }}>
          {t('homeV2.credibilityProof')}{' '}
          <Typography
            component={Link}
            href={PROJECTS_PATH}
            sx={{
              color: HOME_V2.brandOrange,
              fontWeight: 600,
              fontSize: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {t('homeV2.credibilityProofLink')}
          </Typography>
        </Typography>
      </ScrollReveal>
    </HomeV2Section>
  )
}

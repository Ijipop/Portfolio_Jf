'use client'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomePortraitAvatar from './HomePortraitAvatar'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

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

/** Crédibilité courte — sans double preuve Thermo (voir case studies). */
export default function HomeV2Credibility() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()

  return (
    <HomeV2Section kicker={t('homeV2.credibilityKicker')} title={t('homeV2.credibilityTitle')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
          gap: { xs: 2, md: 3 },
          alignItems: 'stretch',
          mb: { xs: 3.5, md: 4.5 },
        }}
      >
        <Box
          sx={{
            borderRadius: v2.cardRadius,
            overflow: 'hidden',
            border: `1px solid ${v2.border}`,
            minHeight: { xs: 180, md: 220 },
          }}
        >
          <Box
            component="img"
            src="/img/studio/desk-warm.png"
            alt={t('homeV2.studioDeskAlt')}
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1.25,
            p: { xs: 0.5, md: 1 },
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            <HomePortraitAvatar alt={t('about.photoPortraitAlt')} />
            <Box>
              <Typography
                sx={{
                  fontFamily: v2.fontDisplay,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: v2.text,
                }}
              >
                {t('homeV2.heroRealName')}
              </Typography>
              <Typography sx={{ fontFamily: v2.fontBody, fontSize: '0.88rem', color: v2.textSecondary }}>
                {t('homeV2.heroOneLiner')}
              </Typography>
            </Box>
          </Stack>
          <Typography sx={{ fontFamily: v2.fontBody, fontSize: '0.95rem', color: v2.textSecondary, lineHeight: 1.55 }}>
            {t('homeV2.studioDeskCaption')}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 3, md: 4 },
        }}
      >
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <ScrollReveal key={pillar.titleKey} delay={index * 0.08} distance={24}>
              <Box
                sx={{
                  borderTop: `1px solid ${v2.border}`,
                  pt: 2.5,
                  height: '100%',
                }}
              >
                <Icon sx={{ color: v2.brandOrange, fontSize: 26, mb: 1.25 }} />
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: v2.fontDisplay,
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    letterSpacing: '-0.02em',
                    color: v2.text,
                    mb: 0.75,
                  }}
                >
                  {t(pillar.titleKey)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: v2.fontBody,
                    fontSize: '0.9rem',
                    color: v2.textSecondary,
                    lineHeight: 1.55,
                  }}
                >
                  {t(pillar.bodyKey)}
                </Typography>
              </Box>
            </ScrollReveal>
          )
        })}
      </Box>
    </HomeV2Section>
  )
}

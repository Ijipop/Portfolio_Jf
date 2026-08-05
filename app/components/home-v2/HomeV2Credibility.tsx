'use client'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import type { SvgIconComponent } from '@mui/icons-material'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

const PROJECTS_PATH = '/portfolio/projets?type=web'
const THERMO_HREF = 'https://thermo-trappeur.vercel.app/'
const THERMO_SRC = '/imgs/projets/1776087415283_Thermo.png'

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
  const { tokens: v2, cardSx } = useHomeV2Tokens()

  return (
    <HomeV2Section kicker={t('homeV2.credibilityKicker')} title={t('homeV2.credibilityTitle')}>
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
            <ScrollReveal key={pillar.titleKey} delay={index * 0.1} distance={24}>
              <Box
                sx={{
                  borderTop: `1px solid ${v2.border}`,
                  pt: 2.5,
                  height: '100%',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:hover': { transform: 'translateY(-3px)' },
                }}
              >
                <Icon sx={{ color: v2.brandOrange, fontSize: 28, mb: 1.5 }} />
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: v2.fontDisplay,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    letterSpacing: '-0.02em',
                    color: v2.text,
                    mb: 1,
                  }}
                >
                  {t(pillar.titleKey)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: v2.fontBody,
                    fontSize: '0.92rem',
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

      <ScrollReveal distance={28}>
        <Box
          sx={{
            ...cardSx,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '140px 1fr' },
            gap: { xs: 2, sm: 2.5 },
            p: { xs: 2, sm: 2.5 },
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            component="a"
            href={THERMO_HREF}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              borderRadius: '14px',
              overflow: 'hidden',
              border: `1px solid ${v2.border}`,
              bgcolor: v2.bgElevated,
              aspectRatio: '1',
              position: 'relative',
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: BRAND_GLITCH_GRADIENT,
                zIndex: 1,
              }}
            />
            <Box
              component="img"
              src={THERMO_SRC}
              alt=""
              sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: v2.brandOrangeLight,
                mb: 0.75,
              }}
            >
              {t('homeV2.heroProofKicker')}
            </Typography>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.95rem',
                color: v2.textSecondary,
                lineHeight: 1.55,
                mb: 1.25,
              }}
            >
              {t('homeV2.credibilityProof')}{' '}
              <Typography
                component={Link}
                href={PROJECTS_PATH}
                sx={{
                  color: v2.brandOrange,
                  fontWeight: 600,
                  fontSize: 'inherit',
                  fontFamily: v2.fontBody,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {t('homeV2.credibilityProofLink')}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </ScrollReveal>
    </HomeV2Section>
  )
}

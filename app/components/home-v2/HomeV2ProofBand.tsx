'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { useHomeV2Tokens } from './homeV2Tokens'

const THERMO_HREF = 'https://thermo-trappeur.vercel.app/'
const THERMO_SRC = '/imgs/projets/1776087415283_Thermo.png'

/** Preuve projet — hors du premier viewport, full-bleed soft. */
export default function HomeV2ProofBand() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()

  return (
    <ScrollReveal distance={28}>
      <Box
        component="section"
        aria-label={t('homeV2.heroProofKicker')}
        sx={{
          mb: { xs: 4, md: 6 },
          borderRadius: v2.cardRadiusLg,
          overflow: 'hidden',
          border: `1px solid ${v2.border}`,
          background: `linear-gradient(165deg, ${v2.bgElevated} 0%, ${v2.bg} 100%)`,
        }}
      >
        <Box
          component="a"
          href={THERMO_HREF}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            textDecoration: 'none',
            color: 'inherit',
            minHeight: { md: 280 },
            transition: 'background 0.3s ease',
            '&:hover': {
              background: v2.surfaceHover,
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: 200, md: '100%' },
              background: v2.bg,
              borderBottom: { xs: `1px solid ${v2.border}`, md: 'none' },
              borderRight: { md: `1px solid ${v2.border}` },
            }}
          >
            <Box
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
              alt="Site vitrine Thermo-Trappeur"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
                minHeight: { xs: 200, md: 280 },
              }}
            />
          </Box>
          <Box
            sx={{
              p: { xs: 2.5, md: 3.5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: v2.brandOrangeLight,
              }}
            >
              {t('homeV2.heroProofKicker')}
            </Typography>
            <Typography
              sx={{
                fontFamily: v2.fontDisplay,
                fontWeight: 700,
                fontSize: { xs: '1.35rem', md: '1.6rem' },
                color: v2.text,
                letterSpacing: '-0.02em',
              }}
            >
              Thermo-Trappeur
            </Typography>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.95rem',
                color: v2.textSecondary,
                lineHeight: 1.5,
                maxWidth: 360,
              }}
            >
              {t('homeV2.heroProofCaption')}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: v2.fontBody,
                fontWeight: 700,
                fontSize: '0.9rem',
                color: v2.brandOrange,
              }}
            >
              {t('homeV2.credibilityProofLink')} →
            </Typography>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}

'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

type ProofItem = {
  id: string
  href: string
  image: string
  imageAlt: string
  labelKey: string
  external?: boolean
}

const PROOFS: ProofItem[] = [
  {
    id: 'thermo',
    href: 'https://www.thermo-trappeur.ca/fr',
    image: '/imgs/projets/1776087415283_Thermo.png',
    imageAlt: 'Thermo-Trappeur',
    labelKey: 'homeV2.proofRailThermo',
    external: true,
  },
  {
    id: 'wellness',
    href: '/demos/wellness',
    image: '/demos/wellness/ritual-01.jpg',
    imageAlt: 'Démo centre spa bien-être',
    labelKey: 'homeV2.proofRailWellness',
  },
  {
    id: 'construction',
    href: '/demos/construction',
    image: '/demos/construction/hero.jpg',
    imageAlt: 'Démo construction',
    labelKey: 'homeV2.proofRailConstruction',
  },
]

/** Rail horizontal type lookbook — preuves / ambiances, sans marquee loud. */
export default function HomeV2ProofRail() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()

  return (
    <HomeV2Section
      id="proof-rail"
      kicker={t('homeV2.proofRailKicker')}
      title={t('homeV2.proofRailTitle')}
      lead={t('homeV2.proofRailLead')}
    >
      <ScrollReveal>
        <Box
          role="region"
          aria-label={t('homeV2.proofRailScrollAria')}
          sx={{
            display: 'flex',
            gap: { xs: 1.5, md: 2 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            pb: 1.5,
            mx: { xs: -0.5, sm: 0 },
            px: { xs: 0.5, sm: 0 },
            scrollbarWidth: 'thin',
            scrollbarColor: `${v2.brandOrange}55 transparent`,
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `${v2.brandOrange}66`,
              borderRadius: 3,
            },
          }}
        >
          {PROOFS.map((item) => {
            const label = t(item.labelKey)
            const linkSx = {
              flex: '0 0 auto',
              width: { xs: '78%', sm: 'min(320px, 42%)', md: 'min(360px, 34%)' },
              scrollSnapAlign: 'start' as const,
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              outline: 'none',
              '&:focus-visible .proof-rail-frame': {
                boxShadow: `0 0 0 2px ${v2.brandOrange}`,
              },
              '&:hover .proof-rail-img': {
                transform: 'scale(1.03)',
              },
            }

            const body = (
              <>
                <Box
                  className="proof-rail-frame"
                  sx={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    borderRadius: 1.5,
                    border: `1px solid ${v2.border}`,
                    backgroundColor: v2.surface,
                  }}
                >
                  <Box
                    component="img"
                    className="proof-rail-img"
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                      '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                      },
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    mt: 1.25,
                    fontFamily: v2.fontBody,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: v2.text,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {label}
                </Typography>
              </>
            )

            if (item.external) {
              return (
                <Box
                  key={item.id}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={linkSx}
                >
                  {body}
                </Box>
              )
            }

            return (
              <Box key={item.id} component={Link} href={item.href} sx={linkSx}>
                {body}
              </Box>
            )
          })}
        </Box>
      </ScrollReveal>
    </HomeV2Section>
  )
}

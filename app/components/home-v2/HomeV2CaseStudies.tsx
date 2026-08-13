'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

type CaseStudy = {
  id: string
  image: string
  imageAlt: string
  titleKey: string
  contextKey: string
  deliverableKey: string
  resultKey: string
  ctaKey: string
  href: string
  external?: boolean
  featured?: boolean
  demo?: boolean
  software?: boolean
}

const WEB_STUDIES: CaseStudy[] = [
  {
    id: 'thermo',
    image: '/imgs/projets/1776087415283_Thermo.png',
    imageAlt: 'Thermo-Trappeur',
    titleKey: 'homeV2.caseThermoTitle',
    contextKey: 'homeV2.caseThermoContext',
    deliverableKey: 'homeV2.caseThermoDeliverable',
    resultKey: 'homeV2.caseThermoResult',
    ctaKey: 'homeV2.caseThermoCta',
    href: 'https://www.thermo-trappeur.ca/fr',
    external: true,
    featured: true,
  },
  {
    id: 'restaurant',
    image: '/img/studio/demo-restaurant.png',
    imageAlt: 'Démo restaurant',
    titleKey: 'homeV2.caseRestaurantTitle',
    contextKey: 'homeV2.caseRestaurantContext',
    deliverableKey: 'homeV2.caseRestaurantDeliverable',
    resultKey: 'homeV2.caseRestaurantResult',
    ctaKey: 'homeV2.caseRestaurantCta',
    href: '/demos/restaurant',
    demo: true,
  },
  {
    id: 'volt',
    image: '/demos/volt/volt-look-01.jpg',
    imageAlt: 'Démo VOLT streetwear',
    titleKey: 'homeV2.caseVoltTitle',
    contextKey: 'homeV2.caseVoltContext',
    deliverableKey: 'homeV2.caseVoltDeliverable',
    resultKey: 'homeV2.caseVoltResult',
    ctaKey: 'homeV2.caseVoltCta',
    href: '/demos/volt',
    demo: true,
  },
]

const SOFTWARE_STUDIES: CaseStudy[] = [
  {
    id: 'timelendr',
    image: '/imgs/images/timelendrpro.svg',
    imageAlt: 'Timelendr',
    titleKey: 'homeV2.caseTimelendrTitle',
    contextKey: 'homeV2.caseTimelendrContext',
    deliverableKey: 'homeV2.caseTimelendrDeliverable',
    resultKey: 'homeV2.caseTimelendrResult',
    ctaKey: 'homeV2.caseTimelendrCta',
    href: '/logiciel/timelendr',
    software: true,
  },
  {
    id: 'spacetaker',
    image: '/imgs/images/SpaceTaker_icon.png',
    imageAlt: 'Space Taker',
    titleKey: 'homeV2.caseSpaceTakerTitle',
    contextKey: 'homeV2.caseSpaceTakerContext',
    deliverableKey: 'homeV2.caseSpaceTakerDeliverable',
    resultKey: 'homeV2.caseSpaceTakerResult',
    ctaKey: 'homeV2.caseSpaceTakerCta',
    href: '/spacetaker',
    software: true,
  },
  {
    id: 'deskdot',
    image: '/imgs/images/DeskDot_icon.png',
    imageAlt: 'DeskDot',
    titleKey: 'homeV2.caseDeskDotTitle',
    contextKey: 'homeV2.caseDeskDotContext',
    deliverableKey: 'homeV2.caseDeskDotDeliverable',
    resultKey: 'homeV2.caseDeskDotResult',
    ctaKey: 'homeV2.caseDeskDotCta',
    href: '/deskdot',
    software: true,
  },
]

function CaseField({
  label,
  value,
  fontBody,
  textSecondary,
  text,
}: {
  label: string
  value: string
  fontBody: string
  textSecondary: string
  text: string
}) {
  return (
    <Typography
      component="p"
      sx={{
        fontFamily: fontBody,
        fontSize: '0.88rem',
        fontWeight: 400,
        color: textSecondary,
        lineHeight: 1.5,
        minHeight: '4.05em',
        m: 0,
      }}
    >
      <Box
        component="strong"
        sx={{
          fontFamily: fontBody,
          fontWeight: 800,
          color: text,
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </Box>{' '}
      {value}
    </Typography>
  )
}

function CaseStudyCard({
  study,
  index,
  compact,
}: {
  study: CaseStudy
  index: number
  compact?: boolean
}) {
  const { t } = useLanguage()
  const { tokens: v2, cardSx, featuredCardSx } = useHomeV2Tokens()
  const mediaHeight = compact ? { xs: 88, md: 96 } : { xs: 160, md: 176 }

  return (
    <ScrollReveal delay={index * 0.08} distance={24} fillHeight>
      <Box
        component={study.external ? 'a' : Link}
        href={study.href}
        {...(study.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        sx={{
          ...(study.featured ? featuredCardSx : cardSx),
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit',
          p: 0,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
            height: mediaHeight,
            bgcolor: v2.bgElevated,
            borderBottom: `1px solid ${v2.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: study.software ? 2 : 0,
          }}
        >
          {study.demo ? (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 1,
                px: 1,
                py: 0.35,
                borderRadius: 999,
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'rgba(18, 16, 14, 0.78)',
                color: v2.text,
                border: `1px solid ${v2.border}`,
              }}
            >
              {t('homeV2.caseDemoBadge')}
            </Box>
          ) : null}
          <Box
            component="img"
            src={study.image}
            alt={study.imageAlt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: study.software ? 'contain' : 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </Box>
        <Box
          sx={{
            p: { xs: 2, md: compact ? 2 : 2.5 },
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: compact ? 0.65 : 1,
            minHeight: 0,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontFamily: v2.fontDisplay,
              fontWeight: 700,
              fontSize: compact ? '1.02rem' : '1.15rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: v2.text,
              minHeight: '1.35em',
            }}
          >
            {t(study.titleKey)}
          </Typography>
          {!compact ? (
            <>
              <CaseField
                label={t('homeV2.caseLabelContext')}
                value={t(study.contextKey)}
                fontBody={v2.fontBody}
                textSecondary={v2.textSecondary}
                text={v2.text}
              />
              <CaseField
                label={t('homeV2.caseLabelDeliverable')}
                value={t(study.deliverableKey)}
                fontBody={v2.fontBody}
                textSecondary={v2.textSecondary}
                text={v2.text}
              />
              <CaseField
                label={t('homeV2.caseLabelResult')}
                value={t(study.resultKey)}
                fontBody={v2.fontBody}
                textSecondary={v2.textSecondary}
                text={v2.text}
              />
            </>
          ) : (
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.86rem',
                color: v2.textSecondary,
                lineHeight: 1.45,
                minHeight: '2.9em',
              }}
            >
              {t(study.resultKey)}
            </Typography>
          )}
          <Typography
            sx={{
              mt: 'auto',
              pt: 1,
              fontFamily: v2.fontBody,
              fontWeight: 700,
              fontSize: '0.9rem',
              color: v2.brandOrange,
            }}
          >
            {t(study.ctaKey)} →
          </Typography>
        </Box>
      </Box>
    </ScrollReveal>
  )
}

/** Sites en grand, logiciels en second. */
export default function HomeV2CaseStudies() {
  const { t } = useLanguage()

  return (
    <HomeV2Section
      kicker={t('homeV2.caseStudiesKicker')}
      title={t('homeV2.caseStudiesTitle')}
      lead={t('homeV2.caseStudiesLead')}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
          mb: { xs: 3, md: 4 },
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}
      >
        {WEB_STUDIES.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </Box>

      <Typography
        sx={{
          fontFamily: 'var(--font-display), Outfit, sans-serif',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'inherit',
          opacity: 0.7,
          mb: 1.5,
        }}
      >
        {t('homeV2.caseSoftwareKicker')}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
        }}
      >
        {SOFTWARE_STUDIES.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index + 3} compact />
        ))}
      </Box>
    </HomeV2Section>
  )
}

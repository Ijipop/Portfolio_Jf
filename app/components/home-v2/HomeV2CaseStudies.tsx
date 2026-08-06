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
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'thermo',
    image: '/imgs/projets/1776087415283_Thermo.png',
    imageAlt: 'Thermo-Trappeur',
    titleKey: 'homeV2.caseThermoTitle',
    contextKey: 'homeV2.caseThermoContext',
    deliverableKey: 'homeV2.caseThermoDeliverable',
    resultKey: 'homeV2.caseThermoResult',
    ctaKey: 'homeV2.caseThermoCta',
    href: 'https://thermo-trappeur.vercel.app/',
    external: true,
  },
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
  },
]

const MEDIA_HEIGHT = { xs: 160, md: 176 }
const TITLE_MIN_HEIGHT = '1.35em'
/** ~2 lignes à 0.88rem × 1.5 — aligne Contexte / Livrable / Résultat entre cartes. */
const FIELD_MIN_HEIGHT = '2.7em'

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
        minHeight: FIELD_MIN_HEIGHT,
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

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const { t } = useLanguage()
  const { tokens: v2, cardSx } = useHomeV2Tokens()

  return (
    <ScrollReveal delay={index * 0.08} distance={24} fillHeight>
      <Box
        component={study.external ? 'a' : Link}
        href={study.href}
        {...(study.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        sx={{
          ...cardSx,
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
            height: MEDIA_HEIGHT,
            bgcolor: v2.bgElevated,
            borderBottom: `1px solid ${v2.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: study.id === 'thermo' ? 0 : 2.5,
          }}
        >
          <Box
            component="img"
            src={study.image}
            alt={study.imageAlt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: study.id === 'thermo' ? 'cover' : 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </Box>
        <Box
          sx={{
            p: { xs: 2, md: 2.5 },
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 1,
            minHeight: 0,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontFamily: v2.fontDisplay,
              fontWeight: 700,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: v2.text,
              minHeight: TITLE_MIN_HEIGHT,
            }}
          >
            {t(study.titleKey)}
          </Typography>
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

/** Sélection pro — contexte → livrable → résultat (remplace le bandeau Thermo seul). */
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
        }}
      >
        {CASE_STUDIES.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </Box>
    </HomeV2Section>
  )
}

'use client'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { CONTACT_SUBJECT_IMPROVE_SITE } from '@/i18n/contactSubjects'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import HomeV2Section from './HomeV2Section'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

type ServiceCard = {
  id: string
  icon: SvgIconComponent
  titleKey: string
  leadKey: string
  bulletKeys: [string, string, string]
  ctaKey: string
  href?: string
  improveSubject?: boolean
}

/** Lane Web uniquement — pas de soutien / logiciels ici. */
const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'web',
    icon: LanguageOutlinedIcon,
    titleKey: 'homeV2.serviceWebTitle',
    leadKey: 'homeV2.serviceWebLead',
    bulletKeys: ['homeV2.serviceWebB1', 'homeV2.serviceWebB2', 'homeV2.serviceWebB3'],
    ctaKey: 'homeV2.serviceWebCta',
    href: CONTACT_PATH,
  },
  {
    id: 'refonte',
    icon: RefreshOutlinedIcon,
    titleKey: 'homeV2.serviceRefonteTitle',
    leadKey: 'homeV2.serviceRefonteLead',
    bulletKeys: ['homeV2.serviceRefonteB1', 'homeV2.serviceRefonteB2', 'homeV2.serviceRefonteB3'],
    ctaKey: 'homeV2.serviceRefonteCta',
    improveSubject: true,
  },
  {
    id: 'forms',
    icon: DynamicFormOutlinedIcon,
    titleKey: 'home.servicesFormsTitle',
    leadKey: 'home.servicesFormsLead',
    bulletKeys: [
      'home.servicesFormsBullet1',
      'home.servicesFormsBullet2',
      'home.servicesFormsBullet3',
    ],
    ctaKey: 'homeV2.serviceWebCta',
    href: CONTACT_PATH,
  },
]

function ServiceCardItem({ card, index, href }: { card: ServiceCard; index: number; href: string }) {
  const { t } = useLanguage()
  const { tokens: v2, cardSx } = useHomeV2Tokens()
  const Icon = card.icon

  return (
    <ScrollReveal delay={index * 0.1} distance={28}>
      <Box
        sx={{
          ...cardSx,
          p: { xs: 2.5, md: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: v2.brandGlow,
            border: `1px solid ${v2.borderHover}`,
            mb: 2,
          }}
        >
          <Icon sx={{ color: v2.brandOrange, fontSize: 24 }} />
        </Box>

        <Typography
          component="h3"
          sx={{ fontFamily: v2.fontDisplay, fontWeight: 700, fontSize: '1.125rem', color: v2.text, mb: 1 }}
        >
          {t(card.titleKey)}
        </Typography>

        <Typography sx={{ fontFamily: v2.fontBody, fontSize: '0.9375rem', color: v2.textSecondary, lineHeight: 1.55, mb: 2 }}>
          {t(card.leadKey)}
        </Typography>

        <Stack spacing={0.75} sx={{ mb: 3, flex: 1 }}>
          {card.bulletKeys.map((key) => (
            <Stack key={key} direction="row" spacing={1} alignItems="flex-start">
              <CheckRoundedIcon sx={{ fontSize: 18, color: v2.brandOrange, mt: 0.15, flexShrink: 0 }} />
              <Typography sx={{ fontFamily: v2.fontBody, fontSize: '0.875rem', color: v2.textSecondary, lineHeight: 1.45 }}>
                {t(key)}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <HomeV2Cta href={href} variant="outline" fullWidth>
          {t(card.ctaKey)}
        </HomeV2Cta>
      </Box>
    </ScrollReveal>
  )
}

export default function HomeV2Services() {
  const { t, locale } = useLanguage()

  const cardHrefs = SERVICE_CARDS.map((card) => {
    if (card.improveSubject) {
      return `${CONTACT_PATH}?subject=${encodeURIComponent(CONTACT_SUBJECT_IMPROVE_SITE[locale])}`
    }
    return card.href ?? CONTACT_PATH
  })

  return (
    <HomeV2Section kicker={t('homeV2.servicesKicker')} title={t('homeV2.servicesTitle')} lead={t('homeV2.servicesLead')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
        }}
      >
        {SERVICE_CARDS.map((card, index) => (
          <ServiceCardItem key={card.id} card={card} index={index} href={cardHrefs[index]} />
        ))}
      </Box>
    </HomeV2Section>
  )
}

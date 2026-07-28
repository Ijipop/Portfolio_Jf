'use client'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SvgIconComponent } from '@mui/icons-material'
import { BorderBeam } from '@/components/ui/border-beam'
import { useLanguage } from '@/contexts/LanguageContext'
import PreviewCta from './PreviewCta'
import PreviewReveal from './PreviewReveal'
import PreviewSection from './PreviewSection'
import { PREVIEW, PREVIEW_ORANGE_GRADIENT } from './previewTokens'

const CONTACT_PATH = '/portfolio/contact'

type Pack = {
  id: string
  icon: SvgIconComponent
  titleKey: string
  priceKey: string
  pricePrefixKey?: string
  forKey: string
  bulletKeys: readonly string[]
  ctaKey: string
  subjectKey: string
  featured?: boolean
  badgeKey?: string
}

const WEB_PACKS: Pack[] = [
  {
    id: 'page',
    icon: LanguageOutlinedIcon,
    titleKey: 'home.servicesPackPageTitle',
    pricePrefixKey: 'home.servicesPackPriceFrom',
    priceKey: 'home.servicesPackPagePrice',
    forKey: 'home.servicesPackPageFor',
    bulletKeys: ['home.servicesPackPageB1', 'home.servicesPackPageB2', 'home.servicesPackPageB3'],
    ctaKey: 'home.servicesPackPageCta',
    subjectKey: 'home.servicesPackPageSubject',
    featured: true,
    badgeKey: 'home.servicesPackPageBadge',
  },
  {
    id: 'audit',
    icon: ManageSearchOutlinedIcon,
    titleKey: 'home.servicesPackAuditTitle',
    priceKey: 'home.servicesPackAuditPrice',
    forKey: 'home.servicesPackAuditFor',
    bulletKeys: ['home.servicesPackAuditB1', 'home.servicesPackAuditB2', 'home.servicesPackAuditB3'],
    ctaKey: 'home.servicesPackAuditCta',
    subjectKey: 'home.servicesPackAuditSubject',
  },
  {
    id: 'minisite',
    icon: WebAssetOutlinedIcon,
    titleKey: 'home.servicesPackMinisiteTitle',
    priceKey: 'home.servicesPackMinisitePrice',
    forKey: 'home.servicesPackMinisiteFor',
    bulletKeys: ['home.servicesPackMinisiteB1', 'home.servicesPackMinisiteB2', 'home.servicesPackMinisiteB3'],
    ctaKey: 'home.servicesPackMinisiteCta',
    subjectKey: 'home.servicesPackMinisiteSubject',
  },
]

function PackCard({ pack, index }: { pack: Pack; index: number }) {
  const { t } = useLanguage()
  const Icon = pack.icon
  const featured = pack.featured === true
  const href = `${CONTACT_PATH}?subject=${encodeURIComponent(t(pack.subjectKey))}`

  return (
    <PreviewReveal delay={index * 0.08}>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          p: { xs: 2.75, md: featured ? 3.75 : 3.25 },
          borderRadius: `${PREVIEW.radiusLg}px`,
          border: `1px solid ${featured ? PREVIEW.borderHover : PREVIEW.border}`,
          background: featured
            ? `linear-gradient(160deg, rgba(234,88,12,0.12) 0%, ${PREVIEW.surface} 45%, rgba(255,255,255,0.02) 100%)`
            : PREVIEW.surface,
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: featured
              ? `0 28px 70px rgba(0,0,0,0.4), 0 0 60px ${PREVIEW.orangeGlow}`
              : `0 24px 50px rgba(0,0,0,0.35)`,
          },
        }}
      >
        {featured ? (
          <BorderBeam
            size={90}
            duration={8}
            borderWidth={1.5}
            colorFrom="#ea580c"
            colorTo="#fb923c"
          />
        ) : null}

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.25 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              display: 'grid',
              placeItems: 'center',
              background: featured ? PREVIEW_ORANGE_GRADIENT : PREVIEW.orangeGlow,
            }}
          >
            <Icon sx={{ color: featured ? '#fff' : PREVIEW.orangeLight, fontSize: 22 }} />
          </Box>
          {pack.badgeKey ? (
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                px: 1.35,
                py: 0.55,
                borderRadius: '999px',
                color: PREVIEW.orangeLight,
                border: `1px solid ${PREVIEW.borderHover}`,
                background: PREVIEW.orangeGlow,
              }}
            >
              {t(pack.badgeKey)}
            </Typography>
          ) : null}
        </Stack>

        <Typography
          component="h3"
          sx={{
            fontFamily: PREVIEW.fontDisplay,
            fontWeight: 700,
            fontSize: featured ? '1.35rem' : '1.1rem',
            letterSpacing: '-0.025em',
            color: PREVIEW.text,
            mb: 0.85,
          }}
        >
          {t(pack.titleKey)}
        </Typography>

        <Typography
          sx={{
            fontFamily: PREVIEW.fontDisplay,
            fontWeight: 800,
            fontSize: featured ? '2rem' : '1.65rem',
            letterSpacing: '-0.03em',
            color: PREVIEW.text,
            mb: 0.6,
          }}
        >
          {pack.pricePrefixKey ? `${t(pack.pricePrefixKey)} ` : ''}
          {t(pack.priceKey)}
        </Typography>

        <Typography
          sx={{
            fontFamily: PREVIEW.fontBody,
            fontSize: '0.88rem',
            color: PREVIEW.textMuted,
            lineHeight: 1.5,
            mb: 2.25,
          }}
        >
          {t(pack.forKey)}
        </Typography>

        <Stack spacing={0.85} sx={{ mb: 3, flex: 1 }}>
          {pack.bulletKeys.map((key) => (
            <Stack key={key} direction="row" spacing={1} alignItems="flex-start">
              <CheckRoundedIcon sx={{ fontSize: 17, color: PREVIEW.orange, mt: 0.2, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontFamily: PREVIEW.fontBody,
                  fontSize: '0.84rem',
                  color: PREVIEW.textSecondary,
                  lineHeight: 1.45,
                }}
              >
                {t(key)}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <PreviewCta href={href} variant={featured ? 'primary' : 'secondary'} fullWidth>
          {t(pack.ctaKey)}
        </PreviewCta>
      </Box>
    </PreviewReveal>
  )
}

export default function PreviewPricing() {
  const { t } = useLanguage()
  const featured = WEB_PACKS.find((p) => p.featured)!
  const others = WEB_PACKS.filter((p) => !p.featured)

  return (
    <PreviewSection
      id="forfaits"
      kicker={t('homeV2.pricingKicker')}
      title={t('homeV2.pricingTitle')}
      lead={t('homeV2.pricingLead')}
    >
      <Box sx={{ mb: 3 }}>
        <PackCard pack={featured} index={0} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {others.map((pack, index) => (
          <PackCard key={pack.id} pack={pack} index={index + 1} />
        ))}
      </Box>
      <Typography
        sx={{
          mt: 3.5,
          fontFamily: PREVIEW.fontBody,
          fontSize: '0.9rem',
          color: PREVIEW.textMuted,
          textAlign: 'center',
          lineHeight: 1.55,
        }}
      >
        {t('homeV2.pricingFootnote')}
      </Typography>
    </PreviewSection>
  )
}

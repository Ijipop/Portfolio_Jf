'use client'

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import CTAButton from '@/components/shared/CTAButton'
import {
  BRAND_GLITCH_GRADIENT,
  buildPaletteGlitchGradient,
} from './IjipopGlitchTitle'
import ScrollReveal from './ScrollReveal'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { CONTACT_SUBJECT_IMPROVE_SITE } from '@/i18n/contactSubjects'
import { REASSURANCE_BANNER_COPY } from '@/i18n/reassuranceBannerCopy'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import type { SvgIconComponent } from '@mui/icons-material'

const CONTACT_PATH = '/portfolio/contact'
const TIMELENDR_PATH = '/logiciel/timelendr'
const SEO_LANDING_PATH = '/creation-site-web-montreal'
const SUPPORT_LANDING_PATH = '/soutien-informatique-montreal'
/** Nombre de lignes « puce » — identique sur les cartes pour l’alignement visuel. */
const PACK_BULLET_SLOTS = 4
const PACK_BULLET_ROW_MIN = 48
/** Hauteur commune des bandeaux orange (notes courtes). */
const PACK_HEADER_HEIGHT = { xs: 268, md: 280, lg: 292 }
/** Délai entre chaque carte offre (gauche → droite). */
const OFFER_CARD_STAGGER_S = 0.15
type PackOffer = {
  id: string
  icon: SvgIconComponent
  titleKey: string
  priceKey: string
  pricePrefixKey?: string
  priceNoteKey?: string
  forKey: string
  bulletKeys: readonly string[]
  ctaKey: string
  subjectKey: string
  secondaryCtaKey?: string
  secondaryHref?: string
  featured?: boolean
  badgeKey?: string
}

const PACK_OFFERS: PackOffer[] = [
  {
    id: 'audit',
    icon: ManageSearchOutlinedIcon,
    titleKey: 'home.servicesPackAuditTitle',
    priceKey: 'home.servicesPackAuditPrice',
    forKey: 'home.servicesPackAuditFor',
    bulletKeys: ['home.servicesPackAuditB1', 'home.servicesPackAuditB2', 'home.servicesPackAuditB3'],
    priceNoteKey: 'home.servicesPackAuditPriceNote',
    ctaKey: 'home.servicesPackAuditCta',
    subjectKey: 'home.servicesPackAuditSubject',
  },
  {
    id: 'minisite',
    icon: WebAssetOutlinedIcon,
    titleKey: 'home.servicesPackMinisiteTitle',
    priceKey: 'home.servicesPackMinisitePrice',
    priceNoteKey: 'home.servicesPackMinisitePriceNote',
    forKey: 'home.servicesPackMinisiteFor',
    bulletKeys: [
      'home.servicesPackMinisiteB1',
      'home.servicesPackMinisiteB2',
      'home.servicesPackMinisiteB3',
      'home.servicesPackMinisiteB4',
    ],
    ctaKey: 'home.servicesPackMinisiteCta',
    subjectKey: 'home.servicesPackMinisiteSubject',
  },
  {
    id: 'page',
    icon: LanguageOutlinedIcon,
    titleKey: 'home.servicesPackPageTitle',
    pricePrefixKey: 'home.servicesPackPriceFrom',
    priceKey: 'home.servicesPackPagePrice',
    forKey: 'home.servicesPackPageFor',
    bulletKeys: [
      'home.servicesPackPageB1',
      'home.servicesPackPageB2',
      'home.servicesPackPageB3',
      'home.servicesPackPageB4',
    ],
    ctaKey: 'home.servicesPackPageCta',
    subjectKey: 'home.servicesPackPageSubject',
    featured: true,
    badgeKey: 'home.servicesPackPageBadge',
  },
  {
    id: 'software',
    icon: CodeOutlinedIcon,
    titleKey: 'home.servicesPackSoftwareTitle',
    pricePrefixKey: 'home.servicesPackPriceFromDes',
    priceKey: 'home.servicesPackSoftwarePrice',
    priceNoteKey: 'home.servicesPackSoftwarePriceNote',
    forKey: 'home.servicesPackSoftwareFor',
    bulletKeys: [
      'home.servicesPackSoftwareB1',
      'home.servicesPackSoftwareB2',
      'home.servicesPackSoftwareB3',
      'home.servicesPackSoftwareB4',
    ],
    ctaKey: 'home.servicesPackSoftwareCta',
    subjectKey: 'home.servicesPackSoftwareSubject',
    secondaryCtaKey: 'home.servicesPackSoftwareDemoCta',
    secondaryHref: TIMELENDR_PATH,
  },
  {
    id: 'support',
    icon: ComputerOutlinedIcon,
    titleKey: 'home.servicesPackSupportTitle',
    priceKey: 'home.servicesPackSupportPrice',
    priceNoteKey: 'home.servicesPackSupportPriceNote',
    forKey: 'home.servicesPackSupportFor',
    bulletKeys: [
      'home.servicesPackSupportB1',
      'home.servicesPackSupportB2',
      'home.servicesPackSupportB3',
      'home.servicesPackSupportB4',
    ],
    ctaKey: 'home.servicesPackSupportCta',
    subjectKey: 'home.servicesPackSupportSubject',
    secondaryCtaKey: 'home.servicesPackSupportDetailCta',
    secondaryHref: SUPPORT_LANDING_PATH,
  },
]

function contactHref(subject: string) {
  return `${CONTACT_PATH}?subject=${encodeURIComponent(subject)}`
}

type OfferPackCardProps = {
  offer: PackOffer
  href: string
  serviceGradient: string
  textColor: string
  primary: string
  secondary: string
  isTopologyRoute: boolean
}

function OfferPackCard({
  offer,
  href,
  serviceGradient,
  textColor,
  primary,
  secondary,
  isTopologyRoute,
}: OfferPackCardProps) {
  const { t } = useLanguage()
  const theme = useTheme()
  const Icon = offer.icon
  const isDark = theme.palette.mode === 'dark'
  const featured = offer.featured === true

  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: featured ? 'elevated' : 'glass',
    level: featured ? 'balanced' : 'soft',
    interactive: false,
  })

  const cardBg = featured
    ? isDark
      ? `linear-gradient(165deg, ${alpha(primary, 0.22)} 0%, ${alpha('#0f172a', 0.92)} 38%, ${alpha(secondary, 0.12)} 100%)`
      : `linear-gradient(165deg, ${alpha(primary, 0.12)} 0%, ${alpha('#fff', 0.98)} 42%, ${alpha(secondary, 0.08)} 100%)`
    : isDark
      ? `linear-gradient(160deg, ${alpha('#1e293b', 0.85)} 0%, ${alpha('#0f172a', 0.75)} 100%)`
      : `linear-gradient(160deg, ${alpha('#fff', 0.96)} 0%, ${alpha(primary, 0.04)} 100%)`

  const cardRadius = DESIGN_TOKENS.borderRadius.banner
  const innerRadius = DESIGN_TOKENS.borderRadius.bannerInner

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        height: '100%',
        gridRow: 'span 2',
        display: 'grid',
        gridTemplateRows: 'subgrid',
        justifySelf: 'stretch',
        borderRadius: cardRadius,
        overflow: 'hidden',
        background: cardBg,
        border: `1px solid ${alpha(primary, featured ? 0.4 : isDark ? 0.28 : 0.18)}`,
        boxShadow: featured
          ? `0 20px 44px ${alpha(primary, 0.18)}, 0 0 0 1px ${alpha(primary, 0.1)}`
          : `0 12px 32px ${alpha(isDark ? '#000' : primary, isDark ? 0.3 : 0.08)}`,
        transition: DESIGN_TOKENS.transitions.slow,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: featured
            ? `0 24px 48px ${alpha(primary, 0.22)}`
            : `0 16px 36px ${alpha(primary, 0.12)}`,
        },
        ...surfaceSx,
      }}
    >
      {/* Bandeau orange : icône (+ badge) → titre → prix / notes — hauteur fixe alignée */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minWidth: 0,
          alignSelf: 'stretch',
          flexShrink: 0,
          minHeight: PACK_HEADER_HEIGHT,
          boxSizing: 'border-box',
          px: { xs: 2, md: 2.25, lg: 1.75 },
          pt: { xs: 2, md: 2.25, lg: 2 },
          pb: 1.75,
          background: serviceGradient,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 55%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            flexShrink: 0,
            minHeight: 44,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: innerRadius,
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha('#fff', 0.2),
              border: `1px solid ${alpha('#fff', 0.32)}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Icon sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          {offer.badgeKey ? (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.45,
                flexShrink: 0,
                px: 1.1,
                py: 0.5,
                borderRadius: 999,
                background: `linear-gradient(135deg, #fffef7 0%, #fde68a 42%, #fbbf24 100%)`,
                color: '#78350f',
                fontWeight: 800,
                fontSize: { xs: '0.75rem', sm: '0.62rem' },
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                boxShadow: `0 4px 16px ${alpha('#000', 0.22)}, inset 0 1px 0 ${alpha('#fff', 0.75)}`,
                border: `1px solid ${alpha('#fff', 0.65)}`,
                '@keyframes offerBadgeSparkle': {
                  '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
                  '50%': { transform: 'scale(1.12) rotate(-8deg)', opacity: 0.92 },
                },
              }}
            >
              <AutoAwesomeOutlinedIcon
                sx={{
                  fontSize: 13,
                  color: '#b45309',
                  flexShrink: 0,
                  '@media (prefers-reduced-motion: no-preference)': {
                    animation: 'offerBadgeSparkle 2.6s ease-in-out infinite',
                  },
                }}
                aria-hidden
              />
              <Box component="span">{t(offer.badgeKey)}</Box>
            </Box>
          ) : (
            <Box sx={{ flex: 1 }} aria-hidden />
          )}
        </Box>

        <Typography
          variant="h6"
          component="h3"
          sx={{
            position: 'relative',
            zIndex: 1,
            color: '#fff',
            fontWeight: 900,
            fontSize: { xs: '1.3rem', md: '1.45rem', lg: '1.12rem' },
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            textShadow: `0 2px 10px ${alpha('#000', 0.18)}`,
            m: 0,
            flexShrink: 0,
          }}
        >
          {t(offer.titleKey)}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          {offer.pricePrefixKey ? (
            <Typography
              component="p"
              sx={{
                color: alpha('#fff', 0.88),
                fontSize: { xs: '0.8rem', md: '0.85rem' },
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                m: 0,
                lineHeight: 1.25,
              }}
            >
              {t(offer.pricePrefixKey)}
            </Typography>
          ) : null}
          <Typography
            component="p"
            sx={{
              color: '#fff',
              fontWeight: 900,
              fontSize: { xs: '1.5rem', md: '1.65rem', lg: '1.38rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textShadow: `0 2px 10px ${alpha('#000', 0.18)}`,
              m: 0,
            }}
          >
            {t(offer.priceKey)}
          </Typography>
          {offer.priceNoteKey ? (
            <Typography
              sx={{
                color: alpha('#fff', 0.88),
                fontSize: { xs: '0.82rem', md: '0.88rem' },
                lineHeight: 1.45,
                fontWeight: 500,
                m: 0,
                pt: 0.25,
              }}
            >
              {t(offer.priceNoteKey)}
            </Typography>
          ) : null}
        </Box>
      </Box>

      {/* Corps */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          minWidth: 0,
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          minHeight: 0,
          boxSizing: 'border-box',
          px: { xs: 2.25, md: 2.5, lg: 1.75 },
          py: { xs: 2, md: 2.25, lg: 2 },
          gap: 1.5,
        }}
      >
        <Box sx={{ width: '100%', minHeight: { xs: 72, md: 76 } }}>
          <Typography
            sx={{
              color: textColor,
              opacity: 0.78,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              fontStyle: 'italic',
              minHeight: '3em',
              textAlign: 'center',
            }}
          >
            {t(offer.forKey)}
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateRows: `repeat(${PACK_BULLET_SLOTS}, minmax(${PACK_BULLET_ROW_MIN}px, auto))`,
            gap: 0.75,
            flex: 1,
            justifyItems: 'stretch',
          }}
        >
          {Array.from({ length: PACK_BULLET_SLOTS }, (_, i) => {
            const key = offer.bulletKeys[i]
            if (!key) {
              return (
                <Box
                  key={`bullet-pad-${offer.id}-${i}`}
                  aria-hidden
                  sx={{ width: '100%', minHeight: PACK_BULLET_ROW_MIN }}
                />
              )
            }
            return (
            <Box
              key={key}
              sx={{
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: 1,
                py: 0.75,
                px: 1.25,
                minHeight: PACK_BULLET_ROW_MIN,
                borderRadius: innerRadius,
                bgcolor: alpha(primary, isDark ? 0.12 : 0.06),
                border: `1px solid ${alpha(primary, isDark ? 0.2 : 0.1)}`,
              }}
            >
              <CheckRoundedIcon
                sx={{ fontSize: 18, color: primary, mt: '2px', flexShrink: 0 }}
                aria-hidden
              />
              <Typography
                sx={{
                  color: textColor,
                  opacity: 0.92,
                  fontSize: { xs: '0.84rem', lg: '0.78rem' },
                  lineHeight: 1.45,
                  fontWeight: 500,
                  textAlign: 'center',
                  maxWidth: '100%',
                }}
              >
                {t(key)}
              </Typography>
            </Box>
            )
          })}
        </Box>

        <Box
          sx={{
            mt: 'auto',
            pt: 0.5,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 1,
          }}
        >
          <CTAButton
            fullWidth
            size="medium"
            variant={featured ? 'primary' : 'outline'}
            href={href}
            sx={{
              width: '100%',
              maxWidth: '100%',
              alignSelf: 'stretch',
              whiteSpace: 'normal',
              textAlign: 'center',
              lineHeight: 1.35,
              '& .MuiButton-label': { whiteSpace: 'normal' },
            }}
          >
            {t(offer.ctaKey)}
          </CTAButton>
          {offer.secondaryCtaKey && offer.secondaryHref ? (
            <CTAButton
              fullWidth
              size="small"
              variant="outline"
              href={offer.secondaryHref}
              sx={{
                width: '100%',
                maxWidth: '100%',
                alignSelf: 'stretch',
                whiteSpace: 'normal',
                textAlign: 'center',
                lineHeight: 1.35,
                '& .MuiButton-label': { whiteSpace: 'normal' },
              }}
            >
              {t(offer.secondaryCtaKey)}
            </CTAButton>
          ) : null}
          {offer.id === 'page' ? (
            <Link href={SEO_LANDING_PATH} style={{ textDecoration: 'none', width: '100%' }}>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  color: primary,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  lineHeight: 1.45,
                  mt: 0.5,
                  opacity: 0.9,
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                {t('seo.servicesPackLink')}
              </Typography>
            </Link>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export default function PortfolioServicesSection() {
  const { t, locale } = useLanguage()
  const reassurance = REASSURANCE_BANNER_COPY[locale]
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { mode: presentationMode } = usePresentationMode()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const subtitle = t('home.servicesHomeSubtitle')

  const serviceGradient = useMemo(
    () =>
      presentationMode === 'beige'
        ? BRAND_GLITCH_GRADIENT
        : buildPaletteGlitchGradient(primary, secondary, accent),
    [presentationMode, primary, secondary, accent],
  )

  return (
    <Box id="services" sx={{ mb: { xs: 5, md: 8 }, scrollMarginTop: 96 }}>
      <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 3, md: 4 } }}>
          <Typography
            component="p"
            sx={{
              color: primary,
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              mb: 1,
            }}
          >
            {t('home.servicesHomeKicker')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: textColor,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontSize: { xs: '1.85rem', md: '2.75rem' },
              lineHeight: 1.08,
              mb: subtitle ? 1.25 : 0,
            }}
          >
            {t('home.servicesHomeTitle')}
          </Typography>
          {subtitle ? (
            <Typography
              component="p"
              sx={{
                color: textColor,
                opacity: 0.8,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.08}>
        <Box
          sx={{
            maxWidth: 680,
            mx: 'auto',
            mb: { xs: 3, md: 4 },
            px: { xs: 2, sm: 2.5 },
            py: { xs: 2, sm: 2.25 },
            borderRadius: 2,
            border: `1px solid ${alpha(primary, 0.22)}`,
            bgcolor: alpha(primary, 0.06),
            textAlign: 'center',
          }}
        >
          <Typography
            component="p"
            sx={{
              color: textColor,
              fontWeight: 800,
              fontSize: { xs: '1rem', sm: '1.08rem' },
              mb: 1,
            }}
          >
            {reassurance.title}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: textColor,
              opacity: 0.88,
              fontSize: { xs: '0.9rem', sm: '0.95rem' },
              lineHeight: 1.55,
              mb: 1.5,
            }}
          >
            {reassurance.lead}
          </Typography>
          <Link
            href={contactHref(CONTACT_SUBJECT_IMPROVE_SITE[locale])}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              component="span"
              sx={{
                color: primary,
                fontWeight: 700,
                fontSize: '0.9rem',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {reassurance.cta}
            </Typography>
          </Link>
        </Box>
      </ScrollReveal>

      <Box
        sx={{
          width: { lg: 'min(100vw - 32px, 1720px)' },
          maxWidth: { lg: '1720px' },
          position: 'relative',
          left: { lg: '50%' },
          transform: { lg: 'translateX(-50%)' },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(5, minmax(0, 1fr))',
          },
          gridTemplateRows: 'auto 1fr',
          gap: { xs: 2, md: 2, lg: 1.5 },
          alignItems: 'stretch',
          justifyItems: 'stretch',
          '& > *': { minWidth: 0, width: '100%' },
          '& > *:nth-of-type(5)': {
            gridColumn: { sm: '1 / -1', lg: 'auto' },
            maxWidth: { sm: 420, md: 480, lg: 'none' },
            width: { sm: '100%', lg: '100%' },
            justifySelf: { sm: 'center', lg: 'stretch' },
          },
        }}
      >
        {PACK_OFFERS.map((offer, index) => {
          const subject = t(offer.subjectKey)
          const href = contactHref(subject)

          return (
            <ScrollReveal
              key={offer.id}
              direction="right"
              distance={32}
              duration={0.68}
              delay={index * OFFER_CARD_STAGGER_S}
              uncappedDelay
              fillHeight
            >
              <OfferPackCard
                offer={offer}
                href={href}
                serviceGradient={serviceGradient}
                textColor={textColor}
                primary={primary}
                secondary={secondary}
                isTopologyRoute={isTopologyRoute}
              />
            </ScrollReveal>
          )
        })}
      </Box>
    </Box>
  )
}

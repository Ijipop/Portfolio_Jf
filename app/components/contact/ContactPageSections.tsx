'use client'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GitHubIcon from '@mui/icons-material/GitHub'
import HandshakeIcon from '@mui/icons-material/Handshake'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { memo } from 'react'
import ThreeDCardComponent from '@/components/ThreeDCard'
import CTAButton from '@/components/shared/CTAButton'
import HeaderSection from '@/components/shared/HeaderSection'
import IjipopGlitchTitle from '@/components/shared/IjipopGlitchTitle'
import ContactCoffeeVideo from '@/components/contact/ContactCoffeeVideo'
import { DESIGN_TOKENS } from '@/design-system/constants'

const SocialCardContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  minHeight: 0,
}))

const SocialIconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  transition: DESIGN_TOKENS.transitions.normal,
  boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
  '&:hover': {
    transform: 'translateY(-4px) scale(1.1)',
    boxShadow: `0 8px 30px ${theme.palette.primary.main}55`,
  },
}))

type ContactPageHeaderProps = {
  titleText: string
  subtitle: string
}

export const ContactPageHeader = memo(function ContactPageHeader({
  titleText,
  subtitle,
}: ContactPageHeaderProps) {
  return (
    <HeaderSection
      title={<IjipopGlitchTitle text={titleText} />}
      subtitle={subtitle}
    />
  )
})

type ContactPromisesBarProps = {
  labels: [string, string, string]
  primary: string
  textColor: string
  compact: boolean
}

const PROMISE_ICONS = [AccessTimeIcon, HandshakeIcon, RequestQuoteIcon] as const

export const ContactPromisesBar = memo(function ContactPromisesBar({
  labels,
  primary,
  textColor,
  compact,
}: ContactPromisesBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1.25,
        mb: compact ? 3 : 4,
      }}
    >
      {labels.map((label, index) => {
        const Icon = PROMISE_ICONS[index]
        return (
          <Box
            key={label}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.85,
              px: { xs: 1.4, sm: 1.75 },
              py: 1,
              borderRadius: 999,
              border: `1px solid ${primary}42`,
              color: textColor,
              background: `${primary}10`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontSize: { xs: '0.8125rem', sm: '0.86rem' },
              fontWeight: 800,
              letterSpacing: '0.02em',
            }}
          >
            <Icon sx={{ fontSize: 18, color: primary }} />
            {label}
          </Box>
        )
      })}
    </Box>
  )
})

type ContactLocationCardProps = {
  locationTitle: string
  locationCity: string
  primary: string
  textColor: string
  compact: boolean
}

export const ContactLocationCard = memo(function ContactLocationCard({
  locationTitle,
  locationCity,
  primary,
  textColor,
  compact,
}: ContactLocationCardProps) {
  return (
    <Box className="perf-cv-auto" sx={{ maxWidth: 800, mx: 'auto', mb: compact ? 4 : 6 }}>
      <ThreeDCardComponent floatingElements={2} sx={{ padding: { xs: 2, sm: 2.5, md: 3 } }}>
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LocationOnIcon sx={{ fontSize: 40, color: primary, mb: 1.5 }} />
          <Typography variant="h6" gutterBottom sx={{ color: primary }}>
            {locationTitle}
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.85, lineHeight: 1.6 }}>
            {locationCity}
          </Typography>
        </Box>
      </ThreeDCardComponent>
    </Box>
  )
})

type ContactSocialSectionProps = {
  followMeTitle: string
  linkedInDesc: string
  githubDesc: string
  viewProfileLabel: string
  viewReposLabel: string
  primary: string
  textColor: string
  compact: boolean
}

export const ContactSocialSection = memo(function ContactSocialSection({
  followMeTitle,
  linkedInDesc,
  githubDesc,
  viewProfileLabel,
  viewReposLabel,
  primary,
  textColor,
  compact,
}: ContactSocialSectionProps) {
  return (
    <Box className="perf-cv-auto" sx={{ mt: compact ? 4 : 8, mb: compact ? 4 : 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 4, textAlign: 'center', fontWeight: 700, color: primary }}
      >
        {followMeTitle}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 4,
          maxWidth: 800,
          mx: 'auto',
          alignItems: 'stretch',
        }}
      >
        <ThreeDCardComponent
          onClick={() =>
            window.open('https://www.linkedin.com/in/jean-fran%C3%A7ois-lefebvre-92380329a/', '_blank')
          }
          floatingElements={2}
          sx={{
            height: '100%',
            minHeight: { xs: 220, sm: 240 },
            padding: { xs: 2, sm: 2.5 },
            display: 'flex',
            flexDirection: 'column',
            '& .MuiCardContent-root': {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            },
          }}
        >
          <SocialCardContent>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <SocialIconWrapper>
                <LinkedInIcon sx={{ fontSize: 40 }} />
              </SocialIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: primary }}>
                LinkedIn
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
                {linkedInDesc}
              </Typography>
            </Box>
            <CTAButton variant="outline" size="small" fullWidth>
              {viewProfileLabel}
            </CTAButton>
          </SocialCardContent>
        </ThreeDCardComponent>

        <ThreeDCardComponent
          onClick={() => window.open('https://github.com/Ijipop', '_blank')}
          floatingElements={2}
          sx={{
            height: '100%',
            minHeight: { xs: 220, sm: 240 },
            padding: { xs: 2, sm: 2.5 },
            display: 'flex',
            flexDirection: 'column',
            '& .MuiCardContent-root': {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            },
          }}
        >
          <SocialCardContent>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <SocialIconWrapper>
                <GitHubIcon sx={{ fontSize: 40 }} />
              </SocialIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: primary }}>
                GitHub
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
                {githubDesc}
              </Typography>
            </Box>
            <CTAButton variant="outline" size="small" fullWidth>
              {viewReposLabel}
            </CTAButton>
          </SocialCardContent>
        </ThreeDCardComponent>
      </Box>
    </Box>
  )
})

type ContactCoffeeSectionProps = {
  compact: boolean
}

export const ContactCoffeeSection = memo(function ContactCoffeeSection({
  compact,
}: ContactCoffeeSectionProps) {
  return (
    <Box className="perf-cv-auto">
      <ContactCoffeeVideo compact={compact} />
    </Box>
  )
})

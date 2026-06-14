'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import HomeV2Section from './HomeV2Section'
import { HOME_V2, homeV2CardSx } from './homeV2Tokens'

const TIMELENDR_PATH = '/logiciel/timelendr'
const CONTACT_PATH = '/portfolio/contact'

export default function HomeV2ToolsBand() {
  const { t } = useLanguage()
  const softwareSubject = encodeURIComponent(t('home.servicesPackSoftwareSubject'))

  return (
    <HomeV2Section
      kicker={t('homeV2.toolsKicker')}
      title={t('homeV2.toolsTitle')}
      lead={t('homeV2.toolsLead')}
    >
      <ScrollReveal distance={24}>
        <Box
          sx={{
            ...homeV2CardSx,
            p: { xs: 2.5, md: 3.5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.9375rem', color: HOME_V2.textMuted, mb: 2, lineHeight: 1.5 }}>
              {t('homeV2.toolsPositioning')}
            </Typography>

            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                background: HOME_V2.surfaceHover,
                border: `1px solid ${HOME_V2.border}`,
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: HOME_V2.text, mb: 0.5 }}>
                {t('homeV2.toolsTimelendrLabel')}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: HOME_V2.textSecondary, mb: 1 }}>
                {t('homeV2.toolsTimelendrDesc')}
              </Typography>
              <Typography
                component={Link}
                href={TIMELENDR_PATH}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: HOME_V2.brandOrange,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {t('homeV2.toolsTimelendrLink')}
              </Typography>
            </Box>
          </Box>

          <Stack sx={{ flexShrink: 0, minWidth: { md: 220 } }}>
            <HomeV2Cta href={`${CONTACT_PATH}?subject=${softwareSubject}`} variant="primary" fullWidth>
              {t('homeV2.toolsCta')}
            </HomeV2Cta>
          </Stack>
        </Box>
      </ScrollReveal>
    </HomeV2Section>
  )
}

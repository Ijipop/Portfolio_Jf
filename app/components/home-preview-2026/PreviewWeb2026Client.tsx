'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AppBarComponent from '@/components/appBar'
import LaneCrossLinks from '@/components/home/LaneCrossLinks'
import Footer from '@/components/Footer'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import PreviewAtmosphere from './PreviewAtmosphere'
import PreviewCredibility from './PreviewCredibility'
import PreviewDemosCta from './PreviewDemosCta'
import PreviewFinalCta from './PreviewFinalCta'
import PreviewHero from './PreviewHero'
import PreviewPricing from './PreviewPricing'
import PreviewServices from './PreviewServices'
import { PREVIEW } from './previewTokens'

export default function PreviewWeb2026Client() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100dvh',
        background: PREVIEW.bg,
        color: PREVIEW.text,
        fontFamily: PREVIEW.fontBody,
        overflowX: 'hidden',
      }}
    >
      <PreviewAtmosphere />

      <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            borderBottom: `1px solid ${PREVIEW.border}`,
            background: 'rgba(10, 10, 12, 0.72)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <AppBarComponent />
          <Box
            sx={{
              px: 2,
              py: 0.65,
              textAlign: 'center',
              borderTop: `1px solid ${PREVIEW.border}`,
            }}
          >
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: PREVIEW.orangeLight,
              }}
            >
              Preview 2026 — non branché · /portfolio inchangé
            </Typography>
          </Box>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: PREVIEW.maxWidth,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            flex: 1,
          }}
        >
          <PreviewHero />
          <PreviewServices />
          <PreviewPricing />
          <PreviewCredibility />
          <PreviewDemosCta />
          <PreviewFinalCta />
          <Box sx={{ pb: { xs: 4, md: 6 } }}>
            <LaneCrossLinks current="web" />
          </Box>
        </Container>

        <Footer mobileBottomClearance />
        <ScrollTriggeredStickyCTA textKey="homeV2.heroCtaPrimary" />
      </Box>
    </Box>
  )
}

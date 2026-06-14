'use client'

import Box from '@mui/material/Box'
import HomeV2Backdrop from './HomeV2Backdrop'
import HomeV2Credibility from './HomeV2Credibility'
import HomeV2FinalCta from './HomeV2FinalCta'
import HomeV2Footer from './HomeV2Footer'
import HomeV2Header from './HomeV2Header'
import HomeV2Hero from './HomeV2Hero'
import HomeV2Pricing from './HomeV2Pricing'
import HomeV2Services from './HomeV2Services'
import HomeV2ToolsBand from './HomeV2ToolsBand'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import { useLanguage } from '@/contexts/LanguageContext'
import { HOME_V2 } from './homeV2Tokens'

export default function HomeV2Client() {
  const { t } = useLanguage()

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        color: HOME_V2.text,
        backgroundColor: HOME_V2.bg,
        isolation: 'isolate',
      }}
    >
      <HomeV2Backdrop />
      <HomeV2Header />

      <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
        <HomeV2Hero />
        <HomeV2Services />
        <HomeV2Pricing />
        <HomeV2ToolsBand />
        <HomeV2Credibility />
        <HomeV2FinalCta />
        <HomeV2Footer />
      </Box>

      <ScrollTriggeredStickyCTA
        href="/portfolio/contact"
        text={t('homeV2.heroCtaPrimary')}
      />
    </Box>
  )
}

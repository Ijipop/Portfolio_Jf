'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import SeoInternalLinkCta from '@/components/seo/SeoInternalLinkCta'
import { AdvancedThemeIslandProvider } from '@/contexts/AdvancedThemeContext'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import styles from './DemosIndex.module.css'

function DemosSeoCtaBody() {
  const { t } = useLanguage()

  return (
    <div className={styles.seoCtaWrap}>
      <SeoInternalLinkCta
        title={t('seo.demosTitle')}
        body={t('seo.demosBody')}
        href="/portfolio/projets?type=web"
        linkLabel={t('common.getEstimate')}
        variant="compact"
      />
    </div>
  )
}

/** CTA SEO du hub — îlot MUI + i18n hors ThemeWrapper (public). */
export default function DemosSeoCta() {
  return (
    <AppRouterCacheProvider options={{ key: 'mui-demos-seo' }}>
      <LanguageProvider>
        <AdvancedThemeIslandProvider>
          <DemosSeoCtaBody />
        </AdvancedThemeIslandProvider>
      </LanguageProvider>
    </AppRouterCacheProvider>
  )
}

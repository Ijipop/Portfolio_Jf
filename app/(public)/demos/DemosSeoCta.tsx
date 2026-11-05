'use client'

import SeoInternalLinkCta from '@/components/seo/SeoInternalLinkCta'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './DemosIndex.module.css'

export default function DemosSeoCta() {
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

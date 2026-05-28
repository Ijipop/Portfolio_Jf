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
        href="/creation-site-web-montreal"
        linkLabel={t('seo.demosLink')}
        variant="compact"
      />
    </div>
  )
}

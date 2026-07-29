'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import styles from './ProductSecurityNotice.module.css'

type ProductSecurityNoticeProps = {
  /** Accent bordure gauche (ex. #0d9488, #f59e0b). */
  accent: string
}

/** Avertissement commun : apps desktop non signées (Windows / macOS). */
export default function ProductSecurityNotice({ accent }: ProductSecurityNoticeProps) {
  const { t } = useLanguage()

  return (
    <aside
      className={styles.notice}
      style={{ ['--security-accent' as string]: accent }}
      aria-labelledby="product-security-title"
    >
      <h2 id="product-security-title" className={styles.title}>
        {t('productSecurity.title')}
      </h2>
      <p className={styles.lead}>{t('productSecurity.lead')}</p>
      <p className={styles.body}>{t('productSecurity.p1')}</p>
    </aside>
  )
}

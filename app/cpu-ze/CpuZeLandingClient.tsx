'use client'

import Link from 'next/link'
import ProductDownloadRow from '@/components/product-landings/ProductDownloadRow'
import ProductImageCarousel from '@/components/product-landings/ProductImageCarousel'
import ProductLandingShell from '@/components/product-landings/ProductLandingShell'
import { PRODUCT_DOWNLOADS } from '@/components/product-landings/productDownloads'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './CpuZeLanding.module.css'

const BENEFIT_KEYS = ['cpuZe.b1', 'cpuZe.b2', 'cpuZe.b3', 'cpuZe.b4'] as const

export default function CpuZeLandingClient() {
  const { t } = useLanguage()

  return (
    <ProductLandingShell mainClassName={styles.page}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 className={styles.brand}>{t('cpuZe.title')}</h1>
          <p className={styles.lead}>{t('cpuZe.lead')}</p>
          <ProductDownloadRow
            accent="#f59e0b"
            accentHover="#fbbf24"
            items={[
              {
                href: PRODUCT_DOWNLOADS.cpuZe.windows,
                label: t('cpuZe.downloadWindows'),
                primary: true,
              },
            ]}
          />
          <div className={styles.meters} aria-hidden>
            <div className={styles.meter}>
              <div className={styles.meterLabel}>CPU</div>
              <div className={styles.meterTrack}>
                <div className={styles.meterFillAmber} style={{ ['--w' as string]: '68%' }} />
              </div>
            </div>
            <div className={styles.meter}>
              <div className={styles.meterLabel}>RAM</div>
              <div className={styles.meterTrack}>
                <div className={styles.meterFillLime} style={{ ['--w' as string]: '54%' }} />
              </div>
            </div>
            <div className={styles.meter}>
              <div className={styles.meterLabel}>TEMP</div>
              <div className={styles.meterTrack}>
                <div className={styles.meterFillWarm} style={{ ['--w' as string]: '42%' }} />
              </div>
            </div>
          </div>
        </header>

        <section className={styles.section} aria-label={t('cpuZe.galleryTitle')}>
          <h2 className={styles.sectionTitle}>{t('cpuZe.galleryTitle')}</h2>
          <ProductImageCarousel
            galleryBasePath="/img/cpu-ze"
            emptyMessage={t('cpuZe.galleryEmpty')}
            motionStyle="fade"
            accent="#f59e0b"
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('cpuZe.benefitsTitle')}</h2>
          <ul className={styles.benefits}>
            {BENEFIT_KEYS.map((key) => (
              <li key={key}>
                <span className={styles.dot} />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav className={styles.footerLinks} aria-label={t('cpuZe.moreLinks')}>
          <Link href={PRODUCT_DOWNLOADS.cpuZe.github} target="_blank" rel="noopener noreferrer">
            {t('cpuZe.github')}
          </Link>
          <Link href="/logiciel">{t('cpuZe.otherSoftware')}</Link>
        </nav>
      </div>
    </ProductLandingShell>
  )
}

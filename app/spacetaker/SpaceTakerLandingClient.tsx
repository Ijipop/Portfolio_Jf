'use client'

import Link from 'next/link'
import ProductDownloadRow from '@/components/product-landings/ProductDownloadRow'
import ProductImageCarousel from '@/components/product-landings/ProductImageCarousel'
import ProductLandingShell from '@/components/product-landings/ProductLandingShell'
import ProductSecurityNotice from '@/components/product-landings/ProductSecurityNotice'
import { PRODUCT_DOWNLOADS } from '@/components/product-landings/productDownloads'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './SpaceTakerLanding.module.css'

const BENEFIT_KEYS = ['spaceTaker.b1', 'spaceTaker.b2', 'spaceTaker.b3', 'spaceTaker.b4'] as const

const DECOR_BLOCKS = [
  { col: '1 / 3', row: '4 / 7', delay: '0.05s', opacity: 0.5 },
  { col: '3 / 5', row: '2 / 7', delay: '0.12s', opacity: 0.75 },
  { col: '5 / 8', row: '3 / 7', delay: '0.18s', opacity: 0.9 },
  { col: '8 / 10', row: '5 / 7', delay: '0.24s', opacity: 0.45 },
  { col: '10 / 13', row: '1 / 7', delay: '0.3s', opacity: 1 },
]

export default function SpaceTakerLandingClient() {
  const { t } = useLanguage()

  return (
    <ProductLandingShell mainClassName={styles.page}>
      <div className={styles.blocks} aria-hidden>
        {DECOR_BLOCKS.map((b) => (
          <div
            key={b.col + b.row}
            className={styles.block}
            style={{
              gridColumn: b.col,
              gridRow: b.row,
              animationDelay: b.delay,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 className={styles.brand}>
            Space <span className={styles.brandAccent}>Taker</span>
          </h1>
          <p className={styles.lead}>{t('spaceTaker.lead')}</p>
          <ProductDownloadRow
            accent="#22d3ee"
            accentHover="#67e8f9"
            items={[
              {
                href: PRODUCT_DOWNLOADS.spaceTaker.windows,
                label: t('spaceTaker.downloadWindows'),
                primary: true,
              },
              {
                href: PRODUCT_DOWNLOADS.spaceTaker.macos,
                label: t('spaceTaker.downloadMacos'),
              },
            ]}
          />
        </header>

        <section className={styles.section} aria-label={t('spaceTaker.galleryTitle')}>
          <h2 className={styles.sectionTitle}>{t('spaceTaker.galleryTitle')}</h2>
          <ProductImageCarousel
            galleryBasePath="/img/spacetaker"
            emptyMessage={t('spaceTaker.galleryEmpty')}
            motionStyle="slide"
            accent="#22d3ee"
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('spaceTaker.benefitsTitle')}</h2>
          <ul className={styles.benefits}>
            {BENEFIT_KEYS.map((key) => (
              <li key={key}>
                <span className={styles.chip} aria-hidden />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <ProductSecurityNotice accent="#22d3ee" />

        <nav className={styles.footerLinks} aria-label={t('spaceTaker.moreLinks')}>
          <Link href={PRODUCT_DOWNLOADS.spaceTaker.github} target="_blank" rel="noopener noreferrer">
            {t('spaceTaker.github')}
          </Link>
          <Link href="/portfolio/projets?type=logiciel">{t('spaceTaker.otherSoftware')}</Link>
        </nav>
      </div>
    </ProductLandingShell>
  )
}

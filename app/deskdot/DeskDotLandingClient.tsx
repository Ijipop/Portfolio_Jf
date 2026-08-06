'use client'

import Link from 'next/link'
import ProductDownloadRow from '@/components/product-landings/ProductDownloadRow'
import ProductImageCarousel from '@/components/product-landings/ProductImageCarousel'
import ProductLandingShell from '@/components/product-landings/ProductLandingShell'
import ProductSecurityNotice from '@/components/product-landings/ProductSecurityNotice'
import type { ProductDownloadLinks } from '@/components/product-landings/productDownloads'
import { useLanguage } from '@/contexts/LanguageContext'
import DeskDotPitchTitle from './DeskDotPitchTitle'
import styles from './DeskDotLanding.module.css'

const BENEFIT_KEYS = [
  'deskDot.b1',
  'deskDot.b2',
  'deskDot.b3',
  'deskDot.b4',
  'deskDot.b5',
  'deskDot.b6',
] as const

const ACCENT = '#a78bfa'
const ACCENT_HOVER = '#c4b5fd'

/** Même asset que la carte Projets (fiable) — évite next/image sur /img/deskdot. */
const DESKDOT_ICON = '/imgs/images/DeskDot_icon.png'

const DESKDOT_GALLERY_FALLBACK = [
  '/img/deskdot/deskdot1.png',
  '/img/deskdot/deskdot2.png',
  '/img/deskdot/deskdot3.png',
  '/img/deskdot/deskdot4.png',
] as const

type DeskDotLandingClientProps = {
  downloads: ProductDownloadLinks
}

export default function DeskDotLandingClient({ downloads }: DeskDotLandingClientProps) {
  const { t } = useLanguage()
  const hasWindows = Boolean(downloads.windows?.trim())

  return (
    <ProductLandingShell mainClassName={styles.page}>
      <div className={styles.rings} aria-hidden>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
      </div>

      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.brandRow}>
            {/* eslint-disable-next-line @next/next/no-img-element -- même rendu fiable que ProjectCard showcase */}
            <img
              src={DESKDOT_ICON}
              alt=""
              width={52}
              height={52}
              className={styles.brandIcon}
              decoding="async"
            />
            <h1 className={styles.brand}>
              Desk<span className={styles.brandAccent}>Dot</span>
            </h1>
          </div>
          <DeskDotPitchTitle />
          <p className={styles.lead}>{t('deskDot.lead')}</p>
          <ProductDownloadRow
            accent={ACCENT}
            accentHover={ACCENT_HOVER}
            items={[
              {
                href: hasWindows ? downloads.windows : '#',
                label: hasWindows ? t('deskDot.downloadWindows') : t('deskDot.downloadSoon'),
                primary: true,
                disabled: !hasWindows,
              },
            ]}
          />
        </header>

        <section className={styles.section} aria-label={t('deskDot.galleryTitle')}>
          <h2 className={styles.sectionTitle}>{t('deskDot.galleryTitle')}</h2>
          <ProductImageCarousel
            galleryBasePath="/img/deskdot"
            initialSlides={[...DESKDOT_GALLERY_FALLBACK]}
            emptyMessage={t('deskDot.galleryEmpty')}
            motionStyle="fade"
            accent={ACCENT}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('deskDot.benefitsTitle')}</h2>
          <ul className={styles.benefits}>
            {BENEFIT_KEYS.map((key) => (
              <li key={key}>
                <span className={styles.dot} />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <ProductSecurityNotice accent={ACCENT} />

        <nav className={styles.footerLinks} aria-label={t('deskDot.moreLinks')}>
          <Link href="/portfolio/projets?type=logiciel">{t('deskDot.otherSoftware')}</Link>
        </nav>
      </div>
    </ProductLandingShell>
  )
}

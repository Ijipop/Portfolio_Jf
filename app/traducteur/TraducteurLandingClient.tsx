'use client'

import Link from 'next/link'
import ProductDownloadRow from '@/components/product-landings/ProductDownloadRow'
import ProductLandingShell from '@/components/product-landings/ProductLandingShell'
import type { ProductDownloadLinks } from '@/components/product-landings/productDownloads'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './TraducteurLanding.module.css'

const ACCENT = '#10b981'
const ACCENT_HOVER = '#34d399'
const SCREENSHOT = '/img/traducteur/le-traducteur.png'

const STEP_KEYS = [
  { title: 'traducteur.step1Title', body: 'traducteur.step1Body' },
  { title: 'traducteur.step2Title', body: 'traducteur.step2Body' },
  { title: 'traducteur.step3Title', body: 'traducteur.step3Body' },
] as const

const AUDIENCE_KEYS = ['traducteur.a1', 'traducteur.a2', 'traducteur.a3'] as const

const FORMAT_KEYS = ['traducteur.f1', 'traducteur.f2', 'traducteur.f3'] as const

const LIMIT_KEYS = ['traducteur.l1', 'traducteur.l2', 'traducteur.l3', 'traducteur.l4'] as const

type TraducteurLandingClientProps = {
  downloads: ProductDownloadLinks
}

export default function TraducteurLandingClient({ downloads }: TraducteurLandingClientProps) {
  const { t } = useLanguage()

  const downloadButton = (
    <ProductDownloadRow
      accent={ACCENT}
      accentHover={ACCENT_HOVER}
      items={[
        {
          href: downloads.windows,
          label: t('traducteur.downloadWindows'),
          primary: true,
        },
      ]}
    />
  )

  return (
    <ProductLandingShell mainClassName={styles.page}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.brand}>{t('traducteur.title')}</h1>
            <p className={styles.lead}>{t('traducteur.lead')}</p>
            {downloadButton}
          </div>
          <figure className={styles.heroVisual}>
            {/* eslint-disable-next-line @next/next/no-img-element -- capture locale, même approche DeskDot */}
            <img
              src={SCREENSHOT}
              alt={t('traducteur.screenshotAlt')}
              width={640}
              height={400}
              decoding="async"
            />
          </figure>
        </header>

        <section className={styles.section} aria-labelledby="traducteur-steps">
          <h2 id="traducteur-steps" className={styles.sectionTitle}>
            {t('traducteur.stepsTitle')}
          </h2>
          <ol className={styles.steps}>
            {STEP_KEYS.map((key, index) => (
              <li key={key.title} className={styles.step}>
                <span className={styles.stepNum} aria-hidden>
                  {index + 1}
                </span>
                <div>
                  <h3 className={styles.stepTitle}>{t(key.title)}</h3>
                  <p className={styles.stepBody}>{t(key.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="traducteur-audience">
          <h2 id="traducteur-audience" className={styles.sectionTitle}>
            {t('traducteur.audienceTitle')}
          </h2>
          <ul className={styles.plainList}>
            {AUDIENCE_KEYS.map((key) => (
              <li key={key}>
                <span className={styles.dot} aria-hidden />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="traducteur-formats">
          <h2 id="traducteur-formats" className={styles.sectionTitle}>
            {t('traducteur.formatsTitle')}
          </h2>
          <ul className={styles.plainList}>
            {FORMAT_KEYS.map((key) => (
              <li key={key}>
                <span className={styles.dot} aria-hidden />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.limits} aria-labelledby="traducteur-limits">
          <h2 id="traducteur-limits" className={styles.limitsTitle}>
            {t('traducteur.limitsTitle')}
          </h2>
          <ul className={styles.limitsList}>
            {LIMIT_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </aside>

        <section className={styles.downloadSection} aria-labelledby="traducteur-download">
          <h2 id="traducteur-download" className={styles.sectionTitle}>
            {t('traducteur.downloadTitle')}
          </h2>
          {downloadButton}
          <nav className={styles.footerLinks} aria-label={t('traducteur.moreLinks')}>
            <Link href={downloads.github} target="_blank" rel="noopener noreferrer">
              {t('traducteur.github')}
            </Link>
            <Link href="/portfolio/projets?type=logiciel">{t('traducteur.otherSoftware')}</Link>
          </nav>
        </section>
      </div>
    </ProductLandingShell>
  )
}

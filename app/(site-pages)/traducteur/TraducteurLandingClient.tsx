'use client'

import Link from 'next/link'
import ProductDownloadRow from '@/components/product-landings/ProductDownloadRow'
import type { ProductDownloadLinks } from '@/components/product-landings/productDownloads'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import styles from './TraducteurLanding.module.css'

const ACCENT = '#10b981'
const ACCENT_HOVER = '#34d399'
const SCREENSHOT = '/imgs/images/LeTraducteur.png'

const CHIP_KEYS = [
  'traducteur.chipLocal',
  'traducteur.chipFree',
  'traducteur.chipNoSub',
  'traducteur.chipPrivate',
] as const

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

function TraducteurLandingBody({ downloads }: TraducteurLandingClientProps) {
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
    <div className={styles.page} data-testid="traducteur-landing">
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.brand}>{t('traducteur.title')}</h1>
            <p className={styles.lead}>{t('traducteur.lead')}</p>
            <ul className={styles.chips} aria-label={t('traducteur.title')}>
              {CHIP_KEYS.map((key) => (
                <li key={key} className={styles.chip}>
                  {t(key)}
                </li>
              ))}
            </ul>
            <div className={styles.heroCta}>{downloadButton}</div>
          </div>
          <figure className={styles.heroVisual}>
            <div className={styles.heroFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element -- capture locale, même approche DeskDot */}
              <img
                src={SCREENSHOT}
                alt={t('traducteur.screenshotAlt')}
                width={640}
                height={400}
                decoding="async"
              />
            </div>
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
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.stepBodyWrap}>
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
          <ul className={styles.audienceGrid}>
            {AUDIENCE_KEYS.map((key) => (
              <li key={key} className={styles.audienceCard}>
                <span className={styles.audienceMark} aria-hidden />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="traducteur-formats">
          <h2 id="traducteur-formats" className={styles.sectionTitle}>
            {t('traducteur.formatsTitle')}
          </h2>
          <ul className={styles.formatList}>
            {FORMAT_KEYS.map((key) => (
              <li key={key} className={styles.formatItem}>
                <span className={styles.formatDot} aria-hidden />
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
          <div className={styles.downloadCard}>
            <h2 id="traducteur-download" className={styles.downloadTitle}>
              {t('traducteur.downloadTitle')}
            </h2>
            <p className={styles.downloadLead}>{t('traducteur.lead')}</p>
            {downloadButton}
            <nav className={styles.footerLinks} aria-label={t('traducteur.moreLinks')}>
              <Link href={downloads.github} target="_blank" rel="noopener noreferrer">
                {t('traducteur.github')}
              </Link>
              <Link href="/portfolio/projets?type=logiciel">{t('traducteur.otherSoftware')}</Link>
            </nav>
          </div>
        </section>
      </div>
    </div>
  )
}

/** Contenu Traducteur — chrome Pop Atelier fourni par la page ; i18n via LanguageProvider. */
export default function TraducteurLandingClient({ downloads }: TraducteurLandingClientProps) {
  return (
    <LanguageProvider>
      <TraducteurLandingBody downloads={downloads} />
    </LanguageProvider>
  )
}

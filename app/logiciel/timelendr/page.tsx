'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import ProductDownloadRow from '@/components/product-landings/ProductDownloadRow'
import ProductLandingShell from '@/components/product-landings/ProductLandingShell'
import ProductSecurityNotice from '@/components/product-landings/ProductSecurityNotice'
import { useLanguage } from '@/contexts/LanguageContext'
import TimelendrCarousel from './TimelendrCarousel'
import styles from './TimelendrProduct.module.css'

const BENEFIT_KEYS = [
  { title: 'timelendr.pillar1Title', desc: 'timelendr.pillar1Desc' },
  { title: 'timelendr.pillar2Title', desc: 'timelendr.pillar2Desc' },
  { title: 'timelendr.pillar3Title', desc: 'timelendr.pillar3Desc' },
  { title: 'timelendr.pillar4Title', desc: 'timelendr.pillar4Desc' },
  { title: 'timelendr.pillar5Title', desc: 'timelendr.pillar5Desc' },
] as const

const RAIL_WIDTHS = ['18%', '28%', '12%', '22%', '14%'] as const

type TimelendrPlatform = 'windows' | 'macos' | 'both'

interface TimelendrRelease {
  id: number
  filePath: string
  changelog: string
  version: string | null
  platform?: TimelendrPlatform
  createdAt: string
}

function pickLatest(
  releases: TimelendrRelease[],
  platform: 'windows' | 'macos',
): TimelendrRelease | null {
  return (
    releases.find((r) => (r.platform ?? 'both') === platform) ??
    releases.find((r) => (r.platform ?? 'both') === 'both') ??
    null
  )
}

export default function TimelendrPage() {
  const { t } = useLanguage()
  const [releases, setReleases] = useState<TimelendrRelease[]>([])

  useEffect(() => {
    fetch('/api/timelendr/releases')
      .then((res) => res.json())
      .then((data) => data.success && setReleases(data.data))
      .catch(() => {})
  }, [])

  const windowsRelease = useMemo(() => pickLatest(releases, 'windows'), [releases])
  const macosRelease = useMemo(() => pickLatest(releases, 'macos'), [releases])

  const downloadItems = useMemo(() => {
    const items: { href: string; label: string; primary?: boolean }[] = []
    if (windowsRelease) {
      items.push({
        href: windowsRelease.filePath,
        label: t('timelendr.downloadWindows'),
        primary: true,
      })
    }
    if (macosRelease && macosRelease.filePath !== windowsRelease?.filePath) {
      items.push({
        href: macosRelease.filePath,
        label: t('timelendr.downloadMacos'),
        primary: !windowsRelease,
      })
    }
    return items
  }, [windowsRelease, macosRelease, t])

  const versionNote = windowsRelease?.version || macosRelease?.version

  return (
    <ProductLandingShell mainClassName={styles.page}>
      <div className={styles.rails} aria-hidden>
        {RAIL_WIDTHS.map((width, i) => (
          <div
            key={width + i}
            className={styles.rail}
            style={{ width, animationDelay: `${0.08 + i * 0.07}s` }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 className={styles.brand}>
            Time<span className={styles.brandAccent}>lendr</span>
          </h1>
          <p className={styles.lead}>{t('timelendr.lead')}</p>
          {downloadItems.length > 0 ? (
            <ProductDownloadRow accent="#2dd4bf" accentHover="#5eead4" items={downloadItems} />
          ) : (
            <p className={styles.downloadsEmpty}>{t('timelendr.noReleases')}</p>
          )}
          {versionNote ? (
            <p className={styles.downloadMeta}>
              {t('timelendr.version')} {versionNote} · {t('timelendr.downloadNote')}
            </p>
          ) : null}
        </header>

        <section className={styles.section} aria-label={t('timelendr.galleryTitle')}>
          <h2 className={styles.sectionTitle}>{t('timelendr.galleryTitle')}</h2>
          <TimelendrCarousel
            variant="hero"
            hideTitle
            title={t('timelendr.galleryTitle')}
            emptyMessage={t('timelendr.galleryEmpty')}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('timelendr.benefitsTitle')}</h2>
          <ul className={styles.benefits}>
            {BENEFIT_KEYS.map(({ title, desc }) => (
              <li key={title}>
                <span className={styles.benefitTitle}>{t(title)}</span>
                <span className={styles.benefitDesc}>{t(desc)}</span>
              </li>
            ))}
          </ul>
        </section>

        <ProductSecurityNotice accent="#2dd4bf" />

        <nav className={styles.footerLinks} aria-label={t('timelendr.moreLinks')}>
          <Link href="/portfolio/projets?type=logiciel">{t('timelendr.otherSoftware')}</Link>
        </nav>

        <p className={styles.privateNote}>{t('timelendr.privateProject')}</p>
      </div>
    </ProductLandingShell>
  )
}

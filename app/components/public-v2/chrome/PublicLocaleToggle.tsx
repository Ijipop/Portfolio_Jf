'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import type { Locale } from '@/i18n/translations'
import { isPublicI18nToggleEnabled } from '@/lib/public-v2/i18nFlag'
import styles from './PublicLocaleToggle.module.css'

/**
 * Sélecteur FR | EN — non monté tant que NEXT_PUBLIC_I18N_TOGGLE_ENABLED !== 'true'.
 */
export default function PublicLocaleToggle() {
  const enabled = isPublicI18nToggleEnabled()
  const { locale, setLocale } = useLanguage()

  if (!enabled) return null

  const select = (next: Locale) => {
    if (next === locale) return
    setLocale(next)
  }

  return (
    <div
      className={styles.group}
      role="group"
      aria-label={locale === 'fr' ? 'Langue' : 'Language'}
      data-testid="pv2-locale-toggle"
    >
      <button
        type="button"
        className={styles.option}
        aria-pressed={locale === 'fr'}
        aria-label="Français"
        data-active={locale === 'fr' ? 'true' : undefined}
        onClick={() => select('fr')}
      >
        FR
      </button>
      <span className={styles.sep} aria-hidden>
        /
      </span>
      <button
        type="button"
        className={styles.option}
        aria-pressed={locale === 'en'}
        aria-label="English"
        data-active={locale === 'en' ? 'true' : undefined}
        onClick={() => select('en')}
      >
        EN
      </button>
    </div>
  )
}

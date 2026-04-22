'use client'

import styles from './BeigePresentationAmbientBg.module.css'

/** Halos thème (variables --primary-color / --accent-color) pour le mode beige. */
export function BeigePresentationAmbientBg({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return (
    <div className={styles.wrap} aria-hidden>
      <div className={`${styles.halo} ${styles.haloPrimary}`} />
      <div className={`${styles.halo} ${styles.haloAccent}`} />
    </div>
  )
}

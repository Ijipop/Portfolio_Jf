'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { BRAND, CITY, HERO } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

export default function VoltHero() {
  const [ready, setReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setTimeout(() => setReady(true), reduced ? 0 : 80)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToUnder = useCallback(() => {
    const target = document.getElementById('volt-under')
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }, [])

  return (
    <section className={`${styles.heroSticky} ${ready ? styles.heroReady : ''}`} aria-label="Hero VOLT">
      <div className={styles.heroAura} aria-hidden />
      <div className={styles.heroGrid} aria-hidden />
      <div className={styles.heroNoise} aria-hidden />

      <p className={styles.heroKicker}>
        <span className={styles.heroPulse} aria-hidden />
        {HERO.kicker}
      </p>

      <h1 className={styles.heroTitle}>
        {HERO.title.split('\n').map((line) => (
          <span key={line} className={styles.heroLine}>
            {line}
          </span>
        ))}
      </h1>

      <p className={styles.heroLead}>{HERO.lead}</p>

      <div className={styles.heroCtas}>
        <a className={styles.ctaPrimary} href="#drops">
          {HERO.ctaPrimary}
        </a>
        <Link className={styles.ctaGhost} href="/demos">
          {HERO.ctaSecondary}
        </Link>
      </div>

      <div className={styles.heroMeta} aria-hidden>
        <span className={styles.heroBrandMark}>{BRAND}</span>
        <span className={styles.heroCity}>{CITY}</span>
      </div>

      <button
        type="button"
        className={`${styles.heroScrollHint} ${scrolled ? styles.heroScrollHintHidden : ''}`}
        onClick={scrollToUnder}
        aria-label="Défiler vers le contenu"
      >
        <span>Scroll</span>
        <span className={styles.heroScrollBar} aria-hidden>
          <span className={styles.heroScrollDot} />
        </span>
      </button>
    </section>
  )
}

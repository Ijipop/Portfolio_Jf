'use client'

import { useEffect, useState } from 'react'
import { Button, Heading } from '@/components/public-v2/primitives'
import { HERO_COPY, HERO_FLOATS, type HeroFloatMedia } from '@/lib/public-v2/heroContent'
import HeroCollage from './HeroCollage'
import styles from './Hero.module.css'

export type HeroProps = {
  /** Override copy for tests or future variants. */
  copy?: typeof HERO_COPY
  floats?: readonly HeroFloatMedia[]
  className?: string
}

/**
 * Hero Atelier Atlantique — planche éditoriale (True WOW).
 * Contenu éditorial : `lib/public-v2/heroContent.ts`.
 */
export default function Hero({
  copy = HERO_COPY,
  floats = HERO_FLOATS,
  className,
}: HeroProps) {
  const [enhance, setEnhance] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null
    if (mq) {
      setReduceMotion(mq.matches)
      const onChange = () => setReduceMotion(mq.matches)
      mq.addEventListener('change', onChange)
      const id = window.setTimeout(() => setEnhance(true), 32)
      return () => {
        window.clearTimeout(id)
        mq.removeEventListener('change', onChange)
      }
    }

    const id = window.setTimeout(() => setEnhance(true), 32)
    return () => window.clearTimeout(id)
  }, [])

  const rootClass = [styles.hero, enhance && !reduceMotion ? styles.isReady : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={rootClass} aria-labelledby="pv2-hero-title" data-testid="pv2-hero">
      {/* Région turquoise ouverte : seule la frontière gauche (S) est visible */}
      <div className={styles.waveLayer} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          focusable="false"
          data-hero-wave="true"
        >
          {/*
            Desktop: S vertical (sinusoïde ~1 période). Fermeture hors cadre
            H/D/B → région ouverte. Amplitude bornée pour garder une vraie
            colonne turquoise à droite, texte crème à gauche (x ≲ 560).
          */}
          <path
            className={styles.waveDesktop}
            fill="#0F7C7C"
            d="M760 -400 C920 0 920 140 760 300 C640 460 640 600 760 740 C920 880 900 1040 780 1340 L2400 1340 L2400 -400 Z"
          />
          {/*
            Mobile: S pleine largeur sous le texte. Sortie GAUCHE + DROITE
            (+ bas) hors cadre — pas de patate coin-bas.
          */}
          <path
            className={styles.waveMobile}
            fill="#0F7C7C"
            d="M-400 540 C180 440 360 620 720 540 C1080 460 1280 640 1800 580 L1800 2400 L-400 2400 Z"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p
            className={[styles.kicker, 'pv2-reveal', enhance ? 'is-in' : '']
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.kickerMark} aria-hidden="true" />
            {copy.kicker}
          </p>
          <Heading as="h1" id="pv2-hero-title" variant="display" className={styles.title}>
            {copy.titleLines.map((line, index) => (
              <span key={line} className={styles.titleLine}>
                <span className={index === 1 ? styles.titleAccent : undefined}>{line}</span>
              </span>
            ))}
          </Heading>
          <p
            className={[styles.lede, 'pv2-reveal', enhance ? 'is-in' : '']
              .filter(Boolean)
              .join(' ')}
            style={{ ['--reveal-delay' as string]: 1 }}
          >
            {copy.description}
          </p>
          <div
            className={[styles.actions, 'pv2-reveal', enhance ? 'is-in' : '']
              .filter(Boolean)
              .join(' ')}
            style={{ ['--reveal-delay' as string]: 2 }}
          >
            <Button href={copy.primaryCta.href} variant="primary">
              {copy.primaryCta.label}
            </Button>
            <Button href={copy.secondaryCta.href} variant="ghost">
              {copy.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className={styles.stageWrap}>
          <HeroCollage floats={floats} reduceMotion={reduceMotion} enhance={enhance} />
        </div>
      </div>
      <ul className={styles.srOnly}>
        {floats.map((float) => (
          <li key={float.id}>{float.alt}</li>
        ))}
      </ul>
    </section>
  )
}

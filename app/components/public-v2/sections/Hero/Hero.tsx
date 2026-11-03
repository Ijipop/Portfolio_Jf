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
 * Hero Pop Atelier — composition éditoriale + collage.
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
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p
            className={[styles.kicker, 'pv2-reveal', enhance ? 'is-in' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {copy.kicker}
          </p>
          <Heading as="h1" id="pv2-hero-title" variant="display" className={styles.title}>
            {copy.titleLines.map((line) => (
              <span key={line} className={styles.titleLine}>
                <span>{line}</span>
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
        <HeroCollage floats={floats} reduceMotion={reduceMotion} enhance={enhance} />
      </div>
      <ul className={styles.srOnly}>
        {floats.map((float) => (
          <li key={float.id}>{float.alt}</li>
        ))}
      </ul>
    </section>
  )
}

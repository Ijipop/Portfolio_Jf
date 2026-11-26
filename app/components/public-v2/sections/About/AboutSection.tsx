'use client'

import { Button, Container, Heading, Section } from '@/components/public-v2/primitives'
import { getAboutSectionCopy, type AboutCopy } from '@/lib/public-v2/aboutContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import styles from './AboutSection.module.css'

export type AboutSectionProps = {
  copy?: AboutCopy
  className?: string
}

/**
 * À propos — esprit Concept D (grille 1.2 / 0.8 + portrait).
 * Contenu éditable via `aboutContent` ; CTA vers la page longue existante.
 */
export default function AboutSection({ copy, className }: AboutSectionProps) {
  const locale = usePublicV2Locale()
  const resolvedCopy = copy ?? getAboutSectionCopy(locale)

  return (
    <Section
      id="pv2-a-propos"
      variant="default"
      aria-labelledby="pv2-about-title"
      className={className}
      data-testid="pv2-about"
    >
      <Container>
        <div className={styles.grid}>
          <div>
            <p className={styles.eyebrow}>{resolvedCopy.eyebrow}</p>
            <Heading as="h2" id="pv2-about-title" variant="section" className={styles.title}>
              {resolvedCopy.title}
            </Heading>
            <p className={styles.lead}>{resolvedCopy.lead}</p>
            <p className={styles.identity}>{resolvedCopy.identity}</p>
            <Button href={resolvedCopy.ctaHref} variant="primary">
              {resolvedCopy.ctaLabel}
            </Button>
          </div>
          <figure className={styles.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element -- portrait public existant */}
            <img
              className={styles.photoImg}
              src={resolvedCopy.photo.src}
              alt={resolvedCopy.photo.alt}
              width={resolvedCopy.photo.width}
              height={resolvedCopy.photo.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </Container>
    </Section>
  )
}

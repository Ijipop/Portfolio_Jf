import { Button, Container, Heading, Section } from '@/components/public-v2/primitives'
import { ABOUT_COPY } from '@/lib/public-v2/aboutContent'
import styles from './AboutSection.module.css'

export type AboutSectionProps = {
  copy?: typeof ABOUT_COPY
  className?: string
}

/**
 * À propos — esprit Concept D (grille 1.2 / 0.8 + portrait).
 * Contenu éditable via `aboutContent` ; CTA vers la page longue existante.
 */
export default function AboutSection({ copy = ABOUT_COPY, className }: AboutSectionProps) {
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
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <Heading as="h2" id="pv2-about-title" variant="section" className={styles.title}>
              {copy.title}
            </Heading>
            <p className={styles.lead}>{copy.lead}</p>
            <p className={styles.identity}>{copy.identity}</p>
            <Button href={copy.ctaHref} variant="primary">
              {copy.ctaLabel}
            </Button>
          </div>
          <figure className={styles.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element -- portrait public existant */}
            <img
              className={styles.photoImg}
              src={copy.photo.src}
              alt={copy.photo.alt}
              width={copy.photo.width}
              height={copy.photo.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </Container>
    </Section>
  )
}

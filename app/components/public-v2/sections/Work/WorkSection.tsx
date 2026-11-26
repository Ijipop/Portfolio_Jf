'use client'

import { Container, Heading, Section } from '@/components/public-v2/primitives'
import {
  getWorkCopy,
  getWorkFeatures,
  type WorkCopy,
  type WorkFeature as WorkFeatureData,
} from '@/lib/public-v2/workContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import WorkFeature from './WorkFeature'
import styles from './WorkSection.module.css'

export type WorkSectionProps = {
  copy?: WorkCopy
  features?: readonly WorkFeatureData[]
  className?: string
}

/**
 * Réalisations Atelier Atlantique — pièces maîtresses sur crème.
 * Pas un second catalogue ; catalogue complet via `copy.catalogHref`.
 */
export default function WorkSection({ copy, features, className }: WorkSectionProps) {
  const locale = usePublicV2Locale()
  const resolvedCopy = copy ?? getWorkCopy(locale)
  const resolvedFeatures = features ?? getWorkFeatures(locale)
  const root = [styles.atelier, className].filter(Boolean).join(' ')

  return (
    <Section
      id="pv2-realisations"
      variant="default"
      aria-labelledby="pv2-work-title"
      className={root}
      data-testid="pv2-work"
    >
      <Container>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{resolvedCopy.eyebrow}</p>
            <Heading as="h2" id="pv2-work-title" variant="section" className={styles.title}>
              {resolvedCopy.title}
            </Heading>
            <p className={styles.lead}>{resolvedCopy.lead}</p>
          </div>
          <a className={styles.catalogLink} href={resolvedCopy.catalogHref}>
            {resolvedCopy.catalogLinkLabel}
          </a>
        </div>
        <ul className={styles.list}>
          {resolvedFeatures.map((feature) => (
            <li key={feature.id}>
              <WorkFeature feature={feature} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

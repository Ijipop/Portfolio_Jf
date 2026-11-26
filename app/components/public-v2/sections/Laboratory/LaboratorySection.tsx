'use client'

import { Container, Heading, Section } from '@/components/public-v2/primitives'
import {
  getLaboratoryCopy,
  getLaboratoryFeatures,
  type LaboratoryCopy,
  type LaboratoryFeature,
} from '@/lib/public-v2/laboratoryContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import LaboratoryCard from './LaboratoryCard'
import styles from './LaboratorySection.module.css'

export type LaboratorySectionProps = {
  copy?: LaboratoryCopy
  features?: LaboratoryFeature[]
  className?: string
}

/**
 * Laboratoire interactif — esprit Concept D.
 * Données = sélection du catalogue partagé, pas un second inventaire.
 */
export default function LaboratorySection({
  copy,
  features,
  className,
}: LaboratorySectionProps) {
  const locale = usePublicV2Locale()
  const resolvedCopy = copy ?? getLaboratoryCopy(locale)
  const resolvedFeatures = features ?? getLaboratoryFeatures(locale)
  const sectionClass = [styles.section, className].filter(Boolean).join(' ')

  return (
    <Section
      id="pv2-laboratory"
      variant="default"
      aria-labelledby="pv2-lab-title"
      className={sectionClass}
      data-testid="pv2-laboratory"
    >
      <Container>
        <p className={styles.eyebrow}>{resolvedCopy.eyebrow}</p>
        <Heading as="h2" id="pv2-lab-title" variant="section" className={styles.title}>
          {resolvedCopy.title}
        </Heading>
        <p className={styles.lead}>{resolvedCopy.lead}</p>
        <ul className={styles.grid}>
          {resolvedFeatures.map((feature) => (
            <li key={feature.id} className={styles.gridItem}>
              <LaboratoryCard
                feature={feature}
                badgeLabel={resolvedCopy.badge}
                ctaLabel={resolvedCopy.ctaLabel}
              />
            </li>
          ))}
        </ul>
        <div className={styles.foot}>
          <a className={styles.catalogLink} href={resolvedCopy.catalogHref}>
            {resolvedCopy.catalogLinkLabel}
          </a>
        </div>
      </Container>
    </Section>
  )
}

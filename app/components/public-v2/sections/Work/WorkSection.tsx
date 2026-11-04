import { Container, Heading, Section } from '@/components/public-v2/primitives'
import {
  WORK_COPY,
  WORK_FEATURES,
  type WorkFeature as WorkFeatureData,
} from '@/lib/public-v2/workContent'
import WorkFeature from './WorkFeature'
import styles from './WorkSection.module.css'

export type WorkSectionProps = {
  copy?: typeof WORK_COPY
  features?: readonly WorkFeatureData[]
  className?: string
}

/**
 * Sélection éditoriale Réalisations — esprit Concept D.
 * Pas un second catalogue ; catalogue complet via `copy.catalogHref`.
 */
export default function WorkSection({
  copy = WORK_COPY,
  features = WORK_FEATURES,
  className,
}: WorkSectionProps) {
  return (
    <Section
      id="pv2-realisations"
      variant="default"
      aria-labelledby="pv2-work-title"
      className={className}
      data-testid="pv2-work"
    >
      <Container>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <Heading as="h2" id="pv2-work-title" variant="section" className={styles.title}>
              {copy.title}
            </Heading>
            <p className={styles.lead}>{copy.lead}</p>
          </div>
          <a className={styles.catalogLink} href={copy.catalogHref}>
            {copy.catalogLinkLabel}
          </a>
        </div>
        <p className={styles.selectionNote}>{copy.selectionNote}</p>
        <ul className={styles.list}>
          {features.map((feature) => (
            <li key={feature.id}>
              <WorkFeature feature={feature} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

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
 * Réalisations Atelier Atlantique — pièces maîtresses sur crème.
 * Pas un second catalogue ; catalogue complet via `copy.catalogHref`.
 */
export default function WorkSection({
  copy = WORK_COPY,
  features = WORK_FEATURES,
  className,
}: WorkSectionProps) {
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

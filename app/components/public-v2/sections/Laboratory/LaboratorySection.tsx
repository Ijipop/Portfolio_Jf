import { Container, Heading, Section } from '@/components/public-v2/primitives'
import {
  LABORATORY_COPY,
  getLaboratoryFeatures,
  type LaboratoryFeature,
} from '@/lib/public-v2/laboratoryContent'
import LaboratoryCard from './LaboratoryCard'
import styles from './LaboratorySection.module.css'

export type LaboratorySectionProps = {
  copy?: typeof LABORATORY_COPY
  features?: LaboratoryFeature[]
  className?: string
}

/**
 * Laboratoire interactif — esprit Concept D.
 * Données = sélection du catalogue partagé, pas un second inventaire.
 */
export default function LaboratorySection({
  copy = LABORATORY_COPY,
  features = getLaboratoryFeatures(),
  className,
}: LaboratorySectionProps) {
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
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <Heading as="h2" id="pv2-lab-title" variant="section" className={styles.title}>
          {copy.title}
        </Heading>
        <p className={styles.lead}>{copy.lead}</p>
        <ul className={styles.grid}>
          {features.map((feature) => (
            <li key={feature.id} className={styles.gridItem}>
              <LaboratoryCard
                feature={feature}
                badgeLabel={copy.badge}
                ctaLabel={copy.ctaLabel}
              />
            </li>
          ))}
        </ul>
        <div className={styles.foot}>
          <a className={styles.catalogLink} href={copy.catalogHref}>
            {copy.catalogLinkLabel}
          </a>
        </div>
      </Container>
    </Section>
  )
}

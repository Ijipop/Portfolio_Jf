import { Container, Heading, Section } from '@/components/public-v2/primitives'
import {
  SERVICE_OFFERS,
  SERVICES_COPY,
  type ServiceOffer,
} from '@/lib/public-v2/servicesContent'
import ServiceCard from './ServiceCard'
import styles from './ServicesSection.module.css'

export type ServicesSectionProps = {
  copy?: typeof SERVICES_COPY
  offers?: readonly ServiceOffer[]
  className?: string
}

/**
 * Section Services — esprit Concept D (bandeau 3 cartes).
 * Ancre `id="pv2-services"` requise pour la navigation sandbox.
 */
export default function ServicesSection({
  copy = SERVICES_COPY,
  offers = SERVICE_OFFERS,
  className,
}: ServicesSectionProps) {
  return (
    <Section
      id="pv2-services"
      variant="wash"
      aria-labelledby="pv2-services-title"
      className={className}
      data-testid="pv2-services"
    >
      <Container>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <Heading as="h2" id="pv2-services-title" variant="section" className={styles.title}>
          {copy.title}
        </Heading>
        <p className={styles.lead}>{copy.lead}</p>
        <div className={styles.band}>
          {offers.map((offer) => (
            <ServiceCard
              key={offer.id}
              offer={offer}
              className={offer.variant === 'support' ? styles.supportOffset : undefined}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

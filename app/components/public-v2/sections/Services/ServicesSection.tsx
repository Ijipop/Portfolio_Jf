'use client'

import { Container, Heading, Section } from '@/components/public-v2/primitives'
import {
  getServiceOffers,
  getServicesCopy,
  type ServiceOffer,
  type ServicesCopy,
} from '@/lib/public-v2/servicesContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import ServiceCard from './ServiceCard'
import styles from './ServicesSection.module.css'

export type ServicesSectionProps = {
  copy?: ServicesCopy
  offers?: readonly ServiceOffer[]
  className?: string
}

/**
 * Section Services — esprit Concept D (bandeau 3 cartes).
 * Ancre `id="pv2-services"` requise pour la navigation sandbox.
 */
export default function ServicesSection({ copy, offers, className }: ServicesSectionProps) {
  const locale = usePublicV2Locale()
  const resolvedCopy = copy ?? getServicesCopy(locale)
  const resolvedOffers = offers ?? getServiceOffers(locale)

  return (
    <Section
      id="pv2-services"
      variant="wash"
      aria-labelledby="pv2-services-title"
      className={className}
      data-testid="pv2-services"
    >
      <Container>
        <p className={styles.eyebrow}>{resolvedCopy.eyebrow}</p>
        <Heading as="h2" id="pv2-services-title" variant="section" className={styles.title}>
          {resolvedCopy.title}
        </Heading>
        <div className={styles.band}>
          {resolvedOffers.map((offer) => (
            <div key={offer.id} className={styles.bandItem}>
              <ServiceCard offer={offer} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

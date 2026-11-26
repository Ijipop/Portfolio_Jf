'use client'

import { Button, Container, Heading, Section } from '@/components/public-v2/primitives'
import { getContactSectionCopy, type ContactCopy } from '@/lib/public-v2/contactContent'
import { usePublicV2Locale } from '@/lib/public-v2/usePublicV2Locale'
import styles from './ContactSection.module.css'

export type ContactSectionProps = {
  copy?: ContactCopy
  className?: string
}

/**
 * Contact — bandeau conclusion Concept D (ink + CTA corail).
 * Aucun formulaire : lien vers `/portfolio/contact`.
 */
export default function ContactSection({ copy, className }: ContactSectionProps) {
  const locale = usePublicV2Locale()
  const resolvedCopy = copy ?? getContactSectionCopy(locale)

  return (
    <Section
      id="pv2-contact"
      variant="ink"
      aria-labelledby="pv2-contact-title"
      className={className}
      data-testid="pv2-contact"
    >
      <Container>
        <div className={styles.inner}>
          <Heading as="h2" id="pv2-contact-title" variant="section" className={styles.title}>
            {resolvedCopy.title}
          </Heading>
          <p className={styles.lead}>{resolvedCopy.lead}</p>
          <div className={styles.actions}>
            <Button href={resolvedCopy.ctaHref} variant="emphasis">
              {resolvedCopy.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
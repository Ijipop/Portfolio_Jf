import { Button, Container, Heading, Section } from '@/components/public-v2/primitives'
import { CONTACT_COPY } from '@/lib/public-v2/contactContent'
import styles from './ContactSection.module.css'

export type ContactSectionProps = {
  copy?: typeof CONTACT_COPY
  className?: string
}

/**
 * Contact — bandeau conclusion Concept D (ink + CTA corail).
 * Aucun formulaire : lien vers `/portfolio/contact`.
 */
export default function ContactSection({
  copy = CONTACT_COPY,
  className,
}: ContactSectionProps) {
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
            {copy.title}
          </Heading>
          <p className={styles.lead}>{copy.lead}</p>
          <div className={styles.actions}>
            <Button href={copy.ctaHref} variant="emphasis">
              {copy.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

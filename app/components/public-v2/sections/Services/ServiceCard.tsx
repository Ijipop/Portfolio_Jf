import type { ServiceOffer } from '@/lib/public-v2/servicesContent'
import styles from './ServiceCard.module.css'

export type ServiceCardProps = {
  offer: ServiceOffer
  className?: string
}

export default function ServiceCard({ offer, className }: ServiceCardProps) {
  const cls = [styles.card, styles[offer.variant], className].filter(Boolean).join(' ')

  return (
    <article className={cls} data-service-variant={offer.variant} data-testid={`pv2-service-${offer.id}`}>
      <span className={styles.index}>{offer.index}</span>
      <h3 className={styles.title}>{offer.title}</h3>
      <p className={styles.body}>{offer.description}</p>
      <a className={styles.link} href={offer.href}>
        {offer.ctaLabel}
      </a>
    </article>
  )
}

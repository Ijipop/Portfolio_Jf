import { Badge, Button } from '@/components/public-v2/primitives'
import type { LaboratoryFeature } from '@/lib/public-v2/laboratoryContent'
import styles from './LaboratoryCard.module.css'

export type LaboratoryCardProps = {
  feature: LaboratoryFeature
  badgeLabel: string
  ctaLabel: string
  className?: string
}

export default function LaboratoryCard({
  feature,
  badgeLabel,
  ctaLabel,
  className,
}: LaboratoryCardProps) {
  const root = [styles.card, className].filter(Boolean).join(' ')

  return (
    <article
      className={root}
      data-lab-preview={feature.id}
      data-testid={`pv2-lab-${feature.id}`}
    >
      <div className={styles.preview} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- public demo assets */}
        <img
          className={styles.previewImg}
          src={feature.previewSrc}
          alt=""
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.navHint} data-lab-nav-hint aria-hidden="true">
          <svg
            className={styles.navHintIcon}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 8h8M8.5 4.5 12 8l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className={styles.body}>
        <Badge variant="accent">{badgeLabel}</Badge>
        <h3 className={styles.title}>{feature.title}</h3>
        <p className={styles.description}>{feature.description}</p>
        <div className={styles.actions}>
          <Button
            href={feature.href}
            variant="emphasis"
            size="sm"
            aria-label={`${ctaLabel} — ${feature.title}`}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}

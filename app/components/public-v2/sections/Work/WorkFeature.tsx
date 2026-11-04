import { Badge, Button } from '@/components/public-v2/primitives'
import type { WorkFeature as WorkFeatureData } from '@/lib/public-v2/workContent'
import styles from './WorkFeature.module.css'

export type WorkFeatureProps = {
  feature: WorkFeatureData
  className?: string
}

export default function WorkFeature({ feature, className }: WorkFeatureProps) {
  const roleClass =
    feature.role === 'primary'
      ? styles.primary
      : feature.role === 'secondary'
        ? styles.secondary
        : styles.soft

  const phoneClass =
    feature.id === 'expression-lasalle'
      ? styles.expressionPhone
      : feature.id === 'thermo-trappeur'
        ? styles.thermoPhone
        : undefined

  const root = [styles.feature, roleClass, className].filter(Boolean).join(' ')

  return (
    <article
      className={root}
      data-work-role={feature.role}
      data-work-id={feature.id}
      data-catalog-key={feature.catalogKey}
      data-publishable={feature.publishable ? 'true' : 'false'}
      data-testid={`pv2-work-${feature.id}`}
    >
      <div className={styles.media} data-media-kind={feature.media.kind}>
        {/* eslint-disable-next-line @next/next/no-img-element -- sandbox static public paths */}
        <img
          className={feature.media.kind === 'product' ? styles.productShot : styles.desk}
          src={feature.media.desktopSrc}
          alt={feature.media.desktopAlt}
          width={feature.media.kind === 'product' ? 391 : 901}
          height={feature.media.kind === 'product' ? 395 : 752}
          loading="lazy"
          decoding="async"
        />
        {feature.media.kind === 'site' && feature.media.phoneSrc ? (
          <figure className={[styles.phone, phoneClass].filter(Boolean).join(' ')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={feature.media.phoneSrc}
              alt={feature.media.phoneAlt ?? ''}
              width={396}
              height={752}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          {feature.badges.map((badge) => (
            <Badge key={badge.label} variant={badge.variant}>
              {badge.label}
            </Badge>
          ))}
        </div>
        <h3 className={styles.title}>{feature.title}</h3>
        <p className={styles.tags}>{feature.tags}</p>
        <p className={styles.description}>{feature.description}</p>
        {feature.ctas.length > 0 ? (
          <div className={styles.actions}>
            {feature.ctas.map((cta) => (
              <Button key={cta.href + cta.label} href={cta.href} variant={cta.variant} size="sm">
                {cta.label}
              </Button>
            ))}
          </div>
        ) : null}
        {feature.legalNote ? <p className={styles.legal}>{feature.legalNote}</p> : null}
      </div>
    </article>
  )
}

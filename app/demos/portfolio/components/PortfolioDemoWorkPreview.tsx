import type { WorkPreviewTone } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

type Props = {
  tone: WorkPreviewTone
  label: string
  featured?: boolean
}

export default function PortfolioDemoWorkPreview({ tone, label, featured = false }: Props) {
  return (
    <div
      className={featured ? `${styles.preview} ${styles.previewFeatured}` : styles.preview}
      data-preview-tone={tone}
      aria-hidden
    >
      <div className={styles.previewChrome}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.previewScreen}>
        <div className={styles.previewBlock} />
        <div className={styles.previewBlockShort} />
        <div className={styles.previewRow}>
          <div className={styles.previewChip} />
          <div className={styles.previewChip} />
        </div>
      </div>
      <p className={styles.previewLabel}>{label}</p>
    </div>
  )
}

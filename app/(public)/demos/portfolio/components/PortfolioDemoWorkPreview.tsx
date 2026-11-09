import type { WorkPreviewTone } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

type Props = {
  tone: WorkPreviewTone
  label: string
  featured?: boolean
}

const PREVIEW_SRC: Record<WorkPreviewTone, string> = {
  thermo: '/demos/portfolio/preview-01.jpg',
  cabinet: '/demos/portfolio/preview-02.jpg',
  atelier: '/demos/portfolio/preview-03.jpg',
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PREVIEW_SRC[tone]}
          alt=""
          className={styles.previewPhoto}
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className={styles.previewLabel}>{label}</p>
    </div>
  )
}

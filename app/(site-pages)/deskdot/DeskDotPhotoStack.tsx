'use client'

import { useCallback, useId, useMemo, useState } from 'react'
import styles from './DeskDotLanding.module.css'

type DeskDotPhotoStackProps = {
  images: readonly string[]
  ariaLabel: string
  hint: string
}

export default function DeskDotPhotoStack({ images, ariaLabel, hint }: DeskDotPhotoStackProps) {
  const baseId = useId()
  const gallery = useMemo(() => images.filter(Boolean), [images])
  const [selected, setSelected] = useState(0)

  const select = useCallback((index: number) => {
    setSelected(index)
  }, [])

  if (gallery.length === 0) return null

  const activeIndex = Math.min(selected, gallery.length - 1)
  const heroSrc = gallery[activeIndex]

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryLayout} role="group" aria-label={ariaLabel}>
        <figure className={styles.galleryHero} aria-live="polite">
          {/* eslint-disable-next-line @next/next/no-img-element -- assets locaux /img/deskdot */}
          <img
            src={heroSrc}
            alt=""
            decoding="async"
            draggable={false}
            id={`${baseId}-hero`}
          />
        </figure>

        <div className={styles.galleryThumbs} role="list">
          {gallery.map((src, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={src}
                type="button"
                role="listitem"
                className={
                  isActive ? `${styles.galleryThumb} ${styles.galleryThumbActive}` : styles.galleryThumb
                }
                aria-pressed={isActive}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${hint} (${index + 1}/${gallery.length})`}
                aria-controls={`${baseId}-hero`}
                onClick={() => select(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- assets locaux /img/deskdot */}
                <img src={src} alt="" decoding="async" draggable={false} />
              </button>
            )
          })}
        </div>
      </div>
      <p className={styles.galleryHint}>{hint}</p>
    </div>
  )
}

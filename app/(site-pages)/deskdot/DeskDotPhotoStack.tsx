'use client'

import { useCallback, useState } from 'react'
import styles from './DeskDotLanding.module.css'

type DeskDotPhotoStackProps = {
  images: readonly string[]
  ariaLabel: string
  hint: string
}

export default function DeskDotPhotoStack({ images, ariaLabel, hint }: DeskDotPhotoStackProps) {
  const [order, setOrder] = useState<string[]>(() => [...images])

  const cycleFront = useCallback(() => {
    setOrder((prev) => {
      if (prev.length < 2) return prev
      const [first, ...rest] = prev
      return [...rest, first]
    })
  }, [])

  if (order.length === 0) return null

  const depth = order.length
  const peekX = 8
  const peekY = 6
  const peekRotate = 2
  const stackPadX = (depth - 1) * peekX
  const stackPadY = (depth - 1) * peekY

  return (
    <div className={styles.photoStackWrap}>
      <div
        className={styles.photoStack}
        style={{ paddingRight: stackPadX, paddingBottom: stackPadY }}
        role="group"
        aria-label={ariaLabel}
      >
        {order.map((src, i) => {
          const isTop = i === 0
          return (
            <button
              key={src}
              type="button"
              className={styles.photoStackCard}
              style={{
                zIndex: depth - i,
                transform: `translate(${i * peekX}px, ${i * peekY}px) rotate(${i * peekRotate}deg)`,
                pointerEvents: isTop ? 'auto' : 'none',
              }}
              onClick={isTop ? cycleFront : undefined}
              tabIndex={isTop ? 0 : -1}
              aria-hidden={!isTop}
              aria-label={isTop ? hint : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- assets locaux /img/deskdot */}
              <img src={src} alt="" decoding="async" draggable={false} />
            </button>
          )
        })}
      </div>
      <p className={styles.photoStackHint}>{hint}</p>
    </div>
  )
}

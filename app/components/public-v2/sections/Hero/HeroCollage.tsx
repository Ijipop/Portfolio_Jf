'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { HeroFloatMedia } from '@/lib/public-v2/heroContent'
import styles from './HeroCollage.module.css'

const SLOT_CLASS: Record<HeroFloatMedia['slot'], string> = {
  a: styles.slotA,
  b: styles.slotB,
  c: styles.slotC,
}

const SLOT_DEPTH: Record<HeroFloatMedia['slot'], number> = {
  a: 1,
  b: 2,
  c: 3,
}

/** Amplitude Concept D — légère. */
const PARALLAX = 7

export type HeroCollageProps = {
  floats: readonly HeroFloatMedia[]
  reduceMotion: boolean
  enhance: boolean
}

export default function HeroCollage({ floats, reduceMotion, enhance }: HeroCollageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const floatRefs = useRef<Record<string, HTMLElement | null>>({})
  const [entered, setEntered] = useState(false)
  const [returning, setReturning] = useState(false)

  const motionOn = enhance && !reduceMotion

  useEffect(() => {
    if (!motionOn) {
      setEntered(false)
      return
    }
    setEntered(false)
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setEntered(true))
    })
    return () => window.cancelAnimationFrame(id)
  }, [motionOn])

  /** Parallaxe sur toute la section Hero (pas seulement le stage). */
  useEffect(() => {
    if (!motionOn) return
    const root = stageRef.current?.closest('[data-testid="pv2-hero"]') as HTMLElement | null
    if (!root) return

    const apply = (nx: number, ny: number, withReturn: boolean) => {
      setReturning(withReturn)
      for (const float of floats) {
        const el = floatRefs.current[float.id]
        if (!el) continue
        const depth = SLOT_DEPTH[float.slot] * (PARALLAX * 0.35)
        el.style.setProperty('--px', `${(nx * depth).toFixed(2)}px`)
        el.style.setProperty('--py', `${(ny * depth).toFixed(2)}px`)
      }
    }

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      apply(nx, ny, false)
    }

    const onLeave = () => apply(0, 0, true)

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [motionOn, floats])

  const stageClass = [styles.stage, motionOn ? styles.enhance : ''].filter(Boolean).join(' ')

  return (
    <div ref={stageRef} className={stageClass} data-hero-stage aria-hidden="true">
      {floats.map((float) => (
        <figure
          key={float.id}
          ref={(node) => {
            floatRefs.current[float.id] = node
          }}
          className={[
            styles.float,
            SLOT_CLASS[float.slot],
            returning ? styles.floatReturning : '',
          ]
            .filter(Boolean)
            .join(' ')}
          data-float-id={float.id}
          data-publishable={float.publishable ? 'true' : 'false'}
          style={
            {
              ['--px' as string]: '0px',
              ['--py' as string]: '0px',
            } as CSSProperties
          }
        >
          <div
            className={[styles.floatEnter, motionOn && entered ? styles.isIn : '']
              .filter(Boolean)
              .join(' ')}
          >
            <div className={styles.floatSurface}>
              {/* eslint-disable-next-line @next/next/no-img-element -- sandbox collage, fixed public paths */}
              <img
                src={float.src}
                alt=""
                width={901}
                height={752}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </figure>
      ))}
      <span
        className={[styles.blob, styles.blobViolet, motionOn ? styles.blobFloating : '']
          .filter(Boolean)
          .join(' ')}
        data-hero-blob="violet"
      />
      <span
        className={[styles.blob, styles.blobCoral, motionOn ? styles.blobFloating : '']
          .filter(Boolean)
          .join(' ')}
        data-hero-blob="coral"
      />
    </div>
  )
}

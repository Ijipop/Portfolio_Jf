'use client'

import { useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import styles from './WebHeroBrowserBuild.module.css'

export type WebBrowserPhaseLabels = {
  tracing: string
  structuring: string
  revealing: string
}

type WebHeroBrowserBuildProps = {
  /** Même MotionValue que le Hero — aucun second timer. */
  progress: MotionValue<number>
  statusLabel: string
  labels: WebBrowserPhaseLabels
}

type StoryPhase = 'trace' | 'structure' | 'reveal' | 'live'

function storyFromProgress(v: number): StoryPhase {
  if (v >= 0.9) return 'live'
  if (v >= 0.5) return 'reveal'
  if (v >= 0.22) return 'structure'
  return 'trace'
}

function labelForPhase(
  phase: StoryPhase,
  labels: WebBrowserPhaseLabels,
  statusLabel: string,
) {
  if (phase === 'live') return statusLabel
  if (phase === 'reveal') return labels.revealing
  if (phase === 'structure') return labels.structuring
  return labels.tracing
}

/**
 * Démonstration visuelle sync : navigateur qui se construit
 * en parallèle de la vraie page (progress Hero partagée).
 * Décoratif uniquement — aria-hidden (la page réelle porte le sens).
 */
export default function WebHeroBrowserBuild({
  progress,
  statusLabel,
  labels,
}: WebHeroBrowserBuildProps) {
  const [storyPhase, setStoryPhase] = useState<StoryPhase>(() =>
    storyFromProgress(progress.get()),
  )
  const [displayPct, setDisplayPct] = useState(() => Math.round(progress.get() * 100))

  useMotionValueEvent(progress, 'change', (v) => {
    const pct = Math.round(v * 100)
    setDisplayPct((prev) => (prev === pct ? prev : pct))
    const next = storyFromProgress(v)
    setStoryPhase((prev) => (prev === next ? prev : next))
  })

  /* TRACE — tracés plus longs (moins précipités) */
  const shellDraw = useTransform(progress, [0, 0.06, 0.18], [0, 0.45, 1])
  const shadowOpacity = useTransform(shellDraw, (v) => v * 0.08)
  const chromeDraw = useTransform(progress, [0.08, 0.14, 0.22], [0, 0.45, 1])
  const dotsOpacity = useTransform(progress, [0.1, 0.18], [0, 1])
  const urlDraw = useTransform(progress, [0.14, 0.2, 0.28], [0, 0.5, 1])
  const ticksOpacity = useTransform(progress, [0.02, 0.12, 0.58, 0.74], [0, 1, 0.45, 0])

  /* STRUCTURE */
  const navDraw = useTransform(progress, [0.2, 0.3, 0.4], [0, 0.5, 1])
  const heroWire = useTransform(progress, [0.26, 0.36, 0.46], [0, 0.45, 1])
  const bar1 = useTransform(progress, [0.3, 0.38, 0.46], [0, 0.55, 1])
  const bar2 = useTransform(progress, [0.34, 0.42, 0.5], [0, 0.55, 1])
  const card0 = useTransform(progress, [0.36, 0.44, 0.52], [0, 0.5, 1])
  const card1 = useTransform(progress, [0.4, 0.48, 0.55], [0, 0.5, 1])
  const card2 = useTransform(progress, [0.44, 0.52, 0.58], [0, 0.5, 1])

  /* RÉVÉLER */
  const wireFade = useTransform(progress, [0.5, 0.62, 0.78], [1, 0.4, 0])
  const fillNav = useTransform(progress, [0.52, 0.62, 0.74], [0, 0.65, 1])
  const fillHero = useTransform(progress, [0.56, 0.68, 0.82], [0, 0.6, 1])
  const fillCards = useTransform(progress, [0.64, 0.76, 0.88], [0, 0.55, 1])
  const accentLine = useTransform(progress, [0.74, 0.84, 0.92], [0, 0.65, 1])

  const navWireOpacity = useTransform([navDraw, wireFade], ([d, w]) => Number(d) * Number(w))
  const heroWireOpacity = useTransform([heroWire, wireFade], ([d, w]) => Number(d) * Number(w))
  const bar1Opacity = useTransform([bar1, wireFade], ([d, w]) => Number(d) * Number(w) * 0.85)
  const bar2Opacity = useTransform([bar2, wireFade], ([d, w]) => Number(d) * Number(w) * 0.7)
  const bar2StrokeOpacity = useTransform([bar2, wireFade], ([d, w]) => Number(d) * Number(w))
  const sideWireOpacity = useTransform([heroWire, wireFade], ([d, w]) => Number(d) * Number(w) * 0.85)
  const card0Wire = useTransform([card0, wireFade], ([d, w]) => Number(d) * Number(w))
  const card1Wire = useTransform([card1, wireFade], ([d, w]) => Number(d) * Number(w))
  const card2Wire = useTransform([card2, wireFade], ([d, w]) => Number(d) * Number(w))
  const card0Bar = useTransform([card0, wireFade], ([d, w]) => Number(d) * Number(w) * 0.75)
  const card1Bar = useTransform([card1, wireFade], ([d, w]) => Number(d) * Number(w) * 0.75)
  const card2Bar = useTransform([card2, wireFade], ([d, w]) => Number(d) * Number(w) * 0.75)

  /* LIVE */
  const progressUiOpacity = useTransform(progress, [0.86, 0.94], [1, 0])
  const badgeOpacity = useTransform(progress, [0.88, 0.95, 1], [0, 0.85, 1])
  const badgeY = useTransform(progress, [0.88, 1], [6, 0])

  const live = storyPhase === 'live'
  const phaseLabel = labelForPhase(storyPhase, labels, statusLabel)

  return (
    <div className={styles.stage} aria-hidden data-phase={storyPhase} data-testid="pv2-web-browser">
      <div className={styles.progressBlock}>
        <motion.div className={styles.progressInner} style={{ opacity: progressUiOpacity }}>
          <p className={styles.progressLabel}>
            {phaseLabel}
            {!live ? (
              <span>
                {' '}
                · {displayPct}&nbsp;%
              </span>
            ) : null}
          </p>
          <div className={styles.progressTrack}>
            <motion.span className={styles.progressFill} style={{ scaleX: progress }} />
          </div>
        </motion.div>
      </div>

      <div className={styles.canvas}>
        <svg
          className={styles.stageSvg}
          viewBox="0 0 360 268"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <linearGradient id="webBrowserGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-surface, #fff)" stopOpacity="0.98" />
              <stop offset="100%" stopColor="var(--color-bg, #f7f4ef)" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="webBrowserHeroFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-ink)" stopOpacity="0.92" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <motion.ellipse
            cx="180"
            cy="252"
            rx="118"
            ry="8"
            fill="var(--color-ink)"
            style={{ opacity: shadowOpacity }}
          />

          <motion.rect
            x="28"
            y="18"
            width="304"
            height="220"
            rx="12"
            stroke="var(--color-accent)"
            strokeWidth="1.75"
            fill="url(#webBrowserGlass)"
            style={{ pathLength: shellDraw, opacity: shellDraw }}
          />

          <motion.rect
            x="28"
            y="18"
            width="304"
            height="28"
            rx="12"
            fill="color-mix(in srgb, var(--color-ink) 6%, var(--color-bg))"
            style={{ opacity: chromeDraw }}
          />
          <motion.rect
            x="28"
            y="34"
            width="304"
            height="12"
            fill="color-mix(in srgb, var(--color-ink) 6%, var(--color-bg))"
            style={{ opacity: chromeDraw }}
          />

          <motion.g style={{ opacity: dotsOpacity }}>
            <circle cx="48" cy="32" r="4" fill="color-mix(in srgb, var(--color-ink) 28%, transparent)" />
            <circle cx="62" cy="32" r="4" fill="color-mix(in srgb, var(--color-accent) 55%, transparent)" />
            <circle cx="76" cy="32" r="4" fill="color-mix(in srgb, var(--color-ink) 18%, transparent)" />
          </motion.g>

          <motion.rect
            x="96"
            y="24"
            width="210"
            height="16"
            rx="8"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            fill="color-mix(in srgb, var(--color-bg) 80%, transparent)"
            style={{ pathLength: urlDraw, opacity: urlDraw }}
          />
          <motion.rect
            x="108"
            y="29"
            width="120"
            height="5"
            rx="2"
            fill="var(--color-accent)"
            style={{ opacity: urlDraw, scaleX: urlDraw, transformOrigin: '108px 31.5px' }}
          />

          <clipPath id="webBrowserContent">
            <rect x="36" y="52" width="288" height="178" rx="4" />
          </clipPath>

          <g clipPath="url(#webBrowserContent)">
            <motion.rect
              x="48"
              y="62"
              width="264"
              height="14"
              rx="3"
              stroke="var(--color-accent)"
              strokeWidth="1.25"
              strokeDasharray="4 3"
              fill="none"
              style={{ pathLength: navDraw, opacity: navWireOpacity }}
            />
            <motion.rect
              x="48"
              y="62"
              width="264"
              height="14"
              rx="3"
              fill="color-mix(in srgb, var(--color-surface, #fff) 90%, var(--color-accent))"
              style={{ opacity: fillNav }}
            />
            <motion.rect
              x="56"
              y="66"
              width="48"
              height="5"
              rx="1.5"
              fill="var(--color-ink)"
              style={{ opacity: fillNav, scaleX: fillNav, transformOrigin: '56px 68.5px' }}
            />
            <motion.rect
              x="220"
              y="66"
              width="28"
              height="5"
              rx="1.5"
              fill="var(--color-accent)"
              style={{ opacity: fillNav, scaleX: fillNav, transformOrigin: '220px 68.5px' }}
            />
            <motion.rect
              x="256"
              y="66"
              width="28"
              height="5"
              rx="1.5"
              fill="color-mix(in srgb, var(--color-ink) 35%, transparent)"
              style={{ opacity: fillNav, scaleX: fillNav, transformOrigin: '256px 68.5px' }}
            />

            <motion.rect
              x="48"
              y="88"
              width="160"
              height="72"
              rx="6"
              stroke="var(--color-accent)"
              strokeWidth="1.35"
              fill="none"
              style={{ pathLength: heroWire, opacity: heroWireOpacity }}
            />
            <motion.rect
              x="58"
              y="100"
              width="110"
              height="8"
              rx="2"
              fill="var(--color-accent)"
              style={{ opacity: bar1Opacity, scaleX: bar1, transformOrigin: '58px 104px' }}
            />
            <motion.rect
              x="58"
              y="116"
              width="88"
              height="6"
              rx="2"
              fill="var(--color-accent)"
              style={{ opacity: bar2Opacity, scaleX: bar2, transformOrigin: '58px 119px' }}
            />
            <motion.rect
              x="58"
              y="136"
              width="52"
              height="12"
              rx="6"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="none"
              style={{ pathLength: bar2, opacity: bar2StrokeOpacity }}
            />

            <motion.rect
              x="48"
              y="88"
              width="160"
              height="72"
              rx="6"
              fill="url(#webBrowserHeroFill)"
              style={{ opacity: fillHero }}
            />
            <motion.rect
              x="58"
              y="102"
              width="100"
              height="7"
              rx="2"
              fill="var(--color-bg, #f7f4ef)"
              style={{ opacity: fillHero, scaleX: fillHero, transformOrigin: '58px 105.5px' }}
            />
            <motion.rect
              x="58"
              y="116"
              width="78"
              height="5"
              rx="1.5"
              fill="color-mix(in srgb, var(--color-bg, #f7f4ef) 75%, transparent)"
              style={{ opacity: fillHero, scaleX: fillHero, transformOrigin: '58px 118.5px' }}
            />
            <motion.rect
              x="58"
              y="136"
              width="48"
              height="12"
              rx="6"
              fill="var(--color-bg, #f7f4ef)"
              style={{ opacity: fillHero }}
            />

            <motion.rect
              x="220"
              y="88"
              width="92"
              height="72"
              rx="6"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              strokeDasharray="3 2.5"
              fill="none"
              style={{ pathLength: heroWire, opacity: sideWireOpacity }}
            />
            <motion.rect
              x="220"
              y="88"
              width="92"
              height="72"
              rx="6"
              fill="color-mix(in srgb, var(--color-accent) 10%, var(--color-surface, #fff))"
              style={{ opacity: fillHero }}
            />
            <motion.path
              d="M236 112 H296 M236 128 H280"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: accentLine, opacity: accentLine }}
            />

            {/* Card 0 */}
            <motion.rect
              x="48"
              y="176"
              width="76"
              height="44"
              rx="5"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="none"
              style={{ pathLength: card0, opacity: card0Wire }}
            />
            <motion.rect
              x="56"
              y="186"
              width="48"
              height="5"
              rx="1.5"
              fill="var(--color-accent)"
              style={{ opacity: card0Bar, scaleX: card0, transformOrigin: '56px 188.5px' }}
            />
            <motion.rect
              x="48"
              y="176"
              width="76"
              height="44"
              rx="5"
              fill="var(--color-surface, #fff)"
              stroke="color-mix(in srgb, var(--color-ink) 12%, transparent)"
              strokeWidth="1"
              style={{ opacity: fillCards }}
            />
            <motion.rect
              x="56"
              y="186"
              width="40"
              height="5"
              rx="1.5"
              fill="var(--color-ink)"
              style={{ opacity: fillCards, scaleX: fillCards, transformOrigin: '56px 188.5px' }}
            />
            <motion.rect
              x="56"
              y="198"
              width="56"
              height="4"
              rx="1"
              fill="color-mix(in srgb, var(--color-ink) 35%, transparent)"
              style={{ opacity: fillCards, scaleX: fillCards, transformOrigin: '56px 200px' }}
            />

            {/* Card 1 */}
            <motion.rect
              x="142"
              y="176"
              width="76"
              height="44"
              rx="5"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="none"
              style={{ pathLength: card1, opacity: card1Wire }}
            />
            <motion.rect
              x="150"
              y="186"
              width="42"
              height="5"
              rx="1.5"
              fill="var(--color-accent)"
              style={{ opacity: card1Bar, scaleX: card1, transformOrigin: '150px 188.5px' }}
            />
            <motion.rect
              x="142"
              y="176"
              width="76"
              height="44"
              rx="5"
              fill="var(--color-surface, #fff)"
              stroke="color-mix(in srgb, var(--color-ink) 12%, transparent)"
              strokeWidth="1"
              style={{ opacity: fillCards }}
            />
            <motion.rect
              x="150"
              y="186"
              width="36"
              height="5"
              rx="1.5"
              fill="var(--color-ink)"
              style={{ opacity: fillCards, scaleX: fillCards, transformOrigin: '150px 188.5px' }}
            />
            <motion.rect
              x="150"
              y="198"
              width="48"
              height="4"
              rx="1"
              fill="color-mix(in srgb, var(--color-ink) 35%, transparent)"
              style={{ opacity: fillCards, scaleX: fillCards, transformOrigin: '150px 200px' }}
            />

            {/* Card 2 */}
            <motion.rect
              x="236"
              y="176"
              width="76"
              height="44"
              rx="5"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="none"
              style={{ pathLength: card2, opacity: card2Wire }}
            />
            <motion.rect
              x="244"
              y="186"
              width="36"
              height="5"
              rx="1.5"
              fill="var(--color-accent)"
              style={{ opacity: card2Bar, scaleX: card2, transformOrigin: '244px 188.5px' }}
            />
            <motion.rect
              x="236"
              y="176"
              width="76"
              height="44"
              rx="5"
              fill="var(--color-surface, #fff)"
              stroke="color-mix(in srgb, var(--color-ink) 12%, transparent)"
              strokeWidth="1"
              style={{ opacity: fillCards }}
            />
            <motion.rect
              x="244"
              y="186"
              width="32"
              height="5"
              rx="1.5"
              fill="var(--color-ink)"
              style={{ opacity: fillCards, scaleX: fillCards, transformOrigin: '244px 188.5px' }}
            />
            <motion.rect
              x="244"
              y="198"
              width="40"
              height="4"
              rx="1"
              fill="color-mix(in srgb, var(--color-ink) 35%, transparent)"
              style={{ opacity: fillCards, scaleX: fillCards, transformOrigin: '244px 200px' }}
            />
          </g>

          <motion.g
            stroke="var(--color-accent)"
            strokeWidth="1.4"
            strokeLinecap="square"
            style={{ opacity: ticksOpacity }}
          >
            <path d="M20 18 H28 M28 10 V18" />
            <path d="M340 18 H332 M332 10 V18" />
            <path d="M20 238 H28 M28 246 V238" />
            <path d="M340 238 H332 M332 246 V238" />
          </motion.g>
        </svg>
      </div>

      <div className={styles.badgeSlot}>
        <motion.div className={styles.status} style={{ opacity: badgeOpacity, y: badgeY }}>
          <span className={styles.statusDot} />
          {statusLabel}
        </motion.div>
      </div>
    </div>
  )
}

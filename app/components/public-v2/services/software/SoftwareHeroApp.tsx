'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import styles from './SoftwareHeroApp.module.css'

type SoftwareHeroAppProps = {
  progress: MotionValue<number>
  statusLabel: string
}

/**
 * Petite app de bureau crédible.
 * Besoin → construction → Document → Import → Traitement → Organisation → Résultat.
 * Décoratif (aria-hidden). Une seule progress Hero.
 */
export default function SoftwareHeroApp({ progress, statusLabel }: SoftwareHeroAppProps) {
  /* ——— BESOIN 0–16 % ——— */
  const needOpacity = useTransform(progress, [0, 0.03, 0.14, 0.24], [0, 1, 1, 0])
  const docNeed = useTransform(progress, [0.02, 0.07], [0, 1])
  const chipA = useTransform(progress, [0.04, 0.09], [0, 1])
  const chipB = useTransform(progress, [0.06, 0.11], [0, 1])
  const taskNeed = useTransform(progress, [0.08, 0.13], [0, 1])
  const linkDraw = useTransform(progress, [0.09, 0.16], [0, 1])

  /* ——— CONSTRUCTION 16–46 % ——— */
  const shellDraw = useTransform(progress, [0.14, 0.2, 0.28], [0, 0.55, 1])
  const titleBar = useTransform(progress, [0.2, 0.26], [0, 1])
  const sideDraw = useTransform(progress, [0.24, 0.32], [0, 1])
  const mainDraw = useTransform(progress, [0.28, 0.36], [0, 1])
  const fieldsDraw = useTransform(progress, [0.32, 0.4], [0, 1])
  const colorFill = useTransform(progress, [0.36, 0.44, 0.48], [0, 0.7, 1])
  const shadowOp = useTransform(shellDraw, (v) => v * 0.12)
  const sideOp = useTransform(
    [sideDraw, colorFill],
    ([a, b]) => Number(a) * (0.35 + Number(b) * 0.65),
  )
  const mainOutlineOp = useTransform(progress, [0.28, 0.38, 0.48, 0.56], [0, 1, 0.45, 0])

  /* ——— TRAVAIL 46–86 % ——— */
  const docFlyX = useTransform(progress, [0.46, 0.54, 0.6], [48, 20, 0])
  const docFlyY = useTransform(progress, [0.46, 0.54, 0.6], [-42, -14, 0])
  const docFlyOp = useTransform(progress, [0.46, 0.5, 0.56, 0.62], [0, 1, 1, 0])
  const importPulse = useTransform(progress, [0.54, 0.58, 0.64], [0, 1, 0])
  const importScale = useTransform(importPulse, [0, 1], [0.72, 1.18])

  const fill1W = useTransform(progress, [0.56, 0.62, 0.68], [0, 52, 88])
  const fill1Op = useTransform(progress, [0.56, 0.6], [0, 1])
  const fill2W = useTransform(progress, [0.6, 0.66, 0.72], [0, 70, 120])
  const fill2Op = useTransform(progress, [0.6, 0.64], [0, 1])
  const fill3W = useTransform(progress, [0.64, 0.7, 0.76], [0, 40, 64])
  const fill3Op = useTransform(progress, [0.64, 0.68], [0, 1])

  const processTrackOp = useTransform(progress, [0.58, 0.64], [0, 1])
  const processBarW = useTransform(progress, [0.6, 0.72, 0.8], [0, 86, 156])
  const processBarOp = useTransform(progress, [0.6, 0.66], [0, 1])

  const flow0 = useTransform(progress, [0.62, 0.68], [0, 1])
  const flow1 = useTransform(progress, [0.68, 0.74], [0, 1])
  const flow2 = useTransform(progress, [0.74, 0.8], [0, 1])
  const flowLine = useTransform(progress, [0.64, 0.78], [0, 1])

  const organizeY = useTransform(progress, [0.72, 0.82], [12, 0])
  const resultOp = useTransform(progress, [0.74, 0.82, 0.88], [0, 0.75, 1])
  const resultCheck = useTransform(progress, [0.8, 0.86], [0, 1])

  /* ——— FINI ——— */
  const badgeOp = useTransform(progress, [0.86, 0.93, 1], [0, 0.85, 1])
  const badgeY = useTransform(progress, [0.86, 1], [8, 0])
  const liveGlow = useTransform(progress, [0.88, 1], [0, 1])

  return (
    <div className={styles.stage} aria-hidden data-testid="pv2-software-app">
      <div className={styles.canvas}>
        <svg
          className={styles.stageSvg}
          viewBox="0 0 380 300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <linearGradient id="softAppGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-surface, #fff)" stopOpacity="0.98" />
              <stop offset="100%" stopColor="var(--color-bg, #f7f4ef)" stopOpacity="0.96" />
            </linearGradient>
            <linearGradient id="softAppSidebar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-ink)" stopOpacity="0.92" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="softAppSoft" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
            </filter>
          </defs>

          <motion.ellipse
            cx="190"
            cy="278"
            rx="118"
            ry="9"
            fill="var(--color-ink)"
            style={{ opacity: shadowOp }}
          />

          {/* Scattered need */}
          <motion.g style={{ opacity: needOpacity }}>
            <motion.g style={{ opacity: docNeed }}>
              <rect
                x="48"
                y="48"
                width="52"
                height="64"
                rx="4"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="color-mix(in srgb, var(--color-bg) 85%, var(--color-accent))"
                transform="rotate(-8 74 80)"
              />
              <path
                d="M58 62h28M58 74h22M58 86h26"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
                transform="rotate(-8 74 80)"
              />
            </motion.g>
            <motion.rect
              x="280"
              y="56"
              width="44"
              height="16"
              rx="8"
              fill="var(--color-accent)"
              opacity="0.35"
              style={{ opacity: chipA }}
            />
            <motion.rect
              x="292"
              y="80"
              width="36"
              height="14"
              rx="7"
              fill="var(--color-ink)"
              opacity="0.25"
              style={{ opacity: chipB }}
            />
            <motion.rect
              x="250"
              y="110"
              width="72"
              height="22"
              rx="4"
              stroke="var(--color-accent)"
              strokeWidth="1.4"
              strokeDasharray="3 2"
              fill="none"
              style={{ opacity: taskNeed }}
            />
            <motion.path
              d="M100 90 C140 70, 200 100, 260 120"
              stroke="var(--color-accent)"
              strokeWidth="1.3"
              strokeDasharray="4 3"
              style={{ pathLength: linkDraw, opacity: linkDraw }}
            />
            <motion.path
              d="M100 100 C160 130, 220 90, 290 88"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.7"
              style={{ pathLength: linkDraw, opacity: linkDraw }}
            />
          </motion.g>

          {/* App window */}
          <motion.rect
            x="54"
            y="36"
            width="272"
            height="220"
            rx="12"
            stroke="var(--color-accent)"
            strokeWidth="1.75"
            fill="url(#softAppGlass)"
            filter="url(#softAppSoft)"
            style={{ pathLength: shellDraw, opacity: shellDraw }}
          />

          <motion.g style={{ opacity: titleBar }}>
            <rect
              x="54"
              y="36"
              width="272"
              height="28"
              rx="12"
              fill="color-mix(in srgb, var(--color-ink) 7%, var(--color-bg))"
            />
            <rect
              x="54"
              y="52"
              width="272"
              height="12"
              fill="color-mix(in srgb, var(--color-ink) 7%, var(--color-bg))"
            />
            <circle cx="74" cy="50" r="3.5" fill="color-mix(in srgb, var(--color-ink) 30%, transparent)" />
            <circle cx="88" cy="50" r="3.5" fill="color-mix(in srgb, var(--color-accent) 55%, transparent)" />
            <circle cx="102" cy="50" r="3.5" fill="color-mix(in srgb, var(--color-ink) 18%, transparent)" />
            <rect
              x="140"
              y="44"
              width="100"
              height="10"
              rx="5"
              fill="color-mix(in srgb, var(--color-ink) 12%, transparent)"
            />
          </motion.g>

          <motion.rect
            x="54"
            y="64"
            width="64"
            height="192"
            fill="url(#softAppSidebar)"
            style={{ opacity: sideOp }}
          />
          <motion.g style={{ opacity: sideDraw }}>
            <rect x="64" y="80" width="36" height="6" rx="2" fill="var(--color-bg)" opacity="0.85" />
            <rect x="64" y="96" width="28" height="5" rx="2" fill="var(--color-bg)" opacity="0.45" />
            <rect x="64" y="110" width="32" height="5" rx="2" fill="var(--color-bg)" opacity="0.45" />
            <rect x="64" y="124" width="24" height="5" rx="2" fill="var(--color-bg)" opacity="0.35" />
            <rect x="64" y="210" width="20" height="5" rx="2" fill="var(--color-bg)" opacity="0.3" />
          </motion.g>

          <motion.rect
            x="128"
            y="76"
            width="182"
            height="168"
            rx="6"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            fill="none"
            style={{ pathLength: mainDraw, opacity: mainOutlineOp }}
          />

          <motion.rect
            x="128"
            y="76"
            width="182"
            height="168"
            rx="6"
            fill="color-mix(in srgb, var(--color-surface, #fff) 94%, var(--color-accent))"
            style={{ opacity: colorFill }}
          />

          <motion.g style={{ opacity: fieldsDraw }}>
            <rect
              x="140"
              y="92"
              width="120"
              height="18"
              rx="4"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="color-mix(in srgb, var(--color-bg) 70%, transparent)"
            />
            <rect
              x="140"
              y="120"
              width="156"
              height="18"
              rx="4"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="color-mix(in srgb, var(--color-bg) 70%, transparent)"
            />
            <rect
              x="140"
              y="148"
              width="96"
              height="18"
              rx="4"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              fill="color-mix(in srgb, var(--color-bg) 70%, transparent)"
            />
          </motion.g>

          {/* Data filling fields */}
          <motion.rect
            x="146"
            y="97"
            height="8"
            rx="2"
            fill="var(--color-ink)"
            style={{ opacity: fill1Op, width: fill1W }}
          />
          <motion.rect
            x="146"
            y="125"
            height="8"
            rx="2"
            fill="var(--color-accent)"
            style={{ opacity: fill2Op, width: fill2W }}
          />
          <motion.rect
            x="146"
            y="153"
            height="8"
            rx="2"
            fill="var(--color-ink)"
            opacity="0.55"
            style={{ opacity: fill3Op, width: fill3W }}
          />

          {/* Process track */}
          <motion.rect
            x="140"
            y="180"
            width="156"
            height="8"
            rx="4"
            fill="color-mix(in srgb, var(--color-ink) 10%, transparent)"
            style={{ opacity: processTrackOp }}
          />
          <motion.rect
            x="140"
            y="180"
            height="8"
            rx="4"
            fill="var(--color-accent)"
            style={{ opacity: processBarOp, width: processBarW }}
          />

          <motion.circle cx="160" cy="200" r="3.5" fill="var(--color-accent)" style={{ opacity: flow0 }} />
          <motion.circle cx="190" cy="200" r="3.5" fill="var(--color-accent)" style={{ opacity: flow1 }} />
          <motion.circle cx="220" cy="200" r="3.5" fill="var(--color-accent)" style={{ opacity: flow2 }} />
          <motion.path
            d="M164 200 H186 M194 200 H216"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: flowLine, opacity: flowLine }}
          />

          {/* Organized result */}
          <motion.g style={{ opacity: resultOp, y: organizeY }}>
            <rect
              x="140"
              y="212"
              width="100"
              height="24"
              rx="4"
              fill="color-mix(in srgb, var(--color-accent) 14%, var(--color-surface, #fff))"
              stroke="var(--color-accent)"
              strokeWidth="1.2"
            />
            <path
              d="M150 220h60M150 228h44"
              stroke="var(--color-ink)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />
            <motion.g style={{ opacity: resultCheck }}>
              <circle cx="228" cy="224" r="5" fill="var(--color-accent)" />
              <path
                d="M225 224l2.2 2.2 4.5-4.5"
                stroke="var(--color-bg)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </motion.g>
          </motion.g>

          <motion.circle
            cx="200"
            cy="140"
            r="28"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            fill="none"
            style={{ opacity: importPulse, scale: importScale }}
          />

          {/* Flying document */}
          <motion.g style={{ opacity: docFlyOp, x: docFlyX, y: docFlyY }}>
            <rect
              x="168"
              y="118"
              width="44"
              height="54"
              rx="3"
              fill="color-mix(in srgb, var(--color-bg) 90%, var(--color-accent))"
              stroke="var(--color-accent)"
              strokeWidth="1.4"
            />
            <path
              d="M176 130h24M176 140h18M176 150h22"
              stroke="var(--color-accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.75"
            />
          </motion.g>

          <motion.rect
            x="64"
            y="80"
            width="36"
            height="6"
            rx="2"
            fill="var(--color-accent)"
            style={{ opacity: liveGlow }}
          />
        </svg>
      </div>

      <div className={styles.badgeSlot}>
        <motion.div className={styles.status} style={{ opacity: badgeOp, y: badgeY }}>
          <span className={styles.statusMark}>✓</span>
          {statusLabel}
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import styles from './SupportHeroAssembly.module.css'

type Pt = { x: number; y: number }

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = 0.5
const TOTAL_DURATION = 6.5

/** True isometric projection — depth from geometry only. */
function iso(x: number, y: number, z: number): Pt {
  return {
    x: (x - y) * COS30,
    y: (x + y) * SIN30 - z,
  }
}

function poly(...points: Pt[]): string {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
}

type Box = { x: number; y: number; z: number; w: number; d: number; h: number }

function faces(b: Box) {
  const { x, y, z, w, d, h } = b
  const p = (dx: number, dy: number, dz: number) => iso(x + dx, y + dy, z + dz)
  return {
    top: poly(p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)),
    south: poly(p(0, 0, 0), p(w, 0, 0), p(w, 0, h), p(0, 0, h)),
    east: poly(p(w, 0, 0), p(w, d, 0), p(w, d, h), p(w, 0, h)),
    west: poly(p(0, 0, 0), p(0, d, 0), p(0, d, h), p(0, 0, h)),
    north: poly(p(0, d, 0), p(w, d, 0), p(w, d, h), p(0, d, h)),
  }
}

const C = {
  caseTop: '#2f5252',
  caseSide: '#1a3a3a',
  caseDeep: '#122828',
  caseEdge: '#0b1c1c',
  accent: '#0f7c7c',
  accentLite: '#4ec4c4',
  brass: '#c4a35a',
  brassDark: '#8f7340',
  mb: '#1b5c45',
  mbDark: '#0f3a2c',
  mbTrace: '#2f8f6e',
  cpu: '#d2cec6',
  cpuShade: '#9a958c',
  ram: '#1a3352',
  ramChip: '#0b1828',
  ssd: '#2b2d33',
  cooler: '#6a7878',
  coolerDark: '#3e4a4a',
  fan: '#152424',
  glassEdge: 'rgba(15, 124, 124, 0.55)',
  shadow: 'rgba(26, 58, 58, 0.2)',
  line: 'rgba(15, 124, 124, 0.4)',
  ledOn: '#3dd68c',
  ledOff: '#3a5050',
  psu: '#2a2c32',
  psuDark: '#17181c',
}

/** Assembly windows inside 0–0.65 — last part finishes at 65%. */
const PART_WINDOWS = {
  chassis: [0.0, 0.08],
  psu: [0.05, 0.14],
  mb: [0.12, 0.24],
  cpu: [0.22, 0.34],
  cooler: [0.32, 0.44],
  ramA: [0.4, 0.5],
  ramB: [0.46, 0.55],
  ssd: [0.52, 0.6],
  panel: [0.56, 0.65],
} as const

type StoryPhase = 'assemble' | 'diagnose' | 'boot' | 'live'

type ProgressLabels = {
  assembling: string
  diagnosing: string
  booting: string
}

type SupportHeroAssemblyProps = {
  statusLabel: string
  labels: ProgressLabels
  ariaLabel?: string
}

function storyFromProgress(v: number): StoryPhase {
  if (v >= 1) return 'live'
  if (v >= 0.85) return 'boot'
  if (v >= 0.65) return 'diagnose'
  return 'assemble'
}

function labelForPhase(phase: StoryPhase, labels: ProgressLabels, statusLabel: string) {
  if (phase === 'live') return statusLabel
  if (phase === 'boot') return labels.booting
  if (phase === 'diagnose') return labels.diagnosing
  return labels.assembling
}

function readDebugProgress(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('heroProgress')
  if (raw == null || raw === '') return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return Math.min(1, Math.max(0, n))
}

export default function SupportHeroAssembly({
  statusLabel,
  labels,
  ariaLabel = 'Assembly of a desktop computer tower',
}: SupportHeroAssemblyProps) {
  const reduceMotion = useReducedMotion()
  const progress = useMotionValue(reduceMotion ? 1 : 0)
  const fanControls = useAnimationControls()

  const [storyPhase, setStoryPhase] = useState<StoryPhase>(reduceMotion ? 'live' : 'assemble')
  const [displayPct, setDisplayPct] = useState(reduceMotion ? 100 : 0)
  const fanStartedRef = useRef(false)

  const caseOuter = useMemo(() => faces({ x: 0, y: 0, z: 0, w: 58, d: 88, h: 138 }), [])
  const caseInner = useMemo(() => faces({ x: 4, y: 6, z: 8, w: 50, d: 76, h: 122 }), [])
  const mb = useMemo(() => faces({ x: 8, y: 14, z: 18, w: 2.8, d: 62, h: 100 }), [])
  const cpu = useMemo(() => faces({ x: 11.5, y: 34, z: 78, w: 10, d: 20, h: 20 }), [])
  const cooler = useMemo(() => faces({ x: 16, y: 31, z: 80, w: 22, d: 26, h: 26 }), [])
  const ramA = useMemo(() => faces({ x: 11.5, y: 58, z: 55, w: 3.2, d: 2.6, h: 48 }), [])
  const ramB = useMemo(() => faces({ x: 11.5, y: 64, z: 55, w: 3.2, d: 2.6, h: 48 }), [])
  const ssd = useMemo(() => faces({ x: 12, y: 16, z: 36, w: 4.5, d: 32, h: 9 }), [])
  const psu = useMemo(() => faces({ x: 6, y: 10, z: 4, w: 46, d: 68, h: 16 }), [])
  const panel = useMemo(() => faces({ x: 59.5, y: 3, z: 6, w: 2.2, d: 82, h: 126 }), [])

  const origin = iso(29, 44, 0)
  const viewBox = useMemo(() => {
    const focusX = origin.x + 10
    const left = focusX - 200
    const top = origin.y - 200
    return `${left} ${top} 400 330`
  }, [origin.x, origin.y])

  const leaderOpacity = useTransform(progress, [0, 0.55, 0.65], [0.9, 0.55, 0])
  const mbDiagOpacity = useTransform(progress, [0.65, 0.68, 0.74, 0.8], [0, 1, 1, 0.15])
  const cpuDiagOpacity = useTransform(progress, [0.7, 0.73, 0.78, 0.83], [0, 1, 0.85, 0.2])
  const ramADiagOpacity = useTransform(progress, [0.72, 0.75, 0.79, 0.84], [0, 1, 0.9, 0.15])
  const ramBDiagOpacity = useTransform(progress, [0.76, 0.79, 0.83, 0.86], [0, 1, 0.9, 0.15])
  const ssdDiagOpacity = useTransform(progress, [0.78, 0.81, 0.84, 0.87], [0, 1, 0.9, 0])
  const bootSweepX = useTransform(progress, [0.88, 1], [-110, 95])
  const bootSweepOpacity = useTransform(progress, [0.88, 0.92, 0.97, 1], [0, 0.45, 0.35, 0])
  const ledOn = useTransform(progress, [0.84, 0.86], [0, 1])

  useMotionValueEvent(progress, 'change', (v) => {
    const pct = Math.round(v * 100)
    setDisplayPct((prev) => (prev === pct ? prev : pct))
    const next = storyFromProgress(v)
    setStoryPhase((prev) => (prev === next ? prev : next))
    if (!reduceMotion && v >= 0.85 && !fanStartedRef.current) {
      fanStartedRef.current = true
      void fanControls.start({
        rotate: 360,
        transition: { duration: 2.8, ease: 'linear', repeat: Infinity },
      })
    }
  })

  useEffect(() => {
    fanStartedRef.current = false

    if (reduceMotion) {
      progress.set(1)
      setStoryPhase('live')
      setDisplayPct(100)
      return
    }

    const debug = readDebugProgress()
    if (debug != null) {
      progress.set(debug)
      setStoryPhase(storyFromProgress(debug))
      setDisplayPct(Math.round(debug * 100))
      if (debug >= 0.85) {
        fanStartedRef.current = true
        void fanControls.start({
          rotate: 360,
          transition: { duration: 2.8, ease: 'linear', repeat: Infinity },
        })
      }
      return
    }

    progress.set(0)
    const controls = animate(progress, 1, {
      duration: TOTAL_DURATION,
      ease: [0.22, 0.72, 0.2, 1],
    })

    return () => {
      controls.stop()
    }
  }, [reduceMotion, progress, fanControls])

  const live = storyPhase === 'live'
  const showProgress = !reduceMotion && !live
  const phaseLabel = labelForPhase(storyPhase, labels, statusLabel)

  return (
    <div className={styles.stage} role="img" aria-label={ariaLabel} data-phase={storyPhase}>
      <span className={styles.visuallyHidden}>{ariaLabel}</span>

      <div className={styles.progressBlock} aria-hidden>
        <motion.div
          className={styles.progressInner}
          initial={false}
          animate={{ opacity: showProgress ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 0.9, 0.2, 1] }}
        >
          <p className={styles.progressLabel}>
            {phaseLabel}
            <span> · {displayPct}&nbsp;%</span>
          </p>
          <div className={styles.progressTrack}>
            <motion.span className={styles.progressFill} style={{ scaleX: progress }} />
          </div>
        </motion.div>
      </div>

      <div className={styles.canvas}>
        <svg className={styles.stageSvg} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="caseTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a7070" />
              <stop offset="50%" stopColor={C.caseTop} />
              <stop offset="100%" stopColor="#1a3333" />
            </linearGradient>
            <linearGradient id="caseEastGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a4848" />
              <stop offset="100%" stopColor={C.caseSide} />
            </linearGradient>
            <linearGradient id="mbGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={C.mbDark} />
              <stop offset="100%" stopColor={C.mb} />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(230,245,245,0.38)" />
              <stop offset="40%" stopColor="rgba(15,124,124,0.1)" />
              <stop offset="100%" stopColor="rgba(26,58,58,0.26)" />
            </linearGradient>
            <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={C.accentLite} stopOpacity="0.6" />
              <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
            </radialGradient>
            <filter id="groundShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1a3a3a" floodOpacity="0.25" />
            </filter>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse
            cx={origin.x + 10}
            cy={origin.y + 92}
            rx={108}
            ry={20}
            fill={C.shadow}
            filter="url(#groundShadow)"
          />

          <motion.g style={{ opacity: leaderOpacity }}>
            <LeaderLines origin={origin} />
          </motion.g>

          <g transform={`translate(${origin.x}, ${origin.y})`}>
            <AssemblyPart progress={progress} explode={{ x: -22, y: 16 }} window={PART_WINDOWS.chassis}>
              <g>
                <polygon points={caseOuter.west} fill={C.caseDeep} stroke={C.caseEdge} strokeWidth="0.9" />
                <polygon points={caseOuter.north} fill="#163333" stroke={C.caseEdge} strokeWidth="0.9" />
                <polygon points={caseOuter.east} fill="url(#caseEastGrad)" stroke={C.caseEdge} strokeWidth="0.9" />
                <polygon points={caseOuter.top} fill="url(#caseTopGrad)" stroke={C.caseEdge} strokeWidth="0.9" />
                <polygon points={caseInner.east} fill="rgba(0,0,0,0.28)" />
                <polygon
                  points={poly(iso(4, 6, 8), iso(54, 6, 8), iso(54, 82, 8), iso(4, 82, 8))}
                  fill="rgba(8,18,18,0.55)"
                />
                {[0, 1, 2].map((i) => (
                  <polygon
                    key={i}
                    points={poly(
                      iso(52, 10 + i * 10, 118),
                      iso(56, 10 + i * 10, 118),
                      iso(56, 18 + i * 10, 118),
                      iso(52, 18 + i * 10, 118),
                    )}
                    fill="#0e2020"
                    stroke={C.accent}
                    strokeWidth="0.35"
                    opacity="0.7"
                  />
                ))}
                <FrontMesh />
                {[iso(8, 8, 0), iso(48, 8, 0), iso(8, 78, 0), iso(48, 78, 0)].map((p, i) => (
                  <ellipse key={i} cx={p.x} cy={p.y + 2} rx={4} ry={1.4} fill="#0a1515" opacity="0.55" />
                ))}
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: -10, y: 34 }} window={PART_WINDOWS.psu}>
              <g>
                <polygon points={psu.top} fill="#3a3d45" stroke="#111" strokeWidth="0.65" />
                <polygon points={psu.east} fill={C.psu} stroke="#111" strokeWidth="0.65" />
                <polygon points={psu.west} fill={C.psuDark} stroke="#111" strokeWidth="0.65" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <polygon
                    key={i}
                    points={poly(
                      iso(10 + i * 7, 76, 8),
                      iso(15 + i * 7, 76, 8),
                      iso(15 + i * 7, 76, 14),
                      iso(10 + i * 7, 76, 14),
                    )}
                    fill="#0d0e12"
                    stroke="#555"
                    strokeWidth="0.35"
                  />
                ))}
                <circle
                  cx={iso(42, 44, 17).x}
                  cy={iso(42, 44, 17).y}
                  r={4}
                  fill="#101014"
                  stroke={C.brass}
                  strokeWidth="0.8"
                />
                <text
                  x={iso(14, 20, 17).x}
                  y={iso(14, 20, 17).y}
                  fill={C.brass}
                  fontSize="4.5"
                  fontFamily="ui-monospace, Menlo, monospace"
                  opacity="0.85"
                >
                  650W
                </text>
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: -48, y: -6 }} window={PART_WINDOWS.mb}>
              <g>
                <polygon points={mb.east} fill="url(#mbGrad)" stroke={C.mbTrace} strokeWidth="0.75" />
                <polygon points={mb.top} fill={C.mb} stroke={C.mbTrace} strokeWidth="0.65" />
                <MotherboardArt />
                <motion.g style={{ opacity: mbDiagOpacity }} filter="url(#softGlow)">
                  <DiagnosticTraces />
                </motion.g>
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: -62, y: -42 }} window={PART_WINDOWS.cpu}>
              <g>
                <polygon points={cpu.top} fill={C.cpu} stroke={C.cpuShade} strokeWidth="0.65" />
                <polygon points={cpu.east} fill={C.cpuShade} stroke={C.cpuShade} strokeWidth="0.55" />
                <polygon points={cpu.west} fill="#b8b3aa" stroke={C.cpuShade} strokeWidth="0.55" />
                <polygon
                  points={poly(iso(13.5, 37, 96), iso(19.5, 37, 96), iso(19.5, 51, 96), iso(13.5, 51, 96))}
                  fill="#6d6960"
                />
                {[0, 1, 2, 3].map((r) =>
                  [0, 1, 2, 3].map((c) => {
                    const pt = iso(13 + c * 2.1, 36 + r * 4.2, 79)
                    return <circle key={`${r}-${c}`} cx={pt.x} cy={pt.y} r={0.5} fill="#5c574f" />
                  }),
                )}
                <text
                  x={iso(14, 40, 97).x}
                  y={iso(14, 40, 97).y}
                  fill="#3a3832"
                  fontSize="3.8"
                  fontFamily="ui-monospace, Menlo, monospace"
                  fontWeight="700"
                >
                  CPU
                </text>
                <motion.circle
                  cx={iso(16.5, 44, 88).x}
                  cy={iso(16.5, 44, 88).y}
                  r={14}
                  fill="url(#pulseGrad)"
                  style={{ opacity: cpuDiagOpacity }}
                />
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: -30, y: -70 }} window={PART_WINDOWS.cooler}>
              <g>
                <polygon points={cooler.top} fill={C.cooler} stroke={C.coolerDark} strokeWidth="0.7" />
                <polygon points={cooler.east} fill={C.coolerDark} stroke={C.coolerDark} strokeWidth="0.6" />
                <polygon points={cooler.west} fill="#556262" stroke={C.coolerDark} strokeWidth="0.6" />
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const a = iso(17, 33 + i * 3.5, 82)
                  const b = iso(36, 33 + i * 3.5, 100)
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#9aa8a8"
                      strokeWidth="0.55"
                      opacity="0.65"
                    />
                  )
                })}
                {[0, 1, 2].map((i) => {
                  const a = iso(18, 36 + i * 6, 86)
                  const b = iso(34, 36 + i * 6, 98)
                  return (
                    <line
                      key={`hp-${i}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={C.brass}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  )
                })}
                <g transform={`translate(${iso(27, 44, 104).x}, ${iso(27, 44, 104).y})`}>
                  <circle r={13} fill={C.fan} stroke={C.accent} strokeWidth="1.15" />
                  <motion.g
                    animate={reduceMotion ? undefined : fanControls}
                    style={{ transformOrigin: '0px 0px' }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <path
                        key={i}
                        d="M0 0 L2.6 -11.2 Q0 -12.6 -2.6 -11.2 Z"
                        fill={C.accentLite}
                        opacity="0.9"
                        transform={`rotate(${i * 60})`}
                      />
                    ))}
                  </motion.g>
                  <circle r={2.8} fill={C.brass} stroke={C.brassDark} strokeWidth="0.5" />
                </g>
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: 44, y: -28 }} window={PART_WINDOWS.ramA}>
              <g>
                <RamStick faces={ramA} slotY={58} />
                <motion.rect
                  x={iso(11, 58, 70).x - 2}
                  y={iso(11, 58, 70).y - 18}
                  width={8}
                  height={36}
                  rx={1}
                  fill={C.accentLite}
                  style={{ opacity: ramADiagOpacity }}
                  opacity={0.35}
                />
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: 54, y: -20 }} window={PART_WINDOWS.ramB}>
              <g>
                <RamStick faces={ramB} slotY={64} />
                <motion.rect
                  x={iso(11, 64, 70).x - 2}
                  y={iso(11, 64, 70).y - 18}
                  width={8}
                  height={36}
                  rx={1}
                  fill={C.accentLite}
                  style={{ opacity: ramBDiagOpacity }}
                  opacity={0.35}
                />
              </g>
            </AssemblyPart>

            <AssemblyPart progress={progress} explode={{ x: 26, y: 40 }} window={PART_WINDOWS.ssd}>
              <g>
                <polygon points={ssd.top} fill={C.ssd} stroke="#0a0a0c" strokeWidth="0.6" />
                <polygon points={ssd.east} fill="#1a1b20" stroke="#0a0a0c" strokeWidth="0.55" />
                <polygon points={ssd.west} fill="#3a3c44" stroke="#0a0a0c" strokeWidth="0.55" />
                <polygon
                  points={poly(iso(13, 20, 43), iso(15.5, 20, 43), iso(15.5, 44, 43), iso(13, 44, 43))}
                  fill="#50545e"
                />
                <line
                  x1={iso(13.8, 22, 44).x}
                  y1={iso(13.8, 22, 44).y}
                  x2={iso(13.8, 42, 44).x}
                  y2={iso(13.8, 42, 44).y}
                  stroke={C.accent}
                  strokeWidth="0.9"
                />
                <text
                  x={iso(13, 28, 44.5).x}
                  y={iso(13, 28, 44.5).y}
                  fill="#c8ccd4"
                  fontSize="3.6"
                  fontFamily="ui-monospace, Menlo, monospace"
                >
                  NVMe
                </text>
                <motion.circle
                  cx={iso(14.2, 40, 44).x}
                  cy={iso(14.2, 40, 44).y}
                  r={2.2}
                  fill={C.accentLite}
                  style={{ opacity: ssdDiagOpacity }}
                  filter="url(#softGlow)"
                />
              </g>
            </AssemblyPart>

            {/* Glass last so diagnostics underneath remain readable through the panel */}
            <AssemblyPart progress={progress} explode={{ x: 68, y: 10 }} window={PART_WINDOWS.panel}>
              <g>
                <polygon points={panel.east} fill="url(#glassGrad)" stroke={C.glassEdge} strokeWidth="1.1" />
                <polygon points={panel.top} fill="rgba(210,235,235,0.18)" stroke={C.glassEdge} strokeWidth="0.7" />
                <polygon points={panel.west} fill="rgba(26,58,58,0.18)" stroke={C.glassEdge} strokeWidth="0.6" />
                <polygon
                  points={poly(iso(60.2, 12, 18), iso(60.2, 78, 18), iso(60.2, 78, 122), iso(60.2, 12, 122))}
                  fill="rgba(255,255,255,0.06)"
                />
                {[iso(60, 8, 126), iso(60, 80, 126), iso(60, 8, 12), iso(60, 80, 12)].map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r={1.5} fill={C.brass} stroke={C.brassDark} strokeWidth="0.4" />
                ))}
              </g>
            </AssemblyPart>

            <g>
              <circle
                cx={iso(58, 14, 118).x}
                cy={iso(58, 14, 118).y}
                r={2.4}
                fill={C.ledOff}
              />
              <motion.circle
                cx={iso(58, 14, 118).x}
                cy={iso(58, 14, 118).y}
                r={2.4}
                fill={C.ledOn}
                style={{ opacity: reduceMotion ? 1 : ledOn }}
              />
              {!reduceMotion ? (
                <motion.circle
                  cx={iso(58, 14, 118).x}
                  cy={iso(58, 14, 118).y}
                  r={7}
                  fill="url(#pulseGrad)"
                  animate={
                    live
                      ? { opacity: [0.2, 0.65, 0.2] }
                      : { opacity: 0 }
                  }
                  transition={
                    live
                      ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                />
              ) : null}
              <circle
                cx={iso(58, 14, 108).x}
                cy={iso(58, 14, 108).y}
                r={3.6}
                fill="#243838"
                stroke={C.brass}
                strokeWidth="0.9"
              />
            </g>

            {!reduceMotion ? (
              <motion.rect
                y={-160}
                width={46}
                height={250}
                fill="url(#pulseGrad)"
                style={{ x: bootSweepX, opacity: bootSweepOpacity, mixBlendMode: 'screen' }}
              />
            ) : null}
          </g>
        </svg>
      </div>

      <div className={styles.badgeSlot}>
        <motion.div
          className={styles.status}
          initial={false}
          animate={{
            opacity: live ? 1 : 0,
            y: live ? 0 : 8,
          }}
          transition={{ duration: 0.45, ease: [0.22, 0.9, 0.2, 1] }}
          aria-hidden={!live}
        >
          <span className={styles.statusDot} />
          {statusLabel}
        </motion.div>
      </div>
    </div>
  )
}

function AssemblyPart({
  progress,
  explode,
  window: win,
  children,
}: {
  progress: MotionValue<number>
  explode: Pt
  window: readonly [number, number]
  children: ReactNode
}) {
  const x = useTransform(progress, [win[0], win[1]], [explode.x, 0], { clamp: true })
  const y = useTransform(progress, [win[0], win[1]], [explode.y, 0], { clamp: true })
  return <motion.g style={{ x, y }}>{children}</motion.g>
}

function DiagnosticTraces() {
  return (
    <g stroke={C.accentLite} fill="none" strokeLinecap="round">
      {[0, 1, 2, 3].map((i) => {
        const a = iso(8.6, 20 + i * 10, 28)
        const b = iso(8.6, 20 + i * 10, 100)
        return (
          <path
            key={i}
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            strokeWidth={1.15}
            opacity={0.85}
          />
        )
      })}
      <circle cx={iso(9, 40, 86).x} cy={iso(9, 40, 86).y} r={3.2} fill={C.accent} opacity={0.9} />
      <circle cx={iso(9, 28, 55).x} cy={iso(9, 28, 55).y} r={2.2} fill={C.accentLite} opacity={0.75} />
    </g>
  )
}

type BoxFaces = {
  top: string
  south: string
  east: string
  west: string
  north: string
}

function RamStick({
  faces,
  slotY,
}: {
  faces: BoxFaces
  slotY: number
}) {
  return (
    <g>
      <polygon points={faces.top} fill={C.ram} stroke="#081018" strokeWidth="0.55" />
      <polygon points={faces.east} fill="#122338" stroke="#081018" strokeWidth="0.5" />
      <polygon points={faces.west} fill="#243e5c" stroke="#081018" strokeWidth="0.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <polygon
          key={i}
          points={poly(
            iso(12, slotY + 0.5, 58 + i * 6.5),
            iso(14, slotY + 0.5, 58 + i * 6.5),
            iso(14, slotY + 2.1, 62 + i * 6.5),
            iso(12, slotY + 2.1, 62 + i * 6.5),
          )}
          fill={C.ramChip}
        />
      ))}
      <line
        x1={iso(11.2, slotY + 1.3, 56).x}
        y1={iso(11.2, slotY + 1.3, 56).y}
        x2={iso(11.2, slotY + 1.3, 100).x}
        y2={iso(11.2, slotY + 1.3, 100).y}
        stroke={C.brass}
        strokeWidth="1.15"
      />
    </g>
  )
}

function MotherboardArt() {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <polygon
          key={i}
          points={poly(
            iso(9.2, 56 + i * 5.2, 48),
            iso(9.2, 58.2 + i * 5.2, 48),
            iso(9.2, 58.2 + i * 5.2, 106),
            iso(9.2, 56 + i * 5.2, 106),
          )}
          fill="#0a241c"
          stroke={C.brass}
          strokeWidth="0.4"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = iso(8.4, 18 + i * 8, 24)
        const b = iso(8.4, 18 + i * 8, 112)
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={C.mbTrace}
            strokeWidth="0.5"
            opacity="0.55"
          />
        )
      })}
      <polygon
        points={poly(iso(9, 32, 76), iso(9, 56, 76), iso(9, 56, 98), iso(9, 32, 98))}
        fill="none"
        stroke={C.brass}
        strokeWidth="0.85"
        strokeDasharray="2.2 1.4"
      />
      <polygon
        points={poly(iso(8.5, 20, 22), iso(10.5, 20, 22), iso(10.5, 30, 22), iso(8.5, 30, 22))}
        fill="#071a14"
        stroke={C.mbTrace}
        strokeWidth="0.4"
      />
      <circle cx={iso(9, 22, 108).x} cy={iso(9, 22, 108).y} r={2.6} fill="#d9d0be" stroke="#8a8070" strokeWidth="0.45" />
      <polygon
        points={poly(iso(8.2, 14, 110), iso(10.8, 14, 110), iso(10.8, 14, 118), iso(8.2, 14, 118))}
        fill="#c4a35a"
        opacity="0.75"
      />
    </g>
  )
}

function FrontMesh() {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <polygon
          key={i}
          points={poly(
            iso(57.2, 22 + i * 7, 28),
            iso(57.2, 27 + i * 7, 28),
            iso(57.2, 27 + i * 7, 33),
            iso(57.2, 22 + i * 7, 33),
          )}
          fill="#0a1818"
          opacity="0.8"
        />
      ))}
      <polygon
        points={poly(iso(57.4, 10, 120), iso(57.4, 24, 120), iso(57.4, 24, 134), iso(57.4, 10, 134))}
        fill="#101f1f"
        stroke={C.accent}
        strokeWidth="0.55"
      />
    </g>
  )
}

function LeaderLines({ origin }: { origin: Pt }) {
  const anchors = [
    { label: 'MB', from: iso(-52, -18, 70), to: iso(9, 30, 60) },
    { label: 'CPU', from: iso(-78, -55, 95), to: iso(16, 40, 90) },
    { label: 'RAM', from: iso(78, -35, 80), to: iso(14, 62, 80) },
    { label: 'SSD', from: iso(48, 48, 40), to: iso(14, 28, 40) },
  ]
  return (
    <g transform={`translate(${origin.x}, ${origin.y})`}>
      {anchors.map((a) => (
        <g key={a.label}>
          <path
            d={`M ${a.from.x} ${a.from.y} L ${a.to.x} ${a.to.y}`}
            stroke={C.line}
            strokeWidth="0.95"
            strokeDasharray="3.2 2.2"
            fill="none"
          />
          <circle cx={a.to.x} cy={a.to.y} r={1.7} fill={C.accent} />
          <rect
            x={a.from.x - 10}
            y={a.from.y - 10}
            width={20}
            height={9}
            rx={2}
            fill="rgba(250,247,240,0.92)"
            stroke={C.accent}
            strokeWidth="0.5"
          />
          <text
            x={a.from.x}
            y={a.from.y - 3.5}
            textAnchor="middle"
            fill={C.accent}
            fontSize="5.5"
            fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            {a.label}
          </text>
        </g>
      ))}
    </g>
  )
}

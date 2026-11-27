import styles from './IjipopWorkLoader.module.css'

export type IjipopWorkLoaderProps = {
  /** Libellé sous le moniteur (déjà localisé). */
  label: string
  className?: string
  /** data-testid racine — défaut pv2-ijipop-work-loader */
  testId?: string
}

/**
 * Petite signature visuelle IJIPOP : moniteur SVG,
 * </> → pulse turquoise → coche laiton (cycle ~2.4s).
 * Aucune dépendance ; respecte prefers-reduced-motion via CSS.
 */
export default function IjipopWorkLoader({
  label,
  className,
  testId = 'pv2-ijipop-work-loader',
}: IjipopWorkLoaderProps) {
  const rootClass = [styles.stage, className].filter(Boolean).join(' ')

  return (
    <div className={rootClass} role="status" aria-busy="true" aria-live="polite" data-testid={testId}>
      <svg
        className={styles.monitor}
        viewBox="0 0 120 96"
        width="152"
        height="122"
        aria-hidden="true"
        focusable="false"
      >
        {/* Bezel + écran */}
        <rect className={styles.bezel} x="14" y="8" width="92" height="62" rx="6" />
        <rect className={styles.screen} x="20" y="14" width="80" height="48" rx="3" />

        {/* Tracés électroniques discrets */}
        <path
          className={styles.trace}
          d="M28 28 H42 V38 H54 M66 28 H78 V42 H88 M28 48 H40 V54 H52 M68 50 H88"
        />
        <path
          className={styles.tracePulse}
          d="M28 28 H42 V38 H54 M66 28 H78 V42 H88 M28 48 H40 V54 H52 M68 50 H88"
        />

        {/* Phase code */}
        <text className={styles.code} x="60" y="42" textAnchor="middle" dominantBaseline="middle">
          {'</>'}
        </text>

        {/* Phase coche */}
        <path className={styles.check} d="M46 40 L55 49 L76 30" />

        {/* Pied */}
        <rect className={styles.stand} x="54" y="70" width="12" height="10" rx="1.5" />
        <rect className={styles.base} x="38" y="80" width="44" height="6" rx="3" />
      </svg>

      <p className={styles.label}>{label}</p>
    </div>
  )
}

import styles from './BlueprintBars.module.css'

export type BlueprintBarsKind = 'title' | 'text' | 'card' | 'ticks'

type BlueprintBarsProps = {
  kind: BlueprintBarsKind
  /** Petite étiquette technique (ex. TYPE) — uniquement ticks/title */
  mark?: string
  className?: string
}

/**
 * Chrome blueprint ancré au slot parent (position:relative + --build).
 * aria-hidden — n’affecte pas le layout du contenu réel (absolute).
 */
export default function BlueprintBars({ kind, mark, className }: BlueprintBarsProps) {
  const rootClass = [styles.root, styles[kind], className].filter(Boolean).join(' ')

  if (kind === 'ticks') {
    return (
      <span className={rootClass} data-blueprint aria-hidden>
        {mark ? <span className={styles.mark}>{mark}</span> : null}
        <span className={`${styles.tick} ${styles.tickTLH}`} />
        <span className={`${styles.tick} ${styles.tickTLV}`} />
        <span className={`${styles.tick} ${styles.tickTRH}`} />
        <span className={`${styles.tick} ${styles.tickTRV}`} />
        <span className={`${styles.tick} ${styles.tickBLH}`} />
        <span className={`${styles.tick} ${styles.tickBLV}`} />
      </span>
    )
  }

  if (kind === 'card') {
    return (
      <span className={rootClass} data-blueprint aria-hidden>
        <span className={styles.cardFrame} />
        <span className={`${styles.bar} ${styles.barWide}`} />
        <span className={`${styles.bar} ${styles.barMid}`} />
        <span className={`${styles.bar} ${styles.barShort}`} />
        <span className={`${styles.bar} ${styles.barNarrow}`} />
      </span>
    )
  }

  if (kind === 'title') {
    return (
      <span className={rootClass} data-blueprint aria-hidden>
        {mark ? <span className={styles.mark}>{mark}</span> : null}
        <span className={`${styles.bar} ${styles.barWide}`} />
        <span className={`${styles.bar} ${styles.barMid}`} />
        <span className={`${styles.bar} ${styles.barShort}`} />
      </span>
    )
  }

  /* text */
  return (
    <span className={rootClass} data-blueprint aria-hidden>
      <span className={`${styles.bar} ${styles.barWide}`} />
      <span className={`${styles.bar} ${styles.barMid}`} />
      <span className={`${styles.bar} ${styles.barNarrow}`} />
      <span className={`${styles.bar} ${styles.barEnd}`} />
    </span>
  )
}

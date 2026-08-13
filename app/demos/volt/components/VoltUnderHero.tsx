import { UNDER_STRIPS } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

/** Bandeaux photo/texte qui glissent sous le hero sticky. */
export default function VoltUnderHero() {
  return (
    <div id="volt-under" className={styles.slideUnder} aria-label="Éditorial sous le hero">
      {UNDER_STRIPS.map((strip) => (
        <article
          key={strip.id}
          className={`${styles.underStrip} ${
            strip.tone === 'a'
              ? styles.underTone_a
              : strip.tone === 'b'
                ? styles.underTone_b
                : styles.underTone_c
          }`}
        >
          <div className={styles.underPhoto} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={strip.src} alt="" className={styles.underImg} loading="lazy" decoding="async" />
          </div>
          <div className={styles.underCopy}>
            <p className={styles.underLabel}>{strip.label}</p>
            <p className={styles.underCaption}>{strip.caption}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

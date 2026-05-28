import { INFO } from '../galerieDemoContent'
import styles from '../GalerieDemo.module.css'

export default function GalerieDemoInfo() {
  return (
    <section id="info" className={styles.info} aria-labelledby="info-heading">
      <h2 id="info-heading">{INFO.title}</h2>
      <p>{INFO.body}</p>
      <p className={styles.infoNote}>{INFO.note}</p>
      <a className={styles.infoLink} href={INFO.contactMailto}>
        {INFO.contactLabel}
      </a>
    </section>
  )
}

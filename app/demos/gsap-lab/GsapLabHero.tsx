'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import styles from './GsapLab.module.css'

/**
 * Hero cascade + halo — lab GSAP. Animations désactivées si prefers-reduced-motion.
 * useGSAP enveloppe gsap.context : revert au démontage (tweens + cibles).
 */
export default function GsapLabHero() {
  const rootRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  useGSAP(
    () => {
      const root = rootRef.current
      const glow = glowRef.current
      if (!root) return

      const q = gsap.utils.selector(root)

      if (prefersReducedMotion) {
        gsap.set([q('[data-gsap-lab="kicker"]'), q('[data-gsap-lab="title"]'), q('[data-gsap-lab="lead"]')], {
          opacity: 1,
          y: 0,
        })
        gsap.set(q('[data-gsap-lab="actions"]'), { opacity: 1, y: 0 })
        gsap.set(q('[data-gsap-lab="card"]'), { opacity: 1, y: 0, scale: 1 })
        if (glow) gsap.set(glow, { opacity: 0.35, scale: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(q('[data-gsap-lab="kicker"]'), { y: 16, opacity: 0, duration: 0.5 })
        .from(q('[data-gsap-lab="title"]'), { y: 36, opacity: 0, duration: 0.75 }, '-=0.2')
        .from(q('[data-gsap-lab="lead"]'), { y: 22, opacity: 0, duration: 0.55 }, '-=0.4')
        .from(q('[data-gsap-lab="actions"]'), { y: 14, opacity: 0, duration: 0.45 }, '-=0.3')
        .from(q('[data-gsap-lab="card"]'), { y: 20, opacity: 0, scale: 0.97, duration: 0.5, stagger: 0.1 }, '-=0.25')

      if (glow) {
        gsap.fromTo(
          glow,
          { scale: 1, opacity: 0.45 },
          {
            scale: 1.1,
            opacity: 0.7,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        )
      }
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="gsap-lab-hero-title">
      <div ref={glowRef} className={styles.heroGlow} aria-hidden />
      <div className={styles.heroInner}>
        <p data-gsap-lab="kicker" className={styles.kicker}>
          Lab technique
        </p>
        <h1 id="gsap-lab-hero-title" data-gsap-lab="title" className={styles.title}>
          GSAP + @gsap/react — entrée en cascade
        </h1>
        <p data-gsap-lab="lead" className={styles.lead}>
          Page expérimentale sous /demos : timelines courtes, halo discret, tout est annulé au démontage du
          composant (contexte GSAP).
        </p>
        <div data-gsap-lab="actions" className={styles.actions}>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>Bouton factice</span>
          <span className={styles.btn}>Second CTA</span>
        </div>
        <div className={styles.heroCards}>
          <div data-gsap-lab="card" className={styles.card}>
            <h3>Carte A</h3>
            <p>Exemple de stagger dans le hero.</p>
          </div>
          <div data-gsap-lab="card" className={styles.card}>
            <h3>Carte B</h3>
            <p>Même groupe data-gsap-lab pour le stagger.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

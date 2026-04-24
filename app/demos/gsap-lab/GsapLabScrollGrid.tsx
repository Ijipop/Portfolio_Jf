'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import styles from './GsapLab.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal au scroll avec ScrollTrigger. Si reduced motion : pas de trigger, état final immédiat.
 * useGSAP revert tue les ScrollTriggers créés dans le callback à l’unmount.
 */
export default function GsapLabScrollGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const q = gsap.utils.selector(section)
      const cards = q('[data-gsap-lab="grid-card"]')

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 })
        return
      }

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <section ref={sectionRef} className={styles.scrollSection} aria-labelledby="gsap-lab-grid-title">
      <p className={styles.sectionTitle} id="gsap-lab-grid-title">
        Grille — ScrollTrigger (once)
      </p>
      <p className={styles.sectionLead}>
        Faites défiler pour déclencher l’apparition. Avec prefers-reduced-motion, les cartes sont visibles sans
        animation.
      </p>
      <div className={styles.spacer} aria-hidden>
        Espace pour le scroll
      </div>
      <div className={styles.cards}>
        <div data-gsap-lab="grid-card" className={styles.card}>
          <h3>Projet 1</h3>
          <p>Carte de démonstration.</p>
        </div>
        <div data-gsap-lab="grid-card" className={styles.card}>
          <h3>Projet 2</h3>
          <p>ScrollTrigger une seule fois.</p>
        </div>
        <div data-gsap-lab="grid-card" className={styles.card}>
          <h3>Projet 3</h3>
          <p>Cleanup via contexte @gsap/react.</p>
        </div>
      </div>
    </section>
  )
}

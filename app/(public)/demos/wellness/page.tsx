import Link from 'next/link'
import { DEMOS_HUB_LINK_LABEL } from '../demoLabels'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './WellnessDemo.module.css'

export default function WellnessDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <div className={styles.flourish} aria-hidden>
            ✦
          </div>
          <p className={styles.kicker}>Spa · soins · ressourcement</p>
          <h1 className={styles.title}>L’Atelier des Marées</h1>
          <p className={styles.lead}>
            Un espace lumineux, des soins au rythme lent et des praticiennes à l’écoute — pour souffler et retrouver un
            juste équilibre.
          </p>
          <div className={styles.heroCtas}>
            <a className={styles.cta} href="#offres">
              Réserver un soin
            </a>
            <Link className={styles.secondary} href="/demos">
              {DEMOS_HUB_LINK_LABEL}
            </Link>
          </div>
        </header>

        <section className={styles.metaBand} aria-label="Informations pratiques">
          <div className={styles.metaCol}>
            <h2 className={styles.metaHeading}>Quartier</h2>
            <p className={styles.metaText}>Ahuntsic · Montréal — accès facile en métro (exemple)</p>
          </div>
          <div className={styles.metaCol}>
            <h2 className={styles.metaHeading}>Horaires</h2>
            <p className={styles.metaText}>
              Mar–Ven · 9 h – 20 h
              <br />
              Sam · 9 h – 17 h
              <br />
              Dim · fermé
            </p>
          </div>
        </section>
        <p className={styles.trustLine}>Équipe formée en massothérapie et soins du corps — approche douce et encadrée (vitrine fictive).</p>

        <section id="offres" className={styles.cards} aria-label="Offres">
          <article className={styles.card}>
            <div className={styles.cardIcon} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/wellness/ritual-01.jpg" alt="" loading="lazy" decoding="async" />
            </div>
            <h3>Rituel 90 minutes</h3>
            <p>Gommage doux, enveloppement algues, massage aux pierres tièdes.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.cardIcon} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/wellness/ritual-02.jpg" alt="" loading="lazy" decoding="async" />
            </div>
            <h3>Forfait semaine zen</h3>
            <p>Trois séances guidées, accès espace détente, tisane personnalisée.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.cardIcon} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/wellness/ritual-03.jpg" alt="" loading="lazy" decoding="async" />
            </div>
            <h3>Coaching respiration</h3>
            <p>Ateliers petits groupes, fiche d’exercices à ramener chez soi.</p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <blockquote>« Une parenthèse hors du temps. L’équipe est incroyablement attentionnée. »</blockquote>
          <footer>— Camille R., Ahuntsic</footer>
        </section>

        <section className={styles.testimonial} aria-label="Second avis">
          <blockquote>
            « Accueil chaleureux, soins expliqués avec douceur — les praticiennes ont une formation reconnue et ça se sent. »
          </blockquote>
          <footer>— Mélissa D., Montréal-Nord (exemple)</footer>
        </section>

        <section className={styles.ctaBand}>
          <h2>Réserver votre moment</h2>
          <p>
            Écrivez-nous pour choisir votre soin et votre créneau — réponse sous 24 h les jours ouvrables.
          </p>
          <a className={styles.cta} href="mailto:soins@atelier-marees.demo?subject=R%C3%A9servation">
            Nous écrire
          </a>
        </section>

        <DemoSocialIconsDecorative />
        <DemoVitrineAttribution />

        <footer className={styles.footer}>
          <span>© 2026 L’Atelier des Marées</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}

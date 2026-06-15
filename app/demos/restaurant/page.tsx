import Link from 'next/link'
import { DEMOS_HUB_LINK_LABEL } from '../demoLabels'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import RestaurantDemoGallery from './RestaurantDemoGallery'
import styles from './RestaurantDemo.module.css'

export default function RestaurantDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={`${styles.hero} ${styles.sans}`}>
          <div className={styles.ornament} aria-hidden />
          <p className={styles.kicker}>Table · saison · Québec</p>
          <h1 className={styles.title}>La Maison Orée</h1>
          <p className={styles.sub}>
            Cuisine du marché, carte du soir renouvelée et accords attentifs — paroles du chef au centre de l’assiette.
          </p>
          <div className={styles.ctaRow}>
            <a className={`${styles.btn} ${styles.btnFill}`} href="tel:+15145550123">
              Réserver une table
            </a>
            <Link className={`${styles.btn} ${styles.btnOutline}`} href="/demos">
              {DEMOS_HUB_LINK_LABEL}
            </Link>
          </div>
        </header>

        <section className={styles.menuBand}>
          <h2 className={styles.menuTitle}>Menu du soir</h2>
          <div className={styles.menuGrid}>
            <div>
              <div className={styles.menuItem}>
                <span>Tartare de saumon, agrumes</span>
                <span>18</span>
              </div>
              <div className={styles.menuItem}>
                <span>Risotto aux champignons sauvages</span>
                <span>24</span>
              </div>
              <div className={styles.menuItem}>
                <span>Magret de canard, jus réduit</span>
                <span>32</span>
              </div>
            </div>
            <div>
              <div className={styles.menuItem}>
                <span>Sélection de fromages du terroir</span>
                <span>16</span>
              </div>
              <div className={styles.menuItem}>
                <span>Bûche glacée noisette (part)</span>
                <span>12</span>
              </div>
              <div className={styles.menuItem}>
                <span>Accord mets & mocktails</span>
                <span>22</span>
              </div>
            </div>
          </div>
        </section>

        <RestaurantDemoGallery />

        <section className={styles.storyBand} aria-labelledby="story-heading">
          <h2 id="story-heading" className={styles.storyTitle}>
            La maison & le chef
          </h2>
          <p className={styles.storyText}>
            Petite salle au cœur du Plateau : tables serrées, cuisines ouvertes sur la salle — on y prépare le marché du
            jour et on raconte la provenance. Le chef Antoine Paré signe une carte courte, renouvelée au fil des saisons
            québécoises.
          </p>
          <p className={styles.storySign}>— Antoine Paré, chef-propriétaire (exemple)</p>
        </section>

        <section className={styles.locationBand} aria-labelledby="loc-heading">
          <h2 id="loc-heading" className={styles.storyTitle}>
            Nous trouver
          </h2>
          <p className={styles.storyText}>
            <strong className={styles.address}>482 rue des Érables</strong>
            <br />
            Plateau Mont-Royal · Montréal (Québec) · H2J 1P4
          </p>
          <p className={styles.socialLine}>
            Instagram <span className={styles.fakeHandle}>@lamaisonoree</span> · réservations par téléphone ou courriel
            (vitrine fictive)
          </p>
        </section>

        <section className={styles.hours}>
          <h2>Horaires</h2>
          <p>Mar–Sam · 17h30 – 22h · Fermé dimanche et lundi</p>
        </section>

        <DemoSocialIconsDecorative />
        <DemoVitrineAttribution />

        <footer className={styles.footer}>
          <span>© 2026 La Maison Orée</span>
          <span>
            <a href="mailto:reservations@lamaisonoree.demo?subject=R%C3%A9servation">
              Réserver par courriel
            </a>
            {' · '}
            <Link href="/demos">Plus d’exemples</Link>
          </span>
        </footer>
      </div>
    </div>
  )
}

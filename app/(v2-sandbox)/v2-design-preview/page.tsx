import type { Metadata } from 'next'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PublicFooter, PublicHeader } from '@/components/public-v2/chrome'
import { Badge, Button, Container, Heading, Section } from '@/components/public-v2/primitives'
import { PUBLIC_V2_PREVIEW_PATH } from '@/lib/public-v2/nav'
import styles from './preview.module.css'

export const metadata: Metadata = {
  title: 'Design system preview (V2)',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const PALETTE = [
  { token: '--color-bg', label: 'bg' },
  { token: '--color-ink', label: 'ink' },
  { token: '--color-accent', label: 'accent' },
  { token: '--color-emphasis', label: 'emphasis' },
  { token: '--color-surface', label: 'surface' },
] as const

/**
 * Temporary isolated sandbox for Pop Atelier foundations + chrome V2.
 * Not linked in nav/sitemap — development only.
 */
export default function V2DesignPreviewPage() {
  const pathname = PUBLIC_V2_PREVIEW_PATH

  return (
    <PublicThemeRoot>
      <a className="pv2-skip" href="#pv2-preview-main">
        Aller au contenu
      </a>
      <PublicHeader pathname={pathname} />
      <main id="pv2-preview-main">
        <Section variant="default">
          <Container variant="content">
            <p className={styles.eyebrow}>Laboratoire · temporaire · noindex</p>
            <Heading as="h1" variant="display">
              Pop Atelier — fondations
            </Heading>
            <p className={styles.lede}>
              Page de développement du design system public V2. Aucune logique métier. Les autres
              routes du site restent inchangées.
            </p>
          </Container>
        </Section>

        <Section id="pv2-services" variant="wash" aria-labelledby="pv2-services-title">
          <Container>
            <Heading as="h2" id="pv2-services-title" variant="section">
              Services
            </Heading>
            <p className={styles.lede}>
              Ancre locale pour la navigation sandbox (`#pv2-services`). Les offres définitives
              seront présentées sur l’accueil V2.
            </p>
          </Container>
        </Section>

        <Section variant="default" aria-labelledby="pv2-palette">
          <Container>
            <Heading as="h2" id="pv2-palette" variant="section">
              Palette
            </Heading>
            <p className={styles.lede}>Tokens sémantiques — modifier `tokens.css`, pas les composants.</p>
            <ul className={styles.swatches}>
              {PALETTE.map((p) => (
                <li key={p.token} className={styles.swatch}>
                  <span
                    className={styles.swatchChip}
                    style={{ background: `var(${p.token})` }}
                    aria-hidden
                  />
                  <span className={styles.swatchMeta}>
                    <strong>{p.label}</strong>
                    <code>{p.token}</code>
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section aria-labelledby="pv2-type">
          <Container>
            <Heading as="h2" id="pv2-type" variant="section">
              Typographie
            </Heading>
            <div className={styles.typeStack}>
              <Heading as="h3" variant="display">
                Display — Fraunces
              </Heading>
              <Heading as="h3" variant="section">
                Section — Fraunces
              </Heading>
              <Heading as="h3" variant="card">
                Card — Fraunces
              </Heading>
              <p className={styles.bodySample}>
                Corps Outfit : sites clairs, logiciels et soutien informatique — pensés pour des PME
                québécoises. Les titres et le corps restent indépendants via tokens.
              </p>
            </div>
          </Container>
        </Section>

        <Section variant="wash" aria-labelledby="pv2-buttons">
          <Container>
            <Heading as="h2" id="pv2-buttons" variant="section">
              Boutons
            </Heading>
            <div className={styles.row}>
              <Button variant="primary">Primary md</Button>
              <Button variant="ghost">Ghost md</Button>
              <Button variant="emphasis">Emphasis md</Button>
            </div>
            <div className={styles.row}>
              <Button variant="primary" size="sm">
                Primary sm
              </Button>
              <Button variant="ghost" size="sm">
                Ghost sm
              </Button>
              <Button variant="emphasis" size="sm" disabled>
                Disabled
              </Button>
            </div>
            <div className={styles.row}>
              <Button href="#pv2-badges" variant="primary">
                Lien interne
              </Button>
              <Button href="#pv2-focus" variant="ghost" size="sm">
                Focus →
              </Button>
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="pv2-badges">
          <Container>
            <Heading as="h2" id="pv2-badges" variant="section">
              Badges
            </Heading>
            <div className={styles.row}>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="personal">Personal</Badge>
            </div>
          </Container>
        </Section>

        <Section variant="wash" aria-labelledby="pv2-layout">
          <Container variant="content">
            <Heading as="h2" id="pv2-layout" variant="section">
              Container content
            </Heading>
            <p className={styles.lede}>Largeur `--width-content` avec gutters tokenisés.</p>
          </Container>
          <Container variant="wide" className={styles.wideDemo}>
            <Heading as="h3" variant="card">
              Container wide
            </Heading>
            <p className={styles.lede}>Largeur `--width-wide` pour bandes plus amples.</p>
          </Container>
        </Section>

        <Section variant="ink" aria-labelledby="pv2-ink">
          <Container>
            <Heading as="h2" id="pv2-ink" variant="section">
              Section ink
            </Heading>
            <p className={styles.ledeOnInk}>
              Variante sombre — texte `--color-on-ink` pour le contraste. Bouton emphasis pour CTA.
            </p>
            <div className={styles.row}>
              <Button variant="emphasis">CTA sur fond ink</Button>
              <Button variant="ghost" className={styles.ghostOnInk}>
                Secondaire
              </Button>
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="pv2-combo">
          <Container>
            <Heading as="h2" id="pv2-combo" variant="section">
              Composition
            </Heading>
            <article className={`${styles.card} pv2-interactive`}>
              <div className={styles.row}>
                <Badge variant="accent">Projet client</Badge>
                <Badge variant="success">Mandat terminé</Badge>
              </div>
              <Heading as="h3" variant="card">
                Carte exemple
              </Heading>
              <p className={styles.lede}>
                Surface + badges + heading card + bouton — sans logique métier.
              </p>
              <Button variant="primary" size="sm">
                Action
              </Button>
            </article>
          </Container>
        </Section>

        <Section variant="wash" aria-labelledby="pv2-focus">
          <Container>
            <Heading as="h2" id="pv2-focus" variant="section">
              Focus clavier
            </Heading>
            <p className={styles.lede}>
              Tabulez les contrôles ci-dessous — anneau `--focus-ring` (accent sur fond crème).
            </p>
            <div className={styles.row}>
              <Button variant="primary">Focus 1</Button>
              <Button variant="ghost">Focus 2</Button>
              <Button href="#pv2-palette" variant="emphasis" size="sm">
                Focus lien
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <PublicFooter pathname={pathname} />
    </PublicThemeRoot>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import PublicThemeRoot from '@/components/public-v2/theme/PublicThemeRoot'
import { PopAtelierHomeShell } from '@/components/public-v2/home'
import { ProjectsCatalog } from '@/components/public-v2/projects'
import ContactSandboxPreview from '@/components/public-v2/contact/ContactSandboxPreview'
import { AboutPageClient } from '@/components/public-v2/about'
import { Badge, Button, Container, Heading, Section } from '@/components/public-v2/primitives'
import { PUBLIC_V2_PREVIEW_PATH } from '@/lib/public-v2/nav'
import { PROJECTS_COPY } from '@/lib/public-v2/projectsContent'
import { PROJECTS_FIXTURES, TIMELENDR_FIXTURES } from '@/lib/public-v2/projectsFixtures'
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
 * Sandbox design system — même shell d’accueil que `/`, puis outils fondations
 * après le Footer (hors shell) pour conserver Contact → Footer.
 */
export default function V2DesignPreviewPage() {
  return (
    <>
      <PopAtelierHomeShell pathname={PUBLIC_V2_PREVIEW_PATH} />

      <PublicThemeRoot>
        <div id="pv2-foundations-lab" data-testid="pv2-foundations-lab">
          <Section variant="default" aria-labelledby="pv2-lab-foundations">
            <Container variant="content">
              <p className={styles.eyebrow}>Outils de développement · temporaire · noindex</p>
              <Heading as="h2" id="pv2-lab-foundations" variant="display">
                Pop Atelier — fondations
              </Heading>
              <p className={styles.lede}>
                Page de développement du design system public V2. Aucune logique métier. Les autres
                routes du site restent inchangées.
              </p>
              <p className={styles.lede}>
                <Button href="#pv2-projects-fixtures-preview" variant="ghost" size="sm">
                  Aller au catalogue fixtures
                </Button>
                <Button href="#pv2-contact-fixtures-preview" variant="ghost" size="sm">
                  Aller au Contact mock
                </Button>
                <Button href="#pv2-about-preview" variant="ghost" size="sm">
                  Aller à À propos
                </Button>
              </p>
            </Container>
          </Section>

          <Section variant="default" aria-labelledby="pv2-palette">
            <Container>
              <Heading as="h2" id="pv2-palette" variant="section">
                Palette
              </Heading>
              <p className={styles.lede}>
                Tokens sémantiques — modifier `tokens.css`, pas les composants.
              </p>
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
                  Corps Outfit : sites clairs, logiciels et soutien informatique — pensés pour des
                  PME québécoises. Les titres et le corps restent indépendants via tokens.
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

          <Section aria-labelledby="pv2-projects-fixture-title">
            <Container>
              <p className={styles.eyebrow}>Aperçu développement · fixtures · noindex</p>
              <Heading as="h2" id="pv2-projects-fixture-title" variant="section">
                Catalogue Réalisations (fixtures)
              </Heading>
              <p className={styles.lede}>
                Données synthétiques uniquement — la route publique `/portfolio/projets` continue
                d’appeler `GET /api/projects`. Sous DB inerte, l’API réelle n’est pas validée ici.
              </p>
            </Container>
            <div id="pv2-projects-fixtures-preview" data-testid="pv2-projects-fixtures-preview">
              <Suspense fallback={<p aria-busy="true">{PROJECTS_COPY.loading}</p>}>
                <ProjectsCatalog
                  initialProjects={PROJECTS_FIXTURES}
                  initialTimelendr={TIMELENDR_FIXTURES}
                />
              </Suspense>
            </div>
          </Section>

          <Section aria-labelledby="pv2-contact-fixture-title">
            <Container>
              <p className={styles.eyebrow}>Aperçu développement · mock contact · noindex</p>
              <Heading as="h2" id="pv2-contact-fixture-title" variant="section">
                Contact (simulation)
              </Heading>
              <p className={styles.lede}>
                Soumission mockée uniquement — aucun Resend, OpenAI ni analytics. La route publique{' '}
                <code>/portfolio/contact</code> conserve l’API réelle.
              </p>
            </Container>
            <div id="pv2-contact-fixtures-preview" data-testid="pv2-contact-fixtures-preview">
              <ContactSandboxPreview />
            </div>
          </Section>

          <Section aria-labelledby="pv2-about-preview-title">
            <Container>
              <p className={styles.eyebrow}>Aperçu développement · À propos · noindex</p>
              <Heading as="h2" id="pv2-about-preview-title" variant="section">
                À propos (aperçu)
              </Heading>
              <p className={styles.lede}>
                Contenu éditorial Pop Atelier — même composant que la route publique{' '}
                <code>/portfolio/a-propos</code> (aucun Prisma).
              </p>
            </Container>
            <div id="pv2-about-preview" data-testid="pv2-about-preview">
              <AboutPageClient />
            </div>
          </Section>
        </div>
      </PublicThemeRoot>
    </>
  )
}

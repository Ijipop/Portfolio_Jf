# Sections Pop Atelier V2 — référence (hors Hero)

État approuvé des sections Services, Réalisations et Laboratoire sur `/v2-design-preview`.

Hero figé : voir [HERO-REFERENCE.md](./HERO-REFERENCE.md) et le tag local `hero-v2-reference`.

| Champ | Valeur |
|-------|--------|
| Branche | `feat/ijipop-v2` |
| Commit Laboratoire | *renseigné après le commit — ne pas inventer ici* |
| Sandbox | `npm run dev:v2-sandbox` → `http://localhost:3000/v2-design-preview` |

---

## Ordre d’accueil V2

Header → Hero → Services → Réalisations → Laboratoire → (À propos / Contact en Phase 5D) → Footer

---

## Services

| Élément | Détail |
|---------|--------|
| Composants | `sections/Services/ServicesSection.tsx`, `ServiceCard.tsx` + CSS Modules |
| Contenu | `lib/public-v2/servicesContent.ts` |
| Ancre | `id="pv2-services"` |
| Titre | « Ce que je fais » (eyebrow Services) — **pas** de lead marketing |
| Cartes | Création de sites web · Soutien informatique · Développement de logiciels |
| Liens | `/creation-site-web-montreal`, `/soutien-informatique-montreal`, `/logiciel` |
| Layout desktop | Grid ≥880px, `align-items: stretch`, CTA `margin-top: auto` |
| Interactions | Hover léger + blob décoratif ; `prefers-reduced-motion` |

---

## Réalisations

| Élément | Détail |
|---------|--------|
| Composants | `sections/Work/WorkSection.tsx`, `WorkFeature.tsx` |
| Contenu | `lib/public-v2/workContent.ts` (sélection éditoriale, pas un 2e catalogue) |
| Features | Expression (primary) · Thermo (secondary) · DeskDot (soft / Windows) |
| Catalogue | Lien `/portfolio/projets` |
| Médias clients | `public/img/v2-sandbox/` — locaux, gitignorés, non publiables sans autorisation |

---

## Laboratoire

| Élément | Détail |
|---------|--------|
| Composants | `sections/Laboratory/LaboratorySection.tsx`, `LaboratoryCard.tsx` |
| Contenu | `lib/public-v2/laboratoryContent.ts` |
| Ancre | `id="pv2-laboratory"` |
| Titre | « Assez parlé. Essayez! » |
| Featured | restaurant · construction · wellness (ordre Concept D) |
| Catalogue | `lib/content/demos-catalog.ts` (9 démos) ; hub `/demos` |
| CTA carte | « Explorer la démo » → routes `/demos/...` |
| Pied | « Voir toutes les démos » → `/demos` |
| Interactions | Zoom image léger, flèche décorative (`aria-hidden`) hover/focus, soulèvement carte ; **pas** de faux barre/pilule |
| Layout | Grid 3 cols ≥800px, hauteurs égales, CTA bas ; hauteur naturelle mobile |
| Fond | Wash violet pastel (tokens accent/bg) |

### Catalogue partagé (9)

`construction`, `restaurant`, `tech`, `wellness`, `studio`, `spectacle`, `portfolio`, `galerie`, `volt` — hrefs `/demos/{id}`, `thumbToken` mappé aux classes CSS du hub.

---

## Tokens principaux

`--color-bg`, `--color-ink`, `--color-accent`, `--color-emphasis`, `--color-surface`, `--color-ink-soft`, `--radius-xl`, `--shadow-soft` / `--shadow-lift`, `--dur-*`, `--ease-out`, `--font-display` / `--font-body`.

---

## Non-régression

Après le commit Laboratoire :

- Ne pas modifier JSX/CSS/contenu Hero, Services, Work, Laboratory sans validation explicite.
- Ne pas versionner `public/img/v2-sandbox/` ni `design-lab/`.
- `.gitignore` n’empêche pas un build de servir `public/` — contrôle manuel avant déploiement.

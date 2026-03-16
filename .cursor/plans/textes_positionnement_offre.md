---
name: Textes positionnement offre
overview: "Modifier les textes (landing, accueil portfolio, À propos, footer) pour un positionnement humain et réaliste : sites web et petits outils sur mesure pour travailleurs autonomes et petites entreprises, hébergement/maintenance/accompagnement inclus, sans prétention."
todos: []
isProject: false
---

# Textes à mettre à jour — positionnement humain et réaliste

Tous les textes passent par [app/i18n/translations.ts](Portfolio/app/i18n/translations.ts). Modifier les clés FR et EN suffit ; aucun changement de structure. Ton visé : pro, clair, pas prétentieux (site vitrine, app légère, outil interne simple, MVP, maintenance).

---

## 1. Landing page (route `/`)

Composant : [app/components/landing/LandingPage.tsx](Portfolio/app/components/landing/LandingPage.tsx). Clés : `landing.*`.

| Clé | Texte FR à mettre |
|-----|-------------------|
| `landing.heroTitle` | Je conçois des sites web et de petits logiciels sur mesure pour les travailleurs autonomes et les petites entreprises. |
| `landing.heroSubtitle` | Hébergement, maintenance et accompagnement inclus. |
| `landing.ctaContact` | Discuter de votre projet |
| `landing.discoverMe` | Garder « Découvrez-moi » (ou « Parcourir ») |
| `landing.ctaPortfolio` | Garder « Voir le portfolio » |

---

## 2. Page d'accueil / Portfolio (route `/portfolio`)

Composant : [app/HomeClient.tsx](Portfolio/app/HomeClient.tsx). Clés : `home.*`.

| Clé | Texte FR à mettre |
|-----|-------------------|
| `home.heroTitle` | Création de sites web et d'outils sur mesure |
| `home.heroSubtitle` | Des solutions simples, modernes et adaptées à votre réalité. |
| `home.role` | Sites web, petits logiciels web et maintenance pour travailleurs autonomes et petites entreprises. |
| `home.intro` | Je crée des sites web et des outils numériques simples pour aider les petites entreprises à mieux présenter leurs services ou alléger certaines tâches du quotidien. J'offre aussi l'hébergement, les mises à jour et un accompagnement technique clair. |
| `home.contactMe` | Discuter de mon projet |
| `home.cardContactDesc` | Discutons de votre projet : site web, petit outil ou maintenance. |
| `home.stickyCTA` | Discuter de votre projet |
| `home.cardProjectsDesc` | Sites web et petits outils que j'ai conçus. (optionnel) |
| `home.cardAboutDesc` | Mon parcours et comment je peux vous aider avec un site ou un outil sur mesure. (optionnel) |
| `home.statsAvailableLabel` | Pour nouveaux projets (ou « Pour vous accompagner ») |

---

## 3. Page À propos (route `/portfolio/a-propos`)

Clés : `about.*`. Utilisées dans [app/portfolio/a-propos/page.tsx](Portfolio/app/portfolio/a-propos/page.tsx) et [AboutCtaSection.tsx](Portfolio/app/portfolio/a-propos/components/AboutCtaSection.tsx).

| Clé | Texte FR à mettre |
|-----|-------------------|
| `about.experienceText` | Je termine une formation en développement logiciel et j'ai réalisé un stage en entreprise. Je conçois des sites web et de petits outils sur mesure avec une approche simple, pratique et orientée vers les vrais besoins. Mon objectif est d'offrir des solutions claires, bien pensées et accessibles pour les travailleurs autonomes et les petites entreprises. |
| `about.ctaTitle` | Discutons de votre projet |
| `about.ctaText` | Site web, petit outil ou besoin d'hébergement et de maintenance : décrivez-moi votre besoin, je vous propose une solution adaptée. |
| `about.contactCTA` | Me contacter (ou « Discuter de mon projet ») |

---

## 4. Footer

Composant : [app/components/Footer.tsx](Portfolio/app/components/Footer.tsx). Clés : `footer.*`.

| Clé | Texte FR à mettre |
|-----|-------------------|
| `footer.tagline` | Je conçois des sites web et de petits outils sur mesure pour les travailleurs autonomes et les petites entreprises. Hébergement, maintenance et accompagnement inclus. |
| `footer.contactPrompt` | Un projet site web ou un petit outil ? Discutons-en ! |

---

## 5. Fichier à modifier

- **Fichier unique** : [app/i18n/translations.ts](Portfolio/app/i18n/translations.ts).
- Modifier les clés dans l'objet `fr` (sections `home`, `landing`, `about`, `footer`) puis les mêmes clés dans l'objet `en` avec les équivalents anglais.

Aucune modification de composant n'est obligatoire : les composants utilisent déjà `t('home.xxx')`, `t('landing.xxx')`, etc.

---

## 6. Option phase 2 : section « Mon offre » en 3 blocs

Pour afficher les trois blocs (Création de site web / Logiciel sur mesure / Hébergement et maintenance) avec bénéfices client : ajouter des clés dans `translations.ts` et une section dans HomeClient ou LandingPage. À traiter après la phase 1.

---

## Résumé

| Zone | Clés à adapter (FR + EN) |
|------|--------------------------|
| Landing | heroTitle, heroSubtitle, ctaContact |
| Accueil portfolio | heroTitle, heroSubtitle, role, intro, contactMe, cardContactDesc, cardProjectsDesc, cardAboutDesc, stickyCTA, statsAvailableLabel |
| À propos | experienceText, ctaTitle, ctaText, contactCTA |
| Footer | tagline, contactPrompt |

# Backlog Pop Atelier V2

Chantiers reportés — ne pas implémenter tant qu’ils ne sont pas explicitement approuvés.

## Portrait et outil de recadrage

| Champ | Détail |
|-------|--------|
| État | Reporté |
| Priorité | Non bloquant pour la publication (portrait temporaire accepté) |
| Portrait actuel | `/img/jf-avatar.jpg` (640×640) — cadrage imparfait, temporairement accepté |
| Objectif | Remplacer le portrait et fournir un outil de **recadrage et zoom** pour les photos personnelles |
| Inspiration UX | Module photo d’Expression LaSalle — s’inspirer de l’expérience utilisateur, **sans** copier automatiquement son architecture technique |
| Hors scope immédiat | Modification de la photo maintenant ; bibliothèque d’édition d’image ; changement du stockage ; masquage du cadrage dans la section À propos |

## Médias clients Hero / Réalisations

| Champ | Détail |
|-------|--------|
| État | Prérequis bloquant avant Production |
| Fichiers | `public/img/v2-sandbox/` (gitignorés) |
| Contenu | Captures Expression LaSalle et Thermo-Trappeur marquées `publishable: false` dans `heroContent` / `workContent` |
| Note | L’ignore Git n’empêche pas Next.js de servir ces fichiers en local |

## Sélecteur de langue FR/EN sur l’accueil

| Champ | Détail |
|-------|--------|
| État | Différence fonctionnelle acceptée **temporairement** (Phase 6B1) |
| Contexte | L’ancien gateway (`HomeGatewayClient`) exposait un bouton FR/EN réel (`gateway-locale-toggle`) sur `/` |
| Accueil V2 | Pop Atelier Premium est rédigé en français québécois ; **pas** de sélecteur de langue sur `/` |
| Ce que ce n’est pas | Une « absence totale de régression » — c’est une **perte temporaire** de bascule locale sur l’accueil uniquement |
| Préservé | L’i18n des pages historiques V1 (`LanguageContext`, locales `fr`/`en`) reste en place |
| Hors scope immédiat | Nouveau système bilingue improvisé sur le design system V2 ; ne pas réintroduire le gateway |
| Suite | Décision éditoriale ultérieure : FR-only assumé, ou bascule langue V2 soignée |

## Catalogue Réalisations V2 — FR seulement (6B2)

| Champ | Détail |
|-------|--------|
| État | Différence fonctionnelle acceptée **temporairement** (Phase 6B2) |
| Contexte | L’ancien `/portfolio/projets` V1 utilisait `useLanguage()` / `t('projects.*')` (FR/EN) |
| Catalogue V2 | Copy fixe français québécois (`PROJECTS_COPY`) — aligné avec l’accueil Pop Atelier |
| Ce que ce n’est pas | Une absence totale de régression i18n sur tout le site ; perte **locale** au catalogue V2 uniquement |
| Préservé | Pages historiques hors `(site-pages)` conservent `LanguageContext` |
| Hors scope immédiat | Nouveau système bilingue sur le design system V2 |

## Contact / questionnaire V2 — FR seulement (6B3)

| Champ | Détail |
|-------|--------|
| État | Différence fonctionnelle acceptée **temporairement** (Phase 6B3) |
| Contexte | L’ancien `/portfolio/contact` V1 utilisait `useLanguage()` / `t('contact.*')` (FR/EN) |
| Contact V2 | Copy fixe français québécois (`CONTACT_PAGE_COPY`) — aligné Pop Atelier |
| Ce que ce n’est pas | Suppression de l’i18n global ; perte **locale** à la page Contact V2 uniquement |
| Préservé | `LanguageContext` et locales FR/EN pour pages historiques ; `SupportContactForm` MUI inchangé |
| Hors scope immédiat | Nouvelle architecture i18n V2 ; bascule langue sur Contact |

## À propos V2 — FR seulement (6B4)

| Champ | Détail |
|-------|--------|
| État | Différence fonctionnelle acceptée **temporairement** (Phase 6B4) |
| Contexte | L’ancien `/portfolio/a-propos` V1 utilisait `useLanguage()` / `t('about.*')` (FR/EN) |
| Page V2 | Copy fixe français québécois (`ABOUT_PAGE_COPY`) — page éditoriale Pop Atelier |
| Portrait | `/img/Jf.jpg` temporaire ; recadrage/zoom et nouvelle photo restent reportés |
| Récit personnel | Publié avec GO utilisateur (P1–P3 issus de `about.personalStory*` V1) |
| Formations | Libellés/années V1 — **à confirmer avant publication** |
| Hors page V2 | Loop pixel `moi8bit.png` |
| Préservé | Section accueil `aboutContent.ts` inchangée ; locales FR/EN pour pages historiques |
| Hors scope immédiat | Bilingue V2 ; outil de recadrage |

## Services landings V2 (6B5)

| Champ | Détail |
|-------|--------|
| État | Commitée (`feat: finalize Pop Atelier support page…`) |
| Création web | Landing SEO retirée ; redirect → `/portfolio/projets?type=web` |
| Soutien | `/soutien-informatique-montreal` Pop Atelier ; îlot MUI sans SiteDarkBackdrop |
| Hub logiciels | Traité en 6B6 |

## Hub /logiciel (6B6)

| Champ | Détail |
|-------|--------|
| Décision | Hub redondant — redirect permanent → `/portfolio/projets?type=logiciel` |
| Contenu unique | Aucun (titre + intro + 4 cartes = résumé des fiches) |
| Préservé | `/logiciel/timelendr`, autres fiches produit, téléchargements, API |
| CTA Services | Accueil → `/portfolio/projets?type=logiciel` |

## Autres éléments du gateway (inventaire 6B1)

| Élément | Statut |
|---------|--------|
| Lanes web / soutien / logiciels | Remplacés par Services + navigation V2 |
| Téléphone soutien | Toujours disponible via `/soutien-informatique-montreal` et Contact |
| Animations Tetris / mockup | Remplacées par le Hero Pop Atelier (direction approuvée) |

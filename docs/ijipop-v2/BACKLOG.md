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

## Autres éléments du gateway (inventaire 6B1)

| Élément | Statut |
|---------|--------|
| Lanes web / soutien / logiciels | Remplacés par Services + navigation V2 |
| Téléphone soutien | Toujours disponible via `/soutien-informatique-montreal` et Contact |
| Animations Tetris / mockup | Remplacées par le Hero Pop Atelier (direction approuvée) |

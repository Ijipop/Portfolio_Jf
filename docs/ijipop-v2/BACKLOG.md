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

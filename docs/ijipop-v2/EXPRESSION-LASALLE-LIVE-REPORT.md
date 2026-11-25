# Expression LaSalle — site en ligne (livraison locale)

## Remplacements d’assets

| Ancien | Nouveau | Dimensions finales |
|--------|---------|-------------------|
| `public/img/portfolio/expression-lasalle-desktop.png` | dérivé de `EL_Web.png` (Sharp, cover haut, sans étirement) | 901 × 752 |
| `public/img/portfolio/expression-lasalle-phone.png` | capture Playwright du site live @ 390 px | 780 × 1688 (@2×) |
| — | `public/img/portfolio/EL_Web.png` (référence versionnée, source intacte dans `Portfolio/`) | 2544 × 1440 |

Aucune modification Thermo / DeskDot / autres `public/img/portfolio/*`.

## Contenu V2

- Badge **Site en ligne** (remplace En finalisation)
- CTA **Visiter le site ↗** → `https://www.expressionlasalletherapies.ca/fr` (nouvel onglet, `noopener noreferrer`)
- Note « aucun lien public » supprimée
- Description : site bilingue en ligne ; M365 / modernisation mentionnés sans statut « terminé »

## Neon (manuel)

Le catalogue `/portfolio/projets` conserve sa `imageUrl` Blob (`…1794356156927_ElWeb.png`) — **non modifié** par ce correctif.

## Captures avant / après (local)

Dossier (gitignored) : `design-lab/expression-lasalle-live/`

- `before/` — ijipop.com (Production avant merge)
- `after/` — `http://127.0.0.1:3000` avec ce correctif

Fichiers : `hero-{1440,1024,768,390,320}.png`, `work-expression-{…}.png`

Régénérer : `node design-lab/expression-lasalle-live/capture-sections.cjs <url> <label>` (nécessite `@playwright/test`).

## Validation exécutée

- `npm run typecheck`
- `vitest` Work + Hero (7 tests)
- `eslint` fichiers TS touchés
- `npm run build`
- `git diff --check`
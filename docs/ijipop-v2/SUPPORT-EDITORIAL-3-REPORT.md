# Soutien informatique 3.0 / 3.1 — rapport local (STOP avant PR)

## 3.1 Hero typographique (local)

- Portrait retiré du hero ; composition Fraunces centrée sur le titre « Un problème informatique ? / On va démêler ça. »
- Lead : « Parlez directement à un technicien diplômé, sans centre d’appels. »
- Captures hero : `design-lab/support-editorial-3/apres-3.1/` (script `--tag apres-3.1`)

Branche : `design/support-editorial-overhaul` (worktree `PortFolio-disable-sms`).

## Avant / après

| | Emplacement |
|---|-------------|
| **Avant** (prod `ijipop.com`) | `design-lab/support-editorial-3/avant/` |
| **Après** (local `:3010`, webpack) | `design-lab/support-editorial-3/apres/` |

Fichiers par largeur : `1440`, `1024`, `768`, `390`, `320` × `full`, `hero`, `services`, `process`, `contact`.

Regénérer : `node scripts/capture-support-editorial.mjs --base <url> --tag <avant|apres>`.

## Fichiers modifiés / ajoutés

- `lib/public-v2/supportEditorialContent.ts` — hero, 5 domaines (05 organisations + mention EL), process, confiance, note tarif, contact.
- `app/components/public-v2/services/support/SupportPageClient.tsx` — layout éditorial complet.
- `app/components/public-v2/services/support/SupportPage.module.css` — styles Atelier (pas de cartes piliers / prix).
- `app/(site-pages)/soutien-informatique-montreal/layout.tsx` — métadonnées sans « prix affichés ».
- `app/components/public-v2/services/support/__tests__/SupportPageClient.test.tsx`
- `app/__tests__/supportEditorialContent.test.ts`
- `scripts/capture-support-editorial.mjs`

## Inchangé (protégé)

- `SupportContactForm` / POST `/api/contact` / honeypot.
- Téléphone Fongo, `SMS_CONTACT_ENABLED`.
- Tableau `prices` dans `soutien-informatique-montreal.fr.ts` (données internes, **non rendues**).

## Validation technique

| Contrôle | Résultat |
|----------|----------|
| `npm run typecheck` | OK |
| `npm run build` | OK |
| `vitest` (worktree + junction `node_modules`) | Échec environnemental « No test suite found » (Vitest 4 + lien symbolique) — tests ajoutés côté `app/` |

## Critères d’acceptation (checklist)

- [ ] Hero asymétrique, portrait généreux, **pas** de carte blanche globale.
- [ ] Cinq domaines en **rythme éditorial** (numéros, séparateurs, 05 avec mention EL discrète).
- [ ] Aucune section « Prix clairs » ni montants dans le HTML.
- [ ] Process + confiance + contact split élégant ; formulaire intact.
- [ ] Pas d’étude de cas / captures Expression LaSalle.
- [ ] Mobile 390 — CTA formulaire accessible.

## STOP

**Aucun commit, push, PR ni déploiement** tant que le rendu visuel n’est pas validé par Jean-François.
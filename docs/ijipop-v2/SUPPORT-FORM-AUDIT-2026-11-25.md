# Audit P0 — formulaire Soutien (25 nov. 2026)

Worktree : `PortFolio-support-hotfix` — branche `fix/support-form-mobile-i18n` @ `origin/main` (`4761b23`).

## Symptômes rapportés

1. Formulaire en anglais sur mobile alors que la page est en français.
2. Bouton Envoyer sans retour visible.
3. Pas de confirmation d’envoi.
4. Sélecteur FR/EN absent du header V2.

## Causes racines (démontrées dans le code prod)

| ID | Cause | Preuve |
|----|--------|--------|
| C1 | **`LanguageProvider` imbriqué** dans `SupportFormMuiIsland` lit `localStorage` clé `portfolio-locale` ; si `en`, le formulaire affiche la copy `en` de `getSupportLandingContent` alors que `SupportPageClient` / `SUPPORT_EDITORIAL` restent FR fixes. | `LanguageContext.tsx` L49–55 ; `SupportFormMuiIsland.tsx` |
| C2 | **Validation silencieuse** : `needType` et `supportMode` obligatoires ; échec sans bannière ni scroll → l’utilisateur croit que le bouton ne fait rien. | `SupportContactForm.handleSubmit` |
| C3 | **Messages de champs en FR** même en UI EN (`validateContactField` avant correctif). | `contactFormValidation.ts` |
| C4 | **Barre sticky mobile** (z-index 40) au-dessus du bas de page : risque de recouvrement du bouton Envoyer et du succès hors écran. | `SupportPage.module.css` `.sticky` |
| C5 | **Header V2** (`PublicHeader`) conçu sans toggle ; l’ancien bouton vivait dans `appBar.tsx` + `ThemeWrapper` (pages V1). | `BACKLOG.md` § sélecteur langue |
| C6 | **Envoi email** : dépend de `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM` sur Vercel ; une HTTP 200 avec `success: true` ne garantit pas la réception inbox sans vérification Resend / boîte test. | `app/api/contact/route.ts` |

## Reproduction conseillée (non destructive prod)

1. Navigation privée mobile 390 px → formulaire FR.
2. Même page après avoir mis `localStorage.setItem('portfolio-locale','en')` sur ijipop.com → formulaire EN, page FR (avant correctif).
3. Soumettre sans cocher besoin / mode → pas de POST (validation client).
4. Remplir tous les champs + POST → inspecter Network `/api/contact` (sans multiplier les envois réels).

## Correctifs appliqués (cette branche)

- `LanguageProvider fixedLocale="fr"` sur l’îlot formulaire Soutien.
- Toggle **FR/EN** dans `PublicHeader` (desktop + mobile) via `PublicChromeI18n`.
- Bannière validation, focus premier champ, `aria-live`, scroll succès / erreur.
- Message succès FR explicite dans `soutien-informatique-montreal.fr.ts`.
- `submitContactRequest` : parse JSON tolérant.
- Sticky masquée quand `#demande-soutien` visible + marge basse formulaire mobile.
- Validation champs bilingue (paramètre `locale`).

## Non vérifié dans cet audit (manque accès)

- Réception courriel réelle (boîte test + logs Vercel Production).
- Taux d’échec Resend domaine / antispam.

## Fichiers modifiés

Voir `git diff` sur la branche hotfix — pas de changement dans `PortFolio-dev`.
# IJIPOP 2.0 — Rapport final Phase E

**Date :** 2026-11-26  
**Worktree :** `PortFolio-i18n` · branche `feat/ijipop-v2-i18n`  
**Portée :** validation locale uniquement — **aucun push / PR / merge / déploiement / flag Production**.

---

## 1. Commits

| Phase | SHA | Message |
|-------|-----|---------|
| B | `6c1ce7e` | `feat(i18n): prepare V2 locale infrastructure behind feature flag` |
| C | `3d566e1` | `feat(i18n): translate V2 editorial pages` |
| D | `5337ae5` | `feat(i18n): localize contact and support forms` |
| E | `git log -1 --oneline` sur la branche | `feat(i18n): finalize bilingual QA and client API errors` |

Push : **non**.

---

## 2. Résultats techniques (Phase E)

| Contrôle | Résultat |
|----------|----------|
| Typecheck (`tsc --noEmit`) | OK |
| Lint (fichiers touchés E) | OK |
| Unitaires (`vitest run`) | **296/296** OK |
| Build (`npm run build` + `DATABASE_URL` local) | OK (après fix sandbox) |
| E2E Soutien P0 (flag off, desktop + viewports) | OK |
| E2E navigation | OK (1 timeout flaky puis retry OK) |
| E2E mobile | **17/17** OK |
| E2E i18n smoke (flag on) | OK |
| QA manuelle flag on (accueil, about, soutien, lang, persist) | OK (serveur chaud) |

---

## 3. Anomalies corrigées (Phase E)

| Correctif | Impact |
|-----------|--------|
| `localizeContactApiError` + statut HTTP sur `submitContactRequest` | UI EN sans FR brut ; FR conserve diagnostics serveur |
| `LocalizedBusy` Suspense contact/projets/merci | Plus de « Chargement… » FR forcé |
| `document.documentElement.lang` sync client | A11y langue effective |
| `PublicLocaleToggle` `aria-label` Français/English | Lecteurs d’écran |
| `loadingMerci` EN → « Confirming… » | Présentation |
| Sandbox `(v2-sandbox)/layout` + `PublicChromeI18n` | Build `/v2-design-preview` (SupportContactForm) |
| Allowlist `I18N_V2_FILES` dans gardes readonly 5B–6C | Unitaires verts sans désactiver de tests |
| `rateLimitError` clés locales contact/soutien | Rate limit localisé |

---

## 4. Décision éditoriale Neon (2026-11-26)

**Décision utilisateur :** les `Project.name` et `Project.description` issus de Neon **peuvent rester en français** lorsque l’UI est en anglais.

| | |
|--|--|
| Nature | Choix éditorial **assumé** — **pas** un bug, **pas** un blocage Production |
| Affichage | Données affichées **telles qu’enregistrées** (admin) |
| Technique | Aucune migration Neon / Prisma / API / admin ; **pas** d’implémentation de `I18N-NEON-EN-PROPOSAL.md` ; **pas** de couche de traduction supplémentaire |
| Suite éventuelle | L’utilisateur pourra saisir des titres/descriptions bilingues lui-même dans l’administration |

`I18N-NEON-EN-PROPOSAL.md` est conservé comme archive de proposition **rejetée / non retenue**.

---

## 5. Anomalies restantes

### Bloquant (activation publique FR+EN)

| # | Anomalie | Statut |
|---|----------|--------|
| B1 | Flag Production doit rester `false` / absent jusqu’au GO explicite | Assumé — seule condition d’activation restante côté produit |

*Neon catalogue FR en UI EN : **retiré** des blocages (section 4).*

### Non bloquant

| # | Anomalie | Notes |
|---|----------|--------|
| N1 | Metadata / OG SSR restent FR | Architecture C — `I18N-SEO-A11Y-LIMITS.md` |
| N2 | Messages API Contact toujours FR côté contrat | Client mappe EN ; pas de nouvelle API |
| N3 | Erreurs AI diagnosis éventuelles FR | Hors parcours critique Contact/Soutien |
| N4 | Build local nécessite `DATABASE_URL` | Environnement ; Preview Vercel OK |
| N5 | Premier paint SSR FR avant hydratation EN | Architecture C ; flash possible au cold load |
| N6 | Titres/descriptions Neon souvent FR en UI EN | **Assumé** (section 4) |

### Décisions opérationnelles restantes

| # | Sujet |
|---|--------|
| O1 | GO push branche + Preview Vercel (Deployment Protection recommandée) |
| O2 | GO activation Production du flag `NEXT_PUBLIC_I18N_TOGGLE_ENABLED` (séparé) |

---

## 6. Contact FR/EN

| Mode | État |
|------|------|
| Flag off | Formulaire + validation + messages FR ; chrome `fixedLocale=fr` |
| Flag on | Copy page + validation + toasts API localisés via codes/status |
| Contrat `/api/contact` | Inchangé ; Resend inchangé |
| Merci | Copy twin EN via `getContactPageContent` |

---

## 7. Soutien FR/EN

| Mode | État |
|------|------|
| Flag off | Formulaire FR malgré `portfolio-locale=en` (P0 E2E vert) |
| Flag on | Éditorial + formulaire suivent locale chrome (provider unique) |
| Hotfix #229 | Conservé : `formReady`, validation, focus, sticky mobile, confirmation |
| Email réel en test | Mock routes Playwright — pas d’envoi réel |

---

## 8. SEO & accessibilité

Voir `I18N-SEO-A11Y-LIMITS.md`.

- URL unique ; pas de `hreflang` artificiel ; pas de routes `/en`.
- `html lang` SSR = `fr` ; client mis à jour au toggle.
- Sélecteur : `role=group`, `aria-pressed`, labels Français/English.

---

## 9. Préparation Preview

Procédure : `I18N-PREVIEW-PROCEDURE.md`

| Condition | État |
|-----------|------|
| Variable **Preview** `NEXT_PUBLIC_I18N_TOGGLE_ENABLED=true` | Documentée — **pas** appliquée |
| Production inchangée | Oui |
| Deployment Protection | Recommandée pour QA interne avant annonce |
| Push / deploy auto | **Non** jusqu’au GO O1 |

**Prêt pour Preview** dès GO push : bilinguisme UI validé localement ; Neon FR en EN assumé.

---

## 10. Conditions restantes avant activation publique FR+EN

1. **Push + Preview** protégée + checklist QA flag on (`I18N-PREVIEW-PROCEDURE.md`).
2. **GO explicite** activation Production du flag (séparé).

---

## STOP

- Aucun push / PR / merge / deploy / flag Production sans GO ultérieur.

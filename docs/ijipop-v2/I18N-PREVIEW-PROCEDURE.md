# Procédure Preview Vercel — bilinguisme IJIPOP 2.0

**Ne pas activer en Production.**  
Flag : `NEXT_PUBLIC_I18N_TOGGLE_ENABLED`

## Conditions avant Preview bilingue

1. Commits Phase D + E sur `feat/ijipop-v2-i18n` (voir `I18N-PHASE-E-REPORT.md`).
2. Décision Neon : titres/descriptions affichés **tels qu’enregistrés** (FR en UI EN **assumée**) — voir rapport Phase E §4. **Pas** de blocage catalogue.
3. Protection Preview : Deployment Protection Vercel (password / Vercel Auth) **recommandée** pour QA interne avant annonce.
4. Variables **Preview seulement** (pas Production) :
   - `NEXT_PUBLIC_I18N_TOGGLE_ENABLED=true`
   - Autres secrets inchangés (Resend, DB) — mêmes que Preview actuelle.

## Procédure (humaine)

1. Push branche `feat/ijipop-v2-i18n` (après GO explicite).
2. Ouvrir PR → Preview Vercel.
3. Dans Vercel → Project → Settings → Environment Variables → **Preview** :
   - Ajouter / activer `NEXT_PUBLIC_I18N_TOGGLE_ENABLED=true`
   - Redeploy Preview (les `NEXT_PUBLIC_*` sont figés au build).
4. Checklist QA sur l’URL Preview :
   - [ ] Flag off sur Production inchangé (sélecteur absent).
   - [ ] Preview : sélecteur FR/EN visible.
   - [ ] Accueil / projets UI / à-propos / contact / soutien / produits.
   - [ ] Catalogue : noms/descriptions Neon tels qu’en admin (FR OK en mode EN).
   - [ ] `localStorage` persist + reload.
   - [ ] Soutien : formReady, validation, sticky mobile, succès mock (pas d’email réel en test).
   - [ ] `document.documentElement.lang` suit FR/EN après toggle.
5. Laisser Production sans flag (ou `false`) jusqu’au GO activation.

## Limites SEO assumées (Architecture C)

- Une URL = deux langues client.
- HTML SSR / metadata restent principalement FR.
- Pas de `hreflang` artificiel same-URL.
- Pas de routes `/en/...` dans ce chantier.

## Interdit

- Modifier les variables **Production**.
- Merger / déployer Production sans GO séparé.
- Activer le flag sur Production sans GO QA Preview + GO explicite.

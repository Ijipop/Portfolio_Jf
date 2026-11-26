# IJIPOP 2.0 — Audit bilingue FR/EN (Phase A)

**Date :** 2026-11-26  
**Base Git :** `origin/main` @ `fa89e76` (PR #230 MERGED)  
**Worktree :** `PortFolio-i18n` · branche `feat/ijipop-v2-i18n`  
**Portée :** documentaire uniquement — aucune modification applicative dans cette phase.

---

## 0. Objectif

Restaurer un bilinguisme **complet et cohérent** sur IJIPOP 2.0 « Atelier Atlantique », sans compromettre le design, le hotfix formulaire Soutien, ni le chantier Soutien 3.2 (`PortFolio-dev`).

**Règle UX non négociable :** ne jamais exposer un sélecteur EN public qui laisse l’utilisateur devant des pages françaises.

---

## 1. Architecture bilingue historique (V1)

### Mécanisme

| Élément | Détail |
|---------|--------|
| Provider | `app/contexts/LanguageContext.tsx` → `LanguageProvider` |
| Hook | `useLanguage()` → `{ locale, setLocale, t }` |
| Persistance | `localStorage['portfolio-locale']` (`fr` \| `en`) |
| Défaut SSR / pré-mount | toujours `fr` (évite mismatch hydratation) |
| Dictionnaires | `app/i18n/locales/fr.ts` + `en.ts` (~800 feuilles) via `app/i18n/translations.ts` |
| Montage V1 | `ThemeWrapper` dans layout `(public)` |
| Toggle V1 | `appBar.tsx` (FR ↔ ENG) ; aussi `HomeGatewayClient`, pages promo |

### Flux

```
ThemeWrapper → LanguageProvider → localStorage['portfolio-locale']
                                 → t('nav.home') …
UI (AppBar / Contact / landings) → useLanguage() → setLocale / t()
```

### Particularité `fixedLocale`

`LanguageProvider` accepte `fixedLocale?: Locale`. Quand il est posé :

- la locale est verrouillée ;
- `setLocale` est no-op ;
- `localStorage` n’est **pas** écrit.

Utilisé en Production sur le formulaire Soutien V2 (`SupportFormMuiIsland`) pour empêcher un formulaire EN sur une page FR.

---

## 2. État de l’infrastructure actuelle (V2)

### Deux mondes parallèles

| Couche | Mécanisme | UX locale |
|--------|-----------|-----------|
| Funnel V1 `(public)` | `LanguageProvider` libre + AppBar | Toggle FR/EN réel |
| Pop Atelier V2 `(site-home)` / `(site-pages)` | Copy FR hardcodée dans `lib/public-v2/*` | **Aucun** sélecteur |
| Formulaire Soutien V2 | `LanguageProvider fixedLocale="fr"` | Forcé FR |

### Absences confirmées

- Pas de `next-intl`, `i18next`, `middleware.ts`, ni segments `/fr` \| `/en`.
- HTML racine : `<html lang="fr">` (jamais mis à jour au changement de locale).
- Open Graph : quasi partout `fr_CA`.
- Pas d’`alternates.languages` / `hreflang`.

### Chrome V2

- `PublicChromeShell` / `PublicHeader` / `PublicMobileNav` / `PublicFooter` : **aucune** i18n.
- Labels : `lib/public-v2/nav.ts` (FR fixe).
- Skip link : « Aller au contenu » hardcodé.

### Politique documentée

`docs/ijipop-v2/BACKLOG.md` phases 6B1–6B4 : V2 FR-only accepté temporairement.

### Travail expérimental (backup)

Emplacement : `_backups/support-p0-2026-11-25/i18n-header-snapshot/`

| Fichier | Rôle |
|---------|------|
| `PublicChromeI18n.tsx` | Wrapper `LanguageProvider` |
| `PublicLocaleToggle.tsx` + CSS module | Bouton FR/EN + `data-testid="pv2-locale-toggle"` |
| `i18n-header-experiment.patch` / `hotfix-full.patch` | Diffs historiques |

**Verdict :** réutilisable comme **base technique** (provider + UI), **pas** comme activation publique. Ne traduit pas les modules `lib/public-v2/*`. À retravailler (a11y `aria-pressed`, groupe FR\|EN discret, design Atelier Atlantique).

**Ne pas** réintroduire aveuglément dans un Header public tant que le parcours principal n’est pas bilingue.

---

## 3. Inventaire final des surfaces publiques

### Légende

| Valeur | Sens |
|--------|------|
| **full** | Copy utilisable dans cette langue |
| **partial** | Quelques chaînes seulement |
| **none** | Pas de copy utilisable |
| **latent** | Clés EN + `t()` / dict présents ; pas de toggle local ; s’active seulement si `portfolio-locale=en` déjà posé ailleurs |

### Matrice

| Surface | Route | FR | EN | Source copy | Provider | Toggle | Travail restant |
|---------|-------|----|----|-------------|----------|--------|-----------------|
| Accueil Pop Atelier | `/` | full | **none** | Modules FR `lib/public-v2/{hero,services,work,laboratory,about,contact}Content.ts` | Non | Non | Créer twins EN + brancher locale |
| Réalisations (UI) | `/portfolio/projets` | full | **none** | `PROJECTS_COPY` FR | Non | Non | Twin EN UI |
| Titres projets (données) | idem | FR (Neon) | **none** | Prisma / `GET /api/projects` | — | — | Documenter ; pas de migration Neon sans GO |
| Détail projet | — | n/a | n/a | **Aucune route** `[slug]` ; cartes → URLs externes / landings | — | — | N/A |
| À propos | `/portfolio/a-propos` | full | **none** | `ABOUT_PAGE_COPY` FR | Non | Non | Twin EN |
| Contact | `/portfolio/contact` | full | **none** (page) / partial (briefs MUI) | `CONTACT_PAGE_COPY` FR ; LP local pour briefs | Oui (libre) | Non | Twin EN page + validation |
| Contact merci | `/portfolio/contact/merci` | full | **none** | `CONTACT_PAGE_COPY.merci*` FR | Oui | Non | Twin EN |
| Soutien éditorial | `/soutien-informatique-montreal` | full | **latent** (dict) | `getSupportLandingContent` a FR+EN ; V2 force `'fr'` | Page : non | Non | Brancher `locale` ; éditorial EN |
| Soutien formulaire | îlot MUI | full | **verrouillé FR** | `fixedLocale="fr"` | Oui (fixé) | Non | Lever **après** parcours bilingue testé |
| Space Taker | `/spacetaker` | full | **latent** | `t('spaceTaker.*')` + `productSecurity.*` | Oui | Non | Activation chrome + SEO |
| DeskDot | `/deskdot` | full | **latent** | `t('deskDot.*')` | Oui | Non | Idem |
| CPU-ZE | `/cpu-ze` | full | **latent** | `t('cpuZe.*')` | Oui | Non | Idem |
| Traducteur | `/traducteur` | full | **latent** | `t('traducteur.*')` | Oui | Non | Idem + **sitemap** |
| Timelendr | `/logiciel/timelendr` | full | **latent** | `t('timelendr.*')` | Oui | Non | Idem |
| Timelendr merci | `/logiciel/timelendr/merci` | full | **latent** | `t('timelendr.merci*')` | Oui | Non | Idem |
| Hub démos | `/demos` | full | **partial** (CTA SEO seulement) | JSX FR + `demos-catalog` ; CTA `t('seo.demos*')` | CTA oui | Non | Priorité basse ; `noindex` |
| Pages démos | `/demos/*` | full | **none** | JSX FR ; ThemeWrapper présent mais body non traduit | Oui (layout) | AppBar V1 (ne traduit pas le body) | Priorité basse / garder FR showcase |
| Nav / Header / Footer / Mobile / CTA / skip | chrome V2 | full | **none** | `nav.ts` + JSX | Non | Non | Labels locale-aware |
| Legacy `/portfolio` + AppBar | `(public)` | full | **full** | `t()` + ThemeWrapper | Oui | **Oui** | Maintenir cohérence ; hors parcours Pop Atelier principal |
| Promo one-pager / business-card | `/promo/*` | full | full | `t('promo.*')` | Oui | Oui (local / AppBar) | Hors parcours principal |

### Sitemap (`app/sitemap.ts`)

| Inclus | Manquant (notable) |
|--------|--------------------|
| `/`, `/portfolio`, projets, contact, à-propos, timelendr, cpu-ze, spacetaker, deskdot | `/traducteur`, `/soutien-informatique-montreal`, routes merci |

### Synthèse des gaps

1. **Parcours Pop Atelier principal = FR-only** (accueil, réalisations UI, à-propos, contact, chrome).
2. **Landings produit = EN latent** (dicts complets, pas de toggle V2).
3. **Soutien = EN prêt mais gelé** (page + `fixedLocale`).
4. **`html lang` reste `fr`** même si un utilisateur V1 bascule EN.
5. **Une seule URL par page** — pas d’URL anglaise distincte pour les crawlers.

---

## 4. Traductions réutilisables

| Actif | Réutilisable ? | Notes |
|-------|----------------|-------|
| `locales/fr.ts` + `en.ts` | Oui | ~800 clés V1 + produits ; pas la source de vérité des modules Pop Atelier |
| `getSupportLandingContent(locale)` | Oui | Pattern modèle pour `getXxxContent(locale)` V2 |
| `homeGatewayCopy` / about story V1 | Partiel | Inspiration / extraction, pas drop-in pour shells V2 |
| Backup `PublicChromeI18n` / `PublicLocaleToggle` | Oui (infra) | UI + provider seulement |
| Modules `lib/public-v2/*Content.ts` | Non (EN) | FR only — twins à créer |
| Neon project titles | Non | FR DB ; stratégie bilingue hors scope sauf GO |

---

## 5. Architecture recommandée

### Choix : Option C hybride, centrée `LanguageContext`

**Pas de routes `/fr` / `/en` dans les phases B–E de ce chantier.**

### Pourquoi cette option

| Critère | Évaluation |
|---------|------------|
| Réutilisation V1 | Maximale (`portfolio-locale`, `t()`, dicts, pattern Soutien) |
| Impact routes existantes | Nul — URLs indexées inchangées |
| SC + CC | Compatible : provider client autour du chrome ; modules `get*Content(locale)` consommés côté client ou via props |
| Hydratation | Pattern existant : SSR/`!mounted` → `fr` ; sync `localStorage` après mount |
| Effort migration | Moindre qu’une refonte middleware |
| Maintenance | Un système unique pour V1 funnel + V2 une fois chrome unifié |

### Limites assumées (SEO / serveur)

Ces limites sont **acceptées consciemment** pour B–E ; elles ne sont pas des « cases à cocher » artificielles.

#### 1. Persistance client ≠ langue au rendu serveur

- La préférence vit dans `localStorage` (et éventuellement un cookie miroir plus tard).
- Le **premier HTML** SSR/SSG est **toujours FR** pour les surfaces V2 (et pour V1 via `resolvedLocale` pré-mount).
- Après hydratation, si `portfolio-locale=en`, les îlots client passent EN.
- Conséquence : flash FR→EN possible pour les visiteurs EN récurrents ; acceptable avec le pattern `mounted` déjà en place, à surveiller en QA.

#### 2. Une seule URL pour deux langues

- `/`, `/portfolio/contact`, `/spacetaker`, etc. servent FR et EN selon l’état client.
- Les crawlers voient principalement le **FR** (HTML initial + metadata FR).
- L’anglais n’est **pas** une ressource URL distincte indexable de façon fiable.

#### 3. Validité réelle des `hreflang`

- Des `hreflang` pointant vers **la même URL** avec deux langues ne représentent pas correctement deux documents alternates aux yeux de Google.
- Des `hreflang` inventés sans pages EN crawlables seraient du **théâtre SEO** — **non recommandés**.
- Phase E : se limiter à metadata FR/EN **lorsque la locale est réellement connue côté serveur** (cookie), ou documenter l’absence d’hreflang plutôt que d’en fabriquer.

#### 4. `html lang` et Open Graph

- Aujourd’hui figés à `fr` / `fr_CA`.
- Phase E minimale : synchroniser `document.documentElement.lang` côté client au `setLocale` ; metadata dynamique seulement si un signal serveur (cookie) existe — sinon rester honnête avec metadata FR.

### Conditions qui justifieraient `/fr` et `/en` plus tard

Introduire des routes préfixées **seulement si** l’un des éléments suivants devient un besoin métier explicite :

1. Trafic EN organique mesurable bloqué par l’absence de pages EN crawlables.
2. Campagnes ads / landing EN nécessitant une URL stable et partageable.
3. Exigence SEO documentée (agence / audit) exigeant `hreflang` + canonicals par langue.
4. Contenu éditorial EN suffisamment dense pour mériter une indexation séparée.

Jusque-là, Option C évite une migration massive (rewrites, liens internes, Vercel, canonicals) pour un bénéfice SEO théorique.

### Schéma cible (après activation publique)

```
PublicChromeShell
  └─ PublicChromeI18n (LanguageProvider)
        ├─ PublicLocaleToggle  ← exposé SEULEMENT si gate d’activation OK
        ├─ nav / footer locale-aware
        ├─ pages → get*Content(locale)
        └─ formulaires → useLanguage()  (fixedLocale retiré en Phase D)
```

---

## 6. Conditions d’activation publique du sélecteur FR/EN

### Principe

La Phase B **prépare** l’infrastructure (Provider, dictionnaires nav, composant toggle, tests).  
Le sélecteur reste **désactivé / non monté en Production** jusqu’à validation humaine du **parcours principal bilingue**.

### Parcours principal (gate)

Doit être entièrement cohérent FR **et** EN avant exposition du toggle :

| # | Surface | Exigence |
|---|---------|----------|
| 1 | Chrome (Header, MobileNav, Footer, skip, CTA) | Labels FR/EN |
| 2 | Accueil `/` | Toutes sections visibles FR/EN |
| 3 | Réalisations `/portfolio/projets` | UI FR/EN (titres Neon peuvent rester FR documentés) |
| 4 | À propos | FR/EN |
| 5 | Contact + validation + merci | FR/EN |
| 6 | Soutien éditorial + formulaire | FR/EN **sans** `fixedLocale` ; E2E verts |
| 7 | Navigation croisée | Changer de langue sur une page → pages suivantes restent dans cette langue |
| 8 | Pas de mismatch | Header EN + body FR (et inverse) = **bloquant** |

### Landings produit

Space Taker, DeskDot, CPU-ZE, Traducteur, Timelendr sont déjà **latent-bilingues**.  
Elles **ne bloquent pas** le gate si le chrome V2 partagé les enveloppe correctement.  
À vérifier au moment de l’activation (smoke EN).

### Démos

Hors gate. Peuvent rester FR / `noindex`.

### Flag d’activation recommandé

Variable d’environnement ou constante feature-flag, ex. :

```ts
NEXT_PUBLIC_I18N_TOGGLE_ENABLED=false  // défaut jusqu’au GO activation
```

- Phase B : composant présent dans le code, **non rendu** si flag off (ou rendu uniquement en Preview avec flag on).
- Activation publique : flag → `true` **après** checklist gate + Preview Vercel + GO humain.

### Hydratation — règles

1. Ne jamais lire `localStorage` pendant le rendu SSR.
2. Conserver le pattern `mounted` : avant mount, `locale === 'fr'`.
3. Éviter deux `LanguageProvider` imbriqués avec des locales divergentes (Contact / Soutien).
4. Ne pas retirer `fixedLocale="fr"` tant que (6) n’est pas vert.
5. Tests E2E : un scénario « storage=en + page SSR FR puis sync » sans erreur React #418/#425.

---

## 7. Plan révisé des phases B → E

### Phase B — Infrastructure **sans exposition** (complexité **M**, ~2–4 j)

**Statut (2026-11-26) : implémentée dans `PortFolio-i18n` — en attente revue / commit.**

**Livrables**

- `PublicChromeI18n` + `PublicLocaleToggle` (groupe FR|EN, `aria-pressed`) dans le chrome V2.
- `LanguageProvider` autour du chrome ; **`fixedLocale="fr"` tant que le flag est off** (évite Header EN via localStorage V1).
- `nav.ts` / footer / skip : API locale-aware (`getPublicV2NavItems(pathname, locale)`, `PUBLIC_V2_CHROME_COPY`).
- Flag `NEXT_PUBLIC_I18N_TOGGLE_ENABLED` (défaut off) → **toggle non monté**.
- Tests unitaires chrome + flag + labels EN ; **`fixedLocale="fr"` Soutien inchangé**.
- Design : pilule discrète FR / EN dans le trailing Header.

**Non-objectifs**

- Aucune activation publique du sélecteur.
- Aucune traduction complète des modules home/about/contact (préparée en C).

### Phase C — Traduction du parcours principal (complexité **L**, ~1–2 sem)

**Ordre**

1. Accueil (`getHeroContent(locale)`, services, work, lab, about section, contact teaser).
2. Réalisations UI.
3. À propos.
4. Contact + merci.
5. Soutien éditorial (`getSupportLandingContent(locale)` branché).
6. Smoke landings produit (activation provider partagé).
7. Démos : reporté / FR-only.

**Design :** ajuster CSS si textes EN plus longs (Header, CTA).  
**Identité Atelier Atlantique :** inchangée (Fraunces, Outfit, palette, Wave 3.0).

### Phase D — Formulaires et dynamiques (complexité **M**, ~2–4 j)

**Statut (2026-11-26) : implémentée localement (non commitée).**

- Une seule source de vérité : `PublicChromeI18n` ; `SupportFormMuiIsland` = MUI/thème seulement.
- Flag off → chrome `fixedLocale=fr` → Soutien form FR malgré `portfolio-locale=en`.
- Contact : `validationLocale` dans le controller ; Resend / API inchangés.
- **Neon :** titres/descriptions projets FR en mode EN — limitation explicite, pas EN Production-ready.
- E2E P0 : cas flag-off FR conservé et renommé.

### Phase E — SEO honnête + validation + **activation** (complexité **M**, ~2–4 j)

1. Checklist gate parcours principal (section 6).
2. `document.documentElement.lang` sync client.
3. Metadata : pas de faux `hreflang` ; cookie miroir seulement si utile et testé.
4. Sitemap : ajouter `/traducteur` + `/soutien-informatique-montreal` si indexables.
5. E2E FR/EN navigation, Soutien, Contact ; a11y toggle ; typecheck/build ; Preview Vercel.
6. **GO humain** → `NEXT_PUBLIC_I18N_TOGGLE_ENABLED=true`.
7. Pas de merge Production sans GO explicite.

### Hors scope (chantiers séparés)

- Soutien 3.2 / `PortFolio-dev`
- Signature animée ijipop
- Téléphone facultatif Soutien
- Correction textarea
- Optimisations npm / nettoyage Git
- Refactorings généraux
- Routes `/fr` `/en` (sauf déclencheur section 5)

---

## 8. Estimations

| Phase | Effort | Dépendances |
|-------|--------|-------------|
| A (cette phase) | 0,5 j | Worktree + ce document |
| B | 2–4 j | Backup toggle ; LanguageContext stable |
| C | 1–2 sem | B terminée ; copywriting EN |
| D | 2–4 j | C Soutien + Contact prêts |
| E | 2–4 j | Gate C+D verts ; Preview |

**Total indicatif parcours principal :** ~3–4 semaines calendaires selon disponibilité copy EN.

---

## 9. Risques et protections

| Risque | Mitigation |
|--------|------------|
| Toggle EN trop tôt → pages FR | Flag off jusqu’à gate ; revue humaine |
| Hydratation / mismatch React | Pattern `mounted` ; E2E ; un seul provider chrome |
| Régression formulaire Soutien | Garder `fixedLocale` jusqu’à D ; pas de test Resend live pendant i18n |
| Double provider Contact/Soutien | Unifier sous chrome avant retrait `fixedLocale` |
| SEO trompeur | Pas de `hreflang` factice ; documenter limites |
| Mélange chantiers | Worktree isolé ; ne **jamais** toucher `PortFolio-dev` |
| Titres Neon FR en mode EN | Accepté documenté ; migration future optionnelle |
| Textes EN trop longs | QA visuelle Header/CTA Phase C |

### Protections Git

| Worktree | Branche | Règle |
|----------|---------|-------|
| `PortFolio-i18n` | `feat/ijipop-v2-i18n` @ `fa89e76` | Seul chantier i18n |
| `PortFolio-dev` | `design/support-fil-conducteur` (dirty) | **Interdit** |
| Autres | hotfix, ci-fix, etc. | Ne pas synchroniser / merger depuis ici |

---

## 10. Décisions à valider (humain)

1. **Architecture C** (LanguageContext + URLs uniques) pour B–E — **recommandée**.
2. **Sélecteur masqué** jusqu’à gate parcours principal — **obligatoire**.
3. **`fixedLocale="fr"`** conservé jusqu’à fin Phase D testée — **obligatoire**.
4. **Démos** hors gate bilingue — **recommandé**.
5. **Pas de `/fr`/`/en`** tant qu’aucun déclencheur SEO métier — **recommandé**.
6. **Titres projets Neon** restent FR en mode EN pour cette itération — **recommandé** (à confirmer).

---

## 11. Prochaine étape

**STOP Phase A.**

Après validation humaine de ce document :

→ **GO Phase B** = infrastructure + toggle **non exposé**.  
→ Pas de démarrage automatique.

Aucun commit, push, PR ou déploiement n’a été effectué dans cette phase.
)

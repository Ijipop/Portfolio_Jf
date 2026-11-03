# Hero Pop Atelier V2 — référence officielle

Document de restauration du Hero validé (Phase 5A).
**Aucune modification artistique** sans nouvelle validation explicite.

| Champ | Valeur |
|-------|--------|
| Branche | `feat/ijipop-v2` |
| Tag local stable | `hero-v2-reference` |
| SHA du commit | *renseigné dans le rapport final après `git tag` — ne pas inventer ici* |
| Route sandbox | `http://localhost:3000/v2-design-preview` (`npm run dev:v2-sandbox`) |
| Direction artistique | Pop Atelier Premium · Concept D |

> Le SHA exact du commit Hero doit être lu avec `git rev-parse hero-v2-reference` (ou `git log -1`) **après** le commit. Ne pas tenter d’inscrire le SHA dans le même commit que la documentation.

---

## A. Structure

### Composants React

| Fichier | Rôle |
|---------|------|
| `app/components/public-v2/sections/Hero/Hero.tsx` | Section éditoriale + collage |
| `app/components/public-v2/sections/Hero/HeroCollage.tsx` | Floats + blobs + parallaxe |
| `app/components/public-v2/sections/Hero/index.ts` | Export public |
| `app/(v2-sandbox)/v2-design-preview/page.tsx` | Seul montage Hero (`<Hero />`) |

### CSS Modules

| Fichier | Rôle |
|---------|------|
| `Hero.module.css` | Fond pastel pleine largeur, grille copy/collage, titre, CTA |
| `HeroCollage.module.css` | Slots A/B/C, blobs, reduced-motion |

### Contenu éditorial

| Fichier | Rôle |
|---------|------|
| `lib/public-v2/heroContent.ts` | `HERO_COPY` + `HERO_FLOATS` (provisoire, éditable) |

### Tokens / thème

| Fichier | Rôle |
|---------|------|
| `app/styles/public-v2/tokens.css` | Couleurs, motion, rayons, ombres (scopés `[data-public-theme='pop-atelier']`) |
| `app/components/public-v2/theme/PublicThemeRoot` | Applique le thème + polices |

### Tests

| Fichier | Rôle |
|---------|------|
| `app/components/public-v2/sections/Hero/__tests__/Hero.test.tsx` | Contenu, hiérarchie médias |
| `app/components/public-v2/__tests__/hero-isolation.test.ts` | Hero monté uniquement depuis la sandbox |

### Dépendances Hero

- Primitives V2 : `Button`, `Heading`
- Pas de Framer Motion / GSAP dans le Hero
- Images via `<img>` chemins `public/` (pas `next/image` dans le collage)

---

## B. Composition validée

### Hiérarchie visuelle

1. **Expression LaSalle** — dominant (`slot: 'a'`)
2. **Thermo-Trappeur** — secondaire (`slot: 'b'`)
3. **DeskDot** — tertiaire (`slot: 'c'`, masqué sous 960px)

SpaceTaker **absent** du collage.

### Fond

`.hero` : `width: 100%`, `max-width: none`, dégradés radiaux pastel (accent / emphasis / bg) + `var(--color-bg)` — pleine largeur du viewport.
Contenu dans `.inner` : `width: min(100% - 2rem, var(--width-wide))`.

### Desktop (`min-width: 960px`)

- `min-height: calc(100svh - 4.25rem)` (`--hero-header-offset`)
- Grille `.inner` : `1.05fr 0.95fr`, `gap: var(--space-7)`
- Copy à gauche, collage à droite

### Mobile (`max-width: 959px`)

- Hauteur naturelle (pas de min-height viewport)
- Copy `order: 1`, stage `order: 2`
- Slot C (DeskDot) : `display: none`
- CTA pleine largeur sous `380px`

### Slots collage (valeurs CSS réelles)

| Slot | Classe | Position / taille desktop | Mobile |
|------|--------|---------------------------|--------|
| A | `.slotA` | `width: 76%`, `height: 15.5rem` (≥960), `left: 0`, `top: 6%`, `z-index: 2`, `--rot: -2.2deg` | `width: 82%`, `height: 9.5rem` |
| B | `.slotB` | `width: 58%`, `height: 11.5rem`, `right: 0`, `top: 40%`, `z-index: 3`, `--rot: 2.6deg` | `width: 64%`, `height: 7.5rem` |
| C | `.slotC` | `width: 44%`, `height: 9rem`, `left: 20%`, `bottom: 2%`, `z-index: 1`, `--rot: -1deg` | masqué |

Stage : `min-height: 26rem` (≥960) / `14rem` (&lt;960), `perspective: 1200px`.

### Blobs

| Blob | Classe | Taille | Position | Opacité | z-index |
|------|--------|--------|----------|---------|---------|
| Mauve | `.blobViolet` | `8rem` | `right: 4%`, `top: -0.35rem` | `0.62` | `0` |
| Corail | `.blobCoral` | `5.25rem` | `left: 3%`, `bottom: 8%` | `0.78` | `0` |

Les blobs restent **derrière** les floats (`z-index: 0`). La boule corail doit rester **entièrement visible** (peeker bas-gauche).

---

## C. Animations (valeurs extraites du code)

### Tokens motion (`tokens.css`)

| Token | Valeur normale | `prefers-reduced-motion: reduce` |
|-------|----------------|-----------------------------------|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | inchangé |
| `--dur-fast` | `180ms` | `1ms` |
| `--dur-med` | `420ms` | `1ms` |
| `--dur-slow` | `780ms` | `1ms` |
| `--dur-reveal` | `900ms` | `1ms` |
| `--stagger` | `70ms` | `0ms` |
| `--motion-reveal-y` | `1rem` | `0px` |

### Titre (`heroRise`)

- Animation : `heroRise var(--dur-slow) var(--ease-out) both`
- Ligne 2 : `animation-delay: 110ms`
- From : `opacity: 0; transform: translateY(0.55em)`
- Reduced-motion : `animation: none`

### Entrée floats

- Delays : A `0ms`, B `120ms`, C `220ms`
- Transition : `opacity` / `transform` via `--dur-reveal` / `--ease-out`
- Reveal Y : `var(--motion-reveal-y)`

### Parallaxe pointeur (`HeroCollage.tsx`)

- Constante `PARALLAX = 7`
- Profondeurs slots : A=`1`, B=`2`, C=`3`
- Amplitude : `depth = SLOT_DEPTH[slot] * (PARALLAX * 0.35)` → A≈2.45px, B≈4.9px, C≈7.35px (facteur × nx/ny ∈ [-1,1])
- Écouteurs sur **toute** la section `[data-testid="pv2-hero"]` (`pointermove` / `pointerleave`)
- Retour : classe `.floatReturning` → `transition: transform var(--dur-med) var(--ease-out)`
- **Aucun** `@keyframes` de flottement sur les captures

### Blobs flottants

- Classe `.blobFloating` → `animation: heroBlobDrift 8s var(--ease-out) infinite alternate`
- Corail : `animation-delay: 1.2s`, `animation-duration: 10s`
- Drift : `translate(0,0)` → `translate(10px, -14px)`
- Reduced-motion : `animation: none`

### Enhance

- `enhance` activé ~32ms après montage si `!prefers-reduced-motion`
- Sans JS / reduced-motion : contenu visible (pas d’état masqué permanent)

---

## D. Couleurs (tokens — ne pas dupliquer les hex ailleurs)

Utilisés par le Hero :

- `--color-bg`, `--color-ink`, `--color-ink-soft`
- `--color-accent` (blob mauve / wash)
- `--color-emphasis` (kicker bar / blob corail / wash)
- `--color-surface`, `--color-line`
- `--shadow-lift`, `--radius-lg`
- `--font-display` (Fraunces), corps via thème Outfit

---

## E. Médias

### Chemins runtime

| id | src | publishable | Dimensions locales |
|----|-----|-------------|--------------------|
| `expression-lasalle` | `/img/v2-sandbox/expression-lasalle-desktop.png` | `false` | 901×752 |
| `thermo-trappeur` | `/img/v2-sandbox/thermo-trappeur-desktop.png` | `false` | 901×752 |
| `deskdot` | `/img/deskdot/deskdot2.png` | `true` | 391×395 |

Fichiers disque :

- `public/img/v2-sandbox/expression-lasalle-desktop.png`
- `public/img/v2-sandbox/thermo-trappeur-desktop.png`
- `public/img/deskdot/deskdot2.png`

### Empreintes SHA-256 (restauration fidèle)

```
5F4609D0A219812FA834A970B37F1DEE0483B38A5DD7CB7C52C452721206854D  public/img/v2-sandbox/expression-lasalle-desktop.png
7C9AF40D7081D75500023E524D6424A28C9315B4EA126BA537EC6105B092B743  public/img/v2-sandbox/thermo-trappeur-desktop.png
B2B1393143A2BBC6E546E3826B4E63CEDCD02AE2B739B36447DAB3C802CFCB44  public/img/deskdot/deskdot2.png
```

### Git / build

- `/public/img/v2-sandbox/` est dans `.gitignore` — **volontaire**.
- DeskDot (`deskdot2.png`) est versionné.
- **`.gitignore` n’empêche pas un build Next de servir ou d’empaqueter** ce qui se trouve sous `public/`. Contrôle manuel obligatoire avant tout déploiement.
- Ne pas pousser les PNG clients ; ne pas les copier dans un dossier tracké.

Sources lab (non publiques) : `design-lab/ijipop-v2/assets/concept-d/SOURCES.txt`.

---

## F. Captures de référence (hors Git)

Dossier local (non versionné avec le lab) :

`design-lab/ijipop-v2/validation/hero-v2/`

| Fichier | Viewport |
|---------|----------|
| `hero-1440x900.png` | 1440×900 |
| `hero-1024x768.png` | 1024×768 |
| `hero-390.png` | 390 |
| `hero-320.png` | 320 |
| `README.md` | notes d’états (pointeur, reduced-motion) |

---

## G. Restauration

1. Se placer sur le tag local : `git checkout hero-v2-reference` (ou cherry-pick / worktree sans reset destructif).
2. Vérifier les fichiers listés en section A.
3. Restaurer les PNG clients sous `public/img/v2-sandbox/` et contrôler les SHA-256 ci-dessus.
4. Lancer `npm run dev:v2-sandbox` → ouvrir **`http://localhost:3000/v2-design-preview`** (pas `127.0.0.1` pour l’hydratation/HMR).
5. Comparer aux captures de `design-lab/ijipop-v2/validation/hero-v2/`.
6. Checklist : hiérarchie Expression/Thermo/DeskDot ; fond pastel pleine largeur ; boule mauve animée ; boule corail visible ; parallaxe légère sans auto-float des captures ; reduced-motion.

**Sans** les médias clients locaux, le checkout Git seul **ne reproduit pas** le rendu complet.

---

## H. Texte provisoire figé (structure, pas rédaction définitive)

Source : `lib/public-v2/heroContent.ts`

- Kicker : `Développeur indépendant · Montréal`
- Titre : `Des sites web, des logiciels et du soutien informatique.`
- Description : Jean-François Lefebvre, sites / logiciels / soutien, à son compte, Montréal
- CTA : `Voir mes réalisations` → `/portfolio/projets` ; `Me contacter` → `/portfolio/contact`

Ne pas réécrire ces textes pendant les phases suivantes sans décision éditoriale explicite.

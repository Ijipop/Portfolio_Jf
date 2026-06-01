# Performance — baseline & garde-fous visuels

## Contraintes (ne pas violer)

- Garder Border Beam, Vanta NET et cartes 3D
- Ne pas forcer le mode graphismes `light` pour tous en prod
- Ne pas remplacer les animations par du CSS statique
- Ne pas réduire la densité Vanta au point de voir moins de points/lignes

## Mesure (baseline)

```bash
npm run dev
npm run perf:lighthouse
```

Pages cibles : `/`, `/portfolio/contact`, `/portfolio/projets`.

Checklist QA après chaque changement perf :

- [ ] Vanta visible et fluide (mode full, machine de référence)
- [ ] Border Beam carte contact
- [ ] Cartes 3D : hover, pastilles, ombres
- [ ] FR / EN sans clés brutes
- [ ] `npm run test:e2e` — spec contact

Tests locaux en full graphics :

```bash
# .env.local
NEXT_PUBLIC_FORCE_GRAPHICS_MODE=full
```

## Optimisations en place

| Zone | Détail |
|------|--------|
| i18n | `locales/fr.ts` synchrone ; `locales/en.ts` chargé à la demande |
| Contact | `ContactForm` isolé, validation debounce 300 ms + blur |
| Cartes 3D | Border Beam en `dynamic()` ; pause hors écran (`usePauseWhenOffscreen`) |
| CSS | `.perf-cv-auto` (content-visibility) footer, sections contact basses |
| Layout | `unstable_cache` fond beige 5 min |
| Scripts | Google Ads `lazyOnload` |
| Lenis | Désactivé sur `/portfolio/contact/*` et `/admin/*` |
| React | `memo` sur Footer, AppBar, sections contact statiques |

## Bundle analyzer

```bash
npm run analyze
```

Ouvre les rapports client/server dans le navigateur après `next build` (`ANALYZE=true`).

## Vidéo contact (`demo1.mp4`)

Fichier attendu : `public/img/demo1.mp4` (souvent absent du dépôt git).

```bash
npm run encode:contact-demo
# Vérifier demo1.optimized.mp4, puis :
node scripts/encode-contact-demo-video.mjs --replace
```

## Lot 3 — bundle analyzer (commons)

| Zone | Détail |
|------|--------|
| `CTAButton` | Hover/tap en **CSS** (plus de `framer-motion` dans le commons) |
| GSAP | `loadGsapWithScrollTrigger()` — hero + pont Lenis en chunks async |
| Lenis | `LenisRoot` en `dynamic()` depuis `SmoothScrollProvider` |

Relancer `npm run analyze` et comparer le chunk **framework / shared** vs ~1,88 Mo initial.

## Dernières optimisations (lot 2)

| Zone | Détail |
|------|--------|
| Accueil | `PortfolioProcessSection`, `AiConversionTeaser`, `ScrollReveal` en `dynamic()` |
| Thème | Valeur `AdvancedThemeContext` mémoïsée (`useMemo` / `useCallback`) |
| Cache HTTP | `Cache-Control` long sur `/img/*` et `/_next/static/*` |
| Scripts | `npm run analyze`, `npm run encode:contact-demo` |

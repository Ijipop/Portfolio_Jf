# SEO & accessibilité — limites assumées (Architecture C)

**Date :** 2026-11-26  
**Branche :** `feat/ijipop-v2-i18n`

## Architecture

Une URL unique + préférence client (`localStorage['portfolio-locale']`).  
Pas de segments `/fr` / `/en`, pas de middleware i18n, pas de pages EN indexables distinctes.

## SEO — ce qui est vrai

| Élément | Comportement |
|---------|----------------|
| `<html lang>` SSR | Toujours `fr` (`app/layout.tsx`) |
| `<html lang>` client | Mis à jour via `LanguageContext` après hydratation / toggle (`document.documentElement.lang`) |
| Metadata / Open Graph | Restent FR (layouts existants) — **pas** de twin EN |
| `hreflang` / `alternates.languages` | **Non** — artificiel same-URL interdit dans ce chantier |
| Indexation EN | Les crawlers voient principalement le HTML FR ; l’EN est une UX client |

**Ne pas** présenter le site comme disposant de pages anglaises SEO indépendantes.

## Accessibilité — état Phase E

| Contrôle | État |
|----------|------|
| Sélecteur FR/EN | `role="group"`, `aria-label` Langue/Language, boutons `aria-pressed` + `aria-label` Français/English |
| Focus visible | Styles bouton existants du chrome ; pas de ring dédié ajouté |
| Navigation clavier | Boutons natifs focusables |
| Lecteurs d’écran | Labels boutons distincts ; contenu page suit `t()` / getters locale |
| CTA / liens | Labels chrome via `getNavCopy(locale)` |

## Non-objectifs de ce chantier

- Routes localisées
- Sitemap EN séparé
- Metadata EN dynamique serveur
- Activation Production du flag

import { THEMES, type ThemeName } from '@/design-system/themes'
import { SITE_DARK, siteDarkPageGradient, siteDarkTopologyBackground } from '@/design-system/siteDark'
import { getImageUrl } from '@/lib/getImageUrl'

/** Image de fond par défaut du mode présentation « Site » (`beige`, servie depuis /public). */
export const BEIGE_PRESENTATION_BG_IMAGE = '/img/OrangeBG.png'

function resolvedBeigePresentationImageUrl(override: string | null | undefined): string {
  const v = override?.trim()
  if (!v) return BEIGE_PRESENTATION_BG_IMAGE
  return getImageUrl(v) || BEIGE_PRESENTATION_BG_IMAGE
}

/** Pour `background` CSS : `url("…")` avec échappement des guillemets et antislashs. */
export function cssBackgroundImageUrl(href: string): string {
  const safe = href.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `url("${safe}")`
}

/** Voile crème + image (calques : dégradé au-dessus du PNG). */
export function getBeigePresentationPageBackground(
  theme: { bg: string; bg2: string },
  imageUrl?: string | null
): string {
  const tint = `linear-gradient(165deg, ${theme.bg}9e 0%, ${theme.bg2}85 48%, ${theme.bg}9e 100%)`
  const href = resolvedBeigePresentationImageUrl(imageUrl)
  return `${tint}, ${cssBackgroundImageUrl(href)} center center / cover no-repeat`
}

/**
 * Fond plein écran mode beige avec halos theme (topology) — ordre CSS : halos → voile → image.
 */
export function getBeigePresentationTopologyBackground(
  theme: {
    bg: string
    bg2: string
    primary: string
    accent: string
    secondary: string
  },
  imageUrl?: string | null
): string {
  const r1 = `radial-gradient(circle at 14% 16%, ${theme.primary}28 0%, transparent 40%)`
  const r2 = `radial-gradient(circle at 88% 22%, ${theme.accent}24 0%, transparent 34%)`
  const r3 = `radial-gradient(circle at 50% 92%, ${theme.secondary}12 0%, transparent 45%)`
  const tint = `linear-gradient(165deg, ${theme.bg}9e 0%, ${theme.bg2}85 48%, ${theme.bg}9e 100%)`
  const href = resolvedBeigePresentationImageUrl(imageUrl)
  const img = `${cssBackgroundImageUrl(href)} center center / cover no-repeat`
  return `${r1}, ${r2}, ${r3}, ${tint}, ${img}`
}

function getCardColorsForTheme(theme: (typeof THEMES)[ThemeName], name: ThemeName) {
  if (name === 'siteDark') {
    return {
      primary: theme.primary,
      secondary: theme.secondary,
      background: `linear-gradient(145deg, ${SITE_DARK.surface} 0%, rgba(8, 8, 12, 0.92) 100%)`,
      cardGradient: `linear-gradient(145deg, ${SITE_DARK.brandGlow} 0%, rgba(255,255,255,0.03) 50%, ${SITE_DARK.brandGlow} 100%)`,
    }
  }
  if (name === 'default' || name === 'latte') {
    return {
      primary: theme.primary,
      secondary: theme.secondary,
      background: `linear-gradient(145deg, ${theme.bg2}f0 0%, ${theme.bg}ee 50%, ${theme.bg2}f0 100%)`,
      cardGradient: `linear-gradient(145deg, ${theme.primary}22 0%, ${theme.secondary}1c 50%, ${theme.accent}18 100%)`,
    }
  }
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    background: `linear-gradient(145deg, ${theme.primary}20 0%, ${theme.secondary}20 50%, ${theme.primary}20 100%)`,
    cardGradient: `linear-gradient(145deg, ${theme.primary}20 0%, ${theme.secondary}20 50%, ${theme.primary}20 100%)`,
  }
}

export type SyncPortfolioThemeOptions = {
  /** Mode présentation « Site » (beige) : fond image + voile thème. */
  beigePresentation?: boolean
  /** Mode Site sombre (sunset) : dégradé palette, sans image crème. */
  beigeDark?: boolean
  /** Remplace l’image par défaut du mode Site (URL absolue ou chemin `/…`) si défini. */
  beigePresentationBgUrl?: string | null
}

/** Met à jour les CSS variables et le fond body/html (client uniquement). */
export function syncPortfolioThemeToDocument(
  name: ThemeName,
  options?: SyncPortfolioThemeOptions
): void {
  if (typeof document === 'undefined') return
  const theme = THEMES[name]
  if (!theme) return

  const root = document.documentElement
  root.style.setProperty('--primary-color', theme.primary)
  root.style.setProperty('--secondary-color', theme.secondary)
  root.style.setProperty('--accent-color', theme.accent)
  root.style.setProperty('--theme-bg', theme.bg)
  root.style.setProperty('--theme-bg2', theme.bg2)

  const cardColors = getCardColorsForTheme(theme, name)
  root.style.setProperty('--card-primary', cardColors.primary)
  root.style.setProperty('--card-secondary', cardColors.secondary)
  root.style.setProperty('--card-background', cardColors.background)
  root.style.setProperty('--card-card-gradient', cardColors.cardGradient)
  const isLightSurface = name === 'default' || name === 'latte'
  root.style.setProperty('--card-overlay-opacity', isLightSurface ? '0.14' : '0.3')
  root.style.setProperty('--card-decor-opacity', isLightSurface ? '0.35' : '0.6')

  if (name === 'siteDark') {
    root.classList.add('dark')
    root.style.setProperty('--background', SITE_DARK.bg)
    root.style.setProperty('--foreground', SITE_DARK.text)
    root.style.setProperty('--card', SITE_DARK.bgElevated)
    root.style.setProperty('--card-foreground', SITE_DARK.text)
    root.style.setProperty('--muted-foreground', SITE_DARK.textSecondary)
    root.style.setProperty('--border', SITE_DARK.border)
    root.style.setProperty('--site-surface', SITE_DARK.surface)
    root.style.setProperty('--site-border', SITE_DARK.border)
    root.style.setProperty('--site-text', SITE_DARK.text)
    root.style.setProperty('--site-text-secondary', SITE_DARK.textSecondary)
  } else {
    root.classList.remove('dark')
  }

  const grad = `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`
  const pageBg =
    options?.beigePresentation === true && options?.beigeDark !== true
      ? getBeigePresentationPageBackground(theme, options.beigePresentationBgUrl)
      : name === 'siteDark'
        ? siteDarkPageGradient()
        : grad
  document.body.style.setProperty('background', pageBg, 'important')
  document.documentElement.style.setProperty('background', pageBg, 'important')
}

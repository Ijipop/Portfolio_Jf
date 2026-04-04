import { THEMES, type ThemeName } from '@/design-system/themes'

function getCardColorsForTheme(theme: (typeof THEMES)[ThemeName], name: ThemeName) {
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

/** Met à jour les CSS variables et le fond body/html (client uniquement). */
export function syncPortfolioThemeToDocument(name: ThemeName): void {
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

  const grad = `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`
  document.body.style.setProperty('background', grad, 'important')
  document.documentElement.style.setProperty('background', grad, 'important')
}

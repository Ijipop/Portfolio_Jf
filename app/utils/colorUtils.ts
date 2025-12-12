/**
 * Utilitaires pour la gestion des couleurs et de la lisibilité
 */

/**
 * Convertit une couleur hex en RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calcule la luminosité relative d'une couleur (0-1)
 * Utilise la formule de luminance relative selon WCAG
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0.5 // Fallback si la couleur n'est pas valide

  // Normaliser les valeurs RGB (0-1)
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255]

  // Appliquer la correction gamma
  const [rLinear, gLinear, bLinear] = [
    r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4),
  ]

  // Calculer la luminance relative
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

/**
 * Détermine si une couleur est claire ou sombre
 * @param hex - Couleur hexadécimale (ex: '#1e3a8a')
 * @returns true si la couleur est claire, false si elle est sombre
 */
export function isLightColor(hex: string): boolean {
  return getLuminance(hex) > 0.5
}

/**
 * Détermine la couleur de texte optimale pour un background donné
 * @param backgroundColor - Couleur hexadécimale du background
 * @returns '#ffffff' pour un background sombre, '#1e293b' pour un background clair
 */
export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#1e293b' : '#ffffff'
}

/**
 * Extrait la couleur principale d'un gradient CSS
 * @param gradient - String de gradient CSS (ex: 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)')
 * @returns Première couleur hex trouvée dans le gradient, ou null
 */
export function extractColorFromGradient(gradient: string): string | null {
  // Chercher toutes les couleurs hex dans le gradient
  const hexMatches = gradient.match(/#[0-9a-fA-F]{6}/g)
  if (hexMatches && hexMatches.length > 0) {
    return hexMatches[0] // Retourner la première couleur trouvée
  }
  return null
}

/**
 * Détermine la couleur de texte optimale pour un background (peut être un gradient)
 * @param background - Couleur hex ou gradient CSS
 * @returns Couleur de texte optimale
 */
export function getTextColorForBackground(background: string): string {
  // Si c'est un gradient, extraire la première couleur
  if (background.includes('gradient') || background.includes('linear-gradient')) {
    const extractedColor = extractColorFromGradient(background)
    if (extractedColor) {
      return getContrastTextColor(extractedColor)
    }
    // Si on ne peut pas extraire, utiliser une heuristique basée sur les couleurs communes
    // Les gradients avec des backgrounds sombres contiennent généralement des valeurs hex sombres
    const hasDarkColors = /#[0-9a-fA-F]{2}[0-9a-fA-F]{2}[0-9a-fA-F]{2}/.test(background)
    if (hasDarkColors) {
      // Vérifier si les couleurs extraites sont sombres
      const colors = background.match(/#[0-9a-fA-F]{6}/g) || []
      const isDark = colors.some(color => !isLightColor(color))
      return isDark ? '#ffffff' : '#1e293b'
    }
  }
  
  // Si c'est une couleur hex simple
  if (background.startsWith('#')) {
    return getContrastTextColor(background)
  }
  
  // Fallback par défaut
  return '#1e293b'
}


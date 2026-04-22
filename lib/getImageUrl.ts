/**
 * Normalise une valeur d’image stockée (chemin site, URL absolue, ou data URL) pour `src` / `url()` CSS.
 */
export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return ''

  const trimmed = imageUrl.trim()
  if (!trimmed) return ''

  const lower = trimmed.toLowerCase()
  if (lower.startsWith('data:image/')) {
    return trimmed
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  if (trimmed.startsWith('public/')) {
    return trimmed.replace('public/', '/')
  }

  if (!trimmed.startsWith('/')) {
    return `/${trimmed}`
  }

  return trimmed
}

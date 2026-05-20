/** Extensions acceptées dans l’URL (chemin, query ou hash). */
const RELEASE_URL_MARKERS = ['.zip', '.exe', '.dmg', '.msi'] as const

export function isValidTimelendrReleaseUrl(urlString: string): boolean {
  const trimmed = urlString.trim()
  if (!trimmed) return false
  try {
    const u = new URL(trimmed)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false
    const haystack = `${u.pathname}${u.search}${u.hash}`.toLowerCase()
    return RELEASE_URL_MARKERS.some((ext) => haystack.includes(ext))
  } catch {
    return false
  }
}

export const TIMELENDR_RELEASE_URL_HINT =
  'URL http(s) contenant .zip, .exe, .dmg ou .msi (ex. lien direct GitHub Releases vers le fichier).'

export const TIMELENDR_RELEASE_URL_ERROR =
  'URL invalide : utilisez un lien http(s) direct vers un fichier .zip, .exe, .dmg ou .msi (l’extension doit apparaître dans l’URL).'

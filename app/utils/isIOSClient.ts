/**
 * Détection client iPad / iPhone / iPod (Safari WebKit).
 * iPadOS 13+ se présente souvent comme « Macintosh » + tactile.
 */
export function isIOSTouchDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  if (/iP(ad|hone|od)/i.test(navigator.userAgent)) return true
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true
  return false
}

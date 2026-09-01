/** Landings produit standalone — hors look portfolio V2. */
import { isTimelendrRoute } from '@/utils/isTimelendrRoute'

const PRODUCT_ROOTS = ['/cpu-ze', '/spacetaker', '/deskdot', '/traducteur'] as const

export function isProductLandingRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  if (isTimelendrRoute(pathname)) return true
  return PRODUCT_ROOTS.some((root) => pathname === root || pathname.startsWith(`${root}/`))
}

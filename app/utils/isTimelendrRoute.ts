/** Routes Timelendr — exclues du look sombre V2 (apparence legacy préservée). */
export function isTimelendrRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return pathname === '/logiciel/timelendr' || pathname.startsWith('/logiciel/timelendr/')
}

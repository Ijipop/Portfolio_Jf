const TOPOLOGY_PATH_PREFIXES = ['/portfolio', '/logiciel', '/pageweb'] as const

export function shouldShowTopology(pathname: string | null): boolean {
  if (!pathname) return false
  return TOPOLOGY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}


const TOPOLOGY_PATH_PREFIXES = ['/portfolio', '/logiciel', '/pageweb'] as const

type TopologyScope = 'targeted' | 'global'

function getTopologyScope(): TopologyScope {
  const value = process.env.NEXT_PUBLIC_TOPOLOGY_SCOPE
  return value === 'targeted' ? 'targeted' : 'global'
}

export function shouldShowTopology(pathname: string | null): boolean {
  if (!pathname) return false

  const scope = getTopologyScope()
  if (scope === 'global') return true

  // Accueil : même en mode ciblé, le hero doit garder le fond animé (topology landing).
  if (pathname === '/') return true

  return TOPOLOGY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}


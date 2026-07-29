const TOPOLOGY_PATH_PREFIXES = ['/portfolio', '/logiciel'] as const

type TopologyScope = 'targeted' | 'global'

function getTopologyScope(): TopologyScope {
  const value = process.env.NEXT_PUBLIC_TOPOLOGY_SCOPE
  return value === 'targeted' ? 'targeted' : 'global'
}

export function shouldShowTopology(pathname: string | null): boolean {
  if (!pathname) return false

  // Labs / pages de test : pas de fond Vanta plein écran (évite 2 contextes WebGL + masque le canvas du lab).
  if (pathname.startsWith('/test')) return false

  // Preview accueil v2 : fond sombre dédié, sans topology globale.
  if (pathname.startsWith('/accueil-v2')) return false

  // Gateway `/` : fond dédié (HomeV2Backdrop) — évite le halo topology collé en haut du viewport.
  if (pathname === '/') return false

  // Landings produit standalone : fond CSS dédié.
  if (
    pathname === '/cpu-ze' ||
    pathname.startsWith('/cpu-ze/') ||
    pathname === '/spacetaker' ||
    pathname.startsWith('/spacetaker/')
  ) {
    return false
  }

  const scope = getTopologyScope()
  if (scope === 'global') return true

  return TOPOLOGY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}


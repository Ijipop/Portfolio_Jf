const TOPOLOGY_PATH_PREFIXES = ['/logiciel'] as const

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

  // Gateway `/` : fond dédié (HomeV2Backdrop).
  if (pathname === '/') return false

  // Funnel vendeur /portfolio/* : même atmosphère HomeV2Backdrop (layout portfolio).
  if (pathname === '/portfolio' || pathname.startsWith('/portfolio/')) return false

  // Hub démos : fond CSS dédié.
  if (pathname === '/demos' || pathname.startsWith('/demos/')) return false

  // Landings produit standalone : fond CSS dédié.
  if (
    pathname === '/cpu-ze' ||
    pathname.startsWith('/cpu-ze/') ||
    pathname === '/spacetaker' ||
    pathname.startsWith('/spacetaker/') ||
    pathname === '/deskdot' ||
    pathname.startsWith('/deskdot/') ||
    pathname === '/traducteur' ||
    pathname.startsWith('/traducteur/')
  ) {
    return false
  }

  const scope = getTopologyScope()
  if (scope === 'global') return true

  return TOPOLOGY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

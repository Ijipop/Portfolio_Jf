export type NavRouteId = 'home' | 'projects' | 'software' | 'about' | 'support' | 'contact'

export interface NavRoute {
  id: NavRouteId
  labelKey: string
  path: string
  ariaLabel: string
  /** `search` = query string sans `?` (ex. `type=logiciel`). */
  isActive: (pathname: string, search?: string) => boolean
}

function hasTypeLogiciel(search?: string): boolean {
  if (!search) return false
  return new URLSearchParams(search).get('type') === 'logiciel'
}

export const NAV_ROUTES: NavRoute[] = [
  {
    id: 'home',
    labelKey: 'nav.home',
    path: '/',
    ariaLabel: 'accueil',
    isActive: (pathname) => pathname === '/',
  },
  {
    id: 'projects',
    labelKey: 'nav.projects',
    path: '/portfolio/projets',
    ariaLabel: 'projets',
    isActive: (pathname, search) =>
      pathname === '/portfolio/projets' && !hasTypeLogiciel(search),
  },
  {
    id: 'software',
    labelKey: 'nav.software',
    path: '/portfolio/projets?type=logiciel',
    ariaLabel: 'logiciels',
    isActive: (pathname, search) =>
      (pathname === '/portfolio/projets' && hasTypeLogiciel(search)) ||
      pathname === '/logiciel' ||
      pathname.startsWith('/logiciel/') ||
      pathname === '/cpu-ze' ||
      pathname.startsWith('/cpu-ze/') ||
      pathname === '/spacetaker' ||
      pathname.startsWith('/spacetaker/'),
  },
  {
    id: 'about',
    labelKey: 'nav.about',
    path: '/portfolio/a-propos',
    ariaLabel: 'a propos',
    isActive: (pathname) => pathname === '/portfolio/a-propos',
  },
  {
    id: 'support',
    labelKey: 'nav.support',
    path: '/soutien-informatique-montreal',
    ariaLabel: 'soutien technique',
    isActive: (pathname) => pathname === '/soutien-informatique-montreal',
  },
  {
    id: 'contact',
    labelKey: 'nav.contact',
    path: '/portfolio/contact',
    ariaLabel: 'contact',
    isActive: (pathname) =>
      pathname === '/portfolio/contact' || pathname.startsWith('/portfolio/contact/'),
  },
]

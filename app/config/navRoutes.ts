export type NavRouteId = 'home' | 'projects' | 'about' | 'contact'

export interface NavRoute {
  id: NavRouteId
  labelKey: string
  path: string
  ariaLabel: string
  isActive: (pathname: string) => boolean
}

export const NAV_ROUTES: NavRoute[] = [
  {
    id: 'home',
    labelKey: 'nav.home',
    path: '/portfolio',
    ariaLabel: 'accueil',
    isActive: (pathname) => pathname === '/portfolio',
  },
  {
    id: 'projects',
    labelKey: 'nav.projects',
    path: '/portfolio/projets',
    ariaLabel: 'projets',
    isActive: (pathname) => pathname === '/portfolio/projets',
  },
  {
    id: 'about',
    labelKey: 'nav.about',
    path: '/portfolio/a-propos',
    ariaLabel: 'a propos',
    isActive: (pathname) => pathname === '/portfolio/a-propos',
  },
  {
    id: 'contact',
    labelKey: 'nav.contact',
    path: '/portfolio/contact',
    ariaLabel: 'contact',
    isActive: (pathname) => pathname === '/portfolio/contact',
  },
]


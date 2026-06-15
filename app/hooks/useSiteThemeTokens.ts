'use client'

import { useMemo } from 'react'
import { SITE_DARK, SITE_LIGHT, type SiteThemeTokens } from '@/design-system/siteDark'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'

/** Tokens visuels Site (sombre V2 ou clair latte) selon le toggle navbar. */
export function useSiteThemeTokens(): SiteThemeTokens {
  const siteDarkChrome = useSiteDarkChrome()
  return useMemo(() => (siteDarkChrome ? SITE_DARK : SITE_LIGHT), [siteDarkChrome])
}

export function useSiteThemeIsDark(): boolean {
  return useSiteDarkChrome()
}

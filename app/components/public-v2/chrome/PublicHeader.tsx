'use client'

import { useEffect, useState } from 'react'
import { Container, Button } from '@/components/public-v2/primitives'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  getPublicV2ChromeCopy,
  getPublicV2Cta,
  getPublicV2NavItems,
  isPublicV2NavItemActive,
  type PublicV2Locale,
} from '@/lib/public-v2/nav'
import BrandLockup from './BrandLockup'
import HeaderScrollShell from './HeaderScrollShell'
import PublicLocaleToggle from './PublicLocaleToggle'
import PublicMobileNav from './PublicMobileNav'
import PublicNavDropdown from './PublicNavDropdown'
import styles from './PublicHeader.module.css'

export type PublicHeaderProps = {
  pathname: string
}

export default function PublicHeader({ pathname }: PublicHeaderProps) {
  const { locale } = useLanguage()
  const loc = locale as PublicV2Locale
  const items = getPublicV2NavItems(pathname, loc)
  const cta = getPublicV2Cta(pathname, loc)
  const chrome = getPublicV2ChromeCopy(loc)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearch(window.location.search || '')
  }, [pathname])

  return (
    <HeaderScrollShell>
      <Container variant="wide" className={styles.shell}>
        <BrandLockup pathname={pathname} />
        <nav aria-label={chrome.primaryNav}>
          <ul className={styles.desktopNav}>
            {items.map((item) => {
              if (item.children?.length) {
                return (
                  <PublicNavDropdown
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    search={search}
                  />
                )
              }
              const active = isPublicV2NavItemActive(item, pathname)
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={[styles.navLink, active ? styles.navLinkActive : '']
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={styles.trailing}>
          <Button href={cta.href} variant="primary" size="sm" className={styles.desktopCta}>
            {cta.label}
          </Button>
          <div className={styles.desktopLocale}>
            <PublicLocaleToggle />
          </div>
          <div className={styles.mobile}>
            <PublicMobileNav
              items={items}
              cta={cta}
              pathname={pathname}
              search={search}
              menuLabel={chrome.mobileMenu}
            />
          </div>
        </div>
      </Container>
    </HeaderScrollShell>
  )
}

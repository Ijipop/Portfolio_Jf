import { Container, Button } from '@/components/public-v2/primitives'
import {
  getPublicV2Cta,
  getPublicV2NavItems,
  isPublicV2NavItemActive,
} from '@/lib/public-v2/nav'
import BrandLockup from './BrandLockup'
import HeaderScrollShell from './HeaderScrollShell'
import PublicMobileNav from './PublicMobileNav'
import styles from './PublicHeader.module.css'

export type PublicHeaderProps = {
  pathname: string
}

export default function PublicHeader({ pathname }: PublicHeaderProps) {
  const items = getPublicV2NavItems(pathname)
  const cta = getPublicV2Cta(pathname)

  return (
    <HeaderScrollShell>
      <Container className={styles.shell}>
        <BrandLockup pathname={pathname} />
        <nav aria-label="Principale">
          <ul className={styles.desktopNav}>
            {items.map((item) => {
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
        <Button href={cta.href} variant="primary" size="sm" className={styles.desktopCta}>
          {cta.label}
        </Button>
        <div className={styles.mobile}>
          <PublicMobileNav items={items} cta={cta} pathname={pathname} />
        </div>
      </Container>
    </HeaderScrollShell>
  )
}

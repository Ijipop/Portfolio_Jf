import { Container, Button } from '@/components/public-v2/primitives'
import { getPublicV2Cta, getPublicV2NavItems } from '@/lib/public-v2/nav'
import BrandLockup from './BrandLockup'
import PublicMobileNav from './PublicMobileNav'
import styles from './PublicHeader.module.css'

export type PublicHeaderProps = {
  pathname: string
}

export default function PublicHeader({ pathname }: PublicHeaderProps) {
  const items = getPublicV2NavItems(pathname)
  const cta = getPublicV2Cta(pathname)

  return (
    <header className={styles.header}>
      <Container className={styles.shell}>
        <BrandLockup pathname={pathname} />
        <nav aria-label="Principale">
          <ul className={styles.desktopNav}>
            {items.map((item) => (
              <li key={item.id}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={cta.href} variant="primary" size="sm" className={styles.desktopCta}>
          {cta.label}
        </Button>
        <div className={styles.mobile}>
          <PublicMobileNav items={items} cta={cta} />
        </div>
      </Container>
    </header>
  )
}

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PopAtelierHomeShell from '../PopAtelierHomeShell'

vi.mock('@/fonts', () => ({
  fraunces: { variable: 'mock-fraunces' },
  outfitV2: { variable: 'mock-outfit-v2' },
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

describe('PopAtelierHomeShell', () => {
  it('monte ThemeRoot, Header, Footer et les six sections une seule fois', { timeout: 15_000 }, () => {
    render(<PopAtelierHomeShell pathname="/" />)

    expect(screen.getAllByTestId('public-theme-root')).toHaveLength(1)
    expect(screen.getByTestId('pv2-home-main')).toBeInTheDocument()
    expect(document.getElementById('pv2-main')).toBeTruthy()

    expect(screen.getByTestId('pv2-hero')).toBeInTheDocument()
    expect(screen.getByTestId('pv2-services')).toBeInTheDocument()
    expect(screen.getByTestId('pv2-work')).toBeInTheDocument()
    expect(screen.getByTestId('pv2-laboratory')).toBeInTheDocument()
    expect(screen.getByTestId('pv2-about')).toBeInTheDocument()
    expect(screen.getByTestId('pv2-contact')).toBeInTheDocument()

    const brandLinks = screen.getAllByRole('link', { name: /Jean-François Lefebvre/i })
    expect(brandLinks.length).toBeGreaterThanOrEqual(1)

    expect(document.getElementById('pv2-lab-foundations')).toBeNull()
    expect(document.querySelector('[data-testid="pv2-foundations-lab"]')).toBeNull()
  })

  it('n’importe ni Prisma, ni MUI, ni chrome V1', () => {
    const src = readFileSync(
      path.join(process.cwd(), 'app/components/public-v2/home/PopAtelierHomeShell.tsx'),
      'utf8',
    )
    expect(src).not.toMatch(/from ['"]@prisma|ThemeWrapper|ContactFab|FullPageTopology|@mui/)
    expect(src).toMatch(/PublicChromeShell/)
  })
})

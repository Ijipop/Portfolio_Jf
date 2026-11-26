import { afterEach, describe, expect, it, vi } from 'vitest'
import { isPublicI18nToggleEnabled } from '../i18nFlag'

describe('isPublicI18nToggleEnabled', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('est désactivé par défaut', () => {
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', undefined)
    expect(isPublicI18nToggleEnabled()).toBe(false)
  })

  it('n’accepte que la valeur exacte true', () => {
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', 'false')
    expect(isPublicI18nToggleEnabled()).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', '1')
    expect(isPublicI18nToggleEnabled()).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_I18N_TOGGLE_ENABLED', 'true')
    expect(isPublicI18nToggleEnabled()).toBe(true)
  })
})

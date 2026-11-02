import { describe, expect, it } from 'vitest'
import { resolveWebAudience } from '../project-web-audience'

describe('resolveWebAudience', () => {
  it('force null pour un logiciel', () => {
    expect(resolveWebAudience('personal', 'logiciel')).toBeNull()
    expect(resolveWebAudience('professional', 'logiciel')).toBeNull()
  })

  it('conserve personal pour un projet web', () => {
    expect(resolveWebAudience('personal', 'web')).toBe('personal')
  })

  it('utilise professional par défaut pour le web', () => {
    expect(resolveWebAudience('professional', 'web')).toBe('professional')
    expect(resolveWebAudience(undefined, 'web')).toBe('professional')
    expect(resolveWebAudience('autre', 'web')).toBe('professional')
  })
})

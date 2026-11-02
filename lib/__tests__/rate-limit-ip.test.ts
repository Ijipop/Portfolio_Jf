import { describe, expect, it } from 'vitest'
import { consumeIpRateLimitOrResponse, getClientIp } from '../rate-limit-ip'
import { makeNextRequest } from './helpers/http'

describe('getClientIp', () => {
  it('prend la première IP de x-forwarded-for', () => {
    const request = makeNextRequest('/api/contact', {
      headers: { 'x-forwarded-for': '203.0.113.10, 10.0.0.1' },
    })
    expect(getClientIp(request)).toBe('203.0.113.10')
  })

  it('utilise x-real-ip en repli', () => {
    const request = makeNextRequest('/api/contact', {
      headers: { 'x-real-ip': '198.51.100.20' },
    })
    expect(getClientIp(request)).toBe('198.51.100.20')
  })

  it('retourne unknown sans en-tête', () => {
    expect(getClientIp(makeNextRequest('/api/contact'))).toBe('unknown')
  })
})

describe('consumeIpRateLimitOrResponse', () => {
  it('autorise jusqu’à maxRequests puis répond 429', () => {
    const keyPrefix = `contact-test-${Date.now()}`
    const ip = '203.0.113.77'
    const options = {
      keyPrefix,
      windowMs: 60_000,
      maxRequests: 3,
      errorBody: { success: false, error: 'Trop de messages' },
    }

    const hit = () =>
      consumeIpRateLimitOrResponse(
        makeNextRequest('/api/contact', { headers: { 'x-forwarded-for': ip } }),
        options,
      )

    expect(hit()).toBeNull()
    expect(hit()).toBeNull()
    expect(hit()).toBeNull()

    const limited = hit()
    expect(limited).not.toBeNull()
    expect(limited?.status).toBe(429)
    expect(limited?.headers.get('Retry-After')).toBeTruthy()
  })

  it('isole les compteurs par IP', () => {
    const keyPrefix = `contact-test-iso-${Date.now()}`
    const options = {
      keyPrefix,
      windowMs: 60_000,
      maxRequests: 1,
      errorBody: { success: false, error: 'Trop de messages' },
    }

    const first = consumeIpRateLimitOrResponse(
      makeNextRequest('/api/contact', { headers: { 'x-forwarded-for': '203.0.113.1' } }),
      options,
    )
    const secondIp = consumeIpRateLimitOrResponse(
      makeNextRequest('/api/contact', { headers: { 'x-forwarded-for': '203.0.113.2' } }),
      options,
    )
    const firstAgain = consumeIpRateLimitOrResponse(
      makeNextRequest('/api/contact', { headers: { 'x-forwarded-for': '203.0.113.1' } }),
      options,
    )

    expect(first).toBeNull()
    expect(secondIp).toBeNull()
    expect(firstAgain?.status).toBe(429)
  })
})

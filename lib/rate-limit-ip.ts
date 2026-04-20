import { NextRequest, NextResponse } from 'next/server'

type Bucket = { count: number; windowStart: number; windowMs: number }

const buckets = new Map<string, Bucket>()
const PRUNE_THRESHOLD = 4000

function pruneStaleBuckets(now: number) {
  if (buckets.size < PRUNE_THRESHOLD) return
  const stale: string[] = []
  buckets.forEach((b, key) => {
    if (now - b.windowStart > b.windowMs * 2) {
      stale.push(key)
    }
  })
  stale.forEach((key) => buckets.delete(key))
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

/**
 * Fenêtre fixe par IP (mémoire du processus). En serverless multi-instances, chaque instance a son propre compteur.
 * Retourne une réponse 429 si la limite est dépassée ; sinon incrémente le compteur et retourne `null`.
 */
export function consumeIpRateLimitOrResponse(
  request: NextRequest,
  options: {
    keyPrefix: string
    windowMs: number
    maxRequests: number
    errorBody: Record<string, unknown>
  }
): NextResponse | null {
  const ip = getClientIp(request)
  const key = `${options.keyPrefix}:${ip}`
  const now = Date.now()
  if (Math.random() < 0.02) {
    pruneStaleBuckets(now)
  }

  const b = buckets.get(key)
  if (!b || now - b.windowStart > options.windowMs) {
    buckets.set(key, { count: 1, windowStart: now, windowMs: options.windowMs })
    return null
  }

  if (b.count >= options.maxRequests) {
    const retryAfterSec = Math.max(1, Math.ceil((b.windowStart + options.windowMs - now) / 1000))
    return NextResponse.json(
      { ...options.errorBody, retryAfterSec },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfterSec) },
      }
    )
  }

  buckets.set(key, {
    count: b.count + 1,
    windowStart: b.windowStart,
    windowMs: b.windowMs,
  })
  return null
}

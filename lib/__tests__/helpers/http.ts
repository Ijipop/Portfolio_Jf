import { NextRequest } from 'next/server'

type MakeNextRequestInit = {
  method?: string
  body?: unknown
  rawBody?: string
  headers?: Record<string, string>
  cookies?: Record<string, string>
}

/** Construit une NextRequest isolée (pas de réseau, pas de cookies de production). */
export function makeNextRequest(path: string, init: MakeNextRequestInit = {}): NextRequest {
  const headers = new Headers(init.headers)
  if (init.cookies) {
    headers.set(
      'cookie',
      Object.entries(init.cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join('; '),
    )
  }
  const hasBody = init.body !== undefined || init.rawBody !== undefined
  if (hasBody && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }
  return new NextRequest(new URL(path, 'http://localhost:3000'), {
    method: init.method ?? (hasBody ? 'POST' : 'GET'),
    headers,
    body: init.rawBody ?? (init.body === undefined ? undefined : JSON.stringify(init.body)),
  })
}

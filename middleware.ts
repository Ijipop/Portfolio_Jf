import { NextRequest, NextResponse } from 'next/server'

function readToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7)
  return request.cookies.get('adminToken')?.value ?? null
}

function isProtectedApi(pathname: string, method: string): boolean {
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') return false
  return (
    pathname.startsWith('/api/projects') ||
    pathname.startsWith('/api/upload') ||
    pathname.startsWith('/api/timelendr/releases') ||
    pathname.startsWith('/api/timelendr/blob-client') ||
    pathname.startsWith('/api/timelendar/releases') ||
    pathname.startsWith('/api/timelendar/blob-client')
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminPage = pathname.startsWith('/admin')
  const requiresAdminPageAuth = isAdminPage && pathname !== '/admin'
  const requiresApiAuth = isProtectedApi(pathname, request.method)

  if (!requiresAdminPageAuth && !requiresApiAuth) {
    return NextResponse.next()
  }

  const token = readToken(request)
  if (!token) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/projects/:path*',
    '/api/upload/:path*',
    '/api/timelendr/:path*',
    '/api/timelendar/:path*',
  ],
}

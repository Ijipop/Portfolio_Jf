import { authAdminToken } from '@/lib/auth-admin-request'
import { NextRequest, NextResponse } from 'next/server'

type AdminJwtPayload = {
  userId?: number
  email?: string
  role?: string
}

export async function GET(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({ authenticated: false, error: auth.error }, { status: auth.status })
  }

  const decoded = auth.decoded as AdminJwtPayload
  return NextResponse.json({
    authenticated: true,
    user: {
      id: decoded.userId ?? null,
      email: decoded.email ?? null,
      role: decoded.role ?? null,
    },
  })
}

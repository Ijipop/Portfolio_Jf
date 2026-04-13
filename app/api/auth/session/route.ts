import { authAdminToken } from '@/lib/auth-admin-request'
import { NextRequest, NextResponse } from 'next/server'

type AdminJwtPayload = {
  userId?: number
  email?: string
  role?: string
}

/**
 * Contrôle de session pour l’admin (client).
 * Réponse 200 + { authenticated: boolean } pour éviter les 401 « bruyants » dans la console
 * quand l’utilisateur n’est tout simplement pas connecté.
 */
export async function GET(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({
      authenticated: false,
      error: auth.error ?? null,
    })
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

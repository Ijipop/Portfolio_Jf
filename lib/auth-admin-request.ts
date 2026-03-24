import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function authAdminToken(
  request: NextRequest
): { ok: true; decoded: unknown } | { ok: false; status: number; error: string } {
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
  const cookieToken = request.cookies.get('adminToken')?.value ?? null
  const token = bearerToken ?? cookieToken
  if (!token) {
    return { ok: false, status: 401, error: "Token d'authentification requis" }
  }
  try {
    if (!process.env.JWT_SECRET) {
      return { ok: false, status: 500, error: 'JWT_SECRET non configuré.' }
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return { ok: true, decoded }
  } catch {
    return { ok: false, status: 401, error: 'Token invalide ou expiré' }
  }
}

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'
import jwt from 'jsonwebtoken'

function authToken(request: NextRequest): { ok: true } | { ok: false; status: number; error: string } {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: "Token d'authentification requis" }
  }
  const token = authHeader.substring(7)
  try {
    if (!process.env.JWT_SECRET) {
      return { ok: false, status: 500, error: 'JWT_SECRET non configuré.' }
    }
    jwt.verify(token, process.env.JWT_SECRET)
    return { ok: true }
  } catch {
    return { ok: false, status: 401, error: 'Token invalide ou expiré' }
  }
}

// DELETE /api/timelendar/releases/[id] — supprimer une version (protégé)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = authToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id) || id <= 0) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      )
    }

    const release = await prisma.timelendarRelease.findUnique({ where: { id } })
    if (!release) {
      return NextResponse.json(
        { success: false, error: 'Version non trouvée' },
        { status: 404 }
      )
    }

    await prisma.timelendarRelease.delete({ where: { id } })

    // Supprimer le fichier du disque (chemin public -> process.cwd() + public)
    const relativePath = release.filePath.startsWith('/') ? release.filePath.slice(1) : release.filePath
    const filePath = path.join(process.cwd(), 'public', relativePath)
    try {
      const { existsSync } = await import('fs')
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    } catch (e) {
      console.warn('Fichier release non supprimé du disque:', filePath, e)
    }

    return NextResponse.json({ success: true, message: 'Version supprimée avec succès' })
  } catch (error) {
    console.error('DELETE timelendar release:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}

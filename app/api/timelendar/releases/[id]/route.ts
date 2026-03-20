import { prisma } from '@/lib/prisma'
import { authAdminToken } from '@/lib/auth-admin-request'
import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'
import { del } from '@vercel/blob'

// DELETE /api/timelendar/releases/[id] — supprimer une version (protégé)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = authAdminToken(request)
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

    const isBlob =
      /^https?:\/\//i.test(release.filePath) &&
      release.filePath.toLowerCase().includes('blob.vercel-storage.com')

    if (isBlob && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        await del(release.filePath)
      } catch (e) {
        console.warn('Blob release non supprimé:', release.filePath, e)
      }
    } else if (!release.filePath.startsWith('http://') && !release.filePath.startsWith('https://')) {
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

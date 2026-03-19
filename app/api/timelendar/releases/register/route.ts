import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { authAdminToken } from '@/lib/auth-admin-request'

const MAX_CHANGELOG = 20_000

function isAllowedBlobUrl(urlString: string): boolean {
  try {
    const u = new URL(urlString)
    if (u.protocol !== 'https:') return false
    const host = u.hostname.toLowerCase()
    return host.endsWith('.public.blob.vercel-storage.com') || host.endsWith('.blob.vercel-storage.com')
  } catch {
    return false
  }
}

/** POST JSON après upload client → Vercel Blob : enregistre la release (petit corps, pas de 413 Vercel). */
export async function POST(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  try {
    const json = (await request.json()) as {
      filePath?: string
      changelog?: string
      version?: string | null
    }

    const filePath = typeof json.filePath === 'string' ? json.filePath.trim() : ''
    if (!filePath || !isAllowedBlobUrl(filePath)) {
      return NextResponse.json(
        {
          success: false,
          error: 'URL de fichier invalide (attendu : URL https Vercel Blob après upload).',
        },
        { status: 400 }
      )
    }

    let changelog = typeof json.changelog === 'string' ? json.changelog.trim() : ''
    if (!changelog) changelog = 'Sans description.'
    if (changelog.length > MAX_CHANGELOG) {
      return NextResponse.json(
        { success: false, error: `Changelog trop long (max ${MAX_CHANGELOG} caractères).` },
        { status: 400 }
      )
    }

    const version =
      typeof json.version === 'string' && json.version.trim() ? json.version.trim() : null

    const release = await prisma.timelendarRelease.create({
      data: {
        filePath,
        changelog,
        version,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: release,
        message: 'Version ajoutée avec succès',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST timelendar register:', error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'enregistrement de la version" },
      { status: 500 }
    )
  }
}

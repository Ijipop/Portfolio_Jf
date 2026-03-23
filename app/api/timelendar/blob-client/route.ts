import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextRequest, NextResponse } from 'next/server'
import { authAdminToken } from '@/lib/auth-admin-request'

const MAX_ZIP_SIZE = 50 * 1024 * 1024 // 50 MB

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { success: false, error: 'Stockage Blob non configuré (BLOB_READ_WRITE_TOKEN).' },
      { status: 503 }
    )
  }

  let body: HandleUploadBody
  try {
    body = (await request.json()) as HandleUploadBody
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 })
  }

  if (body.type === 'blob.generate-client-token') {
    const auth = authAdminToken(request)
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
    }
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const lower = pathname.toLowerCase()
        if (!lower.endsWith('.zip')) {
          throw new Error('Seuls les fichiers .zip sont acceptés')
        }
        return {
          allowedContentTypes: ['application/zip', 'application/x-zip-compressed'],
          maximumSizeInBytes: MAX_ZIP_SIZE,
          addRandomSuffix: true,
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur upload Blob'
    console.error('timelendar blob-client:', error)
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }
}

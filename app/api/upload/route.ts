import { NextRequest, NextResponse } from 'next/server'
import { authAdminToken } from '@/lib/auth-admin-request'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const DOWNLOAD_MAX_BYTES = 50 * 1024 * 1024 // 50 Mo (aligné sur serverActions.bodySizeLimit)

function sanitizeOriginalName(name: string): string {
  return (name || 'file').replace(/[^a-zA-Z0-9.-]/g, '_')
}

function getUploadBlobName(entry: Blob): string {
  if (entry instanceof File && entry.name?.trim()) {
    return entry.name.trim()
  }
  return 'upload.bin'
}

function normalizedMime(mime: string): string {
  return (mime || '').split(';')[0].trim().toLowerCase()
}

function isAllowedDownloadMime(ext: string, mime: string): boolean {
  const m = normalizedMime(mime)
  if (m === '' || m === 'application/octet-stream') return true
  if (ext === '.zip') {
    return (
      m === 'application/zip' ||
      m === 'application/x-zip-compressed' ||
      m === 'multipart/x-zip'
    )
  }
  if (ext === '.exe') {
    return (
      m === 'application/x-msdownload' ||
      m === 'application/vnd.microsoft.portable-executable' ||
      m === 'application/x-dosexec' ||
      m === 'application/x-msdos-program'
    )
  }
  return false
}

// POST /api/upload — image projet (kind=image ou défaut) ou fichier téléchargeable .zip/.exe (kind=download), PROTÉGÉ admin
export async function POST(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  try {
    const formData = await request.formData()
    const raw = formData.get('file')
    const kind = String(formData.get('kind') ?? 'image').toLowerCase()

    if (!raw || typeof raw === 'string') {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    if (!(raw instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: 'Format de fichier invalide' },
        { status: 400 }
      )
    }

    const file = raw
    const sourceName = getUploadBlobName(file)

    if (kind === 'download') {
      const originalName = sanitizeOriginalName(sourceName)
      const ext = path.extname(originalName).toLowerCase()
      if (ext !== '.zip' && ext !== '.exe') {
        return NextResponse.json(
          { success: false, error: 'Extension non autorisée. Utilisez .zip ou .exe' },
          { status: 400 }
        )
      }
      if (!isAllowedDownloadMime(ext, file.type)) {
        return NextResponse.json(
          { success: false, error: 'Type de fichier non reconnu pour cette extension' },
          { status: 400 }
        )
      }
      if (file.size > DOWNLOAD_MAX_BYTES) {
        return NextResponse.json(
          { success: false, error: 'Le fichier est trop volumineux. Taille maximale: 50 Mo' },
          { status: 400 }
        )
      }

      const timestamp = Date.now()
      const fileName = `${timestamp}_${originalName}`
      const uploadDir = path.join(process.cwd(), 'public', 'downloads', 'projets')
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, buffer)

      const publicUrl = `/downloads/projets/${fileName}`

      return NextResponse.json({
        success: true,
        data: {
          url: publicUrl,
          fileName,
          size: file.size,
          type: file.type
        },
        message: 'Fichier uploadé avec succès'
      })
    }

    // kind === image (défaut)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const imageMime = normalizedMime(file.type)
    if (!allowedTypes.includes(imageMime)) {
      return NextResponse.json(
        { success: false, error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, WEBP ou GIF' },
        { status: 400 }
      )
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Le fichier est trop volumineux. Taille maximale: 5MB' },
        { status: 400 }
      )
    }

    const timestamp = Date.now()
    const originalName = sanitizeOriginalName(file.name)
    const fileName = `${timestamp}_${originalName}`

    const uploadDir = path.join(process.cwd(), 'public', 'imgs', 'projets')

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    const imageUrl = `/imgs/projets/${fileName}`

    return NextResponse.json({
      success: true,
      data: {
        url: imageUrl,
        fileName: fileName,
        size: file.size,
        type: file.type
      },
      message: 'Image uploadée avec succès'
    })
  } catch (error) {
    const err = error as NodeJS.ErrnoException & Error
    console.error('Erreur lors de l\'upload:', err?.message, err)

    const code = err?.code
    let message = 'Erreur lors de l\'upload du fichier'
    if (code === 'EROFS' || code === 'EACCES' || code === 'EPERM') {
      message =
        'Écriture impossible sur le disque (dossier protégé ou hébergement sans stockage persistant). En local, vérifiez les droits sur le dossier public/. Sur Vercel, utilisez une URL externe ou un stockage type Blob/S3.'
    } else if (process.env.NODE_ENV === 'development' && err?.message) {
      message = `Upload: ${err.message}`
    }

    return NextResponse.json(
      {
        success: false,
        error: message
      },
      {
        status: 500
      }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
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

function isUploadBlob(value: unknown): value is Blob {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<Blob>
  return typeof candidate.arrayBuffer === 'function' && typeof candidate.size === 'number' && typeof candidate.type === 'string'
}

function normalizedMime(mime: string): string {
  return (mime || '').split(';')[0].trim().toLowerCase()
}

function matchesImageSignature(mime: string, buffer: Buffer): boolean {
  if (buffer.length < 12) return false
  if (mime === 'image/png') {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47
  }
  if (mime === 'image/jpeg' || mime === 'image/jpg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }
  if (mime === 'image/gif') {
    const head = buffer.subarray(0, 6).toString('ascii')
    return head === 'GIF87a' || head === 'GIF89a'
  }
  if (mime === 'image/webp') {
    return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  }
  return false
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

/** Écrit sous `public/…` et renvoie une URL relative. */
async function writePublicFile(diskSubdir: string[], fileName: string, buffer: Buffer): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', ...diskSubdir)
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }
  const filePath = path.join(uploadDir, fileName)
  await writeFile(filePath, buffer)
  return `/${diskSubdir.join('/')}/${fileName}`
}

/**
 * Si `BLOB_READ_WRITE_TOKEN` est défini : Vercel Blob (URL absolue) — chemin préféré en Production.
 * Sinon en local / VPS : écriture dans `public/`.
 * Sur Vercel sans token : erreur explicite (FS non durable).
 */
async function persistUploadedFile(
  blobPathname: string,
  buffer: Buffer,
  contentType: string | undefined,
  diskSubdir: string[],
  fileName: string
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (token) {
    const blob = await put(blobPathname, buffer, {
      access: 'public',
      token,
      contentType: contentType || undefined,
    })
    return blob.url
  }
  if (process.env.VERCEL === '1') {
    throw Object.assign(
      new Error(
        'Upload serveur indisponible : BLOB_READ_WRITE_TOKEN manquant sur Vercel. Configurez Vercel Blob, ou utilisez « Bureau → data URL ».'
      ),
      { code: 'BLOB_TOKEN_MISSING' as const }
    )
  }
  return writePublicFile(diskSubdir, fileName, buffer)
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

    if (!isUploadBlob(raw)) {
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

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const publicUrl = await persistUploadedFile(
        `portfolio/projets-downloads/${fileName}`,
        buffer,
        normalizedMime(file.type) || undefined,
        ['downloads', 'projets'],
        fileName
      )

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

    // kind === image (défaut) ou site-beige-bg (même règles, autre dossier)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const imageMime = normalizedMime(file.type)
    if (!allowedTypes.includes(imageMime)) {
      return NextResponse.json(
        { success: false, error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, WEBP ou GIF' },
        { status: 400 }
      )
    }

    // Sous la limite plateforme Vercel Function (~4,5 Mo / requête)
    const maxSize = 4 * 1024 * 1024 // 4 Mo
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Le fichier est trop volumineux. Taille maximale: 4 Mo' },
        { status: 400 }
      )
    }

    const timestamp = Date.now()
    const originalName = sanitizeOriginalName(sourceName)
    const fileName = `${timestamp}_${originalName}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    if (!matchesImageSignature(imageMime, buffer)) {
      return NextResponse.json(
        { success: false, error: 'Le contenu du fichier ne correspond pas à une image JPEG, PNG, WEBP ou GIF' },
        { status: 400 }
      )
    }

    const isSiteBeigeBg = kind === 'site-beige-bg'
    const imageUrl = await persistUploadedFile(
      isSiteBeigeBg ? `portfolio/site-beige/${fileName}` : `portfolio/projets-images/${fileName}`,
      buffer,
      imageMime || undefined,
      isSiteBeigeBg ? ['imgs', 'site-beige'] : ['imgs', 'projets'],
      fileName
    )

    return NextResponse.json({
      success: true,
      data: {
        url: imageUrl,
        fileName: fileName,
        size: file.size,
        type: file.type
      },
      message: isSiteBeigeBg ? 'Image de fond uploadée' : 'Image uploadée avec succès'
    })
  } catch (error) {
    const err = error as NodeJS.ErrnoException & Error
    console.error('Erreur lors de l\'upload:', err?.message, err)

    const code = err?.code
    let message = 'Erreur lors de l\'upload du fichier'
    let status = 500
    if (code === 'BLOB_TOKEN_MISSING') {
      message = err.message
      status = 503
    } else if (code === 'EROFS' || code === 'EACCES' || code === 'EPERM') {
      message = process.env.BLOB_READ_WRITE_TOKEN
        ? 'Écriture refusée malgré le token Blob — vérifiez BLOB_READ_WRITE_TOKEN et les logs serveur.'
        : 'Impossible d’écrire sur le disque du serveur. Configurez BLOB_READ_WRITE_TOKEN (Vercel Blob) ou utilisez « Bureau → data URL ».'
    } else if (err?.message && (process.env.NODE_ENV === 'development' || code)) {
      message = `Upload: ${err.message}`
    }

    return NextResponse.json(
      {
        success: false,
        error: message
      },
      {
        status
      }
    )
  }
}


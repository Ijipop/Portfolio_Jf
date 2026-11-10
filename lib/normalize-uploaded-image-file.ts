/** MIME autorisés pour l’upload image admin (aligné sur /api/upload). */
export const PROJECT_IMAGE_ALLOWED_MIMES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

const EXT_TO_MIME: Record<string, (typeof PROJECT_IMAGE_ALLOWED_MIMES)[number]> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

function normalizedMime(mime: string): string {
  return (mime || '').split(';')[0].trim().toLowerCase()
}

export function mimeFromImageExtension(fileName: string): string | null {
  const lower = (fileName || '').toLowerCase()
  const dot = lower.lastIndexOf('.')
  if (dot < 0) return null
  return EXT_TO_MIME[lower.slice(dot)] ?? null
}

/**
 * Prépare un File pour FormData /api/upload.
 * - MIME autorisé → fichier inchangé
 * - MIME vide + extension autorisée → nouveau File avec MIME déduit (Windows)
 * - MIME non vide non autorisé → refus
 */
export function normalizeUploadedImageFile(
  file: File
): { ok: true; file: File } | { ok: false; error: string } {
  const mime = normalizedMime(file.type)

  if (mime && (PROJECT_IMAGE_ALLOWED_MIMES as readonly string[]).includes(mime)) {
    return { ok: true, file }
  }

  if (mime) {
    return {
      ok: false,
      error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, WEBP ou GIF',
    }
  }

  const fromExt = mimeFromImageExtension(file.name)
  if (!fromExt) {
    return {
      ok: false,
      error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, WEBP ou GIF',
    }
  }

  return {
    ok: true,
    file: new File([file], file.name, {
      type: fromExt,
      lastModified: file.lastModified,
    }),
  }
}

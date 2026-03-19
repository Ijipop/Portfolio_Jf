import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/** Indique si l’upload direct navigateur → Vercel Blob est disponible (évite le plafond ~4,5 Mo du corps des requêtes serverless). */
export async function GET() {
  return NextResponse.json({
    success: true,
    blobUploadEnabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  })
}

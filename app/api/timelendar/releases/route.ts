import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const UPLOAD_DIR = 'downloads/timelendar'
const MAX_ZIP_SIZE = 25 * 1024 * 1024 // 25 MB

function authToken(request: NextRequest): { ok: true; decoded: unknown } | { ok: false; status: number; error: string } {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: "Token d'authentification requis" }
  }
  const token = authHeader.substring(7)
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

// GET /api/timelendar/releases — liste publique des versions
export async function GET() {
  try {
    const releases = await prisma.timelendarRelease.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: releases })
  } catch (error) {
    console.error('GET timelendar releases:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des versions' },
      { status: 500 }
    )
  }
}

// POST /api/timelendar/releases — upload .zip + changelog (protégé)
export async function POST(request: NextRequest) {
  const auth = authToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const changelog = (formData.get('changelog') as string)?.trim() ?? ''
    const version = (formData.get('version') as string)?.trim() || null

    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier .zip fourni' },
        { status: 400 }
      )
    }

    const name = (file.name || '').toLowerCase()
    if (!name.endsWith('.zip')) {
      return NextResponse.json(
        { success: false, error: 'Seuls les fichiers .zip sont acceptés' },
        { status: 400 }
      )
    }

    if (file.size > MAX_ZIP_SIZE) {
      return NextResponse.json(
        { success: false, error: `Fichier trop volumineux. Taille max: ${MAX_ZIP_SIZE / 1024 / 1024} MB` },
        { status: 400 }
      )
    }

    const baseDir = path.join(process.cwd(), 'public', UPLOAD_DIR)
    if (!existsSync(baseDir)) {
      await mkdir(baseDir, { recursive: true })
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `${timestamp}_${safeName}`
    const filePath = path.join(baseDir, fileName)

    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    const publicPath = `/${UPLOAD_DIR}/${fileName}`.replace(/\/+/g, '/')

    const release = await prisma.timelendarRelease.create({
      data: {
        filePath: publicPath,
        changelog: changelog || 'Sans description.',
        version,
      },
    })

    return NextResponse.json({
      success: true,
      data: release,
      message: 'Version ajoutée avec succès',
    }, { status: 201 })
  } catch (error) {
    console.error('POST timelendar release:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'ajout de la version' },
      { status: 500 }
    )
  }
}

import { prisma } from '@/lib/prisma'
import { authAdminToken } from '@/lib/auth-admin-request'
import { NextRequest, NextResponse } from 'next/server'
import { TimelendrPlatform } from '@prisma/client'

const MAX_CHANGELOG = 20_000

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

const PRIVATE_CACHE_HEADERS = {
  'Cache-Control': 'no-store',
}

const publicReleaseSelect = {
  id: true,
  filePath: true,
  changelog: true,
  version: true,
  platform: true,
  createdAt: true,
} as const

const adminReleaseSelect = {
  ...publicReleaseSelect,
  updatedAt: true,
} as const

function cacheHeadersForRequest(request: NextRequest) {
  return request.cookies.has('adminToken') ? PRIVATE_CACHE_HEADERS : PUBLIC_CACHE_HEADERS
}

function isValidZipUrl(urlString: string): boolean {
  try {
    const u = new URL(urlString)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false
    const full = `${u.pathname}${u.search}`.toLowerCase()
    return full.includes('.zip')
  } catch {
    return false
  }
}

function parsePlatform(raw: unknown): TimelendrPlatform | null {
  if (raw === 'windows' || raw === 'macos' || raw === 'both') return raw
  return null
}

// GET /api/timelendr/releases — liste publique des versions
export async function GET(request: NextRequest) {
  try {
    const mode = request.nextUrl.searchParams.get('mode')
    if (mode === 'latest') {
      const [latestWindows, latestMacos] = await Promise.all([
        prisma.timelendrRelease.findFirst({
          where: { platform: { in: [TimelendrPlatform.windows, TimelendrPlatform.both] } },
          orderBy: { createdAt: 'desc' },
          select: { filePath: true },
        }),
        prisma.timelendrRelease.findFirst({
          where: { platform: { in: [TimelendrPlatform.macos, TimelendrPlatform.both] } },
          orderBy: { createdAt: 'desc' },
          select: { filePath: true },
        }),
      ])

      return NextResponse.json(
        {
          success: true,
          data: {
            windowsUrl: latestWindows?.filePath ?? null,
            macosUrl: latestMacos?.filePath ?? null,
          },
        },
        { headers: cacheHeadersForRequest(request) }
      )
    }

    const isAdminRequest = request.cookies.has('adminToken')
    const releases = await prisma.timelendrRelease.findMany({
      orderBy: { createdAt: 'desc' },
      select: isAdminRequest ? adminReleaseSelect : publicReleaseSelect,
    })
    return NextResponse.json(
      { success: true, data: releases },
      { headers: cacheHeadersForRequest(request) }
    )
  } catch (error) {
    console.error('GET timelendr releases:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des versions' },
      { status: 500 }
    )
  }
}

/** POST JSON — ajouter une version (URL externe vers .zip + changelog) — protégé */
export async function POST(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  try {
    const json = (await request.json()) as {
      fileUrl?: string
      changelog?: string
      version?: string | null
      platform?: string
    }

    const fileUrl = typeof json.fileUrl === 'string' ? json.fileUrl.trim() : ''
    if (!fileUrl || !isValidZipUrl(fileUrl)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'URL invalide : fournissez une adresse http(s) menant à un fichier .zip (le lien doit contenir « .zip »).',
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

    const platform = parsePlatform(json.platform) ?? TimelendrPlatform.both

    const release = await prisma.timelendrRelease.create({
      data: {
        filePath: fileUrl,
        changelog,
        version,
        platform,
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
    console.error('POST timelendr release:', error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'ajout de la version" },
      { status: 500 }
    )
  }
}

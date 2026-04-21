import { NextRequest, NextResponse } from 'next/server'
import { authAdminToken } from '@/lib/auth-admin-request'
import { prisma } from '@/lib/prisma'
import {
  getBeigePresentationBgUrlFromDb,
  parseBeigePresentationBgUrl,
  SITE_APPEARANCE_SINGLETON_ID,
} from '@/lib/site-appearance'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const beigePresentationBgUrl = await getBeigePresentationBgUrlFromDb()
    return NextResponse.json({
      success: true,
      data: { beigePresentationBgUrl },
    })
  } catch (error) {
    console.error('site-appearance GET:', error)
    return NextResponse.json(
      { success: false, error: 'Impossible de lire les réglages du site' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide' }, { status: 400 })
  }

  const raw = typeof body === 'object' && body !== null && 'beigePresentationBgUrl' in body
    ? (body as { beigePresentationBgUrl: unknown }).beigePresentationBgUrl
    : undefined

  const parsed = parseBeigePresentationBgUrl(raw === undefined ? null : raw)
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 })
  }

  try {
    await prisma.siteAppearance.upsert({
      where: { id: SITE_APPEARANCE_SINGLETON_ID },
      create: {
        id: SITE_APPEARANCE_SINGLETON_ID,
        beigePresentationBgUrl: parsed.value,
      },
      update: {
        beigePresentationBgUrl: parsed.value,
      },
    })

    return NextResponse.json({
      success: true,
      data: { beigePresentationBgUrl: parsed.value },
      message: 'Fond du mode Site enregistré',
    })
  } catch (error) {
    console.error('site-appearance PATCH:', error)
    return NextResponse.json(
      { success: false, error: 'Impossible d’enregistrer les réglages' },
      { status: 500 }
    )
  }
}

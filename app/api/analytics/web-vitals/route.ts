import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.name !== 'string' || typeof body.value !== 'number') {
    return NextResponse.json({ ok: false, error: 'Invalid metric payload' }, { status: 400 })
  }

  console.info('[web-vitals]', {
    name: body.name,
    value: body.value,
    rating: body.rating,
    delta: body.delta,
    id: body.id,
    path: body.path,
  })

  return NextResponse.json({ ok: true })
}

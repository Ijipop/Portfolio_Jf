import { NextRequest, NextResponse } from 'next/server'

function parseJsonBody(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text()
    const body = parseJsonBody(raw)

    if (
      !body ||
      typeof body !== 'object' ||
      typeof (body as { name?: unknown }).name !== 'string' ||
      typeof (body as { value?: unknown }).value !== 'number' ||
      Number.isNaN((body as { value: number }).value)
    ) {
      return NextResponse.json({ ok: false, error: 'Invalid metric payload' }, { status: 400 })
    }

    const m = body as {
      name: string
      value: number
      rating?: string
      delta?: number
      id?: string
      path?: string
    }

    console.info('[web-vitals]', {
      name: m.name,
      value: m.value,
      rating: m.rating,
      delta: m.delta,
      id: m.id,
      path: m.path,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[web-vitals] ingest failed', err)
    // Ne pas renvoyer 500 sur une route analytics (évite le bruit console / retries agressifs).
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}

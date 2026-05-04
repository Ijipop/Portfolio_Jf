import { consumeIpRateLimitOrResponse } from '@/lib/rate-limit-ip'
import { NextRequest, NextResponse } from 'next/server'

type Priority = 'high' | 'medium' | 'low'

interface LeadDiagnosis {
  priority: Priority
  summary: string
  recommendedSolution: string
  conversionOpportunities: string[]
  nextQuestions: string[]
}

const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  subject: 180,
  message: 2500,
  briefField: 900,
}

const NEUTRAL_DIAGNOSIS: LeadDiagnosis = {
  priority: 'medium',
  summary: 'Votre demande semble pertinente. Le formulaire peut être envoyé pour une analyse humaine.',
  recommendedSolution: 'Clarifier les objectifs, les pages importantes et les prochaines étapes du projet.',
  conversionOpportunities: [
    'Rendre l’appel à l’action plus évident',
    'Répondre aux questions fréquentes avant la prise de contact',
  ],
  nextQuestions: [
    'Quel résultat concret attendez-vous du site ?',
    'Quelles informations vos visiteurs demandent-ils le plus souvent ?',
  ],
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function readString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length > maxLength) return null
  return trimmed
}

function sanitizeProjectWeb(input: unknown): Record<string, string | boolean> | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null

  const allowedKeys = [
    'siteType',
    'siteTypeOther',
    'mainGoal',
    'pageHome',
    'pageServices',
    'pageProducts',
    'pageAbout',
    'pageContact',
    'pageFaq',
    'pageBlog',
    'pageOther',
    'pagesOtherDetail',
    'contentTexts',
    'contentPhotos',
    'contentBranding',
    'contentNeedHelp',
    'exampleLinks',
    'features',
    'deadline',
    'budget',
  ]

  const source = input as Record<string, unknown>
  const clean: Record<string, string | boolean> = {}

  for (const key of allowedKeys) {
    const value = source[key]
    if (typeof value === 'boolean') {
      clean[key] = value
      continue
    }
    if (typeof value === 'string') {
      if (value.length > MAX_FIELD_LENGTHS.briefField) return null
      clean[key] = value.trim()
    }
  }

  return clean
}

function hasUsefulProjectBrief(projectWeb: Record<string, string | boolean> | null): boolean {
  if (!projectWeb) return false
  const usefulText = ['siteType', 'mainGoal', 'features', 'deadline', 'budget'].some((key) => {
    const value = projectWeb[key]
    return typeof value === 'string' && value.trim().length >= 3
  })
  const usefulPages = Object.entries(projectWeb).some(([key, value]) => {
    return key.startsWith('page') && value === true
  })
  return usefulText || usefulPages
}

function parseJsonFromResponse(content: string): unknown {
  const trimmed = content.trim()
  const jsonMatch = trimmed.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return null
  try {
    return JSON.parse(jsonMatch[0]) as unknown
  } catch {
    return null
  }
}

function toLimitedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLength) return null
  return trimmed
}

function toLimitedStringArray(value: unknown, maxItems: number, maxItemLength: number): string[] | null {
  if (!Array.isArray(value)) return null
  const items = value
    .map((item) => toLimitedString(item, maxItemLength))
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems)
  return items.length > 0 ? items : null
}

function validateDiagnosis(input: unknown): LeadDiagnosis | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const data = input as Record<string, unknown>
  const priority = data.priority === 'high' || data.priority === 'medium' || data.priority === 'low'
    ? data.priority
    : null
  const summary = toLimitedString(data.summary, 450)
  const recommendedSolution = toLimitedString(data.recommendedSolution, 450)
  const conversionOpportunities = toLimitedStringArray(data.conversionOpportunities, 4, 160)
  const nextQuestions = toLimitedStringArray(data.nextQuestions, 4, 180)

  if (!priority || !summary || !recommendedSolution || !conversionOpportunities || !nextQuestions) {
    return null
  }

  return {
    priority,
    summary,
    recommendedSolution,
    conversionOpportunities,
    nextQuestions,
  }
}

function buildPrompt(input: {
  locale: 'fr' | 'en'
  name: string
  email: string
  subject: string
  message: string
  projectWeb: Record<string, string | boolean> | null
}): string {
  const language = input.locale === 'en' ? 'English' : 'French'
  return `You are an AI lead qualification assistant for a small web studio.

Goal: analyze a potential SMB web project and return a concise conversion-focused diagnosis.

Rules:
- Respond only with valid JSON.
- Do not invent budget, dates, or guarantees.
- Keep wording professional and understandable to a small business owner.
- Write all user-facing text in ${language}.
- If details are missing, ask practical next questions instead of guessing.

Return exactly:
{
  "priority": "high" | "medium" | "low",
  "summary": "1-2 sentence summary",
  "recommendedSolution": "recommended website/AI/contact automation solution",
  "conversionOpportunities": ["2 to 4 short opportunities"],
  "nextQuestions": ["2 to 4 short next questions"]
}

Lead:
- Name: ${input.name}
- Email is valid: ${isValidEmail(input.email) ? 'yes' : 'no'}
- Subject: ${input.subject}
- Message: ${input.message}
- Web project brief JSON: ${JSON.stringify(input.projectWeb ?? {})}`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
    if (!body) {
      return NextResponse.json({ success: false, error: 'Requête JSON invalide' }, { status: 400 })
    }

    const honeypot = typeof body.bm_verify === 'string' ? body.bm_verify.trim() : ''
    if (honeypot.length > 0) {
      return NextResponse.json({ success: true, data: NEUTRAL_DIAGNOSIS })
    }

    const limited = consumeIpRateLimitOrResponse(request, {
      keyPrefix: 'ai-lead-diagnosis',
      windowMs: 15 * 60 * 1000,
      maxRequests: 3,
      errorBody: {
        success: false,
        error: 'Trop de diagnostics demandés. Patientez quelques minutes avant de réessayer.',
      },
    })
    if (limited) return limited

    const name = readString(body.name, MAX_FIELD_LENGTHS.name)
    const email = readString(body.email, MAX_FIELD_LENGTHS.email)
    const subject = readString(body.subject, MAX_FIELD_LENGTHS.subject) ?? ''
    const message = readString(body.message, MAX_FIELD_LENGTHS.message) ?? ''
    const projectWeb = sanitizeProjectWeb(body.projectWeb)
    const locale = body.locale === 'en' ? 'en' : 'fr'

    if (!name || name.length < 2 || !email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Nom et email valide requis avant le diagnostic.' },
        { status: 400 }
      )
    }

    const hasUsefulMessage = subject.length >= 3 && message.length >= 20
    if (!hasUsefulMessage && !hasUsefulProjectBrief(projectWeb)) {
      return NextResponse.json(
        { success: false, error: 'Ajoutez un message ou un brief projet plus détaillé avant le diagnostic.' },
        { status: 400 }
      )
    }

    if (body.projectWeb && projectWeb === null) {
      return NextResponse.json({ success: false, error: 'Brief projet invalide ou trop long.' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OPENAI_API_KEY non configuré')
      return NextResponse.json({ success: false, error: 'Configuration API manquante' }, { status: 500 })
    }

    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey, timeout: 12_000 })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You return only valid JSON and never include markdown.',
        },
        { role: 'user', content: buildPrompt({ locale, name, email, subject, message, projectWeb }) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.35,
      max_tokens: 450,
    })

    const rawContent = completion.choices[0]?.message?.content
    if (!rawContent) {
      return NextResponse.json({ success: false, error: 'Réponse OpenAI vide' }, { status: 500 })
    }

    const diagnosis = validateDiagnosis(parseJsonFromResponse(rawContent))
    if (!diagnosis) {
      return NextResponse.json({ success: false, error: 'Réponse OpenAI invalide' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: diagnosis })
  } catch (error) {
    console.error('Erreur API lead diagnosis:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la génération du diagnostic' },
      { status: 500 }
    )
  }
}

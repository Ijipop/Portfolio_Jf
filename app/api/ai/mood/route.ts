import { consumeIpRateLimitOrResponse } from '@/lib/rate-limit-ip'
import { NextRequest, NextResponse } from 'next/server'
import { THEMES, getAvailableThemes, type ThemeName } from '@/design-system/themes'

function buildMoodPrompt(mood: string, locale: string): string {
  const lang = locale === 'en' ? 'English' : 'French'
  const themeLines = getAvailableThemes()
    .map((name) => {
      const theme = THEMES[name] as { moodHint: string; name: string }
      return `- ${name} : ${theme.moodHint}`
    })
    .join('\n')
  return `Tu es un assistant bienveillant. L'utilisateur décrit son humeur en quelques mots.

Thèmes disponibles (choisis exactement un qui correspond le mieux à son humeur) :
${themeLines}

Réponds UNIQUEMENT par un objet JSON valide, sans markdown ni texte autour, avec exactement ces deux clés :
- "themeName" : un des noms ci-dessus (en minuscules)
- "message" : une courte phrase bienveillante ou d'ambiance (1 ligne, rédigée en ${lang})

Humeur décrite : "${mood}"`
}

function parseJsonFromResponse(content: string): { themeName?: string; message?: string } | null {
  const trimmed = content.trim()
  const jsonMatch = trimmed.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return null
  try {
    return JSON.parse(jsonMatch[0]) as { themeName?: string; message?: string }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const mood = typeof body.mood === 'string' ? body.mood.trim() : ''
    if (!mood) {
      return NextResponse.json(
        { success: false, error: 'Le champ humeur est requis' },
        { status: 400 }
      )
    }
    const MOOD_MAX = 400
    if (mood.length > MOOD_MAX) {
      return NextResponse.json({ success: false, error: 'Texte trop long' }, { status: 400 })
    }

    const limited = consumeIpRateLimitOrResponse(request, {
      keyPrefix: 'ai-mood',
      windowMs: 15 * 60 * 1000,
      maxRequests: 45,
      errorBody: {
        success: false,
        error: 'Trop de requêtes. Patientez quelques minutes avant de réessayer.',
      },
    })
    if (limited) return limited

    const locale = body.locale === 'en' || body.locale === 'fr' ? body.locale : 'fr'

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OPENAI_API_KEY non configuré')
      return NextResponse.json(
        { success: false, error: 'Configuration API manquante' },
        { status: 500 }
      )
    }

    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey })
    const prompt = buildMoodPrompt(mood, locale)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Tu réponds uniquement en JSON valide, sans markdown.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })

    const rawContent = completion.choices[0]?.message?.content
    if (!rawContent) {
      return NextResponse.json(
        { success: false, error: 'Réponse OpenAI vide' },
        { status: 500 }
      )
    }

    const parsed = parseJsonFromResponse(rawContent)
    if (!parsed || !parsed.themeName || !parsed.message) {
      return NextResponse.json(
        { success: false, error: 'Réponse OpenAI invalide' },
        { status: 500 }
      )
    }

    const validThemes = getAvailableThemes()
    const themeName = validThemes.includes(parsed.themeName as ThemeName)
      ? (parsed.themeName as ThemeName)
      : 'default'

    return NextResponse.json({
      success: true,
      data: {
        message: String(parsed.message).trim(),
        themeName,
      },
    })
  } catch (error) {
    console.error('Erreur API mood:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la génération de l\'ambiance',
      },
      { status: 500 }
    )
  }
}

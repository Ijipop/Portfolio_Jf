import { consumeIpRateLimitOrResponse } from '@/lib/rate-limit-ip'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

/** Ne pas instancier Resend au chargement du module : sans RESEND_API_KEY le constructeur lance et provoque un 500. */
function createResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return null
  return new Resend(key)
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Styles inline pour rendu correct dans Gmail / Outlook / Apple Mail */
const TD_LABEL =
  'padding:10px 14px;border:1px solid #dee2e6;background:#f1f3f5;font-weight:600;width:34%;vertical-align:top;color:#212529;font-size:14px;'
const TD_VALUE =
  'padding:10px 14px;border:1px solid #dee2e6;vertical-align:top;color:#212529;font-size:14px;line-height:1.5;'
const TABLE =
  'width:100%;max-width:720px;border-collapse:collapse;margin:0 0 16px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;'

function emailRow(label: string, value: string): string {
  const cell = escapeHtml(value).replace(/\n/g, '<br />')
  return `<tr><td style="${TD_LABEL}">${escapeHtml(label)}</td><td style="${TD_VALUE}">${cell}</td></tr>`
}

function wrapTable(rows: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="${TABLE}">${rows}</table>`
}

const SITE_TYPE_LABELS: Record<string, string> = {
  vitrine: 'Site vitrine / présentation d’entreprise',
  portfolio: 'Site créatif / galerie de projets',
  boutique: 'Boutique en ligne',
  rdv: 'Prise de rendez-vous / réservation',
  app: 'Application web / espace client',
  other: 'Autre',
}

const BUDGET_LABELS: Record<string, string> = {
  under1000: 'Moins de 1000 $',
  '1000_2500': '1000 $ à 2500 $',
  '2500plus': '2500 $ et plus',
  discuss: 'À discuter',
}

type AiPriority = 'high' | 'medium' | 'low'

interface SafeAiDiagnosis {
  priority: AiPriority
  summary: string
  recommendedSolution: string
  conversionOpportunities: string[]
  nextQuestions: string[]
}

const AI_PRIORITY_LABELS: Record<AiPriority, string> = {
  high: 'Priorité élevée',
  medium: 'Priorité moyenne',
  low: 'Priorité basse',
}

function formatProjectWebHtml(pw: Record<string, unknown>): string | null {
  const rows: string[] = []

  const siteType = typeof pw.siteType === 'string' ? pw.siteType : ''
  if (siteType && SITE_TYPE_LABELS[siteType]) {
    let val = SITE_TYPE_LABELS[siteType]
    if (siteType === 'other' && typeof pw.siteTypeOther === 'string' && pw.siteTypeOther.trim()) {
      val += ` — ${pw.siteTypeOther.trim()}`
    }
    rows.push(emailRow('Type de site', val))
  }

  if (typeof pw.mainGoal === 'string' && pw.mainGoal.trim()) {
    rows.push(emailRow('Objectif principal', pw.mainGoal.trim()))
  }

  const sectionBits: string[] = []
  if (pw.pageHome === true) sectionBits.push('Accueil')
  if (pw.pageServices === true) sectionBits.push('Services')
  if (pw.pageProducts === true) sectionBits.push('Produits')
  if (pw.pageAbout === true) sectionBits.push('À propos')
  if (pw.pageContact === true) sectionBits.push('Contact')
  if (pw.pageFaq === true) sectionBits.push('FAQ')
  if (pw.pageBlog === true) sectionBits.push('Blogue')
  if (pw.pageOther === true) {
    const detail = typeof pw.pagesOtherDetail === 'string' ? pw.pagesOtherDetail.trim() : ''
    sectionBits.push(detail ? `Autre — ${detail}` : 'Autre')
  }
  if (sectionBits.length) {
    rows.push(emailRow('Pages / sections', sectionBits.join(', ')))
  }

  if (typeof pw.pagesSections === 'string' && pw.pagesSections.trim()) {
    rows.push(emailRow('Pages / sections (texte)', pw.pagesSections.trim()))
  }

  const contentBits: string[] = []
  if (pw.contentTexts === true) contentBits.push('Textes')
  if (pw.contentPhotos === true) contentBits.push('Photos / logo')
  if (pw.contentBranding === true) contentBits.push('Couleurs / identité visuelle')
  if (pw.contentNeedHelp === true) contentBits.push('Besoin d’aide pour le contenu')
  if (contentBits.length) {
    rows.push(emailRow('Contenu prêt', contentBits.join(', ')))
  }

  if (typeof pw.exampleLinks === 'string' && pw.exampleLinks.trim()) {
    rows.push(emailRow('Exemples de sites', pw.exampleLinks.trim()))
  }

  if (typeof pw.features === 'string' && pw.features.trim()) {
    rows.push(emailRow('Fonctionnalités', pw.features.trim()))
  }

  if (typeof pw.deadline === 'string' && pw.deadline.trim()) {
    rows.push(emailRow('Échéance', pw.deadline.trim()))
  }

  const budget = typeof pw.budget === 'string' ? pw.budget : ''
  if (budget && BUDGET_LABELS[budget]) {
    rows.push(emailRow('Budget', BUDGET_LABELS[budget]))
  }

  if (rows.length === 0) return null

  return `
    <hr style="border:none;border-top:1px solid #dee2e6;margin:24px 0;" />
    <h3 style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;color:#212529;margin:0 0 12px 0;">Demande de projet web</h3>
    ${wrapTable(rows.join(''))}
  `
}

function toLimitedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLength) return null
  return trimmed
}

function toLimitedStringArray(value: unknown, maxItems: number, maxItemLength: number): string[] | null {
  if (!Array.isArray(value)) return null
  const clean = value
    .map((item) => toLimitedString(item, maxItemLength))
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems)
  return clean.length > 0 ? clean : null
}

function parseAiDiagnosis(input: unknown): SafeAiDiagnosis | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const data = input as Record<string, unknown>
  const priority =
    data.priority === 'high' || data.priority === 'medium' || data.priority === 'low'
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

function listRow(label: string, values: string[]): string {
  return emailRow(label, values.map((value) => `• ${value}`).join('\n'))
}

function formatAiDiagnosisHtml(input: unknown): string {
  const diagnosis = parseAiDiagnosis(input)
  if (!diagnosis) return ''

  const rows = [
    emailRow('Priorité IA', AI_PRIORITY_LABELS[diagnosis.priority]),
    emailRow('Résumé IA', diagnosis.summary),
    emailRow('Solution recommandée', diagnosis.recommendedSolution),
    listRow('Opportunités de conversion', diagnosis.conversionOpportunities),
    listRow('Questions à poser', diagnosis.nextQuestions),
  ].join('')

  return `
    <hr style="border:none;border-top:1px solid #dee2e6;margin:24px 0;" />
    <h3 style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;color:#212529;margin:0 0 12px 0;">Diagnostic IA de qualification</h3>
    ${wrapTable(rows)}
  `
}

function resendErrorToMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const m = (error as { message: unknown }).message
    if (typeof m === 'string' && m.trim()) return m.trim()
  }
  return 'Erreur lors de l\'envoi du message'
}

// POST /api/contact - Envoyer un message de contact via Resend
export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>
    try {
      body = (await request.json()) as Record<string, unknown>
    } catch {
      return NextResponse.json(
        { success: false, error: 'Requête JSON invalide' },
        { status: 400 }
      )
    }

    const hp =
      typeof body.bm_verify === 'string' ? body.bm_verify.trim() : ''
    if (hp.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
      })
    }

    const limited = consumeIpRateLimitOrResponse(request, {
      keyPrefix: 'contact',
      windowMs: 60 * 60 * 1000,
      maxRequests: 8,
      errorBody: {
        success: false,
        error: 'Trop de messages envoyés depuis cette adresse. Réessayez plus tard.',
      },
    })
    if (limited) return limited

    const { name, email, subject, message, projectWeb, aiDiagnosis } = body

    // Validation des champs
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string' ||
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tous les champs sont requis'
        },
        { status: 400 }
      )
    }

    const phoneRaw = body.phone
    let phone = ''
    if (phoneRaw !== undefined && phoneRaw !== null) {
      if (typeof phoneRaw !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Le champ téléphone est invalide' },
          { status: 400 }
        )
      }
      phone = phoneRaw.trim()
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Format d\'email invalide'
        },
        { status: 400 }
      )
    }

    const MAX_LEN = { name: 200, email: 254, subject: 300, message: 16000, phone: 50 }
    if (
      name.length > MAX_LEN.name ||
      email.length > MAX_LEN.email ||
      subject.length > MAX_LEN.subject ||
      message.length > MAX_LEN.message ||
      phone.length > MAX_LEN.phone
    ) {
      return NextResponse.json({ success: false, error: 'Contenu trop long' }, { status: 400 })
    }

    if (phone.length > 0 && (phone.length < 6 || !/\d/.test(phone))) {
      return NextResponse.json(
        { success: false, error: 'Numéro de téléphone invalide' },
        { status: 400 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'ijipop82@gmail.com'
    if (!process.env.CONTACT_EMAIL) {
      console.warn(
        '[contact] CONTACT_EMAIL non défini — utilisation du repli. Définissez CONTACT_EMAIL sur Vercel (Production).'
      )
    }
    const resend = createResendClient()
    if (!resend) {
      console.error('[contact] RESEND_API_KEY manquant ou vide — ajoutez-le dans Portfolio/.env.local et redémarrez next dev')
      return NextResponse.json(
        { success: false, error: 'Configuration email manquante (RESEND_API_KEY)' },
        { status: 500 }
      )
    }

    let projectSection = ''
    if (projectWeb && typeof projectWeb === 'object' && !Array.isArray(projectWeb)) {
      const formatted = formatProjectWebHtml(projectWeb as Record<string, unknown>)
      if (formatted) {
        projectSection = formatted
      }
    }
    const aiDiagnosisSection = formatAiDiagnosisHtml(aiDiagnosis)

    // Expéditeur : domaine vérifié dans Resend (ex. contact@votredomaine.com). Voir RESEND_FROM sur Vercel.
    const fromAddress =
      process.env.RESEND_FROM?.trim() || 'Ijipop Contact <onboarding@resend.dev>'

    if (fromAddress.includes('onboarding@resend.dev')) {
      console.warn(
        '[contact] Expéditeur Resend par défaut (onboarding@resend.dev). En test, seuls les destinataires vérifiés chez Resend reçoivent le mail — voir dashboard Resend → Emails / Logs. Utilisez un domaine vérifié + RESEND_FROM pour la prod.'
      )
    }

    const mainRows = [
      emailRow('Nom', String(name)),
      emailRow('E-mail (répondre)', String(email)),
      ...(phone ? [emailRow('Téléphone', phone)] : []),
      emailRow('Sujet', String(subject)),
      emailRow('Message', String(message)),
    ].join('')

    const htmlBody = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#212529;">
        <p style="margin:0 0 12px 0;font-size:15px;font-weight:600;">Nouveau message — Ijipop</p>
        ${wrapTable(mainRows)}
        ${aiDiagnosisSection}
        ${projectSection}
      </div>
    `

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject: `[Ijipop] ${subject}`,
      html: htmlBody,
    })

    if (error) {
      const errMsg = resendErrorToMessage(error)
      console.error('[contact] Erreur Resend:', JSON.stringify(error, null, 2))
      if (/not verified|domain is not verified/i.test(errMsg)) {
        console.warn(
          '[contact] Le domaine dans RESEND_FROM doit correspondre à un domaine « Verified » dans le même compte Resend que RESEND_API_KEY. Voir https://resend.com/domains'
        )
      }
      return NextResponse.json(
        { success: false, error: errMsg },
        { status: 500 }
      )
    }

    console.info('[contact] Resend a accepté le message', {
      resendId: data?.id ?? null,
      to: contactEmail,
    })

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
    })
  } catch (error) {
    console.error('[contact] Exception:', error)
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Erreur lors de l\'envoi du message'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

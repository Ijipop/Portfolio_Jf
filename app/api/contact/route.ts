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

const SITE_TYPE_LABELS: Record<string, string> = {
  vitrine: 'Site vitrine / présentation d’entreprise',
  portfolio: 'Portfolio',
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

function formatProjectWebHtml(pw: Record<string, unknown>): string | null {
  const parts: string[] = []

  const siteType = typeof pw.siteType === 'string' ? pw.siteType : ''
  if (siteType && SITE_TYPE_LABELS[siteType]) {
    let line = `<p><strong>Type de site :</strong> ${escapeHtml(SITE_TYPE_LABELS[siteType])}</p>`
    if (siteType === 'other' && typeof pw.siteTypeOther === 'string' && pw.siteTypeOther.trim()) {
      line += `<p><strong>Précision :</strong> ${escapeHtml(pw.siteTypeOther.trim())}</p>`
    }
    parts.push(line)
  }

  if (typeof pw.mainGoal === 'string' && pw.mainGoal.trim()) {
    parts.push(`<p><strong>Objectif principal :</strong><br>${escapeHtml(pw.mainGoal.trim()).replace(/\n/g, '<br />')}</p>`)
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
    parts.push(`<p><strong>Pages / sections :</strong> ${escapeHtml(sectionBits.join(', '))}</p>`)
  }

  if (typeof pw.pagesSections === 'string' && pw.pagesSections.trim()) {
    parts.push(`<p><strong>Pages / sections (texte) :</strong><br>${escapeHtml(pw.pagesSections.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  const contentBits: string[] = []
  if (pw.contentTexts === true) contentBits.push('Textes')
  if (pw.contentPhotos === true) contentBits.push('Photos / logo')
  if (pw.contentBranding === true) contentBits.push('Couleurs / identité visuelle')
  if (pw.contentNeedHelp === true) contentBits.push('Besoin d’aide pour le contenu')
  if (contentBits.length) {
    parts.push(`<p><strong>Contenu prêt :</strong> ${escapeHtml(contentBits.join(', '))}</p>`)
  }

  if (typeof pw.exampleLinks === 'string' && pw.exampleLinks.trim()) {
    parts.push(`<p><strong>Exemples de sites :</strong><br>${escapeHtml(pw.exampleLinks.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  if (typeof pw.features === 'string' && pw.features.trim()) {
    parts.push(`<p><strong>Fonctionnalités :</strong><br>${escapeHtml(pw.features.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  if (typeof pw.deadline === 'string' && pw.deadline.trim()) {
    parts.push(`<p><strong>Échéance :</strong> ${escapeHtml(pw.deadline.trim())}</p>`)
  }

  const budget = typeof pw.budget === 'string' ? pw.budget : ''
  if (budget && BUDGET_LABELS[budget]) {
    parts.push(`<p><strong>Budget :</strong> ${escapeHtml(BUDGET_LABELS[budget])}</p>`)
  }

  if (parts.length === 0) return null

  return `
    <hr />
    <h3>Demande de projet web</h3>
    ${parts.join('\n')}
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

    const { name, email, subject, message, projectWeb } = body

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

    // Expéditeur : domaine vérifié dans Resend (ex. contact@votredomaine.com). Voir RESEND_FROM sur Vercel.
    const fromAddress =
      process.env.RESEND_FROM?.trim() || 'Portfolio Contact <onboarding@resend.dev>'

    if (fromAddress.includes('onboarding@resend.dev')) {
      console.warn(
        '[contact] Expéditeur Resend par défaut (onboarding@resend.dev). En test, seuls les destinataires vérifiés chez Resend reçoivent le mail — voir dashboard Resend → Emails / Logs. Utilisez un domaine vérifié + RESEND_FROM pour la prod.'
      )
    }

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <p><strong>De:</strong> ${escapeHtml(String(name))} &lt;${escapeHtml(String(email))}&gt;</p>
        <p><strong>Sujet:</strong> ${escapeHtml(String(subject))}</p>
        <hr />
        <p>${escapeHtml(String(message)).replace(/\n/g, '<br />')}</p>
        ${projectSection}
      `
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

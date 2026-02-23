import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// POST /api/contact - Envoyer un message de contact via Resend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation des champs
    if (!name || !email || !subject || !message) {
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
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquant')
      return NextResponse.json(
        { success: false, error: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
    })
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'envoi du message'
      },
      { status: 500 }
    )
  }
}



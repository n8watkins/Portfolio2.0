import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { resend, EMAIL_CONFIG } from '@/lib/email/resend'
import { createContactEmailHtml, createAutoReplyHtml } from '@/lib/email/templates'
import { subjectOptions } from '@/lib/validations/contact'

// Security: Rate limiting with cleanup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Security: Periodic cleanup to prevent memory leaks
function cleanupRateLimit() {
  const now = Date.now()
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  })
}

// Initialize cleanup interval once
if (typeof global.rateLimitCleanupInterval === 'undefined') {
  global.rateLimitCleanupInterval = setInterval(cleanupRateLimit, 60 * 60 * 1000) // Every hour
}

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 3

  // Clean up expired entry for this key
  const entry = rateLimitMap.get(key)
  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(key)
  }

  const currentEntry = rateLimitMap.get(key)

  if (!currentEntry) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (currentEntry.count >= maxRequests) {
    return false
  }

  currentEntry.count++
  return true
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification')
    return process.env.NODE_ENV === 'development' // Only allow in dev
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true && data.score > 0.5 // reCAPTCHA v3 score check
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Security: Request size limiting
    const MAX_BODY_SIZE = 10 * 1024 // 10KB
    const bodyText = await request.text()

    if (bodyText.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    // Security: Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = JSON.parse(bodyText)
    const validatedData = contactFormSchema.parse(body)

    // Security: Check honeypot field
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      console.warn('Bot detected via honeypot field')
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    // Security: Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptcha)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Get subject label for email
    const subjectLabel = subjectOptions.find(opt => opt.value === validatedData.subject)?.label || validatedData.subject

    try {
      // Send notification email to Nathan
      const contactEmailHtml = createContactEmailHtml(validatedData)

      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.to,
        subject: `💼 New Contact Form Submission from ${validatedData.name}`,
        html: contactEmailHtml,
        text: `
New contact form submission:

From: ${validatedData.name} (${validatedData.email})
${validatedData.company ? `Company: ${validatedData.company}` : ''}
Subject: ${subjectLabel}

Message:
${validatedData.message}

---
Sent from your portfolio contact form at ${new Date().toLocaleString()}
        `.trim(),
      })

      // Send auto-reply to sender
      const autoReplyHtml = createAutoReplyHtml(validatedData.name)

      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: validatedData.email,
        subject: '🎉 Thanks for reaching out!',
        html: autoReplyHtml,
        text: `
Hi ${validatedData.name},

Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.

I'll review your message and get back to you within 24 hours. In the meantime, feel free to:
• Check out my latest projects on the portfolio
• Connect with me on LinkedIn: https://www.linkedin.com/in/nathancwatkins/
• Follow my work on GitHub: https://github.com/natkins23

Looking forward to our conversation! 🚀

Best regards,
Nathan Watkins
Full-Stack Developer
        `.trim(),
      })

    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)

    // Security: Don't expose detailed validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle CORS for development
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'https://nathansportfolio.vercel.app',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { resend, EMAIL_CONFIG } from '@/lib/email/resend'
import { createContactEmailHtml, createAutoReplyHtml } from '@/lib/email/templates'
import { subjectOptions } from '@/lib/validations/contact'

// Security: Rate limiting with cleanup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Debug function to clear rate limits (only in development)
function clearRateLimit(key: string) {
  if (process.env.NODE_ENV === 'development') {
    rateLimitMap.delete(key)
    console.log('🧹 Cleared rate limit for key:', key)
  }
}

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
  const maxRequests = process.env.NODE_ENV === 'development' ? 50 : 3 // Higher limit for development

  console.log('🔍 Rate limit check:', { key, maxRequests, env: process.env.NODE_ENV })

  // Clean up expired entry for this key
  const entry = rateLimitMap.get(key)
  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(key)
    console.log('🧹 Cleaned up expired rate limit entry for key:', key)
  }

  const currentEntry = rateLimitMap.get(key)

  if (!currentEntry) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    console.log('✅ First request for key:', key)
    return true
  }

  console.log('📊 Current entry:', { count: currentEntry.count, maxRequests })

  if (currentEntry.count >= maxRequests) {
    console.log('❌ Rate limit exceeded for key:', key, 'count:', currentEntry.count)
    return false
  }

  currentEntry.count++
  console.log('✅ Request allowed for key:', key, 'new count:', currentEntry.count)
  return true
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  // Skip reCAPTCHA verification in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('🔐 Development mode: Skipping reCAPTCHA verification')
    return true
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification')
    return false
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

    // For reCAPTCHA v3, check both success and score
    // Score ranges from 0.0 (very likely a bot) to 1.0 (very likely a human)
    const isValid = data.success === true && data.score >= 0.5

    console.log('reCAPTCHA verification:', {
      success: data.success,
      score: data.score,
      action: data.action,
      isValid
    })

    return isValid
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  console.log('🚀 Contact API called')
  try {
    // Security: Request size limiting
    const MAX_BODY_SIZE = 10 * 1024 // 10KB
    const bodyText = await request.text()
    console.log('📄 Body size:', bodyText.length, 'bytes')

    if (bodyText.length > MAX_BODY_SIZE) {
      console.log('❌ Request too large')
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    // Security: Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    console.log('🔑 Rate limit key:', rateLimitKey)

    // Clear rate limit for localhost/development testing
    if (process.env.NODE_ENV === 'development' && rateLimitKey.includes('localhost')) {
      clearRateLimit(rateLimitKey)
    }

    if (!checkRateLimit(rateLimitKey)) {
      console.log('❌ Rate limit exceeded')
      return NextResponse.json(
        {
          error: 'You\'ve reached the submission limit (3 per hour). Please try again later or email me directly at nathancwatkins23@gmail.com.',
          type: 'rate_limit'
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = JSON.parse(bodyText)
    console.log('📝 Form data received:', { name: body.name, email: body.email, subject: body.subject })
    const validatedData = contactFormSchema.parse(body)
    console.log('✅ Validation passed')

    // Security: Check honeypot field
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      console.warn('Bot detected via honeypot field')
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    // Security: Verify reCAPTCHA
    console.log('🔐 Verifying reCAPTCHA...')
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptcha)
    console.log('🔐 reCAPTCHA valid:', isRecaptchaValid)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Get subject label for email
    const subjectLabel = subjectOptions.find(opt => opt.value === validatedData.subject)?.label || validatedData.subject

    try {
      console.log('📧 Sending notification email to:', EMAIL_CONFIG.to)
      // Send notification email to Nathan
      const contactEmailHtml = createContactEmailHtml(validatedData)

      const notificationResult = await resend.emails.send({
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
      console.log('✅ Notification email sent:', notificationResult.data?.id)

      console.log('📧 Sending auto-reply to:', validatedData.email)
      // Send auto-reply to sender
      const autoReplyHtml = createAutoReplyHtml(validatedData.name)

      const autoReplyResult = await resend.emails.send({
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
      console.log('✅ Auto-reply email sent:', autoReplyResult.data?.id)

    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    console.log('🎉 Contact form submission successful!')
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
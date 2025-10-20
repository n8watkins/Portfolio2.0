import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { resend, EMAIL_CONFIG } from '@/lib/email/resend'
import { createContactEmailHtml, createAutoReplyHtml } from '@/lib/email/templates'
import { subjectOptions } from '@/lib/validations/contact'
import { logger } from '@/lib/logger'

// Global type declaration for rate limit cleanup interval
declare global {
  var rateLimitCleanupInterval: NodeJS.Timeout | undefined
}

// Configuration constants
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX_REQUESTS_PROD = 2 // 2 requests per hour in production
const RATE_LIMIT_MAX_REQUESTS_DEV = 50 // Higher limit for testing
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 60 * 1000 // Clean up expired entries every hour
const MAX_REQUEST_BODY_SIZE = 10 * 1024 // 10KB maximum request size
const RECAPTCHA_MIN_SCORE = 0.5 // Google recommends 0.5 for forms (0.0=bot, 1.0=human)

// Security: Rate limiting with cleanup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Debug function to clear rate limits (only in development)
function clearRateLimit(key: string) {
  if (process.env.NODE_ENV === 'development') {
    rateLimitMap.delete(key)
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
  global.rateLimitCleanupInterval = setInterval(cleanupRateLimit, RATE_LIMIT_CLEANUP_INTERVAL_MS)
}

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = RATE_LIMIT_WINDOW_MS
  const maxRequests = process.env.NODE_ENV === 'development'
    ? RATE_LIMIT_MAX_REQUESTS_DEV
    : RATE_LIMIT_MAX_REQUESTS_PROD


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
  // Skip reCAPTCHA verification in development mode
  if (process.env.NODE_ENV === 'development') {
    logger.info('🔐 Development mode: Skipping reCAPTCHA verification')
    return true
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    logger.warn('RECAPTCHA_SECRET_KEY not set, skipping verification')
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
    const isValid = data.success === true && data.score >= RECAPTCHA_MIN_SCORE

    logger.info('reCAPTCHA verification:', {
      success: data.success,
      score: data.score,
      action: data.action,
      isValid
    })

    return isValid
  } catch (error) {
    logger.error('reCAPTCHA verification error:', error)
    return false
  }
}

/**
 * POST /api/contact - Handle contact form submissions
 *
 * SECURITY LAYERS:
 * 1. Request size validation (10KB limit)
 * 2. Rate limiting (2 requests/hour in production)
 * 3. Input validation (Zod schema)
 * 4. Honeypot field check (bot detection)
 * 5. reCAPTCHA v3 verification (score-based)
 *
 * FLOW:
 * 1. Validate request size
 * 2. Check rate limit
 * 3. Parse and validate form data
 * 4. Security checks (honeypot + reCAPTCHA)
 * 5. Send notification email (to site owner)
 * 6. Send auto-reply email (to submitter)
 */
export async function POST(request: NextRequest) {
  logger.info('🚀 Contact API called')
  try {
    // ========================================
    // STEP 1: Request Size Validation
    // Prevents DoS attacks via large payloads
    // ========================================
    const bodyText = await request.text()
    logger.info('📄 Body size:', bodyText.length, 'bytes')

    if (bodyText.length > MAX_REQUEST_BODY_SIZE) {
      logger.info('❌ Request too large')
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    // ========================================
    // STEP 2: Rate Limiting
    // Production: 2 requests/hour per IP
    // Development: 50 requests/hour for testing
    // ========================================
    const rateLimitKey = getRateLimitKey(request)
    logger.info('🔑 Rate limit key:', rateLimitKey)

    // Clear rate limit for localhost/development testing
    if (process.env.NODE_ENV === 'development' && rateLimitKey.includes('localhost')) {
      clearRateLimit(rateLimitKey)
    }

    if (!checkRateLimit(rateLimitKey)) {
      logger.info('❌ Rate limit exceeded')
      return NextResponse.json(
        {
          error: 'Your message didn\'t go through due to our submission limit. Please try again in an hour, or feel free to reach out to me directly at nathancwatkins23@gmail.com — I\'d love to hear from you!',
          type: 'rate_limit'
        },
        { status: 429 }
      )
    }

    // ========================================
    // STEP 3: Input Validation
    // Zod schema validates: name, email, subject, message length
    // ========================================
    const body = JSON.parse(bodyText)
    logger.info('📝 Form data received:', { name: body.name, email: body.email, subject: body.subject })
    const validatedData = contactFormSchema.parse(body)
    logger.info('✅ Validation passed')

    // ========================================
    // STEP 4: Security Checks
    // A) Honeypot: Hidden field must be empty (bots often fill it)
    // B) reCAPTCHA v3: Score-based verification (0.5+ threshold)
    // ========================================
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      logger.warn('🤖 Bot detected via honeypot field')
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    logger.info('🔐 Verifying reCAPTCHA...')
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptcha)
    logger.info('🔐 reCAPTCHA valid:', isRecaptchaValid)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // ========================================
    // STEP 5: Send Emails
    // Sends both notification (to me) and auto-reply (to sender)
    // ========================================
    const subjectLabel = subjectOptions.find(opt => opt.value === validatedData.subject)?.label || validatedData.subject

    try {
      logger.info('📧 Sending notification email to:', EMAIL_CONFIG.to)
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
      logger.info('✅ Notification email sent:', notificationResult.data?.id)

      logger.info('📧 Sending auto-reply to:', validatedData.email)
      // Send auto-reply to sender
      const autoReplyHtml = createAutoReplyHtml(validatedData)

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
• Connect with me on LinkedIn: https://www.linkedin.com/in/n8watkins/
• Follow my work on GitHub: https://github.com/n8watkins

Looking forward to our conversation! 🚀

Best regards,
Nathan Watkins
Full-Stack Developer
        `.trim(),
      })
      logger.info('✅ Auto-reply email sent:', autoReplyResult.data?.id)

    } catch (emailError) {
      logger.error('Email sending error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    logger.info('🎉 Contact form submission successful!')
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    logger.error('Contact form submission error:', error)

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
  const allowedOrigin = process.env.NODE_ENV === 'development'
    ? '*'
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://nathansportfolio.vercel.app'

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
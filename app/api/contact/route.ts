import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { logger } from '@/lib/logger'
import { getRateLimitKey, checkRateLimit, clearRateLimit } from '@/lib/security/rateLimiter'
import { verifyRecaptcha, validateHoneypot } from '@/lib/security/recaptcha'
import { validateRequestSize, parseJsonBody } from '@/lib/security/validation'
import { sendContactEmails } from '@/lib/email/sender'

/**
 * POST /api/contact - Handle contact form submissions
 *
 * SECURITY LAYERS:
 * 1. Request size validation (10KB limit)
 * 2. Rate limiting (5 requests/hour in production)
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
    const sizeValidation = validateRequestSize(bodyText)

    if (!sizeValidation.success) {
      return NextResponse.json(
        { error: sizeValidation.error },
        { status: sizeValidation.statusCode }
      )
    }

    // ========================================
    // STEP 2: Rate Limiting
    // Production: 5 requests/hour per IP
    // Development: 50 requests/hour for testing
    // Test: Bypassed with x-bypass-rate-limit header (except for rate limiter tests)
    // ========================================
    const bypassRateLimit = request.headers.get('x-bypass-rate-limit') === 'true'

    if (!bypassRateLimit) {
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
    } else {
      logger.info('⏭️ Rate limit bypassed for test')
    }

    // ========================================
    // STEP 3: Input Validation
    // Zod schema validates: name, email, subject, message length
    // ========================================
    const parseResult = parseJsonBody(bodyText)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error },
        { status: parseResult.statusCode }
      )
    }

    const body = parseResult.data
    logger.info('📝 Form data received:', {
      name: (body as ContactFormData).name,
      email: (body as ContactFormData).email,
      subject: (body as ContactFormData).subject
    })

    const validatedData = contactFormSchema.parse(body)
    logger.info('✅ Validation passed')

    // ========================================
    // STEP 4: Security Checks
    // A) Honeypot: Hidden field must be empty (bots often fill it)
    // B) reCAPTCHA v3: Score-based verification (0.5+ threshold)
    // ========================================
    if (!validateHoneypot(validatedData.honeypot)) {
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
    const emailResult = await sendContactEmails(validatedData)

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.error },
        { status: 500 }
      )
    }

    logger.info('🎉 Contact form submission successful!')
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    logger.error('❌ Contact form submission error:', error)

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

/**
 * OPTIONS /api/contact - Handle CORS for development
 * Allows cross-origin requests in development mode
 */
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

import { logger } from '@/lib/logger'

/**
 * reCAPTCHA v3 Verification
 * Validates reCAPTCHA tokens and scores to prevent bot submissions
 */

// Google recommends 0.5 for forms (0.0=bot, 1.0=human)
const RECAPTCHA_MIN_SCORE = 0.5

/**
 * reCAPTCHA API response structure
 */
interface RecaptchaResponse {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

/**
 * Verify reCAPTCHA v3 token with Google's API
 * Skips verification in development mode for easier testing
 *
 * @param token - reCAPTCHA token from client
 * @returns true if verification succeeds and score >= threshold, false otherwise
 *
 * @example
 * ```ts
 * const isValid = await verifyRecaptcha(token)
 * if (!isValid) {
 *   return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 })
 * }
 * ```
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  // Skip reCAPTCHA verification in development mode
  if (process.env.NODE_ENV === 'development') {
    logger.info('🔐 Development mode: Skipping reCAPTCHA verification')
    return true
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    logger.warn('⚠️ RECAPTCHA_SECRET_KEY not set, skipping verification')
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

    const data: RecaptchaResponse = await response.json()

    // For reCAPTCHA v3, check both success and score
    // Score ranges from 0.0 (very likely a bot) to 1.0 (very likely a human)
    const isValid = data.success === true && (data.score || 0) >= RECAPTCHA_MIN_SCORE

    logger.info('🔐 reCAPTCHA verification:', {
      success: data.success,
      score: data.score,
      action: data.action,
      isValid,
    })

    return isValid
  } catch (error) {
    logger.error('❌ reCAPTCHA verification error:', error)
    return false
  }
}

/**
 * Validate honeypot field
 * Honeypot is a hidden field that should remain empty
 * Bots often fill all fields automatically, revealing themselves
 *
 * @param honeypot - Value from honeypot field (should be empty string)
 * @returns true if honeypot is empty (valid submission), false if filled (bot detected)
 *
 * @example
 * ```ts
 * if (!validateHoneypot(formData.honeypot)) {
 *   return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
 * }
 * ```
 */
export function validateHoneypot(honeypot: string | undefined): boolean {
  if (honeypot && honeypot.length > 0) {
    logger.warn('🤖 Bot detected via honeypot field')
    return false
  }
  return true
}

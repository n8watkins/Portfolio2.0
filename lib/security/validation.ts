import { logger } from '@/lib/logger'

/**
 * Request Validation Utilities
 * Validates request size and structure to prevent abuse
 */

// 10KB maximum request size (prevents DoS attacks)
const MAX_REQUEST_BODY_SIZE = 10 * 1024

/**
 * Validation result structure
 */
export interface ValidationResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}

/**
 * Validate request body size
 * Prevents DoS attacks via large payloads
 *
 * @param bodyText - Raw request body text
 * @returns ValidationResult with success/error and appropriate status code
 *
 * @example
 * ```ts
 * const bodyText = await request.text()
 * const validation = validateRequestSize(bodyText)
 * if (!validation.success) {
 *   return NextResponse.json({ error: validation.error }, { status: validation.statusCode })
 * }
 * ```
 */
export function validateRequestSize(bodyText: string): ValidationResult<string> {
  logger.info('📄 Request body size:', bodyText.length, 'bytes')

  if (bodyText.length > MAX_REQUEST_BODY_SIZE) {
    logger.warn('❌ Request too large:', bodyText.length, 'bytes (max:', MAX_REQUEST_BODY_SIZE, ')')
    return {
      success: false,
      error: 'Request too large',
      statusCode: 413,
    }
  }

  return {
    success: true,
    data: bodyText,
  }
}

/**
 * Parse and validate JSON body
 * Safely parses JSON and handles parsing errors
 *
 * @param bodyText - Raw request body text
 * @returns ValidationResult with parsed data or error
 *
 * @example
 * ```ts
 * const result = parseJsonBody(bodyText)
 * if (!result.success) {
 *   return NextResponse.json({ error: result.error }, { status: result.statusCode })
 * }
 * const data = result.data
 * ```
 */
export function parseJsonBody<T = unknown>(bodyText: string): ValidationResult<T> {
  try {
    const data = JSON.parse(bodyText) as T
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error('❌ JSON parsing error:', error)
    return {
      success: false,
      error: 'Invalid JSON in request body',
      statusCode: 400,
    }
  }
}

/**
 * Logger utility for consistent logging across the application.
 * In production, only warnings and errors are logged to reduce noise.
 * In development, all log levels are available.
 *
 * SECURITY: Error objects are sanitized to prevent leaking sensitive data
 * like API keys, tokens, or environment variables in production logs.
 */

const isDev = process.env.NODE_ENV === 'development'

/**
 * Sanitize error objects to prevent logging sensitive information
 * In production, only logs the error message and name
 * In development, logs the full error for debugging
 */
function sanitizeError(error: unknown): string | unknown {
  if (!isDev && error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      // Don't include stack trace or other properties that might contain sensitive data
    }
  }
  return error
}

export const logger = {
  /**
   * Log informational messages (development only)
   */
  info: (...args: unknown[]) => {
    if (isDev) console.log(...args)
  },

  /**
   * Log warnings (always logged)
   * Sanitizes error objects in production
   */
  warn: (...args: unknown[]) => {
    const sanitized = args.map(arg => (arg instanceof Error ? sanitizeError(arg) : arg))
    console.warn(...sanitized)
  },

  /**
   * Log errors (always logged)
   * Sanitizes error objects in production to prevent leaking sensitive data
   */
  error: (...args: unknown[]) => {
    const sanitized = args.map(arg => (arg instanceof Error ? sanitizeError(arg) : arg))
    console.error(...sanitized)
  },

  /**
   * Log debug information (development only)
   */
  debug: (...args: unknown[]) => {
    if (isDev) console.debug(...args)
  },
}

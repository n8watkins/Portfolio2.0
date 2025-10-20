/**
 * Logger utility for consistent logging across the application.
 * In production, only warnings and errors are logged to reduce noise.
 * In development, all log levels are available.
 */

const isDev = process.env.NODE_ENV === 'development'

export const logger = {
  /**
   * Log informational messages (development only)
   */
  info: (...args: unknown[]) => {
    if (isDev) console.log(...args)
  },

  /**
   * Log warnings (always logged)
   */
  warn: (...args: unknown[]) => {
    console.warn(...args)
  },

  /**
   * Log errors (always logged)
   */
  error: (...args: unknown[]) => {
    console.error(...args)
  },

  /**
   * Log debug information (development only)
   */
  debug: (...args: unknown[]) => {
    if (isDev) console.debug(...args)
  },
}

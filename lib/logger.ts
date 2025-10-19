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
  info: (...args: any[]) => {
    if (isDev) console.log(...args)
  },

  /**
   * Log warnings (always logged)
   */
  warn: (...args: any[]) => {
    console.warn(...args)
  },

  /**
   * Log errors (always logged)
   */
  error: (...args: any[]) => {
    console.error(...args)
  },

  /**
   * Log debug information (development only)
   */
  debug: (...args: any[]) => {
    if (isDev) console.debug(...args)
  },
}

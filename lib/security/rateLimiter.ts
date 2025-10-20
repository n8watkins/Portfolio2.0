import { NextRequest } from 'next/server'

/**
 * Rate Limiter Configuration
 * Prevents spam and abuse by limiting requests per IP address
 */

// Configuration constants
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX_REQUESTS_PROD = 5 // 5 requests per hour in production
const RATE_LIMIT_MAX_REQUESTS_DEV = 50 // Higher limit for testing
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 60 * 1000 // Clean up expired entries every hour

/**
 * Rate limit entry structure
 * Tracks count and reset time for each IP address
 */
interface RateLimitEntry {
  count: number
  resetTime: number
}

/**
 * In-memory store for rate limiting
 * Key: IP address
 * Value: { count, resetTime }
 */
const rateLimitMap = new Map<string, RateLimitEntry>()

/**
 * Global type declaration for rate limit cleanup interval
 */
declare global {
  var rateLimitCleanupInterval: NodeJS.Timeout | undefined
}

/**
 * Cleanup expired rate limit entries
 * Prevents memory leaks by removing entries past their reset time
 */
function cleanupRateLimit() {
  const now = Date.now()
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  })
}

/**
 * Initialize cleanup interval once
 * Runs every hour to remove expired entries
 */
if (typeof global.rateLimitCleanupInterval === 'undefined') {
  global.rateLimitCleanupInterval = setInterval(cleanupRateLimit, RATE_LIMIT_CLEANUP_INTERVAL_MS)
}

/**
 * Extract rate limit key from request
 * Uses forwarded IP (from proxy) or direct IP
 *
 * @param request - Next.js request object
 * @returns IP address string
 */
export function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
  return ip
}

/**
 * Check if request is within rate limit
 * Automatically creates entry for new IPs
 * Automatically cleans up expired entries
 *
 * @param key - IP address (from getRateLimitKey)
 * @returns true if request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(key: string): boolean {
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

  // First request from this IP
  if (!currentEntry) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  // Rate limit exceeded
  if (currentEntry.count >= maxRequests) {
    return false
  }

  // Increment count and allow request
  currentEntry.count++
  return true
}

/**
 * Clear rate limit for a specific key (development only)
 * Useful for testing without waiting for reset time
 *
 * @param key - IP address to clear
 */
export function clearRateLimit(key: string): void {
  if (process.env.NODE_ENV === 'development') {
    rateLimitMap.delete(key)
  }
}

/**
 * Get current rate limit status for a key
 * Useful for debugging and monitoring
 *
 * @param key - IP address to check
 * @returns Current entry or null if not found
 */
export function getRateLimitStatus(key: string): RateLimitEntry | null {
  return rateLimitMap.get(key) || null
}

/**
 * Cleanup and stop the rate limit interval
 * Useful for graceful shutdown in long-running Node.js servers
 *
 * Note: In serverless environments (e.g., Vercel), this is not necessary
 * as the process is short-lived and will be terminated automatically.
 *
 * @example
 * ```ts
 * // On server shutdown
 * process.on('SIGTERM', () => {
 *   cleanupRateLimiterInterval()
 *   server.close()
 * })
 * ```
 */
export function cleanupRateLimiterInterval(): void {
  if (global.rateLimitCleanupInterval) {
    clearInterval(global.rateLimitCleanupInterval)
    global.rateLimitCleanupInterval = undefined
    rateLimitMap.clear()
  }
}

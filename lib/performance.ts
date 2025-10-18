import { trackWebVital } from './analytics'

/**
 * Web Vitals metric interface
 */
interface WebVitalMetric {
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  id: string
  delta: number
  navigationType: string
}

/**
 * Thresholds for Web Vitals metrics
 * Based on Google's recommended values
 */
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
}

/**
 * Get the rating for a metric value
 */
function getRating(name: WebVitalMetric['name'], value: number): WebVitalMetric['rating'] {
  const threshold = THRESHOLDS[name]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Format metric value for display
 */
function formatValue(name: string, value: number): string {
  // CLS is unitless, others are in milliseconds
  if (name === 'CLS') {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

/**
 * Get emoji for rating
 */
function getRatingEmoji(rating: string): string {
  switch (rating) {
    case 'good':
      return '✅'
    case 'needs-improvement':
      return '⚠️'
    case 'poor':
      return '❌'
    default:
      return '❓'
  }
}

/**
 * Log web vital to console with formatting
 */
function logWebVital(metric: WebVitalMetric) {
  const rating = metric.rating || getRating(metric.name, metric.value)
  const emoji = getRatingEmoji(rating)
  const formattedValue = formatValue(metric.name, metric.value)

  // Color-coded console output
  const styles = {
    good: 'color: #0f0; font-weight: bold',
    'needs-improvement': 'color: #ff0; font-weight: bold',
    poor: 'color: #f00; font-weight: bold',
  }

  console.log(
    `%c${emoji} ${metric.name}: ${formattedValue} (${rating})`,
    styles[rating] || 'color: #888'
  )

  // Detailed info in development
  if (process.env.NODE_ENV === 'development') {
    console.table({
      Metric: metric.name,
      Value: formattedValue,
      Rating: rating,
      Delta: formatValue(metric.name, metric.delta),
      ID: metric.id,
      Navigation: metric.navigationType,
    })
  }
}

/**
 * Report web vitals to analytics and console
 */
export function reportWebVitals(metric: WebVitalMetric) {
  // Log to console
  logWebVital(metric)

  // Track in analytics
  trackWebVital({
    name: metric.name,
    value: metric.value,
    rating: metric.rating || getRating(metric.name, metric.value),
    id: metric.id,
    delta: metric.delta,
    navigationType: metric.navigationType,
  })
}

/**
 * Get all web vitals thresholds
 */
export function getWebVitalsThresholds() {
  return THRESHOLDS
}
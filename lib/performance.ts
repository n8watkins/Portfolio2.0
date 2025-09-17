import { trackWebVital } from './analytics'

export function reportWebVitals(metric: any) {
  // Track all Web Vitals metrics
  trackWebVital({
    name: metric.name,
    value: metric.value,
    rating: metric.rating || 'unknown',
    id: metric.id,
  })

}
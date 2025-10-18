// Analytics utility functions for tracking user interactions

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

interface EventParameters {
  event_category?: string
  event_label?: string
  value?: number
  project_name?: string
  section?: string
  platform?: string
  modal_type?: string
  metric_name?: string
  metric_value?: number
  metric_rating?: string
  [key: string]: any
}

/**
 * Track custom events in Google Analytics
 */
export const trackEvent = (eventName: string, parameters: EventParameters = {}) => {
  // Only track in production or when GA_ID is configured
  if (typeof window === 'undefined' || !window.gtag || !process.env.NEXT_PUBLIC_GA_ID) {
    return
  }

  try {
    window.gtag('event', eventName, {
      event_category: 'Portfolio',
      ...parameters,
    })
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}

/**
 * Track project-related interactions
 */
export const trackProjectEvent = (action: string, projectName: string, additionalData: EventParameters = {}) => {
  trackEvent(`project_${action}`, {
    event_category: 'Project Interaction',
    project_name: projectName,
    event_label: projectName,
    ...additionalData,
  })
}

/**
 * Track navigation and section views
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'Navigation',
    section: sectionName,
    event_label: sectionName,
  })
}

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string, url: string) => {
  trackEvent('social_click', {
    event_category: 'Social Media',
    platform,
    event_label: platform,
    url,
  })
}

/**
 * Track modal interactions
 */
export const trackModalEvent = (action: 'open' | 'close', modalType: string, additionalData: EventParameters = {}) => {
  trackEvent(`modal_${action}`, {
    event_category: 'Modal Interaction',
    modal_type: modalType,
    event_label: modalType,
    ...additionalData,
  })
}

/**
 * Track scroll depth and engagement
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'Engagement',
    value: depth,
    event_label: `${depth}%`,
  })
}

/**
 * Track Web Vitals performance metrics
 */
export const trackWebVital = (metric: {
  name: string
  value: number
  rating: string
  id: string
  delta?: number
  navigationType?: string
}) => {
  trackEvent('web_vital', {
    event_category: 'Performance',
    metric_name: metric.name,
    metric_value: Math.round(metric.value),
    metric_rating: metric.rating,
    metric_delta: metric.delta ? Math.round(metric.delta) : undefined,
    navigation_type: metric.navigationType,
    event_label: metric.name,
    value: Math.round(metric.value),
  })
}

/**
 * Track resume downloads/views
 */
export const trackResumeEvent = (action: 'view' | 'download') => {
  trackEvent(`resume_${action}`, {
    event_category: 'Resume',
    event_label: action,
  })
}

/**
 * Track contact form interactions
 */
export const trackContactEvent = (
  action: 'view' | 'field_focus' | 'submit_attempt' | 'submit_success' | 'submit_error' | 'recaptcha_complete',
  field?: string,
  additionalData: EventParameters = {}
) => {
  trackEvent(`contact_form_${action}`, {
    event_category: 'Contact Form',
    event_label: field || action,
    field,
    ...additionalData,
  })
}
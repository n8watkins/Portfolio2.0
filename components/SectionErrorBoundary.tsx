'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { logger } from '@/lib/logger'

interface Props {
  children: ReactNode
  sectionName: string
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Section-level Error Boundary
 *
 * Provides granular error isolation for individual page sections.
 * If one section fails, others continue to render normally.
 *
 * BENEFITS:
 * - Better UX: Page remains partially functional when one section fails
 * - Better debugging: Logs include specific section name
 * - Better monitoring: Can track which sections fail most often
 * - Graceful degradation: Shows fallback UI instead of blank screen
 *
 * USAGE:
 * ```tsx
 * <SectionErrorBoundary sectionName="Hero Section">
 *   <Hero />
 * </SectionErrorBoundary>
 * ```
 */
class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { sectionName } = this.props

    // Log error with section context
    logger.error(`❌ Error in ${sectionName}:`, error, errorInfo)

    // Report to health endpoint (non-blocking)
    if (typeof window !== 'undefined') {
      fetch('/api/health/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionName,
          error: error.message,
          stack: error.stack?.substring(0, 1000),
          timestamp: new Date().toISOString(),
          url: window.location.href,
        }),
      }).catch(() => {
        // Silently fail if health endpoint is unavailable
      })
    }
  }

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise show default
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="w-full py-12 px-4 bg-red-50 dark:bg-red-900/10 rounded-lg border-2 border-red-200 dark:border-red-800">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
              {this.props.sectionName} Unavailable
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              This section encountered an error and couldn&apos;t be displayed. The rest of the portfolio is still available.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-red-600 dark:text-red-400">
                  Error Details (Dev Mode)
                </summary>
                <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/20 p-3 rounded overflow-auto max-h-40">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default SectionErrorBoundary

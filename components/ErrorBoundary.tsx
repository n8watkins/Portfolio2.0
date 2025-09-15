'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo)

    // Report error to health endpoint (non-blocking)
    if (typeof window !== 'undefined') {
      fetch('/api/health/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack?.substring(0, 1000), // Limit stack trace size
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
      return (
        <div className="min-h-screen bg-blue-400 dark:bg-darkBlue flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-darkBlue dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-darkBlue dark:text-slate-300 mb-6">
              The portfolio encountered an unexpected error. Please refresh the page to try again.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Refresh Page
              </button>
              <br />
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 text-darkBlue dark:text-slate-300 hover:text-purple-500 transition-colors"
              >
                Return to Home
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-red-600 dark:text-red-400">
                  Error Details (Dev Mode)
                </summary>
                <pre className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded overflow-auto">
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

export default ErrorBoundary
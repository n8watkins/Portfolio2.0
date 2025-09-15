'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ContactFormErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Contact form error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😅</div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Something went wrong
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Please refresh the page or email me directly at{' '}
            <a
              href="mailto:nathancwatkins@gmail.com"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              nathancwatkins@gmail.com
            </a>
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
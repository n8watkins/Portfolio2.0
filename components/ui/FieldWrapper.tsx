import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FieldWrapperProps {
  label: string
  error?: string
  emoji?: string
  id?: string
  children: ReactNode
  charCount?: number
  maxChars?: number
}

export const FieldWrapper = ({
  label,
  error,
  emoji,
  id,
  children,
  charCount,
  maxChars,
}: FieldWrapperProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1"
        >
          {emoji && <span>{emoji}</span>}
          {label}
        </label>
        {maxChars !== undefined && (
          <span
            className={cn(
              'text-xs',
              charCount && charCount > maxChars * 0.9
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {charCount || 0}/{maxChars}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  )
}

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContactInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  emoji?: string
}

export const ContactInput = forwardRef<HTMLInputElement, ContactInputProps>(
  ({ label, error, emoji, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1"
        >
          {emoji && <span>{emoji}</span>}
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600",
            "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
            "placeholder-slate-500 dark:placeholder-slate-400",
            "focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            "transition-all duration-200",
            "hover:border-slate-400 dark:hover:border-slate-500",
            error && "border-red-500 dark:border-red-400 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

ContactInput.displayName = 'ContactInput'
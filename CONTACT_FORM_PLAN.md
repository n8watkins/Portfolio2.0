# Contact Form Implementation Plan 📋

## Overview 🎯
Replace the current email link with a comprehensive contact form that matches the portfolio's style, includes DDOS protection via Google reCAPTCHA, and reflects Nathan's personality with strategic emoji usage.

## Current State Analysis 🔍

### Existing Contact Section:
- **Location**: Footer.tsx (lines 24-38)
- **Current CTA**: "Ready to bring fresh talent to your team?"
- **Current Action**: Simple mailto link with MagicButton
- **Style**: Purple gradient heading, white text, MagicButton with purple gradient border

### Design Patterns to Follow:
- **Colors**: Blue/Purple gradients, `text-purple-500` for highlights
- **Components**: MagicButton, BorderBeam, gradient backgrounds
- **Typography**: Bold headings, clean sans-serif
- **Animations**: Smooth transitions, hover effects
- **Spacing**: Consistent padding/margins matching existing layout

## Technical Architecture 🏗️

### Dependencies to Add:
```json
{
  "react-hook-form": "^7.48.2",
  "@hookform/resolvers": "^3.3.2",
  "zod": "^3.22.4", // Already installed
  "react-google-recaptcha": "^3.1.0",
  "resend": "^2.1.0" // For email service
}
```

### Environment Variables:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
RESEND_API_KEY=your_resend_key
```

## Form Design & UX 🎨

### Form Fields:
1. **Name** 👤
   - Required field
   - Validation: 2-50 characters
   - Placeholder: "Your name"

2. **Email** 📧
   - Required field
   - Email validation
   - Placeholder: "your.email@company.com"

3. **Company** 🏢
   - Optional field
   - Placeholder: "Company name (optional)"

4. **Subject** 💼
   - Required field
   - Dropdown options:
     - "💼 Let's work together"
     - "🚀 New project opportunity"
     - "💡 Collaboration idea"
     - "📞 General inquiry"
     - "🤝 Networking"

5. **Message** 💬
   - Required field
   - Textarea, 10-1000 characters
   - Placeholder: "Tell me about your project or how I can help..."

6. **reCAPTCHA** 🤖
   - Google reCAPTCHA v2
   - Themed to match dark/light mode

### Success/Error States:
- **Success**: "🎉 Message sent! I'll get back to you within 24 hours."
- **Error**: "😅 Oops! Something went wrong. Please try again or email me directly."
- **Loading**: Shimmer effect on submit button

## Copy & Messaging 📝

### Header:
```
"Let's build something amazing together! 🚀"
```

### Subheading:
```
"Got a project in mind? Need a fresh perspective?
Or just want to chat about the latest in web development?
Drop me a line – I'd love to hear from you! 💬"
```

### Form Labels with Emojis:
- Name: "👤 Your Name"
- Email: "📧 Email Address"
- Company: "🏢 Company (Optional)"
- Subject: "💼 What's this about?"
- Message: "💬 Tell me more"

### Submit Button:
```
"Send Message 🚀"
```

### Footer Text:
```
"Prefer email? Reach me directly at nathancwatkins@gmail.com ✉️"
```

## Implementation Plan 📋

# PHASE-BY-PHASE DETAILED IMPLEMENTATION

## 🚀 Phase 1: Setup & Dependencies (Day 1)

### Overview
Set up the foundation for the contact form including all necessary dependencies, environment configuration, validation schemas, and email service setup.

### Step 1.1: Install Required Dependencies
```bash
npm install react-hook-form @hookform/resolvers react-google-recaptcha resend
npm install --save-dev @types/react-google-recaptcha
```

**Why these packages:**
- `react-hook-form`: Performant forms with minimal re-renders
- `@hookform/resolvers`: Zod integration for react-hook-form
- `react-google-recaptcha`: Official Google reCAPTCHA component
- `resend`: Modern email API service (better than SendGrid/Mailgun for dev experience)

### Step 1.2: Environment Variables Setup
Create/update `.env.local`:
```env
# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL_TO=nathancwatkins@gmail.com
CONTACT_EMAIL_FROM=contact@yourdomain.com
```

Update `.env.local.example`:
```env
# Add these new variables
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RESEND_API_KEY=
CONTACT_EMAIL_TO=your@email.com
CONTACT_EMAIL_FROM=contact@yourdomain.com
```

### Step 1.3: Create Validation Schema
**File:** `lib/validations/contact.ts`
```typescript
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  subject: z
    .enum([
      'work_together',
      'project_opportunity',
      'collaboration',
      'general_inquiry',
      'networking'
    ], {
      errorMap: () => ({ message: 'Please select a subject' }),
    }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  recaptcha: z
    .string()
    .min(1, 'Please complete the reCAPTCHA verification'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const subjectOptions = [
  { value: 'work_together', label: '💼 Let\'s work together' },
  { value: 'project_opportunity', label: '🚀 New project opportunity' },
  { value: 'collaboration', label: '💡 Collaboration idea' },
  { value: 'general_inquiry', label: '📞 General inquiry' },
  { value: 'networking', label: '🤝 Networking' },
] as const
```

### Step 1.4: Set up Resend Service
**File:** `lib/email/resend.ts`
```typescript
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_CONFIG = {
  to: process.env.CONTACT_EMAIL_TO || 'nathancwatkins@gmail.com',
  from: process.env.CONTACT_EMAIL_FROM || 'Contact Form <contact@nathansportfolio.vercel.app>',
} as const
```

### Step 1.5: Create Email Templates
**File:** `lib/email/templates.ts`
```typescript
import { ContactFormData } from '@/lib/validations/contact'
import { subjectOptions } from '@/lib/validations/contact'

export function createContactEmailHtml(data: ContactFormData): string {
  const subjectLabel = subjectOptions.find(opt => opt.value === data.subject)?.label || data.subject

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
          .message-box { margin-top: 15px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #dee2e6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Contact Form Submission</h1>
            <p>You've received a new message through your portfolio!</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 From:</div>
              <div class="value">${data.name} (${data.email})</div>
            </div>

            ${data.company ? `
            <div class="field">
              <div class="label">🏢 Company:</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="label">💼 Subject:</div>
              <div class="value">${subjectLabel}</div>
            </div>

            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
            </div>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="font-size: 12px; color: #6c757d; text-align: center;">
              Sent from your portfolio contact form • ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function createAutoReplyHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .emoji { font-size: 2em; }
          .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="emoji">🎉</div>
            <h1>Thanks for reaching out!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>

            <p>Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.</p>

            <p>I'll review your message and get back to you within 24 hours. In the meantime, feel free to:</p>
            <ul>
              <li>🔍 Check out my latest projects on the portfolio</li>
              <li>💼 Connect with me on <a href="https://www.linkedin.com/in/nathancwatkins/">LinkedIn</a></li>
              <li>⭐ Follow my work on <a href="https://github.com/natkins23">GitHub</a></li>
            </ul>

            <p>Looking forward to our conversation! 🚀</p>

            <div class="signature">
              <p><strong>Best regards,</strong><br>
              Nathan Watkins<br>
              <em>Full-Stack Developer</em></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}
```

### Step 1.6: Update Analytics
**File:** `lib/analytics.ts` (add new functions)
```typescript
// Add these new tracking functions to your existing analytics.ts

export const trackContactEvent = (action: 'view' | 'field_focus' | 'submit_attempt' | 'submit_success' | 'submit_error' | 'recaptcha_complete', field?: string, additionalData: EventParameters = {}) => {
  trackEvent(`contact_form_${action}`, {
    event_category: 'Contact Form',
    event_label: field || action,
    field,
    ...additionalData,
  })
}
```

---

## 🎨 Phase 2: Form Component (Day 2)

### Overview
Create the main ContactForm component with proper styling, validation, and user experience that matches your portfolio's design system.

### Step 2.1: Create Base Input Components
**File:** `components/ui/ContactInput.tsx`
```typescript
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
```

**File:** `components/ui/ContactSelect.tsx`
```typescript
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContactSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  emoji?: string
  options: { value: string; label: string }[]
}

export const ContactSelect = forwardRef<HTMLSelectElement, ContactSelectProps>(
  ({ label, error, emoji, options, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1"
        >
          {emoji && <span>{emoji}</span>}
          {label}
        </label>
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600",
            "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
            "focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            "transition-all duration-200",
            "hover:border-slate-400 dark:hover:border-slate-500",
            error && "border-red-500 dark:border-red-400 focus:ring-red-500",
            className
          )}
          {...props}
        >
          <option value="" disabled>Select an option...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

ContactSelect.displayName = 'ContactSelect'
```

**File:** `components/ui/ContactTextarea.tsx`
```typescript
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContactTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  emoji?: string
  charCount?: number
  maxChars?: number
}

export const ContactTextarea = forwardRef<HTMLTextAreaElement, ContactTextareaProps>(
  ({ label, error, emoji, charCount, maxChars, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1"
          >
            {emoji && <span>{emoji}</span>}
            {label}
          </label>
          {maxChars && (
            <span className={cn(
              "text-xs",
              charCount && charCount > maxChars * 0.9
                ? "text-orange-600 dark:text-orange-400"
                : "text-slate-500 dark:text-slate-400"
            )}>
              {charCount || 0}/{maxChars}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600",
            "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
            "placeholder-slate-500 dark:placeholder-slate-400",
            "focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            "transition-all duration-200 resize-y min-h-[120px]",
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

ContactTextarea.displayName = 'ContactTextarea'
```

### Step 2.2: Create Main ContactForm Component
**File:** `components/ContactForm.tsx`
```typescript
'use client'

import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ReCAPTCHA from 'react-google-recaptcha'
import { motion, AnimatePresence } from 'framer-motion'

import { ContactInput } from './ui/ContactInput'
import { ContactSelect } from './ui/ContactSelect'
import { ContactTextarea } from './ui/ContactTextarea'
import MagicButton from './ui/MagicButton'
import { contactFormSchema, ContactFormData, subjectOptions } from '@/lib/validations/contact'
import { trackContactEvent } from '@/lib/analytics'

interface ContactFormProps {
  className?: string
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm({ className }: ContactFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [charCount, setCharCount] = useState(0)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: undefined,
      message: '',
      recaptcha: '',
    },
  })

  // Watch message field for character count
  const messageValue = watch('message')
  React.useEffect(() => {
    setCharCount(messageValue?.length || 0)
  }, [messageValue])

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmissionState('submitting')
      trackContactEvent('submit_attempt')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmissionState('success')
      trackContactEvent('submit_success')
      reset()
      recaptchaRef.current?.reset()
      setCharCount(0)

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        if (submissionState === 'success') {
          setSubmissionState('idle')
        }
      }, 5000)

    } catch (error) {
      console.error('Contact form error:', error)
      setSubmissionState('error')
      trackContactEvent('submit_error', undefined, { error: String(error) })

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        if (submissionState === 'error') {
          setSubmissionState('idle')
        }
      }, 5000)
    }
  }

  const handleRecaptchaChange = (token: string | null) => {
    setValue('recaptcha', token || '')
    if (token) {
      trackContactEvent('recaptcha_complete')
    }
  }

  const handleFieldFocus = (fieldName: string) => {
    trackContactEvent('field_focus', fieldName)
  }

  // Track form view when component mounts
  React.useEffect(() => {
    trackContactEvent('view')
  }, [])

  if (submissionState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Message sent successfully!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmissionState('idle')}
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          Send another message →
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactInput
            {...register('name')}
            id="name"
            label="Your Name"
            emoji="👤"
            placeholder="Your name"
            error={errors.name?.message}
            onFocus={() => handleFieldFocus('name')}
          />

          <ContactInput
            {...register('email')}
            id="email"
            type="email"
            label="Email Address"
            emoji="📧"
            placeholder="your.email@company.com"
            error={errors.email?.message}
            onFocus={() => handleFieldFocus('email')}
          />
        </div>

        <ContactInput
          {...register('company')}
          id="company"
          label="Company (Optional)"
          emoji="🏢"
          placeholder="Company name"
          error={errors.company?.message}
          onFocus={() => handleFieldFocus('company')}
        />

        <ContactSelect
          {...register('subject')}
          id="subject"
          label="What's this about?"
          emoji="💼"
          options={subjectOptions}
          error={errors.subject?.message}
          onFocus={() => handleFieldFocus('subject')}
        />

        <ContactTextarea
          {...register('message')}
          id="message"
          label="Tell me more"
          emoji="💬"
          placeholder="Tell me about your project or how I can help..."
          rows={5}
          maxChars={1000}
          charCount={charCount}
          error={errors.message?.message}
          onFocus={() => handleFieldFocus('message')}
        />

        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleRecaptchaChange}
            theme="auto"
          />
          {errors.recaptcha && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
              <span>⚠️</span>
              {errors.recaptcha.message}
            </p>
          )}
        </div>

        <AnimatePresence>
          {submissionState === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center"
            >
              <p className="text-red-800 dark:text-red-200 flex items-center justify-center gap-2">
                <span>😅</span>
                Oops! Something went wrong. Please try again or email me directly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center">
          <MagicButton
            title={isSubmitting ? "Sending... 🚀" : "Send Message 🚀"}
            icon={<></>}
            position="right"
            otherClasses={isSubmitting ? "opacity-75 cursor-not-allowed" : ""}
          />
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Prefer email? Reach me directly at{' '}
          <a
            href="mailto:nathancwatkins@gmail.com"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            nathancwatkins@gmail.com ✉️
          </a>
        </p>
      </form>
    </motion.div>
  )
}
```

---

## 🔧 Phase 3: Backend Integration (Day 3)

### Overview
Create the API endpoint for handling form submissions, implementing reCAPTCHA verification, email sending, and proper error handling.

### Step 3.1: Create API Route
**File:** `app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { resend, EMAIL_CONFIG } from '@/lib/email/resend'
import { createContactEmailHtml, createAutoReplyHtml } from '@/lib/email/templates'
import { subjectOptions } from '@/lib/validations/contact'

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 3

  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  return true
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification')
    return true // Allow in development
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptcha)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Get subject label for email
    const subjectLabel = subjectOptions.find(opt => opt.value === validatedData.subject)?.label || validatedData.subject

    // Send notification email to Nathan
    const contactEmailHtml = createContactEmailHtml(validatedData)

    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      subject: `💼 New Contact Form Submission from ${validatedData.name}`,
      html: contactEmailHtml,
      text: `
New contact form submission:

From: ${validatedData.name} (${validatedData.email})
${validatedData.company ? `Company: ${validatedData.company}` : ''}
Subject: ${subjectLabel}

Message:
${validatedData.message}

---
Sent from your portfolio contact form at ${new Date().toLocaleString()}
      `.trim(),
    })

    // Send auto-reply to sender
    const autoReplyHtml = createAutoReplyHtml(validatedData.name)

    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: validatedData.email,
      subject: '🎉 Thanks for reaching out!',
      html: autoReplyHtml,
      text: `
Hi ${validatedData.name},

Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.

I'll review your message and get back to you within 24 hours. In the meantime, feel free to:
• Check out my latest projects on the portfolio
• Connect with me on LinkedIn: https://www.linkedin.com/in/nathancwatkins/
• Follow my work on GitHub: https://github.com/natkins23

Looking forward to our conversation! 🚀

Best regards,
Nathan Watkins
Full-Stack Developer
      `.trim(),
    })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle CORS for development
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
```

### Step 3.2: Update Environment Configuration
Ensure your environment variables are properly configured in your hosting platform (Vercel):

1. **Vercel Dashboard** → Your Project → Settings → Environment Variables
2. Add all the environment variables from Step 1.2
3. **Important**: Make sure `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` has the `NEXT_PUBLIC_` prefix

### Step 3.3: Add Type Definitions
**File:** `lib/types.ts` (add to existing file)
```typescript
// Add these types to your existing types file

export interface ContactSubmissionResponse {
  message?: string
  error?: string
}

export interface ReCaptchaResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}
```

---

## ✨ Phase 4: UX Enhancements (Day 4)

### Overview
Polish the user experience with animations, accessibility improvements, mobile optimization, and comprehensive testing.

### Step 4.1: Update Footer to Include Contact Form
**File:** `components/Footer.tsx` (modify existing)
```typescript
import { FaLocationArrow, FaXTwitter } from 'react-icons/fa6'
import Image from 'next/image'
import ContactForm from './ContactForm'
import MagicButton from './ui/MagicButton'
import { FiGithub } from 'react-icons/fi'
import { CiLinkedin } from 'react-icons/ci'

const Footer = () => {
  return (
    <footer className="xl:max-w-5xl pt-0 pb-24" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 1sm:-translate-y-52 -bottom-72 min-h-96 pointer-events-none">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 z-10 pointer-events-none"
          fill
          sizes="100vw"
        />
      </div>

      <div className="flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading lg:max-w-[45vw] mb-6">
            Let's build something <span className="text-purple-500">amazing together!</span> 🚀
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-5">
            Got a project in mind? Need a fresh perspective?<br />
            Or just want to chat about the latest in web development?<br />
            Drop me a line – I'd love to hear from you! 💬
          </p>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-2xl mx-auto mb-16 px-4">
          <div className="bg-white/5 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="flex mt-16 md:flex-row flex-col-reverse justify-between items-center md:mx-10">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Nathan Watkins
        </p>

        <nav aria-label="Footer social media links" className="flex items-center justify-center pb-2 gap-3 z-50">
          <a
            href="https://github.com/natkins23"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Nathan's GitHub profile"
            className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <FiGithub className="w-full h-full p-3" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathancwatkins/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Nathan's LinkedIn profile"
            className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <CiLinkedin className="w-full h-full p-2" aria-hidden="true" />
          </a>
          <a
            href="https://x.com/nathancwatkins"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Nathan's X (Twitter) profile"
            className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <FaXTwitter className="w-full h-full p-3" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
```

### Step 4.2: Add Loading Skeletons
**File:** `components/ui/ContactFormSkeleton.tsx`
```typescript
export default function ContactFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-20"></div>
          <div className="h-12 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-24"></div>
          <div className="h-12 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-32"></div>
        <div className="h-12 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
      </div>

      <div className="space-y-2">
        <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-28"></div>
        <div className="h-12 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
      </div>

      <div className="space-y-2">
        <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-24"></div>
        <div className="h-32 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
      </div>

      <div className="flex justify-center">
        <div className="h-20 w-80 bg-slate-300 dark:bg-slate-600 rounded"></div>
      </div>

      <div className="flex justify-center">
        <div className="h-12 w-40 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
      </div>
    </div>
  )
}
```

### Step 4.3: Accessibility Enhancements
**File:** `components/ContactForm.tsx` (add these improvements to existing component)

Add these accessibility features:
- ARIA live regions for form status
- Focus management after submission
- Keyboard navigation support
- Screen reader announcements

```typescript
// Add to ContactForm component
const [liveRegionMessage, setLiveRegionMessage] = useState('')

// Update submission handlers to include live region updates
const onSubmit = async (data: ContactFormData) => {
  try {
    setSubmissionState('submitting')
    setLiveRegionMessage('Submitting your message...')

    // ... existing submission logic ...

    setSubmissionState('success')
    setLiveRegionMessage('Message sent successfully! I will get back to you within 24 hours.')

  } catch (error) {
    setSubmissionState('error')
    setLiveRegionMessage('Failed to send message. Please try again or email me directly.')
  }
}

// Add to JSX before the form
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {liveRegionMessage}
</div>
```

### Step 4.4: Mobile Optimization
Add responsive design improvements to the form components:

```typescript
// Update ContactForm spacing for mobile
<div className="space-y-4 md:space-y-6">
  <div className="grid grid-cols-1 gap-4 md:gap-6">
    {/* Single column on mobile */}
  </div>
</div>

// Update MagicButton for mobile
<div className="text-center px-4">
  <MagicButton
    title={isSubmitting ? "Sending... 🚀" : "Send Message 🚀"}
    icon={<></>}
    position="right"
    otherClasses={`w-full md:w-auto ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
  />
</div>
```

### Step 4.5: Testing Checklist
Create comprehensive testing procedures:

1. **Functionality Tests**
   - [ ] Form validates all fields correctly
   - [ ] reCAPTCHA verification works
   - [ ] Email delivery to Nathan works
   - [ ] Auto-reply to sender works
   - [ ] Rate limiting prevents abuse
   - [ ] Error messages display properly

2. **Accessibility Tests**
   - [ ] Screen reader can navigate form
   - [ ] All fields have proper labels
   - [ ] Error messages are announced
   - [ ] Keyboard navigation works
   - [ ] Focus management is correct

3. **Design Tests**
   - [ ] Matches portfolio design system
   - [ ] Responsive on all screen sizes
   - [ ] Dark/light mode compatibility
   - [ ] Animations are smooth
   - [ ] Loading states are clear

4. **Performance Tests**
   - [ ] Form loads quickly
   - [ ] Submission response is fast
   - [ ] No layout shifts
   - [ ] Bundle size impact is minimal

## File Structure 📁

```
components/
├── ContactForm.tsx           # Main form component
├── ui/
│   ├── ContactInput.tsx      # Reusable input component
│   ├── ContactSelect.tsx     # Dropdown component
│   └── ContactTextarea.tsx   # Textarea component
│
app/
├── api/
│   └── contact/
│       └── route.ts          # Email sending API
│
lib/
├── validations/
│   └── contact.ts            # Zod schema
├── email/
│   └── templates.ts          # Email templates
└── recaptcha.ts              # reCAPTCHA utilities
```

## Email Templates 📧

### To Nathan:
```
Subject: 💼 New Contact Form Submission from {name}

Hi Nathan,

You've received a new message through your portfolio contact form:

👤 From: {name} ({email})
🏢 Company: {company}
💼 Subject: {subject}

💬 Message:
{message}

---
Sent from your portfolio contact form
```

### Auto-reply to Sender:
```
Subject: 🎉 Thanks for reaching out!

Hi {name},

Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.

I'll review your message and get back to you within 24 hours. In the meantime, feel free to check out my latest projects or connect with me on LinkedIn.

Looking forward to our conversation! 🚀

Best,
Nathan Watkins
```

## Analytics Integration 📊

### Track Events:
- `contact_form_view` - Form becomes visible
- `contact_form_field_focus` - User focuses on field
- `contact_form_submit_attempt` - User clicks submit
- `contact_form_submit_success` - Successful submission
- `contact_form_submit_error` - Failed submission
- `contact_form_recaptcha_complete` - reCAPTCHA completed

## Security Considerations 🔒

1. **Rate Limiting**: Max 3 submissions per IP per hour
2. **Input Sanitization**: XSS prevention
3. **reCAPTCHA**: Bot protection
4. **Validation**: Server-side validation to match client-side
5. **Error Handling**: No sensitive data in error messages

## Accessibility Features ♿

1. **ARIA Labels**: All form fields properly labeled
2. **Keyboard Navigation**: Tab order and focus management
3. **Screen Reader Support**: Descriptive error messages
4. **Color Contrast**: Meets WCAG guidelines
5. **Focus Indicators**: Clear visual focus states

## Testing Checklist ✅

### Functionality:
- [ ] Form validation works correctly
- [ ] reCAPTCHA blocks bots
- [ ] Email delivery works
- [ ] Auto-reply sends properly
- [ ] Error states display correctly
- [ ] Success state shows confirmation

### Design:
- [ ] Matches existing portfolio style
- [ ] Responsive on all devices
- [ ] Dark/light mode compatibility
- [ ] Animations are smooth
- [ ] Loading states are clear

### Performance:
- [ ] Form loads quickly
- [ ] Submission is fast
- [ ] No layout shifts
- [ ] Images optimized

## Success Metrics 📈

1. **Form Completion Rate**: Target >70%
2. **Submission Success Rate**: Target >95%
3. **Time to Complete**: Target <2 minutes
4. **User Satisfaction**: Monitor for user feedback
5. **Spam Prevention**: <1% spam submissions

## Maintenance Plan 🔧

1. **Monthly**: Review submission logs and spam rates
2. **Quarterly**: Update reCAPTCHA keys if needed
3. **Yearly**: Review and update email templates
4. **Ongoing**: Monitor email delivery rates

This plan creates a professional, secure, and user-friendly contact form that maintains the portfolio's high-quality aesthetic while adding Nathan's personality through strategic emoji usage and conversational copy.
# Critical Fixes for Contact Form Implementation 🚨

## Overview
These fixes address **security vulnerabilities**, **memory leaks**, and **missing dependencies** identified during the systematic review of the contact form plan. **All fixes must be applied before implementation.**

---

## 🚨 SECURITY VULNERABILITIES (CRITICAL)

### 1. XSS Prevention in Email Templates

**Issue:** User input is directly inserted into HTML email templates without sanitization.
**Risk:** Cross-site scripting attacks via email content.

**Fix:**
```bash
# Install sanitization library
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify
```

**Update:** `lib/email/templates.ts`
```typescript
import DOMPurify from 'isomorphic-dompurify'

// Add sanitization function
function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['br'],
    ALLOWED_ATTR: []
  })
}

// Update email template (lines 262, 264, 279):
<div class="value">${sanitizeHtml(data.name)} (${sanitizeHtml(data.email)})</div>

${data.company ? `
<div class="field">
  <div class="label">🏢 Company:</div>
  <div class="value">${sanitizeHtml(data.company)}</div>
</div>
` : ''}

<div class="message-box">${sanitizeHtml(data.message).replace(/\n/g, '<br>')}</div>
```

### 2. Content Security Policy (CSP) Headers

**Issue:** No CSP headers to protect against XSS and allow reCAPTCHA.
**Risk:** Script injection attacks.

**Fix:** Add to `next.config.mjs`
```javascript
const nextConfig = {
  // ... existing config
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://www.google.com",
              "frame-src https://www.google.com",
            ].join('; ')
          }
        ]
      }
    ]
  }
}
```

### 3. Enhanced Input Validation

**Issue:** Name regex is too restrictive, email validation could be stronger.
**Risk:** Legitimate users blocked, potential bypass of validation.

**Fix:** Update `lib/validations/contact.ts`
```typescript
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    // Updated regex to handle more international names
    .regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-\.]+$/, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    // Additional email validation
    .refine((email) => {
      const parts = email.split('@')
      return parts.length === 2 && parts[1].includes('.')
    }, 'Please enter a valid email address'),

  // ... rest of schema
})
```

---

## 🔄 MEMORY LEAKS (CRITICAL)

### 1. Rate Limiting Map Cleanup

**Issue:** Rate limiting Map grows indefinitely, never removes old entries.
**Risk:** Memory exhaustion, server crashes.

**Fix:** Update `app/api/contact/route.ts`
```typescript
// Add cleanup function
function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// Add periodic cleanup (call once when module loads)
if (typeof global.rateLimitCleanupInterval === 'undefined') {
  global.rateLimitCleanupInterval = setInterval(cleanupRateLimit, 60 * 60 * 1000) // Every hour
}

// Enhanced rate limiting function
function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 3

  // Clean up expired entries for this key
  const entry = rateLimitMap.get(key)
  if (entry && now > entry.resetTime) {
    rateLimitMap.delete(key)
  }

  const currentEntry = rateLimitMap.get(key)

  if (!currentEntry) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (currentEntry.count >= maxRequests) {
    return false
  }

  currentEntry.count++
  return true
}
```

### 2. Form Component Timeout Cleanup

**Issue:** setTimeout in form component not properly cleaned up.
**Risk:** Memory leaks, unexpected state changes.

**Fix:** Update `components/ContactForm.tsx`
```typescript
// Replace the existing timeout logic with proper cleanup
useEffect(() => {
  let timeoutId: NodeJS.Timeout

  if (submissionState === 'success' || submissionState === 'error') {
    timeoutId = setTimeout(() => {
      setSubmissionState((currentState) => {
        // Only reset if still in the same state
        return currentState === submissionState ? 'idle' : currentState
      })
    }, 5000)
  }

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}, [submissionState])

// Remove the existing setTimeout calls from onSubmit function
```

---

## 📦 MISSING DEPENDENCIES (HIGH PRIORITY)

### 1. Utility Function Dependencies

**Issue:** `cn()` utility function used but dependencies not installed.
**Risk:** Build failures, runtime errors.

**Fix:**
```bash
# Install required dependencies
npm install clsx tailwind-merge
```

**Create/Update:** `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 2. Global Type Declarations

**Issue:** Global variables used without proper typing.
**Risk:** TypeScript errors, unexpected behavior.

**Fix:** Create `global.d.ts` in project root
```typescript
declare global {
  var rateLimitCleanupInterval: NodeJS.Timeout | undefined
}

export {}
```

---

## 🛡️ ADDITIONAL SECURITY ENHANCEMENTS (RECOMMENDED)

### 1. Honeypot Field

**Add:** Invisible field to catch bots
```typescript
// Add to ContactForm.tsx
<div className="hidden">
  <input
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    {...register('honeypot')}
  />
</div>

// Add to validation schema
honeypot: z.string().max(0, 'Bot detected'),
```

### 2. Request Size Limiting

**Add:** To API route
```typescript
// Add to POST function start
const MAX_BODY_SIZE = 10 * 1024 // 10KB
const bodyText = await request.text()

if (bodyText.length > MAX_BODY_SIZE) {
  return NextResponse.json(
    { error: 'Request too large' },
    { status: 413 }
  )
}

const body = JSON.parse(bodyText)
```

### 3. Error Information Sanitization

**Issue:** Zod errors might leak schema information.
**Fix:**
```typescript
// Update error handling in API route
if (error instanceof z.ZodError) {
  // Don't expose detailed validation errors
  return NextResponse.json(
    { error: 'Invalid form data. Please check your inputs and try again.' },
    { status: 400 }
  )
}
```

---

## 🔍 ERROR BOUNDARY IMPLEMENTATION

**Add:** Error boundary around contact form
**Create:** `components/ContactFormErrorBoundary.tsx`
```typescript
'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ContactFormErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
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
            onClick={() => this.setState({ hasError: false })}
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
```

**Update Footer.tsx:**
```typescript
import { ContactFormErrorBoundary } from './ContactFormErrorBoundary'

// Wrap ContactForm
<ContactFormErrorBoundary>
  <ContactForm />
</ContactFormErrorBoundary>
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 0: Apply Critical Fixes (BEFORE starting Phase 1)
- [ ] Install `isomorphic-dompurify` and types
- [ ] Install `clsx` and `tailwind-merge`
- [ ] Create/update `lib/utils.ts`
- [ ] Create `global.d.ts`
- [ ] Add CSP headers to `next.config.mjs`
- [ ] Update email templates with sanitization
- [ ] Fix rate limiting memory leak
- [ ] Fix form timeout cleanup
- [ ] Enhance input validation
- [ ] Create error boundary component
- [ ] Add request size limiting
- [ ] Add honeypot field

### Verification Tests
- [ ] Test XSS prevention with malicious input
- [ ] Verify rate limiting works and cleans up
- [ ] Check CSP headers don't break functionality
- [ ] Test error boundary catches failures
- [ ] Verify all TypeScript errors resolved

---

## 🚀 POST-FIX IMPLEMENTATION ORDER

1. **Apply all fixes above**
2. **Run comprehensive security testing**
3. **Proceed with original Phase 1 (Dependencies)**
4. **Continue with Phases 2-4 as planned**

---

## ⚠️ CRITICAL WARNING

**DO NOT DEPLOY WITHOUT THESE FIXES**

The original plan has serious security vulnerabilities that could expose your application to:
- Cross-site scripting (XSS) attacks
- Memory exhaustion
- Server crashes
- Data injection

Apply all fixes before proceeding with implementation.
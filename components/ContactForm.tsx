'use client'

import React, { useState, useRef, useEffect } from 'react'
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
  const [liveRegionMessage, setLiveRegionMessage] = useState('')
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
      honeypot: '', // Security: Honeypot field
    },
  })

  // Watch message field for character count
  const messageValue = watch('message')
  useEffect(() => {
    setCharCount(messageValue?.length || 0)
  }, [messageValue])

  // Security: Proper timeout cleanup
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (submissionState === 'success' || submissionState === 'error') {
      timeoutId = setTimeout(() => {
        setSubmissionState((currentState) => {
          return currentState === submissionState ? 'idle' : currentState
        })
        setLiveRegionMessage('')
      }, 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [submissionState])

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmissionState('submitting')
      setLiveRegionMessage('Submitting your message...')
      trackContactEvent('submit_attempt')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setSubmissionState('success')
      setLiveRegionMessage('Message sent successfully! I will get back to you within 24 hours.')
      trackContactEvent('submit_success')
      reset()
      recaptchaRef.current?.reset()
      setCharCount(0)

    } catch (error) {
      console.error('Contact form error:', error)
      setSubmissionState('error')
      setLiveRegionMessage('Failed to send message. Please try again or email me directly.')
      trackContactEvent('submit_error', undefined, { error: String(error) })
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
  useEffect(() => {
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
          I&apos;ll get back to you within 24 hours.
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
      {/* Accessibility: Live region for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveRegionMessage}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        {/* Security: Honeypot field - hidden from users */}
        <div className="hidden">
          <input
            type="text"
            {...register('honeypot')}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <ContactInput
            {...register('name')}
            id="name"
            label="Your Name"
            emoji="👤"
            placeholder="Your name"
            error={errors.name?.message}
            onFocus={() => handleFieldFocus('name')}
            autoComplete="name"
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
            autoComplete="email"
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
          autoComplete="organization"
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
            theme="light"
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

        <div className="text-center px-4">
          <MagicButton
            title={isSubmitting ? "Sending... 🚀" : "Send Message 🚀"}
            icon={<></>}
            position="right"
            otherClasses={`w-full md:w-auto ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
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
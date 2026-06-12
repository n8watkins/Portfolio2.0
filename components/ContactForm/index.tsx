'use client'

import React, { useEffect } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { motion } from 'framer-motion'
import { useContactFormSubmit } from './useContactFormSubmit'
import { ContactFormSuccess } from './ContactFormSuccess'
import { ContactFormLoading } from './ContactFormLoading'
import { ContactFormFields } from './ContactFormFields'
import { trackContactEvent } from '@/lib/analytics'
import { CONTACT_PREFILL_EVENT, consumePendingSubject } from '@/lib/contactPrefill'
import type { ContactFormData } from '@/lib/validations/contact'

interface ContactFormProps {
  className?: string
}

function ContactFormInner({ className }: ContactFormProps) {
  const {
    submissionState,
    setSubmissionState,
    liveRegionMessage,
    showConfetti,
    setShowConfetti,
    confettiKey,
    setConfettiKey,
    form,
    handleFormSubmit,
  } = useContactFormSubmit()

  // Track form view when component mounts
  useEffect(() => {
    trackContactEvent('view')
  }, [])

  // Allow CTAs elsewhere on the page (e.g. Appturnity consulting card) to
  // preselect the subject dropdown
  useEffect(() => {
    const pending = consumePendingSubject()
    if (pending) {
      form.setValue('subject', pending)
    }
    const handler = (event: Event) => {
      const subject = (event as CustomEvent<ContactFormData['subject']>).detail
      if (subject) {
        form.setValue('subject', subject)
      }
    }
    window.addEventListener(CONTACT_PREFILL_EVENT, handler)
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, handler)
  }, [form])

  // Auto-reset state after timeout (30 seconds)
  useEffect(() => {
    if (submissionState === 'success' || submissionState === 'error') {
      const timeoutId = setTimeout(() => {
        setSubmissionState('idle')
        // Note: liveRegionMessage is managed by the hook and will be cleared on next submission
      }, 30000)

      return () => clearTimeout(timeoutId)
    }
  }, [submissionState, setSubmissionState])

  if (submissionState === 'submitting') {
    return <ContactFormLoading />
  }

  if (submissionState === 'success') {
    return (
      <ContactFormSuccess
        showConfetti={showConfetti}
        confettiKey={confettiKey}
        onSendAnother={() => {
          setSubmissionState('idle')
          setShowConfetti(false)
        }}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
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

      <ContactFormFields
        form={form}
        submissionState={submissionState}
        onSubmit={handleFormSubmit}
      />
    </motion.div>
  )
}

export default function ContactForm({ className }: ContactFormProps) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  if (!recaptchaKey && process.env.NODE_ENV === 'production') {
    console.error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY')
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ContactFormInner className={className} />
    </GoogleReCaptchaProvider>
  )
}

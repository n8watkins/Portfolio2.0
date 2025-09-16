'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'react-lottie'
import confettiData from '../data/confetti.json'

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

// Inner form component that uses reCAPTCHA
function ContactFormInner({ className }: ContactFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [charCount, setCharCount] = useState(0)
  const [liveRegionMessage, setLiveRegionMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const { executeRecaptcha } = useGoogleReCaptcha()

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
  const formData = watch() // Watch all form data

  useEffect(() => {
    setCharCount(messageValue?.length || 0)
  }, [messageValue])

  // Debug form data changes
  useEffect(() => {
    console.log('📊 [FORM] Form data changed:', formData)
    console.log('📊 [FORM] Form errors:', errors)
    console.log('📊 [FORM] Is form valid:', Object.keys(errors).length === 0)
  }, [formData, errors])

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

  const handleFormSubmit = async () => {
    console.log('🚀 [FORM] Manual form submission triggered')

    // First, execute reCAPTCHA if needed
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    let recaptchaToken = 'dev_bypass_token'

    if (executeRecaptcha && !isDevelopment) {
      console.log('🔐 Executing reCAPTCHA before validation...')
      try {
        recaptchaToken = await executeRecaptcha('contact_form')
        console.log('🔐 reCAPTCHA token received:', recaptchaToken ? 'Yes' : 'No')

        // Set the reCAPTCHA token in the form
        setValue('recaptcha', recaptchaToken)
      } catch (error) {
        console.error('❌ [FORM] reCAPTCHA execution failed:', error)
        setSubmissionState('error')
        setLiveRegionMessage('Security verification failed. Please try again.')
        return
      }
    } else if (isDevelopment) {
      console.log('🔐 Development mode: Using bypass token')
      setValue('recaptcha', recaptchaToken)
    }

    // Now trigger the actual form submission with validation
    handleSubmit(onSubmit)()
  }

  const onSubmit = async (data: ContactFormData) => {
    console.log('🚀 [FORM] Form submission started with data:', data)
    console.log('🚀 [FORM] Current submission state:', submissionState)

    try {
      setSubmissionState('submitting')
      setLiveRegionMessage('Submitting your message...')
      trackContactEvent('submit_attempt')

      // Form data already includes reCAPTCHA token

      console.log('📤 Sending request to API...')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Form submission error:', errorData)

        // Handle rate limit errors specifically
        if (response.status === 429 || errorData.type === 'rate_limit') {
          setLiveRegionMessage(errorData.error || 'Rate limit exceeded. Please try again later or email me directly.')
        }

        throw new Error(errorData.error || 'Failed to send message')
      }

      setSubmissionState('success')
      setLiveRegionMessage('Message sent successfully! I will get back to you within 24 hours.')
      trackContactEvent('submit_success')

      // Trigger confetti animation
      setShowConfetti(true)
      setConfettiKey(prev => prev + 1)

      reset()
      setCharCount(0)

    } catch (error) {
      console.error('Contact form error:', error)
      setSubmissionState('error')
      setLiveRegionMessage('Failed to send message. Please try again or email me directly.')
      trackContactEvent('submit_error', undefined, { error: String(error) })
    }
  }


  const handleFieldFocus = (fieldName: string) => {
    trackContactEvent('field_focus', fieldName)
  }

  // Track form view when component mounts
  useEffect(() => {
    trackContactEvent('view')
  }, [])

  // Lottie options for confetti
  const confettiOptions = {
    loop: false,
    autoplay: true,
    animationData: confettiData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  if (submissionState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-12 relative"
      >
        {/* Confetti Animation */}
        {showConfetti && (
          <div key={confettiKey} className="absolute inset-0 pointer-events-none z-10">
            <Lottie options={confettiOptions} height={300} width={300} />
          </div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative z-20"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            🚀
          </motion.div>
          <motion.h3
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Message sent successfully!
          </motion.h3>
          <motion.p
            className="text-slate-600 dark:text-slate-400 mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            I&apos;ll get back to you within 24 hours.
          </motion.p>
          <motion.button
            onClick={() => {
              setSubmissionState('idle')
              setShowConfetti(false)
            }}
            className="text-purple-600 dark:text-purple-400 hover:underline transition-colors duration-200"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send another message →
          </motion.button>
        </motion.div>
      </motion.div>
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('📝 [FORM] Form submit event prevented - using manual submission');
        }}
        className="space-y-4 md:space-y-6"
      >
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

        <motion.div
          className="grid grid-cols-1 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
        >
          <ContactSelect
            {...register('subject')}
            id="subject"
            label="What's this about?"
            emoji="💼"
            options={subjectOptions}
            error={errors.subject?.message}
            onFocus={() => handleFieldFocus('subject')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* reCAPTCHA v3 runs invisibly - no UI component needed */}

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

        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45, ease: "easeOut" }}
        >
          <button
            type="button"
            disabled={isSubmitting}
            onClick={(e) => {
              console.log('🖱️ [BTN] Magic button clicked!');
              console.log('🖱️ [BTN] isSubmitting:', isSubmitting);
              console.log('🖱️ [BTN] disabled:', isSubmitting);
              e.preventDefault(); // Prevent any default behavior
              handleFormSubmit(); // Call our custom submit handler
            }}
            className={`relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none transition-all duration-200 ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 pointer-events-none">
              {isSubmitting ? "Sending... 🚀" : "Send Message 🚀"}
            </span>
          </button>
        </motion.div>


        <p className="text-center text-sm text-slate-600 dark:text-slate-400 pb-8">
          Prefer email? Reach me directly at{' '}
          <a
            href="mailto:nathancwatkins23@gmail.com"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            nathancwatkins23@gmail.com
          </a>
        </p>
      </form>
    </motion.div>
  )
}

// Main component that wraps the form with reCAPTCHA provider
export default function ContactForm({ className }: ContactFormProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactFormInner className={className} />
    </GoogleReCaptchaProvider>
  )
}
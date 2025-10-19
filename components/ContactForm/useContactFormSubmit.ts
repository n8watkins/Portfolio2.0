import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { contactFormSchema, ContactFormData } from '@/lib/validations/contact'
import { trackContactEvent } from '@/lib/analytics'

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

interface UseContactFormSubmitReturn {
  submissionState: SubmissionState
  setSubmissionState: (state: SubmissionState) => void
  liveRegionMessage: string
  setLiveRegionMessage: (message: string) => void
  showConfetti: boolean
  setShowConfetti: (show: boolean) => void
  confettiKey: number
  setConfettiKey: (key: number) => void
  form: ReturnType<typeof useForm<ContactFormData>>
  handleFormSubmit: () => Promise<void>
}

export function useContactFormSubmit(): UseContactFormSubmitReturn {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [liveRegionMessage, setLiveRegionMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const isMountedRef = useRef(true)

  // Track component mount status to prevent setState on unmounted component
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: undefined,
      message: '',
      recaptcha: '',
      honeypot: '',
    },
  })

  const { handleSubmit, setValue, reset } = form

  const onSubmit = async (data: ContactFormData) => {
    try {
      if (!isMountedRef.current) return

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

      if (!isMountedRef.current) return

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Form submission error:', errorData)

        if (response.status === 429 || errorData.type === 'rate_limit') {
          if (isMountedRef.current) {
            setLiveRegionMessage(errorData.error || 'Rate limit exceeded. Please try again later or email me directly.')
          }
        }

        throw new Error(errorData.error || 'Failed to send message')
      }

      if (!isMountedRef.current) return

      setSubmissionState('success')
      setLiveRegionMessage('Message sent successfully! I will get back to you within 24 hours.')
      trackContactEvent('submit_success')

      // Trigger confetti animation
      setShowConfetti(true)
      setConfettiKey(prev => prev + 1)

      reset()

    } catch (error) {
      if (!isMountedRef.current) return

      console.error('Contact form error:', error)
      setSubmissionState('error')
      setLiveRegionMessage('Failed to send message. Please try again or email me directly.')
      trackContactEvent('submit_error', undefined, { error: String(error) })
    }
  }

  const handleFormSubmit = async () => {
    // Execute reCAPTCHA if needed
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    let recaptchaToken = 'dev_bypass_token'

    if (executeRecaptcha && !isDevelopment) {
      try {
        recaptchaToken = await executeRecaptcha('contact_form')
        setValue('recaptcha', recaptchaToken)
      } catch (error) {
        console.error('❌ [FORM] reCAPTCHA execution failed:', error)
        setSubmissionState('error')
        setLiveRegionMessage('Security verification failed. Please try again.')
        return
      }
    } else if (isDevelopment) {
      setValue('recaptcha', recaptchaToken)
    }

    // Trigger form validation and submission
    handleSubmit(onSubmit)()
  }

  return {
    submissionState,
    setSubmissionState,
    liveRegionMessage,
    setLiveRegionMessage,
    showConfetti,
    setShowConfetti,
    confettiKey,
    setConfettiKey,
    form,
    handleFormSubmit,
  }
}

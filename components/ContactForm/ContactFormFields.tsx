'use client'

import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactInput } from '@/components/ui/ContactInput'
import { ContactSelect } from '@/components/ui/ContactSelect'
import { ContactTextarea } from '@/components/ui/ContactTextarea'
import { ContactFormData, subjectOptions } from '@/lib/validations/contact'
import { trackContactEvent } from '@/lib/analytics'
import { SubmissionState } from './useContactFormSubmit'

interface ContactFormFieldsProps {
  form: UseFormReturn<ContactFormData>
  submissionState: SubmissionState
  onSubmit: () => Promise<void>
}

export function ContactFormFields({ form, submissionState, onSubmit }: ContactFormFieldsProps) {
  const [charCount, setCharCount] = useState(0)

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const messageValue = watch('message')

  useEffect(() => {
    setCharCount(messageValue?.length || 0)
  }, [messageValue])

  const handleFieldFocus = (fieldName: string) => {
    trackContactEvent('field_focus', fieldName)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      >
        <ContactSelect
          {...register('subject')}
          id="subject"
          label="What's this about?"
          emoji="💼"
          options={subjectOptions}
          error={errors.subject?.message}
          onFocus={() => handleFieldFocus('subject')}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </motion.div>

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
            e.preventDefault()
            onSubmit()
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
  )
}

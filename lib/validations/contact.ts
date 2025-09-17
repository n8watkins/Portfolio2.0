import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-\.]+$/, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .refine((email) => {
      const parts = email.split('@')
      return parts.length === 2 && parts[1].includes('.')
    }, 'Please enter a valid email address'),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  subject: z
    .enum([
      'project_opportunity',
      'consulting',
      'networking'
    ])
    .refine((val) => val !== undefined, {
      message: 'Please select a subject',
    }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),

  recaptcha: z
    .string()
    .min(1, 'Please complete the reCAPTCHA verification'),

  // Security: Honeypot field
  honeypot: z.string().max(0, 'Bot detected'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const subjectOptions: { value: string; label: string }[] = [
  { value: 'project_opportunity', label: '🚀 New project opportunity' },
  { value: 'consulting', label: '🎯 Consulting' },
  { value: 'networking', label: '🤝 Networking' },
]
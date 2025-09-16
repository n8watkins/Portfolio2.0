import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_CONFIG = {
  to: process.env.CONTACT_EMAIL_TO || 'nathancwatkins23@gmail.com',
  from: process.env.CONTACT_EMAIL_FROM || 'Contact Form <onboarding@resend.dev>',
} as const
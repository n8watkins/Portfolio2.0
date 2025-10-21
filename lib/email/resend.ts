import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_CONFIG = {
  to: process.env.CONTACT_EMAIL_TO || 'nathancwatkins23@gmail.com',
  // IMPORTANT: Must use onboarding@resend.dev for Resend to work
  // Custom domains require domain verification in Resend dashboard
  from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
  siteUrl: process.env.SITE_URL || 'https://n8sportfolio.vercel.app/',
  siteDomain: process.env.SITE_DOMAIN || 'n8sportfolio.vercel.app',
  linkedinUrl: process.env.LINKEDIN_URL || 'https://www.linkedin.com/in/n8watkins/',
  githubUrl: process.env.GITHUB_URL || 'https://github.com/n8watkins',
  xUrl: process.env.X_URL || 'https://x.com/n8watkins',
  calUrl: process.env.CAL_URL || 'https://cal.com/n8watkins/intro',
  contactEmail: process.env.CONTACT_EMAIL_TO || 'nathancwatkins23@gmail.com',
} as const
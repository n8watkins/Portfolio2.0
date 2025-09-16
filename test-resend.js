// Quick test script to verify Resend configuration
require('dotenv').config({ path: '.env.local' })
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

async function testResend() {
  console.log('🧪 Testing Resend configuration...')
  console.log('API Key:', process.env.RESEND_API_KEY ? 'Found' : 'Missing')
  console.log('TO Email:', process.env.CONTACT_EMAIL_TO)
  console.log('FROM Email:', process.env.CONTACT_EMAIL_FROM)

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL_TO,
      subject: '🧪 Test Email from Portfolio',
      html: '<h1>Test Email</h1><p>If you receive this, Resend is working correctly!</p>',
      text: 'Test Email - If you receive this, Resend is working correctly!'
    })

    console.log('✅ Email sent successfully!')
    console.log('Email ID:', result.data?.id)
  } catch (error) {
    console.error('❌ Email failed to send:')
    console.error(error.message)
    if (error.cause) {
      console.error('Details:', error.cause)
    }
  }
}

testResend()
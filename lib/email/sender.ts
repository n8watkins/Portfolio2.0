import { resend, EMAIL_CONFIG } from '@/lib/email/resend'
import { createContactEmailHtml, createAutoReplyHtml } from '@/lib/email/templates'
import { subjectOptions, type ContactFormData } from '@/lib/validations/contact'
import { logger } from '@/lib/logger'

/**
 * Email sending result
 */
export interface EmailResult {
  success: boolean
  notificationId?: string
  autoReplyId?: string
  error?: string
}

/**
 * Send contact form notification and auto-reply emails
 * Handles both notification (to site owner) and auto-reply (to submitter)
 *
 * @param data - Validated contact form data
 * @returns EmailResult with success status and email IDs or error message
 *
 * @example
 * ```ts
 * const result = await sendContactEmails(validatedData)
 * if (!result.success) {
 *   return NextResponse.json({ error: result.error }, { status: 500 })
 * }
 * ```
 */
export async function sendContactEmails(data: ContactFormData): Promise<EmailResult> {
  try {
    // Get subject label for display
    const subjectLabel =
      subjectOptions.find((opt) => opt.value === data.subject)?.label || data.subject

    // ========================================
    // STEP 1: Send notification email to site owner
    // ========================================
    logger.info('📧 Sending notification email to:', EMAIL_CONFIG.to)

    const contactEmailHtml = createContactEmailHtml(data)

    const notificationResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      subject: `💼 New Contact Form Submission from ${data.name}`,
      html: contactEmailHtml,
      text: `
New contact form submission:

From: ${data.name} (${data.email})
${data.company ? `Company: ${data.company}` : ''}
Subject: ${subjectLabel}

Message:
${data.message}

---
Sent from your portfolio contact form at ${new Date().toLocaleString()}
      `.trim(),
    })

    logger.info('✅ Notification email sent:', notificationResult.data?.id)

    // ========================================
    // STEP 2: Send auto-reply email to submitter
    // ========================================
    logger.info('📧 Sending auto-reply to:', data.email)

    const autoReplyHtml = createAutoReplyHtml(data)

    const autoReplyResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: data.email,
      subject: '🎉 Thanks for reaching out!',
      html: autoReplyHtml,
      text: `
Hi ${data.name},

Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.

I'll review your message and get back to you within 24 hours. In the meantime, feel free to:
• Check out my latest projects on the portfolio
• Connect with me on LinkedIn: https://www.linkedin.com/in/n8watkins/
• Follow my work on GitHub: https://github.com/n8watkins

Looking forward to our conversation! 🚀

Best regards,
Nathan Watkins
Full-Stack Developer
      `.trim(),
    })

    logger.info('✅ Auto-reply email sent:', autoReplyResult.data?.id)

    return {
      success: true,
      notificationId: notificationResult.data?.id,
      autoReplyId: autoReplyResult.data?.id,
    }
  } catch (error) {
    logger.error('❌ Email sending error:', error)
    return {
      success: false,
      error: 'Failed to send email. Please try again later.',
    }
  }
}

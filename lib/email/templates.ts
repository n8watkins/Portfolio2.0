import { ContactFormData } from '@/lib/validations/contact'
import { subjectOptions } from '@/lib/validations/contact'
import DOMPurify from 'isomorphic-dompurify'

// Security: Sanitization function
function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['br'],
    ALLOWED_ATTR: []
  })
}

export function createContactEmailHtml(data: ContactFormData): string {
  const subjectLabel = subjectOptions.find(opt => opt.value === data.subject)?.label || data.subject

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
          .message-box { margin-top: 15px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #dee2e6; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Contact Form Submission</h1>
            <p>You've received a new message through your portfolio!</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 From:</div>
              <div class="value">${sanitizeHtml(data.name)} (${sanitizeHtml(data.email)})</div>
            </div>

            ${data.company ? `
            <div class="field">
              <div class="label">🏢 Company:</div>
              <div class="value">${sanitizeHtml(data.company)}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="label">💼 Subject:</div>
              <div class="value">${subjectLabel}</div>
            </div>

            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="message-box">${sanitizeHtml(data.message)}</div>
            </div>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="font-size: 12px; color: #6c757d; text-align: center;">
              Sent from your portfolio contact form • ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function createAutoReplyHtml(name: string): string {
  const sanitizedName = sanitizeHtml(name)

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .emoji { font-size: 2em; }
          .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="emoji">🎉</div>
            <h1>Thanks for reaching out!</h1>
          </div>
          <div class="content">
            <p>Hi ${sanitizedName},</p>

            <p>Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.</p>

            <p>I'll review your message and get back to you within 24 hours. In the meantime, feel free to:</p>
            <ul>
              <li>🔍 Check out my latest projects on the portfolio</li>
              <li>💼 Connect with me on <a href="https://www.linkedin.com/in/nathancwatkins/">LinkedIn</a></li>
              <li>⭐ Follow my work on <a href="https://github.com/natkins23">GitHub</a></li>
            </ul>

            <p>Looking forward to our conversation! 🚀</p>

            <div class="signature">
              <p><strong>Best regards,</strong><br>
              Nathan Watkins<br>
              <em>Full-Stack Developer</em></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}
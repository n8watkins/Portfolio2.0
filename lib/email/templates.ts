import { ContactFormData } from '@/lib/validations/contact'
import { subjectOptions } from '@/lib/validations/contact'
import { EMAIL_CONFIG } from '@/lib/email/resend'
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
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  // Get urgency level and suggested action based on subject
  function getSubjectInsights(subject: string) {
    switch (subject) {
      case 'project_opportunity':
        return {
          urgency: '🟢 High Priority',
          action: 'Review project scope and respond within 24h',
          context: 'New project inquiry'
        }
      case 'consulting':
        return {
          urgency: '🟡 Medium Priority',
          action: 'Assess consulting fit and availability',
          context: 'Consulting opportunity'
        }
      case 'networking':
        return {
          urgency: '🔵 Low Priority',
          action: 'Connect and engage',
          context: 'Networking contact'
        }
      default:
        return {
          urgency: '🟠 Standard',
          action: 'Review and respond',
          context: 'Contact inquiry'
        }
    }
  }

  const insights = getSubjectInsights(data.subject)

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>New Contact - ${sanitizeHtml(data.name)}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background: #f6f7fb;
          }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header {
            background: linear-gradient(135deg, #6d5efc 0%, #3ab0ff 100%);
            color: white;
            padding: 24px;
            border-radius: 12px 12px 0 0;
            text-align: center;
          }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
          .header p { margin: 8px 0 0; font-size: 16px; opacity: 0.9; }
          .content {
            background: white;
            padding: 24px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .priority-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 16px;
            background: #f0f9ff;
            color: #0284c7;
            border: 1px solid #e0f2fe;
          }
          .contact-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #3b82f6;
          }
          .contact-name { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
          .contact-email { color: #3b82f6; font-size: 16px; text-decoration: none; }
          .contact-company { color: #64748b; font-size: 14px; margin-top: 4px; }
          .field { margin: 20px 0; }
          .field-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .label { font-weight: 700; color: #374151; font-size: 14px; }
          .action-needed {
            font-size: 12px;
            color: #059669;
            background: #d1fae5;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 600;
          }
          .value {
            padding: 12px 16px;
            background: #f9fafb;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            font-size: 14px;
          }
          .message-box {
            padding: 20px;
            background: #fefefe;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.7;
            color: #374151;
          }
          .insights {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            padding: 16px;
            border-radius: 8px;
            margin-top: 20px;
            border-left: 4px solid #f59e0b;
          }
          .insights h3 { margin: 0 0 8px; color: #92400e; font-size: 16px; }
          .insights p { margin: 4px 0; color: #451a03; font-size: 14px; }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          .footer p { font-size: 12px; color: #6b7280; margin: 0; }
          .quick-actions {
            background: #f0f9ff;
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
            border-left: 4px solid #0ea5e9;
          }
          .quick-actions h4 { margin: 0 0 8px; color: #0c4a6e; font-size: 14px; }
          .quick-actions p { margin: 0; font-size: 13px; color: #075985; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Contact Received!</h1>
            <p>${insights.context}</p>
          </div>

          <div class="content">

            <div class="contact-info">
              <div class="contact-name">${sanitizeHtml(data.name)}</div>
              <a href="mailto:${sanitizeHtml(data.email)}" class="contact-email">${sanitizeHtml(data.email)}</a>
            </div>

            <div class="field">
              <div class="label">💼 Inquiry Type</div>
              <div class="value">${subjectLabel}</div>
            </div>

            <div class="field">
              <div class="label">💬 Message</div>
              <div class="message-box">${sanitizeHtml(data.message)}</div>
            </div>


            <div class="footer">
              <p>📧 Received via n8sportfolio.vercel.app contact form</p>
              <p>🕐 ${timestamp}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function createAutoReplyHtml(data: ContactFormData): string {
  const sanitizedName = sanitizeHtml(data.name)
  const firstName = sanitizedName.split(' ')[0] || 'there'
  const subjectLabel = subjectOptions.find(opt => opt.value === data.subject)?.label || data.subject

  // Helper function to get subject-specific content
  function getSubjectSpecificContent(subject: string): string {
    switch (subject) {
      case 'networking':
        return `
              <p style="margin:0 0 12px;font-size:15px;color:#374151;">
                Always happy to connect. Here's my
                <a href="${EMAIL_CONFIG.linkedinUrl}" style="color:#3b82f6;">LinkedIn</a> and
                <a href="${EMAIL_CONFIG.xUrl}" style="color:#3b82f6;">X</a> if you'd like to stay in touch.
              </p>`
      case 'project_opportunity':
        return `
              <p style="margin:0 0 12px;font-size:15px;color:#374151;">
                Excited to hear about your project. If you've got a brief or Loom, replying with that helps me prep before we talk.
              </p>`
      case 'consulting':
        return `
              <p style="margin:0 0 12px;font-size:15px;color:#374151;">
                For consulting work, a quick scope of goals and timeline will help me frame recommendations — reply with any details you can.
              </p>`
      default:
        return ''
    }
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Thanks for reaching out</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f6f7fb;font-family:Segoe UI,Arial,sans-serif;">
  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    I'll get back within 24h. In the meantime, here's a quick next step.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;">
    <tr>
      <td align="center" style="padding:20px;">
        <table role="presentation" width="700" style="max-width:700px;background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:24px;background:linear-gradient(135deg,#6d5efc,#3ab0ff);color:#fff;">
              <h1 style="margin:0;font-size:22px;font-weight:600;">👋 Got your message!</h1>
              <p style="margin:6px 0 0;font-size:14px;color:#ecf3ff;">
                About: <strong>${sanitizeHtml(subjectLabel)}</strong>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 12px;font-size:16px;color:#111827;">Hey ${sanitizeHtml(firstName)},</p>

              <p style="margin:0 0 12px;font-size:15px;color:#374151;">
                Appreciate you reaching out — I'll reply within <strong>24 hours</strong> (often sooner).
              </p>

              ${getSubjectSpecificContent(data.subject)}

              <!-- Credibility / Social Proof -->
              <p style="margin:16px 0 0;font-size:14px;color:#6b7280;">
                Recent interests &amp; work: Claude-driven coding workflows, YouTube auto-summary newsletters, and exploring every angle of bringing generative AI into SaaS.
              </p>

              <!-- Signature -->
              <p style="margin:20px 0 0;font-size:15px;color:#111827;font-weight:600;">– Nathan "n8" Watkins</p>
              <p style="margin:4px 0 0;font-size:13px;color:#374151;">Front-end / Full-stack Developer</p>
              <p style="margin:4px 0 0;font-size:13px;color:#374151;">
                <a href="mailto:${EMAIL_CONFIG.contactEmail}" style="color:#3b82f6;">${EMAIL_CONFIG.contactEmail}</a>
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#374151;">
                <a href="${EMAIL_CONFIG.linkedinUrl}" style="color:#3b82f6;">LinkedIn</a> ·
                <a href="${EMAIL_CONFIG.githubUrl}" style="color:#3b82f6;">GitHub</a> ·
                <a href="${EMAIL_CONFIG.xUrl}" style="color:#3b82f6;">X</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:14px 24px 20px;">
              <p style="margin:0;font-size:12px;color:#9aa3af;">
                You're receiving this one-time email because you submitted the contact form on ${EMAIL_CONFIG.siteDomain}. This is not a subscription.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
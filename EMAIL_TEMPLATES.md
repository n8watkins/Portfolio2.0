# Email Templates Documentation 📧

This document outlines the email system architecture and templates used in the portfolio contact form.

## System Overview

The contact form sends **2 emails** for every successful submission:
1. **Notification Email** → Nathan (portfolio owner)
2. **Auto-Reply Email** → Form submitter

Both emails use professional HTML templates with consistent branding and security features.

## Email Templates

### 1. Notification Email (To Nathan)

**Function**: `createContactEmailHtml(data: ContactFormData)`
**File**: `lib/email/templates.ts`
**Purpose**: Alert Nathan when someone submits the contact form

#### Template Structure:
```html
🎉 New Contact Form Submission
You've received a new message through your portfolio!

👤 From: [Name] ([Email])
🏢 Company: [Company Name] (if provided)
💼 Subject: [Selected Subject Option]
💬 Message: [Full Message Content]

Sent from your portfolio contact form • [Timestamp]
```

#### Features:
- ✅ **Conditional Company Field**: Only shows if user provided company
- ✅ **Subject Translation**: Converts form values to readable labels
- ✅ **XSS Protection**: All user input sanitized with DOMPurify
- ✅ **Professional Styling**: Gradient header, clean layout
- ✅ **Timestamp Tracking**: Shows when message was sent

---

### 2. Auto-Reply Email (To Sender)

**Function**: `createAutoReplyHtml(name: string)`
**File**: `lib/email/templates.ts`
**Purpose**: Confirm receipt and set expectations with the sender

#### Template Structure:
```html
🎉 Thanks for reaching out!

Hi [Name],

Thanks for getting in touch! I've received your message and I'm excited to learn more about your project.

I'll review your message and get back to you within 24 hours. In the meantime, feel free to:

🔍 Check out my latest projects on the portfolio
💼 Connect with me on LinkedIn: https://www.linkedin.com/in/n8watkins/
⭐ Follow my work on GitHub: https://github.com/n8watkins

Looking forward to our conversation! 🚀

Best regards,
Nathan Watkins
Full-Stack Developer
```

#### Features:
- ✅ **Personalized Greeting**: Uses submitter's name
- ✅ **Clear Expectations**: 24-hour response commitment
- ✅ **Social Media Links**: Updated n8watkins handles
- ✅ **Professional Signature**: Developer title and branding
- ✅ **Engagement Encouragement**: Links to portfolio and socials

---

## Contact Form Subject Options

The form provides **5 subject categories** that users can select:

| Value | Display Label | Use Case |
|-------|---------------|----------|
| `work_together` | 💼 Let's work together | General collaboration inquiries |
| `project_opportunity` | 🚀 New project opportunity | Specific project proposals |
| `collaboration` | 💡 Collaboration idea | Partnership or joint venture ideas |
| `general_inquiry` | 📞 General inquiry | Questions or general information |
| `networking` | 🤝 Networking | Professional networking requests |

## Template Behavior

### Current Implementation:
- **Static Templates**: Both emails use the same content regardless of subject selection
- **Subject Display**: Notification email shows which subject was chosen
- **Universal Auto-Reply**: Same response for all inquiry types

### Potential Enhancements:
- **Subject-Specific Auto-Replies**: Customize response based on inquiry type
- **Priority Handling**: Different response times for different subjects
- **Call-to-Action Customization**: Tailor next steps based on subject

## Security Features

### Input Sanitization:
```typescript
function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['br'],
    ALLOWED_ATTR: []
  })
}
```

### Protection Measures:
- ✅ **XSS Prevention**: All user input sanitized
- ✅ **Limited HTML**: Only `<br>` tags allowed
- ✅ **No Attributes**: Prevents injection attacks
- ✅ **Server-Side Validation**: Zod schema validation before template generation

## Email Configuration

### Resend Settings:
- **From**: `onboarding@resend.dev` (verified domain)
- **To (Notification)**: `nathancwatkins23@gmail.com`
- **To (Auto-Reply)**: User's submitted email address

### Template Styling:
- **Font**: Apple system fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`)
- **Colors**: Gradient header (#667eea to #764ba2), clean gray backgrounds
- **Layout**: Responsive design, max-width 600px
- **Mobile**: Optimized for email clients

## Integration Points

### Form Submission Flow:
1. User submits contact form
2. reCAPTCHA validation (v3)
3. Form data validation (Zod schema)
4. Rate limiting check
5. **Notification email sent** → Nathan
6. **Auto-reply email sent** → User
7. Success response to frontend

### Template Generation:
```typescript
// Notification email
const contactEmailHtml = createContactEmailHtml(validatedData)

// Auto-reply email
const autoReplyHtml = createAutoReplyHtml(validatedData.name)
```

---

## File Locations

- **Templates**: `/lib/email/templates.ts`
- **Validation**: `/lib/validations/contact.ts`
- **API Route**: `/app/api/contact/route.ts`
- **Form Component**: `/components/ContactForm.tsx`

*Last Updated: Portfolio 2.0 - Professional email system with enterprise-grade security*
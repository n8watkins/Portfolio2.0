# Contact Form Setup Steps

## Overview
This document outlines the step-by-step process to make your contact form fully functional. Complete these steps in order to enable secure contact form submissions with email notifications.

---

## 🔐 Step 1: Set Up Google reCAPTCHA

### 1.1 Create reCAPTCHA Project
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account
3. Click **"Create"** to add a new site

### 1.2 Configure reCAPTCHA Settings
1. **Label**: Enter a descriptive name (e.g., "Nathan's Portfolio Contact Form")
2. **reCAPTCHA type**: Select **"reCAPTCHA v2"** → **"I'm not a robot" Checkbox**
3. **Domains**: Add your domains:
   - `localhost` (for development)
   - `nathansportfolio.vercel.app` (or your actual domain)
   - `*.vercel.app` (for Vercel preview deployments)
4. **Accept Terms of Service**
5. Click **"Submit"**

### 1.3 Get Your Keys
After creation, you'll see:
- **Site Key** (starts with `6L...`) - This goes in `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Secret Key** (starts with `6L...`) - This goes in `RECAPTCHA_SECRET_KEY`

### 1.4 Update Environment Variables
Update your `.env.local` file:
```env
# Replace with your actual keys from Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📧 Step 2: Set Up Resend Email Service

### 2.1 Create Resend Account
1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2.2 Get API Key
1. In Resend dashboard, go to **"API Keys"**
2. Click **"Create API Key"**
3. Name it (e.g., "Portfolio Contact Form")
4. Select **"Sending access"** permission
5. Copy the API key (starts with `re_...`)

### 2.3 Configure Sending Domain (Optional but Recommended)
**Option A: Use your own domain**
1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow DNS setup instructions
5. Wait for verification (can take up to 72 hours)

**Option B: Use Resend's shared domain (Quick Start)**
- You can skip domain setup and use Resend's shared domain
- Emails will come from `noreply@trial.example.com` format
- This works immediately but looks less professional

### 2.4 Update Environment Variables
Update your `.env.local` file:
```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Configuration
CONTACT_EMAIL_TO=nathancwatkins@gmail.com
CONTACT_EMAIL_FROM=contact@yourdomain.com  # Or use resend's shared domain
```

---

## 🚀 Step 3: Deploy to Production

### 3.1 Update Production Environment Variables
In your Vercel dashboard:
1. Go to your project
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   RESEND_API_KEY=your_resend_api_key_here
   CONTACT_EMAIL_TO=nathancwatkins@gmail.com
   CONTACT_EMAIL_FROM=contact@yourdomain.com
   ```
4. Make sure to set them for **Production**, **Preview**, and **Development** environments

### 3.2 Deploy Changes
1. Push your code to GitHub (already done ✅)
2. Vercel will automatically deploy
3. Wait for deployment to complete

---

## 🧪 Step 4: Test the Contact Form

### 4.1 Local Testing
1. Start development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000/#contact`
3. Fill out the form with test data
4. Complete reCAPTCHA
5. Submit form
6. Check for:
   - Success message appears
   - Email received at `nathancwatkins@gmail.com`
   - Auto-reply sent to test email

### 4.2 Production Testing
1. Go to your live site
2. Scroll to contact section
3. Submit a test form
4. Verify emails are sent correctly

### 4.3 Security Testing
Test that security measures work:
1. Try submitting form without reCAPTCHA (should fail)
2. Try submitting multiple forms quickly (should hit rate limit)
3. Try submitting with empty fields (should show validation errors)

---

## 🛠 Step 5: Optional Enhancements

### 5.1 Custom Domain Email Setup
If you want emails from your own domain:
1. Complete Resend domain verification (Step 2.3)
2. Update `CONTACT_EMAIL_FROM` to use your domain
3. Test email delivery

### 5.2 Enhanced Analytics
The form already tracks these events:
- `contact_form_view` - Form becomes visible
- `contact_form_field_focus` - User focuses on field
- `contact_form_submit_attempt` - User clicks submit
- `contact_form_submit_success` - Successful submission
- `contact_form_submit_error` - Failed submission
- `contact_form_recaptcha_complete` - reCAPTCHA completed

Monitor these in your Google Analytics dashboard.

### 5.3 Email Template Customization
To customize email templates, edit:
- `lib/email/templates.ts` - Modify HTML/text templates
- Redeploy after changes

---

## 🐛 Troubleshooting

### Common Issues:

**1. reCAPTCHA not loading:**
- Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Verify domain is added to reCAPTCHA console
- Check browser console for errors

**2. Emails not sending:**
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for failed sends
- Verify domain is verified (if using custom domain)

**3. Form validation errors:**
- Check browser console for detailed error messages
- Verify all required fields are filled
- Check network tab for API response errors

**4. Rate limiting issues:**
- Wait 1 hour between test submissions
- Or restart development server to reset rate limit

### Error Codes:
- `429`: Rate limit exceeded (wait 1 hour)
- `400`: Validation error or reCAPTCHA failed
- `500`: Server error (check logs)

---

## 📋 Quick Checklist

- [ ] Google reCAPTCHA configured with site and secret keys
- [ ] Resend account created and API key obtained
- [ ] Environment variables updated locally (`.env.local`)
- [ ] Environment variables set in Vercel dashboard
- [ ] Code deployed to production
- [ ] Local testing completed successfully
- [ ] Production testing completed successfully
- [ ] Security measures tested and working

---

## 🎯 Expected Results

After completing all steps:

1. **Functional Contact Form**: Users can submit inquiries through your portfolio
2. **Email Notifications**: You receive professionally formatted emails for each submission
3. **Auto-Replies**: Users get immediate confirmation emails
4. **Security Protection**: Form is protected against spam and abuse
5. **Analytics Tracking**: All form interactions are tracked in Google Analytics
6. **Professional Appearance**: Form matches your portfolio design perfectly

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Check Vercel deployment logs
4. Verify all environment variables are set correctly

The contact form implementation follows security best practices and should provide a reliable way for potential clients to reach you!
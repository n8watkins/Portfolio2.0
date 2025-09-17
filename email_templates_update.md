# Email Templates Update Plan

## Overview
Replacing the current basic auto-reply email template with a more professional, subject-aware design that provides personalized responses based on the type of inquiry.

## Current State Analysis

### Existing Auto-Reply Template (`templates.ts:72-119`)
- **Strengths:**
  - Security: Uses DOMPurify sanitization
  - Simple, clean design
  - Consistent branding with gradient
  - Basic personalization with name

- **Weaknesses:**
  - Generic response regardless of inquiry type
  - Limited engagement/call-to-action
  - Basic styling compared to modern email standards
  - No social proof or specific next steps

### New Template Features
- Table-based layout for better email client compatibility
- Subject-aware conditional content
- Professional typography and spacing
- Enhanced personalization with dynamic URLs
- Social proof with specific project examples
- Proper email standards (preheader, viewport, etc.)

## Implementation Plan

### Phase 1: Infrastructure Setup
1. **Environment Variables Configuration**
   - Add URL placeholders to environment config
   - Create fallback values for missing URLs
   - Update EMAIL_CONFIG in resend.ts

2. **Security Integration**
   - Port DOMPurify sanitization to new template
   - Sanitize all dynamic content inputs
   - Maintain existing security standards

### Phase 2: Template Integration
3. **Subject Mapping**
   - Map template subject_key to existing subject validation enum
   - Ensure conditional content aligns with subjectOptions
   - Handle edge cases for unknown subjects

4. **Data Structure Updates**
   - Update createAutoReplyHtml function signature
   - Add ContactFormData parameter for subject access
   - Maintain backward compatibility

### Phase 3: Template Implementation
5. **HTML Template Replacement**
   - Replace current auto-reply template with new design
   - Implement conditional content blocks
   - Add proper error handling for missing data

6. **Dynamic Content Integration**
   - Implement first_name_fallback_there logic
   - Add subject_label mapping
   - Configure URL variables with environment fallbacks

### Phase 4: Testing & Validation
7. **Functionality Testing**
   - Test all subject types render correctly
   - Verify security sanitization works
   - Ensure email client compatibility
   - Test with missing/invalid data

## Required Environment Variables

```bash
# New variables needed
SITE_URL=https://byn8.com
SITE_DOMAIN=byn8.com
LINKEDIN_URL=https://www.linkedin.com/in/n8watkins/
GITHUB_URL=https://github.com/n8watkins
CAL_URL=https://cal.com/n8watkins  # Calendar booking link
FAQ_URL=https://byn8.com/faq      # FAQ page (if exists)
```

## Template Variable Mapping

| Template Variable | Source | Fallback |
|------------------|--------|----------|
| `{{first_name_fallback_there}}` | ContactFormData.name.split(' ')[0] | "there" |
| `{{subject_label}}` | subjectOptions.find(opt => opt.value === data.subject)?.label | data.subject |
| `{{subject_key}}` | ContactFormData.subject | "general_inquiry" |
| `{{site_url}}` | process.env.SITE_URL | "https://byn8.com" |
| `{{site_domain}}` | process.env.SITE_DOMAIN | "byn8.com" |
| `{{linkedin_url}}` | process.env.LINKEDIN_URL | "#" |
| `{{github_url}}` | process.env.GITHUB_URL | "#" |
| `{{cal_url}}` | process.env.CAL_URL | "#" |
| `{{faq_url}}` | process.env.FAQ_URL | "#" |

## Conditional Content Logic

### Subject-Aware Responses:
- **work_together**: Calendar booking CTA
- **project_opportunity**: Request for project brief/Loom
- **collaboration**: Request for collaboration outline
- **general_inquiry**: FAQ link
- **networking**: LinkedIn connection

## Risk Assessment

### Low Risk:
- Template styling changes
- Adding environment variables
- Enhanced personalization

### Medium Risk:
- Changing function signatures
- Template logic complexity
- Email client compatibility

### Mitigation:
- Maintain existing security practices
- Test thoroughly across email clients
- Keep fallbacks for all dynamic content
- Preserve existing functionality during transition

## Success Criteria

1. ✅ All subject types render appropriate content
2. ✅ Security sanitization maintained
3. ✅ Professional appearance across email clients
4. ✅ All URLs resolve correctly
5. ✅ Graceful handling of missing data
6. ✅ No breaking changes to existing contact form flow

## Post-Implementation

### Monitoring:
- Track email delivery rates
- Monitor for any client rendering issues
- Collect user feedback on new template

### Future Enhancements:
- A/B test different CTAs
- Add more granular subject-specific content
- Consider rich media elements for supported clients
# 📌 PIN IT - Future Action Items

Items pinned for future implementation when conditions are met.

## 🌐 **Domain-Dependent Items**
*Action required: Acquire custom domain (e.g., nathanwatkins.dev)*

### **Professional Email Setup**
- **What**: Switch from generic contact form to custom domain email
- **Changes needed**:
  - Update Resend configuration to use `contact@nathanwatkins.dev`
  - Configure domain DNS records for email delivery
  - Update contact form "from" address
  - Test email deliverability with custom domain
- **Impact**: More professional contact experience
- **Files to modify**: `app/api/contact/route.ts`, environment variables

---

## 🎯 **Project-Scale Dependent Items**
*Action required: Portfolio reaches 8+ projects with diverse tech stacks*

### **Project Filtering System**
- **What**: Add filtering/categorization for project discovery
- **Trigger condition**: When we have enough projects to make filtering meaningful
- **Implementation plan**:
  ```typescript
  // Add to data/index.tsx
  interface ProjectFilter {
    technologies: string[]
    type: 'frontend' | 'fullstack' | 'backend' | 'mobile'
    industry: 'saas' | 'ecommerce' | 'entertainment' | 'education'
    complexity: 'simple' | 'intermediate' | 'complex'
  }
  ```
- **UI changes**: Filter bar above project grid, animated filtering
- **Files to modify**: `components/Projects.tsx`, `data/index.tsx`

---

## 🔄 **Review Date**
**Next review**: When either condition above is met
**Current status**: Portfolio is production-ready without these items
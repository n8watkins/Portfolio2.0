# Nathan's Portfolio 2.0 🚀

A modern, production-ready developer portfolio built with Next.js 14, featuring enterprise-grade contact functionality, advanced animations, and comprehensive security measures.

## ✨ Key Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Enterprise Contact Form**: Production-ready with Resend integration, reCAPTCHA v3, and comprehensive security
- **Advanced Animations**: Framer Motion with scroll-triggered fade-ins and interactive elements
- **Performance Optimized**: Speed Insights, optimized images, and minimal bundle size
- **Security First**: XSS protection, rate limiting, honeypot fields, and secure email handling
- **Fully Responsive**: Mobile-first design with seamless desktop experience
- **Analytics Integration**: Google Analytics with custom event tracking
- **Dark/Light Theme**: Automatic system preference detection with manual toggle

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form + Zod validation
- Next Themes for theme management

**Backend:**
- Next.js API Routes
- Resend for email delivery
- Google reCAPTCHA v3
- Comprehensive security middleware

**Development:**
- ESLint + TypeScript compiler
- Vercel for deployment
- Sentry for error monitoring

### Project Structure

```
Portfolio2.0/
├── app/                          # Next.js 14 App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page component
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── BentoGrid.tsx         # Portfolio grid layout
│   │   ├── ContactInput.tsx      # Form input component
│   │   ├── ContactSelect.tsx     # Form select component
│   │   ├── ContactTextarea.tsx   # Form textarea component
│   │   ├── FloatingNavbar.tsx    # Sticky navigation
│   │   ├── InfiniteMovingCards.tsx # Tech stack carousel
│   │   ├── MagicButton.tsx       # Animated button component
│   │   └── MovingBorder.tsx      # Animated border effects
│   ├── ContactForm.tsx           # Main contact form
│   ├── Experience.tsx            # Work experience section
│   ├── Footer.tsx                # Site footer
│   ├── Grid.tsx                  # Background grid pattern
│   ├── Hero.tsx                  # Landing section
│   ├── RecentProjects.tsx        # Project showcase
│   └── Testimonials.tsx          # Client testimonials
├── data/                         # Static data and configurations
│   ├── confetti.json             # Lottie animation data
│   └── index.tsx                 # Site content and configurations
├── lib/                          # Utilities and configurations
│   ├── analytics.ts              # Google Analytics tracking
│   ├── utils.ts                  # Utility functions
│   └── validations/
│       └── contact.ts            # Contact form validation schemas
├── public/                       # Static assets
│   ├── projects/                 # Project images
│   └── [various image assets]
└── [config files]                # Next.js, TypeScript, Tailwind configs
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Environment variables (see `.env.local.example`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/n8watkins/Portfolio2.0.git
   cd Portfolio2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Environment Variables

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# Portfolio Info
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_VERSION=2.0

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Resend Email Service
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_TO=your-email@domain.com
CONTACT_EMAIL_FROM=contact@your-domain.com
```

## 📧 Contact Form Deep Dive

The contact form is a production-ready enterprise solution with multiple layers of security and validation.

### Features

- **Client-side validation** with React Hook Form + Zod
- **Server-side validation** with comprehensive sanitization
- **reCAPTCHA v3** for invisible bot protection
- **Rate limiting** to prevent spam (5 requests per 15 minutes)
- **Honeypot field** for additional bot detection
- **XSS protection** with DOMPurify sanitization
- **Professional email templates** with auto-reply functionality
- **Real-time character counting** and field validation
- **Smooth animations** and loading states
- **Accessibility compliant** with WCAG guidelines

### Technical Implementation

**Frontend Flow:**
1. User fills out form with real-time validation
2. On submit, reCAPTCHA executes invisibly
3. Form validation runs with reCAPTCHA token
4. API request sent with sanitized data
5. Success/error states with animations

**Backend Flow:**
1. Rate limiting check per IP address
2. Honeypot field validation
3. reCAPTCHA token verification
4. Data sanitization and validation
5. Email sending via Resend API
6. Auto-reply confirmation email

### Security Measures

- **Input sanitization** with DOMPurify
- **Rate limiting** with in-memory store
- **reCAPTCHA verification** on server-side
- **Honeypot detection** for bots
- **Environment-based bypasses** for development
- **Error handling** without information leakage

## 🎨 Animations & UX

### Framer Motion Integration

- **Scroll-triggered animations** with intersection observers
- **Staggered reveals** for portfolio grid items
- **Smooth page transitions** and micro-interactions
- **Loading states** with skeleton animations
- **Success celebrations** with Lottie animations

### Performance Optimizations

- **Lazy loading** for images and components
- **Code splitting** for optimal bundle sizes
- **Next.js Image optimization** with proper sizing
- **CSS-in-JS optimization** with Tailwind
- **Analytics integration** without performance impact

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run clean        # Clean build artifacts
```

### Code Quality

- **TypeScript** for type safety and developer experience
- **ESLint** with Next.js configuration
- **Prettier** integration for consistent formatting
- **Strict mode** enabled for React and TypeScript
- **Component-driven development** with reusable UI elements

## 📈 Analytics & Monitoring

- **Google Analytics 4** with custom event tracking
- **Vercel Speed Insights** for performance monitoring
- **Sentry integration** for error tracking and performance
- **Contact form analytics** with user interaction tracking

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🛠️ Customization

### Content Management

- **Portfolio data**: Edit `data/index.tsx`
- **Project information**: Update project arrays and images
- **Contact details**: Modify footer and contact sections
- **Theme colors**: Customize in `app/globals.css`

### Adding New Sections

1. Create component in `components/`
2. Add to main page in `app/page.tsx`
3. Update navigation in `FloatingNavbar.tsx`
4. Add animations and styling

## 🔒 Security Considerations

- Never commit API keys or secrets
- Use environment variables for all sensitive data
- Regular dependency updates for security patches
- Rate limiting and validation on all endpoints
- Proper error handling without information disclosure

## 📝 Development Notes

- **CSS Masks**: Utilized for gradient effects in infinite card animations
- **Marquee Components**: Magic UI marquee provides superior infinite scroll performance
- **Animation Performance**: Framer Motion optimized for 60fps smooth interactions
- **Form UX**: reCAPTCHA v3 integration maintains seamless user experience

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Nathan Watkins using modern web technologies.


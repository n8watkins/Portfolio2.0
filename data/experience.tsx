export type WorkExperienceItem = {
  id: number
  company: string
  companyUrl?: string
  location: string
  role: string
  period: string
  bullets: string[]
  additional?: boolean
}

export const workExperience: WorkExperienceItem[] = [
  {
    id: 1,
    company: 'Appturnity',
    companyUrl: 'https://appturnity.web.app',
    location: 'Los Angeles, CA',
    role: 'Full Stack Developer & Co-Founder',
    period: 'March 2023 – Present',
    bullets: [
      'Lead end-to-end development across healthcare, property management, and HVAC sectors using React, Next.js, and TypeScript.',
      'Built internal dashboards and automation tools with Next.js API Routes, Firebase, Cloudflare Workers, and Gemini AI to streamline workflows and deliver responsive, SEO-optimized interfaces.',
      'Automated blood-test workflows via Python and Cloudflare Workers using the Gemini API, replacing manual entry and saving ~$20K/year.',
      'Developed in-house AI software for client sourcing using OpenAI browser agents to evaluate prospective websites by performance, accessibility, and SEO.',
      'Implemented ISR to improve LCP/INP metrics by ~35%, boosting performance and organic visibility across client projects.',
      'Integrated GTM and GA4 for conversion tracking and campaign analytics.',
    ],
  },
  {
    id: 2,
    company: 'Donovan Golf Course Management',
    location: 'Pasadena, CA',
    role: 'Web Developer',
    period: 'June 2022 – January 2023',
    bullets: [
      'Consulted and developed multiple course and event websites — Arroyo Seco Golf Course, Riverlakes Golf Club, and Sierra Lakes Golf Club — using React, Next.js, and Firebase.',
      'Integrated Firebase Hosting, Cloudinary, and Google Analytics for real-time content updates, optimized media delivery, and performance tracking.',
      'Improved mobile Lighthouse scores for best practices and SEO by 40 points across all projects.',
    ],
  },
  {
    id: 3,
    company: 'Realtek Solutions',
    location: 'Los Angeles, CA',
    role: 'Frontend Developer',
    period: 'July 2021 – May 2022',
    bullets: [
      'Developed and launched 5+ small business websites across dental, HVAC, and barbershop industries using React, Tailwind CSS, and Firebase.',
      'Implemented performance enhancements (image compression, lazy loading, cross-browser testing), improving page load times by ~40%.',
      'Deployed via Firebase Hosting and Vercel with integrated analytics dashboards, enabling clients to track engagement and update site content.',
    ],
  },
  {
    id: 4,
    company: 'The Coder School',
    location: 'Santa Monica, CA',
    role: 'Programming Instructor',
    period: 'June 2024 – Present',
    additional: true,
    bullets: [
      'Instruct students on weekends in building full-stack applications using JavaScript, Python, and Scratch.',
      'Guide students in leveraging LLMs for coding and debugging beginner projects.',
    ],
  },
]

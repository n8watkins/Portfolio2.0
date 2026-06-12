export const projects = [
  {
    id: 1,
    title: 'GeminiGPT',
    subTitle: 'AI Chat Platform',
    des: `A full-stack AI chat platform powered by Google's Gemini 2.5 Flash. Supports multi-chat sessions, cross-chat semantic search over LanceDB vector embeddings, PDF and DOCX document understanding, and real-time response streaming over WebSockets — with a bring-your-own-key model that keeps usage private.`,
    images: ['/projects/geminigpt.webp', '/projects/geminigpt1.webp'],
    technologies: {
      Frontend: {
        descriptionParts: [
          {
            text: 'Responsive chat UI with modern components',
            icons: [{ icon: 're.svg' }, { icon: 'tail.svg' }],
          },
          {
            text: 'Next.js App Router with server-side rendering',
            icons: [{ icon: 'next.svg' }],
          },
          {
            text: 'End-to-end type safety',
            icons: [{ icon: 'ts.svg' }],
          },
        ],
      },
      Backend: {
        descriptionParts: [
          {
            text: 'Gemini 2.5 Flash with streaming responses and function calling',
            icons: [{ icon: 'gemini.svg' }],
          },
          {
            text: 'Real-time message streaming over WebSockets',
            icons: [{ icon: 'socketio.svg' }],
          },
          {
            text: 'SQLite chat persistence + LanceDB vector search across conversations',
            icons: [{ icon: 'sqlite.svg' }],
          },
          {
            text: 'Custom Node server with PDF / DOCX document processing',
            icons: [{ icon: 'node.png' }],
          },
        ],
      },
      Cloud: {
        descriptionParts: [
          {
            text: 'Containerized deployment on Railway',
            icons: [{ icon: 'railway.svg' }, { icon: 'dock.svg' }],
          },
          {
            text: 'Version control and CI via GitHub',
            icons: [{ icon: 'github.png' }],
          },
        ],
      },
    },
    highlights: [
      'Responses stream token-by-token from Gemini 2.5 Flash over Socket.IO WebSockets, so answers render as they generate — no waiting on the full completion.',
      'Every message is embedded and indexed in a LanceDB vector database, enabling semantic search that recalls context across all of your past chats, not just the current one.',
      'Drop in PDFs and DOCX files — a custom Node.js pipeline parses them server-side so the model can reason over your documents.',
      'Bring-your-own-key design: your Gemini API key stays client-side, so usage and conversations remain private.',
      'Chats persist in SQLite; the whole app ships as a Docker container deployed on Railway with CI through GitHub.',
    ],
    github: 'https://github.com/n8watkins/GeminiGPT',
  },
  {
    id: 2,
    title: 'Net-Trailer',
    subTitle: 'Netflix Clone',
    des: `A Netflix-style streaming experience: browse TMDB-powered titles, watch trailers, and build a personal watchlist. Includes secure authentication with NextAuth, full Stripe and PayPal subscription checkout flows, and Firebase-backed persistence.`,
    images: [
      '/projects/netflix.webp',
      '/projects/netflix1.webp',
      '/projects/netflix2.webp',
      '/projects/netflix3.webp',
    ],
    technologies: {
      Frontend: {
        descriptionParts: [
          {
            text: 'A responsive design with modern UI components',
            icons: [{ icon: 're.svg' }, { icon: 'tail.svg' }],
          },
          {
            text: 'Leveraging Next.js for SSR, SSG, and efficient routing',
            icons: [{ icon: 'next.svg' }],
          },
          {
            text: 'Enhancing reliability with type safety',
            icons: [{ icon: 'ts.svg' }],
          },
        ],
      },
      Backend: {
        descriptionParts: [
          {
            text: 'Integrated payment gateways for secure transactions',
            icons: [{ icon: 'paypal.png' }, { icon: 'stripe.png' }],
          },
          {
            text: 'Implemented secure authentication and authorization',
            icons: [{ icon: 'nextAuth.png' }],
          },
        ],
      },
      Cloud: {
        descriptionParts: [
          {
            text: 'Deployed with modern hosting and version control',
            icons: [{ icon: 'vercel.png' }, { icon: 'github.png' }],
          },
          {
            text: 'Utilized image hosting for optimized content delivery',
            icons: [{ icon: 'cloud.svg' }],
          },
          {
            text: 'Leveraged Firebase for real-time database and storage',
            icons: [{ icon: 'firebase.png' }],
          },
        ],
      },
    },
    highlights: [
      'Browses live TMDB data — trending titles, genre rows, and trailer playback — with a cinematic, Netflix-style UI built in React and Tailwind CSS.',
      'Secure sign-in with NextAuth; sessions gate the watchlist and checkout flows.',
      'Full subscription checkout implemented twice over: both Stripe and PayPal payment flows, end to end.',
      'Your watchlist and profile persist in Firebase, syncing in real time across sessions.',
      'Server-rendered with Next.js and deployed on Vercel, with Cloudinary handling optimized image delivery.',
    ],
    github: 'https://github.com/n8watkins/net_trailer',
    liveSite: 'https://net-trailers.vercel.app/',
  },
]

export const techNameMapping = {
  //FRONTEND
  //----->Frameworks
  're.svg': 'React',
  'next.svg': 'Next.js',
  'ts.svg': 'TypeScript',
  //----->Styling & UI Libraries
  'tail.svg': 'Tailwind CSS',
  'shadcn.png': 'ShadCN UI',
  //----->Animation & Interaction
  'three.svg': 'Three.js',
  'gsap.svg': 'GSAP',
  'fm.svg': 'Framer Motion',

  // BACKEND
  //----->Runtime & Logic
  'node.png': 'Node.js',
  'prisma.png': 'Prisma',
  'jest.png': 'Jest',
  //----->API
  'graphql.png': 'GraphQL',
  'apollo.png': 'Apollo',
  'paypal.png': 'Paypal API',
  'stripe.png': 'Stripe API',
  'wha.svg': 'WhatsApp API',
  'insta.svg': 'Instagram API',
  'gpt.png': 'ChatGPT API',
  'gemini.svg': 'Gemini API',
  'socketio.svg': 'Socket.IO',
  'sqlite.svg': 'SQLite',
  'railway.svg': 'Railway',
  //----->Auth
  'clerk.svg': 'Clerk',
  'nextAuth.png': 'NextAuth',
  'zod.png': 'Zod',

  // Infrastructure
  //----->Media & Storage
  'cloud.svg': 'Cloudinary',
  //----->databases
  'firebase.png': 'Firebase',
  'aws.png': 'AWS',
  'google.png': 'Google Cloud Platform',
  'mongo.png': 'MongoDB',
  'supabase.png': 'Supabase',
  'PostgreSQL.png': 'PostgreSQL',
  'mysql.png': 'MySQL',
  //----->hosting
  'github.png': 'GitHub',
  'awsAmplify.png': 'Amplify',
  'vercel.png': 'Vercel',
  'netlify.png': 'Netlify',
  'heroku.png': 'Heroku',
  'host.svg': 'Hostinger',
  'digitalocean.png': 'DigitalOcean',
  'replit.png': 'Replit',
  'render.png': 'Render',
  'railway.png': 'Railway',
  'drizzle.png': 'Drizzle ORM',
  'express.svg': 'Express.js',
  'axios.svg': 'Axios',
  'sentry.png': 'Sentry',
  'eslint.png': 'ESLint',
  'vite.svg': 'Vite',
  'docker.svg': 'Docker',

  //----->Containerization & Orchestration
  'dock.svg': 'Docker',
  'kubernetes.png': 'Kubernetes',
  'github.svg': 'GitHub',
}

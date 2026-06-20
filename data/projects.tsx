export const projects = [
  {
    id: 3,
    title: 'Echo',
    subTitle: 'Realtime Voice Agent',
    des: `A browser-based realtime voice AI — speak and it speaks back, streamed and interruptible. Echo closes the whole spoken loop (mic → transcribe → think → speak) with function-calling tools in the middle and a turn-taking state machine that lets you talk over it. The model was the easy part; the ~800 milliseconds of perceived latency were the hard part.`,
    images: ['/projects/echo.webp', '/projects/echo1.webp'],
    technologies: {
      Frontend: {
        descriptionParts: [
          {
            text: 'Realtime voice UI — a turn-state orb, streamed live captions, 6 personas, and a first-class typed fallback',
            icons: [{ icon: 're.svg' }, { icon: 'tail.svg' }],
          },
          {
            text: 'Next.js 16 App Router on React 19, end-to-end type-safe',
            icons: [{ icon: 'next.svg' }, { icon: 'ts.svg' }],
          },
        ],
      },
      Backend: {
        descriptionParts: [
          {
            text: 'Gemini streams tokens and calls tools mid-conversation — weather, time-zone, and web search',
            icons: [{ icon: 'gemini.svg' }],
          },
          {
            text: 'Speak-as-you-stream: a sentence chunker fires text-to-speech on the first sentence to beat the ~800ms latency budget',
            icons: [{ icon: 'node.png' }],
          },
          {
            text: 'Browser-side STT/TTS (Web Speech API) with the model streamed over Server-Sent Events; turn-taking is an explicit state machine',
            icons: [{ icon: 'ts.svg' }],
          },
          {
            text: 'Optional Live engine: native Gemini Live speech-to-speech over a raw WebSocket opened from the browser straight to Gemini, with single-use ephemeral tokens',
            icons: [{ icon: 'gemini.svg' }],
          },
        ],
      },
      Cloud: {
        descriptionParts: [
          {
            text: 'Ships to Render (free tier) — browser-side audio means no audio infrastructure to provision',
            icons: [{ icon: 'render.svg' }],
          },
          {
            text: 'Version control and CI via GitHub',
            icons: [{ icon: 'github.png' }],
          },
        ],
      },
    },
    highlights: [
      'Closes the whole spoken loop — mic → transcribe → think → speak — and lets you cut Echo off mid-sentence. Barge-in interruption is what makes it feel like a conversation instead of dictation.',
      'The hard part is the ~800ms latency budget, not the model: a sentence chunker starts text-to-speech on the first complete sentence while the rest of the reply is still generating.',
      'Gemini answers stream token-by-token over Server-Sent Events and can call weather, time-zone, and web-search tools mid-reply.',
      'Turn-taking is a single explicit state machine (idle → listening → thinking → speaking → barge-in), so the many out-of-order async voice events become no-ops instead of bugs.',
      'Two voice engines behind one toggle: a hand-built Classic pipeline (browser STT/TTS) and Gemini’s native Live API — PCM speech-to-speech over WebSocket, connected with single-use ephemeral tokens.',
      'Zero-setup demo on a shared key with a usage meter, plus bring-your-own-key for unlimited use; STT/TTS run in the browser, so no audio ever leaves your machine.',
    ],
    github: 'https://github.com/n8watkins/echo-genai-voice-agent',
  },
  {
    id: 4,
    title: 'Scout',
    subTitle: 'Agentic Research Assistant',
    des: `An AI agent that plans, searches the live web, reads sources, and writes a cited report — streaming each step as it happens. Scout is a from-scratch ReAct loop on Gemini with function calling and SSE: no agent framework, no black box. It doesn't hand you an answer, it shows you the reasoning loop that produced it. The process is the product.`,
    images: ['/projects/scout.webp', '/projects/scout1.webp'],
    technologies: {
      Frontend: {
        descriptionParts: [
          {
            text: 'Live agent trace — plan, think, search, and read steps stream in one at a time, so latency reads as progress',
            icons: [{ icon: 're.svg' }, { icon: 'tail.svg' }],
          },
          {
            text: 'Next.js 16 App Router on React 19, type-safe; cited reports rendered from Markdown',
            icons: [{ icon: 'next.svg' }, { icon: 'ts.svg' }],
          },
        ],
      },
      Backend: {
        descriptionParts: [
          {
            text: 'From-scratch ReAct loop on Gemini with function calling: web_search, fetch_url, and an explicit finish tool',
            icons: [{ icon: 'gemini.svg' }],
          },
          {
            text: 'Every agent step streamed to the UI over Server-Sent Events',
            icons: [{ icon: 'node.png' }],
          },
          {
            text: 'SSRF-hardened fetcher — per-hop host re-validation through redirects, blocked private IPs, size/time caps, DOMPurify',
            icons: [{ icon: 'ts.svg' }],
          },
          {
            text: 'better-sqlite3 run history, session-scoped with payload caps and a write rate limit',
            icons: [{ icon: 'sqlite.svg' }],
          },
        ],
      },
      Cloud: {
        descriptionParts: [
          {
            text: 'Its own web_search tool needs no search key — Tavily and Google CSE when keyed, falling back to keyless Wikipedia and DuckDuckGo so the demo always cites real sources',
            icons: [{ icon: 'websearch.svg' }],
          },
          {
            text: 'Ships to Render (free tier); source and CI on GitHub',
            icons: [{ icon: 'render.svg' }, { icon: 'github.png' }],
          },
        ],
      },
    },
    highlights: [
      'An agent is a while-loop with a budget and a stop condition — and “decide when you’re done” is the hard part. Scout makes that loop legible: every plan, thought, search, and read streams to the screen.',
      'Cited by contract: the synthesis step may only assert facts from a fetched source, every claim carries a [n] marker, and a fabricated citation with no source renders as plain, visibly-unsupported text.',
      'A step budget plus an explicit finish tool tame the two classic agent failure modes — pacing the room without ever stopping, and answering from a single snippet it never opened.',
      'Each observation is summarized before it enters working memory, so an 8-step run never blows the context window — full page text lives only in the Sources panel.',
      'fetch_url is treated as the SSRF footgun it is: http/https only, per-hop host re-validation through redirects, blocked private/link-local IPs, 8s/2MB caps, and DOMPurify on the content.',
      'Zero-setup on a shared demo key with a live capacity meter; bring-your-own Gemini key (stored only in your browser) for unlimited runs, with heavier models server-gated to BYOK.',
    ],
    github: 'https://github.com/n8watkins/scout-agentic-ai-researcher',
  },
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
    subTitle: 'AI-Powered Netflix Clone',
    des: `A Netflix-style streaming app with an AI brain. Describe what you're in the mood for in plain language and Gemini turns it into tailored picks, while a personalized "Recommended For You" engine learns from your watch history and feedback. Plus TMDB-powered browsing and trailers, secure auth, full Stripe and PayPal subscription checkout, and Firebase-backed persistence.`,
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
            text: 'AI recommendations powered by Gemini — natural-language search that reads your intent, plus a personalized engine that learns from your history with a feedback loop',
            icons: [{ icon: 'gemini.svg' }],
          },
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
      'Tell it what you’re in the mood for in plain English — a Gemini-powered analyzer reads your intent (media type, genres, vibe) and builds a matching suggestion row on the fly, with a multi-model router that falls back automatically.',
      'A personalized “Recommended For You” engine learns from your full watch and rating history with a real-time feedback loop — dislikes and skips reshape future picks, and each suggestion can explain why it surfaced.',
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
  'websearch.svg': 'Web search',
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
  'render.svg': 'Render',
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

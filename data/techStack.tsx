import { BiLogoTypescript } from 'react-icons/bi'
import { FaAws, FaGitAlt, FaHtml5, FaReact } from 'react-icons/fa6'
import { IoLogoCss3, IoLogoJavascript } from 'react-icons/io'
import { RiFirebaseLine, RiNextjsLine, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiJest,
  SiMui,
  SiPrisma,
  SiRecoil,
  SiShadcnui,
  SiZod,
  SiGoogleanalytics,
  SiSentry,
  SiGooglecloud,
  SiGraphql,
  SiEslint,
  SiPrettier,
  SiFigma,
  SiStripe,
  SiPaypal,
  SiVite,
  SiPostman,
  SiPostgresql,
  SiClerk,
  SiNextdotjs,
  SiAwsamplify,
} from 'react-icons/si'
import { AiOutlineApi } from 'react-icons/ai' // For APIs
import { GrMysql } from 'react-icons/gr'

export const tech_libraries = [
  {
    name: 'React.js',
    icon: <FaReact className="w-7 h-7" />,
    description: 'JavaScript library for building interactive user interfaces efficiently.',
    category: 'Frontend Library',
  },
  {
    name: 'Next.js',
    icon: <RiNextjsLine className="w-7 h-7" />,
    description: 'React framework for production-grade applications with server-side rendering.',
    category: 'Frontend Framework',
  },
  {
    name: 'Prisma',
    icon: <SiPrisma className="w-7 h-7" />,
    description: 'Next-generation ORM for Node.js and TypeScript.',
    category: 'Database Tool',
  },
  {
    name: 'TypeScript',
    icon: <BiLogoTypescript className="w-7 h-7" />,
    description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
    category: 'Programming Language',
  },
  {
    name: 'Firebase',
    icon: <RiFirebaseLine className="w-7 h-7" />,
    description: 'Platform for building web and mobile applications.',
    category: 'Backend as a Service',
  },
  {
    name: 'HTML5',
    icon: <FaHtml5 className="w-7 h-7" />,
    description: 'Markup language for structuring web content.',
    category: 'Frontend Technology',
  },
  {
    name: 'CSS3',
    icon: <IoLogoCss3 className="w-7 h-7" />,
    description: 'Style sheet language for designing web page layouts.',
    category: 'Frontend Technology',
  },
  {
    name: 'Tailwind',
    icon: <RiTailwindCssFill className="w-7 h-7" />,
    description: 'Utility-first CSS framework for rapid UI development.',
    category: 'CSS Framework',
  },
  {
    name: 'ES6+',
    icon: <IoLogoJavascript className="w-7 h-7" />,
    description: 'Modern version of JavaScript with enhanced features.',
    category: 'Programming Language',
  },
  {
    name: 'Jest',
    icon: <SiJest className="w-7 h-7" />,
    description: 'JavaScript testing framework with a focus on simplicity.',
    category: 'Testing Framework',
  },
  {
    name: 'Git',
    icon: <FaGitAlt className="w-7 h-7" />,
    description: 'Distributed version control system for tracking code changes.',
    category: 'Version Control',
  },
  {
    name: 'AWS Amplify',
    icon: <SiAwsamplify className="w-7 h-7" />,
    description: 'Set of tools for building scalable mobile and web apps.',
    category: 'Development Platform',
  },
  {
    name: 'Recoil',
    icon: <SiRecoil className="w-7 h-7" />,
    description: 'State management library for React applications.',
    category: 'State Management',
  },
  {
    name: 'Material-UI',
    icon: <SiMui className="w-7 h-7" />,
    description: 'React UI framework with pre-built components.',
    category: 'UI Framework',
  },
  {
    name: 'ShadCN',
    icon: <SiShadcnui className="w-7 h-7" />,
    description: 'Customizable UI components for modern web applications.',
    category: 'UI Component Library',
  },
  {
    name: 'Zod',
    icon: <SiZod className="w-7 h-7" />,
    description: 'TypeScript-first schema declaration and validation library.',
    category: 'Data Validation',
  },
]

export const tech_tools = [
  {
    name: 'GraphQL',
    icon: <SiGraphql className="w-7 h-7" />,
    description: 'Query language for APIs and runtime for executing queries.',
    category: 'API Technology',
  },
  {
    name: 'MySQL',
    icon: <GrMysql className="w-7 h-7" />,
    description: 'Open-source relational database management system.',
    category: 'Database',
  },
  {
    name: 'Google Cloud',
    icon: <SiGooglecloud className="w-7 h-7" />,
    description: 'Suite of cloud computing services by Google.',
    category: 'Cloud Platform',
  },
  {
    name: 'Sentry',
    icon: <SiSentry className="w-7 h-7" />,
    description: 'Application monitoring and error tracking software.',
    category: 'DevOps Tool',
  },
  {
    name: 'Google Analytics',
    icon: <SiGoogleanalytics className="w-7 h-7" />,
    description: 'Web analytics service for tracking website traffic.',
    category: 'Analytics Tool',
  },
  {
    name: 'ESLint',
    icon: <SiEslint className="w-7 h-7" />,
    description: 'Static code analysis tool for identifying problematic JavaScript patterns.',
    category: 'Development Tool',
  },
  {
    name: 'Prettier',
    icon: <SiPrettier className="w-7 h-7" />,
    description: 'Opinionated code formatter for consistent code style.',
    category: 'Development Tool',
  },
  {
    name: 'Figma',
    icon: <SiFigma className="w-7 h-7" />,
    description: 'Cloud-based design and prototyping tool.',
    category: 'Design Tool',
  },
  {
    name: 'Stripe API',
    icon: <SiStripe className="w-7 h-7" />,
    description: 'Payment processing platform for online businesses.',
    category: 'Payment Gateway',
  },
  {
    name: 'React-Icons',
    icon: <FaReact className="w-7 h-7" />,
    description: 'Icon library for React applications.',
    category: 'UI Component',
  },
  {
    name: 'Paypal API',
    icon: <SiPaypal className="w-7 h-7" />,
    description: 'Online payment system supporting money transfers.',
    category: 'Payment Gateway',
  },
  {
    name: 'Context API',
    icon: <FaReact className="w-7 h-7" />,
    description: "React's built-in state management for component trees.",
    category: 'State Management',
  },
  {
    name: 'Vite',
    icon: <SiVite className="w-7 h-7" />,
    description: 'Next-generation frontend tooling for faster development.',
    category: 'Build Tool',
  },
  {
    name: 'Postman',
    icon: <SiPostman className="w-7 h-7" />,
    description: 'API development and testing tool.',
    category: 'Development Tool',
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql className="w-7 h-7" />,
    description: 'Powerful, open-source object-relational database system.',
    category: 'Database',
  },
  {
    name: 'Clerk Auth',
    icon: <SiClerk className="w-7 h-7" />,
    description: 'User authentication and management solution.',
    category: 'Authentication Service',
  },
  {
    name: 'Next Auth',
    icon: <SiNextdotjs className="w-7 h-7" />,
    description: 'Authentication system for Next.js applications.',
    category: 'Authentication Library',
  },
  {
    name: 'REST APIs',
    icon: <AiOutlineApi className="w-7 h-7" />,
    description: 'Architectural style for designing networked applications.',
    category: 'API Architecture',
  },
]

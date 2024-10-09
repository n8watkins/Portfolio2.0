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

export const coloredSquares = [
  [3, 4],
  [7, 1],
  [2, 3],
  [5, 6],
  [4, 5],
  [1, 7],
  [6, 2],
  [8, 3],
  [9, 5],
  [3, 2],
  [4, 8],
  [5, 9],
  [7, 3],
  [2, 8],
  [6, 4],
  [8, 6],
  [3, 7],
  [9, 1],
  [1, 5],
  [4, 2],
  [10, 2],
  [11, 4],
  [12, 6],
  [13, 1],
  [14, 3],
  [15, 5],
  [1, 8],
  [2, 9],
  [3, 10],
  [4, 11],
  [5, 12],
  [6, 13],
  [7, 14],
  [8, 15],
  [9, 7],
  [10, 8],
  [11, 9],
  [12, 10],
  [13, 11],
  [14, 12],
  [15, 13],
  [1, 3],
  [2, 5],
  [3, 7],
  [4, 9],
  [5, 11],
  [6, 13],
  [7, 15],
  [8, 2],
  [9, 4],
  [10, 6],
  [11, 8],
  [12, 10],
  [13, 12],
  [14, 14],
  [15, 1],
  [14, 3],
  [13, 5],
  [12, 7],
  [11, 9],
  [10, 11],
  [9, 13],
  [1, 9],
  [2, 10],
  [3, 11],
  [4, 12],
  [5, 13],
  [6, 14],
  [7, 15],
  [8, 1],
  [9, 2],
  [10, 3],
  [11, 4],
  [12, 5],
  [13, 6],
  [14, 7],
  [15, 8],
  [1, 6],
  [2, 7],
  [3, 8],
  [4, 10],
  [5, 14],
  [6, 15],
  [7, 2],
  [8, 4],
  [9, 6],
  [10, 9],
  [11, 12],
  [12, 14],
  [13, 3],
  [14, 5],
  [15, 7],
]

export const navItems = [
  { name: 'About', link: 'about' },
  { name: 'Projects', link: 'projects' },
  { name: 'Clients', link: 'testimonials' },
  { name: 'Contact', link: 'contact' },
]

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

//bg-gradient-b rounded-t-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0
export const gridItems = [
  {
    id: 1,
    gridItemContainer:
      'col-span-2 row-span-4 h-[40rem]  md:row-span-2 md:col-span-4 lg:col-span-2 lg:row-span-4 xl:col-span-4 md:h-[20rem] lg:h-[40rem] xl:h-[20rem]  xl:w-[100%] ',
    title: 'My Start',
    description:
      'During COVID, I built a Chrome extension to automate class attendance. Coding to make life easier flipped my learning paradigm.',
    imgContainerClass:
      'absolute ' +
      'w-[80%] h-[50%]  ' + // Base size
      'top-[18rem] ' + // Base position
      // 'sm:w-[40%] sm:h-[60%] ' +
      'md:w-[30%] md:h-[70%] md:left-60 md:top-1/2 md:-translate-y-1/2 ' + // Adjust for medium screens
      'lg:w-[80%] lg:h-[50%] lg:left-0 lg:top-[18rem] lg:translate-y-0 ' + // Adjust for large screens
      'xl:w-[27%] xl:h-[80%] xl:left-80 xl:top-1/2 xl:-translate-y-1/2 ' + // Adjust for extra large screens
      'z-30 rounded-3xl overflow-visible mx-auto aspect-ratio ' +
      'transition-all duration-300 ease-in-out ' +
      'shadow-lg',
    imgClassName:
      'flex aspect-ratio rounded-3xl item-center justify-center group-hover:scale-105 transition duration-200',
    duration: 'rounded-3xl z-10',
    img: '/bento/laptop.jpeg',
    textContainerClassName:
      'absolute inset-0 flex flex-col justify-center ' +
      'p-6 md:p-8 ' +
      'z-20 text-slate-200 ' +
      'w-full md:w-2/3 lg:w-1/2', // Adjust text width to make room for image
    textOrder: ' ',
    titleClassName:
      'absolute top-4 font-sans  transition duration-200 group-hover:translate-x-2 font-bold ' +
      'text-2xl sm:text-3xl md:text-3xl  lg:w-[22rem] lg:text-4xl ' +
      'mb-4 ' +
      'select-none',
    descriptionClass:
      'transition duration-200  group-hover:translate-x-2 absolute top-14 md:top-[4rem] lg:top-[4.5rem] text-base font-semibold sm:text-lg md:w-[24rem] md:text-lg lg:w-[24rem] xl:w-[35rem] ' +
      'text-slate-300  ' +
      'select-none',
    buttonContainer: '',
    buttonClass: '',
  },
  // '1sm:w-[17rem] 1sm:h-[17rem] 1sm:top-[19rem] 1sm:left-[1.8rem] ' +
  // '1md:w-[20rem] 1md:h-[20rem] 1md:top-[17rem] 1md:m-auto ' +
  // '1lg:w-[20rem] 1lg:h-[20rem] 1lg:top-[17rem] 1lg:left-10 ' +
  // 'top-[16rem] left-12 ' +
  // 'sm:left-20 ' +
  // 'md:top-2 md:left-[28rem] md:w-[16rem] md:h-[16rem] ' +
  // 'lg:top-[16rem] lg:left-9 lg:w-[20rem] lg:h-[20rem] ' +
  // 'xl:top-2 xl:left-[43rem] xl:w-[16rem] xl:h-[16rem] ' +
  // '2xl:left-[43rem] ' +

  {
    id: 2,
    title: 'Ready to reloate',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-3 sm:row-span-3   md:col-span-2 lg:col-span-2 lg:row-span-3 xl:col-span-2 xl:row-span-6 ',
    imgContainerClass: 'relative w-full h-full group overflow-hidden rounded-3xl',
    imgClassName: 'absolute top-0   rounded-3xl  z-10  transition duration-500',
    textContainerClassName:
      'bottom-0 w-full h-32 left-0  pt-10 h-52 bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621] dark:to-[#020621]/0 text-slate-200',
    titleClassName:
      'relative z-30 font-sans font-bold dark:text-neutral-200 flex  items-center  xs:pl-10 1sm:pl-5 pt-28 w-full h-[5rem] select-none text-2xl lg:text-4xl',
    textOrder: 'group-hover:translate-x-2 duration-200',
    img: '/bento/globe.jpeg',
    buttonContainer: '',
    buttonClass: '',
  },
  {
    id: 3,
    title: 'My tech stack',
    description: 'I constantly try to improve',
    gridItemContainer:
      'col-span-2 row-span-3 md:col-span-2  lg:col-span-2  lg:row-span-3 xl:col-span-2 xl:row-span-6',
    imgClassName: '',
    textContainerClassName:
      'absolute  bottom-0 pt-16 h-40 w-full bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-slate-200 dark:text-white  ',
    textOrder: 'flex flex-col-reverse xs:pl-10 1sm:pl-5 group-hover:translate-x-2 duration-200',
    titleClassName: ' font-sans font-bold text-2xl lg:text-4xl items-center  select-none ',
    descriptionClass: 'relative text-base w-[50%]  font-bold nowrap whitespace-nowrap select-none ',
    img: ``,
    buttonContainer: '',
    buttonClass: '',
  },
  {
    id: 4,
    title: 'Check out my resumeeeee!',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-1 md:col-span-2 lg:col-span-2 xl:row-span-2 xl:col-span-2 group',
    imgContainerClass: '',
    imgClassName:
      'absolute w-full h-full pl-52 1sm:pt-10 1sm:h-[10rem] pt-0 rounded-3xl z-10 group-hover:scale-105 transition duration-500 group-hover:translate-y-10 group-hover:translate-x-6',
    img: '/bento/resume.svg',
    textContainerClassName:
      'flex items-center justify-start xs:pl-10 1sm:pl-5 w-full h-full whitespace-nowrap dark:via-[#020621]/90 dark:to-[#020621]/0',
    textOrder:
      'group-hover:-translate-y-20 group-hover:translate-x-[3.5rem] 1sm:group-hover:translate-x-[0rem] sm:group-hover:translate-x-[5.5rem] duration-200 md:group-hover:translate-x-[1rem] xl:group-hover:translate-x-[3rem]',
    titleClassName:
      'flex transition duration-300 pt-[5rem] z-30 font-sans font-bold select-none text-slate-200 dark:text-neutral-200 text-2xl lg:text-3xl text-start w-full',
    buttonContainer:
      'flex items-center justify-evenly z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-14 transition w-full h-full pb-14',
    buttonClass: `inline-flex h-12 py-2 px-6 z-[5000] group-hover:pointer-events-auto animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[length:200%_100%] font-medium text-slate-200 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms] cursor-pointer`,

    /* 
    
    {
    id: 4,
    title: 'Check out my resume!',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-1 md:col-span-2  lg:col-span-2 xl:row-span-2 xl:col-span-2 group  ',
    imgContainerClass: '  ',
    imgClassName:
      'absolute w-full h-full pl-52 1sm:pt-10 1sm:h-[10rem] pt-0 rounded-3xl  z-10 group-hover:scale-105 transition duration-500 group-hover:translate-y-10 group-hover:translate-x-6  ',
    img: '/bento/resume.svg',
    textContainerClassName:
      'flex items-center justify-start xs:pl-10 1sm:pl-5  w-full h-full whitespace-nowrap dark:via-[#020621]/90 dark:to-[#020621]/0 ',
    textOrder:
      'group-hover:-translate-y-20 group-hover:translate-x-[3.5rem] 1sm:group-hover:translate-x-[0rem] sm:group-hover:translate-x-[5.5rem] duration-200 md:group-hover:translate-x-[1rem] xl:group-hover:translate-x-[3rem] ',
    titleClassName:
      'flex transition duration-300  pt-[5rem] z-30 font-sans font-bold   select-none text-slate-200 dark:text-neutral-200  text-2xl lg:text-3xl text-start w-full',
    buttonContainer:
      'flex items-center  justify-evenly z-50  opacity-0  group-hover:opacity-100  group-hover:translate-y-14  transition  w-full h-full pb-14 ',
    buttonClass: `inline-flex h-12  py-2 px-6  z-[5000]  group-hover:pointer-events animate-shimmer items-center justify-center rounded-md border border-slate-800  bg-[length:200%_100%] font-medium text-slate-200 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms] curser-pointer`,
  }
    */
  },
  //Have a project? Let's Connect
  {
    id: 5,
    title: '',
    description: '',
    gridItemContainer: 'col-span-2 row-span-2 md:row-span-1 lg:col-span-2 xl:row-span-2 ',
    imgClassName: '',
    textContainerClassName: '',
    titleClassName: ' pt-16 h-40  rounded-b-3xl select-none',
    textOrder: '',
    img: '',
    buttonContainer: 'flex items-center  justify-evenly z-50     w-full h-full pt-10 ',
    buttonClass: `inline-flex h-12  py-2 px-6  z-[5000] animate-shimmer items-center justify-center rounded-md border border-slate-800  bg-[length:200%_100%] font-medium text-slate-200 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms]`,
  },
  {
    id: 6,
    title: "Currently building an AI-driven lead generation tool powered by OpenAI's Realtime API",
    description: 'The Inside Scoop ',
    gridItemContainer: 'col-span-2 row-span-3 md:col-span-4 md:row-span-2 xl:row-span-4',
    imgContainerClass: 'absolute top-10  w-full h-full ',
    imgClassName: 'absolute pl-40 ',
    img: '/bento/code.svg',
    textContainerClassName:
      'absolute  top-0 pt-5 h-52 w-full bg-gradient-to-b rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-slate-200 dark:text-white select-none ',
    textOrder: 'flex flex-col-reverse xs:pl-10 1sm:pl-5 group-hover:translate-x-2 duration-200',
    titleClassName: ' font-sans font-bold text-2xl lg:text-4xl items-center   ',
    descriptionClass:
      'relative text-sm w-[50%]  font-semibold dark:font-normal nowrap whitespace-nowrap select-none',
    buttonContainer: '',
    buttonClass: '',
  },
]

export const testimonials = [
  {
    quote: `"Nathan is super easy to work with and always delivers . His coding skills really added to the team."`,
    name: 'Teddy',
    title: 'Manager, Coder School',
    image: '/testimonials/profile2.jpg',
  },
  {
    quote:
      '"Nathan totally revamped our website, and it looks amazing now! He made everything so smooth and simple for us."',
    name: 'Mike',
    title: 'Manager, Arroyo Seco Golf',
    image: '/testimonials/profile.svg',
  },
  {
    quote: `"Working with Nathan was a game-changer for us. He delivered a website and brochures that truly represent our brand, and his attention to detail made all the difference. The process was seamless from start to finish, and the results exceeded our expectations."`,
    name: 'Zorik',
    title: 'Owner, LifeLine Clincal Lab',
    image: '/testimonials/zorik.png',
  },
]

export const workExperience = [
  {
    id: 1,
    title: 'Frontend Intern',
    desc: 'Assisted in the development of a web-based platform using React.js, enhancing interactivity.',
    className: 'md:col-span-2',
    thumbnail: '/exp1.svg',
  },
  {
    id: 2,
    title: 'Coding Tutor',
    desc: 'Provided personalized instruction in programming fundamentals, data structures, and algorithms.',
    className: 'md:col-span-2',
    thumbnail: '/exp2.svg',
  },
  {
    id: 3,
    title: 'Web Consultant',
    desc: 'Advised clients on online strategies including website design, SEO, and social media integration.',
    className: 'md:col-span-2',
    thumbnail: '/exp3.svg',
  },
  {
    id: 4,
    title: 'Freelance Developer',
    desc: 'Developed custom websites for diverse clients, handling all aspects from initial concept to deployment.',
    className: 'md:col-span-2',
    thumbnail: '/exp4v2.svg',
  },
]

export const projects = [
  {
    id: 1,
    title: 'Net-Trailer',
    subTitle: 'Netflix Clone',
    des: 'Find and watch Movie and TV trailers, providing a similar experience to the popular streaming platform',
    images: [
      '/projects/netflix.jpg',
      '/projects/netflix1.png',
      '/projects/netflix2.png',
      '/projects/netflix3.png',
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
    github: 'https://github.com/natkins23/net_trailer',
    liveSite: 'https://net-trailers.vercel.app/',
  },
  {
    id: 2,
    title: 'Quizmatic',
    subTitle: 'AI Quiz Generation',
    des: `An AI application that leverages OpenAI\'s ChatGPT to generate tailored quizzes on various topics.`,
    images: [
      '/projects/quizmatic.png',
      '/projects/quizmatic1.png',
      '/projects/quizmatic2.png',
      '/projects/quizmatic3.png',
    ],
    technologies: {
      Frontend: {
        descriptionParts: [
          {
            text: 'A responsive design with modern UI components',
            icons: [{ icon: 're.svg' }, { icon: 'shadcn.png' }, { icon: 'tail.svg' }],
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
            text: 'Server-side validation and type checking',
            icons: [{ icon: 'zod.png' }],
          },
          {
            text: 'ORM managed database with type-saftey schema validation',
            icons: [{ icon: 'prisma.png' }, { icon: 'postgresql.png' }],
          },
          {
            text: 'Integrated ChatGPT for user tailored quiz generation ',
            icons: [{ icon: 'gpt.png' }],
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
            text: 'Utilized Supabase for real-time database functionality, authentication, and serverless APIs',
            icons: [{ icon: 'supabase.png' }],
          },
        ],
      },
    },
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: 'https://quizmatic.vercel.app/',
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
  'postgresql.png': 'PostgreSQL',
  'mysql.png': 'MySQL',
  //----->hosting
  'github.png': 'GitHub',
  'awsAmplify.png': 'Amplify',
  'vercel.png': 'Vercel',
  'netlify.png': 'Netlify',
  'heroku.png': 'Heroku',
  'host.svg': 'Hostinger',
  'digitalocean.png': 'DigitalOcean',
  //----->Containerization & Orchestration
  'dock.svg': 'Docker',
  'kubernetes.png': 'Kubernetes',
}

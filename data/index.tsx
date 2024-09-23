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
} from 'react-icons/si'
import { AiOutlineApi } from 'react-icons/ai' // For APIs
import { GrMysql } from 'react-icons/gr'

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
    name: 'Amplify',
    icon: <FaAws className="w-7 h-7" />,
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
      'col-span-2 row-span-4 h-[40rem]  md:row-span-2 md:col-span-4 lg:col-span-2 lg:row-span-4 xl:col-span-4 md:h-[20rem] lg:h-[40rem]  xl:h-auto ',
    title: 'My Start',
    description:
      'During COVID, I built a Chrome extension to automate class attendance. Coding to make life easier flipped my learning paradigm.',
    imgContainerClass:
      ' absolute w-[13rem] h-[13rem] top-[20rem] left-12 1sm:w-[17rem] 1sm:h-[17rem] 1sm:top-[19rem] 1sm:left-1 1md:w-[20rem] 1md:h-[20rem] 1md:top-[17rem] 1md:left-2  1lg:w-[20rem] 1lg:h-[20rem] 1lg:top-[17rem] 1lg:left-10 m-5 z-30 top-[16rem] left-12 sm:left-20 md:top-2 md:left-[28rem] md:w-[16rem] md:h-[16rem] lg:top-[16rem] lg:left-9  lg:w-[20rem] lg:h-[20rem] xl:top-2  xl:left-[43rem] xl:w-[16rem] xl:h-[16rem] 2xl:left-[43rem] group overflow-hidden rounded-3xl group-hover:scale-105 transition duraton-200',
    imgClassName: '',
    duration: ' rounded-3xl  z-10  ',
    img: '/bento/laptop.jpeg',
    textContainerClassName:
      ' absolute top-0 left-0  h-full w-full  z-50 text-slate-200 dark:text-white  ',
    textOrder: 'z-50 group-hover:translate-x-2 transition duration-200',
    titleClassName:
      'relative z-50  font-sans font-bold text-2xl lg:text-4xl flex  items-center pt-10 ml-10 w-full h-[5rem] select-none ',
    descriptionClass:
      'text-lg  z-50  text-slate-200  mx-10 pt-4  w-[80%] md:w-[50%] lg:w-[80%] xl:w-[60%]  select-none ',
    buttonContainer: '',
    buttonClass: '',
  },
  // completed
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
    title: 'Currently building a GPT Powered Quiz Application ',
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
    title: 'Manager Coder School',
    image: '/testimonials/profile2.jpg',
  },
  {
    quote:
      '"Nathan totally revamped our website, and it looks amazing now! He made everything so smooth and simple for us."',
    name: 'Mike',
    title: 'Manager Arroyo Seco Golf',
    image: '/testimonials/profile.svg',
  },
]

export const old = [
  {
    id: 1,
    title: 'Net-Trailer - Netflix Clone',
    des: 'A Netflix-inspired web application that showcases movie trailers and information, providing a similar user experience to the popular streaming platform.',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg'],
    github: 'https://github.com/natkins23/net_trailer',
    liveSite: ' https://net-trailers.vercel.app/',
  },
  {
    id: 2,
    title: 'Quizmatic - AI Quiz Generation',
    des: 'An innovative application that leverages AI to automatically generate quizzes on various topics, enhancing learning and assessment experiences.',
    img: '/projects/quizmatic.png',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg'],
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: ' https://net-trailers.vercel.app/',
  },
  {
    id: 3,
    title: 'Web Dev Solutions - Consulting',
    des: 'A professional portfolio website showcasing web development consulting services, highlighting expertise, projects, and client solutions.',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/clerk.svg'],
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: ' https://net-trailers.vercel.app/',
  },
  {
    id: 4,
    title: 'STORE - Ecommerce App',
    des: 'A fully-functional ecommerce application featuring product listings, shopping cart functionality, and secure checkout process for online retail.',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/gsap.svg'],
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: ' https://net-trailers.vercel.app/',
  },
]

export const projectIconSkeleton = [
  { name: 'React', icon: '/projectIcons/re.svg' },
  { name: 'Next.js', icon: '/projectIcons/next.svg' },
  { name: 'TypeScript', icon: '/projectIcons/ts.svg' },
  { name: 'Tailwind CSS', icon: '/projectIcons/tail.svg' },
]

export const projects = [
  {
    id: 1,
    title: 'Net-Trailer - Netflix Clone',
    des: 'A Netflix-inspired web application that showcases movie trailers and information, providing a similar user experience to the popular streaming platform.',
    img: '/projects/netflix.jpg',
    technologies: {
      'Front-end': [
        { name: 'React', icon: '/projectIcons/re.svg' },
        { name: 'Next.js', icon: '/projectIcons/next.svg' },
        { name: 'TypeScript', icon: '/projectIcons/ts.svg' },
        { name: 'Tailwind CSS', icon: '/projectIcons/tail.svg' },
        { name: 'Clerk', icon: '/projectIcons/clerk.svg' },
        { name: 'Stream', icon: '/projectIcons/stream.svg' },
        { name: 'Three.js', icon: '/projectIcons/three.svg' },
      ],
      'Back-end': [
        { name: 'GitHub', icon: '/projectIcons/github.svg' },
        { name: 'Hosting', icon: '/projectIcons/host.svg' },
        { name: 'Instagram API', icon: '/projectIcons/insta.svg' },
        { name: 'WhatsApp API', icon: '/projectIcons/wha.svg' },
        { name: 'Docker', icon: '/projectIcons/dock.svg' },
        { name: 'Cloud Services', icon: '/projectIcons/cloud.svg' },
        { name: 'App Store', icon: '/projectIcons/app.svg' },
      ],
    },
    github: 'https://github.com/natkins23/net_trailer',
    liveSite: 'https://net-trailers.vercel.app/',
  },
  {
    id: 2,
    title: 'Quizmatic - AI Quiz Generation',
    des: 'An innovative application that leverages AI to automatically generate quizzes on various topics, enhancing learning and assessment experiences.',
    img: '/projects/quizmatic.png',
    technologies: {
      'Front-end': [
        '/projectIcons/re.svg',
        '/projectIcons/next.svg',
        '/projectIcons/ts.svg',
        '/projectIcons/tail.svg',
        '/projectIcons/fm.svg',
      ],
      'Back-end': ['/projectIcons/node.svg', '/projectIcons/c.svg'],
    },
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: 'https://quizmatic.vercel.app/',
  },
  {
    id: 3,
    title: 'Web Dev Solutions - Consulting',
    des: 'A professional portfolio website showcasing web development consulting services, highlighting expertise, projects, and client solutions.',
    img: '/projects/webdev.jpg',
    technologies: {
      'Front-end': [
        '/projectIcons/re.svg',
        '/projectIcons/next.svg',
        '/projectIcons/ts.svg',
        '/projectIcons/tail.svg',
      ],
      'Back-end': ['/projectIcons/firebase.png'],
    },
    github: 'https://github.com/natkins23/web-dev-solutions',
    liveSite: 'https://webdevsolutions.vercel.app/',
  },
  {
    id: 4,
    title: 'STORE - Ecommerce App',
    des: 'A fully-functional ecommerce application featuring product listings, shopping cart functionality, and secure checkout process for online retail.',
    img: '/projects/store.jpg',
    technologies: {
      'Front-end': [
        '/projectIcons/re.svg',
        '/projectIcons/next.svg',
        '/projectIcons/ts.svg',
        '/projectIcons/tail.svg',
        '/projectIcons/gsap.svg',
      ],
      'Back-end': ['/projectIcons/node.svg', '/projectIcons/c.svg', '/projectIcons/postgresql.svg'],
    },
    github: 'https://github.com/natkins23/ecommerce-store',
    liveSite: 'https://store-ecommerce.vercel.app/',
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

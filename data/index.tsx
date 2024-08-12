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
      ' absolute w-[20rem] h-[20rem] m-5 z-30 top-[17rem] left-12 sm:left-20 md:top-2 md:left-[23rem] md:w-[16rem] md:h-[16rem] lg:top-[17rem] lg:left-12  lg:w-[20rem] lg:h-[20rem] xl:top-2  xl:left-[36rem] xl:w-[16rem] xl:h-[16rem] 2xl:left-[43rem] group overflow-hidden rounded-3xl group-hover:scale-105 transition duraton-200',
    imgClassName: '',
    duration: ' rounded-3xl  z-10  ',
    lightImg: '/lightlaptop.jpeg',
    darkImg: '/darklaptop.jpeg',
    spareImg: '/grid.svg',
    textContainerClassName: ' absolute top-0 left-0  h-full w-full  z-50 ',
    textOrder: 'z-50 group-hover:translate-x-2 transition duration-200',
    titleClassName:
      'relative z-50  font-sans font-bold text-black dark:text-white flex text-2xl items-center pt-10 ml-10 w-full h-[5rem] ',
    descriptionClass:
      'text-base  z-50  text-black dark:text-white mx-10 pt-5  w-[80%] md:w-[50%] lg:w-[80%] xl:w-[60%] w-font-semibold dark:font-normal  ',
    buttonContainer: '',
    buttonClass: '',
  },
  // completed
  {
    id: 2,
    title: 'Flexible to reloate',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-3 sm:row-span-3   md:col-span-2 lg:col-span-2 lg:row-span-3 xl:col-span-2 xl:row-span-6 ',
    imgContainerClass: 'relative w-full h-full group overflow-hidden rounded-3xl',
    imgClassName: 'absolute top-0 text-white  rounded-3xl  z-10  transition duration-500',
    textContainerClassName:
      'bottom-0 w-full h-32 left-0  pt-10 h-40 bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 ',
    titleClassName:
      'relative z-30 font-sans font-bold text-black dark:text-neutral-200 flex text-2xl items-center  pl-10 w-full h-[5rem]',
    textOrder: 'group-hover:translate-x-2 duration-200',
    lightImg: '/darkGlobe.jpeg',
    darkImg: `/darkGlobe.jpeg`,
    spareImg: '/b4.svg',
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
      'absolute  bottom-0 pt-16 h-40 w-full bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-black dark:text-white ',
    textOrder: 'flex flex-col-reverse pl-10 group-hover:translate-x-2 duration-200',
    titleClassName: ' font-sans font-bold text-3xl items-center   ',
    descriptionClass:
      'relative text-sm w-[50%]  font-semibold dark:font-normal nowrap whitespace-nowrap ',
    lightImg: ``,
    darkImg: ``,
    spareImg: '',
    buttonContainer: '',
    buttonClass: '',
  },
  {
    id: 4,
    title: 'Check out my resume!',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-1 md:col-span-2  lg:col-span-2 xl:row-span-1 xl:col-span-2 group  ',
    imgContainerClass: '',
    imgClassName:
      'absolute w-full h-full pl-52  rounded-3xl  z-10 group-hover:scale-105 transition duration-500 group-hover:translate-y-7 group-hover:translate-x-6  ',
    lightImg: '/b4.svg',
    textContainerClassName:
      'flex items-center justify-start pl-10   w-full h-full whitespace-nowrap dark:via-[#020621]/90 dark:to-[#020621]/0 ',
    textOrder: 'group-hover:-translate-y-14 duration-200 ',
    titleClassName:
      'flex transition duration-300  pt-14 z-30 font-sans font-bold    text-black dark:text-neutral-200  text-2xl text-start w-full',
    buttonContainer:
      'flex items-center  justify-evenly z-50  opacity-0 group-hover:opacity-100  group-hover:translate-y-14  transition  w-full h-full pb-14 ',
    buttonClass: `inline-flex h-12  py-2 px-6  z-[5000] animate-shimmer items-center justify-center rounded-md border border-slate-800  bg-[length:200%_100%] font-medium text-slate-400 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms] curser-pointer`,
    darkImg: '',
    spareImg: '',
  },

  //have a project? email
  {
    id: 5,
    title: '',
    description: '',
    gridItemContainer: 'col-span-2 row-span-2 md:row-span-1 lg:col-span-2 xl:row-span-1 ',
    imgClassName: '',
    textContainerClassName: '',
    titleClassName: ' pt-16 h-40  rounded-b-3xl text-black dark:text-white',
    textOrder: '',
    lightImg: '',
    spareImg: '/',
    darkImg: `/`,
    buttonContainer: 'flex items-center  justify-evenly z-50     w-full h-full pt-10 ',
    buttonClass: `inline-flex h-12  py-2 px-6  z-[5000] animate-shimmer items-center justify-center rounded-md border border-slate-800  bg-[length:200%_100%] font-medium text-slate-400 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms] curser-pointer`,
  },
  {
    id: 6,
    title: 'Currently building a GPT Powered Quiz Application',
    description: 'The Inside Scoop',
    gridItemContainer: 'col-span-2 row-span-3 md:col-span-4 md:row-span-2',
    imgContainerClass: 'absolute top-10  w-full h-full ',
    imgClassName: 'absolute pt pl-40 ',
    lightImg: '/b5.svg',
    spareImg: '/grid.svg',
    darkImg: `/b5.svg`,
    textContainerClassName:
      'absolute  top-0 pt-5 h-52 w-full bg-gradient-to-b rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-black dark:text-white ',
    textOrder: 'flex flex-col-reverse pl-10 group-hover:translate-x-2 duration-200',
    titleClassName: ' font-sans font-bold text-3xl items-center   ',
    descriptionClass:
      'relative text-sm w-[50%]  font-semibold dark:font-normal nowrap whitespace-nowrap ',

    buttonContainer: '',
    buttonClass: '',
  },
]

export const projects = [
  {
    id: 1,
    title: 'Net-Trailer - Netflix Clone',
    des: 'Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg'],
    github: 'https://github.com/natkins23/net_trailer',
    liveSite: ' https://net-trailers.vercel.app/',
  },
  {
    id: 2,
    title: 'Quizmatic - AI Quiz Generation',
    des: 'Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg'],
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: ' https://net-trailers.vercel.app/',
  },
  {
    id: 3,
    title: 'Web Dev Solutions - Consulting Portfolio Page',
    des: 'A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/clerk.svg'],
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: ' https://net-trailers.vercel.app/',
  },
  {
    id: 4,
    title: 'STORE - Ecommerce App',
    des: 'Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..',
    img: '/projects/netflix.jpg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/gsap.svg'],
    github: 'https://github.com/natkins23/Quizmatic',
    liveSite: ' https://net-trailers.vercel.app/',
  },
]

export const workExperience = [
  {
    id: 1,
    title: 'Frontend Engineer Intern',
    desc: 'Assisted in the development of a web-based platform using React.js, enhancing interactivity.',
    className: 'md:col-span-2',
    thumbnail: '/exp1.svg',
  },
  {
    id: 1,
    title: 'Computer Science Tutor',
    desc: 'Provided personalized instruction in programming fundamentals, data structures, and algorithms to university students.',
    className: 'md:col-span-2',
    thumbnail: '/exp2.svg',
  },
  {
    id: 2,
    title: 'Web Presence Consultant',
    desc: 'Advised clients on comprehensive online strategies, including website design, SEO, and social media integration.',
    className: 'md:col-span-2',
    thumbnail: '/exp3.svg',
  },
  {
    id: 3,
    title: 'Freelance Web Developer',
    desc: 'Developed custom websites for diverse clients, handling all aspects from initial concept to final deployment.',
    className: 'md:col-span-2',
    thumbnail: '/exp4.svg',
  },
]

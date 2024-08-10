import { TechStack } from '@/components/TechStack'
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
  SiStrapi,
  SiGoogleanalytics,
  SiSentry,
  SiGooglecloud,
  SiMysql,
  SiGraphql,
} from 'react-icons/si'

import {
  SiEslint,
  SiPrettier,
  SiFigma,
  SiStripe,
  SiReact,
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
  { name: 'React.js', icon: <FaReact className="w-7 h-7" /> },
  { name: 'Next.js', icon: <RiNextjsLine className="w-7 h-7" /> },
  { name: 'Prisma', icon: <SiPrisma className="w-7 h-7" /> },
  { name: 'TypeScript', icon: <BiLogoTypescript className="w-7 h-7" /> },
  { name: 'Firebase', icon: <RiFirebaseLine className="w-7 h-7" /> },
  { name: 'HTML5', icon: <FaHtml5 className="w-7 h-7" /> },
  { name: 'CSS3', icon: <IoLogoCss3 className="w-7 h-7" /> },
  { name: 'Tailwind', icon: <RiTailwindCssFill className="w-7 h-7" /> },
  { name: 'ES6+', icon: <IoLogoJavascript className="w-7 h-7" /> },
  { name: 'Jest', icon: <SiJest className="w-7 h-7" /> },
  { name: 'Git', icon: <FaGitAlt className="w-7 h-7" /> },
  { name: 'Amplify', icon: <FaAws className="w-7 h-7" /> },
  { name: 'Recoil', icon: <SiRecoil className="w-7 h-7" /> },
  { name: 'Material-UI', icon: <SiMui className="w-7 h-7" /> },
  { name: 'ShadCN', icon: <SiShadcnui className="w-7 h-7" /> },
  { name: 'Zod', icon: <SiZod className="w-7 h-7" /> },
]

export const tech_tools = [
  { name: 'GraphQL', icon: <SiGraphql className="w-7 h-7" /> },
  { name: 'MySQL', icon: <GrMysql className="w-7 h-7" /> },
  { name: 'Google Cloud', icon: <SiGooglecloud className="w-7 h-7" /> },
  { name: 'Sentry', icon: <SiSentry className="w-7 h-7" /> },
  { name: 'Google Analytics', icon: <SiGoogleanalytics className="w-7 h-7" /> },
  { name: 'ESLint', icon: <SiEslint className="w-7 h-7" /> },
  { name: 'Prettier', icon: <SiPrettier className="w-7 h-7" /> },
  { name: 'Figma', icon: <SiFigma className="w-7 h-7" /> },
  { name: 'Stripe API', icon: <SiStripe className="w-7 h-7" /> },
  { name: 'React-Icons', icon: <FaReact className="w-7 h-7" /> },
  { name: 'Paypal API', icon: <SiPaypal className="w-7 h-7" /> },
  { name: 'Context API', icon: <FaReact className="w-7 h-7" /> },
  { name: 'Vite', icon: <SiVite className="w-7 h-7" /> },
  { name: 'Postman', icon: <SiPostman className="w-7 h-7" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="w-7 h-7" /> },
  { name: 'Clerk Auth', icon: <SiClerk className="w-7 h-7" /> },
  { name: 'Next Auth', icon: <SiNextdotjs className="w-7 h-7" /> },
  { name: 'REST APIs', icon: <AiOutlineApi className="w-7 h-7" /> },
]

//bg-gradient-b rounded-t-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0
export const gridItems = [
  {
    id: 1,
    gridItemContainer:
      'col-span-2 row-span-3 h-[32rem]   md:row-span-2 md:col-span-4 lg:col-span-2 lg:row-span-4 xl:col-span-4 md:h-[20rem] lg:h-[35rem]  xl:h-auto ',
    title: 'My Start',
    description:
      'During COVID, I built a Chrome extension to automate class attendance. Coding to make life easier flipped my learning paradigm.',
    imgContainerClass:
      'flex lg:flex-col  absolute w-[16rem] h-[16rem] m-5 z-30 top-0  right-0 group overflow-hidden rounded-3xl group-hover:scale-105 transition duraton-200',
    duration: ' rounded-3xl  z-10  ',
    lightImg: '/lightlaptop.jpeg',
    darkImg: '/darklaptop.jpeg',
    spareImg: '/grid.svg',
    textContainerClassName: ' absolute top-0 left-0  h-full w-full  z-50 ',
    titleClassName:
      'relative z-50  font-sans font-bold text-black dark:text-white flex text-2xl items-center pt-10 pl-10 w-full h-[5rem] ',
    descriptionClass:
      'text-base  z-50  text-black dark:text-white pl-10 pt-5 w-[50%] font-semibold dark:font-normal  ',
    buttonContainer: '',
    buttonClass: '',
    textOrder: 'z-50 group-hover:translate-x-2 transition duration-200',
    imgClassName: '',
  },
  // completed
  {
    id: 2,
    title: 'Flexible to reloate',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-2 sm:row-span-3   md:col-span-2 lg:col-span-2 lg:row-span-3 xl:col-span-2 xl:row-span-6 ',
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
      'col-span-2 row-span-1 md:col-span-2  lg:col-span-2 xl:row-span-2 xl:col-span-2 group  ',
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
  {
    id: 7,
    title: '',
    description: '',
    gridItemContainer: 'col-span-2 row-span-1 md:col-span-2 lg:col-span-2 xl:row-span-2 ',
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
    id: 5,
    title: 'Currently building a GPT Powered Quiz Application',
    description: 'The Inside Scoop',
    gridItemContainer: 'col-span-2 row-span-2 md:col-span-4 md:row-span-2',
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
    iconLists: ['/re.svg', '/tail.svg', '/ts.svg', '/three.svg', '/fm.svg'],
    link: 'https://github.com/adrianhajdin?tab=repositories',
  },
  {
    id: 2,
    title: 'Quizmatic - AI Quiz Generation',
    des: 'Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.',
    img: '/p2.svg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/stream.svg', '/c.svg'],
    link: 'https://github.com/adrianhajdin/zoom-clone',
  },
  {
    id: 3,
    title: 'Web Dev Solutions - Consulting Portfolio Page',
    des: 'A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.',
    img: '/p3.svg',
    iconLists: ['/re.svg', '/tail.svg', '/ts.svg', '/three.svg', '/c.svg'],
    link: 'https://github.com/adrianhajdin/ai_saas_app',
  },
  {
    id: 4,
    title: 'STORE - Ecommerce App',
    des: 'Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..',
    img: '/p4.svg',
    iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/three.svg', '/gsap.svg'],
    link: 'https://github.com/adrianhajdin/iphone',
  },
]

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
]

export const companies = [
  {
    id: 1,
    name: 'cloudinary',
    img: '/cloud.svg',
    nameImg: '/cloudName.svg',
  },
  {
    id: 2,
    name: 'appwrite',
    img: '/app.svg',
    nameImg: '/appName.svg',
  },
  {
    id: 3,
    name: 'HOSTINGER',
    img: '/host.svg',
    nameImg: '/hostName.svg',
  },
  {
    id: 4,
    name: 'stream',
    img: '/s.svg',
    nameImg: '/streamName.svg',
  },
  {
    id: 5,
    name: 'docker.',
    img: '/dock.svg',
    nameImg: '/dockerName.svg',
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
    id: 2,
    title: 'Mobile App Dev - JSM Tech',
    desc: 'Designed and developed mobile app for both iOS & Android platforms using React Native.',
    className: 'md:col-span-2', // change to md:col-span-2
    thumbnail: '/exp2.svg',
  },
  {
    id: 3,
    title: 'Freelance App Dev Project',
    desc: 'Led the dev of a mobile app for a client, from initial concept to deployment on app stores.',
    className: 'md:col-span-2', // change to md:col-span-2
    thumbnail: '/exp3.svg',
  },
  {
    id: 4,
    title: 'Lead Frontend Developer',
    desc: 'Developed and maintained user-facing features using modern frontend technologies.',
    className: 'md:col-span-2',
    thumbnail: '/exp4.svg',
  },
]

export const socialMedia = [
  {
    id: 1,
    img: '/git.svg',
  },
  {
    id: 2,
    img: '/twit.svg',
  },
  {
    id: 3,
    img: '/link.svg',
  },
]

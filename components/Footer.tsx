import { FaLocationArrow, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ContactForm from './ContactForm'
import { ContactFormErrorBoundary } from './ContactFormErrorBoundary'
import { FiGithub } from 'react-icons/fi'
import { CiLinkedin } from 'react-icons/ci'
import { fadeInUpVariants, fadeInVariants, staggerContainerVariants, staggerItemVariants, defaultAnimationConfig } from '@/lib/animations'

const Footer = () => {
  return (
    <footer className="xl:max-w-5xl  pt-0 pb-24 ">
      {/* background grid */}
      <div className="w-full absolute left-0 1sm:-translate-y-52 -bottom-72 min-h-96 pointer-events-none">
         <Image
           src="/footer-grid.svg"
           alt="grid"
           className="w-full h-full opacity-50 z-10 pointer-events-none"
           fill
           sizes="100vw"
        />
        </div>


      <div className="flex flex-col items-center">
        {/* Header */}
        <motion.div
          variants={fadeInUpVariants}
          {...defaultAnimationConfig}
          id="contact"
          className="text-center mb-12">
          <h2 className="heading lg:max-w-[45vw] mb-6">
            Let&apos;s build something <span className="text-purple-500">amazing together!</span> 🚀
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-5">
            Got a project in mind? Need a fresh perspective?<br />
            Or just want to chat about the latest in web development?<br />
            Drop me a line – I&apos;d love to hear from you! 💬
          </p>
        </motion.div>

        {/* Contact Form with Error Boundary */}
        <motion.div
          variants={fadeInVariants}
          {...defaultAnimationConfig}
          className="w-full max-w-2xl mx-auto mb-16 px-4">
          <div className="bg-white/5 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
            <ContactFormErrorBoundary>
              <ContactForm />
            </ContactFormErrorBoundary>
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={staggerContainerVariants}
        {...defaultAnimationConfig}
        className="flex mt-16 md:flex-row flex-col-reverse justify-between items-center md:mx-10">
        <motion.p
          variants={staggerItemVariants}
          className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Nathan Watkins
        </motion.p>

        <motion.nav
          variants={staggerItemVariants}
          aria-label="Footer social media links"
          className="flex items-center justify-center pb-2 gap-3 z-50">
          <a
            href="https://github.com/natkins23"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Nathan's GitHub profile"
            className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <FiGithub className="w-full h-full p-3" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathancwatkins/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Nathan's LinkedIn profile"
            className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <CiLinkedin className="w-full h-full p-2" aria-hidden="true" />
          </a>
          <a
            href="https://x.com/nathancwatkins"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Nathan's X (Twitter) profile"
            className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <FaXTwitter className="w-full h-full p-3" aria-hidden="true" />
          </a>
        </motion.nav>
      </motion.div>
    </footer>
  )
}

export default Footer

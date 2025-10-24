'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import confettiData from '@/data/confetti.json'

interface ContactFormSuccessProps {
  showConfetti: boolean
  confettiKey: number
  onSendAnother: () => void
}

export function ContactFormSuccess({ showConfetti, confettiKey, onSendAnother }: ContactFormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-12 relative"
    >
      {/* Double Confetti Animation - BAM BAM! */}
      {showConfetti && (
        <>
          {/* First firework - BAM! */}
          <motion.div
            key={confettiKey}
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <Lottie
              animationData={confettiData}
              loop={false}
              autoplay={true}
              style={{ height: 300, width: 300 }}
            />
          </motion.div>
          {/* Second firework - BAM! (delayed and offset to the right) */}
          <motion.div
            key={`${confettiKey}-2`}
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.1 }}
          >
            <Lottie
              animationData={confettiData}
              loop={false}
              autoplay={true}
              style={{ height: 300, width: 300, marginLeft: '150px' }}
            />
          </motion.div>
        </>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative z-20"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🚀
        </motion.div>
        <motion.h3
          className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Message sent successfully!
        </motion.h3>
        <motion.p
          className="text-slate-600 dark:text-slate-400 mb-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          I&apos;ll get back to you within 24 hours.
        </motion.p>
        <motion.button
          onClick={onSendAnother}
          className="text-purple-600 dark:text-purple-400 hover:underline transition-colors duration-200"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send another message →
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

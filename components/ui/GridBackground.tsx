'use client'

import React from 'react'
import { motion } from 'framer-motion'

// [col, row] cells of the 100x100px bg-grid pattern to animate
const animatedSquares: Array<[number, number]> = [
  [1, 1],
  [4, 3],
  [7, 0],
  [10, 4],
  [2, 5],
  [13, 2],
  [16, 5],
  [8, 6],
  [12, 7],
  [5, 0],
  [15, 0],
  [18, 3],
]

const GridBackground = () => {
  return (
    <div className="absolute h-screen mt-20 w-full bg-transparent dark:bg-grid-white/[0.05] bg-grid-black/[0.05] flex items-center justify-center overflow-hidden">
      {/* Animated grid squares (aligned to the 100px bg-grid cells) */}
      {animatedSquares.map(([col, row], i) => (
        <motion.div
          key={`${col}-${row}`}
          className="absolute bg-sky-400/30 dark:bg-sky-500/20 pointer-events-none"
          style={{
            left: col * 100 + 1,
            top: row * 100 + 1,
            width: 99,
            height: 99,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.1,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  dark:bg-darkBlue bg-blue-400 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  )
}

export default GridBackground

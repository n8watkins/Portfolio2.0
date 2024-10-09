'use client'

import React from 'react'

import { testimonials } from '@/data'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'

const Clients = () => {
  return (
    <section id="testimonials" className="pt-10 pb-0">
      <h1 className="heading">
        Kind words from
        <span className="text-purple-500"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10 select-none ">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden  ">
          <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
        </div>
        <div className="flex flex-wrap items-center justify-center 1sm:gap-1 xs:gap-4 md:gap-16 max-lg:mt-10"></div>
      </div>
    </section>
  )
}

export default Clients

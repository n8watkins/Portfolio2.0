import React from 'react'

const GridBackground = () => {
  return (
    <div className="absolute h-screen mt-20 w-full bg-transparent dark:bg-grid-white/[0.05] bg-grid-black/[0.05]  flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  dark:bg-darkBlue bg-blue-400 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  )
}

export default GridBackground

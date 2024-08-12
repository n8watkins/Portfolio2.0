import React, { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'

interface MapAnimationProps {
  imgClassName?: string
  imgContainerClass?: string
}

const MapAnimation: React.FC<MapAnimationProps> = ({ imgClassName, imgContainerClass }) => {
  const pathRefs = useMemo(
    () => [
      { current: null } as React.RefObject<SVGPathElement>,
      { current: null } as React.RefObject<SVGPathElement>,
      { current: null } as React.RefObject<SVGPathElement>,
    ],
    []
  )

  const [screenSize, setScreenSize] = useState<string>('starting')
  const [paths, setPaths] = useState<string[]>(['', '', ''])
  const [isClient, setIsClient] = useState(false)

  const timelinesRef = useRef<gsap.core.Timeline[]>([])

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => {
      const width = window.innerWidth
      let size = 'starting'

      if (width < 640) size = 'xs'
      else if (width < 768) size = 'sm'
      else if (width < 1024) size = 'md'
      else if (width < 1280) size = 'lg'
      else if (width < 1536) size = 'xl'
      else size = '2xl'

      setScreenSize(size)
      setPaths(getPathsForSize(size))
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call it initially to set the correct state

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getPathsForSize = (size: string): string[] => {
    switch (size) {
      case 'sm':
        return ['M95,155 Q140,160 130,85', 'M95,155 Q150,190 280,200', 'M95,155 Q180,230 380,120']
      case 'md':
        return ['M85,165 Q140,160 120,80', 'M85,165 Q120,220 185,200', 'M85,165 Q180,230 265,120']
      case 'lg':
        return ['M88,168 Q140,160 120,100', 'M88,168 Q150,190 210,220', 'M88,168 Q180,230 290,150']
      case 'xl':
        return ['M93,160 Q140,160 120,80', 'M93,160 Q150,190 250,200', 'M93,160 Q180,230 350,120']
      case '2xl':
      default:
        return ['M93,160 Q140,160 120,150', 'M93,160 Q150,190 280,200', 'M93,160 Q180,230 380,120']
    }
  }

  useEffect(() => {
    if (!isClient) return

    // Clear existing animations
    timelinesRef.current.forEach((timeline) => timeline.kill())
    timelinesRef.current = []

    pathRefs.forEach((pathRef, index) => {
      const path = pathRef.current

      if (path) {
        const length = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
        })

        timeline
          .to(path, {
            strokeDashoffset: 0,
            duration: 3,
            ease: 'power1.inOut',
            delay: index * 1.5,
          })
          .to(path, {
            strokeDashoffset: -length,
            duration: 1.5,
            ease: 'power1.inOut',
          })

        // Store the timeline in the ref
        timelinesRef.current.push(timeline)
      }
    })

    // Cleanup function
    return () => {
      timelinesRef.current.forEach((timeline) => timeline.kill())
    }
  }, [screenSize, isClient, pathRefs])

  if (!isClient) return null // Return null on server-side

  return (
    <div
      className={`absolute -top-[15.5rem] -left-8 z-30 flex items-center justify-center w-[30rem] h-[40rem]`}>
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="neon-purple-circle"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth">
            <circle cx="5" cy="5" r="1.5" fill="#c21b6e" />
          </marker>
          <linearGradient id="neonPurpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#012485 " />
            <stop offset="50%" stopColor="#6719cf" />
            <stop offset="100%" stopColor="#a218ba" />
          </linearGradient>
        </defs>

        {paths.map((path, index) => (
          <path
            key={index}
            ref={pathRefs[index]}
            d={path}
            stroke="url(#neonPurpleGradient)"
            strokeWidth="5"
            fill="none"
            markerEnd="url(#neon-purple-circle)"
            className="neon-path"
          />
        ))}
      </svg>
    </div>
  )
}

export default MapAnimation

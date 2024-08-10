import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface MapAnimationProps {
  imgClassName?: string
  imgContainerClass?: string
}

const MapAnimation: React.FC<MapAnimationProps> = ({ imgClassName, imgContainerClass }) => {
  const pathRefs = [
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
  ]

  const [screenSize, setScreenSize] = useState<string>('starting')
  const [key, setKey] = useState<number>(0)

  useEffect(() => {
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
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call it initially to set the correct state

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Change the key to trigger a re-render when the screen size changes
    setKey((prevKey) => prevKey + 1)
  }, [screenSize])

  const getPath = (index: number) => {
    switch (screenSize) {
      case 'xs':
        return [
          'M93,160 Q140, 160 120,100',
          'M93,160 Q150,190 280,200',
          'M93,160 Q180,230 380,120',
        ][index]
      case 'sm':
        return [
          'M93,160 Q140, 160 120,100',
          'M93,160 Q150,190 280,200',
          'M93,160 Q180,230 380,120',
        ][index]
      case 'md':
        return ['M85,165 Q140, 160 120,80', 'M85,165 Q120,220 185,200', 'M85,165 Q180,230 265,120'][
          index
        ]
      case 'lg':
        return [
          'M90,200 Q140, 160 120,120',
          'M90,200 Q150,190 210,220',
          'M90,200 Q180,230 290,150',
        ][index]
      case 'xl':
        return ['M93,160 Q140, 160 120,80', 'M93,160 Q150,190 250,200', 'M93,160 Q180,230 350,120'][
          index
        ]
      case '2xl':
        return [
          'M93,160 Q140, 160 120,100',
          'M93,160 Q150,190 280,200',
          'M93,160 Q180,230 380,120',
        ][index]
      default:
        return [
          'M93,160 Q140, 160 120,100',
          'M93,160 Q150,190 280,200',
          'M93,160 Q180,230 380,120',
        ][index]
    }
  }

  useEffect(() => {
    pathRefs.forEach((pathRef, index) => {
      const path = pathRef.current

      if (path) {
        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`

        const timeline = gsap.timeline({
          repeat: -1, // Infinite repeat
          repeatDelay: 1, // Delay before repeating
        })

        // Animate the drawing of the line
        timeline.fromTo(
          path,
          { strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: 'power1.inOut',
            delay: index * 1.5, // Stagger the animations
          }
        )

        // Animate the disappearance of the line from start to end
        timeline.to(path, {
          strokeDashoffset: -length, // Move offset beyond the length to "erase" from start to end
          duration: 1.5, // Time it takes to "erase" the line
          ease: 'power1.inOut',
        })
      }
    })
  }, [screenSize, key]) // Re-run the animation if screen size or key changes

  return (
    <div
      key={key} // Use the key to force re-render on screen size change
      className={`absolute -top-[15.5rem] -left-8 z-30 flex items-center justify-center w-[30rem] h-[40rem]`}>
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="yellow-circle"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth">
            <circle cx="5" cy="5" r="2" fill="yellow" />
          </marker>
          <marker
            id="red-circle"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth">
            <circle cx="5" cy="5" r="2" fill="red" />
          </marker>
          <marker
            id="blue-circle"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth">
            <circle cx="5" cy="5" r="2" fill="blue" />
          </marker>
          <linearGradient
            id="gradient-yellow"
            gradientUnits="userSpaceOnUse"
            x1="50"
            y1="250"
            x2="80"
            y2="200">
            <stop offset="0%" stopColor="yellow" />
            <stop offset="100%" stopColor="orange" />
          </linearGradient>
          <linearGradient
            id="gradient-red"
            gradientUnits="userSpaceOnUse"
            x1="55"
            y1="300"
            x2="220"
            y2="380">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor="maroon" />
          </linearGradient>
          <linearGradient
            id="gradient-blue"
            gradientUnits="userSpaceOnUse"
            x1="50"
            y1="250"
            x2="350"
            y2="300">
            <stop offset="0%" stopColor="blue" />
            <stop offset="100%" stopColor="cyan" />
          </linearGradient>
        </defs>

        <path
          ref={pathRefs[0]}
          d={getPath(0)} // LA to Washington
          stroke="url(#gradient-yellow)"
          strokeWidth="5"
          fill="none"
          markerEnd="url(#yellow-circle)"
        />
        <path
          ref={pathRefs[1]}
          d={getPath(1)} // LA to Texas
          stroke="url(#gradient-red)"
          strokeWidth="5"
          fill="none"
          markerEnd="url(#red-circle)"
        />
        <path
          ref={pathRefs[2]}
          d={getPath(2)} // LA to Tennessee
          stroke="url(#gradient-blue)"
          strokeWidth="5"
          fill="none"
          markerEnd="url(#blue-circle)"
        />
      </svg>
    </div>
  )
}

export default MapAnimation

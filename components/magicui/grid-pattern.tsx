import { useId, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { coloredSquares } from '@/data'

interface GridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: string | number
  strokeWidth?: number
  className?: string
  [key: string]: any
}

export function GridPattern({
  width = 60,
  height = 60,
  x = 0,
  y = 0,
  strokeDasharray = 0,
  strokeWidth = 1,
  squares = [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  className,
  ...props
}: GridPatternProps) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  const id = useId()
  const gradientId = useId()

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const isLightTheme = resolvedTheme === 'light'
  const gridColor = isLightTheme ? '#3B82F6' : '#020621' // blue-500 for light mode
  const gridStrokeColor = isLightTheme ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.3)'
  const gradientEndColor = isLightTheme ? '#3B82F6' : '#020621'

  const responsiveClasses = cn(
    'h-[40rem] w-[28rem]', // base size
    'sm:h-[40rem] sm:w-[33rem]', // small screens and up
    'md:h-[20rem] md:w-[50rem]', // medium screens and up
    'lg:h-[40rem] lg:w-[27rem]', // large screens and up
    'xl:h-[20rem] xl:w-[65rem]', // extra large screens and up
    '2xl:h-[20rem] 2xl:w-[80rem]' // 2xl screens and up
  )

  // Placeholder component
  const Placeholder = () => (
    <div className={cn('animate-pulse bg-blue-300 dark:bg-gray-700', responsiveClasses)}>
      <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-gray-800 dark:to-gray-900"></div>
    </div>
  )

  if (!mounted) return <Placeholder />

  if (isLoading) return <Placeholder />

  return (
    <div className={cn('w-full', className)}>
      <style jsx>{`
        @keyframes fade1 {
          0%,
          100% {
            fill: ${gridColor};
          }
          50% {
            fill: ${isLightTheme ? '#529fff' : '#162957'};
          } /* blue-400 */
        }
        @keyframes fade2 {
          0%,
          100% {
            fill: ${isLightTheme ? '#4395fa' : '#141e38'};
          } /* blue-400 */
          50% {
            fill: ${gridColor};
          }
        }
        @keyframes fade3 {
          0%,
          100% {
            fill: ${isLightTheme ? '#7db8fa' : '#14275e'};
          } /* blue-300 */
          50% {
            fill: ${gridColor};
          }
        }
        .animated-square-1 {
          animation: fade1 3s infinite;
        }
        .animated-square-2 {
          animation: fade2 3s infinite;
        }
        .animated-square-3 {
          animation: fade3 3s infinite;
        }
      `}</style>
      <svg
        aria-hidden="true"
        className={cn('pointer-events-none relative animate-fade duration-1000', responsiveClasses)}
        {...props}>
        <defs>
          <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke={gridStrokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
            />
          </pattern>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop
              offset="30%"
              stopColor={`${isLightTheme ? '#3b82f6 ' : 'rgba(0,0,0,0)'}`}
              stopOpacity={0}
            />
            <stop offset="100%" stopColor={gradientEndColor} stopOpacity={1} />
          </radialGradient>
        </defs>
        <svg x={x} y={y} className="overflow-visible">
          {coloredSquares.map(([x, y], index) => {
            const animationClass = `animated-square-${(index % 3) + 1}`
            return (
              <rect
                className={animationClass}
                strokeWidth="0"
                key={`${x}-${y}-color`}
                width={width - 1}
                height={height - 1}
                x={x * width + 1}
                y={y * height + 1}
              />
            )
          })}
        </svg>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      </svg>
    </div>
  )
}

export default GridPattern

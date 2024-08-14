import { useId, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface GridPatternProps {
  svgWidth?: number
  svgHeight?: number
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: string | number
  strokeWidth?: number
  className?: string
  coloredSquares?: Array<[x: number, y: number]>
  [key: string]: any
}

export function GridPattern({
  svgWidth = 900,
  svgHeight = 305,
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
  coloredSquares = [
    [3, 4],
    [7, 1],
    [2, 3],
    [5, 6],
    [4, 5],
    [1, 7],
    [6, 2],
    [8, 3],
    [9, 5],
    [3, 2],
    [4, 8],
    [5, 9],
    [7, 3],
    [2, 8],
    [6, 4],
    [8, 6],
    [3, 7],
    [9, 1],
    [1, 5],
    [4, 2],
    [10, 2],
    [11, 4],
    [12, 6],
    [13, 1],
    [14, 3],
    [15, 5],
    [1, 8],
    [2, 9],
    [3, 10],
    [4, 11],
    [5, 12],
    [6, 13],
    [7, 14],
    [8, 15],
    [9, 7],
    [10, 8],
    [11, 9],
    [12, 10],
    [13, 11],
    [14, 12],
    [15, 13],
    [1, 3],
    [2, 5],
    [3, 7],
    [4, 9],
    [5, 11],
    [6, 13],
    [7, 15],
    [8, 2],
    [9, 4],
    [10, 6],
    [11, 8],
    [12, 10],
    [13, 12],
    [14, 14],
    [15, 1],
    [14, 3],
    [13, 5],
    [12, 7],
    [11, 9],
    [10, 11],
    [9, 13],
    [1, 9],
    [2, 10],
    [3, 11],
    [4, 12],
    [5, 13],
    [6, 14],
    [7, 15],
    [8, 1],
    [9, 2],
    [10, 3],
    [11, 4],
    [12, 5],
    [13, 6],
    [14, 7],
    [15, 8],
    [1, 6],
    [2, 7],
    [3, 8],
    [4, 10],
    [5, 14],
    [6, 15],
    [7, 2],
    [8, 4],
    [9, 6],
    [10, 9],
    [11, 12],
    [12, 14],
    [13, 3],
    [14, 5],
    [15, 7],
  ],
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
  const gridColor = isLightTheme ? '#93C5FD' : '#020621'
  const gridStrokeColor = isLightTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
  const gradientEndColor = isLightTheme ? '#93C5FD' : '#020621'

  // Placeholder component
  const Placeholder = () => (
    <div
      className="animate-pulse bg-blue-300 dark:bg-gray-700"
      style={{ width: svgWidth, height: svgHeight }}>
      <div className="h-full w-full bg-gradient-to-br from-blue-200 to-blue-400 dark:from-gray-800 dark:to-gray-900"></div>
    </div>
  )

  if (!mounted) return <Placeholder />

  if (isLoading) return <Placeholder />

  return (
    <div className={cn('', className)}>
      <style jsx>{`
        @keyframes fade1 {
          0%,
          100% {
            fill: ${gridColor};
          }
          50% {
            fill: ${isLightTheme ? '#BFDBFE' : '#0F172A'};
          } // Darker for dark mode
        }
        @keyframes fade2 {
          0%,
          100% {
            fill: ${isLightTheme ? '#BFDBFE' : '#0F172A'};
          } // Darker for dark mode
          50% {
            fill: ${gridColor};
          }
        }
        @keyframes fade3 {
          0%,
          100% {
            fill: ${isLightTheme ? '#60A5FA' : '#1E3A8A'};
          } // Darker for dark mode
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
        width={svgWidth}
        height={svgHeight}
        className="pointer-events-none relative"
        {...props}>
        <defs>
          <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke={gridStrokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              suppressHydrationWarning
            />
          </pattern>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="30%" stopColor="rgba(0,0,0,0)" stopOpacity={0} />
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
                suppressHydrationWarning
              />
            )
          })}
        </svg>
        <rect width="100%" height="100%" fill={`url(#${id})`} suppressHydrationWarning />
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} suppressHydrationWarning />
      </svg>
    </div>
  )
}

export default GridPattern

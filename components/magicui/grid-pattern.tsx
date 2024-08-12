import { useId } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface GridPatternProps {
  svgWidth?: number // New prop for SVG width
  svgHeight?: number // New prop for SVG height
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: string | number
  strokeWidth?: number // New prop for stroke width
  className?: string
  coloredSquares?: Array<[x: number, y: number]>
  [key: string]: any
}

export function GridPattern({
  svgWidth = 900, // Default SVG width
  svgHeight = 305, // Default SVG height
  width = 60, // Default square width
  height = 60, // Default square height
  x = 0,
  y = 0,
  strokeDasharray = 0,
  strokeWidth = 1, // Default stroke width
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
  ],
  ...props
}: GridPatternProps) {
  const { theme } = useTheme()
  const id = useId()
  const gradientId = useId()

  const isLightTheme = theme === 'light'

  const gridColor = isLightTheme ? '#60A5FA' : '#020621' // Example: Tailwind's blue-400
  const gridStrokeColor = isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)'
  const gradientEndColor = isLightTheme ? '#93C5FD' : '#020621'

  return (
    <div className={cn('', className)}>
      <style jsx>{`
        @keyframes fade1 {
          0%,
          100% {
            fill: ${gridColor};
          }
          50% {
            fill: ${isLightTheme ? '#93C5FD' : '#001946'};
          }
        }
        @keyframes fade2 {
          0%,
          100% {
            fill: ${isLightTheme ? '#93C5FD' : '#001946'};
          }
          50% {
            fill: ${gridColor};
          }
        }
        @keyframes fade3 {
          0%,
          100% {
            fill: ${isLightTheme ? '#001946' : '#93C5FD'};
          }
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
              strokeWidth={strokeWidth} // Editable stroke width
              strokeDasharray={strokeDasharray}
            />
          </pattern>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="30%" style={{ stopColor: 'rgba(0,0,0,0)', stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: gradientEndColor, stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        <svg x={x} y={y} className="overflow-visible">
          {coloredSquares.map(([x, y], index) => {
            const animationClass =
              index % 3 === 0
                ? 'animated-square-1'
                : index % 3 === 1
                ? 'animated-square-2'
                : 'animated-square-3'
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

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-blue-400 dark:bg-darkBlue flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-darkBlue dark:text-white mb-4">404</h1>
        <p className="text-xl text-darkBlue dark:text-slate-300 mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
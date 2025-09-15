// Simple dependency health check
async function checkDependencies() {
  const deps = {
    sentry: !!process.env.SENTRY_ORG,
    analytics: !!process.env.NEXT_PUBLIC_GA_ID,
    env: process.env.NODE_ENV || 'unknown'
  }
  return deps
}

export async function GET() {
  try {
    const dependencies = await checkDependencies()
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_VERSION || '2.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      },
      dependencies
    }

    return Response.json(healthData)
  } catch (error) {
    return Response.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    }, { status: 503 })
  }
}
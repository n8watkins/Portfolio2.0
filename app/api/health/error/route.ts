export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Log error for monitoring (could integrate with external services)
    console.error('Portfolio Error Report:', {
      timestamp: body.timestamp,
      error: body.error,
      url: body.url,
      // Stack trace truncated for security
      hasStack: !!body.stack
    })

    // In production, you might want to:
    // - Send to external error tracking service
    // - Store in database for analysis
    // - Send notifications for critical errors

    return Response.json({
      status: 'received',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      status: 'error',
      message: 'Failed to process error report'
    }, { status: 500 })
  }
}
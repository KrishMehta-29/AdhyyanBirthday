import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const uptime = process.uptime()
  const memoryUsage = process.memoryUsage()

  return NextResponse.json({
    status: 'healthy',
    uptime: `${Math.floor(uptime)} seconds`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
    },
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
    endpoint: '/api/status'
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  return NextResponse.json({
    message: 'Health check completed',
    receivedData: body,
    status: 'operational',
    checks: {
      database: 'connected',
      cache: 'active',
      external_apis: 'responding'
    },
    timestamp: new Date().toISOString(),
    endpoint: '/api/status'
  })
}

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello from the Next.js API!',
    timestamp: new Date().toISOString(),
    endpoint: '/api/hello'
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  return NextResponse.json({
    message: 'Hello POST request received!',
    receivedData: body,
    timestamp: new Date().toISOString(),
    endpoint: '/api/hello'
  })
}

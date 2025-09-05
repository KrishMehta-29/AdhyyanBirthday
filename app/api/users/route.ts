import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const role = searchParams.get('role')

    // Build query filters
    const where: any = {}
    if (role) {
      where.role = role
    }

    const take = limit ? parseInt(limit) : undefined

    const users = await prisma.user.findMany({
      where,
      take,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      users,
      total: users.length,
      timestamp: new Date().toISOString(),
      endpoint: '/api/users'
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role = 'user' } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role
      }
    })

    return NextResponse.json({
      message: 'User created successfully',
      user: newUser,
      timestamp: new Date().toISOString(),
      endpoint: '/api/users'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create initial users
  const users = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user'
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user'
    }
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    })
  }

  // Create initial system log
  await prisma.systemLog.create({
    data: {
      message: 'Database seeded successfully',
      level: 'info',
      endpoint: '/seed'
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

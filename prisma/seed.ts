import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10)

  // 创建管理员用户
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: '管理员',
      role: 'ADMIN'
    },
  })

  // 创建用户
  await prisma.user.upsert({
    where: { username: 'wanglei' },
    update: {},
    create: {
      username: 'wanglei',
      password: hashedPassword,
      name: '用户',
      role: 'USER'
    },
  })

  // 创建测试用户
  await prisma.user.upsert({
    where: { username: 'test' },
    update: {},
    create: {
      username: 'test',
      password: await bcrypt.hash('123456', 10),
      name: '测试用户',
      role: 'USER'
    },
  })

  console.log('数据库初始化完成')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
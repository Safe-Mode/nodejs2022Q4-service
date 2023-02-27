import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto';
const prisma = new PrismaClient()
async function main() {
    const fav = await prisma.favorites.findFirst();
  await prisma.favorites.upsert({
    where: { id: fav?.id ?? '' },
    update: {},
    create: {
        id: randomUUID()
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
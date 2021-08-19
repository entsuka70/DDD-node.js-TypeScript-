import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.setupData.create({
    data: {
      id: 'setup',
      required: false,
      number: 1,
    },
  });

  const allDatas = await prisma.setupData.findMany();
  console.log(allDatas);
  console.dir(allDatas, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

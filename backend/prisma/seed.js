const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Анна Коэн',
        phone: '+972 52-123-4567',
        email: 'anna.cohen@gmail.com',
        isVip: true,
      },
    }),
    prisma.client.create({
      data: {
        name: 'Давид Леви',
        phone: '+972 54-987-6543',
        email: 'david.levi@gmail.com',
        isVip: false,
      },
    }),
    prisma.client.create({
      data: {
        name: 'Рут Голдштейн',
        phone: '+972 50-555-1234',
        email: 'ruth.goldstein@gmail.com',
        isVip: false,
      },
    }),
  ]);

  // Create sample orders
  await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: '#32845',
        clientId: clients[0].id,
        dateTime: new Date('2025-04-14T14:00:00'),
        status: 'IN_PROGRESS',
        amount: 2500,
        description: 'Переезд квартиры',
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: '#32846',
        clientId: clients[1].id,
        dateTime: new Date('2025-04-14T17:00:00'),
        status: 'PENDING',
        amount: 3200,
        description: 'Переезд офиса',
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: '#32844',
        clientId: clients[2].id,
        dateTime: new Date('2025-04-14T09:30:00'),
        status: 'COMPLETED',
        amount: 1800,
        description: 'Перевозка мебели',
      },
    }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
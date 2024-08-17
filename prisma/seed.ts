import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Product 1',
        price: 19.99,
        description: 'This is product 1',
        image: 'https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46785%2FShot_1-1L3uphg9UZL0pz7noVa2Ah5BU0YqWo.jpg&w=750&q=90',
      },
      {
        name: 'Product 2',
        price: 29.99,
        description: 'This is product 2',
        image: 'https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46785%2FShot_1-1L3uphg9UZL0pz7noVa2Ah5BU0YqWo.jpg&w=750&q=90',
      },
      {
        name: 'Product 3',
        price: 9.99,
        description: 'This is product 3',
        image: 'https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46785%2FShot_1-1L3uphg9UZL0pz7noVa2Ah5BU0YqWo.jpg&w=750&q=90',
      },
   
    ],
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

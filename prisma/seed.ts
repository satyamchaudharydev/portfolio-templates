import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Products with templateHtml and templateFields
  await prisma.product.createMany({
    data: [
      {
        name: 'Professional Portfolio',
        price: 5000, // Price in cents ($50.00)
        description: 'A professional portfolio template with modern design.',
        image: ['https://gcdnb.pbrd.co/images/VKnApMUXcYOQ.png?o=1'],
        templateHtml: `
          <html>
            <head><title>{title}</title></head>
            <body>
              <h1>{name}</h1>
              <p>{bio}</p>
              <div>{experience}</div>
            </body>
          </html>
        `,
        templateFields: {
          title: 'Your Name - Portfolio',
          name: 'John Doe',
          bio: 'A passionate developer with experience in modern web technologies.',
          experience: 'Work history goes here...',
        }
      },
      {
        name: 'Creative Portfolio',
        price: 7500, // Price in cents ($75.00)
        description: 'A creative portfolio template with a colorful, artistic design.',
        image: ['https://gcdnb.pbrd.co/images/3lCe1VCZzxqI.png?o=1'],
        templateHtml: `
          <html>
            <head><title>{title}</title></head>
            <body>
              <h1>{name}</h1>
              <div class="about">{about}</div>
              <div class="projects">{projects}</div>
            </body>
          </html>
        `,
        templateFields: {
          title: 'Creative Portfolio - Your Name',
          name: 'Jane Smith',
          about: 'Creative artist and web developer.',
          projects: 'Portfolio projects go here...',
        }
      }
    ]
  });
}

main()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

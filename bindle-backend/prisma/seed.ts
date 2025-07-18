import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 🧹 Clear existing data (in correct order)
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.library.deleteMany();
  await prisma.dealClaim.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // 🔐 Hash password
  const hashedFounderPassword = await bcrypt.hash('SPQr1187!', 10);

  // 👤 Create Founder User
  const founder = await prisma.user.create({
    data: {
      email: 'rbhenderson0826@gmail.com',
      username: 'founder',
      password: hashedFounderPassword,
      name: 'Ryan Henderson',
      displayName: 'founder',
      xp: 999,
      level: 999,
      coinBalance: 999,
      isAdmin: true,
      isSeller: true,
    },
  });

  // 🏆 Create Founder Achievement
  const founderAchievement = await prisma.achievement.create({
    data: {
      title: 'Founder',
      description: "Look on my Works, ye Mighty, and despair!",
      icon: '🌱',
    },
  });

  // 🔗 Link Achievement to User
  await prisma.userAchievement.create({
    data: {
      userId: founder.id,
      achievementId: founderAchievement.id,
    },
  });

  // 📚 Create Books
  const dune = await prisma.book.create({
    data: {
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      description: 'Epic sci-fi saga.',
      imageUrl: 'https://example.com/dune.jpg',
    },
  });

  const neuromancer = await prisma.book.create({
    data: {
      title: 'Neuromancer',
      author: 'William Gibson',
      isbn: '9780441569595',
      description: 'Cyberpunk classic.',
      imageUrl: 'https://example.com/neuromancer.jpg',
    },
  });

  // 🏷️ Create Listings
  await prisma.listing.createMany({
    data: [
      {
        price: 9.99,
        condition: 'Good',
        sellerId: founder.id,
        bookId: dune.id,
        imageUrl: 'https://example.com/dune-listing.jpg',
      },
      {
        price: 6.5,
        condition: 'Fair',
        sellerId: founder.id,
        bookId: neuromancer.id,
        imageUrl: 'https://example.com/neuromancer-listing.jpg',
      },
    ],
  });

  // 📝 Founder Blog Post
  await prisma.post.create({
    data: {
      content: "Welcome to Bindle! We're just getting started building the bookverse.",
      authorId: founder.id,
      type: 'BLOG',
    },
  });
}

main()
  .then(() => {
    console.log('🌱 Seed data inserted successfully!');
  })
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test seller
  const seller = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      username: "seller1",
      name: "Test Seller",
      password: "password123", // In production, hash passwords
      displayName: "Test Seller",
      isSeller: true,
      avatarUrl: "https://via.placeholder.com/150",
    },
  });

  // Create test buyer
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: {
      email: "buyer@example.com",
      username: "buyer1",
      name: "Test Buyer",
      password: "password123",
      displayName: "Test Buyer",
      isSeller: false,
      avatarUrl: "https://via.placeholder.com/150",
    },
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      description: "A novel set in the Jazz Age.",
      imageUrl: "https://via.placeholder.com/200x300",
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      description: "Dystopian novel about totalitarianism.",
      imageUrl: "https://via.placeholder.com/200x300",
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      description: "A classic novel of racial injustice.",
      imageUrl: "https://via.placeholder.com/200x300",
    },
  });

  // Create listings for the seller
  await prisma.listing.createMany({
    data: [
      { sellerId: seller.id, bookId: book1.id, price: 10.99, quantity: 3, condition: "Good", imageUrl: book1.imageUrl },
      { sellerId: seller.id, bookId: book2.id, price: 8.49, quantity: 5, condition: "Like New", imageUrl: book2.imageUrl },
      { sellerId: seller.id, bookId: book3.id, price: 12.00, quantity: 2, condition: "New", imageUrl: book3.imageUrl },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


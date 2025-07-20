// backend/services/listingService.ts
import prisma from "@/lib/prisma";

export async function listAllListings() {
  return await prisma.listing.findMany({
    include: {
      book: true,
      seller: { select: { username: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function addListing(data: {
  bookId: number;
  price: number;
  quantity: number;
  condition: string;
  sellerId: number;
}) {
  if (!data.sellerId) {
    throw new Error("Seller ID is required to create a listing.");
  }

  return await prisma.listing.create({
    data: {
      bookId: data.bookId,
      price: data.price,
      quantity: data.quantity,
      condition: data.condition,
      sellerId: data.sellerId,
    },
    include: {
      book: true,
      seller: { select: { username: true } },
    },
  });
}



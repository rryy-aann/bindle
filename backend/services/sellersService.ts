import prisma from "@/lib/prisma";

export async function fetchAllSellers() {
  return await prisma.user.findMany({
    where: { isSeller: true },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
    },
    orderBy: { username: "asc" },
  });
}

export async function fetchSellerById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      isSeller: true,
    },
  });
}


import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  try {
    const sellerId = parseInt(params.id, 10);
    if (isNaN(sellerId)) {
      return NextResponse.json({ error: "Invalid seller ID" }, { status: 400 });
    }

    const seller = await prisma.user.findUnique({
      where: { id: sellerId },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        isSeller: true,
      },
    });

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller, { status: 200 });
  } catch (err) {
    console.error("GET /api/sellers/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch seller" }, { status: 500 });
  }
}


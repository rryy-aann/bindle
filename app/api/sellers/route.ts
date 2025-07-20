import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sellers = await prisma.user.findMany({
      where: { isSeller: true },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json(sellers, { status: 200 });
  } catch (err) {
    console.error("GET /api/sellers error:", err);
    return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isSeller: true },
      select: {
        id: true,
        username: true,
        displayName: true,
        isSeller: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error("POST /api/sellers error:", err);
    return NextResponse.json({ error: "Failed to update seller" }, { status: 500 });
  }
}


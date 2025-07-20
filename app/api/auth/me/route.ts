// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies(); // Await the dynamic API
    const token = cookieStore.get("bindle_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const payload = verifyAuthToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        displayName: true,
        avatarUrl: true,
        status: true,
        isSeller: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}


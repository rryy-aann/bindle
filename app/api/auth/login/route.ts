import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAuthToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, email, emailOrUsername, password } = await req.json();

    // Determine which field to use
    const identifier = username || email || emailOrUsername;
    if (!identifier || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Validate password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate and store token
    const token = createAuthToken(user.id);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}


import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("bindle_token");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("POST /api/auth/logout error:", err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}


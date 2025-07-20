// app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema for creating a book
const bookSchema = z.object({
  isbn: z.string().min(5, "ISBN must be at least 5 characters"),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isbn = searchParams.get("isbn");

    if (!isbn) {
      return NextResponse.json({ error: "ISBN is required" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { isbn },
      select: { id: true, title: true, author: true, imageUrl: true },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/books error:", error);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = bookSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { isbn, title, author, imageUrl } = parsed.data;

    // Check if book already exists
    let book = await prisma.book.findUnique({ where: { isbn } });

    if (!book) {
      book = await prisma.book.create({
        data: { isbn, title, author, imageUrl: imageUrl || "/images/test-image.jpg" },
        select: { id: true, title: true, author: true, imageUrl: true },
      });
    }

    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/books error:", error);
    return NextResponse.json({ error: "Failed to create or fetch book" }, { status: 500 });
  }
}


import { NextResponse } from "next/server";
import * as booksService from "@/backend/services/booksService";

export async function getBooks() {
  const books = await booksService.fetchAllBooks();
  return NextResponse.json(books);
}

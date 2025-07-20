import { NextResponse } from "next/server";
import * as reviewsService from "@/backend/services/reviewsService";

export async function getReviews() {
  const reviews = await reviewsService.fetchAllReviews();
  return NextResponse.json(reviews);
}

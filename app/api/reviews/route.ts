import { getReviews } from "@/backend/controllers/reviewsController";

export async function GET() {
  return getReviews();
}

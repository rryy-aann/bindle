import { getStats } from "@/backend/controllers/statsController";

export async function GET() {
  return getStats();
}

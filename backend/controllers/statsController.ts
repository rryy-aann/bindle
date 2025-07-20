import { NextResponse } from "next/server";
import * as statsService from "@/backend/services/statsService";

export async function getStats() {
  const stats = await statsService.fetchSiteStats();
  return NextResponse.json(stats);
}

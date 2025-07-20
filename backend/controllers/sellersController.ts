import { NextResponse } from "next/server";
import * as sellersService from "@/backend/services/sellersService";

export async function getSellers() {
  const sellers = await sellersService.fetchAllSellers();
  return NextResponse.json(sellers);
}

export async function getSellerById(id: number) {
  const seller = await sellersService.fetchSellerById(id);
  if (!seller) {
    return NextResponse.json({ error: "Seller not found" }, { status: 404 });
  }
  return NextResponse.json(seller);
}


// app/api/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getListings, createListing } from "@/backend/controllers/listingController";
import { getAuthUser } from "@/lib/auth";
import { listingSchema } from "@/backend/validators/listingValidator";

// --- GET: Fetch all listings ---
export async function GET() {
  try {
    const listings = await getListings();
    return NextResponse.json(listings);
  } catch (error: any) {
    console.error("GET /api/listings error:", error);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

// --- POST: Create a new listing (authenticated) ---
export async function POST(req: NextRequest) {
  try {
    // Authenticate the user
    const user = await getAuthUser();
    if (!user || !user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate data
    const data = await req.json();
    const parsed = listingSchema.safeParse({ ...data, sellerId: user.userId });

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

    // Create listing
    const newListing = await createListing(parsed.data);
    return NextResponse.json(newListing, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/listings error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create listing" },
      { status: 400 }
    );
  }
}


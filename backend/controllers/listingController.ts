// backend/controllers/listingController.ts
import { listAllListings, addListing } from "@/backend/services/listingService";
import { listingSchema } from "@/backend/validators/listingValidator";

export async function getListings() {
  try {
    return await listAllListings();
  } catch (error) {
    console.error("listingController.getListings error:", error);
    throw new Error("Failed to retrieve listings");
  }
}

export async function createListing(data: any) {
  try {
    const parsed = listingSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Listing validation error:", parsed.error.format());
      throw new Error("Invalid listing data");
    }

    return await addListing(parsed.data);
  } catch (error) {
    console.error("listingController.createListing error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create listing");
  }
}


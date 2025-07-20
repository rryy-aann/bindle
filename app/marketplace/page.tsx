import React from "react";
import { headers } from "next/headers";
import BookCard from "@/components/marketplace/BookCard";

async function getListings(baseUrl: string) {
  const res = await fetch(`${baseUrl}/api/listings`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

export default async function MarketplacePage() {
  const host = (await headers()).get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const listings = await getListings(baseUrl);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h1>
      {listings.length === 0 ? (
        <p className="text-gray-500 text-lg">No listings available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((l: any) => (
            <BookCard
  key={l.id}
  title={l.book?.title || "Untitled"}
  author={l.book?.author || "Unknown"}
  price={l.price}
  condition={l.condition}
  imageUrl={l.book?.imageUrl || l.imageUrl || "/images/test-image.jpg"}
  seller={l.seller?.username || "Unknown Seller"}
/>

          ))}
        </div>
      )}
    </main>
  );
}


import React from "react";
import prisma from "@/lib/prisma";

export default async function Page() {
  // Temporary hardcoded seller ID — we’ll replace this with the logged-in user later
  const sellerId = 1;

  let listings = [];
  try {
    listings = await prisma.listing.findMany({
      where: { sellerId },
      include: { book: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Inventory Page</h1>
      <p className="mt-2 text-gray-600">This is the inventory page.</p>

      <div className="mt-6">
        {listings.length === 0 ? (
          <p className="text-gray-500">No listings found.</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Book</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Condition</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className="text-gray-700">
                  <td className="border p-2">{l.book.title}</td>
                  <td className="border p-2">${l.price.toFixed(2)}</td>
                  <td className="border p-2">{l.quantity}</td>
                  <td className="border p-2">{l.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}


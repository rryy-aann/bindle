"use client";

import { useState } from "react";

export default function AddListingForm() {
  const [bookId, setBookId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: Number(bookId),
          price: Number(price),
          quantity: Number(quantity),
          condition,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create listing");
      }

      setSuccess(true);
      setBookId("");
      setPrice("");
      setQuantity("");
      setCondition("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border rounded shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add a Listing</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">Listing added!</p>}

      <div className="mb-2">
        <label className="block text-sm font-medium">Book ID</label>
        <input
          type="number"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
          className="border rounded w-full p-2 text-sm"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Price ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
          className="border rounded w-full p-2 text-sm"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="border rounded w-full p-2 text-sm"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Condition</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
          className="border rounded w-full p-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Listing"}
      </button>
    </form>
  );
}


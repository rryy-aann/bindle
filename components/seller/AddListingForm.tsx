"use client";

import React, { useState } from "react";

export default function AddListingForm() {
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    price: "",
    quantity: "1",
    condition: "New",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // First, check if the book exists (by ISBN)
      const bookRes = await fetch(`/api/books?isbn=${encodeURIComponent(form.isbn)}`);
      let bookId: number | null = null;

      if (bookRes.ok) {
        const book = await bookRes.json();
        bookId = book.id;
      } else {
        // If no book, we could create it (OPTIONAL). For now, throw an error.
        throw new Error("Book not found. Add book creation flow next.");
      }

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          price: parseFloat(form.price),
          quantity: parseInt(form.quantity),
          condition: form.condition,
          imageUrl: form.imageUrl || "/images/test-image.jpg",
        }),
        credentials: "include", // IMPORTANT: Send cookie with request
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create listing");
      }

      setSuccess(true);
      setForm({
        isbn: "",
        title: "",
        author: "",
        price: "",
        quantity: "1",
        condition: "New",
        imageUrl: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white border border-gray-300 rounded-md shadow-md"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="e.g. 9780451524935"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Condition</label>
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        >
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/cover.jpg"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Listing created successfully!</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Listing"}
      </button>
    </form>
  );
}


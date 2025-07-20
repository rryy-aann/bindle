// components/marketplace/BookCard.tsx
import React from "react";

export default function BookCard({
  title,
  author,
  price,
  condition,
  imageUrl,
  seller,
}: {
  title: string;
  author: string;
  price: number;
  condition: string;
  imageUrl: string;
  seller: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200 bg-white">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-52 object-cover bg-gray-100"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-600 truncate">{author}</p>
        <p className="text-sm text-gray-500">{condition}</p>
        <p className="mt-2 text-blue-600 font-bold">${price.toFixed(2)}</p>
        <p className="mt-1 text-xs text-gray-500">Sold by {seller}</p>
      </div>
    </div>
  );
}


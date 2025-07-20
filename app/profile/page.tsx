"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/"); // Not logged in
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-500">Not logged in</h1>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatarUrl || "/images/test-image.jpg"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
        </div>
      </div>

      {/* Seller Dashboard Section */}
      {user.isSeller && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Seller Tools
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/seller/inventory/create")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create Listing
            </button>
            <button
              onClick={() => router.push("/seller/inventory")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Inventory
            </button>
            <button
              onClick={() => router.push("/seller/sales")}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Sales
            </button>
          </div>
        </section>
      )}

      {/* Tabs Placeholder */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-6">
          <button className="text-gray-700 font-medium hover:text-gray-900">
            Posts
          </button>
          <button className="text-gray-700 font-medium hover:text-gray-900">
            Library
          </button>
          {user.isSeller && (
            <button className="text-gray-700 font-medium hover:text-gray-900">
              Store
            </button>
          )}
        </nav>
      </div>
    </main>
  );
}


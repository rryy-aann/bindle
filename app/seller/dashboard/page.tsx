// app/seller/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
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
          router.push("/auth/login"); // Redirect if no user
        }
      } catch (err) {
        console.error("Failed to fetch seller data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-xl text-red-600">You must be logged in as a seller.</h1>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl || "/images/test-image.jpg"}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.username}
          </h1>
          <p className="text-gray-600">Seller Dashboard</p>
        </div>
      </div>

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => router.push("/seller/inventory/create")}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Create New Listing
        </button>

        <button
          onClick={() => router.push("/seller/inventory")}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          View Inventory
        </button>

        <button
          onClick={() => router.push("/seller/sales")}
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
        >
          View Sales
        </button>
      </section>
    </main>
  );
}


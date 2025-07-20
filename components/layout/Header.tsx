"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || null);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      // Fetch the updated user info after login
      const userRes = await fetch("/api/auth/me", { cache: "no-store" });
      if (userRes.ok) {
        const data = await userRes.json();
        setUser(data.user); // Update state directly
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-white">
          bindle
        </a>
        <nav className="space-x-4">
          <a href="/about" className="hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="/community" className="hover:text-gray-300 transition-colors">
            Community
          </a>
          <a href="/marketplace" className="hover:text-gray-300 transition-colors">
            Marketplace
          </a>
          <a href="/merch" className="hover:text-gray-300 transition-colors">
            Merch
          </a>
          <a href="/sell" className="hover:text-gray-300 transition-colors">
            Sell
          </a>
        </nav>

        {/* User Auth Controls */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <a href="/cart" className="hover:text-gray-300 transition-colors">
                Cart
              </a>
              <a href="/profile">
                <img
                  src={user.avatarUrl || "/images/test-image.jpg"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-gray-400"
                />
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <form onSubmit={handleLogin} className="flex items-center space-x-2">
              <input
                type="text"
                name="emailOrUsername"
                placeholder="Email/Username"
                value={form.emailOrUsername}
                onChange={handleChange}
                className="px-2 py-1 text-black rounded border border-gray-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="px-2 py-1 text-black rounded border border-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Login
              </button>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex flex-col text-xs space-y-1">
                <a href="/auth/register" className="hover:underline">
                  Register
                </a>
                <a href="#" className="hover:underline">
                  Forgot Username/Password?
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}


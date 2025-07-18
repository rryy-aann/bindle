'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/users/me', {
      credentials: 'include',
    })
      .then((res) => res.ok ? res.json() : null)
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
      router.refresh();
    } else {
      alert('Login failed');
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <Link href="/" className="text-2xl font-bold lowercase text-black">
        bindle
      </Link>

      {/* Center: Navigation */}
      <nav className="space-x-6 text-gray-800 font-medium">
        <Link href="/about" className="hover:text-black">About</Link>
        <Link href="/community" className="hover:text-black">Community</Link>
        <Link href="/marketplace" className="hover:text-black">Marketplace</Link>
        <Link href="/merch" className="hover:text-black">Merch</Link>
        <Link href="/sell" className="hover:text-black">Sell</Link>
      </nav>

      {/* Right: Auth section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <Link href="/profile">
            <Image
  src={user.avatarUrl && user.avatarUrl.trim() !== '' ? user.avatarUrl : '/default-avatar.png'}
  alt="Avatar"
  width={36}
  height={36}
  className="rounded-full border hover:opacity-80"
/>

          </Link>
        ) : (
          <div className="flex flex-col space-y-1">
            <input
              type="email"
              placeholder="Email"
              className="px-2 py-1 border rounded text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-2 py-1 border rounded text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-black text-white text-sm py-1 rounded hover:bg-gray-800"
            >
              Log In
            </button>
            <div className="text-xs text-gray-600 mt-1">
              <Link href="/register" className="hover:underline mr-3">Register</Link>
              <Link href="/forgot" className="hover:underline">Forgot login?</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

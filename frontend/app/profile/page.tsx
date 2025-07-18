'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { logout } from '@/lib/api';

import Achievements from '@/app/profile/tabs/achievements';
import Posts from '@/app/profile/tabs/posts';
import Library from '@/app/profile/tabs/library';
import ProfileInfo from '@/app/profile/tabs/profile-info';

type User = {
  id: number;
  email: string;
  username: string;
  displayName: string;
  xp: number;
  level: number;
  coinBalance: number;
  avatarUrl?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'achievements' | 'posts' | 'library'>('profile');

  useEffect(() => {
    fetch('http://localhost:3000/api/users/me', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(setUser)
      .catch((err) => {
        console.error('Error fetching user:', err);
        router.push('/');
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user) return <div className="p-6 text-lg">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Image
            src={user.avatarUrl || '/default-avatar.png'}
            alt="Profile picture"
            width={64}
            height={64}
            className="rounded-full border"
          />
          <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        {['profile', 'achievements', 'posts', 'library'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && <ProfileInfo user={user} />}
      {activeTab === 'achievements' && <Achievements />}
      {activeTab === 'posts' && <Posts user={user} />}
      {activeTab === 'library' && <Library user={user} />}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
};

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/achievements/me', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch achievements');
        return res.json();
      })
      .then((data) => setAchievements(data))
      .catch((err) => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading achievements...</p>;

  if (achievements.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        <p>You haven't unlocked any achievements yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {achievements.map((ach) => (
        <div
          key={ach.id}
          className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
        >
          <div className="text-3xl mb-2">{ach.icon}</div>
          <h3 className="text-xl font-bold mb-1">{ach.title}</h3>
          <p className="text-gray-600 text-sm">{ach.description}</p>
        </div>
      ))}
    </div>
  );
}

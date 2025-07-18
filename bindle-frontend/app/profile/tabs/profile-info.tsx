'use client';

import { User } from '../types';

export default function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={user.avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover border"
      />
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Level:</strong> {user.level}</p>
        <p><strong>XP:</strong> {user.xp}</p>
        <p><strong>Coins:</strong> {user.coinBalance}</p>
      </div>
    </div>
  );
}

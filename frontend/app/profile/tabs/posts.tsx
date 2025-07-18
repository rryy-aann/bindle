'use client';

import { User } from '../types';

export default function Posts({ user }: { user: User }) {
  return (
    <div className="text-gray-700">
      <p>📝 Your posts will show here.</p>
    </div>
  );
}

'use client';

import { User } from '../types';

export default function Library({ user }: { user: User }) {
  return (
    <div className="text-gray-700">
      <p>📚 Your book library will show here.</p>
    </div>
  );
}

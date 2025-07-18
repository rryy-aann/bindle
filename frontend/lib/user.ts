// User session logic
// Example: fetch current user, check login status, logout

export async function fetchUser() {
  const res = await fetch('http://localhost:3000/api/users/me', {
    credentials: 'include',
  });

  if (!res.ok) return null;
  return res.json();
}

// Add helpers like isLoggedIn(), getUserLevel(), etc.

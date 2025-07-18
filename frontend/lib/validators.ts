// Validation helpers used by both frontend and backend (optional)
// Example: email, password, username, listing fields

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string): boolean {
  return password.length >= 8;
}

// Add other validators like isValidUsername(), isValidListing(), etc.

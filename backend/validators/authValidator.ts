export function validateLogin(data: any) {
  if (!data.email || !data.password) {
    throw new Error("Email and password are required.");
  }
  return true;
}

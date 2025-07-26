export function isCartBlocked(): boolean {
  const cached = localStorage.getItem("cached_wompi_link");
  if (!cached) return false;

  try {
    const parsed = JSON.parse(cached);
    const expiresAt = new Date(parsed.expires_at);
    return new Date() < expiresAt;
  } catch {
    return false;
  }
}

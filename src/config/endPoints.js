const base = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')

export const end_points = {
  users: `${base}/users`,
}

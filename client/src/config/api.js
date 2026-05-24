/**
 * API base URL for all backend requests.
 *
 * Local dev:  VITE_API_URL=/api  (Vite proxy → backend in vite.config.js)
 * Production: VITE_API_URL=https://your-backend.example.com/api
 */
function resolveApiBaseUrl() {
  const url = import.meta.env.VITE_API_URL;

  if (!url || !String(url).trim()) {
    console.warn("VITE_API_URL is missing");
    return "/api";
  }

  return String(url).trim().replace(/\/$/, "");
}

export const API_BASE_URL = resolveApiBaseUrl();

/** Build a full API path, e.g. apiUrl("/auth/login") */
export function apiUrl(path) {
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${segment}`;
}

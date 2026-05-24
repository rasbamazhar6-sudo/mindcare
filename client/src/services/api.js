import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import { TOKEN_STORAGE_KEY } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 45000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent("mindcare:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };

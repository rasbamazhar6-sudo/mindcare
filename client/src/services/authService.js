import api from "./api";

export function registerRequest(payload) {
  return api.post("/auth/register", payload);
}

export function loginRequest(payload) {
  return api.post("/auth/login", payload);
}

export function getMe() {
  return api.get("/auth/me");
}

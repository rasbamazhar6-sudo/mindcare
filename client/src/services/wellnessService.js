import api from "./api";

export function fetchTodayWellness() {
  return api.get("/wellness/today");
}

export function updateTodayWellness(payload) {
  return api.put("/wellness/today", payload);
}

export function fetchDashboardStats() {
  return api.get("/wellness/stats");
}

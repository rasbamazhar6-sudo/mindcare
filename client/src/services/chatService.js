import api from "./api";

/** Unified chat — JWT optional; history saved when logged in */
export function sendChat(message, history = []) {
  return api.post("/chat", { message, history });
}

export function fetchChatHistory() {
  return api.get("/chat/history");
}

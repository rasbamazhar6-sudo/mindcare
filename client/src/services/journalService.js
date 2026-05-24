import api from "./api";

export function fetchJournalEntries() {
  return api.get("/journal");
}

export function createJournalEntry(payload) {
  return api.post("/journal", payload);
}

export function deleteJournalEntry(id) {
  return api.delete(`/journal/${id}`);
}

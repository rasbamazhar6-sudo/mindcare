export function todayKey(timeZone = "Asia/Karachi") {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

export function lastNDaysKeys(n = 7, timeZone = "Asia/Karachi") {
  const keys = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    keys.push(new Intl.DateTimeFormat("en-CA", { timeZone }).format(d));
  }
  return keys;
}

export function weekdayLabel(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(date);
}

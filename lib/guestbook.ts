import type { GuestbookEntry } from "./types";

const STORAGE_KEY = "farewell-guestbook-notes";

export function loadGuestbookEntries(): GuestbookEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GuestbookEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGuestbookEntry(message: string): GuestbookEntry {
  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  const existing = loadGuestbookEntries();
  const updated = [entry, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return entry;
}

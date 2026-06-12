"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadGuestbookEntries, saveGuestbookEntry } from "@/lib/guestbook";
import type { GuestbookEntry } from "@/lib/types";

interface GuestbookProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Modal guestbook — notes persist in localStorage on this device/browser. */
export default function Guestbook({ isOpen, onClose }: GuestbookProps) {
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEntries(loadGuestbookEntries());
      setSaved(false);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim()) return;
      const entry = saveGuestbookEntry(message);
      setEntries((prev) => [entry, ...prev]);
      setMessage("");
      setSaved(true);
    },
    [message]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="guestbook-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-deep/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-sm bg-cream p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="guestbook-title"
              className="font-display text-2xl text-ink"
            >
              Leave a note
            </h2>
            <p className="mt-2 font-body text-sm text-ink/70">
              Write something back. Your note stays on this device — a quiet
              keepsake between us.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label htmlFor="guestbook-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="guestbook-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="What would you say back?"
                className="w-full resize-none rounded-sm border border-accent/20 bg-white/50 px-4 py-3 font-body text-sm leading-relaxed text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="rounded-full bg-accent px-6 py-2.5 font-body text-sm font-medium text-cream transition hover:bg-deep disabled:opacity-40"
                >
                  Save note
                </button>
                {saved && (
                  <span className="font-body text-sm text-accent" role="status">
                    Saved locally ✓
                  </span>
                )}
              </div>
            </form>

            {entries.length > 0 && (
              <div className="mt-8 border-t border-accent/15 pt-6">
                <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                  Notes left here
                </h3>
                <ul className="mt-4 space-y-4">
                  {entries.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-sm bg-white/40 px-4 py-3"
                    >
                      <p className="font-handwritten text-lg text-ink">
                        {entry.message}
                      </p>
                      <time
                        dateTime={entry.createdAt}
                        className="mt-1 block font-body text-xs text-ink/50"
                      >
                        {new Date(entry.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-6 font-body text-sm text-ink/60 underline hover:text-ink"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

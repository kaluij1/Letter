"use client";

import { motion } from "framer-motion";
import { finalSection } from "@/lib/memories";

interface FinalSectionProps {
  onReplay: () => void;
  onLeaveNote: () => void;
}

/** Closing full-screen moment with replay + guestbook CTAs. */
export default function FinalSection({
  onReplay,
  onLeaveNote,
}: FinalSectionProps) {
  const lines = finalSection.body.split("\n");

  return (
    <section
      id="finale"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-deep px-6 py-24 text-center text-cream"
      aria-labelledby="finale-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,243,236,0.08)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl"
      >
        <p className="font-handwritten text-3xl text-cream/80 sm:text-4xl">
          {finalSection.signoff}
        </p>

        <h2
          id="finale-heading"
          className="mt-8 font-display text-4xl font-medium sm:text-5xl md:text-6xl"
        >
          {finalSection.headline}
        </h2>

        <div className="mt-6 space-y-1">
          {lines.map((line) => (
            <p
              key={line}
              className="font-body text-lg leading-relaxed text-cream/85 sm:text-xl"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onReplay}
            className="w-full rounded-full border border-cream/30 px-8 py-3.5 font-body text-sm font-medium text-cream transition hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:w-auto"
            aria-label="Replay memories from the beginning"
          >
            Replay Memories
          </button>
          <button
            type="button"
            onClick={onLeaveNote}
            className="w-full rounded-full bg-cream px-8 py-3.5 font-body text-sm font-medium text-deep transition hover:bg-cream/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream sm:w-auto"
            aria-label="Open guestbook to leave a note"
          >
            Leave a Note
          </button>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { PAPER_COLORS, type LetterData } from "@/lib/types";

function WaxSealDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="34" fill="#8b2223" />
      <circle cx="36" cy="36" r="30" fill="#7a1e1f" opacity="0.6" />
      <text
        x="36"
        y="42"
        textAnchor="middle"
        fill="#fdf6ee"
        fontSize="22"
        fontFamily="serif"
      >
        ✦
      </text>
    </svg>
  );
}

interface LetterPaperProps {
  letter: LetterData;
  className?: string;
}

export default function LetterPaper({ letter, className = "" }: LetterPaperProps) {
  const bg = PAPER_COLORS[letter.bg];
  const greeting = letter.recipient.trim()
    ? `Dear ${letter.recipient.trim()},`
    : "Dear Friend,";

  const paragraphs = letter.body.split(/\n\n+/).filter(Boolean);

  return (
    <article
      className={`relative mx-auto w-full max-w-[520px] rounded-sm px-10 py-12 shadow-[0_8px_32px_rgba(61,52,41,0.12),0_2px_8px_rgba(61,52,41,0.08)] max-[699px]:px-6 max-[699px]:py-8 ${className}`}
      style={{ backgroundColor: bg }}
      aria-label="Opened letter"
    >
      <time
        dateTime={letter.date}
        className="absolute right-10 top-8 font-display text-sm italic text-[var(--ink-muted)] max-[699px]:right-6 max-[699px]:top-6"
      >
        {letter.date}
      </time>

      <header className="mb-6 pr-24">
        <h2 className="font-display text-2xl italic text-[var(--ink)]">
          {greeting}
        </h2>
      </header>

      <div className="space-y-4 font-body text-[15px] leading-[1.85] text-[var(--ink)]">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))
        ) : (
          <p className="text-[var(--ink-muted)] italic">…</p>
        )}
      </div>

      {letter.photo && (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={letter.photo}
            alt="A memory shared in the letter"
            className="max-h-64 w-full rounded object-cover shadow-md"
          />
          <figcaption className="mt-2 text-center font-body text-xs italic text-[var(--ink-muted)]">
            A memory, for you to keep.
          </figcaption>
        </figure>
      )}

      <footer className="mt-10 space-y-1">
        <p className="font-body text-[var(--ink)]">{letter.signoff}</p>
        <p className="font-display text-2xl italic text-[var(--ink)]">
          {letter.sender.trim() || "…"}
        </p>
      </footer>

      <WaxSealDecor className="absolute bottom-6 right-6 opacity-90 max-[699px]:bottom-4 max-[699px]:right-4" />
    </article>
  );
}

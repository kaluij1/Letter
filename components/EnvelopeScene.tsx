"use client";

import { PAPER_COLORS, type LetterData } from "@/lib/types";
import LetterPaper from "./LetterPaper";

export type AnimationPhase =
  | "closed"
  | "flap-open"
  | "peek-rise"
  | "envelope-fade"
  | "letter-show"
  | "open";

interface EnvelopeSceneProps {
  letter: LetterData;
  phase: AnimationPhase;
  onOpenEnvelope: () => void;
  onBackToEnvelope: () => void;
}

function getPeekPreview(body: string, maxLen = 120): string {
  const flat = body.replace(/\s+/g, " ").trim();
  if (!flat) return "…";
  return flat.length > maxLen ? `${flat.slice(0, maxLen)}…` : flat;
}

export default function EnvelopeScene({
  letter,
  phase,
  onOpenEnvelope,
  onBackToEnvelope,
}: EnvelopeSceneProps) {
  const greeting = letter.recipient.trim()
    ? `Dear ${letter.recipient.trim()},`
    : "Dear Friend,";

  const peekBg = PAPER_COLORS[letter.bg];
  const isAnimating = phase !== "closed" && phase !== "open";
  const showEnvelope = phase !== "open";
  const showLetter = phase === "letter-show" || phase === "open";

  const flapOpen = phase !== "closed";
  const peekRise =
    phase === "peek-rise" ||
    phase === "envelope-fade" ||
    phase === "letter-show" ||
    phase === "open";
  const envelopeFade =
    phase === "envelope-fade" ||
    phase === "letter-show" ||
    phase === "open";
  const letterVisible = phase === "letter-show" || phase === "open";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[520px]">
        {/* Open letter (revealed after animation) */}
        <div
          className={`letter-reveal ${letterVisible ? "letter-reveal--show" : ""} ${
            phase === "open" ? "relative" : "absolute inset-x-0 top-0"
          } ${showLetter ? "z-20" : "pointer-events-none z-0"}`}
        >
          {(showLetter || phase === "open") && (
            <>
              <LetterPaper letter={letter} />
              {phase === "open" && (
                <button
                  type="button"
                  onClick={onBackToEnvelope}
                  className="mt-6 font-body text-sm text-[var(--ink-muted)] underline transition hover:text-[var(--ink)]"
                  aria-label="Back to envelope view"
                >
                  ← Back to envelope
                </button>
              )}
            </>
          )}
        </div>

        {/* Envelope */}
        {showEnvelope && (
          <div
            className={`envelope-wrap envelope-scene relative mx-auto w-full ${
              envelopeFade ? "envelope-wrap--fade" : ""
            }`}
          >
            <button
              type="button"
              onClick={onOpenEnvelope}
              disabled={isAnimating || phase !== "closed"}
              className="group relative mx-auto block w-full max-w-[520px] cursor-pointer disabled:cursor-default"
              aria-label="Click the envelope to open your letter"
            >
              <svg
                viewBox="0 0 520 340"
                className="w-full drop-shadow-md"
                role="img"
                aria-label="Sealed envelope with wax seal"
              >
                {/* Envelope body */}
                <rect
                  x="20"
                  y="80"
                  width="480"
                  height="240"
                  fill="#e8d9c4"
                  stroke="#c9b99a"
                  strokeWidth="1"
                />
                {/* Side fold lines */}
                <line
                  x1="20"
                  y1="80"
                  x2="260"
                  y2="200"
                  stroke="#c9b99a"
                  strokeWidth="0.75"
                  opacity="0.5"
                />
                <line
                  x1="500"
                  y1="80"
                  x2="260"
                  y2="200"
                  stroke="#c9b99a"
                  strokeWidth="0.75"
                  opacity="0.5"
                />
                <line
                  x1="20"
                  y1="320"
                  x2="260"
                  y2="200"
                  stroke="#c9b99a"
                  strokeWidth="0.75"
                  opacity="0.5"
                />
                <line
                  x1="500"
                  y1="320"
                  x2="260"
                  y2="200"
                  stroke="#c9b99a"
                  strokeWidth="0.75"
                  opacity="0.5"
                />
                {/* Bottom V */}
                <polygon
                  points="20,320 260,200 500,320"
                  fill="#dfd0b8"
                  stroke="#c9b99a"
                  strokeWidth="0.5"
                />
                {/* Flap (animated via foreignObject overlay in HTML for 3D) */}
              </svg>

              {/* HTML flap for rotateX */}
              <div
                className="pointer-events-none absolute left-[3.85%] top-[14%] h-[35%] w-[92.3%]"
                style={{ perspective: "600px" }}
              >
                <div
                  className={`envelope-flap envelope-flap-3d absolute inset-0 origin-top ${
                    flapOpen ? "envelope-flap--open" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                      background: "linear-gradient(180deg, #dfd0b8 0%, #e8d9c4 100%)",
                      borderBottom: "1px solid #c9b99a",
                    }}
                  />
                </div>
              </div>

              {/* Wax seal on envelope */}
              <div
                className="pointer-events-none absolute left-1/2 top-[52%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#8b2223] shadow-md"
                aria-hidden="true"
              >
                <span className="font-display text-xl text-parchment-light">✦</span>
              </div>
            </button>

            {/* Letter peek */}
            <div
              className={`letter-peek absolute left-1/2 z-10 w-[78%] max-w-[400px] -translate-x-1/2 rounded-sm px-5 py-4 shadow-md ${
                peekRise ? "letter-peek--rise" : ""
              }`}
              style={{ backgroundColor: peekBg }}
              aria-hidden={!peekRise}
            >
              <p className="text-right font-display text-xs italic text-[var(--ink-muted)]">
                {letter.date}
              </p>
              <p className="font-display text-lg italic text-[var(--ink)]">
                {greeting}
              </p>
              <p className="mt-2 line-clamp-4 font-body text-sm leading-relaxed text-[var(--ink)]">
                {getPeekPreview(letter.body)}
              </p>
            </div>
          </div>
        )}
      </div>

      {phase === "closed" && (
        <p className="mt-6 text-center font-body text-sm italic text-[var(--ink-muted)]">
          Click the envelope to open your letter
        </p>
      )}
    </div>
  );
}

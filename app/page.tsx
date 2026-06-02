"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import EnvelopeScene, { type AnimationPhase } from "@/components/EnvelopeScene";
import SharePanel from "@/components/SharePanel";
import Sidebar from "@/components/Sidebar";
import { buildShareUrl, decompressLetter } from "@/lib/encoding";
import { DEFAULT_LETTER, type LetterData } from "@/lib/types";

function DearFriendApp() {
  const searchParams = useSearchParams();
  const [letter, setLetter] = useState<LetterData>(DEFAULT_LETTER);
  const [sealed, setSealed] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [phase, setPhase] = useState<AnimationPhase>("closed");
  const [isRecipient, setIsRecipient] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    const encoded = searchParams.get("letter");
    if (encoded) {
      const data = decompressLetter(encoded);
      if (data) {
        setLetter(data);
        setSealed(true);
        setIsRecipient(true);
        setPhase("closed");
      }
    }
    setHydrated(true);
  }, [searchParams]);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  const handleSeal = useCallback(() => {
    const data: LetterData = {
      ...letter,
      date:
        letter.date ||
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    };
    setLetter(data);
    setSealed(true);
    setPhase("closed");
    setShareUrl(buildShareUrl(data));
  }, [letter]);

  const handleOpenEnvelope = useCallback(() => {
    if (phase !== "closed") return;
    clearTimeouts();

    setPhase("flap-open");

    schedule(() => setPhase("peek-rise"), 450);

    schedule(() => setPhase("envelope-fade"), 1400);

    schedule(() => setPhase("letter-show"), 1850);

    schedule(() => setPhase("open"), 2350);
  }, [phase, clearTimeouts, schedule]);

  const handleBackToEnvelope = useCallback(() => {
    clearTimeouts();
    setPhase("closed");
  }, [clearTimeouts]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center font-body text-[var(--ink-muted)]">
        Opening…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col min-[700px]:flex-row">
      <Sidebar
        letter={letter}
        onChange={setLetter}
        onSeal={handleSeal}
        readOnly={isRecipient || sealed}
      />

      <main
        className="flex flex-1 flex-col items-center justify-start bg-[#f5ebe0] px-6 py-10 max-[699px]:px-4"
        aria-label="Letter preview"
      >
        {sealed ? (
          <>
            <EnvelopeScene
              letter={letter}
              phase={phase}
              onOpenEnvelope={handleOpenEnvelope}
              onBackToEnvelope={handleBackToEnvelope}
            />
            {!isRecipient && <SharePanel shareUrl={shareUrl} />}
          </>
        ) : (
          <div className="flex h-full max-w-md flex-col items-center justify-center text-center">
            <p className="font-display text-2xl italic text-[var(--ink-muted)]">
              Your letter awaits
            </p>
            <p className="mt-3 font-body text-sm text-[var(--ink-muted)]">
              Fill in the form and seal your letter to see the envelope.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center font-body text-[var(--ink-muted)]">
          Opening…
        </div>
      }
    >
      <DearFriendApp />
    </Suspense>
  );
}

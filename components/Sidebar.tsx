"use client";

import { useCallback, useRef, useState } from "react";
import {
  PAPER_COLORS,
  SIGN_OFFS,
  type LetterData,
  type PaperColorKey,
} from "@/lib/types";

const MAX_BODY_LENGTH = 2000;

interface SidebarProps {
  letter: LetterData;
  onChange: (letter: LetterData) => void;
  onSeal: () => void;
  readOnly?: boolean;
}

export default function Sidebar({
  letter,
  onChange,
  onSeal,
  readOnly = false,
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const update = useCallback(
    (patch: Partial<LetterData>) => {
      onChange({ ...letter, ...patch });
    },
    [letter, onChange]
  );

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          update({ photo: reader.result });
        }
      };
      reader.readAsDataURL(file);
    },
    [update]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (readOnly) return;
      handleFile(e.dataTransfer.files[0] ?? null);
    },
    [handleFile, readOnly]
  );

  const canSeal =
    letter.recipient.trim() &&
    letter.sender.trim() &&
    letter.body.trim() &&
    !readOnly;

  return (
    <aside
      className="w-full shrink-0 border-r border-parchment-dark/40 bg-parchment-light px-6 py-8 min-[700px]:w-80 min-[700px]:min-w-[320px] min-[700px]:max-w-[320px]"
      aria-label="Letter composer"
    >
      <header className="mb-8">
        <h1 className="font-display text-3xl italic text-[var(--ink)]">
          Dear Friend,
        </h1>
        <p className="mt-1 font-body text-sm text-[var(--ink-muted)]">
          Send a virtual farewell letter
        </p>
      </header>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSeal) onSeal();
        }}
      >
        <div>
          <label htmlFor="recipient" className="mb-1 block text-sm font-medium">
            To
          </label>
          <input
            id="recipient"
            type="text"
            value={letter.recipient}
            onChange={(e) => update({ recipient: e.target.value })}
            disabled={readOnly}
            placeholder="Recipient's name"
            className="w-full rounded border border-parchment-dark/50 bg-white/60 px-3 py-2 font-body text-sm outline-none focus:border-parchment-dark focus:ring-1 focus:ring-parchment-dark"
          />
        </div>

        <div>
          <label htmlFor="sender" className="mb-1 block text-sm font-medium">
            From
          </label>
          <input
            id="sender"
            type="text"
            value={letter.sender}
            onChange={(e) => update({ sender: e.target.value })}
            disabled={readOnly}
            placeholder="Your name"
            className="w-full rounded border border-parchment-dark/50 bg-white/60 px-3 py-2 font-body text-sm outline-none focus:border-parchment-dark focus:ring-1 focus:ring-parchment-dark"
          />
        </div>

        <div>
          <label htmlFor="signoff" className="mb-1 block text-sm font-medium">
            Sign-off
          </label>
          <select
            id="signoff"
            value={letter.signoff}
            onChange={(e) => update({ signoff: e.target.value as LetterData["signoff"] })}
            disabled={readOnly}
            className="w-full rounded border border-parchment-dark/50 bg-white/60 px-3 py-2 font-body text-sm outline-none focus:border-parchment-dark focus:ring-1 focus:ring-parchment-dark"
          >
            {SIGN_OFFS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium">Photo (optional)</span>
          <div
            role="button"
            tabIndex={readOnly ? -1 : 0}
            aria-label="Upload a photo for your letter"
            onKeyDown={(e) => {
              if (!readOnly && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!readOnly) setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => !readOnly && fileInputRef.current?.click()}
            className={`flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-4 py-4 text-center transition-colors ${
              dragOver
                ? "border-wax bg-wax/5"
                : "border-parchment-dark/60 bg-white/40"
            } ${readOnly ? "pointer-events-none opacity-70" : ""}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-hidden
              disabled={readOnly}
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            {letter.photo ? (
              <div className="flex flex-col items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={letter.photo}
                  alt="Uploaded memory preview"
                  className="h-16 w-16 rounded object-cover shadow-sm"
                />
                {!readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      update({ photo: undefined });
                    }}
                    className="text-xs text-wax underline"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm text-[var(--ink-muted)]">
                Drag & drop an image, or click to browse
              </p>
            )}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Paper color</legend>
          <div className="flex gap-3" role="radiogroup" aria-label="Letter paper color">
            {(Object.keys(PAPER_COLORS) as PaperColorKey[]).map((key) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={letter.bg === key}
                aria-label={`${key} paper`}
                disabled={readOnly}
                onClick={() => update({ bg: key })}
                className={`h-9 w-9 rounded-full border-2 shadow-sm transition-transform ${
                  letter.bg === key
                    ? "scale-110 border-wax ring-2 ring-wax/30"
                    : "border-parchment-dark/40 hover:scale-105"
                }`}
                style={{ backgroundColor: PAPER_COLORS[key] }}
              />
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="body" className="mb-1 block text-sm font-medium">
            Your letter
          </label>
          <textarea
            id="body"
            value={letter.body}
            onChange={(e) =>
              update({ body: e.target.value.slice(0, MAX_BODY_LENGTH) })
            }
            disabled={readOnly}
            rows={8}
            placeholder="Write from the heart..."
            className="w-full resize-y rounded border border-parchment-dark/50 bg-white/60 px-3 py-2 font-body text-sm leading-relaxed outline-none focus:border-parchment-dark focus:ring-1 focus:ring-parchment-dark"
          />
          <p
            className="mt-1 text-right text-xs text-[var(--ink-muted)]"
            aria-live="polite"
          >
            {letter.body.length} / {MAX_BODY_LENGTH}
          </p>
        </div>

        {!readOnly && (
          <button
            type="submit"
            disabled={!canSeal}
            className="mt-2 w-full rounded bg-wax px-4 py-3 font-body text-sm font-semibold text-white shadow-md transition hover:bg-[#6e1b1c] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Seal &amp; send letter
          </button>
        )}
      </form>
    </aside>
  );
}

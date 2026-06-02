import LZString from "lz-string";
import {
  DEFAULT_LETTER,
  PAPER_COLORS,
  SIGN_OFFS,
  type LetterData,
  type PaperColorKey,
  type SignOff,
} from "./types";

function isPaperColorKey(value: string): value is PaperColorKey {
  return value in PAPER_COLORS;
}

function isSignOff(value: string): value is SignOff {
  return (SIGN_OFFS as readonly string[]).includes(value);
}

export function compressLetter(data: LetterData): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}

export function decompressLetter(encoded: string): LetterData | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;

    const parsed = JSON.parse(json) as Partial<LetterData>;

    return {
      recipient: parsed.recipient ?? DEFAULT_LETTER.recipient,
      sender: parsed.sender ?? DEFAULT_LETTER.sender,
      body: parsed.body ?? DEFAULT_LETTER.body,
      signoff: isSignOff(parsed.signoff ?? "")
        ? parsed.signoff
        : DEFAULT_LETTER.signoff,
      bg: isPaperColorKey(parsed.bg ?? "") ? parsed.bg : DEFAULT_LETTER.bg,
      date: parsed.date ?? DEFAULT_LETTER.date,
      photo: parsed.photo,
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(data: LetterData): string {
  if (typeof window === "undefined") return "";
  const base = window.location.origin + window.location.pathname;
  return `${base}?letter=${compressLetter(data)}`;
}

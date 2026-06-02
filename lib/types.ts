export const PAPER_COLORS = {
  ivory: "#fdf6ee",
  blue: "#eef4f8",
  lavender: "#f5eef8",
  sage: "#eef5ee",
} as const;

export type PaperColorKey = keyof typeof PAPER_COLORS;

export const SIGN_OFFS = [
  "With love,",
  "Warmly,",
  "Always yours,",
  "Forever grateful,",
  "With all my heart,",
  "Miss you already,",
  "Until we meet again,",
] as const;

export type SignOff = (typeof SIGN_OFFS)[number];

export interface LetterData {
  recipient: string;
  sender: string;
  body: string;
  signoff: SignOff;
  bg: PaperColorKey;
  date: string;
  photo?: string;
}

export const DEFAULT_LETTER: LetterData = {
  recipient: "",
  sender: "",
  body: "",
  signoff: "With love,",
  bg: "ivory",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
};

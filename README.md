# One Last Letter

A cinematic, letter-style farewell website celebrating years of university friendship. Built as a personal memory box — not a landing page.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- Deployable to **Vercel**

## Getting started

### Prerequisites

- Node.js 18+ and npm

### Install & run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Customization

### Friend & sender names

Create a `.env.local` file:

```env
NEXT_PUBLIC_FRIEND_NAME=Jordan
NEXT_PUBLIC_SENDER_NAME=Your Name
```

Or edit `lib/site-config.ts` directly.

### Photos & copy

1. Replace placeholder images in `public/memories/` with your own photos (keep the same filenames, or update paths in `lib/memories.ts`).
2. Edit story text, memories, timeline, and letter paragraphs in `lib/memories.ts`.

Current placeholders are SVG files. Swap them for `.jpg` or `.webp` and update the `image` paths in `lib/memories.ts`.

## Project structure

```
app/
  layout.tsx       # Fonts & global metadata
  page.tsx         # Main experience orchestration
  globals.css      # Base styles

components/
  EnvelopeIntro.tsx
  StoryBeginning.tsx
  MemorySlideshow.tsx
  Timeline.tsx
  ThankYouLetter.tsx
  FinalSection.tsx
  Guestbook.tsx
  motion/          # Reusable animation primitives

lib/
  site-config.ts   # Names & env config
  memories.ts      # All story content
  guestbook.ts     # localStorage helpers
  types.ts

public/memories/   # Photo placeholders
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add environment variables (optional):
   - `NEXT_PUBLIC_FRIEND_NAME`
   - `NEXT_PUBLIC_SENDER_NAME`
4. Deploy — no other configuration required.

## Guestbook

"Leave a Note" saves messages to **localStorage** in the visitor's browser. Notes are not synced to a server — they're a private, on-device keepsake.

## Accessibility

- Semantic landmarks and headings
- Keyboard support (Escape closes guestbook)
- Focus styles on interactive elements
- Alt text on all images
- Lazy-loaded images via `next/image`

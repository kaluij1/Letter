"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FRIEND_NAME } from "@/lib/site-config";

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpening: boolean;
}

/**
 * Full-screen envelope entrance.
 * The flap rotates open on CTA click; parent handles transition to story content.
 */
export default function EnvelopeIntro({ onOpen, isOpening }: EnvelopeIntroProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-cream px-6"
      aria-label="Letter introduction"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(110,88,73,0.06)_100%)]" />

      <AnimatePresence mode="wait">
        {!isOpening ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Envelope illustration */}
            <div
              className="relative mb-12 w-full max-w-md"
              style={{ perspective: "900px" }}
            >
              <svg
                viewBox="0 0 400 260"
                className="w-full drop-shadow-lg"
                role="img"
                aria-label="Sealed envelope"
              >
                <rect
                  x="20"
                  y="70"
                  width="360"
                  height="170"
                  rx="2"
                  fill="#E8DFD3"
                  stroke="#6E5849"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                <polygon
                  points="20,70 200,155 380,70"
                  fill="#DDD4C8"
                  stroke="#6E5849"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                />
                <line
                  x1="20"
                  y1="240"
                  x2="200"
                  y2="155"
                  stroke="#6E5849"
                  strokeOpacity="0.15"
                />
                <line
                  x1="380"
                  y1="240"
                  x2="200"
                  y2="155"
                  stroke="#6E5849"
                  strokeOpacity="0.15"
                />
                <circle cx="200" cy="155" r="28" fill="#6E5849" />
                <text
                  x="200"
                  y="162"
                  textAnchor="middle"
                  fill="#F8F3EC"
                  fontSize="18"
                >
                  ✦
                </text>
              </svg>
            </div>

            <div className="max-w-md text-center">
              <p className="font-handwritten text-3xl text-accent sm:text-4xl">
                To {FRIEND_NAME}
              </p>
              <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl">
                Thank you for these years.
              </h1>
              <p className="mt-4 font-body text-sm leading-relaxed text-ink/70 sm:text-base">
                A small story about friendship, written one memory at a time.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpen}
              className="mt-10 rounded-full border border-accent/30 bg-accent px-10 py-3.5 font-body text-sm font-medium tracking-wide text-cream transition hover:bg-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              aria-label="Open letter and begin the story"
            >
              Open Letter
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
            style={{ perspective: "900px" }}
          >
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 160 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "top center" }}
              className="mb-8 w-full max-w-md"
            >
              <div
                className="h-32 w-full"
                style={{
                  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                  background: "linear-gradient(180deg, #DDD4C8, #C4B5A3)",
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-handwritten text-2xl text-accent"
            >
              Opening…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

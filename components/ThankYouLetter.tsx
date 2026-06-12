"use client";

import { motion } from "framer-motion";
import { thankYouParagraphs } from "@/lib/memories";
import { FRIEND_NAME, SENDER_NAME } from "@/lib/site-config";

/**
 * Centered letter with progressive line-by-line reveal on scroll.
 * Paper texture applied via Tailwind background utility.
 */
export default function ThankYouLetter() {
  return (
    <section
      id="thank-you"
      className="bg-cream px-5 py-24 sm:px-8 md:py-32"
      aria-labelledby="thank-you-heading"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-sm bg-paper bg-cream px-8 py-12 shadow-[0_12px_48px_rgba(46,58,70,0.08)] ring-1 ring-accent/10 sm:px-12 sm:py-16"
        >
          <p className="text-center font-handwritten text-2xl text-accent">
            Dear {FRIEND_NAME},
          </p>
          <h2
            id="thank-you-heading"
            className="sr-only"
          >
            Thank you letter
          </h2>

          <div className="mt-8 space-y-5">
            {thankYouParagraphs.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-body leading-[1.95] text-ink/90 ${
                  index === 0
                    ? "text-lg font-medium text-ink md:text-xl"
                    : "text-base md:text-lg"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-right font-display text-2xl italic text-deep"
          >
            {SENDER_NAME}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

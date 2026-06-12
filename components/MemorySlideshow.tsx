"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { memories } from "@/lib/memories";

/**
 * Full-screen memory sections with alternating image/text layouts.
 * Each block uses scroll reveal + parallax for a cinematic feel.
 */
export default function MemorySlideshow() {
  return (
    <section aria-label="Memory slideshow" className="bg-cream">
      {memories.map((memory, index) => {
        const imageFirst = index % 2 === 0;

        return (
          <article
            key={memory.id}
            id={`memory-${memory.id}`}
            className="relative flex min-h-[100dvh] items-center px-5 py-20 sm:px-8 lg:px-16"
          >
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <FadeIn
                className={imageFirst ? "order-2 lg:order-1" : "order-2"}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[0_24px_64px_rgba(46,58,70,0.14)] sm:aspect-[3/4]">
                  <ParallaxImage
                    src={memory.image}
                    alt={memory.alt}
                    className="absolute inset-0 h-full"
                  />
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="pointer-events-none absolute inset-0 bg-cream/20"
                  />
                </div>
              </FadeIn>

              <FadeIn
                delay={0.12}
                className={imageFirst ? "order-1 lg:order-2" : "order-1"}
              >
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {memory.year}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium text-ink md:text-4xl">
                  {memory.title}
                </h3>
                <p className="mt-6 font-body text-base leading-[1.9] text-ink/80 md:text-lg">
                  {memory.shortStory}
                </p>
              </FadeIn>
            </div>
          </article>
        );
      })}
    </section>
  );
}

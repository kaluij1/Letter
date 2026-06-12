"use client";

import FadeIn from "@/components/motion/FadeIn";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { beginningChapter } from "@/lib/memories";

/** Chapter 1 — split layout with image and narrative. */
export default function StoryBeginning() {
  return (
    <section
      id="beginning"
      className="min-h-screen bg-cream px-5 py-20 sm:px-8 md:py-28 lg:px-16"
      aria-labelledby="beginning-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(46,58,70,0.12)]">
            <ParallaxImage
              src={beginningChapter.image}
              alt={beginningChapter.alt}
              priority
              className="absolute inset-0 h-full"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="order-1 lg:order-2">
          <p className="font-handwritten text-2xl text-accent">
            {beginningChapter.aside}
          </p>
          <h2
            id="beginning-heading"
            className="mt-3 font-display text-4xl font-medium text-ink md:text-5xl"
          >
            {beginningChapter.headline}
          </h2>
          <p className="mt-6 font-body text-base leading-[1.9] text-ink/85 md:text-lg">
            {beginningChapter.body}
          </p>
          <p className="mt-8 font-handwritten text-xl text-deep/80">
            We didn&apos;t know then that one conversation would become years of
            memories.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

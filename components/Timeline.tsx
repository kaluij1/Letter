"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { timelineYears } from "@/lib/memories";

/**
 * Horizontal scroll timeline — each year is a card with image + memory.
 * Uses CSS scroll-snap for smooth mobile swiping.
 */
export default function Timeline() {
  return (
    <section
      id="timeline"
      className="bg-deep py-20 text-cream sm:py-28"
      aria-labelledby="timeline-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          id="timeline-heading"
          className="font-display text-3xl font-medium md:text-4xl"
        >
          Five years, one friendship
        </h2>
        <p className="mt-3 max-w-xl font-body text-sm text-cream/70 md:text-base">
          Scroll through the chapters we lived — year by year.
        </p>
      </div>

      <div
        className="timeline-scroll mt-12 flex gap-6 overflow-x-auto px-5 pb-6 sm:px-8 md:gap-8"
        style={{ scrollSnapType: "x mandatory" }}
        role="list"
        aria-label="Friendship timeline by year"
      >
        {timelineYears.map((item, index) => (
          <motion.article
            key={item.year}
            role="listitem"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-[min(85vw,320px)] shrink-0 scroll-ml-5 sm:w-80"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="overflow-hidden rounded-sm bg-cream/5">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="320px"
                  className="object-cover opacity-90"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="font-handwritten text-2xl text-cream/90">
                  Year {item.year}
                </p>
                <h3 className="mt-1 font-display text-xl">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-cream/75">
                  {item.memory}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

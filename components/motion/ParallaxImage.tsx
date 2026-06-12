"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/** Image with subtle parallax + scale on scroll for cinematic memory sections. */
export default function ParallaxImage({
  src,
  alt,
  priority = false,
  className = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);
  const blurPx = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [4, 0, 0, 3]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-sm bg-accent/10 ${className}`}
    >
      <motion.div style={{ y, scale }} className="relative h-full w-full min-h-[240px]">
        <motion.div style={{ filter }} className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

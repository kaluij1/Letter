"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FinalSection from "@/components/FinalSection";
import Guestbook from "@/components/Guestbook";
import MemorySlideshow from "@/components/MemorySlideshow";
import StoryBeginning from "@/components/StoryBeginning";
import ThankYouLetter from "@/components/ThankYouLetter";
import Timeline from "@/components/Timeline";

export default function Home() {
  const [letterOpened, setLetterOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);

  const handleOpenLetter = useCallback(() => {
    setIsOpening(true);
    // Envelope animation completes, then reveal story
    window.setTimeout(() => {
      setLetterOpened(true);
      setIsOpening(false);
    }, 1200);
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLetterOpened(false);
    setIsOpening(false);
  }, []);

  return (
    <main>
      <AnimatePresence mode="wait">
        {!letterOpened ? (
          <EnvelopeIntro
            key="intro"
            onOpen={handleOpenLetter}
            isOpening={isOpening}
          />
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <StoryBeginning />
            <MemorySlideshow />
            <Timeline />
            <ThankYouLetter />
            <FinalSection
              onReplay={handleReplay}
              onLeaveNote={() => setGuestbookOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Guestbook
        isOpen={guestbookOpen}
        onClose={() => setGuestbookOpen(false)}
      />
    </main>
  );
}

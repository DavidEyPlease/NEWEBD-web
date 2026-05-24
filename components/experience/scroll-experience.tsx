"use client";

import { type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useScrollSlides } from "@/components/experience/use-scroll-slides";
import { SlideIndicator } from "@/components/experience/slide-indicator";
import { ScrollHint } from "@/components/experience/scroll-hint";

export type SlideProps = {
  isActive: boolean;
  direction: number;
  index: number;
  total: number;
  next: () => void;
  prev: () => void;
};

type Slide = {
  id: string;
  label: string;
  Component: ComponentType<SlideProps>;
};

type Props = {
  slides: Slide[];
};

export function ScrollExperience({ slides }: Props) {
  const total = slides.length;
  const { index, direction, goTo, next, prev } = useScrollSlides({ total });

  const Current = slides[index].Component;

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slides[index].id}
          custom={direction}
          initial={{ opacity: 0, y: direction > 0 ? 40 : -40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: direction > 0 ? -40 : 40, scale: 0.98 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Current
            isActive
            direction={direction}
            index={index}
            total={total}
            next={next}
            prev={prev}
          />
        </motion.div>
      </AnimatePresence>

      <SlideIndicator
        total={total}
        current={index}
        onGoTo={goTo}
        labels={slides.map((s) => s.label)}
      />

      {index < total - 1 && <ScrollHint />}
    </div>
  );
}

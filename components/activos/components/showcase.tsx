"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Plus,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { CanvasRevealEffect } from "./canvasRevealEffect";

interface ShowcaseItem {
  title: string;
  description: string;
  image?: string;
  renderContent?: React.ReactNode;
}

interface ShowcaseProps {
  content: ShowcaseItem[];
}

export const Showcase = ({ content }: ShowcaseProps) => {
  const [activeCard, setActiveCard] = useState(0);

  const nextCard = () =>
    setActiveCard((prev) => Math.min(content.length - 1, prev + 1));

  const prevCard = () =>
    setActiveCard((prev) => Math.max(0, prev - 1));

  return (
    <div className="relative w-full max-w-8xl mx-auto h-[400px] md:h-[600px] rounded-none md:rounded-[32px] bg-transparent md:bg-black ">
      <DesktopUI
        content={content}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        nextCard={nextCard}
        prevCard={prevCard}
      />

      <MobileUI
        content={content}
        activeCard={activeCard}
        nextCard={nextCard}
        prevCard={prevCard}
      />
    </div>
  );
};

/* ============================= */
/* DESKTOP VERSION */
/* ============================= */

export const DesktopUI = ({
  content,
  activeCard,
  setActiveCard,
  nextCard,
  prevCard,
}: any) => {
  const COLLAPSED_WIDTH = 320;
  const COLLAPSED_HEIGHT = 56;

  const EXPANDED_WIDTH = 380;
  const EXPANDED_HEIGHT = 156;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animating = useRef(false);

  const toggleItem = (index: number) => {
    if (animating.current) return;
    animating.current = true;

    const el = itemRefs.current[index];
    if (!el) return;

    const isExpanded = activeIndex === index;
    const hasItemAbove = index > 0;

    const header = el.querySelector(".header");
    const contentEl = el.querySelector(".expand-content");

    const tl = gsap.timeline({
      defaults: {
        duration: 0.55,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      onComplete: () => {
        animating.current = false;
      },
    });

    if (!isExpanded) {

      // cerrar anterior
      if (activeIndex !== null) {
        const prev = itemRefs.current[activeIndex];
        if (prev) {
          tl.to(prev, {
            width: COLLAPSED_WIDTH,
            height: COLLAPSED_HEIGHT,
          }, 0);

          tl.set(prev.querySelector(".header"), { display: "flex" }, 0.2);
          tl.set(prev.querySelector(".expand-content"), { display: "none" }, 0);
        }
      }

      setActiveIndex(index);
      setActiveCard(index);

      tl.set(header, { display: "none" });

      tl.set(contentEl, {
        display: "block",
        opacity: 1,
      });

      tl.fromTo(
        el,
        {
          transformOrigin: hasItemAbove ? "top left" : "bottom left",
          scale: 0.92,
        },
        {
          width: EXPANDED_WIDTH,
          height: EXPANDED_HEIGHT,
          scale: 1,
        },
        0
      );

    } else {

      tl.to(el, {
        width: COLLAPSED_WIDTH,
        height: COLLAPSED_HEIGHT,
      });

      tl.set(header, { display: "flex" });
      tl.set(contentEl, { display: "none" });

      setActiveIndex(null);
    }
  };

  return (
    <div className="hidden md:flex h-full pl-12 gap-0">
      {/* Sidebar */}
      <div className="relative z-20 xl:w-[35%] flex flex-col justify-center gap-2 left-0 ">

        {content.map((item: any, index: number) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el }}
              style={{
                width: isActive ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                height: isActive ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
              }}
              className={cn(
                "relative overflow-hidden rounded-[28px] left-4",
                "bg-[#1e1e20] text-white",
                "cursor-pointer"
              )}
              onClick={() => toggleItem(index)}
            >
              {/* Header */}
              {!isActive && (
                <div className="header flex items-center justify-between px-5 h-[56px]">
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-full border border-neutral-600">
                      <Plus size={16} strokeWidth={3} />
                    </div>

                    <span className="text-lg font-medium tracking-tight">
                      {item.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Expanded Content */}
              <div
                ref={(el) => { maskRefs.current[index] = el }}
                style={{
                  transform: isActive ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                }}
                className="expand-content absolute left-0 right-0 top-0"
              >
                <div className="px-6 pt-6 pb-6 text-sm text-white/80 flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-campana-secondary">
                    {item.title}
                  </span>
                  <span>
                    {item.description}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Vertical Controls */}
        <div className="absolute xl:left-[-30px] flex flex-col gap-2 pt-4">
          <button
            onClick={() => {
              if (activeIndex === null) {
                toggleItem(activeCard - 1 >= 0 ? activeCard - 1 : 0);
              } else {
                toggleItem(Math.max(0, activeIndex - 1));
              }
            }}
            className="p-2 bg-[#1e1e20] rounded-full text-neutral-500 hover:text-[#f1ba0a] transition-colors"
          >
            <ChevronUp size={20} />
          </button>

          <button
            onClick={() => {
              if (activeIndex === null) {
                toggleItem(activeCard + 1 < content.length ? activeCard + 1 : activeCard);
              } else {
                toggleItem(Math.min(content.length - 1, activeIndex + 1));
              }
            }}
            className="p-2 bg-[#1e1e20] rounded-full text-neutral-500 hover:text-[#f1ba0a] transition-colors"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <ContentDisplay content={content} activeCard={activeCard} />
    </div>
  );
};

/* ============================= */
/* MOBILE VERSION */
/* ============================= */

const MobileUI = ({
  content,
  activeCard,
  nextCard,
  prevCard,
}: any) => {
  const isFirst = activeCard === 0;
  const isLast = activeCard === content.length - 1;

  const easing = [0.25, 0.1, 0.25, 1] as const;
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (isLast) return;
    setDirection(1);
    nextCard();
  };

  const handlePrev = () => {
    if (isFirst) return;
    setDirection(-1);
    prevCard();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 36 : -36,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -36 : 36,
      opacity: 0,
      scale: 0.985,
    }),
  };

  return (
    <div className="md:hidden relative h-full w-screen ">

      {/* Background */}
      <ContentDisplay content={content} activeCard={activeCard} />

      {/* Bottom Glass Section */}
      <div className="absolute inset-x-0 z-40 flex justify-center px-2">

        <div className="relative w-full max-w-full flex items-end justify-center gap-8">

          {/* Left Arrow */}
          <AnimatePresence>
            {!isFirst && (
              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 0.7, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease: easing }}
                onClick={handlePrev}
                className="
                  absolute left-0 bottom-0
                  h-12 w-12
                  rounded-full
                  bg-white/10
                  backdrop-blur-2xl
                  border border-white/10
                  border-l-0
                  flex items-center justify-center
                  text-[#f1ba0a] z-50
                "
              >
                <ChevronLeft size={30} strokeWidth={1.5} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Glass Card */}
          <div className="relative w-full max-w-[72%]">

            <div className="relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeCard}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.55,
                    ease: easing,
                  }}
                  className="rounded-[20px]"
                >
                  <div className="w-full px-6 py-5 bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-[20px]">
                    <h3 className="text-[15px] font-medium text-campana-secondary md:text-white mb-1">
                      {content[activeCard].title}
                    </h3>

                    <p className="text-[13px] text-white/70 leading-[1.6]">
                      {content[activeCard].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right Arrow */}
          <AnimatePresence>
            {!isLast && (
              <motion.button
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 0.7, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.35, ease: easing }}
                onClick={handleNext}
                className="
                  absolute right-0 bottom-0
                  h-12 w-12
                  rounded-full
                  bg-white/10
                  backdrop-blur-2xl
                  border border-white/10
                  border-r-0
                  flex items-center justify-center
                  text-[#f1ba0a] z-50
                "
              >
                <ChevronRight size={30} strokeWidth={1.5} />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

/* ============================= */
/* SHARED CONTENT DISPLAY */
/* ============================= */

const ContentDisplay = ({
  content,
  activeCard,
}: {
  content: ShowcaseItem[];
  activeCard: number;
}) => {
  if (!content || content.length === 0) return null;
  const safeIndex = activeCard >= content.length ? 0 : activeCard;
  const current = content[safeIndex];
  if (!current) return null;
  return (
    <div className="relative w-full flex-1 rounded-2xl flex items-center justify-center">
      {current.renderContent ? (
        <div className="relative w-full h-[250px] md:absolute md:inset-0 md:h-full flex items-center justify-center ">
          {current.renderContent}
        </div>
      ) : (
        <img
          src={current.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt={current.title}
        />
      )}
      {!current.renderContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#030b14]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-[#030b14]/40" />
      )}
    </div>
  );
};
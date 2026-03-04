"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom"; // Importante para sobreponerse a todo
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false); // Para evitar errores de SSR
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePosition = (clientX: number, clientY: number) => {
    if (!contentRef.current) return { x: clientX + 12, y: clientY + 12 };

    const tooltipWidth = contentRef.current.offsetWidth || 350;
    const tooltipHeight = contentRef.current.offsetHeight || 100;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = clientX + 12;
    let y = clientY + 12;

    // Ajuste horizontal (Esquinero)
    if (x + tooltipWidth > viewportWidth) {
      x = clientX - tooltipWidth - 12;
    }
    // Ajuste vertical (Esquinero hacia abajo por defecto)
    if (y + tooltipHeight > viewportHeight) {
      y = clientY - tooltipHeight - 12;
    }

    return { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isVisible) {
      const newPos = calculatePosition(e.clientX, e.clientY);
      setPosition(newPos);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    setPosition(calculatePosition(e.clientX, e.clientY));
  };

  return (
    <>
      <div
        ref={containerRef}
        className={cn("relative inline-block", containerClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>

      {/* Renderizamos el Tooltip fuera del overflow-hidden usando Portals */}
      {mounted && createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed pointer-events-none z-[9999] w-max max-w-[450px] overflow-hidden rounded-xl border border-[#b8912e]/20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-2xl"
              style={{
                top: position.y,
                left: position.x,
              }}
            >
              <div
                ref={contentRef}
                className="p-4 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200"
              >
                <div className="flex flex-col gap-1">
                  {content}
                </div>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#b8912e]" />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
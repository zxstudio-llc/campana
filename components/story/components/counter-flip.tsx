"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterFlipProps {
    start?: number;
    end: number;
    duration?: number;
}

export const CounterFlip = ({ start = 1995, end, duration = 1500 }: CounterFlipProps) => {
    const [current, setCurrent] = useState(start);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: false });

    useEffect(() => {
        if (!inView) return;

        setCurrent(start);

        const steps = end - start;
        if (steps <= 0) return;

        const intervalTime = duration / steps;
        const interval = setInterval(() => {
            setCurrent((prev) => {
                if (prev >= end) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [inView, start, end, duration]);

    return (
        <motion.span
            ref={ref}
            className="relative inline-block w-auto font-black text-5xl md:text-8xl tracking-tighter"
        >
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={current}
                    initial={{ y: -50, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: 50, opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.3 }}
                    className={cn("inline-block")}
                >
                    {current}
                </motion.span>
            </AnimatePresence>
        </motion.span>
    );
};
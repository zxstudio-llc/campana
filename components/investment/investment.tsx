"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Investment } from "@/lib/wordpress.d";
import Image from "next/image";

interface InvestmentsSectionProps {
    photo?: {
        url?: string;
        alt?: string;
    };
    highlight?: string;
    title?: string;
    description?: string;
    investment: Investment[];
    cta?: string;
    cta_url?: string;
}

export default function InvestmentSection({
    photo,
    highlight,
    title,
    description,
    investment,
    cta,
    cta_url,
}: InvestmentsSectionProps) {
    if (!investment?.length) return null;

    const imageUrl =
        typeof photo?.url === "string" && photo.url.trim() !== ""
            ? photo.url
            : null;

    const [active, setActive] = useState(0);
    const isFirst = active === 0;
    const isLast = active === investment.length - 1;
    const [direction, setDirection] = useState(0);

    const next = () => {
        if (isLast) return;
        setDirection(1);
        setActive((prev) => prev + 1);
    };

    const prev = () => {
        if (isFirst) return;
        setDirection(-1);
        setActive((prev) => prev - 1);
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 60 : -60,
            opacity: 0,
            scale: 0.98,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -60 : 60,
            opacity: 0,
            scale: 0.98,
        }),
    };

    const easeApple: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.35,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 80,
            scale: 0.94,
            filter: "blur(10px)",
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: easeApple,
            },
        },
    };

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-campana-bg-hover -mt-2">

            {/* Imagen derecha desktop */}
            {imageUrl && (
                <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 z-0">
                    <Image
                        src={imageUrl}
                        alt={photo?.alt || title || "Investment image"}
                        fill
                        priority
                        className="object-contain object-right-bottom"
                    />
                </div>
            )}

            <div className="relative z-10 max-w-8xl mx-auto pt-16 md:pt-30">

                {/* HEADER */}
                <div className="flex flex-col items-center space-y-4 mb-10">
                    <span className="text-campana-secondary font-bold tracking-[0.1em] text-sm uppercase text-center">
                        {highlight}
                    </span>

                    <h2 className="text-campana-primary text-6xl md:text-[92px] font-black tracking-tight leading-[0.9] uppercase text-center">
                        {title}
                    </h2>

                    <p
                        className="text-campana-primary text-xl leading-6 px-6 md:px-32 text-center mt-4"
                        dangerouslySetInnerHTML={{ __html: description || "" }}
                    />

                    {cta && (
                        <Button
                            size="lg"
                            className="px-6 py-6 rounded-full bg-campana-primary hover:bg-campana-secondary text-white mt-4"
                            onClick={() => window.open(cta_url, "_blank")}
                        >
                            {cta}
                        </Button>
                    )}
                </div>

                {/* ======================= */}
                {/* DESKTOP GRID */}
                {/* ======================= */}
                <motion.div
                    className="hidden lg:grid grid-cols-3 gap-6 w-[68%] pl-20 mt-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                >
                    {investment.map((item, idx) => (
                        <motion.div key={item.id} variants={cardVariants}>
                            <CardApple index={idx}>
                                <CardContent item={item} />
                            </CardApple>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ======================= */}
                {/* MOBILE CAROUSEL */}
                {/* ======================= */}
                <div className="lg:hidden relative w-full flex justify-center items-center pb-[10px]">

                    <div className="relative flex items-center justify-center w-full max-w-[360px]">

                        {/* Left Arrow */}
                        <AnimatePresence>
                            {!isFirst && (
                                <motion.button
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={prev}
                                    className="
            absolute -left-6 top-1/2 -translate-y-1/2
            h-11 w-11
            rounded-full
            bg-campana-primary
            flex items-center justify-center
            text-campana-secondary z-50
          "
                                >
                                    <ChevronLeft size={26} strokeWidth={1.5} />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* CARD */}
                        <div className="flex justify-center items-center w-full">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={active}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="flex justify-center"
                                >
                                    <CardApple index={active}>
                                        <CardContent item={investment[active]} />
                                    </CardApple>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Arrow */}
                        <AnimatePresence>
                            {!isLast && (
                                <motion.button
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 12 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={next}
                                    className="
            absolute -right-6 top-1/2 -translate-y-1/2
            h-11 w-11
            rounded-full
            bg-campana-primary
            flex items-center justify-center
            text-campana-secondary z-50
          "
                                >
                                    <ChevronRight size={26} strokeWidth={1.5} />
                                </motion.button>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============================= */
/* CARD CONTENT */
/* ============================= */

const CardContent = ({ item }: { item: Investment }) => (
    <div className="h-full flex flex-col relative z-10">
        <div>
            <header className="mb-2 flex justify-between items-start">
                <span className="text-xs md:text-sm font-semibold text-campana-secondary uppercase opacity-60">
                    {item.acf.highlight}
                </span>
                <div className="h-3 w-3 rounded-full bg-campana-secondary" />
            </header>

            <h4 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-[1.1]">
                {item.acf.title}
            </h4>
        </div>

        <footer className="mt-auto">
            <div
                className="text-neutral-400 text-base leading-[1.2em] font-light"
                style={{
                    textAlign: "justify",
                    textAlignLast: "left",
                    textJustify: "inter-word"
                }}
                dangerouslySetInnerHTML={{ __html: item.acf.description }}
            />
        </footer>
    </div>
);

/* ============================= */
/* CARD APPLE */
/* ============================= */

const CardApple = ({ children, index }: { children: React.ReactNode; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <motion.div
            onMouseMove={(e) => {
                const { left, top } = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - left);
                mouseY.set(e.clientY - top);
            }}
            className="group relative w-[320px] md:w-full h-[300px] md:h-[350px] p-6 md:p-10 rounded-3xl md:rounded-[2rem] bg-neutral-900 border border-white/10 overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                    background: useMotionTemplate`
            radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(181,147,74,0.08), transparent 80%)
          `,
                }}
            />
            {children}
        </motion.div>
    );
};
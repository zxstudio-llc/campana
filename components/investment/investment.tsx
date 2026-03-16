"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Investment } from "@/lib/wordpress.d";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cohete from "./cohete";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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

    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const coheteRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current || !contentRef.current || !backdropRef.current || !imageContainerRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=650%",
                    scrub: 2,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                },
            });

            gsap.set(coheteRef.current, {
                y: 800,
                opacity: 0,
                scale: 0.8,
                filter: "blur(10px)"
            });

            gsap.set(imageContainerRef.current, {
                opacity: 0,
                y: 400
            });

            gsap.set(contentRef.current, {
                opacity: 0,
                y: 200,
                filter: "blur(20px)"
            });

            gsap.set(backdropRef.current, {
                opacity: 0
            });

            tl.to(coheteRef.current, {
                opacity: 1,
                y: 0,
                scale: 1.8,
                filter: "blur(0px)",
                duration: 2,
                ease: "power2.out"
            }, 0);

            tl.to(coheteRef.current, {
                y: -120,
                duration: 0.8,
                ease: "power1.inOut"
            }, 1.8);

            tl.to(coheteRef.current, {
                y: -2400,
                x: 80,
                rotation: 6,
                scale: 2.4,
                duration: 3.5,
                ease: "none"
            }, 2.6);

            tl.to(imageContainerRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            }, 2.6);

            tl.to(backdropRef.current, {
                opacity: 1,
                backdropFilter: "blur(12px)",
                duration: 1.2,
                ease: "power2.out"
            }, 3.2);

            tl.to({}, { duration: 2 });

            tl.to(contentRef.current, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 2,
                ease: "power2.out"
            });

        });

        mm.add("(max-width: 1023px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                },
            });

            gsap.set(coheteRef.current, { y: 400, opacity: 0, scale: 0.7 });
            gsap.set(contentRef.current, { opacity: 0, y: 50 });
            gsap.set(imageContainerRef.current, { opacity: 0, y: 200 });

            tl.to(coheteRef.current, {
                opacity: 1,
                y: 0,
                scale: 1.2,
                duration: 1.2,
                ease: "power2.out"
            }, 0);

            tl.to(coheteRef.current, {
                y: -800,
                opacity: 1,
                scale: 0.8,
                duration: 1.2,
                ease: "power2.out"
            }, 1.5);

            tl.to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out"
            }, 2.0);

            tl.to(imageContainerRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, 1.7);
        });

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            mm.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-campana-bg -mt-2">
            <div className="absolute inset-0 pointer-events-none z-30">
                <Cohete ref={coheteRef} />
            </div>

            {/* Backdrop Blur layer (Initially hidden) */}
            <div
                ref={backdropRef}
                className="absolute inset-0 z-10 bg-campana-bg-hover/10 pointer-events-none"
                style={{ opacity: 0 }}
            />

            {/* Fixed Background Image */}
            {imageUrl && (
                <div
                    ref={imageContainerRef}
                    className="absolute top-0 right-0 h-full w-full lg:w-1/2 z-0"
                    style={{ opacity: 0 }}
                >
                    <Image
                        src={imageUrl}
                        alt={photo?.alt || title || "Investment image"}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={85}
                        className="object-contain object-bottom-right"
                    />
                </div>
            )}

            <div
                ref={contentRef}
                className="relative z-20 max-w-8xl mx-auto pt-14 md:pt-30 min-h-[90vh] md:min-h-screen flex flex-col justify-start md:justify-center pb-10 md:py-20"
            >

                {/* HEADER */}
                <div className="flex flex-col items-center space-y-0.5 md:space-y-4 mb-6 md:mb-10 mt-10 md:mt-0">
                    <span className="text-campana-secondary text-xl md:text-lg font-bold text-center uppercase">
                        {highlight}
                    </span>

                    <h2 className="text-campana-primary text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase text-center">
                        {title}
                    </h2>

                    <p
                        className="text-campana-primary text-lg md:text-xl leading-4 md:leading-6 px-6 md:px-32 text-center mt-4"
                        style={{
                            textAlign: "justify",
                            textAlignLast: "left",
                            textJustify: "inter-word"
                        }}
                        dangerouslySetInnerHTML={{ __html: description || "" }}
                    />
                </div>

                {/* DESKTOP GRID */}
                <motion.div
                    className="hidden lg:grid grid-cols-3 gap-6 max-w-8xl mx-auto mt-10 px-20"
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

                {/* MOBILE CAROUSEL */}
                <div className="lg:hidden relative w-full flex justify-center items-center pb-0">

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

                <div className="flex items-center justify-center mt-0 md:mt-4">
                    {cta && (
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="bg-campana-secondary text-campana-primary flex items-center space-x-2 text-2xl md:text-2xl font-black px-12 py-4 rounded-full uppercase cursor-pointer"
                            onClick={() => window.open(cta_url, "_blank")}
                        >
                            {cta}
                        </HoverBorderGradient>
                    )}
                </div>
            </div>
        </section>
    );
}

/* CARD CONTENT */

const CardContent = ({ item }: { item: Investment }) => (
    <div className="h-full flex flex-col relative z-10">
        <div>
            <header className="mb-2 flex justify-between items-start">
                <span className="text-xs md:text-sm font-semibold text-campana-secondary uppercase opacity-60">
                    {item.acf.highlight}
                </span>
                <div className="h-3 w-3 rounded-full bg-campana-secondary" />
            </header>

            <h4 className="text-2xl md:text-3xl font-black text-white uppercase">
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

/* CARD APPLE */

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
            className="group relative w-[320px] md:w-full h-[300px] md:h-[350px] p-6 md:p-10 rounded-3xl md:rounded-4xl bg-neutral-900 border border-white/10 overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 group-hover:opacity-100 transition duration-500"
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
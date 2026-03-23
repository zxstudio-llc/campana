"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { HeadingWithCounter } from "./heading-with-counter";
import { Tooltip } from "@/components/ui/tooltip-card";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}
interface TimelineProps {
    highlight: string;
    heading: string;
    description?: string;
    subtitle?: string;
    data: TimelineEntry[];
}

export const Timeline = ({
    data,
    highlight,
    heading,
    description,
    subtitle,
}: TimelineProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const contentRevealRef = useRef<HTMLDivElement>(null); // New ref for immersion
    const progressLineRef = useRef<HTMLDivElement>(null);
    const progressLineMobileRef = useRef<HTMLDivElement>(null);
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    const subtitleRef = useRef<HTMLDivElement>(null);

    const subtitleInView = useInView(subtitleRef, {
        once: true,
        margin: "-40% 0px -10% 0px"
    });

    useLayoutEffect(() => {
        if (!sectionRef.current || !horizontalRef.current) return;

        const mm = gsap.matchMedia();

        // DESKTOP
        mm.add("(min-width: 1024px)", () => {

            const ctx = gsap.context(() => {

                const container = horizontalRef.current!;
                const section = sectionRef.current!;

                const totalWidth = container.scrollWidth;
                const viewportWidth = window.innerWidth;

                const scrollDistance = totalWidth - viewportWidth;

                const firstMarkerPos = 180;
                const lastMarkerPos = totalWidth - 180;

                // primer nodo entra desde la derecha
                const startX = viewportWidth * 0.75 - firstMarkerPos;

                // último nodo termina centrado
                const endX = viewportWidth / 2 - lastMarkerPos;

                gsap.set(subtitleRef.current, {
                    opacity: 0,
                    y: 40,
                    filter: "blur(8px)"
                });


                gsap.set(container, { x: startX });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${scrollDistance + viewportWidth * 1.2}`,
                        scrub: true, // More snappy
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // ETAPA 1: REVEAL (Se ejecuta una vez bloqueado arriba)
                tl.fromTo(contentRevealRef.current,
                    {
                        opacity: 0,
                        scale: 0.98,
                        filter: "blur(4px)"
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1.5,
                        ease: "power2.out"
                    }
                );

                // ETAPA 2: ESTABILIDAD (Se queda fijo un momento antes de mover)
                tl.to({}, { duration: 1 });

                // ETAPA 3: MOVIMIENTO HORIZONTAL
                tl.to(container, {
                    x: endX,
                    duration: 4,
                    ease: "none",
                }, "+=0.2");

                // línea progreso
                if (progressLineRef.current) {
                    tl.fromTo(
                        progressLineRef.current,
                        { width: "0%" },
                        {
                            width: "100%",
                            ease: "none",
                            duration: 4
                        },
                        "<" // Sincronizado con el movimiento horizontal
                    );
                }

                // SUBTITLE REVEAL (PHASE 2 DE PIN)
                tl.to(subtitleRef.current, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.out"
                }, ">+=0.2");

                // MANTENER UN POCO MÁS ANTES DE DESPINAR
                tl.to({}, { duration: 0.8 });

                // FADE OUT ANTES DE DESPINAR
                tl.to(subtitleRef.current, {
                    opacity: 0,
                    filter: "blur(8px)",
                    duration: 0.6,
                    ease: "power2.in"
                });

            }, sectionRef);

            ScrollTrigger.refresh();

            return () => ctx.revert();
        });

        // TABLET / MOBILE
        mm.add("(max-width: 1023px)", () => {

            const container = mobileContainerRef.current;
            const progressLine = progressLineMobileRef.current;

            if (!container || !progressLine) return;

            const ctx = gsap.context(() => {

                // línea vertical animada
                gsap.fromTo(
                    progressLine,
                    { height: "0%" },
                    {
                        height: "100%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: true,
                        },
                    }
                );

                // Subtitle Mobile Reveal
                if (subtitleRef.current) {
                    gsap.fromTo(subtitleRef.current,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: subtitleRef.current,
                                start: "top 90%",
                                end: "bottom 10%",
                                toggleActions: "play reverse play reverse"
                            }
                        }
                    );
                }

                // animación de items
                gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
                    gsap.from(item, {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    });
                });

            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();

    }, [data]);

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen bg-campana-bg relative flex flex-col items-center justify-center overflow-hidden z-60"
        >
            <div ref={contentRevealRef} className="w-full">
                <div className="absolute inset-0 top-0 lg:-left-24 lg:right-auto lg:h-screen lg:w-auto z-0 lg:z-50 pointer-events-none overflow-hidden">
                    <Image
                        src="/assets/pabloStory.png"
                        alt="Timeline"
                        width={1920 * 3}
                        height={1080 * 3}
                        className="w-auto h-screen scale-[1.4] object-cover object-top-left opacity-30 lg:opacity-100"
                    />
                </div>
                <div className="w-full md:w-3/4 mx-auto px-6 text-center flex flex-col items-center justify-center gap-8 pb-6">
                    {highlight && (
                        <span
                            className="text-campana-primary text-xl font-sans font-normal tracking-tighter uppercase mb-6 flex items-center justify-center gap-2 lining-nums"
                        >
                            {highlight}
                        </span>
                    )}

                    {heading && (

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-campana-primary text-4xl md:text-5xl lg:text-5xl font-sans font-normal mb-6 text-center leading-[0.9] tracking-tighter lining-nums w-4xl mx-auto"
                        >
                            {(() => {
                                const words = heading.split(" ");
                                const lastWord = words.pop();
                                return (
                                    <>
                                        {words.join(" ")}{" "}
                                        <span className="font-ivy-presto italic  transition-all">
                                            {lastWord}
                                        </span>
                                    </>
                                );
                            })()}
                        </motion.h2>
                    )}

                    {description && (
                        <p
                            className="text-[#001D3D] text-base md:text-lg w-full md:w-2xl mx-auto tracking-tight leading-5 font-sans font-normal"
                            style={{
                                textAlign: "justify",
                                textAlignLast: "center",
                                textJustify: "inter-word"
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* MOBILE VERSION (Original Vertical Line) */}
                <div
                    ref={mobileContainerRef}
                    className="lg:hidden relative max-w-7xl mx-auto px-6 pb-20 mobile-timeline-container"
                >
                    {/* Línea de fondo */}
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-neutral-100" />

                    {/* Línea progreso animada */}
                    <div
                        ref={progressLineMobileRef}
                        className="absolute left-8 top-0 w-[2px] bg-[#b8912e] z-10 origin-top"
                    />

                    <div className="relative z-20">
                        {data.map((item) => (
                            <div
                                key={item.title}
                                className="timeline-item flex pt-12 relative"
                            >
                                <div className="w-4 flex justify-center mr-6">
                                    <div className="h-4 w-4 rounded-full bg-white border-2 border-[#b8912e] shadow-sm" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-[#b8912e] font-bold tracking-[0.2em] text-sm uppercase mb-2">
                                        {item.title}
                                    </h3>

                                    <div className="text-[#001D3D] text-lg leading-relaxed font-medium"
                                        style={{
                                            textAlign: "justify",
                                            textJustify: "inter-word"
                                        }}
                                    >
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DESKTOP VERSION */}
                <div className="hidden lg:block relative">
                    <div
                        className="absolute inset-0 left-0 right-0 h-[2px]
                    bg-linear-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    />
                    <div
                        ref={progressLineRef}
                        className="absolute h-[2px] 
                    bg-linear-to-r from-[#b8912e] via-[#e3c16f] to-transparent"
                        style={{
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "0%",
                        }}
                    />

                    <div className="overflow-hidden">
                        <div
                            ref={horizontalRef}
                            className="flex gap-10 px-20 items-center h-[40vh] -mt-6"
                        >
                            {data.map((item) => (
                                <div
                                    key={item.title}
                                    className="min-w-[200px] flex-shrink-0 flex flex-col items-center justify-center relative"
                                >

                                    <span className="text-xl font-ivy-presto italic lining-nums text-neutral-800 transition-colors duration-500 select-none">
                                        {item.title}
                                    </span>
                                    <Tooltip
                                        containerClassName="cursor-pointer"
                                        content={
                                            <div key={`${item.title}-mobile-content`} className="max-w-md">
                                                {item.content}
                                            </div>
                                        }
                                    >
                                        {/* Círculo idéntico a Aceternity con toque Dorado */}
                                        <div className="group relative flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-full bg-[#b8912e] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                                            <div className="h-10 w-10 rounded-full bg-slate-500 flex items-center justify-center shadow-sm relative z-20 transition-transform duration-300 group-hover:scale-110">
                                                <div className="h-4 w-4 rounded-full bg-[#001D3D] p-2 group-hover:bg-[#b8912e] transition-colors duration-300" />
                                            </div>
                                        </div>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {subtitle && (
                <div
                    ref={subtitleRef}
                    className="mt-12 opacity-0 pointer-events-none w-full md:w-4xl lg:ml-auto mx-auto text-center"
                >
                    <span className="text-campana-primary text-2xl md:text-3xl font-sans font-normal mb-6 text-center leading-6 tracking-tighter lining-nums">
                        {subtitle.split(" ").map((word, index, arr) => {
                            const isLast = index === arr.length - 1;
                            const isNumber = /^\d+$/.test(word.replace(/[,.]/g, ""));
                            if (isLast || isNumber) {
                                return (
                                    <span key={index} className="font-ivy-presto italic">
                                        {word}{" "}
                                    </span>
                                );
                            }
                            return <span key={index}>{word} </span>;
                        })}
                    </span>
                </div>
            )}
        </section>
    );
};
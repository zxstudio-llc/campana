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
    const contentRevealRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const progressLineMobileRef = useRef<HTMLDivElement>(null);
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const timelineMobileRef = useRef<HTMLDivElement>(null);
    const timelineDesktopRef = useRef<HTMLDivElement>(null);
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    const subtitleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("all", () => {
            const ctx = gsap.context(() => {
                const container = horizontalRef.current!;
                const section = sectionRef.current!;
                const totalWidth = container.scrollWidth;
                const viewportWidth = window.innerWidth;
                const scrollDistance = totalWidth - viewportWidth;

                const firstMarkerPos = 180;
                const lastMarkerPos = totalWidth - 180;

                // Tu lógica original de posiciones
                const startX = viewportWidth * 0.75 - firstMarkerPos;
                const endX = viewportWidth / 2 - lastMarkerPos;

                // 1. ESTADOS INICIALES
                gsap.set([timelineMobileRef.current, timelineDesktopRef.current], {
                    opacity: 0,
                    y: 40,
                });
                gsap.set(container, { x: startX });
                gsap.set(subtitleRef.current, { opacity: 0, y: 40 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=750%",
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // PHASE 1: Pausa inicial (Inmersión - Usuario ve el heading centrado)
                tl.to({}, { duration: 1.5 });

                // PHASE 2: Heading sube y el Timeline aparece (Reveal)
                tl.to(contentRevealRef.current, {
                    y: window.innerWidth >= 1024 ? "-65%" : "-95%",
                    duration: 1,
                    ease: "power2.inOut"
                });

                tl.to([timelineMobileRef.current, timelineDesktopRef.current], {
                    opacity: 1,
                    y: window.innerWidth >= 1024 ? "-65%" : "-10%",
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                }, "<");

                // PHASE 3: Movimiento del Timeline (Desktop o Mobile)
                if (window.innerWidth >= 1024 && horizontalRef.current) {
                    const container = horizontalRef.current;
                    const scrollDistance = container.scrollWidth - window.innerWidth + 400;

                    tl.to(container, {
                        x: -scrollDistance,
                        duration: 4,
                        ease: "none"
                    });

                    if (progressLineRef.current) {
                        tl.to(progressLineRef.current, {
                            width: "100%",
                            duration: 4,
                            ease: "none"
                        }, "<");
                    }
                } else if (mobileContainerRef.current) {
                    const mContainer = mobileContainerRef.current;
                    const mScrollHeight = mContainer.scrollHeight - (window.innerHeight * 0.4);

                    tl.to(mContainer, {
                        y: -mScrollHeight,
                        duration: 4,
                        ease: "none"
                    });

                    if (progressLineMobileRef.current) {
                        tl.fromTo(progressLineMobileRef.current,
                            { height: "0%" },
                            {
                                height: "100%",
                                ease: "none",
                                duration: 4
                            },
                            "<"
                        );
                    }
                }

                tl.to(
                    [contentRevealRef.current, timelineMobileRef.current, timelineDesktopRef.current],
                    {
                        opacity: 0,
                        filter: "blur(10px)",
                        duration: 1,
                        ease: "power2.inOut",
                        immediateRender: false
                    },
                    ">+=0.2"
                );

                tl.to(subtitleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5");

                tl.to({}, { duration: 1.5 });

            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();

    }, [data]);

    return (
        <section
            ref={sectionRef}
            className="w-full lg:h-screen h-[100dvh] bg-campana-bg relative flex flex-col items-center justify-center overflow-hidden z-60"
        >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 top-0 -left-20 lg:-left-24 lg:right-auto h-[100dvh] lg:h-screen lg:w-auto z-0 lg:z-50 pointer-events-none overflow-hidden">
                <Image
                    src="/assets/pabloStory.png"
                    alt="Timeline"
                    width={1920}
                    height={1080}
                    className="w-auto lg:h-screen h-[100dvh] scale-[1] object-cover object-top-left opacity-30 lg:opacity-100"
                />
            </div>

            {/* Contenido centrado */}
            <div
                ref={contentRevealRef}
                className="absolute left-0 right-0 z-20"
                style={{ top: "50%", transform: "translateY(-50%)" }}
            >
                <div className="w-full md:w-3/4 mx-auto px-6 text-center flex flex-col items-end justify-end gap-4 md:gap-8 pb-6 pt-10 lg:pt-0">
                    {highlight && (
                        <span className="text-campana-primary font-inter font-bold uppercase block mb-4 text-sm md:text-xl font-sans tracking-tighter items-center justify-center gap-2 lining-nums">
                            {highlight}
                        </span>
                    )}

                    {heading && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-campana-primary text-[2.5rem] lg:text-7xl font-sans font-normal leading-[0.9] tracking-tighter mb-10 text-right lining-nums"
                        >
                            {(() => {
                                const parts = heading.split(",");
                                if (parts.length === 1) return heading;
                                return (
                                    <>
                                        {parts[0]},
                                        <span className="block lg:inline lg:ml-2 font-ivy-presto italic transition-all">
                                            {parts.slice(1).join(",").trim()}
                                        </span>
                                    </>
                                );
                            })()}
                        </motion.h2>
                    )}
                </div>
            </div>

            {/* MOBILE TIMELINE */}
            <div
                ref={timelineMobileRef}
                className="lg:hidden absolute bottom-0 left-0 right-0 z-20 h-[60vh] overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)'
                }}
            >
                <div
                    ref={mobileContainerRef}
                    className="relative max-w-7xl mx-auto px-6 mobile-timeline-container"
                >
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-neutral-100" />
                    <div
                        ref={progressLineMobileRef}
                        className="absolute left-8 top-0 w-[2px] bg-[#b8912e] z-10 origin-top"
                    />

                    <div className="relative z-20">
                        {data.map((item) => (
                            <div key={item.title} className="timeline-item flex pt-12 relative">
                                <div className="w-4 flex justify-center mr-6">
                                    <div className="h-4 w-4 rounded-full bg-white border-2 border-[#b8912e] shadow-sm" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[#001D3D] font-ivy-presto font-bold tracking-[0.2em] text-md uppercase mb-2 leading-4">
                                        {item.title}
                                    </span>
                                    <div className="text-[#001D3D] text-lg leading-relaxed font-medium" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* DESKTOP TIMELINE */}
            <div
                ref={timelineDesktopRef}
                className="hidden lg:block absolute bottom-0 left-0 right-0 z-20"
            >
                <div className="absolute inset-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-campana-secondary-active to-transparent" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <div ref={progressLineRef} className="absolute h-[2px] bg-linear-to-r from-campana-secondary via-campana-secondary to-transparent" style={{ top: "50%", transform: "translateY(-50%)", width: "0%" }} />
                <div className="overflow-hidden">
                    <div ref={horizontalRef} className="flex gap-10 px-20 items-center h-[40vh] -mt-6">
                        {data.map((item) => (
                            <div key={item.title} className="min-w-[200px] shrink-0 flex flex-col items-center justify-center relative">
                                <span className="text-xl font-ivy-presto italic lining-nums text-neutral-800 transition-colors duration-500 select-none">{item.title}</span>
                                <Tooltip containerClassName="cursor-pointer" content={<div key={`${item.title}-mobile-content`} className="max-w-md">{item.content}</div>}>
                                    <div className="group relative flex items-center justify-center">
                                        <div className="absolute inset-0 rounded-full bg-campana-secondary opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                                        <div className="h-10 w-10 rounded-full bg-campana-secondary-active flex items-center justify-center shadow-sm relative z-20 transition-transform duration-300 group-hover:scale-110">
                                            <div className="h-4 w-4 rounded-full bg-campana-secondary p-2 group-hover:bg-campana-secondary transition-colors duration-300" />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SUBTITLE */}
            {subtitle && (
                <div
                    ref={subtitleRef}
                    className="opacity-0 pointer-events-none w-full md:w-[85%] lg:w-[60%] mx-auto absolute bottom-20 left-0 right-0 z-50 lg:static mt-2 lg:mt-12 lg:ml-auto lg:mr-50 px-6 md:px-0 text-right"
                >
                    <h3 className="text-campana-primary text-[2.2rem] lg:text-5xl font-sans font-normal leading-[0.95] lg:leading-[1.1] tracking-tighter text-right lining-nums ml-auto lg:max-w-[1100px]">
                        {subtitle.split(" ").map((word, i) => {
                            // 1. Detectamos si tiene números
                            const hasNumber = /\d/.test(word);
                            // 2. Detectamos si la palabra CONTIENE la coma (ej: "excelencia,")
                            const hasComma = word.includes(",");
                            // 3. Detectamos si la palabra está DESPUÉS de la coma 
                            // Buscamos si en el array original alguna palabra previa tenía coma
                            const wordsArray = subtitle.split(" ");
                            const indexFirstComma = wordsArray.findIndex(w => w.includes(","));
                            const isAfterComma = indexFirstComma !== -1 && i > indexFirstComma;

                            const shouldBeIvy = hasNumber || hasComma || isAfterComma;

                            return (
                                <span key={i} className={shouldBeIvy ? "font-ivy-presto italic" : ""}>
                                    {word}{" "}
                                </span>
                            );
                        })}
                    </h3>
                </div>
            )}
        </section>
    );
};
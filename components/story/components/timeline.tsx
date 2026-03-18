"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
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
    heading: string;
    description?: string;
    subtitle?: string;
    data: TimelineEntry[];
}

export const Timeline = ({
    data,
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
    const [showSubtitle, setShowSubtitle] = useState(false);

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

                gsap.set(contentRevealRef.current, {
                    opacity: 0,
                    scale: 1.04,
                    filter: "blur(6px)"
                });

                gsap.set(container, { x: startX });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${scrollDistance + viewportWidth * 0.5}`,
                        scrub: 1.1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // reveal rápido
                tl.to(contentRevealRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.25,
                    ease: "power2.out"
                }, 0);

                // movimiento horizontal
                tl.to(container, {
                    x: endX,
                    duration: 4,
                    ease: "none",
                }, 0.05);

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
                        0.2
                    );
                }

                ScrollTrigger.create({
                    trigger: section,
                    start: "80% center",
                    once: true,
                    onEnter: () => setShowSubtitle(true),
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
            className="w-full min-h-screen bg-campana-bg relative flex flex-col items-center justify-center overflow-hidden z-60"
        >
            <div ref={contentRevealRef} className="w-full">
                <div className="w-full mx-auto px-6 text-center">
                    {heading && (
                        <h2
                            className="text-campana-primary text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 flex items-center justify-center gap-2 lining-nums"
                        >
                            {heading}
                        </h2>
                    )}

                    {description && (
                        <p
                            className="text-[#001D3D] text-base md:text-xl w-full mx-auto px-20"
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

                                    <h3 className="text-xl font-medium text-neutral-800  transition-colors duration-500 hover:text-[#b8912e]/20 select-none">
                                        {item.title}
                                    </h3>
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
                <motion.div
                    className="mt-4 text-center"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={
                        showSubtitle
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0 }
                    }
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    <h2 className="text-[#001D3D] text-3xl md:text-5xl font-black tracking-tighter uppercase lining-nums">
                        {subtitle}
                    </h2>
                </motion.div>
            )}
        </section>
    );
};
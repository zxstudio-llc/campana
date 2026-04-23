"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    const subtitleRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 1024px)",
                isMobile: "(max-width: 1023px)",
            },
            (context) => {
                const { isDesktop } = context.conditions!;

                const ctx = gsap.context(() => {
                    const section = sectionRef.current!;
                    const container = horizontalRef.current!;

                    let scrollDistance = 0;

                    const calculateScroll = () => {
                        if (!container) return 0;
                        return container.scrollWidth - window.innerWidth + 400;
                    };

                    gsap.set(
                        [
                            contentRevealRef.current,
                            subtitleRef.current,
                        ],
                        { clearProps: "all" }
                    );

                    const getStartX = () => {
                        if (!container) return 0;
                        const totalWidth = container.scrollWidth;
                        const vw = window.innerWidth;
                        const firstMarkerPos = 180;
                        return vw * 0.75 - firstMarkerPos;
                    };

                    const activeTimeline = isDesktop
                        ? timelineDesktopRef.current
                        : timelineMobileRef.current;

                    gsap.set(activeTimeline, {
                        autoAlpha: 0,
                        y: 40,
                        pointerEvents: "none",
                    });

                    if (isDesktop && container) {
                        gsap.set(container, { x: getStartX() });
                    }

                    gsap.set(contentRevealRef.current, {
                        autoAlpha: 0,
                        scale: 1.1,
                        filter: "blur(10px)",
                    });
                    gsap.set(subtitleRef.current, { autoAlpha: 0, y: 40 });

                    scrollDistance = calculateScroll();

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "+=800%",
                            scrub: 1.5,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                            onRefresh: () => {
                                if (isDesktop && container) {
                                    gsap.set(container, { x: getStartX() });
                                }
                            },
                        },
                    });

                    tl.to(contentRevealRef.current, {
                        autoAlpha: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1,
                        ease: "none",
                    });

                    tl.to(contentRevealRef.current, {
                        y: () => (window.innerWidth >= 1024 ? "-65%" : "-95%"),
                        duration: 2,
                        ease: "power2.inOut",
                    });

                    tl.to(
                        activeTimeline,
                        {
                            autoAlpha: 1,
                            y: () => (window.innerWidth >= 1024 ? "-55%" : "-10%"),
                            duration: 2,
                            ease: "power2.out",
                            pointerEvents: "auto",
                        },
                        "<"
                    );

                    tl.to({}, { duration: 1.5 });

                    if (isDesktop && container) {
                        tl.to(container, {
                            x: -scrollDistance,
                            duration: 8,
                            ease: "none",
                        });

                        if (progressLineRef.current) {
                            tl.to(
                                progressLineRef.current,
                                {
                                    width: "100%",
                                    duration: 8,
                                    ease: "none",
                                },
                                "<"
                            );
                        }
                    } else if (mobileContainerRef.current) {
                        const mContainer = mobileContainerRef.current;

                        tl.to(mContainer, {
                            y: () => -(mContainer.scrollHeight - window.innerHeight * 0.4),
                            duration: 8,
                            ease: "none",
                        });

                        if (progressLineMobileRef.current) {
                            tl.fromTo(
                                progressLineMobileRef.current,
                                { height: "0%" },
                                {
                                    height: "100%",
                                    ease: "none",
                                    duration: 8,
                                },
                                "<"
                            );
                        }
                    }

                    tl.to({}, { duration: 1 });

                    tl.to(
                        [contentRevealRef.current, activeTimeline],
                        {
                            autoAlpha: 0,
                            filter: "blur(10px)",
                            pointerEvents: "none",
                            duration: 2,
                            ease: "power2.inOut",
                            immediateRender: false,
                        },
                        ">+=0.2"
                    );

                    tl.to(
                        subtitleRef.current,
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 2,
                            ease: "power2.out",
                        },
                        "-=1"
                    );

                    tl.to({}, { duration: 1.5 });
                }, sectionRef);

                return () => ctx.revert();
            }
        );

        return () => mm.revert();
    }, [data]);

    return (
        <section
            ref={sectionRef}
            className="w-full lg:h-screen h-[100dvh] bg-campana-bg relative flex flex-col items-center justify-center overflow-hidden z-60"
        >
            {/* Background image */}
            <div className="absolute inset-0 top-10 -left-20 lg:-left-14 lg:right-auto h-[100dvh] lg:h-screen lg:w-auto z-0 lg:z-50 pointer-events-none overflow-hidden">
                <Image
                    src="/assets/pabloStory.png"
                    alt="Timeline"
                    width={1920}
                    height={1080}
                    className="w-auto lg:h-screen h-[100dvh] scale-[1.3] object-cover object-top-left opacity-30 lg:opacity-100"
                />
            </div>

            {/* Centered heading content */}
            <div
                ref={contentRevealRef}
                className="absolute left-0 right-0 z-20"
                style={{ top: "50%", transform: "translateY(-50%)" }}
            >
                <div className="w-full md:w-3/4 mx-auto px-6 text-center flex flex-col items-end justify-end gap-2 md:gap-8 pb-6 pt-20 lg:pt-0">
                    {highlight && (
                        <span className="text-campana-primary font-inter font-bold uppercase block mb-2 md:mb-4 text-sm md:text-xl font-sans tracking-tighter items-center justify-center gap-2 lining-nums">
                            {highlight}
                        </span>
                    )}
                    {heading && (
                        <h2 className="text-campana-primary text-[1.9rem] lg:text-7xl font-sans font-normal leading-[0.9] tracking-tighter mb-12 text-right lining-nums md:max-w-4xl">
                            {(() => {
                                const parts = heading.split(",");
                                if (parts.length === 1) return heading;
                                const firstPartWords = parts[0].trim().split(" ");
                                const lastWordBeforeComma = firstPartWords.pop();
                                const remainingFirstPart = firstPartWords.join(" ");
                                return (
                                    <>
                                        {remainingFirstPart}
                                        <br />
                                        <span className="block lg:inline lg:ml-2 font-ivy-presto italic transition-all">
                                            {lastWordBeforeComma}, {parts.slice(1).join(",").trim()}
                                        </span>
                                    </>
                                );
                            })()}
                        </h2>
                    )}
                </div>
            </div>

            {/* MOBILE TIMELINE */}
            <div
                ref={timelineMobileRef}
                className="lg:hidden absolute bottom-0 left-0 right-0 z-20 h-[60vh] overflow-hidden opacity-0 translate-y-10"
                style={{
                    pointerEvents: "none",
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
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
                                    <div
                                        className="text-[#001D3D] text-lg leading-relaxed font-medium"
                                        style={{ textAlign: "justify", textJustify: "inter-word" }}
                                    >
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
                className="hidden lg:block absolute bottom-0 right-0 z-20 w-9/10 mx-auto"
            >
                <div
                    className="absolute inset-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-campana-secondary-active to-transparent"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                />
                <div
                    ref={progressLineRef}
                    className="absolute h-[2px] bg-linear-to-r from-campana-secondary via-campana-secondary to-transparent"
                    style={{ top: "50%", transform: "translateY(-50%)", width: "0%" }}
                />
                <div className="overflow-hidden">
                    <div
                        ref={horizontalRef}
                        className="flex gap-10 px-20 items-center h-[40vh] -mt-6"
                    >
                        {data.map((item) => (
                            <div
                                key={item.title}
                                className="min-w-[200px] shrink-0 flex flex-col items-center justify-center relative"
                            >
                                <span className="text-xl font-ivy-presto italic lining-nums text-neutral-800 transition-colors duration-500 select-none">
                                    {item.title}
                                </span>
                                <Tooltip
                                    containerClassName="cursor-pointer"
                                    content={
                                        <div
                                            key={`${item.title}-mobile-content`}
                                            className="max-w-md"
                                        >
                                            {item.content}
                                        </div>
                                    }
                                >
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
                    className="pointer-events-none w-full md:w-[85%] lg:w-[60%] mx-auto absolute bottom-20 left-0 right-0 z-50 lg:static mt-2 lg:mt-12 lg:ml-auto lg:mr-50 px-6 md:px-0 text-right"
                >
                    <h3 className="text-campana-primary text-[2.5rem] lg:text-5xl font-sans font-normal leading-[0.95] lg:leading-[1.1] tracking-tighter text-right lining-nums ml-auto lg:max-w-[1100px]">
                        {subtitle.split(" ").map((word, i) => {
                            const hasNumber = /\d/.test(word);
                            const hasComma = word.includes(",");
                            const wordsArray = subtitle.split(" ");
                            const indexFirstComma = wordsArray.findIndex((w) =>
                                w.includes(",")
                            );
                            const isAfterComma =
                                indexFirstComma !== -1 && i > indexFirstComma;
                            const shouldBeIvy = hasNumber || hasComma || isAfterComma;
                            return (
                                <span
                                    key={i}
                                    className={shouldBeIvy ? "font-ivy-presto italic" : ""}
                                >
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
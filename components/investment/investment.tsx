"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useInView } from "framer-motion";
import { Investment } from "@/lib/wordpress.d";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface InvestmentsSectionProps {
    id?: string;
    main?: string;
    secondary?: string;
    highlight?: string;
    title?: string;
    description?: string;
    investment: Investment[];
    cta?: string;
    cta_url?: string;
    video?: string;
    video_mobile?: string;
}

export default function InvestmentSection({
    id,
    main,
    secondary,
    highlight,
    title,
    description,
    investment,
    cta,
    cta_url,
    video,
    video_mobile
}: InvestmentsSectionProps) {
    if (!investment?.length) return null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // El contenedor que crecerá
    const ctaRef = useRef<HTMLDivElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const extraRef = useRef<HTMLDivElement>(null);
    const headingRevealRef = useRef<HTMLDivElement>(null);
    const videoBlockRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const selectedPlaybackId = isMobile ? video_mobile || video : video || video_mobile;

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("all", () => {
            const ctx = gsap.context(() => {
                const mainTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        anticipatePin: 1,
                        start: "top top",
                        end: "+=700%",
                        scrub: 1.2,
                    }
                });

                // INITIAL STATES
                gsap.set(extraRef.current, { opacity: 0, scale: 1.1, filter: "blur(10px)" });
                gsap.set(mainContentRef.current, { opacity: 0 });
                gsap.set(ctaRef.current, { opacity: 0, y: 20 });

                gsap.set(containerRef.current, {
                    height: 0,
                    opacity: 1,
                    overflow: "hidden",
                    scale: 0.9
                });

                // ETAPA 1: REVEAL INTRO
                mainTl
                    .to(extraRef.current, {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1.5,
                        ease: "power2.inOut"
                    })
                    .to({}, { duration: 1 })
                    .to(extraRef.current, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    });

                mainTl.to(mainContentRef.current, {
                    opacity: 1,
                    duration: 1,
                });

                // AJUSTE AQUÍ: El texto sube un poco más para dar aire (-400px en lugar de -350px)
                mainTl.to(headingRevealRef.current, {
                    y: isMobile ? "-180px" : "-350px",
                    duration: 1.5,
                    ease: "power2.inOut"
                });

                // El video crece conservando su nueva posición más baja
                mainTl.to(containerRef.current, {
                    y: isMobile ? "-180px" : "100px",
                    height: isMobile ? "540px" : "540px",
                    duration: 1.5,
                    ease: "power2.inOut",
                }, "<");

                mainTl.to(ctaRef.current, {
                    opacity: 1,
                    y: isMobile ? "-180px" : "100px",
                    pointerEvents: "auto",
                    duration: 0.8,
                }, ">-=0.3");

                mainTl.to({}, { duration: 1.5 });

            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, [isMobile, selectedPlaybackId]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-campana-bg-about"
        >
            {/* PABLO IMAGE */}
            <div className="absolute inset-0 top-0 lg:right-0 lg:left-auto lg:h-screen lg:w-auto z-0 lg:z-50 pointer-events-none overflow-hidden">
                <Image
                    src="/assets/pabloInvestment.png"
                    alt="Pablo Story"
                    width={1920 * 3}
                    height={1080 * 3}
                    className="w-auto h-screen scale-[1.2] object-cover object-top-left opacity-30 lg:opacity-100"
                />
            </div>

            {/* CONTENT */}
            <div
                ref={contentRef}
                className="relative z-20 max-w-screen mx-auto h-screen flex flex-col justify-center items-center"
            >
                {/* INTRO (extraRef) */}
                <div
                    ref={extraRef}
                    className="absolute inset-0 flex flex-col justify-center text-white w-full md:max-w-3xl right-20 md:right-100 mx-auto z-30 pointer-events-none px-4 md:px-0"
                >
                    {main && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            className="text-campana-primary font-inter font-bold uppercase block mb-4 text-left"
                        >
                            {main}
                        </motion.span>
                    )}

                    {secondary && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-campana-primary text-5xl md:text-6xl lg:text-7xl font-sans font-normal leading-[0.9] tracking-tighter mb-10 text-left"
                        >
                            {(() => {
                                const words = secondary.split(" ");
                                const lastWord = words.pop();
                                return (
                                    <>
                                        {words.join(" ")}{" "}
                                        <span className="font-ivy-presto italic">{lastWord}</span>
                                    </>
                                );
                            })()}
                        </motion.h2>
                    )}
                </div>

                {/* MAIN CONTENT */}
                <div
                    ref={mainContentRef}
                    className="w-full flex flex-col items-center justify-center h-full left-0 md:-left-30 gap-8"
                    style={{ position: "relative" }}
                >
                    {/* Heading centrado que sube al hacer scroll */}
                    <div
                        ref={headingRevealRef}
                        className="absolute left-0 right-0 z-20 text-center px-6 w-full md:w-3/4 mx-auto flex flex-col items-center gap-4"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                        {highlight && (
                            <span className="text-campana-primary text-sm md:text-xl font-sans font-normal tracking-tighter uppercase flex items-center justify-center gap-2 lining-nums">
                                {highlight}
                            </span>
                        )}

                        {title && (
                            <h2 className="text-campana-primary text-3xl md:text-5xl lg:text-5xl font-sans font-normal mb-0 text-center leading-[0.9] tracking-tighter lining-nums w-full md:w-4xl mx-auto">
                                {(() => {
                                    const words = title.split(" ");
                                    const lastWord = words.pop();
                                    return (
                                        <>
                                            {words.join(" ")}{" "}
                                            <span className="font-ivy-presto italic capatilize transition-all">{lastWord}</span>
                                        </>
                                    );
                                })()}
                            </h2>
                        )}

                        {description && (
                            <p
                                className="text-[#001D3D] text-base md:text-lg w-full md:w-2xl mx-auto tracking-tight leading-5 font-sans font-normal"
                                style={{ textAlign: "justify", textAlignLast: "center", textJustify: "inter-word" }}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </div>

                    {/* Video + CTA apilados — aparecen tras el heading */}
                    <div
                        ref={videoBlockRef}
                        className="w-full flex flex-col items-center gap-6 px-6"
                    >
                        {/* Video con controles */}
                        <div
                            ref={containerRef}
                            className="relative w-full md:w-[960px] mx-auto h-[540px] rounded-2xl overflow-hidden"
                        >
                            {selectedPlaybackId && (
                                <video
                                    ref={videoRef}
                                    src={selectedPlaybackId}
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* Controles sobre el video */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                                <button
                                    onClick={() => {
                                        if (!videoRef.current) return;
                                        if (isPlaying) {
                                            videoRef.current.pause();
                                        } else {
                                            videoRef.current.play();
                                        }
                                        setIsPlaying(!isPlaying);
                                    }}
                                    className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                            <rect x="2" y="1" width="4" height="12" rx="1" />
                                            <rect x="8" y="1" width="4" height="12" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                            <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    onClick={() => {
                                        if (!videoRef.current) return;
                                        videoRef.current.muted = !isMuted;
                                        setIsMuted(!isMuted);
                                    }}
                                    className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                                >
                                    {isMuted ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                                            <line x1="23" y1="9" x2="17" y2="15" />
                                            <line x1="17" y1="9" x2="23" y2="15" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                                            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* CTA debajo del video */}
                        <div
                            ref={ctaRef}
                            className="flex flex-col items-center gap-6 pointer-events-none opacity-0"
                        >
                            {cta && (
                                <div className="group relative inline-flex items-center justify-center">
                                    <button
                                        onClick={() => window.open(cta_url, "_blank")}
                                        className="relative flex items-center justify-center rounded-[40px] bg-campana-secondary hover:bg-campana-seconday-hover px-[24px] h-[44px] text-[16px] font-sans font-bold text-white transition-colors duration-300 cursor-pointer"
                                    >
                                        <span>{cta}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── CARD CONTENT ─────────────────────────────────────────────────────────── */

const CardContent = ({ item }: { item: Investment }) => (
    <div className="relative flex flex-col h-full overflow-hidden">
        <span
            className="absolute top-0 right-0 text-[10rem] md:text-[18rem] font-anton font-black text-campana-secondary/50 leading-none select-none pointer-events-none"
            aria-hidden="true"
        >
            {item.acf.highlight}
        </span>

        <div className="relative z-10 flex flex-col h-full justify-end">
            <span className="text-2xl md:text-3xl font-sans font-normal text-white mb-3 leading-tight h-[80px]">
                {(() => {
                    const words = item.acf.title.split(" ");
                    const lastWord = words.pop();
                    const remaining = words;
                    const mid = Math.ceil(remaining.length / 2);
                    const line1 = remaining.slice(0, mid).join(" ");
                    const line2 = remaining.slice(mid).join(" ");
                    return (
                        <>
                            {line1}<br />
                            {line2}{" "}
                            <span className="font-ivy-presto italic transition-all">{lastWord}</span>
                        </>
                    );
                })()}
            </span>

            <div
                className="text-white text-sm leading-relaxed line-clamp-6 break-words w-full"
                dangerouslySetInnerHTML={{ __html: item.acf.description }}
            />
        </div>
    </div>
);

/* ─── CARD APPLE ───────────────────────────────────────────────────────────── */

const CardApple = ({ children }: { children: React.ReactNode }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <motion.div
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }}
            className="group relative h-[340px] p-8 rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(181,147,74,0.1), transparent 80%)
                    `
                }}
            />
            {children}
        </motion.div>
    );
};
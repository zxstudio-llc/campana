"use client";

import { motion, useInView } from "motion/react";
import { AboutSection } from "@/lib/wordpress.d";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AboutUsProps {
    about: AboutSection;
}

export function AboutUsSection({ about }: AboutUsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    const introRef = useRef<HTMLDivElement>(null);
    const bgLayerRef = useRef<HTMLDivElement>(null);
    const scrollOverlayRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const introSrc = isMobile
        ? about.background_mobile || about.background_desktop
        : about.background_desktop || about.background_mobile;

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const selectedPlaybackId = isMobile
        ? about.mux_playback_mobile_id || about.mux_playback_id
        : about.mux_playback_id || about.mux_playback_mobile_id;

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(bgLayerRef.current, { opacity: 0 });
            gsap.set(introRef.current, { scale: 1, filter: "blur(0px)" });

            // Texto centrado por el flujo Flexbox
            gsap.set(textGroupRef.current, {
                opacity: 0,
                y: 0
            });

            // Video oculto sin ocupar espacio al inicio
            gsap.set(videoContainerRef.current, {
                height: 0,
                overflow: "hidden"
            });

            gsap.set(scrollOverlayRef.current, { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500%", // Tightened
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    pinType: "transform"
                }
            });

            // PHASE 1: Entrance reveal
            tl.to(bgLayerRef.current, { opacity: 0.5, duration: 0.5 }, 0);

            // PHASE 2: Text Revelation
            tl.to(textGroupRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.6);

            // PHASE 3: Video Reveal
            tl.to(videoContainerRef.current, {
                height: "auto",
                duration: 1.5,
                ease: "power2.inOut",
            }, 1.4);

            // PHASE 4: Exit Phase (Transición hacia OurValues)
            tl.to(contentRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.inOut"
            }, 2.9);

        }, sectionRef);

        return () => ctx.revert();
    }, [selectedPlaybackId, introSrc]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen flex items-center overflow-hidden z-50"
        >
            {/* BACKGROUND LAYER THAT FADES IN OVER BIO (SUBTLE) */}
            <div
                ref={bgLayerRef}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm z-1 pointer-events-none"
            />

            <div className="h-full w-full relative overflow-hidden flex items-center justify-center">
                {/* BACKGROUND IMAGE LAYER */}
                <div className="absolute inset-0 z-0">
                    {introSrc && (
                        <div ref={introRef} className="absolute inset-0">
                            <Image
                                src={introSrc}
                                alt="About Background"
                                fill
                                priority
                            />
                        </div>
                    )}
                </div>

                {/* OVERLAY LAYER FOR CONTENT READABILITY */}
                <div
                    ref={scrollOverlayRef}
                    className="absolute inset-0 z-20 pointer-events-none bg-black/40"
                />

                {/* CONTENT LAYER */}
                <div
                    ref={contentRef}
                    className="relative z-30 flex flex-col items-center justify-center w-full max-w-8xl mx-auto h-full gap-8"
                >
                    <div
                        ref={textGroupRef}
                        className="flex flex-col items-center w-full text-center"
                    >
                        {about.subtitle && (
                            <h2
                                ref={subtitleRef}
                                className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white"
                            >
                                {about.subtitle}
                            </h2>
                        )}
                    </div>

                    {selectedPlaybackId && (
                        <div
                            ref={videoContainerRef}
                            className="w-full aspect-4500/1440 shadow-2xl overflow-hidden "
                        >
                            <video
                                src={selectedPlaybackId}
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
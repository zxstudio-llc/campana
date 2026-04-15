"use client";

import { AboutSection } from "@/lib/wordpress.d";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { Volume2, VolumeX } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AboutUsProps {
    id?: string;
    about: AboutSection;
}

export function AboutUsSection({ id, about }: AboutUsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const introTextRef = useRef<HTMLDivElement>(null);
    const bgLayerRef = useRef<HTMLDivElement>(null);
    const scrollOverlayRef = useRef<HTMLDivElement>(null);

    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false); // Inicia en pausa
    const [isMuted, setIsMuted] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    const introSrc = about.background_desktop;

    const introWords = (introSrc || "")
        .trim()
        .replace(/,/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );

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

            gsap.set(introTextRef.current, {
                opacity: 1,
                pointerEvents: "auto",
            });

            gsap.set(textGroupRef.current, {
                opacity: 0,
                y: 0,
            });

            gsap.set(videoContainerRef.current, {
                height: 0,
                overflow: "hidden",
            });

            gsap.set(contentRef.current, {
                opacity: 1,
            });

            gsap.set(scrollOverlayRef.current, { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    onLeave: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    },
                    onLeaveBack: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    }
                },
            });

            tl.to({}, { duration: 1 });

            // PHASE 1: Background Reveal
            tl.to(bgLayerRef.current, {
                opacity: 0.5,
            });

            // PHASE 2: Intro Text Fade Out
            tl.to(
                introTextRef.current,
                {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "-=0.4"
            );
            tl.set(introTextRef.current, { pointerEvents: "none" });

            // PHASE 3: Logo Fade In (Still Centered as Video height is 0)
            tl.to(
                textGroupRef.current,
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                }
            );

            // PHASE 4: Video Reveal (Naturally pushes Logo UP)
            tl.to(
                videoContainerRef.current,
                {
                    height: "auto",
                    duration: 1.5,
                    ease: "power2.inOut",
                    onReverseComplete: () => {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    }
                },
                "+=0.2"
            );

            // PHASE 5: Exit / Dark Overlay
            // tl.to(
            //     scrollOverlayRef.current,
            //     {
            //         opacity: 1,
            //         duration: 1,
            //     },
            //     "<+=0.5"
            // );

            tl.to(
                contentRef.current,
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                },
                "<"
            );

            tl.to({}, { duration: 2 });
        }, sectionRef);

        return () => ctx.revert();
    }, [selectedPlaybackId, introSrc]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className="relative w-full h-screen flex items-center overflow-hidden z-50 bg-campana-bg-about"
        >
            {/* BACKGROUND OVERLAY */}
            <div
                ref={bgLayerRef}
                className="absolute inset-0 bg-campana-bg-about backdrop-blur-sm z-[1]"
            />

            <div className="h-full w-full relative overflow-hidden flex items-center justify-center">
                {/* INTRO TEXT */}
                {introSrc && (
                    <div
                        ref={introTextRef}
                        className="absolute inset-0 z-40 flex flex-col justify-center gap-2 pointer-events-auto"
                    >
                        {introWords.map((word, index) => (
                            <div
                                key={index}
                                className="w-[80vw] max-w-[900px] h-[120px] md:h-64 -mb-10"
                            >
                                <TextHoverEffect text={word} />
                            </div>
                        ))}
                    </div>
                )}

                {/* DARK OVERLAY */}
                <div
                    ref={scrollOverlayRef}
                    className="absolute inset-0 z-20 pointer-events-none bg-campana-bg-about backdrop-blur-sm"
                />

                {/* CONTENT */}
                <div
                    ref={contentRef}
                    className="relative z-30 flex flex-col items-center justify-center w-full max-w-8xl mx-auto h-full gap-4"
                >
                    <div
                        ref={textGroupRef}
                        className="flex flex-col items-center w-full text-center"
                    >
                        <div className="relative w-[300px] md:w-[500px] h-[150px]">
                            <Image
                                src="/assets/logo.svg"
                                alt="Logo"
                                fill
                                priority
                                unoptimized={true}
                                className="object-contain pointer-events-none invert"
                            />
                        </div>
                    </div>
                    {selectedPlaybackId && (
                        <div
                            ref={videoContainerRef}
                            className="relative w-full aspect-2430/1080 shadow-2xl overflow-hidden "
                        >
                            <video
                                ref={videoRef}
                                src={selectedPlaybackId}
                                loop
                                muted
                                // autoPlay
                                playsInline
                                className="w-full object-contain"
                            />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                                <button
                                    onClick={() => {
                                        if (!videoRef.current) return;
                                        isPlaying ? videoRef.current.pause() : videoRef.current.play();
                                        setIsPlaying(!isPlaying);
                                    }}
                                    className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer pointer-events-auto"
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
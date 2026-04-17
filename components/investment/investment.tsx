"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Investment } from "@/lib/wordpress.d";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface InvestmentsSectionProps {
    id?: string;
    main?: string;
    secondary?: string;
    investment: Investment[];
    highlight?: string;
    title?: string;
    description?: string;
    cta?: string;
    cta_url?: string;
    video?: string;
    video_mobile?: string;
}

export default function InvestmentSection({
    id, main, secondary, investment, highlight, title, description, cta, cta_url, video, video_mobile
}: InvestmentsSectionProps) {
    if (!investment?.length) return null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const extraRef = useRef<HTMLDivElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const scrollOverlayRef = useRef<HTMLDivElement>(null);
    const headingRevealRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 2500);
        }
    };

    useEffect(() => {
        if (!isPlaying) {
            setShowControls(true);
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        } else {
            // Start timeout when play starts
            handleMouseMove();
        }
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            if (videoRef.current) videoRef.current.pause();
        };
    }, []);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const selectedPlaybackId = isMobile ? video_mobile || video : video || video_mobile;

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(ctaRef.current, { opacity: 0 });
            gsap.set(extraRef.current, { opacity: 0, scale: 1.1, filter: "blur(20px)" });
            gsap.set(mainContentRef.current, { opacity: 0 });
            gsap.set(videoContainerRef.current, {
                height: 0,
                overflow: "hidden",
            });
            gsap.set(scrollOverlayRef.current, { opacity: 0 });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * 5}`,
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
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

            // INTRO fade in/out
            tl.to(extraRef.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "none"
            });

            // tl.to({}, { duration: 1 });
            // tl.to(extraRef.current, {
            //     opacity: 0,
            //     duration: 2,
            //     ease: "power2.inOut"
            // });

            tl.to({}, { duration: 1 });
            // Exit / Dark Overlay
            tl.to(
                scrollOverlayRef.current,
                {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.inOut"
                },
                "<+=0.5"
            );
            // MAIN CONTENT aparece
            tl.to(mainContentRef.current, { opacity: 1, duration: 1 });

            // HEADING sube y se oculta
            tl.to(headingRevealRef.current, {
                y: -50,
                opacity: 0,
                height: 0,
                marginBottom: 0,
                duration: 1.5,
                ease: "power2.inOut"
            });

            tl.to(
                videoContainerRef.current,
                {
                    height: "auto",
                    duration: 1.5,
                    ease: "power2.inOut",
                    // onComplete: () => {
                    //     if (videoRef.current) {
                    //         videoRef.current.play();
                    //         setIsPlaying(false);
                    //     }
                    // },
                    onReverseComplete: () => {
                        if (videoRef.current) {
                            videoRef.current.pause();
                            setIsPlaying(false);
                        }
                    }
                },
                "-=1.2"
            );

            tl.to(ctaRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.2");

            tl.to({}, { duration: 1.5 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            style={{ height: "100dvh" }}
            className="relative w-full flex items-center justify-center overflow-hidden bg-campana-bg-about"
        >
            {/* PABLO IMAGE */}
            <div className="absolute inset-0 top-0 -right-20 lg:right-6 lg:left-auto  z-0 pointer-events-none">
                <Image
                    src="/assets/pabloInvestment.png"
                    alt="Pablo Story"
                    width={1920}
                    height={1080}
                    className="w-auto lg:h-screen h-[100dvh] scale-[1.2] object-cover object-top-right opacity-30 lg:opacity-100"
                />
            </div>

            {/* INTRO */}
            <div
                ref={extraRef}
                className="absolute inset-0 flex flex-col items-start  justify-center px-6  w-full max-w-7xl ml-0 md:ml-34 mx-auto z-10 pointer-events-none"
            >
                {main && (
                    <span className="text-campana-primary font-bold uppercase block mb-4 text-sm">
                        {main}
                    </span>
                )}
                {secondary && (
                    <h2 className="text-campana-primary text-5xl md:text-8xl font-sans font-normal leading-[0.9] tracking-tighter mb-10">
                        {(() => {
                            const words = secondary.split(" ");
                            const totalWords = words.length;

                            // Si solo hay una palabra, no dividimos, solo aplicamos el estilo
                            if (totalWords === 1) {
                                return <span className="font-ivy-presto italic">{words[0]}</span>;
                            }

                            // Calculamos la mitad (hacia arriba si es impar)
                            const midIndex = Math.ceil(totalWords / 2);

                            const firstLine = words.slice(0, midIndex).join(" ");
                            const remainingWords = words.slice(midIndex);

                            // Extraemos la última palabra para el span
                            const lastWord = remainingWords.pop();
                            const secondLineBase = remainingWords.join(" ");

                            return (
                                <>
                                    {/* Primera parte (la mayor cantidad) */}
                                    {firstLine}
                                    <br />
                                    {/* Segunda parte con la última palabra estilizada */}
                                    {secondLineBase}{" "}
                                    <span className="font-ivy-presto italic">{lastWord}</span>
                                </>
                            );
                        })()}
                    </h2>
                )}
            </div>

            <div
                ref={scrollOverlayRef}
                className="absolute inset-0 z-20 pointer-events-none bg-campana-bg-about backdrop-blur-sm"
            />

            {/* MAIN CONTENT */}
            <div
                ref={mainContentRef}
                className="relative z-30 flex flex-col items-center justify-center w-full max-w-8xl  h-full gap-4"
            >
                <div
                    ref={headingRevealRef}
                    className="flex flex-col items-center w-full text-center"
                >
                    <div className="relative w-full flex flex-col">
                        {highlight && (
                            <span className="text-campana-primary font-bold uppercase block mb-4 text-sm">
                                {highlight}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-campana-primary text-5xl md:text-7xl font-sans font-normal leading-[0.9] tracking-tighter mb-5">
                                {(() => {
                                    const words = title.split(" ");
                                    const lastWord = words.pop();
                                    return (
                                        <>
                                            {words.join(" ")}{" "}
                                            <span className="font-ivy-presto capitalize italic">{lastWord}</span>
                                        </>
                                    );
                                })()}
                            </h2>
                        )}
                        {description && (
                            <p
                                className="text-[#001D3D] text-base md:text-lg tracking-tight leading-5 font-sans"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </div>
                </div>
                {selectedPlaybackId && (
                    <>
                        <div
                            ref={videoContainerRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => isPlaying && setShowControls(false)}
                            className="relative w-full aspect-1920/1080 shadow-2xl overflow-hidden rounded-lg group"
                        >
                            <video
                                ref={videoRef}
                                src={selectedPlaybackId}
                                loop
                                muted={isMuted}
                                playsInline
                                preload="auto"
                                className="w-full object-fit bottom-0"
                            />
                            <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${(showControls || !isPlaying) ? "opacity-100" : "opacity-0"}`}>
                                <button
                                    onClick={() => {
                                        if (!videoRef.current) return;
                                        isPlaying ? videoRef.current.pause() : videoRef.current.play();
                                        setIsPlaying(!isPlaying);
                                    }}
                                    className="h-20 w-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer pointer-events-auto"
                                >
                                    {isPlaying ? (
                                        <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor">
                                            <rect x="2" y="1" width="4" height="12" rx="1" />
                                            <rect x="8" y="1" width="4" height="12" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor">
                                            <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                                <button
                                    onClick={() => {
                                        if (!videoRef.current) return;
                                        videoRef.current.muted = !isMuted;
                                        setIsMuted(!isMuted);
                                    }}
                                    className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                                >
                                    {isMuted ? (
                                        <VolumeX />
                                    ) : (
                                        <Volume2 />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* CTA debajo del video */}
                        <div
                            ref={ctaRef}
                            className="flex flex-col items-center w-full md:w-[1000px] opacity-100 pointer-events-auto mb-8 mt-4"
                        >
                            {cta && (
                                <button
                                    onClick={() => window.open(cta_url, "_blank")}
                                    className="group/btn relative block px-[40px] bg-campana-secondary hover:bg-campana-seconday-hover text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                                >
                                    <span className="text-xl">{cta}</span>
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
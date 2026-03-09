"use client";

import { motion, useInView } from "motion/react";
import { VideoVipSection } from "./components/video-section";
import { AboutSection } from "@/lib/wordpress.d";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { ContainerScroll } from "./components/container-scroll-animation";

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

    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });
    const [isMobileState, setIsMobileState] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobileState(e.matches);
        };
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const selectedPlaybackId = isMobileState
        ? about.mux_playback_mobile_id || about.mux_playback_id
        : about.mux_playback_id || about.mux_playback_mobile_id;

    useLayoutEffect(() => {
        if (!sectionRef.current || !pinRef.current) return;

        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=120%",
                    scrub: 1,
                    pin: pinRef.current,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        });

        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-campana-bg"
        >
            <div
                ref={pinRef}
                className="sticky top-0 h-screen flex items-center justify-center"
            >
                <div className="flex flex-col w-full max-w-7xl mx-auto">
                    <ContainerScroll
                        titleComponent={
                            <div className="flex flex-col items-center">
                                {about.subtitle && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={
                                            isVisible
                                                ? { opacity: 1, y: 0 }
                                                : { opacity: 0, y: 50 }
                                        }
                                        className="text-campana-secondary font-bold tracking-[0.2em] uppercase text-center"
                                    >
                                        {about.subtitle}
                                    </motion.span>
                                )}

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={
                                        isVisible
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0, y: 50 }
                                    }
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-center text-campana-primary"
                                >
                                    {about.title}
                                </motion.h2>
                            </div>
                        }
                    >
                        {selectedPlaybackId && (
                            <VideoVipSection playbackId={selectedPlaybackId} />
                        )}
                    </ContainerScroll>
                </div>
            </div>
        </section>
    );
}
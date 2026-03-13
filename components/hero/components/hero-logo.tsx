"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UniversalVideo from "@/components/universal-video";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    mux_playback_web_id?: string | null;
    mux_playback_mobile_id?: string | null;
    video_scroll_web?: string | null;
    video_scroll_mobile?: string | null;
}

export default function HeroLogo({
    mux_playback_web_id,
    mux_playback_mobile_id,
    video_scroll_web,
    video_scroll_mobile,
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null);
    const introVideoRef = useRef<HTMLVideoElement>(null);
    const scrollVideoRef = useRef<HTMLVideoElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const introSrc = isMobile
        ? mux_playback_mobile_id || mux_playback_web_id
        : mux_playback_web_id || mux_playback_mobile_id;

    const scrollSrc = isMobile
        ? video_scroll_mobile || video_scroll_web
        : video_scroll_web || video_scroll_mobile;

    useLayoutEffect(() => {

        const mq = window.matchMedia("(max-width: 767px)");

        const update = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        update(mq);
        mq.addEventListener("change", update);

        return () => mq.removeEventListener("change", update);

    }, []);

    // Reinforce play and debug URLs
    useEffect(() => {
        if (introSrc) console.log("HeroIntro: Intentando cargar ->", introSrc);

        const playVideo = () => {
            if (introVideoRef.current) {
                introVideoRef.current.play().catch(err => {
                    console.warn("HeroIntro: Auto-play bloqueado, reintentando...", err);
                });
            }
        };

        // Pequeño delay para asegurar que el DOM está listo
        const timer = setTimeout(playVideo, 100);
        return () => clearTimeout(timer);
    }, [introSrc]);

    useLayoutEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            gsap.set(scrollVideoRef.current, { opacity: 0 });
            gsap.set(introVideoRef.current, { opacity: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            tl.to(introVideoRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "none"
            }, 0.1);

            tl.to(scrollVideoRef.current, {
                opacity: 1,
                duration: 0.6,
                ease: "none"
            }, 0.1);

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <section ref={sectionRef} className="relative z-30">

            <div className="h-screen overflow-hidden relative">

                <div className="absolute inset-0 bg-linear-to-b from-campana-bg-hover to-black" />

                {/* INTRO VIDEO */}
                {introSrc && (
                    <div className="absolute inset-0">

                        <UniversalVideo
                            src={introSrc}
                            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                        />

                    </div>
                )}

                {/* SCROLL VIDEO */}
                {scrollSrc && (
                    <div className="absolute inset-0">

                        <UniversalVideo
                            src={scrollSrc}
                            className="w-full h-full object-cover"
                        />

                    </div>
                )}

            </div>

        </section>
    );
}
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    mux_playback_web_id?: string | null;
    mux_playback_mobile_id?: string | null;
    video_scroll_web?: string | null;
    video_scroll_mobile?: string | null;
    biographyPreloadVideos?: string[];
}

export default function HeroLogo({
    mux_playback_web_id,
    mux_playback_mobile_id,
    video_scroll_web,
    video_scroll_mobile,
    biographyPreloadVideos = []
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null);

    const videoIntroRef = useRef<HTMLVideoElement>(null);
    const videoScrollRef = useRef<HTMLVideoElement>(null);

    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);



    // detectar mobile
    useLayoutEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");

        const update = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        update(mql);
        mql.addEventListener("change", update);

        return () => mql.removeEventListener("change", update);
    }, []);

    const introSrc = isMobile
        ? mux_playback_mobile_id || mux_playback_web_id
        : mux_playback_web_id || mux_playback_mobile_id;

    const scrollSrc = isMobile
        ? video_scroll_mobile || video_scroll_web
        : video_scroll_web || video_scroll_mobile;

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 768px)",
                isMobile: "(max-width: 767px)",
            },
            () => {

                const intro = videoIntroRef.current;
                const scroll = videoScrollRef.current;

                gsap.set(intro, { opacity: 1, scale: 1 });
                gsap.set(scroll, { opacity: 0, y: 80, scale: 1.15 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=500%",
                        scrub: 2,
                        pin: true,
                        anticipatePin: 1,

                        // precarga del video
                        onEnter: () => {
                            if (scroll && scrollSrc && !scroll.src) {
                                scroll.src = scrollSrc;
                                scroll.load();
                            }
                        }
                    },
                });

                // fade + zoom del intro
                tl.to(intro, {
                    opacity: 0,
                    scale: 1.1,
                    duration: 1,
                    ease: "power2.out"
                }, 0.75);

                // aparición del segundo video
                tl.to(scroll, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",

                    onStart: () => {
                        if (scroll) {
                            scroll.currentTime = 0;
                            scroll.play().catch(() => { });
                        }
                    }
                }, "<");
            }
        );

        return () => mm.revert();
    }, [scrollSrc]);

    return (
        <section ref={sectionRef} className="relative z-30">
            <div
                className="h-screen overflow-hidden relative transition-opacity duration-700"
                style={{ opacity: isVideoReady ? 1 : 0 }}
            >

                <div className="absolute inset-0 bg-linear-to-b from-campana-bg-hover to-black" />

                {/* VIDEO INTRO */}
                {introSrc && (
                    <video
                        ref={videoIntroRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onCanPlay={() => {
                            setIsVideoReady(true);
                            window.dispatchEvent(new Event("hero-video-ready"));
                        }}
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "200vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    >
                        <source src={introSrc} type="video/mp4" />
                    </video>
                )}

                {/* VIDEO SCROLL (ANTES ERA EL SVG) */}
                {scrollSrc && (
                    <video
                        ref={videoScrollRef}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "200vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                )}

                {/* PRECARGA DINÁMICA DE VIDEOS DE BIOGRAFIA */}
                {biographyPreloadVideos.map((url, index) => (
                    <video key={index} preload="auto" muted className="hidden" src={url} />
                ))}

            </div>
        </section>
    );
}
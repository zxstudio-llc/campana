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
}

export default function HeroLogo({
    mux_playback_web_id,
    mux_playback_mobile_id,
    video_scroll_web,
    video_scroll_mobile,
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null);

    const videoIntroRef = useRef<HTMLVideoElement>(null);
    const videoScrollRef = useRef<HTMLVideoElement>(null);

    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 768px)",
                isMobile: "(max-width: 767px)",
            },
            () => {

                gsap.set(videoIntroRef.current, { opacity: 1 });
                gsap.set(videoScrollRef.current, { opacity: 0, y: 80 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=500%",
                        scrub: 2,
                        pin: true,
                        anticipatePin: 1,

                        onEnter: () => {
                            if (videoScrollRef.current && scrollSrc) {
                                const video = videoScrollRef.current

                                if (!video.src) {
                                    video.src = scrollSrc
                                    video.load()
                                }

                                video.play().catch(() => { })
                            }
                        }
                    },
                });

                // transición entre videos
                tl.to(
                    videoIntroRef.current,
                    {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    0.25
                );

                tl.to(
                    videoScrollRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "<"
                );
            }
        );

        return () => mm.revert();
    }, []);

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
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "200vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                )}

            </div>
        </section>
    );
}
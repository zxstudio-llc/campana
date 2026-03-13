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

    // detectar mobile
    useLayoutEffect(() => {

        const mq = window.matchMedia("(max-width: 767px)");

        const update = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        update(mq);
        mq.addEventListener("change", update);

        return () => mq.removeEventListener("change", update);

    }, []);

    // desbloquear autoplay iOS
    useLayoutEffect(() => {

        const unlock = () => {
            const v = scrollVideoRef.current;
            if (!v) return;

            v.play().then(() => {
                v.pause();
                v.currentTime = 0;
            }).catch(() => { });
        };

        window.addEventListener("touchstart", unlock, { once: true });

        return () => window.removeEventListener("touchstart", unlock);

    }, []);

    useLayoutEffect(() => {

        if (!sectionRef.current || !scrollVideoRef.current) return;

        const video = scrollVideoRef.current;

        const ctx = gsap.context(() => {

            gsap.set(scrollVideoRef.current, { opacity: 0 });
            gsap.set(introVideoRef.current, { opacity: 1 });

            let duration = 1;

            const onLoaded = () => {
                duration = video.duration || 1;
            };

            video.addEventListener("loadedmetadata", onLoaded);

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

            // transición de videos
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

            // controlar video con scroll
            tl.to(video, {
                currentTime: () => duration,
                ease: "none",
            }, 0);

        }, sectionRef);

        return () => ctx.revert();

    }, [scrollSrc]);

    return (
        <section ref={sectionRef} className="relative z-30">

            <div
                className="h-screen overflow-hidden relative transition-opacity duration-700"
                style={{ opacity: isReady ? 1 : 0 }}
            >

                <div className="absolute inset-0 bg-linear-to-b from-campana-bg-hover to-black" />

                {/* INTRO VIDEO */}
                {introSrc && (
                    <video
                        ref={introVideoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsReady(true)}
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    >
                        <source src={introSrc} type="video/mp4" />
                    </video>
                )}

                {/* SCROLL VIDEO */}
                {scrollSrc && (
                    <video
                        ref={scrollVideoRef}
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    >
                        <source src={scrollSrc} type="video/mp4" />
                    </video>
                )}

            </div>

        </section>
    );
}
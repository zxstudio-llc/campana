"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

    console.log("HeroLogo: Props Received ->", { mux_playback_web_id, mux_playback_mobile_id, video_scroll_web, video_scroll_mobile });

    const sectionRef = useRef<HTMLDivElement>(null);

    const videoIntroRef = useRef<HTMLVideoElement>(null);
    const videoScrollRef = useRef<HTMLVideoElement>(null);

    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    // detectar mobile
    useLayoutEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");

        const update = (e: MediaQueryListEvent | MediaQueryList) => {
            console.log("HeroLogo: isMobile update ->", e.matches);
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

                        // No es necesario cargar manualmente el src ya que se precarga globalmente
                        onEnter: () => {
                            if (scroll) {
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

    // Forzar carga en Safari/iOS con manejo de errores mejorado
    useEffect(() => {
        let playTimeout: NodeJS.Timeout;

        if (videoIntroRef.current && introSrc) {
            console.log("HeroLogo: Attempting to load video (with cache bust) ->", introSrc);
            const video = videoIntroRef.current;

            // Aplicamos el cache buster directamente al DOM para no romper la hidratación de React
            const buster = Date.now();
            const bustedSrc = `${introSrc}${introSrc.includes('?') ? '&' : '?'}v=${buster}`;
            video.src = bustedSrc;

            // Safari a veces falla si se llama a play() inmediatamente después de load()
            video.load();

            playTimeout = setTimeout(() => {
                video.play().catch(err => {
                    if (err.name !== "AbortError") {
                        console.warn("HeroLogo: Play attempt failed ->", err.name, err.message);
                    }
                });
            }, 100);
        }

        return () => clearTimeout(playTimeout);
    }, [introSrc]);

    return (
        <section ref={sectionRef} className="relative z-30">
            <div
                className="h-screen overflow-hidden relative transition-opacity duration-700"
            >

                <div className="absolute inset-0 bg-linear-to-b from-campana-bg-hover to-black" />

                {/* VIDEO INTRO */}
                {introSrc && (
                    <video
                        key={`intro-${introSrc}`}
                        ref={videoIntroRef}
                        src={introSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onLoadStart={() => console.log("HeroLogo: Video Intro LoadStart ->", introSrc)}
                        onLoadedMetadata={() => console.log("HeroLogo: Video Intro Metadata Loaded")}
                        onLoadedData={() => {
                            console.log("HeroLogo: Video Intro Data Loaded (Ready)");
                            setIsVideoReady(true);
                        }}
                        onPlay={() => {
                            console.log("HeroLogo: Video Intro Playing");
                            setIsVideoReady(true);
                            // Notificamos al preloader solo cuando realmente está sonando
                            window.dispatchEvent(new Event("hero-video-ready"));
                        }}
                        onError={(e) => {
                            const video = videoIntroRef.current;
                            if (video && video.error) {
                                console.error("HeroLogo: [INTRO] Video Native Error Code ->", video.error.code);
                                console.error("HeroLogo: [INTRO] Video Native Error Message ->", video.error.message);
                            }
                        }}
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "200vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                )}

                {/* VIDEO SCROLL (LOGO BLANCO) */}
                {scrollSrc && (
                    <video
                        key={`scroll-${scrollSrc}`}
                        ref={videoScrollRef}
                        src={scrollSrc}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onError={(e) => {
                            const video = videoScrollRef.current;
                            if (video && video.error) {
                                console.error("HeroLogo: [SCROLL] Video Native Error Code ->", video.error.code);
                                console.error("HeroLogo: [SCROLL] Video Native Error Message ->", video.error.message);
                            }
                        }}
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
                    <video key={index} preload="auto" muted className="hidden">
                        <source src={url} type="video/mp4" />
                    </video>
                ))}

            </div>
        </section>
    );
}
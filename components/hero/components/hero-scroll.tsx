"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskedLogo, MaskedLogoHandle } from "./masked-logo";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    videoSrcDesktop?: string | null;
    videoSrcMobile?: string | null;
    children: React.ReactNode;
}

export default function HeroScroll({ videoSrcDesktop, videoSrcMobile, children }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const maskLogoRef = useRef<MaskedLogoHandle>(null);
    const whiteLogoRef = useRef<SVGSVGElement>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const videoRef = useRef<HTMLIFrameElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
        if (!sectionRef.current || !maskLogoRef.current) return;

        const ctx = gsap.context(() => {
            const logo = maskLogoRef.current?.logoGroup;
            if (!logo) return;

            const bbox = logo.getBBox();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const scaleX = vw / bbox.width;
            const scaleY = vh / bbox.height;
            const coverScale = isMobile ? scaleX * 0.9 : Math.max(scaleX, scaleY);
            const overflowMultiplier = isMobile ? 2480 : 90;
            const startScale = coverScale * overflowMultiplier;
            const targetWidth = isMobile ? 1980 : 1230;
            const yOffset = isMobile ? -120 : -90;
            const endScale = targetWidth / bbox.width;

            gsap.set(logo, { scale: startScale, transformOrigin: "50% 50%" });
            gsap.set(whiteLogoRef.current, { opacity: 0 });
            gsap.set(textRef.current, { opacity: 0, y: 40 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            tl.to(logo, { scale: endScale, ease: "none" });
            tl.to(videoRef.current, { opacity: 0, ease: "none" }, 0.3);
            tl.to(whiteLogoRef.current, { opacity: 1, ease: "none" }, 0.5);
            tl.to(whiteLogoRef.current, { scale: 1, ease: "none" });
            tl.set(maskLogoRef.current?.container, { autoAlpha: 0 });
            tl.to(textRef.current, { opacity: 1, y: 90, ease: "none" });
            tl.to(".reveal-description", { opacity: 1, duration: 1, ease: "power2.out" });
            tl.to([".reveal-description", whiteLogoRef.current], {
                opacity: 0,
                scale: 0.9,
                filter: "blur(20px)",
                duration: 1.5,
                ease: "power2.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    useEffect(() => {
        // Deferimos la carga del video 500ms para que no bloquee los scripts críticos iniciales
        const timer = setTimeout(() => {
            setVideoSrc(isMobile ? (videoSrcMobile ?? null) : (videoSrcDesktop ?? null));
        }, 500);
        return () => clearTimeout(timer);
    }, [isMobile, videoSrcMobile, videoSrcDesktop]);

    return (
        <section ref={sectionRef} className="relative ">
            <div className="h-screen overflow-hidden relative transition-opacity duration-700 " style={{ opacity: isVideoReady ? 1 : 0 }}>
                <div className="absolute inset-0 bg-[#00122d]"></div>
                {videoSrc && (
                    <iframe
                        ref={videoRef}
                        src={`${videoSrc}?background=1&autoplay=1&loop=1&muted=1&transparent=0`}
                        className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
                        style={{
                            width: '200vw',
                            height: '100vh',
                            objectFit: 'fill',
                            minWidth: '100%',
                        }}
                        allow="autoplay; fullscreen"
                        onLoad={() => setIsVideoReady(true)}
                    />
                )}
                <MaskedLogo ref={maskLogoRef} videoSrc={(isMobile ? videoSrcMobile : videoSrcDesktop) ?? ''} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 ">
                    <svg ref={whiteLogoRef} viewBox="0 0 1334.1 242.1" className="w-full h-full max-w-[93%] md:max-w-[530px]" fill="white">
                        <path d="M165.1,28.7c4.4,0,7.3,3,7.3,7.3v31c0,4.4-3,7.3-7.3,7.3h-89.1c-9.3,0-15.2,8.5-15.2,17.1v60.1c0,8.8,5.9,16.9,15.2,16.9h89.1c4.4,0,7.3,3,7.3,7.3v31.3c0,4.4-3,7.3-7.3,7.3h-89.1c-34.9,0-62.3-29.3-62.3-63.7v-57.9c0-34.5,27.2-64,62.3-64,0,0,89.1,0,89.1,0Z" />
                        <path d="M387,202.6l-70.5-156.5c-5.7-12.2-17.9-20.1-31.3-20.1s-25.9,8.1-31.3,20.1l-70.3,156.5c-.8,1.4-1,3-1,4.4,0,4.6,3.9,6,7.9,6h189.7c3.9,0,7.9-1.4,7.9-6s-.3-3-1-4.4h-.1ZM268.8,127.2c3.2-7.3,7.9-16.3,9.5-20.1,1.3-2.7,3.5-6.8,6.8-6.8s5.7,4.1,6.8,6.8c1.7,3.3,5.9,11.7,9,19.1l21.4,47.9h-74.5l21-46.9h0Z" />
                        <path d="M608,205.8V36.5c0-3.9,3-7.1,6.8-7.1h22.5l44.7.3h22.3c31.5,0,55.9,26.6,55.9,57.7v16.9c0,32.1-23.4,57.4-55.9,57.4h-41.7c-19.1,0,4.4,51.5-14.7,51.5h-32.4c-4.4,0-7.3-3-7.3-7.3h-.2ZM662.5,117.4h41.7c6.3,0,8.5-4.9,8.5-10.6v-21.2c0-4.9-3.2-10.3-8.5-10.3h-41.7c-4.4,0-7.3,3-7.3,7.3v27.3c0,4.4,3,7.3,7.3,7.3h0v.2Z" />
                        <path d="M937.7,202.6l-70.5-156.5c-5.7-12.2-17.8-20.1-31.3-20.1s-25.9,8.1-31.3,20.1l-70.3,156.5c-.8,1.4-1,3-1,4.4,0,4.6,3.9,6,7.9,6h189.7c3.9,0,7.9-1.4,7.9-6s-.3-3-1-4.4h-.1ZM819.5,127.2c3.2-7.3,7.9-16.3,9.5-20.1,1.3-2.7,3.5-6.8,6.8-6.8s5.7,4.1,6.8,6.8c1.7,3.3,5.9,11.7,9,19.1l21.4,47.9h-74.5l21-46.9h0Z" />
                        <path d="M1319.3,202.6l-70.5-156.5c-5.7-12.2-17.8-20.1-31.3-20.1s-25.9,8.1-31.3,20.1l-70.3,156.5c-.8,1.4-1,3-1,4.4,0,4.6,3.9,6,7.9,6h189.7c3.9,0,7.9-1.4,7.9-6s-.3-3-1-4.4h0ZM1201.2,127.2c3.2-7.3,7.9-16.3,9.5-20.1,1.2-2.7,3.5-6.8,6.8-6.8s5.7,4.1,6.8,6.8c1.7,3.3,5.9,11.7,9,19.1l21.4,47.9h-74.5l21-46.9h0Z" />
                        <path d="M555.1,210.7v-98.3c0-2.4-3.3-3.3-4.5-1.2l-33.5,61.7c-.4.8-1.3,1.3-2.1,1.3h-34.1c-.9,0-1.7-.5-2.1-1.3l-33.7-61.8c-1.2-2.2-4.5-1.3-4.5,1.2v98.5c0,1.3-1,2.4-2.4,2.4h-34.6c-3.2,0-5.7-2.6-5.7-5.7V35.3c0-3.1,2.6-5.7,5.7-5.7h43.8c.9,0,1.7.5,2.1,1.2l46.3,83.3c.9,1.7,3.2,1.7,4.1,0l46.3-83.3c.4-.8,1.3-1.2,2.1-1.2h43.5c3.2,0,5.7,2.6,5.7,5.7v172.2c0,3.2-2.6,5.7-5.7,5.7h-34.6c-1.3,0-2.3-1-2.3-2.4h.3,0Z" />
                        <path d="M1066.7,212l-71.3-100c-1.5-2.2-5-1-5,1.5v96.8c0,1.5-1.3,2.7-2.7,2.7h-31.9c-3.9,0-7-3.1-7-7V32.9c0-3.9,3.1-7,7-7h28.8c.9,0,1.7.4,2.2,1.2l71.3,100.3c1.5,2.2,5,1,5-1.5V28.8c0-1.5,1.3-2.7,2.7-2.7h31.9c3.9,0,7,3.1,7,7v173.1c0,3.9-3.1,7-7,7h-28.8c-.9,0-1.7-.4-2.2-1.2h0Z" />
                    </svg>
                </div>
                <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 pointer-events-none " >
                    {children}
                </div>
            </div>
        </section>
    );
}
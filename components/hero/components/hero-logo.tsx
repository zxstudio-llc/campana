"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    id?: string;
    bg_photo_desktop?: string | null;
    bg_photo_mobile?: string | null;
}

export default function HeroLogo({
    id,
    bg_photo_desktop,
    bg_photo_mobile,
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const scrollOverlayRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    const introSrc = isMobile
        ? bg_photo_mobile || bg_photo_desktop
        : bg_photo_desktop || bg_photo_mobile;

    useLayoutEffect(() => {

        const mq = window.matchMedia("(max-width: 767px)");

        const update = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };

        update(mq);
        mq.addEventListener("change", update);

        return () => mq.removeEventListener("change", update);

    }, []);

    useLayoutEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            // gsap.set(scrollOverlayRef.current, { opacity: 0 });
            gsap.set(introRef.current, { scale: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                    pinType: "transform"
                }
            });

            tl.to(introRef.current, {
                scale: 1.15,
                // filter: "blur(20px)",
                duration: 1,
                ease: "none",
                immediateRender: false
            }, 0);

            // tl.to(scrollOverlayRef.current, {
            //     opacity: 1,
            //     duration: 0.8,
            //     ease: "power2.inOut"
            // }, 0.1);

        }, sectionRef);

        return () => ctx.revert();

    }, [introSrc]);

    return (
        <section id={id} ref={sectionRef} className="relative z-10 pointer-events-none">
            <div className="h-screen overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-b from-campana-bg-hover to-black" />
                {introSrc && (
                    <div ref={introRef} className="absolute inset-0">
                        <video
                            src={introSrc}
                            loop
                            muted
                            autoPlay
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover pointer-events-none object-right"
                        />
                    </div>
                )}
                {/* <div
                    ref={scrollOverlayRef}
                    className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-campana-bg-hover to-black"
                /> */}
            </div>
        </section>
    );
}
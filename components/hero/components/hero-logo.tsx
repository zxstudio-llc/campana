"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    bg_photo_desktop?: string | null;
    bg_photo_mobile?: string | null;
}

export default function HeroLogo({
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

            gsap.set(scrollOverlayRef.current, { opacity: 0 });
            gsap.set(introRef.current, { scale: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            tl.to(introRef.current, {
                scale: 1.15,
                duration: 1,
                ease: "none"
            }, 0);

            tl.to(scrollOverlayRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.inOut"
            }, 0.1);

        }, sectionRef);

        return () => ctx.revert();

    }, [introSrc]);

    return (
        <section ref={sectionRef} className="relative z-30">

            <div className="h-screen overflow-hidden relative">

                <div className="absolute inset-0 bg-linear-to-b from-campana-bg-hover to-black" />

                {/* SINGLE HERO IMAGE */}
                {introSrc && (
                    <div ref={introRef} className="absolute inset-0">
                        <Image
                            src={introSrc}
                            alt="Hero Background"
                            fill
                            priority
                            className="object-cover pointer-events-none"
                        />
                    </div>
                )}

                {/* ANIMATED OVERLAY */}
                <div
                    ref={scrollOverlayRef}
                    className="absolute inset-0 z-10 pointer-events-none bg-black/60"
                />

            </div>

        </section>
    );
}
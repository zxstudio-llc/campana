"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!containerRef.current || !cardRef.current || !headerRef.current) return;

        const isMobile = window.innerWidth <= 768;
        const scaleValue = isMobile ? 0.9 : 1;
        const startScale = isMobile ? 0.7 : 1.05;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    immediateRender: false,
                },
            });

            // GSAP transformations replacing useTransform
            tl.fromTo(cardRef.current,
                {
                    rotateX: 20,
                    scale: startScale,
                },
                {
                    rotateX: 0,
                    scale: scaleValue,
                    ease: "none",
                    duration: 1
                }
            );


        }, containerRef);

        // Force a global refresh after a short delay to account for other pinned sections
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <div ref={triggerRef} className="relative w-full z-0">

            <div
                className="h-screen flex items-center justify-center relative"
                ref={containerRef}
            >
                <div
                    className="w-full relative p-30 flex flex-col gap-4"
                    style={{
                        perspective: "1500px",
                    }}
                >
                    <div ref={headerRef} className="max-w-full mx-auto text-center z-20">
                        {titleComponent}
                    </div>
                    <div
                        ref={cardRef}
                        className=" w-full border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] shadow-2xl h-auto min-h-fit overflow-hidden relative z-10"
                    >
                        <div className="w-full flex items-center justify-center ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

"use client";

import React, { useLayoutEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Investment } from "@/lib/wordpress.d";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cohete from "./cohete";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

gsap.registerPlugin(ScrollTrigger);

interface InvestmentsSectionProps {
    main_photo?: string;
    secondary_photo?: string;
    highlight?: string;
    title?: string;
    description?: string;
    investment: Investment[];
    cta?: string;
    cta_url?: string;
}

export default function InvestmentSection({
    main_photo,
    secondary_photo,
    highlight,
    title,
    description,
    investment,
    cta,
    cta_url
}: InvestmentsSectionProps) {

    if (!investment?.length) return null;

    const imageUrl = main_photo || secondary_photo;
    const secondImageUrl = secondary_photo;

    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const coheteRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            gsap.set(coheteRef.current, {
                y: 80,
                opacity: 1
            });

            gsap.set(containerRef.current, {
                y: 900,
                opacity: 0
            });

            gsap.set(contentRef.current, {
                y: 200,
                opacity: 0
            });

            gsap.set(backdropRef.current, {
                opacity: 0
            });

            gsap.set([contentRef.current, backdropRef.current], {
                visibility: "visible",
                pointerEvents: "auto",
                willChange: "opacity, transform"
            })

            gsap.set(ctaRef.current, {
                opacity: 0,
                y: 40
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=550%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,

                    onUpdate: (self) => {
                        // 👇 threshold donde desaparece el content (~posición 6.5 de tu timeline)
                        const hideThreshold = 6.5 / 8 // ajustado al total aproximado del timeline

                        if (self.progress >= hideThreshold) {
                            gsap.set([contentRef.current, backdropRef.current], {
                                visibility: "hidden",
                                pointerEvents: "none"
                            })
                        } else {
                            gsap.set([contentRef.current, backdropRef.current], {
                                visibility: "visible",
                                pointerEvents: "auto"
                            })
                        }
                    }
                }
            })

            tl.to(coheteRef.current, {
                y: -400,
                duration: 2,
                ease: "none"
            }, 0);

            tl.to(containerRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "none"
            }, 1.9);

            tl.to(coheteRef.current, {
                y: -1150,
                duration: 1.2,
                ease: "none"
            }, 1.9);

            tl.to(backdropRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "none"
            }, 5.0);

            tl.to(contentRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, 5.2);

            /* 6 — CONTENT + BLUR DESAPARECEN */
            tl.to([contentRef.current, backdropRef.current], {
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
            }, 6.5);

            /* 7 — CTA APARECE SOLO */
            tl.to(ctaRef.current, {
                opacity: 1,
                y: -55,
                duration: 1,
                ease: "power2.out"
            }, 7.0);

        }, sectionRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();

    }, []);

    return (

        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-campana-bg"
        >

            {/* COHETE */}

            <div
                ref={coheteRef}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            >
                <Cohete />
            </div>

            {/* IMÁGENES */}

            <div
                ref={containerRef}
                className="absolute inset-0 z-0 grid grid-cols-12"
            >

                <div className="col-span-7 relative h-screen overflow-hidden">

                    {secondImageUrl && (
                        <Image
                            src={secondImageUrl}
                            alt=""
                            fill
                            priority
                            className=" object-contain object-top-left"
                        />
                    )}

                </div>

                <div className="col-span-5 relative h-screen overflow-hidden">

                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt=""
                            fill
                            priority
                            className="object-contain object-bottom-right"
                        />
                    )}

                </div>

            </div>

            {/* BLUR */}

            <div
                ref={backdropRef}
                className="absolute inset-0 backdrop-blur-sm z-10 bg-black/30 pointer-events-none"
            />

            {/* CONTENT */}

            <div
                ref={contentRef}
                className="relative z-20 max-w-screen mx-auto h-screen flex flex-col justify-center"
            >

                <div className="text-center mb-16">

                    <span className="text-white text-lg font-bold uppercase">
                        {highlight}
                    </span>

                    <h2 className="text-black text-8xl font-black uppercase">
                        {title}
                    </h2>

                    <p
                        className="text-xl mt-6 max-w-8xl font-bold mx-auto leading-5"
                        dangerouslySetInnerHTML={{ __html: description || "" }}
                    />

                </div>

                <div className="grid grid-cols-3 gap-8 px-20 ">

                    {investment.map((item) => (
                        <CardApple key={item.id}>
                            <CardContent item={item} />
                        </CardApple>
                    ))}

                </div>

            </div>

            {/* CTA — aparece sola tras el contenido */}
            <div
                ref={ctaRef}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 pointer-events-auto"
            >
                {cta && (
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="bg-campana-secondary text-campana-primary px-12 py-4 text-xl font-black rounded-full uppercase"
                        onClick={() => window.open(cta_url, "_blank")}
                    >
                        {cta}
                    </HoverBorderGradient>
                )}
            </div>

        </section>
    );
}

/* CARD CONTENT */

const CardContent = ({ item }: { item: Investment }) => (
    <div className="relative flex flex-col h-full overflow-hidden">

        {/* NÚMERO DE FONDO — watermark grande y opaco */}
        <span
            className="absolute top-0 right-0 text-[18rem] font-anton font-black text-campana-secondary/50 leading-none select-none pointer-events-none"
            aria-hidden="true"
        >
            {item.acf.highlight}
        </span>

        {/* CONTENIDO — sobrepuesto al número */}
        <div className="relative z-10 flex flex-col h-full">

            {/* TÍTULO — siempre en 2 líneas */}
            <h4 className="text-3xl font-black text-white uppercase mb-3 leading-tight mt-auto">
                {(() => {
                    const words = item.acf.title.split(" ");
                    const mid = Math.ceil(words.length / 2);
                    const line1 = words.slice(0, mid).join(" ");
                    const line2 = words.slice(mid).join(" ");
                    return line2 ? <>{line1}<br />{line2}</> : <>{line1}</>;
                })()}
            </h4>

            <div
                className="text-white text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.acf.description }}
            />

        </div>

    </div>
);

/* CARD APPLE */

const CardApple = ({ children }: { children: React.ReactNode }) => {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (

        <motion.div
            onMouseMove={(e) => {

                const rect = e.currentTarget.getBoundingClientRect();

                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);

            }}
            className="group relative h-[340px] p-8 rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden"
        >

            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition"
                style={{
                    background: useMotionTemplate`
          radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(181,147,74,0.1), transparent 80%)
          `
                }}
            />

            {children}

        </motion.div>

    );
};
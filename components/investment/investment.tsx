"use client";

import React, { useLayoutEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useInView } from "framer-motion";
import { Investment } from "@/lib/wordpress.d";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cohete from "./cohete";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useState } from "react";
import AppleCards from "@/components/ui/apple-cards";

gsap.registerPlugin(ScrollTrigger);

interface InvestmentsSectionProps {
    main?: string;
    secondary?: string;
    highlight?: string;
    title?: string;
    description?: string;
    investment: Investment[];
    cta?: string;
    cta_url?: string;
}

export default function InvestmentSection({
    main,
    secondary,
    highlight,
    title,
    description,
    investment,
    cta,
    cta_url
}: InvestmentsSectionProps) {

    if (!investment?.length) return null;


    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const extraRef = useRef<HTMLDivElement>(null);
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    useLayoutEffect(() => {

        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("all", () => {

            const ctx = gsap.context(() => {

                gsap.fromTo(contentRef.current,
                    {
                        opacity: 0,
                        scale: 0.98,
                        filter: "blur(4px)"
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: true,
                        }
                    }
                );

                const mainTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        anticipatePin: 1,
                        start: "top top",
                        end: "+=400%",
                        scrub: 1.2,
                    }
                });

                // INITIAL STATES (BIO STYLE)
                gsap.set(extraRef.current, { opacity: 0, scale: 1.15, filter: "blur(15px)", pointerEvents: "none" });
                gsap.set(mainContentRef.current, { opacity: 0, scale: 1.15, filter: "blur(15px)", pointerEvents: "none" });

                // ETAPA 1: REVEAL INTRO (extraRef)
                mainTl.to(extraRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    pointerEvents: "auto",
                    duration: 1.5,
                    ease: "power2.inOut"
                })
                    .to({}, { duration: 1 }) // HOLD
                    .to(extraRef.current, {
                        opacity: 0,
                        scale: 0.85,
                        filter: "blur(15px)",
                        pointerEvents: "none",
                        duration: 1.5,
                        ease: "power2.inOut"
                    });

                // ETAPA 2: REVEAL MAIN CONTENT
                mainTl.to(mainContentRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    pointerEvents: "auto",
                    duration: 1.5,
                    ease: "power2.inOut"
                });

                // ETAPA 3: ENTRADA DE LAS CARDS (Sincronizada con el final de reveal)
                mainTl.fromTo(".investment-card",
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out"
                    },
                    ">-=0.5"
                );

                // ETAPA 4: DESAPARECE CAROUSEL Y APARECE CTA
                mainTl.to(containerRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power2.inOut"
                }, ">+=0.5")
                    .fromTo(ctaRef.current,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            pointerEvents: "auto",
                            duration: 1,
                            ease: "power2.out"
                        },
                        ">"
                    )
                    .to({}, { duration: 1 });


            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();

    }, []);

    return (

        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-campana-bg-about"
        >

            {/* PABLO IMAGE */}
            <div
                className="absolute inset-0 top-0 lg:right-0 lg:left-auto lg:h-screen lg:w-auto z-0 lg:z-50 pointer-events-none overflow-hidden"
            >
                <Image
                    src="/assets/pabloInvestment.png"
                    alt="Pablo Story"
                    width={1920 * 3}
                    height={1080 * 3}
                    className="w-auto h-screen scale-[1.4] object-cover object-top-left opacity-30 lg:opacity-100"
                />
            </div>

            {/* CONTENT */}

            <div
                ref={contentRef}
                className="relative z-20 max-w-screen mx-auto h-screen flex flex-col justify-center items-center"
            >
                <div
                    ref={extraRef}
                    className="absolute inset-0 flex flex-col justify-center text-white w-full md:max-w-3xl right-20 mx-auto z-30 pointer-events-none px-4 md:px-0 "
                >
                    {main && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            className="text-campana-primary font-inter font-bold uppercase block mb-4 text-left"
                        >
                            {main}
                        </motion.span>
                    )}

                    {secondary && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-campana-primary text-5xl md:text-6xl lg:text-7xl font-sans font-normal leading-[0.9] tracking-tighter mb-10 text-left"
                        >
                            {(() => {
                                const words = secondary.split(" ");
                                const lastWord = words.pop();
                                return (
                                    <>
                                        {words.join(" ")}{" "}
                                        <span className="font-ivy-presto italic">
                                            {lastWord}
                                        </span>
                                    </>
                                );
                            })()}
                        </motion.h2>
                    )}
                </div>

                <div
                    ref={mainContentRef}
                    className="w-full flex flex-col items-center justify-center h-full pt-10"
                >
                    <div className="w-full md:w-3/4 mx-auto px-6 text-center flex flex-col items-center justify-center gap-8 pb-10">

                        {highlight && (
                            <span className="text-campana-primary text-xl font-sans font-normal tracking-tighter uppercase flex items-center justify-center gap-2 lining-nums">
                                {highlight}
                            </span>
                        )}

                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 }}
                                className="text-campana-primary text-4xl md:text-5xl lg:text-5xl font-sans font-normal mb-0 text-center leading-[0.9] tracking-tighter lining-nums w-full md:w-4xl mx-auto"
                            >
                                {(() => {
                                    const words = title.split(" ");
                                    const lastWord = words.pop();
                                    return (
                                        <>
                                            {words.join(" ")}{" "}
                                            <span className="font-ivy-presto italic  transition-all">
                                                {lastWord}
                                            </span>
                                        </>
                                    );
                                })()}
                            </motion.h2>
                        )}
                        {description && (
                            <p
                                className="text-[#001D3D] text-base md:text-lg w-full md:w-2xl mx-auto tracking-tight leading-5 font-sans font-normal"
                                style={{
                                    textAlign: "justify",
                                    textAlignLast: "center",
                                    textJustify: "inter-word"
                                }}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}

                    </div>

                    <div className="relative w-full md:max-w-7xl mx-auto ml-0 self-start h-[450px]">
                        <div
                            ref={containerRef}
                            className="relative w-full h-full overflow-hidden"
                        >
                            <div className="absolute inset-y-0 left-0 w-10 md:w-32 bg-linear-to-r from-campana-bg-about to-transparent z-30 pointer-events-none" />
                            <div className="absolute inset-y-0 right-0 w-10 md:w-32 bg-linear-to-l from-campana-bg-about to-transparent z-30 pointer-events-none" />

                            <AppleCards
                                pause={false}
                                className="[--duration:40s] [--gap:2rem] h-full"
                            >
                                {investment.map((item) => (
                                    <div key={item.id} className="investment-card min-w-[300px] md:min-w-[400px] max-w-[320px] md:max-w-[420px] h-full flex items-center">
                                        <CardApple>
                                            <CardContent item={item} />
                                        </CardApple>
                                    </div>
                                ))}
                            </AppleCards>
                        </div>

                        {/* CTA — aparece sola tras el contenido del carrusel */}
                        <div
                            ref={ctaRef}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 pointer-events-none opacity-0"
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
                    </div>
                </div>

            </div>

        </section>
    );
}

/* CARD CONTENT */

const CardContent = ({ item }: { item: Investment }) => (
    <div className="relative flex flex-col h-full overflow-hidden">

        {/* NÚMERO DE FONDO — watermark grande y opaco */}
        <span
            className="absolute top-0 right-0 text-[10rem] md:text-[18rem] font-anton font-black text-campana-secondary/50 leading-none select-none pointer-events-none"
            aria-hidden="true"
        >
            {item.acf.highlight}
        </span>

        {/* CONTENIDO — sobrepuesto al número */}
        <div className="relative z-10 flex flex-col h-full justify-end">

            {/* TÍTULO — altura fija */}
            <span className="text-2xl md:text-3xl font-sans font-normal text-white mb-3 leading-tight h-[80px]">
                {(() => {
                    const words = item.acf.title.split(" ");
                    const lastWord = words.pop();
                    const remaining = words;

                    const mid = Math.ceil(remaining.length / 2);
                    const line1 = remaining.slice(0, mid).join(" ");
                    const line2 = remaining.slice(mid).join(" ");

                    return (
                        <>
                            {line1}
                            <br />
                            {line2}{" "}
                            <span className="font-ivy-presto italic transition-all">
                                {lastWord}
                            </span>
                        </>
                    );
                })()}
            </span>

            {/* DESCRIPCIÓN */}
            <div
                className="text-white text-sm leading-relaxed line-clamp-6 break-words w-full"
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
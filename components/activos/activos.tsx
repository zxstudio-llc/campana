"use client"

import { Showcase } from "./components/showcase"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ActivoEstrategico } from "@/lib/wordpress.d"
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "motion/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}


interface Props {
    id?: string;
    highlight?: string
    title?: string
    description?: string
    activos: ActivoEstrategico[]
}

export function ActivosSection({
    id,
    highlight,
    title,
    description,
    activos,
}: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [canStartTicker, setCanStartTicker] = useState(false);
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });
    const [tickerKey, setTickerKey] = useState(0);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(contentRef.current, {
                opacity: 0,
                scale: 1.08,
                y: 60,
                filter: "blur(10px)"
            });

            gsap.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    setTickerKey(prev => prev + 1);
                    setCanStartTicker(true);
                },
                onEnterBack: () => {
                    setTickerKey(prev => prev + 1);
                    setCanStartTicker(true);
                }
            });

            if (descriptionRef.current) {
                ScrollTrigger.create({
                    trigger: descriptionRef.current,
                    start: "top 10%",
                    end: () => `+=${window.innerHeight}`,
                    pin: sectionRef.current,
                    pinSpacing: true,
                    anticipatePin: 1,
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!Array.isArray(activos)) return null;
    const activosOrdenados = [...activos].sort((a, b) => a.id - b.id);
    const content = activosOrdenados.map((item) => {
        const rawAmount = item.acf?.amount || ""

        const numericValue = Number(
            rawAmount.replace(/[^0-9]/g, "")
        )

        const hasDollar = rawAmount.includes("$")
        const hasPlus = rawAmount.includes("+")
        const hasK = rawAmount.toUpperCase().includes("K")
        const hasM = rawAmount.toUpperCase().includes("M")

        return {
            title: item.acf?.title,
            description: item.acf?.description,
            renderContent: (
                <>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-baseline">
                            {hasDollar && (
                                <span className="text-white text-[120px] md:text-[200px] font-bold">
                                    $
                                </span>
                            )}

                            {hasPlus && (
                                <span className="text-white text-[120px] md:text-[200px] font-bold">
                                    +
                                </span>
                            )}

                            <NumberTicker
                                key={tickerKey}
                                value={numericValue}
                                start={canStartTicker}
                                className="text-[120px] md:text-[200px] font-bold tracking-tighter text-white leading-none"
                            />

                            {hasK && (
                                <span className="text-white text-[120px] md:text-[200px] font-bold">
                                    K
                                </span>
                            )}

                            {hasM && (
                                <span className="text-white text-[120px] md:text-[200px] font-bold">
                                    M
                                </span>
                            )}
                        </div>
                    </div>
                </>
            ),
        }
    })

    return (
        <section
            id={id}
            ref={sectionRef}
            className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center z-50 bg-transparent md:px-28"
        >
            <div
                ref={contentRef}
                className="w-full flex flex-col items-center mb-20 md:mb-28"
            >
                <div className="w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-8 md:gap-12 pb-10 md:pb-30 overflow-hidden">
                    {highlight && (
                        <span className="text-campana-secondary text-sm md:text-lg font-sans font-normal tracking-tighter uppercase flex items-center justify-center gap-2 lining-nums">
                            {highlight}
                        </span>
                    )}

                    {title && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-white text-4xl md:text-5xl lg:text-8xl font-sans font-normal mb-0 text-center leading-[0.9] tracking-tighter lining-nums w-full md:w-4xl mx-auto"
                        >
                            {(() => {
                                const words = title.split(" ");
                                const lastWord = words.pop();
                                return (
                                    <>
                                        {words.join(" ")}{" "}
                                        <span className="font-ivy-presto italic capitalize transition-all">
                                            {lastWord}
                                        </span>
                                    </>
                                );
                            })()}
                        </motion.h2>
                    )}
                    {description && (
                        <p
                            ref={descriptionRef}
                            className="text-white text-base md:text-lg w-full md:w-md mx-auto tracking-tight leading-5 font-sans font-normal"
                            style={{
                                textAlign: "justify",
                                textAlignLast: "center",
                                textJustify: "inter-word"
                            }}
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}
                </div>

                <Showcase content={content} />
            </div>
        </section>
    )
}
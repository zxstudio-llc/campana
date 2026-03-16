"use client"

import { Showcase } from "./components/showcase"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ActivoEstrategico } from "@/lib/wordpress.d"
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}


interface Props {
    title?: string
    description?: string
    activos: ActivoEstrategico[]
}

export function ActivosSection({
    title,
    description,
    activos,
}: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [canStartTicker, setCanStartTicker] = useState(false);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            gsap.set(contentRef.current, {
                opacity: 0,
                scale: 1.08,
                y: 60,
                filter: "blur(10px)"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => setCanStartTicker(true)
            });

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
                <div className="flex flex-col items-center">
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
            ),
        }
    })

    return (
        <section
            ref={sectionRef}
            className="relative w-screen h-screen overflow-hidden flex items-center justify-center z-50 bg-transparent  md:px-28"
        >
            <div
                ref={contentRef}
                className="w-full flex flex-col items-center"
            >
                <div className="max-w-screen mx-auto text-center">


                    {description && (
                        <p className="text-campana-secondary text-base md:text-lg font-medium uppercase">
                            {description}
                        </p>
                    )}
                    <h2 className="text-white text-5xl md:text-8xl font-black uppercase leading-tight">
                        {title}
                    </h2>
                </div>

                <Showcase content={content} />
            </div>
        </section>
    )
}
"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { OurValues } from "@/lib/wordpress.d";

interface Props {
    title?: string;
    description?: string;
    values: OurValues[];
}

const ValorCard = ({
    nombre,
    desc,
}: {
    nombre: string;
    desc: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-72 overflow-hidden rounded-3xl p-8",
                "bg-white/10 backdrop-blur-xl border border-white/10",
                "shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]",
                "transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                "hover:bg-white/80 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1 text-white hover:text-[#001D3D]"
            )}
        >
            <div className="flex flex-col gap-4">
                <div className="h-[3px] w-10 bg-[#f1ba0a] rounded-full" />

                <figcaption className="text-2xl font-semibold tracking-[-0.02em]">
                    {nombre}
                </figcaption>

                <blockquote className="text-[15px] leading-relaxed tracking-tight font-medium">
                    {desc}
                </blockquote>
            </div>
        </figure>
    );
};

export function OurValueSection({
    title,
    description,
    values,
}: Props) {
    return (
        <section className="py-24 min-h-screen flex flex-col justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-16 overflow-hidden">

                {title && (
                    <div className="w-full flex justify-center mb-8 md:mb-10">
                        <h2 className="text-white text-center text-5xl md:text-8xl font-black uppercase">
                            {title}
                        </h2>
                    </div>
                )}

                {description && (
                    <div className="w-full max-w-4xl mx-auto">
                        <p className="text-white text-lg md:text-xl font-semibold text-center">
                            {description.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.03,
                                    }}
                                >
                                    {word}{" "}
                                </motion.span>
                            ))}
                        </p>
                    </div>
                )}
            </div>

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:50s] py-4">
                    {values.map((valor) => (
                        <ValorCard
                            key={valor.id}
                            nombre={valor.acf.title}
                            desc={valor.acf.description}
                        />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
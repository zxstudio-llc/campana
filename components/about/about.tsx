"use client";

import { motion } from "motion/react";
import { VideoVipSection } from "./components/video-section";
import { AboutSection } from "@/lib/wordpress.d";

interface AboutUsProps {
    about: AboutSection
}

export function AboutUsSection({ about }: AboutUsProps) {
    const titleParts = about.title?.split(" ") ?? []

    return (
        <div className="relative mx-auto flex max-w-full flex-col items-center justify-center overflow-hidden h-screen bg-campana-bg">
            <div className="px-20 md:px-24 py-2 md:py-20 flex flex-col lg:flex-row-reverse items-center gap-2 md:gap-4 md:max-w-screen">

                {/* TEXTO - Viene desde la izquierda */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left px-6 md:px-0 w-full lg:w-1/2"
                >
                    {about.highlight && (
                        <span className="text-campana-secondary text-lg md:text-xl font-bold tracking-[0.2em] uppercase mb-2">
                            {about.highlight}
                        </span>
                    )}

                    <h1 className="text-campana-primary text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] flex gap-4 uppercase">
                        {titleParts.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    {about.subtitle && (
                        <motion.h2
                            className="text-2xl md:text-4xl font-bold tracking-tighter leading-[0.9] text-campana-primary mt-4 flex flex-wrap gap-x-3"
                            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {about.subtitle}
                        </motion.h2>
                    )}

                    <div className="flex flex-col gap-2 w-full mt-4 space-y-4">

                        <p className="text-campana-primary leading-6 text-xl md:text-2xl font-bold tracking-tight text-center md:text-justify md:[text-justify:inter-word] md:[text-align-last:left]">
                            {about.short_description?.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.04,
                                        ease: "easeOut"
                                    }}
                                    className="inline"
                                >
                                    {word}{" "}
                                </motion.span>
                            ))}
                        </p>

                        {about.description && (
                            <div className="text-campana-primary/80 leading-5 tracking-tight text-md md:text-lg text-justify [text-justify:inter-word] md:[text-align-last:left] [text-align-last:center] px-4 md:px-0">
                                <motion.p
                                    initial={{ opacity: 0, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                                >
                                    {about.description}
                                </motion.p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* IMAGEN - VIDEO */}
                <div className="w-full lg:w-1/2">
                    {about.video_link && (
                        <VideoVipSection videoUrl={about.video_link} />
                    )}
                </div>
            </div>
        </div>
    );
}
"use client";

import { motion } from "motion/react";
import { VideoVipSection } from "./components/video-section";
import { AboutSection } from "@/lib/wordpress.d";
import { ContainerScroll } from "./components/container-scroll-animation";

interface AboutUsProps {
    about: AboutSection
}

export function AboutUsSection({ about }: AboutUsProps) {
    const titleParts = about.title?.split(" ") ?? []

    return (
        <section className="relative w-full bg-campana-bg z-0 overflow-visible">
            <div className="relative z-20 w-full px-6 md:px-20 overflow-visible">
                <div className="max-w-7xl mx-auto overflow-visible">
                    <ContainerScroll
                        titleComponent={
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="flex flex-col items-center text-center px-6 md:px-0 w-full"
                                >
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

                                    <h1 className="text-campana-primary text-5xl md:text-9xl font-black tracking-[-0.05em] leading-[0.85] flex gap-4 uppercase">
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
                                </motion.div>
                            </>
                        }
                    >
                        {about.mux_playback_id && (
                            <VideoVipSection playbackId={about.mux_playback_id} />
                        )}
                    </ContainerScroll>
                </div>
            </div>
        </section>
    );
}
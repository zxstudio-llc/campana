"use client"

import { useRef, useLayoutEffect, useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { Biography } from "@/lib/wordpress.d"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useInView } from "motion/react"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface Props {
    highlight: string
    short_description: string
    description: string
    biography: Biography
}

export default function BiographyCompany({ highlight, short_description, description, biography }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const bgImageRef = useRef<HTMLImageElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const extraRef = useRef<HTMLDivElement>(null)
    const firstTextRef = useRef<HTMLSpanElement>(null)
    const secondTextRef = useRef<HTMLSpanElement>(null)
    const collisionContainerRef = useRef<HTMLDivElement>(null)
    const bgLayerRef = useRef<HTMLDivElement>(null)
    const scrollOverlayRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false)
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    const data = biography.acf.biography

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            console.log("GLOBAL CLICK AT:", e.clientX, e.clientY,
                "Target Tag:", target?.tagName,
                "Target Classes:", target?.className,
                "PointerEvents Style:", window.getComputedStyle(target).pointerEvents);
        };
        window.addEventListener("click", handleGlobalClick);
        return () => window.removeEventListener("click", handleGlobalClick);
    }, []);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const bgPlaybackId = biography.acf.main_photo;

    useLayoutEffect(() => {
        if (!sectionRef.current || !textRef.current || !containerRef.current || !extraRef.current) return

        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const { isMobile } = context.conditions as any;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: 1.2,
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                    pinType: "transform"
                },
            })

            gsap.set(textRef.current, { opacity: 0, scale: 1.15, filter: "blur(15px)", pointerEvents: "none" })
            gsap.set(extraRef.current, { opacity: 0, scale: 1.15, filter: "blur(15px)", pointerEvents: "none" })
            gsap.set(overlayRef.current, { backdropFilter: "blur(0px)", opacity: 0 })
            gsap.set(bgLayerRef.current, { opacity: 0 })

            gsap.set(bgImageRef.current, { opacity: 0, scale: 1.1 })
            gsap.set(firstTextRef.current, { y: -250, opacity: 0 })
            gsap.set(secondTextRef.current, { y: 250, opacity: 0 })
            gsap.set(collisionContainerRef.current, { scale: 1, opacity: 0 })
            gsap.set(scrollOverlayRef.current, { opacity: 0 });

            tl.to(bgLayerRef.current, {
                opacity: 1,
                duration: 2.5,
                ease: "none"
            }, 0)
                .to(collisionContainerRef.current, {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out"
                }, 0)
                .to(firstTextRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power4.out"
                }, 0.2)
                .to(secondTextRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power4.out"
                }, 0.2)
                .to(bgImageRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out"
                }, 0.5)
                .to(overlayRef.current, {
                    opacity: 1,
                    backgroundColor: "rgba(0,0,0,0.65)",
                    duration: 3,
                    ease: "power2.out"
                })
                .to(textRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    pointerEvents: "auto",
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "-=1")
                .to({}, { duration: 1.5 })
                .to(textRef.current, {
                    opacity: 0,
                    scale: 0.85,
                    filter: "blur(15px)",
                    pointerEvents: "none",
                    duration: 1.5,
                    ease: "power2.inOut"
                })
                .to(extraRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    pointerEvents: "auto",
                    duration: 1.5,
                    ease: "power2.inOut"
                })
                .to({}, { duration: 1.5 })
                .to(extraRef.current, {
                    opacity: 0,
                    scale: 0.85,
                    filter: "blur(15px)",
                    pointerEvents: "none",
                    duration: 1.5,
                    ease: "power2.out"
                })
                .to(scrollOverlayRef.current, {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut"
                })
                .to({}, { duration: 1 }) // Final buffer
        });

        return () => mm.revert()
    }, [])

    return (
        <>
            <section
                ref={sectionRef}
                className="relative w-full h-screen flex items-center z-40 overflow-hidden"
            >
                {/* GRADIENT BACKGROUND THAT FADES IN OVER HERO */}
                <div
                    ref={bgLayerRef}
                    className="absolute inset-0 bg-linear-to-b from-black to-campana-bg-hover pointer-events-none"
                />

                <div
                    ref={containerRef}
                    className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
                >
                    <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-12 items-center">

                        {/* TEXT LEFT */}
                        <div className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center ">
                            <div
                                ref={collisionContainerRef}
                                className="relative w-full h-[300px] md:h-[500px] lg:h-[800px] flex justify-center lg:justify-start mt-10"
                            >
                                <span
                                    ref={firstTextRef}
                                    className="absolute top-0 text-white text-[120px] md:text-[250px] lg:text-[280px] font-anton uppercase leading-none tracking-tighter antialiased z-20 -mt-6"
                                    style={{ WebkitFontSmoothing: "antialiased" }}
                                >
                                    {biography.acf.first_text}
                                </span>
                                <span
                                    ref={secondTextRef}
                                    className="absolute top-[85px] md:top-[180px] lg:top-[200px] text-white text-[180px] md:text-[400px] lg:text-[630px] font-anton uppercase leading-none tracking-tighter antialiased z-10"
                                    style={{ WebkitFontSmoothing: "antialiased" }}
                                >
                                    {biography.acf.second_text}
                                </span>
                            </div>
                        </div>

                        {/* IMAGE RIGHT */}
                        <div className="lg:col-span-5 h-[60vh] lg:h-full relative w-full" ref={bgImageRef}>
                            {bgPlaybackId && (
                                <Image
                                    src={bgPlaybackId}
                                    alt="CEO Background"
                                    fill
                                    priority
                                    unoptimized={true}
                                    className="object-contain object-bottom-right pointer-events-none"
                                />
                            )}
                        </div>
                    </div>

                    <div
                        ref={overlayRef}
                        className="absolute inset-0 z-0 pointer-events-none select-none bg-gradient-to-r from-black via-black/40 via-black/60 via-transparent to-transparent"
                    />
                </div>

                <div className="relative z-[100] w-full px-6 md:px-20 pointer-events-auto">
                    <div className="max-w-7xl mx-auto items-center">

                        <div className="w-full relative flex items-center min-h-[60vh]">
                            {/*BLOCK 1: PRIMARY BIOGRAPHY */}
                            <div
                                ref={textRef}
                                className="flex flex-col text-white py-10 max-w-2xl relative z-40"
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    className="text-campana-secondary font-bold tracking-[0.2em] uppercase block mb-4 text-center md:text-left"
                                >
                                    {data.highlight}
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl md:text-8xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-10 text-center md:text-left"
                                >
                                    {data.title}
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 }}
                                    className="text-white text-base md:text-lg leading-normal space-y-4 reveal-description font-normal"
                                    style={{
                                        textAlign: "justify",
                                        textAlignLast: "left",
                                        textJustify: "inter-word"
                                    }}
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 }}
                                    className="text-right py-4"
                                >
                                    <p className="text-2xl font-bold mb-2 italic text-white leading-none">
                                        {data.name}
                                    </p>
                                    <p className="text-campana-secondary text-sm md:text-sm uppercase font-bold italic">
                                        {data.role}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isVisible ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.6 }}
                                    className="mt-8 flex flex-col sm:flex-row items-center gap-10"
                                >
                                    {data.cta && data.mux_playback_id && (
                                        <Modal>
                                            <ModalTrigger asChild>
                                                <Button
                                                    type="button"
                                                    className="
                                                    px-6 py-6 hover:bg-campana-secondary group rounded-full 
                                                    bg-white w-full md:w-fit transition-all hover:scale-105 
                                                    active:scale-95 flex items-center justify-center gap-4 
                                                    cursor-pointer text-campana-primary hover:text-white relative z-50
                                                "
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-semibold">{data.cta}</span>
                                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-campana-primary text-white">
                                                            <Play size={16} fill="currentColor" />
                                                        </div>
                                                    </div>
                                                </Button>
                                            </ModalTrigger>
                                            <ModalBody>
                                                <ModalContent className="max-w-6xl p-0 overflow-hidden bg-black flex flex-col rounded-3xl">
                                                    <video
                                                        autoPlay
                                                        controls
                                                        playsInline
                                                        className="w-full aspect-video object-cover"
                                                    >
                                                        <source src={data.mux_playback_id} type="video/mp4" />
                                                    </video>
                                                </ModalContent>
                                            </ModalBody>
                                        </Modal>
                                    )}
                                </motion.div>
                            </div>

                            {/* BLOCK 2: EXTRA FIELDS (AFTER BIOGRAPHY) */}
                            <div
                                ref={extraRef}
                                className="absolute inset-0 flex flex-col justify-center text-white max-w-6xl z-30 pointer-events-none"
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    className="text-campana-secondary font-bold tracking-[0.2em] uppercase block mb-4 text-center md:text-left"
                                >
                                    {highlight}
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-black leading-none uppercase mb-10 text-center md:text-left"
                                >
                                    {short_description}
                                </motion.h2>


                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 }}
                                    className="hidden text-neutral-300 text-base md:text-lg leading-normal space-y-4 reveal-description font-light"
                                    style={{
                                        textAlign: "justify",
                                        textAlignLast: "left",
                                        textJustify: "inter-word"
                                    }}>
                                    {description}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={scrollOverlayRef}
                        className="absolute inset-0 z-[110] pointer-events-none bg-transparent opacity-0"
                    />
                </div>
            </section >
            {/* SPACER TO ALLOW 500% PIN DURATION. Bio(100vh) + Spacer(400vh) = 500vh offset for About */}
            <div className="h-[400vh] pointer-events-none" />
        </>
    )
}
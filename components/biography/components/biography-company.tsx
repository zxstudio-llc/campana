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
    const imageRef = useRef<HTMLDivElement>(null)
    const videoContainerRef = useRef<HTMLDivElement>(null)
    const photoContainerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const extraRef = useRef<HTMLDivElement>(null)

    const [isMobile, setIsMobile] = useState(false)
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    const data = biography.acf.biography
    const photo = biography.acf.photo

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

    const bgPlaybackId = isMobile
        ? (biography.acf.mux_playback_mobile_id || biography.acf.mux_playback_web_id)
        : (biography.acf.mux_playback_web_id || biography.acf.mux_playback_mobile_id);

    const photoPlaybackId = isMobile
        ? (biography.acf.photo_mobile || biography.acf.photo)
        : (biography.acf.photo || biography.acf.photo_mobile);

    useLayoutEffect(() => {
        if (!sectionRef.current || !textRef.current || !imageRef.current || !extraRef.current) return

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
                    pinSpacing: true,
                    anticipatePin: 1,
                },
            })

            gsap.set(textRef.current, { opacity: 0, y: isMobile ? 120 : 180, pointerEvents: "auto" })
            gsap.set(extraRef.current, { opacity: 0, y: isMobile ? 80 : 120, pointerEvents: "none" })
            gsap.set(overlayRef.current, { backdropFilter: "blur(0px)", opacity: 0 })

            gsap.set(videoContainerRef.current, { opacity: 1, scale: 1 })
            gsap.set(photoContainerRef.current, { opacity: 0, scale: 1.1 })

            tl.to(overlayRef.current, {
                backdropFilter: "blur(10px)",
                opacity: 1,
                backgroundColor: "rgba(0,0,0,0.65)",
                duration: 3,
                ease: "none"
            })
                .to(videoContainerRef.current, {
                    scale: 1.15,
                    opacity: 0,
                    duration: 2,
                    ease: "none"
                }, "-=1")
                .to(photoContainerRef.current, {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 2,
                    ease: "none"
                }, "<")
                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }, "-=1")
                .to({}, { duration: 1.5 })
                .to({}, { duration: 1.2 })
                .to(textRef.current, {
                    opacity: 0,
                    y: isMobile ? -60 : -100,
                    filter: "blur(10px)",
                    pointerEvents: "none",
                    duration: 0.9,
                    ease: "power2.inOut"
                })
                .to(extraRef.current, {
                    opacity: 1,
                    y: 0,
                    pointerEvents: "auto",
                    duration: 1,
                    ease: "power3.out"
                })
                .to({}, { duration: 1.2 })
                .to(extraRef.current, {
                    opacity: 0,
                    y: -80,
                    filter: "blur(10px)",
                    pointerEvents: "none",
                    duration: 1,
                    ease: "power2.out"
                })
                .to(imageRef.current, {
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power2.out"
                }, "<")
        });

        return () => mm.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-svh overflow-hidden bg-black flex items-center z-50"
        >
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full z-0 overflow-hidden"
            >
                {bgPlaybackId && (
                    <div ref={videoContainerRef} className="absolute inset-0 w-full h-full pointer-events-none">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full inset-0 z-10 object-cover pointer-events-none"
                            style={{ width: '100%', height: '100%', background: 'transparent' }}
                        >
                            <source src={bgPlaybackId} type="video/mp4" />
                        </video>
                    </div>
                )}
                {photoPlaybackId && (
                    <div ref={photoContainerRef} className="absolute inset-0 w-full h-full pointer-events-none">
                        <Image
                            src={photoPlaybackId}
                            alt="CEO Background"
                            fill
                            priority
                            className="object-cover pointer-events-none"
                        />
                    </div>
                )}

                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-0 pointer-events-none select-none"
                />
            </div>

            <div className="relative z-30 w-full px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 items-center">

                    <div className="lg:col-span-7 relative flex items-center min-h-[60vh]">
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
                                className="text-neutral-300 text-base md:text-lg leading-normal space-y-4 reveal-description font-light"
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
                            className="absolute inset-0 flex flex-col justify-center text-white max-w-2xl z-30"
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
                                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] uppercase mb-10 text-center md:text-left"
                            >
                                {short_description}
                            </motion.h2>


                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 }}
                                className="text-neutral-300 text-base md:text-lg leading-normal space-y-4 reveal-description font-light"
                                style={{
                                    textAlign: "justify",
                                    textAlignLast: "left",
                                    textJustify: "inter-word"
                                }}>
                                {description}
                            </motion.div>
                        </div>
                    </div>

                    <div className="hidden lg:col-span-5 h-full" />
                </div>
            </div>
        </section>
    )
}
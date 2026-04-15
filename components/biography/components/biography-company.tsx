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
    id?: string
    highlight: string
    short_description: string
    description: string
    biography: Biography
}

export default function BiographyCompany({ id, highlight, short_description, description, biography }: Props) {
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

    const currentImage = isMobile && biography.acf.secondary_photo
        ? biography.acf.secondary_photo
        : biography.acf.main_photo;

    useLayoutEffect(() => {
        if (!sectionRef.current || !textRef.current || !containerRef.current || !extraRef.current) return

        ScrollTrigger.normalizeScroll(true);

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
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Crucial para mobile
                },
            })

            // ESTADOS INICIALES
            gsap.set(textRef.current, { opacity: 0, scale: 1.15, filter: "blur(15px)", pointerEvents: "none" })
            gsap.set(extraRef.current, { opacity: 0, scale: 1.15, filter: "blur(15px)", pointerEvents: "none" })
            gsap.set(overlayRef.current, { backdropFilter: "blur(0px)", opacity: 0 })
            gsap.set(bgLayerRef.current, { opacity: 0 })
            gsap.set(bgImageRef.current, { opacity: 0, scale: 1.1 })
            gsap.set(firstTextRef.current, { y: -250, opacity: 0 })
            gsap.set(secondTextRef.current, { y: 250, opacity: 0 })
            gsap.set(collisionContainerRef.current, { scale: 1, opacity: 0 })
            gsap.set(scrollOverlayRef.current, { opacity: 0 });

            // TIMELINE
            tl.to(bgLayerRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "none"
            }, 0)
                .to(extraRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    pointerEvents: "auto",
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 0.5)
                .to({}, { duration: 1.5 })
                .to(extraRef.current, {
                    opacity: 0,
                    scale: 0.85,
                    filter: "blur(15px)",
                    pointerEvents: "none",
                    duration: 1.5,
                    ease: "power2.out"
                })
                .add("block1Reveal")
                .to(bgImageRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out"
                }, "block1Reveal")
                .to(scrollOverlayRef.current, {
                    opacity: isMobile ? 1 : 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "block1Reveal")
                .to(textRef.current, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    pointerEvents: "auto",
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "block1Reveal")

                .to({}, { duration: 1.5 }) // Pausa lectura

                .add("textExit")
                .to(textRef.current, {
                    opacity: 0,
                    scale: 0.85,
                    filter: "blur(15px)",
                    pointerEvents: "none",
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "textExit")
                .to(scrollOverlayRef.current, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "textExit")
                .add("block2Reveal")
                .to(collisionContainerRef.current, {
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out"
                }, "block2Reveal")
                .to(firstTextRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power4.out"
                }, "block2Reveal+=0.2")
                .to(secondTextRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power4.out"
                }, "block2Reveal+=0.2")
                .to({}, { duration: 1 })
        });

        return () => mm.revert()
    }, []) // Dejamos vacío para que mm.add maneje la lógica interna

    return (
        <>
            <section
                id={id}
                ref={sectionRef}
                className="relative w-full h-screen flex items-center z-40 overflow-hidden"
            >
                <Image
                    src="/assets/bggradient.png"
                    alt="Background Gradient"
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover absolute inset-0 -z-10 pointer-events-none"
                />
                {/* GRADIENT BACKGROUND THAT FADES IN OVER HERO */}

                <div
                    ref={containerRef}
                    className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
                >
                    <div
                        ref={scrollOverlayRef}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 pointer-events-none md:hidden"
                    />

                    {/* EXTRA FIELDS*/}
                    <div
                        ref={extraRef}
                        className="absolute inset-0 flex flex-col justify-center text-white max-w-7xl mx-auto z-30 pointer-events-none px-8 md:px-0"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            className="text-campana-secondary font-inter font-bold uppercase block mb-4 text-left"
                        >
                            {highlight}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-[3.2rem] md:text-6xl lg:text-7xl font-sans font-normal leading-[0.9] tracking-tighter mb-10 text-left"
                        >
                            {(() => {
                                const words = short_description.split(" ");
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
                    <div className="mx-auto h-full grid grid-cols-1 lg:grid-cols-12 lg:items-center px-0 pt-2 relative">
                        {/* IMAGE LEFT */}
                        <div className="lg:col-span-5 h-[65vh] lg:h-full absolute bottom-0 left-0 lg:relative w-full z-10 pointer-events-none" ref={bgImageRef}>
                            {currentImage && (
                                <Image
                                    key={currentImage}
                                    src={currentImage}
                                    alt="CEO Background"
                                    fill
                                    priority
                                    unoptimized={true}
                                    className="w-auto h-screen scale-[1.2] object-contain object-bottom-left pointer-events-none"
                                />
                            )}
                        </div>

                        {/* TEXT RIGHT */}
                        <div className="lg:col-span-7 flex flex-col items-start lg:items-start justify-center relative w-full h-full lg:h-auto">
                            <div className="absolute inset-0 w-full h-full flex justify-start lg:justify-start items-center mt-10 lg:mt-0 pointer-events-none z-40">
                                {/*BLOCK 1: PRIMARY BIOGRAPHY */}
                                <div
                                    ref={textRef}
                                    className="flex flex-col text-white px-8 md:px-0 py-10 md:max-w-4xl relative pointer-events-auto left-0 md:-left-10"
                                >
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                        className="text-campana-secondary font-inter font-bold uppercase block mb-4 text-center md:text-left"
                                    >
                                        {data.highlight}
                                    </motion.span>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.2 }}
                                        className="text-5xl md:text-8xl lg:text-7xl font-sans font-normal tracking-tighter leading-[0.85] mb-10 text-center md:text-left"
                                    >
                                        {(() => {
                                            const words = data.title.split(" ");
                                            const lastWord = words.pop();
                                            return (
                                                <>
                                                    {words.join(" ")}{" "}
                                                    <span className="font-ivy-presto italic inline">
                                                        {lastWord}
                                                    </span>
                                                </>
                                            );
                                        })()}
                                    </motion.h2>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4 }}
                                        className="text-white text-base md:text-lg leading-normal tracking-tighter space-y-4 reveal-description text-right font-inter font-normal md:max-w-3xl"
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
                                        <p className="text-3xl mb-2 font-ivy-presto italic text-white leading-none">
                                            {data.name}
                                        </p>
                                        <p className="text-campana-secondary text-sm md:text-lg font-ivy-presto italic">
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
                            </div>
                            {/* Block 2 */}
                            <div
                                ref={collisionContainerRef}
                                className="relative w-full h-full lg:h-[800px] flex justify-start lg:justify-start items-center mt-10 lg:mt-0"
                            >
                                <span
                                    ref={firstTextRef}
                                    className="
                                        absolute 
                                        top-[5%] md:top-[5%] lg:top-0 
                                        text-white 
                                        text-[130px] md:text-[200px] lg:text-[280px] 
                                        font-anton uppercase leading-none tracking-tighter antialiased 
                                        z-10 -mt-6
                                    "
                                    style={{ WebkitFontSmoothing: "antialiased" }}
                                >
                                    {biography.acf.first_text}
                                </span>
                                <span
                                    ref={secondTextRef}
                                    className="
                                        absolute 
                                        top-[15%] md:top-[30%] lg:top-[200px] 
                                        text-white 
                                        text-[380px] md:text-[380px] lg:text-[630px] 
                                        font-anton uppercase leading-none tracking-tighter antialiased 
                                        z-10
                                    "
                                    style={{ WebkitFontSmoothing: "antialiased" }}
                                >
                                    {biography.acf.second_text}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
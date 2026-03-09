"use client"

import { useRef, useLayoutEffect, useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "../../ui/animated-modal"
import { Maximize2, Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import { Biography } from "@/lib/wordpress.d"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence, motion, useInView } from "motion/react"
import MuxPlayer, { MuxPlayerRefAttributes } from "@mux/mux-player-react"

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
    const overlayRef = useRef<HTMLDivElement>(null)

    const extraRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    const data = biography.acf.biography
    const photo = biography.acf.photo

    const [loadMetrics, setLoadMetrics] = useState({
        startTime: performance.now(),
        metadataTime: 0,
        canPlayTime: 0,
    });

    const playerRef = useRef<MuxPlayerRefAttributes>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLoadedMetadata = () => {
        const time = performance.now() - loadMetrics.startTime;
        setLoadMetrics(prev => ({ ...prev, metadataTime: time }));
        // console.log(`VIDEO METRICS: Metadata loaded in ${(time / 1000).toFixed(2)}s`);
    };

    const handleCanPlay = () => {
        const time = performance.now() - loadMetrics.startTime;
        setLoadMetrics(prev => ({ ...prev, canPlayTime: time }));
        // console.log(`VIDEO METRICS: Ready to play (CanPlay) in ${(time / 1000).toFixed(2)}s`);
    };

    const togglePlay = () => {
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    };

    const seek = (seconds: number) => {
        if (!playerRef.current) return;
        playerRef.current.currentTime += seconds;
    };

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

            gsap.set(textRef.current, { opacity: 0, y: isMobile ? 120 : 180 })
            gsap.set(extraRef.current, { opacity: 0, y: isMobile ? 80 : 120 })
            gsap.set(overlayRef.current, { backdropFilter: "blur(0px)", opacity: 0 })

            // Overlay
            tl.to(overlayRef.current, {
                backdropFilter: "blur(10px)",
                opacity: 1,
                backgroundColor: "rgba(0,0,0,0.55)",
                duration: 4, // Increased from 1 to 4 for a slower "Apple-like" fade
                ease: "none"
            })
                // Biografia entra
                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                })
                // Biografia se mantiene
                .to({}, { duration: 1.2 })
                // Biografia sale
                .to(textRef.current, {
                    opacity: 0,
                    y: isMobile ? -60 : -100,
                    filter: "blur(10px)",
                    duration: 0.9,
                    ease: "power2.inOut"
                })
                // Quienes somos entra
                .to(extraRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                })
                // Quienes somos se mantiene
                .to({}, { duration: 1.2 })
                // salida final
                .to([extraRef.current, imageRef.current], {
                    opacity: 0,
                    filter: "blur(10px)",
                    scale: 0.50,
                    duration: 1,
                    ease: "power2.out"
                })
        });

        return () => mm.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-black flex items-center z-20"
        >
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full z-0 overflow-hidden"
            >
                {bgPlaybackId ? (
                    <div className="relative w-full h-full">
                        <MuxPlayer
                            playbackId={bgPlaybackId}
                            streamType="on-demand"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            maxResolution="2160p"
                            className={`absolute bottom-0 left-1/2 min-w-full min-h-full -translate-x-1/2 pointer-events-none`}
                            style={{
                                width: '200vw',
                                height: '100vh',
                                "--controls": "none",
                                background: 'transparent',
                            } as any}
                        />
                        <div
                            ref={overlayRef}
                            className="absolute inset-0 z-10 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/40 to-transparent z-10" />
                    </div>
                ) : photo?.url && (
                    <div className="relative w-full h-full">
                        <Image
                            src={photo.url}
                            alt={photo.alt || data.name}
                            fill
                            priority
                            sizes="100vw"
                            quality={85}
                            className="object-contain object-bottom-right lg:object-contain lg:object-bottom-right"
                        />
                        <div
                            ref={overlayRef}
                            className="absolute inset-0 z-10 pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent z-0" />
                    </div>
                )}
            </div>

            <div className="relative z-20 w-full px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 items-center">

                    <div className="lg:col-span-7 relative flex items-center min-h-[60vh]">
                        {/*BLOCK 1: PRIMARY BIOGRAPHY */}
                        <div
                            ref={textRef}
                            className="flex flex-col text-white py-10 pointer-events-auto max-w-2xl"
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 }}
                                className="mt-8 flex flex-col sm:flex-row items-center gap-10"
                            >
                                {data.cta && data.mux_playback_id && (
                                    <Modal>
                                        <ModalTrigger asChild>
                                            <Button
                                                className="
                                                    px-6 py-6 hover:bg-campana-secondary group rounded-full 
                                                    bg-white w-full md:w-fit transition-all hover:scale-105 
                                                    active:scale-95 flex items-center justify-center gap-4 
                                                    cursor-pointer text-campana-primary hover:text-white
                                                "
                                            >
                                                <>
                                                    <span className="font-semibold">{data.cta}</span>
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-campana-primary text-white transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-campana-secondary shadow-lg">
                                                        <Play size={16} fill="currentColor" />
                                                    </div>
                                                </>
                                            </Button>
                                        </ModalTrigger>
                                        <ModalBody>
                                            <ModalContent className="relative w-[95vw] max-w-6xl rounded-3xl overflow-hidden bg-black shadow-2xl">
                                                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                                                    <MuxPlayer
                                                        ref={playerRef}
                                                        playbackId={data.mux_playback_id}
                                                        streamType="on-demand"
                                                        className="w-full h-full block"
                                                        metadata={{
                                                            video_title: "Video VIP Campana",
                                                        }}
                                                        onLoadedMetadata={handleLoadedMetadata}
                                                        onCanPlay={handleCanPlay}
                                                        style={{
                                                            "--controls": "none",
                                                            "--bottom-controls": "none",
                                                        } as any}
                                                        onPlay={() => setIsPlaying(true)}
                                                        onPause={() => setIsPlaying(false)}
                                                    />

                                                    {/* TUS CONTROLES PERSONALIZADOS */}
                                                    <AnimatePresence mode="wait">
                                                        {(isHovered || !isPlaying) && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300 rounded-2xl"
                                                            >
                                                                <div className="flex items-center gap-8 md:gap-16">
                                                                    <button
                                                                        onClick={() => seek(-10)}
                                                                        className="text-white/80 hover:text-[#f1ba0a] transition-all hover:scale-110 cursor-pointer"
                                                                    >
                                                                        <RotateCcw size={32} />
                                                                    </button>

                                                                    <button
                                                                        onClick={togglePlay}
                                                                        className="w-20 h-20 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white hover:scale-105 transition-transform cursor-pointer"
                                                                    >
                                                                        {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                                                                    </button>

                                                                    <button
                                                                        onClick={() => seek(10)}
                                                                        className="text-white/80 hover:text-[#f1ba0a] transition-all hover:scale-110 cursor-pointer"
                                                                    >
                                                                        <RotateCw size={32} />
                                                                    </button>
                                                                </div>

                                                                <div className="absolute top-4 right-4">
                                                                    <ModalTrigger className="bg-white/10 hover:bg-[#f1ba0a] border-none p-3 rounded-full transition-colors cursor-pointer block">
                                                                        <Maximize2 size={20} className="text-white" />
                                                                    </ModalTrigger>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </ModalContent>
                                        </ModalBody>
                                    </Modal>
                                )}
                            </motion.div>
                        </div>

                        {/* BLOCK 2: EXTRA FIELDS (AFTER BIOGRAPHY) */}
                        <div
                            ref={extraRef}
                            className="absolute inset-0 flex flex-col justify-center text-white max-w-2xl pointer-events-none"
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
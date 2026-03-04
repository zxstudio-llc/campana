"use client"

import { useRef, useLayoutEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "../../ui/animated-modal"
import { Play } from "lucide-react"
import { Biography } from "@/lib/wordpress.d"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useInView } from "motion/react"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface Props {
    biography: Biography
}

export default function BiographyCompany({ biography }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

    const data = biography.acf.biography
    const photo = biography.acf.photo

    // Manejo de responsividad técnica
    useLayoutEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useLayoutEffect(() => {
        if (!sectionRef.current || !textRef.current || !imageRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
            })

            gsap.set(textRef.current, { opacity: 0, y: isMobile ? 120 : 200 })
            gsap.set(overlayRef.current, { backdropFilter: "blur(0px)", opacity: 0 })

            // 1️⃣ Overlay empieza primero
            tl.to(overlayRef.current, {
                backdropFilter: "blur(10px)",
                opacity: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                duration: 1.2,
                ease: "none"
            }, 0)

            // 2️⃣ Texto entra DESPUÉS del blur
            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, 0.6)

            // 3️⃣ Texto se mantiene estable
            tl.to(textRef.current, {
                y: isMobile ? -80 : -120,
                duration: 1.2,
                ease: "none"
            }, 1.6)

            // 4️⃣ Salida limpia (más rápida, menos agresiva)
            tl.to([textRef.current, imageRef.current], {
                opacity: 0,
                filter: "blur(20px)",
                scale: 0.96,
                duration: 0.8,
                ease: "power2.out"
            }, 2.4)

        }, sectionRef)

        return () => ctx.revert()
    }, [isMobile])

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-black flex items-center"
        >
            {/* ========================= */}
            {/* FONDO (STICKY POR PINNING) */}
            {/* ========================= */}
            <div
                ref={imageRef}
                className="
    absolute inset-0 
    w-full h-full 
    z-0 overflow-hidden
    lg:left-auto lg:right-0 lg:w-1/2
  "
            >
                {photo?.url && (
                    <div className="relative w-full h-full">
                        <Image
                            src={photo.url}
                            alt={photo.alt || data.name}
                            fill
                            priority
                            className="object-contain 
                            object-right-bottom
                            lg:object-contain 
                            lg:object-right-bottom"
                        />
                        {/* Capa reactiva para el Blur Progresivo de GSAP */}
                        <div
                            ref={overlayRef}
                            className="absolute inset-0 z-10 pointer-events-none"
                        />
                        {/* Overlay base para legibilidad constante */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-0" />
                    </div>
                )}
            </div>

            <div className="relative z-20 w-full px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 h-full items-center">

                    {/* El texto sube mientras el fondo está "pinned" */}
                    <div ref={textRef} className="lg:col-span-7 flex flex-col text-white py-20 pointer-events-auto max-w-2xl">

                        {/* Highlight */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            className="text-campana-secondary font-bold tracking-[0.2em] uppercase block mb-4 opacity-80 text-center md:text-left"
                        >
                            {data.highlight}
                        </motion.span>

                        {/* Título Principal Estilo Apple */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-8xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-10 transition-all text-center md:text-left">
                            {data.title}
                        </motion.h2>

                        {/* Descripción (Scroll simulado) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 }}
                            className="text-neutral-300 text-base md:text-lg leading-[1.5] space-y-4 reveal-description font-light opacity-90"
                            style={{
                                textAlign: "justify",
                                textAlignLast: "left",
                                textJustify: "inter-word"
                            }}
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                        <div className="text-right py-4">
                            <p className="text-2xl font-bold mb-2 italic text-white leading-none">
                                {data.name}
                            </p>
                            <p className="text-campana-secondary text-sm md:text-sm uppercase font-bold italic opacity-80">
                                {data.role}
                            </p>
                        </div>
                        {/* CTA + Firma */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            className="mt-8 flex flex-col sm:flex-row items-center gap-10">

                            {/* Video Modal Trigger */}
                            {data.cta && data.cta_url && (
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
                                        <ModalContent className="
                                            relative
                                            w-[95vw]
                                            max-w-6xl
                                            rounded-3xl
                                            overflow-hidden
                                            bg-black
                                            shadow-2xl
                                        ">
                                            {/* Contenedor del Video con Aspect Ratio Forzado */}
                                            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                                                <iframe
                                                    src={`${data.cta_url}?autoplay=1&api=1&background=0&mute=0`}
                                                    className="absolute inset-0 w-full h-full border-none"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>

                                            {/* Footer del Modal estilo Apple VIP */}
                                            <div className="p-8 bg-[#001D3D] border-t border-[#b5934a]/20">
                                                <h4 className="text-2xl font-bold text-[#b5934a] tracking-tight">
                                                    Presentación Ejecutiva: Grupo Campana
                                                </h4>
                                                <p className="text-neutral-400 text-lg mt-1 font-medium">
                                                    Innovación, Solidez y el futuro de la inversión en Ecuador.
                                                </p>
                                            </div>
                                        </ModalContent>
                                    </ModalBody>
                                </Modal>
                            )}
                        </motion.div>
                    </div>

                    <div className="hidden lg:col-span-5 h-full" />
                </div>
            </div>
        </section>
    )
}
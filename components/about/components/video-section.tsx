"use client";
import React, { useState, useRef, useEffect } from "react";
import Player from "@vimeo/player";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Play, Pause, RotateCcw, RotateCw, Maximize2 } from "lucide-react";

interface VideoVipProps {
    videoUrl: string;
}

export function VideoVipSection({ videoUrl }: VideoVipProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Nuevo estado para rastrear el mouse
    const playerRef = useRef<Player | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const getCleanUrl = (url: string) => {
        const base = url.split("?")[0];
        // Aseguramos que los controles de Vimeo desaparezcan para usar los nuestros
        return `${base}?controls=0&background=0&api=1`;
    };

    useEffect(() => {
        if (iframeRef.current) {
            playerRef.current = new Player(iframeRef.current);
            playerRef.current.on('play', () => setIsPlaying(true));
            playerRef.current.on('pause', () => setIsPlaying(false));
            playerRef.current.on('ended', () => {
                setIsPlaying(false);
                setIsHovered(true); // Mostrar controles al terminar
            });
        }
    }, [videoUrl]);

    const togglePlay = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        if (isPlaying) {
            await playerRef.current.pause();
        } else {
            await playerRef.current.play();
        }
    };

    const seek = async (e: React.MouseEvent, amount: number) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        const currentTime = await playerRef.current.getCurrentTime();
        playerRef.current.setCurrentTime(currentTime + amount);
    };

    // Lógica clave: Mostrar controles si está pausado O si el mouse está encima
    const shouldShowControls = !isPlaying || isHovered;

    return (
        <div className="w-full flex justify-center py-10">
            <Modal>
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative group lg:w-[90%] w-[92%] rounded-3xl border p-2 border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden"
                >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black">
                        <iframe
                            ref={iframeRef}
                            src={getCleanUrl(videoUrl)}
                            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.01]"
                            allow="autoplay; fullscreen"
                        />

                        {/* CUSTOM CONTROLS OVERLAY */}
                        <AnimatePresence>
                            {shouldShowControls && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    // Quitamos el blur si prefieres ver el video más claro al pausar, 
                                    // o lo mantenemos para resaltar los botones VIP
                                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[4px] transition-all duration-300 rounded-2xl"
                                >
                                    <div className="flex items-center gap-8 md:gap-16">
                                        <button onClick={(e) => seek(e, -10)} className="text-white/80 hover:text-[#f1ba0a] transition-all hover:scale-110">
                                            <RotateCcw size={32} />
                                        </button>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={togglePlay}
                                            className="w-20 h-20 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white"
                                        >
                                            {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                                        </motion.button>

                                        <button onClick={(e) => seek(e, 10)} className="text-white/80 hover:text-[#f1ba0a] transition-all hover:scale-110">
                                            <RotateCw size={32} />
                                        </button>
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <ModalTrigger className="bg-white/10 hover:bg-[#f1ba0a] border-none p-3 rounded-full transition-colors group/btn">
                                            <Maximize2 size={20} className="text-white" />
                                        </ModalTrigger>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* MODAL DE EXPANSIÓN */}
                <ModalBody>
                    <ModalContent className="max-w-6xl p-0 overflow-hidden bg-black border border-neutral-800 h-full">
                        <div className="relative aspect-video w-full">
                            <iframe
                                src={`${videoUrl}?autoplay=1`}
                                className="absolute inset-0 w-full h-full"
                                allow="autoplay; fullscreen"
                            />
                        </div>
                        <div className="p-6 bg-neutral-900">
                            <h4 className="text-xl font-bold text-[#f1ba0a]">Presentación Ejecutiva</h4>
                            <p className="text-neutral-400 text-sm mt-1">Grupo Campana - Innovación y Solidez</p>
                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}
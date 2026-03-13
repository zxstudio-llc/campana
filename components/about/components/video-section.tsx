"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Play, Pause, RotateCcw, RotateCw, Maximize2 } from "lucide-react";

interface VideoVipProps {
    playbackId: string; // ahora será URL o path del video
}

export function VideoVipSection({ playbackId }: VideoVipProps) {

    const [loadMetrics, setLoadMetrics] = useState({
        startTime: performance.now(),
        metadataTime: 0,
        canPlayTime: 0,
    });

    const playerRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLoadedMetadata = () => {
        const time = performance.now() - loadMetrics.startTime;
        setLoadMetrics(prev => ({ ...prev, metadataTime: time }));
    };

    const handleCanPlay = () => {
        const time = performance.now() - loadMetrics.startTime;
        setLoadMetrics(prev => ({ ...prev, canPlayTime: time }));
    };

    const togglePlay = () => {
        const video = playerRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    const seek = (seconds: number) => {
        const video = playerRef.current;
        if (!video) return;

        video.currentTime += seconds;
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    if (!playbackId) return null;

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Modal>

                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative group w-full rounded-3xl border p-2 border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden"
                >

                    <div className="relative w-full h-[75vh] md:h-[65vh] lg:h-[65vh] bg-black flex items-center justify-center">

                        <video
                            ref={playerRef}
                            src={playbackId}
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="absolute top-1/2 left-1/2 
                            -translate-x-1/2 -translate-y-1/2 
                            w-full h-full object-cover pointer-events-none"
                            onLoadedMetadata={handleLoadedMetadata}
                            onCanPlay={handleCanPlay}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />

                        {/* CONTROLES PERSONALIZADOS */}

                        <AnimatePresence mode="wait">
                            {(isHovered || !isPlaying) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-30 flex items-center justify-center rounded-2xl"
                                >
                                    <div className="flex items-center gap-8 md:gap-16">

                                        <button
                                            onClick={() => seek(-10)}
                                            className="w-12 h-12 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white hover:scale-105 transition-transform"
                                        >
                                            <RotateCcw size={32} />
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            className="w-20 h-20 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white hover:scale-105 transition-transform"
                                        >
                                            {isPlaying
                                                ? <Pause size={40} fill="currentColor" />
                                                : <Play size={40} fill="currentColor" className="ml-2" />
                                            }
                                        </button>

                                        <button
                                            onClick={() => seek(10)}
                                            className="w-12 h-12 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white hover:scale-105 transition-transform"
                                        >
                                            <RotateCw size={32} />
                                        </button>

                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <ModalTrigger className="bg-campana-bg-hover/80 hover:bg-campana-bg-hover border-none p-3 rounded-full transition-colors cursor-pointer">
                                            <Maximize2 size={20} className="text-campana-secondary" />
                                        </ModalTrigger>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                </motion.div>

                {/* MODAL */}

                <ModalBody>
                    <ModalContent className="max-w-6xl p-0 overflow-hidden bg-black flex items-center justify-center">

                        <div className="w-full aspect-video">

                            <video
                                src={playbackId}
                                autoPlay
                                controls
                                className="w-full h-full block"
                                onLoadedMetadata={handleLoadedMetadata}
                                onCanPlay={handleCanPlay}
                            />

                        </div>

                    </ModalContent>
                </ModalBody>

            </Modal>
        </div>
    );
}
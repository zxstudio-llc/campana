"use client";
import React, { useState, useRef } from "react";
import MuxPlayer, { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Play, Pause, RotateCcw, RotateCw, Maximize2 } from "lucide-react";

interface VideoVipProps {
    playbackId: string;
}

export function VideoVipSection({ playbackId }: VideoVipProps) {
    const [loadMetrics, setLoadMetrics] = useState({
        startTime: performance.now(),
        metadataTime: 0,
        canPlayTime: 0,
    });

    // console.log("DEBUG: VideoVipSection rendered with playbackId:", playbackId);
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

    if (!playbackId) return null;

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Modal>
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative group w-[100%] rounded-3xl border p-2 border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden"
                >
                    <div className="relative w-full h-full aspect-video bg-black flex items-center justify-center">
                        <MuxPlayer
                            ref={playerRef}
                            playbackId={playbackId}
                            streamType="on-demand"
                            className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
                            metadata={{
                                video_title: "Video VIP Campana",
                            }}
                            onLoadedMetadata={handleLoadedMetadata}
                            onCanPlay={handleCanPlay}
                            style={{
                                width: '200vw',
                                height: '100vh',
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
                                    className="absolute inset-0 z-30 flex items-center justify-center rounded-2xl"
                                >
                                    <div className="flex items-center gap-8 md:gap-16">
                                        <button
                                            onClick={() => seek(-10)}
                                            className="w-12 h-12 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white hover:scale-105 transition-transform cursor-pointer"
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
                                            className="w-12 h-12 bg-[#f1ba0a] rounded-full flex items-center justify-center shadow-xl text-white hover:scale-105 transition-transform cursor-pointer"
                                        >
                                            <RotateCw size={32} />
                                        </button>
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <ModalTrigger className="bg-campana-bg-hover/80 hover:bg-campana-bg-hover border-none p-3 rounded-full transition-colors cursor-pointer block">
                                            <Maximize2 size={20} className="text-campana-secondary" />
                                        </ModalTrigger>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* MODAL (aquí puedes dejar los controles nativos o personalizados) */}
                <ModalBody>
                    <ModalContent className="max-w-6xl p-0 overflow-hidden bg-black flex items-center justify-center">
                        <div className="w-full aspect-video">
                            <MuxPlayer
                                playbackId={playbackId}
                                streamType="on-demand"
                                autoPlay
                                className="w-full h-full block"
                                metadata={{
                                    video_title: "Video VIP Campana",
                                }}
                                onLoadedMetadata={handleLoadedMetadata}
                                onCanPlay={handleCanPlay}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}
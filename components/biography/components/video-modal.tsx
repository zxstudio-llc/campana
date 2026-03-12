"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Pause, Play, RotateCcw, RotateCw, X } from "lucide-react"

interface Props {
    open: boolean
    onClose: () => void
    src: string
}

export default function VideoModal({ open, onClose, src }: Props) {
    const playerRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const togglePlay = () => {
        if (!playerRef.current) return
        if (isPlaying) playerRef.current.pause()
        else playerRef.current.play()
    }

    const seek = (seconds: number) => {
        if (!playerRef.current) return
        playerRef.current.currentTime += seconds
    }

    useEffect(() => {
        if (!open) return

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        document.addEventListener("keydown", handleEsc)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = ""
            if (playerRef.current) playerRef.current.pause()
        }
    }, [open, onClose])

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                >
                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* CARD */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-[92vw] md:w-[900px] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <video
                            ref={playerRef}
                            src={src}
                            preload="auto"
                            playsInline
                            className="w-full h-full object-cover"
                            controls={false}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />

                        {/* CLOSE */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-white/20 flex items-center justify-center"
                        >
                            <X size={18} />
                        </button>

                        {/* CONTROLS */}
                        <AnimatePresence>
                            {(isHovered || !isPlaying) && (
                                <motion.div
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                                >
                                    <div className="flex items-center gap-10">
                                        <button
                                            onClick={() => seek(-10)}
                                            className="text-white/80 hover:text-[#f1ba0a]"
                                        >
                                            <RotateCcw size={34} />
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            className="w-20 h-20 bg-[#f1ba0a] rounded-full flex items-center justify-center text-white"
                                        >
                                            {isPlaying ? (
                                                <Pause size={40} fill="currentColor" />
                                            ) : (
                                                <Play size={40} fill="currentColor" className="ml-2" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => seek(10)}
                                            className="text-white/80 hover:text-[#f1ba0a]"
                                        >
                                            <RotateCw size={34} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
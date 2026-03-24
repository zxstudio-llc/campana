"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import UniversalVideo from "../universal-video";

interface PreloaderProps {
    preloadVideos?: string[];
}

export const Preloader = ({ preloadVideos = [] }: PreloaderProps) => {

    const [loading, setLoading] = useState(true);

    const preloaderSrc = "/assets/logo.mp4";

    useEffect(() => {
        console.log("Preloader: Critical Videos to Preload ->", preloadVideos);
    }, [preloadVideos]);

    useEffect(() => {
        const handleHeroReady = () => {
            setTimeout(() => setLoading(false), 50);
        };

        window.addEventListener("hero-video-ready", handleHeroReady);

        const backupTimeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            window.removeEventListener("hero-video-ready", handleHeroReady);
            clearTimeout(backupTimeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(10px)",
                        transition: { duration: 0.9, ease: "circInOut" }
                    }}
                    className="fixed inset-0 z-9999 overflow-hidden bg-[#030910]"
                >
                    <UniversalVideo
                        src={preloaderSrc}
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                    />

                    {/* ZONA DE PRECARGA INVISIBLE - Solo para videos de secciones futuras (evitamos colisión con Hero) */}
                    <div className="absolute opacity-0 pointer-events-none size-0 overflow-hidden">
                        {preloadVideos.length > 2 && preloadVideos.slice(2).map((url, idx) => (
                            <video key={idx} preload="auto" muted playsInline>
                                <source src={url} type="video/mp4" />
                            </video>
                        ))}
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

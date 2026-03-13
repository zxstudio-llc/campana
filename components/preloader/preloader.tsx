"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
    preloadVideos?: string[];
}

export const Preloader = ({ preloadVideos = [] }: PreloaderProps) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Preloader: Critical Videos to Preload ->", preloadVideos);
    }, [preloadVideos]);

    useEffect(() => {
        const handleHeroReady = () => {
            setTimeout(() => setLoading(false), 50);
        };

        window.addEventListener("hero-video-ready", handleHeroReady);

        // Seguridad: Si después de 15 segundos el video no ha cargado (especialmente para archivos de 34MB), quitamos el preloader
        const backupTimeout = setTimeout(() => {
            setLoading(false);
            console.log("Preloader: Backup timeout reached (15s)");
        }, 15000);

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

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source
                            src="https://ykhbacjdlnooyrblnrxi.supabase.co/storage/v1/object/public/Campana/banner/isotipo_blanco.mp4"
                            type="video/mp4"
                        />
                    </video>

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

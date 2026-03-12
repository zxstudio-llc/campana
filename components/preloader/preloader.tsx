"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const handleHeroReady = () => {
            setTimeout(() => setLoading(false), 50);
        };

        window.addEventListener("hero-video-ready", handleHeroReady);

        return () => {
            window.removeEventListener("hero-video-ready", handleHeroReady);
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

                </motion.div>
            )}
        </AnimatePresence>
    );


};

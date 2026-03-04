"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => setLoading(false), 4500); // 3 segundos para un impacto premium
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    // Configuración de la animación de los trazos
    const pathVariants = {
        initial: { pathLength: 0, opacity: 0 },
        animate: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2.5,
                ease: "easeInOut" as any,
                repeat: Infinity,
                repeatType: "reverse" as const,
            }
        }
    };

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: "blur(10px)",
                        transition: { duration: 1, ease: "circIn" }
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030910]"
                >
                    <div className="relative flex flex-col items-center w-full max-w-[300px] md:max-w-[500px] px-10">
                        <motion.svg
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1334.1 242.1"
                            className="w-full h-auto drop-shadow-[0_0_30px_rgba(181,147,74,0.3)]"
                        >
                            <g fill="none" stroke="#b5934a" strokeWidth="2">
                                {/* Cada path de tu logo animado individualmente */}
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M165.1,28.7c4.4,0,7.3,3,7.3,7.3v31c0,4.4-3,7.3-7.3,7.3h-89.1c-9.3,0-15.2,8.5-15.2,17.1v60.1c0,8.8,5.9,16.9,15.2,16.9h89.1c4.4,0,7.3,3,7.3,7.3v31.3c0,4.4-3,7.3-7.3,7.3h-89.1c-34.9,0-62.3-29.3-62.3-63.7v-57.9c0-34.5,27.2-64,62.3-64,0,0,89.1,0,89.1,0Z" />
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M387,202.6l-70.5-156.5c-5.7-12.2-17.9-20.1-31.3-20.1s-25.9,8.1-31.3,20.1l-70.3,156.5c-.8,1.4-1,3-1,4.4,0,4.6,3.9,6,7.9,6h189.7c3.9,0,7.9-1.4,7.9-6s-.3-3-1-4.4h-.1ZM268.8,127.2c3.2-7.3,7.9-16.3,9.5-20.1,1.3-2.7,3.5-6.8,6.8-6.8s5.7,4.1,6.8,6.8c1.7,3.3,5.9,11.7,9,19.1l21.4,47.9h-74.5l21-46.9h0Z" />
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M608,205.8V36.5c0-3.9,3-7.1,6.8-7.1h22.5l44.7.3h22.3c31.5,0,55.9,26.6,55.9,57.7v16.9c0,32.1-23.4,57.4-55.9,57.4h-41.7c-19.1,0,4.4,51.5-14.7,51.5h-32.4c-4.4,0-7.3-3-7.3-7.3h-.2ZM662.5,117.4h41.7c6.3,0,8.5-4.9,8.5-10.6v-21.2c0-4.9-3.2-10.3-8.5-10.3h-41.7c-4.4,0-7.3,3-7.3,7.3v27.3c0,4.4,3,7.3,7.3,7.3h0v.2Z" />
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M937.7,202.6l-70.5-156.5c-5.7-12.2-17.8-20.1-31.3-20.1s-25.9,8.1-31.3,20.1l-70.3,156.5c-.8,1.4-1,3-1,4.4,0,4.6,3.9,6,7.9,6h189.7c3.9,0,7.9-1.4,7.9-6s-.3-3-1-4.4h-.1ZM819.5,127.2c3.2-7.3,7.9-16.3,9.5-20.1,1.3-2.7,3.5-6.8,6.8-6.8s5.7,4.1,6.8,6.8c1.7,3.3,5.9,11.7,9,19.1l21.4,47.9h-74.5l21-46.9h0Z" />
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M1319.3,202.6l-70.5-156.5c-5.7-12.2-17.8-20.1-31.3-20.1s-25.9,8.1-31.3,20.1l-70.3,156.5c-.8,1.4-1,3-1,4.4,0,4.6,3.9,6,7.9,6h189.7c3.9,0,7.9-1.4,7.9-6s-.3-3-1-4.4h0ZM1201.2,127.2c3.2-7.3,7.9-16.3,9.5-20.1,1.2-2.7,3.5-6.8,6.8-6.8s5.7,4.1,6.8,6.8c1.7,3.3,5.9,11.7,9,19.1l21.4,47.9h-74.5l21-46.9h0Z" />
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M555.1,210.7v-98.3c0-2.4-3.3-3.3-4.5-1.2l-33.5,61.7c-.4.8-1.3,1.3-2.1,1.3h-34.1c-.9,0-1.7-.5-2.1-1.3l-33.7-61.8c-1.2-2.2-4.5-1.3-4.5,1.2v98.5c0,1.3-1,2.4-2.4,2.4h-34.6c-3.2,0-5.7-2.6-5.7-5.7V35.3c0-3.1,2.6-5.7,5.7-5.7h43.8c.9,0,1.7.5,2.1,1.2l46.3,83.3c.9,1.7,3.2,1.7,4.1,0l46.3-83.3c.4-.8,1.3-1.2,2.1-1.2h43.5c3.2,0,5.7,2.6,5.7,5.7v172.2c0,3.2-2.6,5.7-5.7,5.7h-34.6c-1.3,0-2.3-1-2.3-2.4h.3,0Z" />
                                <motion.path variants={pathVariants} initial="initial" animate="animate" d="M1066.7,212l-71.3-100c-1.5-2.2-5-1-5,1.5v96.8c0,1.5-1.3,2.7-2.7,2.7h-31.9c-3.9,0-7-3.1-7-7V32.9c0-3.9,3.1-7,7-7h28.8c.9,0,1.7.4,2.2,1.2l71.3,100.3c1.5,2.2,5,1,5-1.5V28.8c0-1.5,1.3-2.7,2.7-2.7h31.9c3.9,0,7,3.1,7,7v173.1c0,3.9-3.1,7-7,7h-28.8c-.9,0-1.7-.4-2.2-1.2h0Z" />
                            </g>
                        </motion.svg>

                        {/* Brillo de carga inferior */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "linear" }}
                            className="h-[1px] bg-[#b5934a] mt-12 opacity-50"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
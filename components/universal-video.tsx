"use client";

import { useEffect, useRef } from "react";

interface UniversalVideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
}

export default function UniversalVideo({
    src,
    className,
    autoPlay = true,
    loop = true,
    muted = true,
}: UniversalVideoProps) {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const tryPlay = async () => {
            try {
                await video.play();
            } catch {
                // iOS workaround
                const playOnTouch = () => {
                    video.play().catch(() => { });
                    window.removeEventListener("touchstart", playOnTouch);
                };
                window.addEventListener("touchstart", playOnTouch);
            }
        };

        if (autoPlay) {
            setTimeout(tryPlay, 50);
        }

    }, [src, autoPlay]);

    return (
        <video
            ref={videoRef}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            disablePictureInPicture
            controls={false}
            className={className}
        >
            <source src={src} type="video/mp4" />
            <source src={src.replace(".mp4", ".webm")} type="video/webm" />
        </video>
    );
}
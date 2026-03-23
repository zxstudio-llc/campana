"use client";
import React, { useRef, useEffect, useState, useId } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
    text,
    lines,
    duration,
    automatic,
}: {
    text?: string;
    lines?: string[];
    duration?: number;
    automatic?: boolean;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
    const [isMobile, setIsMobile] = useState(false);
    const id = useId();

    useEffect(() => {
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, []);

    const displayLines = lines ?? (text ? [text] : []);
    const totalLines = displayLines.length;
    const lineSpacing = 70;
    const viewBoxHeight = totalLines > 0 ? totalLines * lineSpacing : 100;
    const viewBoxWidth = 450;

    useEffect(() => {
        if (!svgRef.current) return;

        const { width, height } = svgRef.current.getBoundingClientRect();

        setMaskPosition({
            cx: `${(cursor.x / width) * 100}%`,
            cy: `${(cursor.y / height) * 100}%`,
        });
    }, [cursor]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                const rect = svgRef.current?.getBoundingClientRect();
                if (!rect) return;

                setCursor({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }}
            className="select-none w-screen"
        >
            <defs>
                <linearGradient
                    id={`baseGradient-${id}`}
                    gradientUnits="userSpaceOnUse"
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                >
                    <stop offset="0%" stopColor="#f5f5f7" stopOpacity="0" />
                    <stop offset="25%" stopColor="#e5e5ea" />
                    <stop offset="50%" stopColor="#d1d1d6" />
                    <stop offset="75%" stopColor="#e5e5ea" />
                    <stop offset="100%" stopColor="#f5f5f7" stopOpacity="0" />
                </linearGradient>

                <linearGradient
                    id={`textGradient-${id}`}
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="25%" stopColor="#ef4444" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="75%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </>
                    )}
                </linearGradient>

                <motion.radialGradient
                    id={`revealMask-${id}`}
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={
                        hovered
                            ? maskPosition
                            : (automatic || isMobile)
                                ? {
                                    cx: ["5%", "95%", "5%"],
                                    cy: ["50%", "50%", "50%"],
                                }
                                : { cx: "50%", cy: "50%" }
                    }
                    transition={
                        hovered
                            ? { duration: duration ?? 0, ease: "easeOut" }
                            : {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }
                    }
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                <mask id={`textMask-${id}`}>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill={`url(#revealMask-${id})`}
                    />
                </mask>
            </defs>
            {displayLines.map((line, index) => {
                const y = (index + 0.5) * lineSpacing;
                return (
                    <React.Fragment key={index}>
                        <text
                            x="50%"
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            strokeWidth="0.3"
                            stroke={`url(#baseGradient-${id})`}
                            strokeOpacity="0.3"
                            fill={`url(#baseGradient-${id})`}
                            className="font-[helvetica] text-7xl font-bold uppercase"
                            style={{ opacity: hovered ? 0.7 : 0 }}
                        >
                            {line}
                        </text>
                        <motion.text
                            x="50%"
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            strokeWidth="0.3"
                            stroke={`url(#baseGradient-${id})`}
                            strokeOpacity="0.3"
                            fill={`url(#baseGradient-${id})`}
                            className="font-[helvetica] text-7xl font-bold uppercase"
                            initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                            animate={{
                                strokeDashoffset: 0,
                                strokeDasharray: 1000,
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeInOut",
                            }}
                        >
                            {line}
                        </motion.text>
                        <text
                            x="50%"
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            stroke={`url(#textGradient-${id})`}
                            strokeWidth="0.3"
                            mask={`url(#textMask-${id})`}
                            fill="transparent"
                            className="font-[helvetica] text-7xl font-bold uppercase"
                        >
                            {line}
                        </text>
                    </React.Fragment>
                );
            })}
        </svg>
    );
};

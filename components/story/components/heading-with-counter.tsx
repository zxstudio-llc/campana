"use client";
import React from "react";
import { CounterFlip } from "./counter-flip";

interface HeadingWithCounterProps {
    text: string;
    animateYear?: {
        from: number;
        to: number;
        duration?: number;
    };
}

export const HeadingWithCounter = ({ text, animateYear }: HeadingWithCounterProps) => {
    if (animateYear) {
        return (
            <h2 className="text-[#001D3D] text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 flex items-center justify-center gap-2">
                <span>{text.split(" ")[0]}</span>
                <CounterFlip
                    start={animateYear.from}
                    end={animateYear.to}
                    duration={animateYear.duration}
                />
            </h2>
        );
    }

    return (
        <h2 className="text-[#001D3D] text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-center">
            {text}
        </h2>
    );
};
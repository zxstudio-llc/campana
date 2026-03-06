"use client";
import React from "react";
import { CounterFlip } from "./counter-flip";

interface HeadingWithCounterProps {
    text: string;
}

export const HeadingWithCounter = ({ text }: HeadingWithCounterProps) => {
    return (
        <h2 className="text-campana-primary text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 flex items-center justify-center gap-2">
            {text}
        </h2>
    );
};
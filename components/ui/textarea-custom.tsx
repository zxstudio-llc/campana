"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        const radius = 100; // Radio del efecto de brillo
        const [visible, setVisible] = React.useState(false);

        let mouseX = useMotionValue(0);
        let mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: any) {
            let { left, top } = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="group/textarea rounded-xl p-[2px] transition duration-300"
            >
                <textarea
                    className={cn(
                        `shadow-input flex min-h-[120px] w-full border-none bg-gray-50 text-black rounded-lg px-3 py-2 text-sm transition duration-400 
             placeholder:text-neutral-400 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 
             disabled:cursor-not-allowed disabled:opacity-50
             group-hover/textarea:shadow-none resize-none`,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
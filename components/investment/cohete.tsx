import * as React from "react";
import { motion } from "framer-motion";

const Cohete = React.forwardRef<HTMLDivElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <motion.div
        ref={ref}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 pointer-events-none z-30"
    >
        <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 4000"
            className="w-full h-full"
            {...props}
        >
            <defs>
                <style>
                    {
                        "\n      .st0 {\n        fill: url(#radial-gradient);\n      }\n\n      .st1 {\n        fill: url(#linear-gradient);\n      }\n    "
                    }
                </style>
                <radialGradient
                    id="radial-gradient"
                    cx={1986.75}
                    cy={2728.24}
                    fx={1974.16}
                    fy={2639.7}
                    r={131.13}
                    gradientTransform="translate(0 -4291.6) scale(1 2.57)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#ffd001" />
                    <stop offset={1} stopColor="#ff8601" />
                </radialGradient>
                <linearGradient
                    id="linear-gradient"
                    x1={1479.57}
                    y1={1800.12}
                    x2={2520.49}
                    y2={1800.12}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#ffb801" />
                    <stop offset={1} stopColor="#ffd001" />
                </linearGradient>
            </defs>
            <path
                className="st1"
                d="M2338.35,2064.75l.5-2.38.18-.85.31-1.56.35-1.7.14-.71.49-2.41.03-.15.45-2.26.2-1,.27-1.41.36-1.85.11-.56.46-2.42.06-.29.4-2.13.21-1.15.23-1.27.37-2.01.08-.42.44-2.42.08-.44.36-1.99.23-1.3.2-1.12.38-2.17.05-.27.42-2.43.1-.59.32-1.84.24-1.45.16-.99.4-2.31v-.13l.4-2.44.12-.74.27-1.7.26-1.61.13-.83.39-2.45v-.02l.37-2.42.14-.89.23-1.56.27-1.76.1-.69.36-2.45.03-.18.32-2.27.15-1.05.2-1.41.27-1.92.07-.54.34-2.46.05-.32.29-2.14.16-1.19.17-1.27.27-2.07.05-.39.32-2.46.06-.48.25-1.99.3-2.47.27-2.23.03-.25.29-2.47.08-.63.21-1.85.18-1.5.11-.98.03-.3c.37-3.21.72-6.42,1.05-9.63l.26-2.48v-.05l.24-2.43.09-.93.15-1.56.24-2.49.23-2.49.02-.21.21-2.29.1-1.08.13-1.4.17-1.97.04-.53.21-2.5.03-.36.18-2.14.1-1.24.1-1.26.16-2.13.03-.38.19-2.5.04-.51.15-1.99.1-1.4.07-1.11.18-2.29v-.22l.33-5.02.1-1.55.06-.97.04.02c1.16-18.97,1.84-38.06,2.02-57.28,3.05-316.09-127.75-602.24-339.52-804.71-227.13,198.99-371.77,490.17-374.91,815.9-.65,67.48,4.81,133.58,15.84,197.8l-181.99,119.15-1.34.88,7.68,375.32,290.55-162.36c11.98,22.23,24.7,44,38.13,65.28l353.1,3.41c15.17-22.09,29.57-44.76,43.13-67.97l277.61,162.22,16.75-14.66,13.97-351.21-182.14-124.32ZM2004.35,1842.46c-82.39-.79-148.54-68.22-147.74-150.61.8-82.39,68.23-148.54,150.62-147.74h-.01c82.39.79,148.54,68.22,147.75,150.61s-68.22,148.53-150.62,147.74Z"
            />
            <motion.path
                className="st0"
                d="M2123.75,2504.39l-271.24-2.61c-28.15,106.63,24.69,252.76,24.69,252.76l63.59-31.03c12.54,106.36,65.59,231.2,65.59,231.2,32.47-85.59,42.99-239.2,42.99-239.2l69.68,41.36c19.8-98.94,4.7-252.48,4.7-252.48"
                animate={{
                    scaleY: [1, 1.15, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ transformOrigin: "center top" }}
            />
        </svg>
    </motion.div>
));

Cohete.displayName = "Cohete";
export default Cohete;

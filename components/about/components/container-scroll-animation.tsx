"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const translateDimensions = () => {
        return isMobile ? [0, 0] : [0, -20];
    };

    const scaleDimensions = () => {
        return isMobile ? [0.8, 0.95] : [1.05, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], translateDimensions());

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen md:min-h-screen flex items-center justify-center"
        >
            <div
                className="py-10 md:py-40 w-full relative"
                style={{ perspective: "1000px" }}
            >
                <Header translate={translate} titleComponent={titleComponent} />

                <Card rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

const Header = ({ translate, titleComponent }: any) => {
    return (
        <motion.div
            style={{ translateY: translate }}
            className="max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

const Card = ({
    rotate,
    scale,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="w-full max-w-6xl mx-auto 
      h-[75vh] 
      sm:h-[75vh] 
      md:h-[55vh] 
      lg:h-[65vh] 
      border-4 border-[#6C6C6C] 
      bg-[#222222] 
      rounded-[30px] 
      overflow-hidden"
        >
            <div className="w-full h-full rounded-2xl overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
};
"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ChevronLeft, ChevronRight, X, Play, Pause, RotateCcw } from "lucide-react";
import { getVideoUrl } from "@/lib/video";

const AUTO_PLAY_DURATION = 16000;

interface CarouselProps {
  items: JSX.Element[];
}

type Card = {
  src: {
    url: string
    alt?: string
  }
  duration?: number;
  mux?: {
    primary_mux_playback_web_id?: string
    primary_mux_playback_mobile_id?: string
    secondary_mux_playback_web_id?: string
  }
  title: string
  category: string
  content: React.ReactNode
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  onCardOpen: () => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  onCardOpen: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [controlsStage, setControlsStage] = useState<"hidden" | "intro" | "final">("hidden");

  const getCurrentDuration = () => {
    return items[currentIndex]?.props.card?.duration || AUTO_PLAY_DURATION;
  };

  const scrollTo = (index: number, smooth = true) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardElement = container.firstElementChild?.firstElementChild as HTMLElement;
    if (!cardElement) return;

    const cardFullWidth = cardElement.offsetWidth + 16;
    let targetIndex = index;
    if (index < 0) targetIndex = items.length - 1;
    if (index >= items.length) targetIndex = 0;

    container.scrollTo({
      left: targetIndex * cardFullWidth,
      behavior: smooth ? "smooth" : "auto",
    });
    setCurrentIndex(targetIndex);
  };

  useEffect(() => {
    if (controlsVisible) {
      setControlsStage("intro");
      const timer = setTimeout(() => setControlsStage("final"), 600);
      return () => clearTimeout(timer);
    } else {
      setControlsStage("hidden");
    }
  }, [controlsVisible]);

  useEffect(() => {
    if (!controlsVisible || !isPlaying || cardOpen) return;
    const duration = getCurrentDuration();
    const interval = setInterval(() => {
      if (currentIndex === items.length - 1) {
        setIsPlaying(false);
        setHasEnded(true);
      } else {
        scrollTo(currentIndex + 1);
      }
    }, duration);
    return () => clearInterval(interval);
  }, [controlsVisible, isPlaying, currentIndex, cardOpen, items]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!carouselRef.current) return;
      const rect = carouselRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const ratio = visibleHeight / rect.height;
      const offsetFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);

      if (ratio >= 0.1 && offsetFromCenter <= 300) {
        setControlsVisible(true);
      } else {
        setControlsVisible(false);
      }
    };
    handleVisibility();
    window.addEventListener("scroll", handleVisibility);
    window.addEventListener("resize", handleVisibility);
    return () => {
      window.removeEventListener("scroll", handleVisibility);
      window.removeEventListener("resize", handleVisibility);
    };
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardElement = container.firstElementChild?.firstElementChild as HTMLElement;
    if (!cardElement) return;
    const cardFullWidth = cardElement.offsetWidth + 16;
    const index = Math.round(container.scrollLeft / cardFullWidth);
    if (index !== currentIndex && index >= 0 && index < items.length) {
      setCurrentIndex(index);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === items.length - 1;

  return (
    <CarouselContext.Provider value={{
      onCardClose: (index) => { setCardOpen(false); setIsPlaying(true); scrollTo(index); },
      onCardOpen: () => { setCardOpen(true); setIsPlaying(false); },
      currentIndex,
    }}>
      <div className="relative w-full group">
        <AnimatePresence>
          {!isFirst && controlsStage === "final" && (
            <motion.button
              initial={false}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              onClick={() => { setIsPlaying(false); scrollTo(currentIndex - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-campana-primary flex items-center justify-center text-campana-secondary z-50 border border-campana-primary"
            >
              <ChevronLeft size={22} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLast && controlsStage === "final" && (
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              onClick={() => { setIsPlaying(false); scrollTo(currentIndex + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-campana-primary flex items-center justify-center text-campana-secondary z-50 border border-campana-primary"
            >
              <ChevronRight size={22} />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex w-full overflow-x-scroll snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={carouselRef} onScroll={handleScroll}>
          <div className="flex flex-row gap-4 px-[5%] md:px-[10%] mb-4">
            {items.map((item, index) => (
              /* Eliminamos la lógica de isNeighbor aquí para que todos los items se mantengan montados */
              <div key={"card-container-" + index} className="snap-center shrink-0">
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={false}
          animate={controlsStage !== "hidden" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="absolute bottom-10 left-0 w-full z-40 pointer-events-none"
        >
          <div className="w-full max-w-[1200px] mx-auto pointer-events-auto flex justify-center">
            <div className="flex items-center gap-4">
              <motion.div className="flex items-center gap-3 h-10 bg-[#00122D]/70 backdrop-blur-sm px-4 rounded-full border border-[#00122D]/20">
                {items.map((_, index) => {
                  const itemDuration = items[index]?.props.card?.duration || AUTO_PLAY_DURATION;
                  return (
                    <button
                      key={index}
                      onClick={() => { setIsPlaying(false); setHasEnded(false); scrollTo(index, false); }}
                      className="relative h-1.5 bg-[#F1BA0A]/20 rounded-full overflow-hidden transition-all duration-300"
                      style={{ width: currentIndex === index ? "40px" : "8px" }}
                    >
                      {currentIndex === index && isPlaying && !hasEnded && (
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: itemDuration / 1000, ease: "linear" }} className="absolute inset-y-0 left-0 bg-[#F1BA0A]" />
                      )}
                      {currentIndex === index && (!isPlaying || hasEnded) && (
                        <div className="absolute inset-0 bg-[#F1BA0A]" />
                      )}
                    </button>
                  );
                })}
              </motion.div>

              <motion.button
                onClick={() => {
                  if (hasEnded) { scrollTo(0); setHasEnded(false); setIsPlaying(true); return; }
                  setIsPlaying(!isPlaying);
                }}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#00122D]/70 backdrop-blur-sm text-[#F1BA0A]"
              >
                {hasEnded ? <RotateCcw size={18} /> : isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) => {
  const { currentIndex, onCardClose } = useContext(CarouselContext);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isActive = currentIndex === index;

  useOutsideClick(containerRef, () => handleClose());
  const handleClose = () => { setOpen(false); onCardClose(index); };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1024px)");
    const onChange = (e: any) => setIsMobile(e.matches);
    onChange(mql);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Control manual de play/pause para asegurar sincronía perfecta
  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reinicia el video al salir para que siempre empiece de cero
    }
  }, [isActive]);

  const playbackId = isMobile
    ? card.mux?.primary_mux_playback_mobile_id || card.mux?.primary_mux_playback_web_id
    : card.mux?.primary_mux_playback_web_id || card.mux?.primary_mux_playback_mobile_id;

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl" onClick={handleClose} />
            <motion.div ref={containerRef} layoutId={layout ? `card-${card.title}` : undefined} className="relative z-60 w-full max-w-7xl rounded-[32px] bg-[#030b14] overflow-hidden h-[90vh] md:h-[80vh] flex flex-col md:flex-row mt-8 md:mt-20">
              <button className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-[#001D3D] text-[#f1ba0a] z-70" onClick={handleClose}><X size={20} /></button>
              <div className="flex-1 w-full h-full overflow-hidden">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        className="relative group h-[500px] w-[300px] md:h-[700px] md:w-[1240px] flex flex-col items-start justify-start overflow-hidden rounded-[32px] bg-neutral-900"
      >
        <div className="absolute inset-0 z-20 bg-linear-to-b from-black/80 via-transparent to-black/20" />
        <div className="relative z-30 p-10 md:p-14 text-left">
          <p className="font-bold text-campana-secondary text-sm md:text-base uppercase tracking-[0.2em] mb-3">{card.category}</p>
          <p className="text-3xl md:text-5xl font-bold text-white leading-[0.95] tracking-tighter max-w-lg">{card.title}</p>
        </div>

        {playbackId ? (
          <video
            ref={videoRef}
            src={getVideoUrl(playbackId)}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full inset-0 z-10 object-cover pointer-events-none"
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
        ) : (
          <BlurImage src={card.src.url} alt={card.src.alt || "Imagen"} fill className="absolute inset-0 z-10 object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
      </motion.button>
    </>
  );
};

export const BlurImage = ({ src, className, alt, fill, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      alt={alt || "Grupo Campana Asset"}
      fill={fill}
      {...rest}
    />
  );
};
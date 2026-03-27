"use client";

import React, { useEffect, useRef, useLayoutEffect } from "react";
import { Carousel, Card } from "@/components/projects/components/cards-carousel";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Projects } from "@/lib/wordpress.d";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  id?: string;
  title?: string;
  description?: string;
  highlight?: string;
  projects: Projects[];
}

interface ContentProps {
  index: number;
  category: string;
  title: string;
  description: string;
  details: string;
  ctaProject: string;
  urlProject: string;
  imageUrl: string;
}

export function ProjectsCardsSection({
  id,
  title,
  description,
  highlight,
  projects,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRevealRef = useRef<HTMLDivElement>(null);
  const [isCarouselActive, setIsCarouselActive] = React.useState(false);
  const isVisible = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!projects) return;
    projects.forEach((project) => {
      const url = project.acf.photos?.secondary_mux_playback_web_id;
      if (url && url !== "/placeholder.jpg") {
        const img = new window.Image();
        img.src = url;
      }
    });
  }, [projects]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(contentRevealRef.current, {
        opacity: 0,
        scale: 1.08,
        filter: "blur(10px)",
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onLeaveBack: () => setIsCarouselActive(false),
        },
      });
      tl.to(contentRevealRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => setIsCarouselActive(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!projects?.length) return null;

  const cards = projects.map((project, index) => {
    const p = project.acf.project;
    const photos = project.acf.photos;
    const secondaryImageUrl =
      photos?.secondary_mux_playback_web_id || "/placeholder.jpg";

    return (
      <Card
        key={project.id}
        index={index}
        card={{
          src: { url: secondaryImageUrl, alt: p.title },
          mux: {
            primary_mux_playback_web_id: photos?.primary_mux_playback_web_id,
            primary_mux_playback_mobile_id:
              photos?.primary_mux_playback_mobile_id,
            secondary_mux_playback_web_id:
              photos?.secondary_mux_playback_web_id,
          },
          title: p.title,
          category: p.highlight,
          content: (
            <Content
              index={index}
              category={p.highlight}
              title={p.title}
              description={p.description}
              details={p.details}
              ctaProject={p.cta}
              urlProject={p.cta_url}
              imageUrl={secondaryImageUrl}
            />
          ),
        }}
      />
    );
  });

  return (
    <section
      id={id}
      ref={sectionRef}
      className="w-screen bg-campana-bg-about flex items-center justify-center overflow-hidden z-60"
    >
      <div ref={contentRevealRef} className="w-full h-auto py-20">
        <div className="w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-8 md:gap-8 pb-10 md:pb-30 overflow-hidden">
          {highlight && (
            <span className="text-[#001D3D] text-sm md:text-lg font-sans font-normal tracking-tighter uppercase flex items-center justify-center gap-2 lining-nums">
              {highlight}
            </span>
          )}
          {title && (
            <h2 className="text-[#001D3D] text-4xl md:text-5xl lg:text-8xl font-sans font-normal mb-0 text-center leading-[0.9] tracking-tighter lining-nums w-full md:w-4xl mx-auto">
              {(() => {
                const words = title.split(" ");
                const lastWord = words.pop();
                return (
                  <>
                    {words.join(" ")}{" "}
                    <span className="font-ivy-presto italic capitalize">
                      {lastWord}
                    </span>
                  </>
                );
              })()}
            </h2>
          )}
          {description && (
            <p
              className="text-[#001D3D] text-base md:text-lg w-full md:w-2xl mx-auto tracking-tight leading-5 font-sans font-normal"
              style={{
                textAlign: "justify",
                textAlignLast: "center",
                textJustify: "inter-word",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
        <Carousel items={cards} active={isCarouselActive} />
      </div>
    </section>
  );
}

const Content = ({
  index,
  category,
  title,
  description,
  details,
  ctaProject,
  urlProject,
  imageUrl,
}: Omit<ContentProps, "currentIndex">) => {

  const formatText = (text: string) => {
    if (!text) return null;
    const lines = text.split(/\r?\n/);
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-4" />;

      if (trimmedLine.startsWith("-")) {
        const bulletContent = trimmedLine.substring(1).trim();
        const formatted = bulletContent.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="text-[#001D3D] font-bold">$1</strong>'
        );
        return (
          <div key={index} className="flex items-start ml-2 gap-0">
            <span className="text-[#b5934a] shrink-0 text-sm">•</span>
            <span
              className="text-neutral-600 text-sm leading-snug"
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          </div>
        );
      }

      const isHeader =
        trimmedLine.startsWith("**") && trimmedLine.endsWith("**");
      const formattedLine = trimmedLine.replace(
        /\*\*(.*?)\*\*/g,
        (match, p1) => {
          if (isHeader) {
            return `<strong class="text-[#001D3D] font-extrabold block text-lg leading-5 tracking-tight">${p1}</strong>`;
          }
          return `<strong class="text-[#001D3D] font-bold">${p1}</strong>`;
        }
      );

      return (
        <p
          key={index}
          className={`text-neutral-600 text-sm ${isHeader ? "mb-0" : "text-justify"}`}
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Columna de contenido */}
      <div
        className={cn(
          "w-full md:max-w-[500px]",
          "flex flex-col h-full",
          "p-6 md:p-10 bg-[#f5f5f7]",
          "overflow-y-auto custom-scrollbar"
        )}
      >
        {/* Contenido — crece y centra verticalmente */}
        <div className="flex-1 flex flex-col justify-center gap-2 min-h-0">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#f1ba0a] font-sans font-normal tracking-tighter text-xl pt-4 md:pt-0"
          >
            {category}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#001D3D] font-sans font-normal tracking-tighter text-lg mb-2 md:mb-4"
          >
            {title}
          </motion.span>

          <div className="text-[#001D3D] text-base font-sans font-normal leading-relaxed flex flex-col gap-2 text-justify">
            <span className="block leading-snug text-sm text-neutral-600">
              {description}
            </span>
            <div className="text-neutral-600">{formatText(details)}</div>
          </div>
        </div>

        {/* Botón — siempre anclado al fondo */}
        <div className="shrink-0 pt-8 pb-6 md:pb-0">
          <Button
            asChild
            className="px-6 py-6 border-[#b5934a]/30 hover:bg-[#f1ba0a] transition-all group rounded-full bg-[#001D3D] w-full md:w-fit"
          >
            <Link href={urlProject} target="_blank">
              <span className="font-bold tracking-tight text-white">
                {ctaProject}
              </span>
              <ExternalLink className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity text-white" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Columna de Imagen — sin tocar */}
      <div className="flex-1 relative min-h-[250px] md:h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-bottom"
          priority
          unoptimized={imageUrl.startsWith("http")}
        />
        <div className="absolute inset-0 bg-linear-to-l from-black/20 to-transparent hidden md:block" />
      </div>
    </div>
  );
};
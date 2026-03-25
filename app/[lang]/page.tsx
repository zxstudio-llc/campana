import { Section, Container } from "@/components/craft";
import { getPageBySlug, getOurValuesById, getActivoEstrategicoById, getProjectsByIds, getTimelineByIds, getInvestmentById, getBiographyById, getFaqById, getSliderById } from "@/lib/wordpress";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { AboutUsSection } from "@/components/about/about";
import { ActivosSection } from "@/components/activos/activos";

import type {
  ActivoEstrategico,
  ActivosEstrategicosSection,
  BiographySection,
  ContactSection,
  FaqsSection,
  InvestmentsSection,
  OurValues,
  OurValuesSection,
  PageSection,
  ProjectsSection,
  TimelineSection,
} from "@/lib/wordpress.d";
import { OurValueSection } from "@/components/our-values/our-values";
import { ProjectsCardsSection } from "@/components/projects/Cards";
import { StoryTimelineSection } from "@/components/story/story-section";
import InvestmentSection from "@/components/investment/investment";
import { BiographyCompanySection } from "@/components/biography/biography";
import FAQSection from "@/components/faqs/faq";
import { Preloader } from "@/components/preloader/preloader";
import ContactPageSection from "@/components/contact/contact";

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const slugByLang: Record<string, string> = {
    en: "home",
    es: "inicio",
  };

  const currentSlug = slugByLang[lang] || "inicio";

  const page = await getPageBySlug(currentSlug);

  if (!page) {
    return (
      <Section>
        <Container>
          <p>Página no encontrada (404) para el idioma: {lang}</p>
          <Link href="/">Volver al inicio</Link>
        </Container>
      </Section>
    );
  }

  const sections: PageSection[] =
    page.acf?.default?.page_sections ?? [];

  const heroVideos: string[] = [];
  const heroBlock = page.acf?.default?.hero;
  if (heroBlock?.hero_type === 'slider' && typeof heroBlock.hero_slider === 'number') {
    const slider = await getSliderById(heroBlock.hero_slider);
    if (slider) {
      if (slider.acf.bg_photo_desktop) heroVideos.push(slider.acf.bg_photo_desktop);
      if (slider.acf.bg_photo_mobile) heroVideos.push(slider.acf.bg_photo_mobile);
    }
  }

  // Obtener URLs de videos de biografía para precarga proactiva
  const biographyBlock = sections.find(s => s.acf_fc_layout === "biography") as BiographySection | undefined;
  let biographyPreloadVideos: string[] = [];

  if (biographyBlock) {
    const bioIds = (biographyBlock.biography || []).map((b: any) => b.ID || b.id || b).filter(Boolean);
    const biographies = await getBiographyById(bioIds);
    if (biographies?.length) {
      const bio = biographies[0];
    }
  }

  const allCriticalVideos = [...heroVideos, ...biographyPreloadVideos];

  return (
    <Section>
      <Preloader />
      <Container>
        <Hero page={page} />

        <BlocksRenderer sections={sections} />
      </Container>
    </Section>
  );
}

async function BlocksRenderer({
  sections,
}: {
  sections: PageSection[];
}) {
  const result: React.ReactNode[] = [];

  const gradientLayouts = ["our_values", "activos"];

  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];

    if (gradientLayouts.includes(current.acf_fc_layout)) {
      const groupedBlocks: PageSection[] = [];

      while (
        i < sections.length &&
        gradientLayouts.includes(
          sections[i].acf_fc_layout
        )
      ) {
        groupedBlocks.push(sections[i]);
        i++;
      }

      i--;

      result.push(
        <GradientWrapper key={`group-${i}`}>
          {await Promise.all(
            groupedBlocks.map((block, idx) => (
              <RenderBlock key={idx} block={block} />
            ))
          )}
        </GradientWrapper>
      );

      continue;
    }

    result.push(
      <RenderBlock key={i} block={current} />
    );
  }

  return <>{result}</>;
}

function GradientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-linear-to-b from-black to-campana-bg-hover w-screen">
      {children}
    </div>
  );
}

async function RenderBlock({
  block,
}: {
  block: PageSection;
}) {
  switch (block.acf_fc_layout) {

    case "biography": {
      const data = block as BiographySection
      const bioIds = (data.biography || []).map((b: any) => b.ID || b.id || b).filter(Boolean);
      const biographies = await getBiographyById(bioIds)
      return (
        <BiographyCompanySection
          id={block.acf_fc_layout}
          biographies={biographies}
          highlight={data.highlight || ""}
          short_description={data.short_description || ""}
          description={data.description || ""}
        />
      )
    }

    case "about":
      return <AboutUsSection id={block.acf_fc_layout} about={block as any} />;

    case "activos": {
      const data = block as ActivosEstrategicosSection
      const activosRaw = await getActivoEstrategicoById(
        Array.isArray(data.activos) ? data.activos : []
      );

      const activosResolved: ActivoEstrategico[] =
        (activosRaw ?? []).filter(
          (item): item is ActivoEstrategico => item !== null
        );
      return (
        <ActivosSection
          id={block.acf_fc_layout}
          highlight={data.highlight}
          title={data.title}
          description={data.description}
          activos={activosResolved}
        />
      )
    }

    case "our_values": {
      const data = block as OurValuesSection;

      const valuesRaw = await getOurValuesById(
        Array.isArray(data.our_values) ? data.our_values : []
      );

      const valuesResolved: OurValues[] =
        (valuesRaw ?? []).filter(
          (item): item is OurValues => item !== null
        );

      return (
        <OurValueSection
          id={block.acf_fc_layout}
          highlight={data.highlight}
          title={data.title}
          description={data.description}
          values={valuesResolved}
        />
      );
    }

    case "projects": {
      const data = block as ProjectsSection
      const projects = await getProjectsByIds(
        data.projects
      )

      return (
        <ProjectsCardsSection
          id={block.acf_fc_layout}
          highlight={data.highlight}
          title={data.title}
          description={data.description}
          projects={projects}
        />
      )
    }

    case "timelines": {
      const data = block as TimelineSection
      const timelines = await getTimelineByIds(
        data.timelines
      )

      return (
        <StoryTimelineSection
          id={block.acf_fc_layout}
          highlight={data.highlight}
          title={data.title}
          description={data.description}
          subtitle={data.subtitle}
          timelines={timelines}
        />
      )
    }

    case "investment": {
      const data = block as InvestmentsSection
      const investments = await getInvestmentById(
        data.investment
      )

      return (
        <InvestmentSection
          id={block.acf_fc_layout}
          main={data.main}
          secondary={data.secondary}
          highlight={data.highlight}
          title={data.title}
          description={data.description}
          investment={investments}
          cta={data.cta}
          cta_url={data.cta_url}
          video={data.video}
          video_mobile={data.video_mobile}
        />
      )
    }

    case "faqs": {
      const data = block as FaqsSection
      const faqs = await getFaqById(
        data.faqs
      )
      return (
        <FAQSection
          id={block.acf_fc_layout}
          section={data}
          faqs={faqs}
        />
      )
    }

    case "contact": {
      const data = block as ContactSection
      return <ContactPageSection id={block.acf_fc_layout} {...data} />
    }

    default:
      return null;
  }
}
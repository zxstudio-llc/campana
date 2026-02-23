// Craft Imports
import { Section, Container } from "@/components/craft";
import { getSliderById, getPageBySlug } from "@/lib/wordpress";
import Link from "next/link";
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
import { Hero } from "@/components/hero/hero";

export const revalidate = 3600;

export default async function Home({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  console.log("Idioma detectado:", lang);
  const slugByLang: Record<string, string> = {
    zh: "shouye",
    en: "home",
    es: "inicio"
  };

  const currentSlug = slugByLang[lang] || "home";
  console.log("Buscando slug:", currentSlug);
  
  const page = await getPageBySlug(currentSlug);
  console.log("Página encontrada:", page ? "SÍ" : "NO");

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

  return (
    <Section>
      <Container>
        {/* Renderizado de Slider si existe */}
        <Hero page={page} />

        {/* Ejemplo de cómo pintar tus nuevos campos ACF de servicios */}
        {/* {page.acf?.page_service && (
          <div className="mt-12 p-6 border rounded-xl">
            <h2 className="text-2xl font-bold">{page.acf.page_service.title}</h2>
            <p className="text-muted-foreground">{page.acf.page_service.description}</p>
          </div>
        )} */}

        <ToDelete />
      </Container>
    </Section>
  );
}

// This is just some example TSX
const ToDelete = () => {
  return (
    <main className="space-y-6 p-6 sm:p-8 max-w-5xl items-center mx-auto">

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts"
        >
          <Pen size={32} />
          <span>
            Posts{" "}
            <span className="block text-sm text-muted-foreground">
              All posts from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages"
        >
          <File size={32} />
          <span>
            Pages{" "}
            <span className="block text-sm text-muted-foreground">
              Custom pages from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors"
        >
          <User size={32} />
          <span>
            Authors{" "}
            <span className="block text-sm text-muted-foreground">
              List of the authors from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/tags"
        >
          <Tag size={32} />
          <span>
            Tags{" "}
            <span className="block text-sm text-muted-foreground">
              Content by tags from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/categories"
        >
          <Diamond size={32} />
          <span>
            Categories{" "}
            <span className="block text-sm text-muted-foreground">
              Categories from your WordPress
            </span>
          </span>
        </Link>
        <a
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="https://github.com/9d8dev/next-wp/blob/main/README.md"
        >
          <Folder size={32} />
          <span>
            Documentation{" "}
            <span className="block text-sm text-muted-foreground">
              How to use `next-wp`
            </span>
          </span>
        </a>
      </div>
    </main>
  );
};

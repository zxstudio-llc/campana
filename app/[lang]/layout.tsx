import "../globals.css";

import { inter, robotoMono, anton, raleway } from '@/lib/fonts';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import AppNav from "@/components/nav/app-nav";
import AppTheme from "@/components/theme/app-theme";

import { getMainMenu, getGlobalCTA, getActiveLanguages, getSiteInfo } from "@/lib/wordpress";
import { SwiperStyles } from "@/components/theme/SwiperStyles";
import Footer from "@/components/nav/footer";
import SmoothScroller from "@/components/smooth-scroller";


export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getSiteInfo();

  return {
    title: siteInfo?.title || "Título por defecto",
    description: siteInfo?.description || "Descripción por defecto",
    metadataBase: new URL(siteConfig.site_domain || 'http://localhost:3000'),
    openGraph: {
      images: siteInfo?.logo?.url ? [siteInfo.logo.url] : [],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const menuMap: Record<string, number> = {
    es: 5,
    en: 21,
  };

  const currentMenuId = menuMap[lang] || 5;
  const [menuItems, cta, wpLanguages, siteInfo] = await Promise.all([
    getMainMenu(currentMenuId, lang),
    getGlobalCTA(),
    getActiveLanguages(),
    getSiteInfo(),
  ]);

  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} ${robotoMono.variable} ${anton.variable} ${raleway.variable}`}>
      <head />
      <body className={cn("min-h-screen bg-linear-to-b from-black to-campana-bg-hover text-foreground antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppTheme>
            <SwiperStyles />
            <AppNav menuItems={menuItems} cta={cta} languages={wpLanguages} siteInfo={siteInfo} />
            <SmoothScroller>
              <main className="relative flex flex-col min-h-screen">
                {children}
              </main>
              <Footer />
            </SmoothScroller>
          </AppTheme>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

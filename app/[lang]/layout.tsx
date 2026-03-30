import "../globals.css";

import { inter, anton, ivyPresto, ivyOra } from '@/lib/fonts';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import AppNav from "@/components/nav/app-nav";
import AppTheme from "@/components/theme/app-theme";

import { getMainMenu, getGlobalCTA, getActiveLanguages, getSiteInfo } from "@/lib/wordpress";
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
    <html translate="no" lang={lang} suppressHydrationWarning className={`${inter.variable} ${ivyPresto.variable} ${ivyOra.variable} ${anton.variable}`}>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="microsoft" content="notranslate" />
      </head>
      <body className={cn("min-h-screen bg-campana-bg text-foreground antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppTheme>
            <AppNav menuItems={menuItems} cta={cta} languages={wpLanguages} siteInfo={siteInfo} />
            <SmoothScroller>
              <main className="relative flex flex-col min-h-screen">
                {children}
              </main>
              <Footer menuItems={menuItems} siteInfo={siteInfo} />
            </SmoothScroller>
          </AppTheme>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

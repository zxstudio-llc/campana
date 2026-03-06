import "../globals.css";

import { Inter as FontSans } from "next/font/google";
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

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
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
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-gradient-to-b from-black to-campana-bg-hover text-foreground antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppTheme>
            <SwiperStyles />
            <AppNav menuItems={menuItems} cta={cta} languages={wpLanguages} siteInfo={siteInfo} />
            <main className="relative flex flex-col min-h-screen">
              {children}
            </main>
            <Footer />
          </AppTheme>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

import "../globals.css";

import { Section, Container } from "@/components/craft";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileNav } from "@/components/nav/mobile-nav";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";

import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

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

  const currentMenuId = menuMap[lang] || 21;
  const [menuItems, cta, wpLanguages, siteInfo] = await Promise.all([
    getMainMenu(currentMenuId, lang),
    getGlobalCTA(),
    getActiveLanguages(),
    getSiteInfo(),
  ]);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-campana-primary text-foreground antialiased", font.variable)}>
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

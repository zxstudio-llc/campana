"use client";

import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

export default function AppTheme({
  children,
  disableCustomTheme,
}: AppThemeProps) {
  /**
   * Futuro: aquí puedes integrar cualquier engine de estilos SSR
   * (styled-components, vanilla-extract, etc.)
   */
  const stylesRef = React.useRef<string>("");

  useServerInsertedHTML(() => {
    if (!stylesRef.current) return null;

    return (
      <style
        id="app-theme-styles"
        dangerouslySetInnerHTML={{ __html: stylesRef.current }}
      />
    );
  });

  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    <div
      data-theme="default"
      className="min-h-screen"
      style={
        {
          "--background": "0 0% 100%",
          "--foreground": "222 47% 11%",
          "--primary": "222 47% 11%",
          "--primary-foreground": "0 0% 100%",
          "--radius": "0.5rem",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
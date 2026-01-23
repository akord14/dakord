// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Akord.al",
    template: "%s | Akord.al",
  },
  description: "Akord.al lidh persona dhe biznese që kërkojnë ose ofrojnë punë.",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const YEAR = new Date().getFullYear();

  return (
    <html lang="sq">
      <body className="min-h-screen bg-[#f7f8fb] text-slate-900">
        {/* HEADER (tint background + strong text) */}
        <header className="sticky top-0 z-50">
          <div className="border-b border-white/50 bg-gradient-to-r from-[#0b2a43]/10 via-white/70 to-[#1f5b8f]/10 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4">
              {/* Logo majtas */}
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Akord.al" className="h-8 w-auto" />
              </div>

              {/* AKORD qender */}
              <div className="flex-1 text-center">
                <span className="select-none text-[13px] font-extrabold tracking-[0.32em] text-[#0b2a43] uppercase">
                  AKORD
                </span>
              </div>

              {/* right spacer */}
              <div className="w-[32px]" />
            </div>
          </div>

          {/* very subtle divider (premium, not heavy) */}
          <div className="h-px w-full bg-black/5" />
        </header>

        {/* MAIN */}
        {children}

        {/* FOOTER (tint background + strong text) */}
        <footer className="border-t border-white/50 bg-gradient-to-r from-[#0b2a43]/10 via-white/70 to-[#1f5b8f]/10">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center">
            <p className="text-sm font-semibold text-[#0b2a43]/80">
              Të gjitha të drejtat të rezervuara © Akord.al {YEAR}
            </p>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}

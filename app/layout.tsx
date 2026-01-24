// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
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
        
        {/* HEADER (short bar, big centered brand) */}
<header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
  <div className="border-b border-black/5">
    <div className="mx-auto flex h-14 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-10">
      
      {/* Logo majtas (full height feel) */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Akord.al"
          className="h-10 w-auto"
        />
      </div>

      {/* Center brand (fills the bar visually) */}
      <div className="flex-1 text-center">
        <span className="inline-block align-middle text-[26px] font-black leading-none tracking-tight text-[#0b2a43]">
          Akord.al
        </span>
      </div>

      {/* right spacer (same visual weight as logo) */}
      <div className="w-10" />
    </div>
  </div>
</header>


        {/* MAIN */}
        {children}

        {/* FOOTER (tint background + strong text) */}
        
<Footer />
        <Analytics />
      </body>
    </html>
  );
}

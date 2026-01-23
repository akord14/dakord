// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import BottomBar from "@/components/BottomBar";

const PROF_TO_IMG: Record<string, string> = {
  Shofer: "driver.svg",
  Elektricist: "electrician.svg",
  Hidraulik: "plumber.svg",
  "Teknik CCTV/Alarm": "technician.svg",
  "IT / Developer": "developer.svg",
  "Shitës / Market": "shop.svg",
  Kuzhinier: "chef.svg",
  Pastrim: "cleaner.svg",
  Kamerier: "waiter.svg",
  "Punëtor ndërtimi": "builder.svg",
  "Tjetër…": "other.svg",
};

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
      <body className="bg-slate-50">
        {/* PREMIUM HEADER */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center px-4">
            {/* Logo majtas */}
            <div className="flex items-center">
              {/* Ndrysho path-in nese logo jote eshte diku tjeter */}
              <img src="/logo.png" alt="Akord.al" className="h-8 w-auto" />
            </div>

            {/* Brand ne qender */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="text-base font-semibold tracking-[0.15em] text-slate-800 uppercase">
  AKORD
</span>

            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
{/* BOTTOM BAR */}
<BottomBar />
        {/* FOOTER */}
        <footer className="w-full border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center">
            <p className="text-sm text-slate-500">
              Të gjitha të drejtat të rezervuara © Akord.al {YEAR}
            </p>
          </div>
        </footer>

      

        <Analytics />
      </body>
    </html>
  );
}

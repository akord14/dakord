// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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

        {/* FOOTER */}
        <footer className="w-full border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center">
            <p className="text-sm text-slate-500">
              Të gjitha të drejtat të rezervuara © Akord.al {YEAR}
            </p>
          </div>
        </footer>

        {/* VIP WhatsApp Support Button */}
        <a
          href="https://wa.me/355695111179"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <img src="/whatsapp.svg" className="h-7 w-7" alt="WhatsApp" />
          <div className="leading-tight">
            <p className="font-semibold text-slate-800">Support</p>
            <p className="-mt-1 text-sm text-slate-500">Na shkruani në WhatsApp</p>
          </div>
        </a>

        <Analytics />
      </body>
    </html>
  );
}

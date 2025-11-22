// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const PROF_TO_IMG: Record<string, string> = {
  "Shofer": "driver.svg",
  "Elektricist": "electrician.svg",
  "Hidraulik": "plumber.svg",
  "Teknik CCTV/Alarm": "technician.svg",
  "IT / Developer": "developer.svg",
  "Shitës / Market": "shop.svg",
  "Kuzhinier": "chef.svg",
  "Pastrim": "cleaner.svg",
  "Kamerier": "waiter.svg",
  "Punëtor ndërtimi": "builder.svg",
  "Tjetër…": "other.svg",
};

export const metadata: Metadata = {
  title: "akord.al – Kërkoj punë | Ofroj punë",
  description: "Ura mes punëkërkuesve dhe punëdhënësve",
};

const YEAR = new Date().getUTCFullYear();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body>
        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-4 py-8">
          © {YEAR} akord.al · Kërkoj punë · Ofroj punë
        </footer>
      </body>
    </html>
  );
}

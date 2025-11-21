// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
        {/* HEADER */}
        <header className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/akord-icon.png"
              width={64}
              height={64}
              alt="Akord.al"
            />
          </Link>

          <nav className="ml-auto flex gap-4 text-sm">
            <Link href="/seeking" className="hover:underline">
              Kërkoj Punë
            </Link>
            <Link href="/offering" className="hover:underline">
              Ofroj Punë
            </Link>
            <Link
              href="/post/new?type=seeking"
              className="btn btn-primary"
            >
              Posto
            </Link>
          </nav>
        </header>

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

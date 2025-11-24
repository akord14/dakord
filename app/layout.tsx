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

export const metadata = {
  title: "Akord.al",
  description:
    "Akord.al lidh persona dhe biznese që kërkojnë ose ofrojnë punë.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
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
      <body>
        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-4 py-8">
          © {YEAR} akord.al · Kërkoj punë · Ofroj punë
        </footer>
      </body>
    </html>
  );
}


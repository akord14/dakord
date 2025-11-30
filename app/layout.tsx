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
      <body>
        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-4 py-8">
          © {YEAR} akord.al · Kërkoj punë · Ofroj punë
        </footer>
        {/* VIP WhatsApp Support Button */}
<a
  href="https://wa.me/355695111179"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
  style={{ zIndex: 999 }}
>
  <img src="/whatsapp.svg" className="w-7 h-7" alt="WhatsApp" />
  <div className="leading-tight">
    <p className="font-semibold text-gray-800">Support</p>
    <p className="text-sm text-gray-500 -mt-1">Na shkruani në WhatsApp</p>
  </div>
</a>

      </body>
    </html>
  );
}


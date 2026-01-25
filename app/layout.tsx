// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

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
        
       {/* HEADER – dark bg, centered brand, search right */}
<header className="sticky top-0 z-50 bg-[#0f172a]">
  <div className="border-b border-white/10">
    <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-3 items-center px-4 sm:px-6 lg:px-10">

      {/* LEFT: logo in white circle */}
      <div className="flex items-center justify-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
          <img
            src="/logo.png"
            alt="Akord.al"
            className="h-6 w-6 object-contain"
          />
        </div>
      </div>

      {/* CENTER: brand */}
      <div className="text-center">
        <span className="text-[22px] font-black tracking-tight text-white">
          Akord.al
        </span>
      </div>

      {/* RIGHT: search */}
      <div className="flex items-center justify-end">
        <button
  aria-label="Search"
  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
>
  <SearchIcon className="h-5 w-5 text-white" />
</button>

      </div>

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
